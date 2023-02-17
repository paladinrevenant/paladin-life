/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
      },
      {
        find: "@source",
        replacement: path.resolve(__dirname, "src")
      },
      {
        find: "@logic",
        replacement: path.resolve(__dirname, "src/logic")
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/styles")
      }
    ]
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true
  },
  plugins: [vue()],
  root: path.resolve(__dirname, "src"),
  server: {
    port: 8080
  }
});
