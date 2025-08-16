import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "UniversalResume.HtmlRenderer",
      fileName: (format) => `index.${format}.js`
    },
    outDir: "dist",
    emptyOutDir: true,
    minify: false
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "dist/types"
    }),
  ],
});
