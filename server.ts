import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs/promises";
import { randomBytes, timingSafeEqual } from "crypto";

const ROOT = process.cwd();
const TRANSLATIONS_FILE = path.join(ROOT, "translations.json");

// --- Credentials (required from env) ---

const ADMIN_USER = process.env.ADMIN_USER?.trim();
const ADMIN_PASS = process.env.ADMIN_PASS?.trim();

if (!ADMIN_USER || !ADMIN_PASS) {
  console.error("[AUTH] ADMIN_USER and ADMIN_PASS must be set in environment.");
  process.exit(1);
}

console.log(`[AUTH] ADMIN_USER loaded (${ADMIN_USER.length} chars)`);

function verifyPassword(candidate: string): boolean {
  try {
    const a = Buffer.from(candidate.padEnd(64).slice(0, 64));
    const b = Buffer.from(ADMIN_PASS!.padEnd(64).slice(0, 64));
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// --- Sessions (token → expiry timestamp) ---

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const activeSessions = new Map<string, number>();

function createSession(): string {
  const token = randomBytes(32).toString("hex");
  activeSessions.set(token, Date.now() + SESSION_TTL_MS);
  return token;
}

function isValidSession(token: string): boolean {
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

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
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

function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

// ---

interface LoginBody {
  username?: unknown;
  password?: unknown;
}

async function startServer(): Promise<void> {
  try {
    const app = express();
    const PORT = Number(process.env.PORT) || 3000;

    if (isNaN(PORT) || PORT < 1 || PORT > 65535) {
      throw new Error(`Invalid PORT value: ${process.env.PORT}`);
    }

    app.disable("x-powered-by");

    // --- Security headers ---
    app.use((_req: Request, res: Response, next: NextFunction) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "DENY");
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
      res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
      if (process.env.NODE_ENV === "production") {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
      }
      const isProd = process.env.NODE_ENV === "production";
      const csp = isProd
        ? [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://obsazenost.e-chalupy.cz https://www.googletagmanager.com https://www.google-analytics.com",
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

    app.post("/api/login", (req: Request, res: Response) => {
      const ip =
        (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0].trim() ??
        (req.headers["x-real-ip"] as string | undefined) ??
        req.socket.remoteAddress ??
        "unknown";

      if (!checkRateLimit(ip)) {
        res.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
        return;
      }

      const { username, password } = (req.body ?? {}) as LoginBody;
      if (typeof username !== "string" || typeof password !== "string") {
        console.error(
          `[LOGIN] 400 from ${ip}: body missing username or password (keys: ${Object.keys(req.body ?? {}).join(",")})`
        );
        res.status(400).json({ error: "Invalid request" });
        return;
      }

      let usernameMatch = false;
      try {
        usernameMatch = timingSafeEqual(
          Buffer.from(username.padEnd(64).slice(0, 64)),
          Buffer.from(ADMIN_USER!.padEnd(64).slice(0, 64))
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
        console.error(
          `[LOGIN] 401 from ${ip}: got_user="${username}"(len=${username.length}) env_user_len=${ADMIN_USER!.length} username_ok=${usernameMatch} password_ok=${passwordMatch}`
        );
        res.status(401).json({ error: "Invalid credentials" });
      }
    });

    app.get("/api/translations", async (_req: Request, res: Response) => {
      try {
        const raw = await fs.readFile(TRANSLATIONS_FILE, "utf-8");
        res.json(JSON.parse(raw));
      } catch {
        res.json({});
      }
    });

    app.put("/api/translations", async (req: Request, res: Response) => {
      const auth = (req.headers.authorization ?? "") as string;
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
      const distPath = path.join(ROOT, "dist");
      app.use(express.static(distPath));
      app.use((_req: Request, res: Response) => {
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
