import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const resolve = (relativePath: string) =>
  path.resolve(fileURLToPath(new URL(".", import.meta.url)), relativePath);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vanillaExtractPlugin()],
  base: "/template",
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
    // alias: {
    //   "@/components": resolve("./src/components"),
    //   "@/utils": resolve("./src/utils"),
    //   "@/page": resolve("./src/utils"),
    // },
  },
});
