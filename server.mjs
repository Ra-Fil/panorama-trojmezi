import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSLATIONS_FILE = path.join(__dirname, "translations.json");

// --- Credentials (required from env) ---

const ADMIN_USER = process.env.ADMIN_USER?.trim();
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH?.trim();

if (!ADMIN_USER || !ADMIN_PASS_HASH) {
  console.error("[AUTH] ADMIN_USER and ADMIN_PASS_HASH must be set in environment.");
  console.error("[AUTH] Run: node hash-password.mjs <password>  to generate ADMIN_PASS_HASH.");
  process.exit(1);
}

console.log(`[AUTH] ADMIN_USER loaded (${ADMIN_USER.length} chars)`);
console.log(`[AUTH] ADMIN_PASS_HASH format: ${ADMIN_PASS_HASH.includes(":") ? "OK (salt:hash)" : "INVALID – missing colon separator"}`);

function verifyPassword(candidate) {
  const [saltHex, hashHex] = ADMIN_PASS_HASH.split(":");
  if (!saltHex || !hashHex) return false;
  try {
    const derived = scryptSync(candidate, saltHex, 32);
    const stored = Buffer.from(hashHex, "hex");
    return derived.length === stored.length && timingSafeEqual(derived, stored);
  } catch {
    return false;
  }
}

// --- Sessions (token → expiry timestamp) ---

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const activeSessions = new Map();

function createSession() {
  const token = randomBytes(32).toString("hex");
  activeSessions.set(token, Date.now() + SESSION_TTL_MS);
  return token;
}

function isValidSession(token) {
  if (!token) return false;
  const expiry = activeSessions.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// Periodically clean expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of activeSessions) {
    if (now > expiry) activeSessions.delete(token);
  }
}, 60 * 60 * 1000);

// --- Rate limiter: max 5 failed attempts per IP per 15 min ---

const loginAttempts = new Map(); // ip → { count, resetAt }
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function resetRateLimit(ip) {
  loginAttempts.delete(ip);
}

// ---

async function startServer() {
  try {
    const app = express();
    const PORT = Number(process.env.PORT) || 3000;

    if (isNaN(PORT) || PORT < 1 || PORT > 65535) {
      throw new Error(`Invalid PORT value: ${process.env.PORT}`);
    }

    app.disable("x-powered-by");

    // --- Security headers ---
    app.use((_req, res, next) => {
      // Prevent MIME-type sniffing
      res.setHeader("X-Content-Type-Options", "nosniff");
      // Disallow embedding this site in iframes (clickjacking)
      res.setHeader("X-Frame-Options", "DENY");
      // Referrer info only to same origin or HTTPS origins
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
      // Disable browser features not used by this site
      res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
      // HSTS: enforce HTTPS for 1 year (enable only behind a TLS terminator)
      if (process.env.NODE_ENV === "production") {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      }
      // Content Security Policy — strict in production, relaxed in dev (Vite HMR needs inline scripts + eval)
      const isProd = process.env.NODE_ENV === "production";
      const csp = isProd
        ? [
            "default-src 'self'",
            "script-src 'self' https://obsazenost.e-chalupy.cz",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            "frame-src https://obsazenost.e-chalupy.cz https://www.google.com https://maps.google.com",
            "connect-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
          ].join("; ")
        : [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://obsazenost.e-chalupy.cz",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            "frame-src https://obsazenost.e-chalupy.cz https://www.google.com https://maps.google.com",
            "connect-src 'self' ws://localhost:* wss://localhost:*",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; ");
      res.setHeader("Content-Security-Policy", csp);
      next();
    });

    app.use(express.json({ limit: "1mb" }));

    app.post("/api/login", (req, res) => {
      const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() ?? req.headers["x-real-ip"] ?? req.socket.remoteAddress ?? "unknown";

      if (!checkRateLimit(ip)) {
        res.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
        return;
      }

      const { username, password } = req.body ?? {};
      if (typeof username !== "string" || typeof password !== "string") {
        console.error(`[LOGIN] 400 from ${ip}: body missing username or password (keys: ${Object.keys(req.body ?? {}).join(",")})`);
        res.status(400).json({ error: "Invalid request" });
        return;
      }

      let usernameMatch = false;
      try {
        usernameMatch = timingSafeEqual(
          Buffer.from(username.padEnd(64).slice(0, 64)),
          Buffer.from(ADMIN_USER.padEnd(64).slice(0, 64))
        );
      } catch (err) {
        console.error(`[LOGIN] timingSafeEqual error: ${err}`);
      }

      const passwordMatch = verifyPassword(password);

      if (usernameMatch && passwordMatch) {
        resetRateLimit(ip);
        console.log(`[LOGIN] Success from ${ip}`);
        res.json({ token: createSession() });
      } else {
        console.error(`[LOGIN] 401 from ${ip}: got_user="${username}"(len=${username.length}) env_user_len=${ADMIN_USER.length} username_ok=${usernameMatch} password_ok=${passwordMatch}`);
        res.status(401).json({ error: "Invalid credentials" });
      }
    });

    app.get("/api/translations", async (_req, res) => {
      try {
        const raw = await fs.readFile(TRANSLATIONS_FILE, "utf-8");
        res.json(JSON.parse(raw));
      } catch {
        res.json({});
      }
    });

    app.put("/api/translations", async (req, res) => {
      const auth = req.headers.authorization ?? "";
      const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
      if (!isValidSession(token)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      try {
        await fs.writeFile(TRANSLATIONS_FILE, JSON.stringify(req.body, null, 2), "utf-8");
        res.json({ ok: true });
      } catch (err) {
        console.error("Failed to write translations:", err);
        res.status(500).json({ error: "Failed to save" });
      }
    });

    if (process.env.NODE_ENV !== "production") {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(__dirname, "dist");
      app.use(express.static(distPath));
      app.use((_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer().catch((err) => {
  console.error("Unhandled server error:", err);
  process.exit(1);
});
