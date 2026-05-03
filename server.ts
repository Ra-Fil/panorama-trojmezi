import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  if (process.env.NODE_ENV !== "production") {
    // 🔧 Vite middleware (development)
    const { createServer: createViteServer } = await import("vite");

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);

  } else {
    // 🚀 Production build
    const distPath = path.join(__dirname, "dist");

    app.use(express.static(distPath));

    // SPA fallback (React Router apod.)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // 🌐 Listen na všech rozhraních (OK pro hosting)
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();