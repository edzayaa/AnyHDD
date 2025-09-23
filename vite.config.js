import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { vitePluginWebp } from "vite-plugin-to-webp";
import { resolve } from "path"; // Importante: importa 'resolve' de 'path'

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

  server: {
    host: true,
  },

  // 👇 AGREGA ESTA SECCIÓN PARA CONFIGURAR LAS MÚLTIPLES PÁGINAS
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        faq: resolve(__dirname, "faq.html"),
        warranty: resolve(__dirname, "warranty.html"),
      },
    },
  },
});