import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: [
        'resources/css/core/common.scss',
        'resources/css/core/home.scss',
        'resources/css/core/about.scss',
        'resources/css/core/contact.scss',
        'resources/css/core/faq.scss',
        'resources/css/core/warranty.scss',
        'resources/css/core/terms.scss',
        'resources/css/core/privacy.scss',
        'resources/css/core/shop.scss',
      ],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
