import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	css: {
		devSourcemap: false,
	},
	
  build: {
    chunkSizeWarningLimit: 1000 // Increase limit to 1MB
  },

});
