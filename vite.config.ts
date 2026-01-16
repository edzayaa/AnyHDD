import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  server: {
    allowedHosts: ['.anyhdd.com', 'localhost'],
  },
  plugins: [
    adonisjs({
      buildDirectory: 'public/static',
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: [
        'resources/css/app.css',
        'resources/css/core/common.scss',
        'resources/css/core/home.scss',
        'resources/css/core/about.scss',
        'resources/css/core/contact.scss',
        'resources/css/core/faq.scss',
        'resources/css/core/warranty.scss',
        'resources/css/core/terms.scss',
        'resources/css/core/privacy.scss',
        'resources/css/core/sell-us.scss',

        'resources/css/core/shop/products.scss',
        'resources/css/core/shop/product.scss',
        'resources/css/core/shop/search.scss',

        'resources/css/core/auth/forgot.scss',
        'resources/css/core/auth/login.scss',
        'resources/css/core/auth/register.scss',
        'resources/css/core/auth/reset.scss',

        'resources/css/core/accounts/address.scss',
        'resources/css/core/accounts/info.scss',
        'resources/css/core/accounts/orders.scss',
        'resources/css/core/accounts/my-account.scss',
        'resources/css/core/accounts/overview.scss',
        'resources/css/core/error.scss',

        "resources/js/core/shop/products.js",
        "resources/js/core/shop/product.js",
        "resources/js/core/shop/search.js",
        "resources/js/core/warranty.js",
        "resources/js/core/privacy.js",
        "resources/js/core/terms.js",
        "resources/js/core/sell-us.js",
        "resources/js/core/accounts/address.js",
        "resources/js/core/accounts/overview.js",
        "resources/js/core/accounts/orders.js",
        "resources/js/core/accounts/my-account.js",
        "resources/js/core/faq.js",
        "resources/js/core/about.js",
        "resources/js/core/auth/login.js",
        "resources/js/core/contact.js",
        "resources/js/core/home.js",
        "resources/js/core/common.js",
        "resources/js/core/error.js",
      ],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
