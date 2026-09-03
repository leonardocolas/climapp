import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

function storageProxy(): Plugin {
  return {
    name: "storage-proxy",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/weather-assets", async (request, response) => {
        const assetPath = request.url?.replace(/^\//, "");
        if (!assetPath) {
          response.writeHead(400, { "Content-Type": "text/plain" });
          response.end("Missing asset path");
          return;
        }

        const storageUrl = (process.env.STORAGE_API_URL || "").replace(/\/+$/, "");
        const storageKey = process.env.STORAGE_API_KEY;

        if (!storageUrl || !storageKey) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Storage proxy not configured");
          return;
        }

        try {
          const requestUrl = new URL("v1/storage/presign/get", `${storageUrl}/`);
          requestUrl.searchParams.set("path", assetPath);
          const storageResponse = await fetch(requestUrl, {
            headers: { Authorization: `Bearer ${storageKey}` },
          });

          if (!storageResponse.ok) {
            response.writeHead(502, { "Content-Type": "text/plain" });
            response.end("Storage backend error");
            return;
          }

          const { url } = (await storageResponse.json()) as { url: string };
          if (!url) {
            response.writeHead(502, { "Content-Type": "text/plain" });
            response.end("Empty signed URL");
            return;
          }

          response.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          response.end();
        } catch {
          response.writeHead(502, { "Content-Type": "text/plain" });
          response.end("Storage proxy error");
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), storageProxy()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
