import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    //outDir: 'dist/static',
    emptyOutDir: true,
    //minify: 'esbuild',
    //rollupOptions: {
    //  input: './ts/index.ts',
    //  output: {
    //    entryFileNames: 'js/[name]-[hash].js',
    //    chunkFileNames: 'js/[name]-[hash].js',
    //    assetFileNames: 'js/[name]-[hash][extname]',
    //    manualChunks: undefined
    //  }
    //}
  }
})