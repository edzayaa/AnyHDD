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

        'resources/css/core/auth/forgot.scss',
        'resources/css/core/auth/login.scss',
        'resources/css/core/auth/register.scss',
        'resources/css/core/auth/reset.scss',

        'resources/css/core/accounts/address.scss',
        'resources/css/core/accounts/info.scss',
        'resources/css/core/accounts/orders.scss',
        'resources/css/core/accounts/my-account.scss',
        'resources/css/core/accounts/overview.scss',

        
      ],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
