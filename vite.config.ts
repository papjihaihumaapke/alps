import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

// SSR build. The nitro plugin produces a real server so TanStack Start server
// functions (e.g. the /admin panel) run on the host. Nitro auto-detects the
// platform at build time — on Vercel it emits the Vercel Build Output (.vercel/output)
// with zero extra config; locally it builds a Node server in .output/.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
});
