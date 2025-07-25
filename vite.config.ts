import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const resolve = (relativePath: string) =>
  path.resolve(fileURLToPath(new URL(".", import.meta.url)), relativePath);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/components": resolve("./src/components"),
      "@/utils": resolve("./src/utils"),
    },
  },
});
