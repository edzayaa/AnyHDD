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
        login: resolve(__dirname, "login.html"),
        createaccount: resolve(__dirname, "create-account.html"),
        forgotpassword: resolve(__dirname, "forgot-password.html"),
        resetpassword: resolve(__dirname, "reset-password.html"),
        confirmedrequest: resolve(__dirname, "confirmed-request.html"),
        contact: resolve(__dirname, "contact.html"),
        shop: resolve(__dirname, "shop.html"),
        product: resolve(__dirname, "product.html"),
        termsConditions: resolve(__dirname, "terms-and-conditions.html"),
        globalPrivacyPolicy: resolve(__dirname, "global-privacy-policy.html"),
        notfound: resolve(__dirname, "not-found.html"),
      },
    },
  },
});