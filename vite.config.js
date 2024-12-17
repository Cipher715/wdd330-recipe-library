import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        directory: resolve(__dirname, "src/directory/index.html"),
        bookmark: resolve(__dirname, "src/bookmark/index.html"),
      },
    },
  },
});