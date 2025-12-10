/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { PagesController } from '#modules/pages/controllers/PagesController'
import { ShopController } from '#modules/shop/controllers/Http/ShopController'

router.group(() => {
    router.get('/', [PagesController, 'index'])
    router.get('/faq', [PagesController, 'faq'])
    router.get('/sell-us', [PagesController, 'sellUs'])
    router.get('/contact', [PagesController, 'contact'])
    router.get('/warranty', [PagesController, 'warranty'])
    router.get('/about', [PagesController, 'about'])
    router.get('/terms-and-conditions', [PagesController, 'terms'])
    router.get('/privacy-policy', [PagesController, 'privacy'])
})

router.group(() => {
    router.get('/', [ShopController, 'products'])
    router.get('/:handle', [ShopController, 'findProduct'])
}).prefix('/shop')