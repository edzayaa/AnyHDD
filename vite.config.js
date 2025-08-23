import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import {vitePluginWebp} from "vite-plugin-to-webp"
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
})