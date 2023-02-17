import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

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
        find: "@enums",
        replacement: path.resolve(__dirname, "src/enums")
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/styles")
      },
      {
        find: "@field",
        replacement: path.resolve(__dirname, "src/field")
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
