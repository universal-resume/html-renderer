import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
	},
  resolve: {
    alias: {
     '@renderer': new URL('./src/renderer', import.meta.url).pathname,
    },
  },
});