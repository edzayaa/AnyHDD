import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { vitePluginWebp } from "vite-plugin-to-webp";

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      webp: {
        quality: 70,
      },
    }),
    vitePluginWebp({
      quality: 70,
    }),
  ],

  // Add this 'server' object to your configuration
  server: {
    host: true, // This enables network access
    // You can also specify a port if needed:
    // port: 5173,
  },
});