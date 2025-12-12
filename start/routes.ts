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
import { AccountsController } from '#modules/accounts/controllers/AccountsController'

// API 
import { AuthController } from '#modules/auth/controllers/auth_controller'

router.group(() => {
    router.get('/', [PagesController, 'index']).as('home')
    router.on('/faq').render('pages/faq').as('faq').as('faq')
    router.on('/sell-us').render('pages/sell-us').as('sellUs')
    router.on('/contact').render('pages/contact').as('contact')
    router.on('/warranty').render('pages/warranty').as('warranty')
    router.on('/about').render('pages/about').as('about')
    router.on('/terms-and-conditions').render('pages/terms-and-conditions').as('termsAndConditions')
    router.on('/privacy-policy').render('pages/privacy-policy').as('privacyPolicy')
})

router.group(() => {
    router.get('/', [ShopController, 'products']).as('products')
    router.get('/:handle', [ShopController, 'findProduct']).as('findProduct')
}).prefix('/shop').as('shop')

router.group(() => {
    router.on('/login').render('pages/auth/login').as('login')
    router.on('/register').render('pages/auth/register').as('register')
    router.on('/forgot-password').render('pages/auth/forgot').as('forgotPassword')
    router.on('/reset-password').render('pages/auth/reset').as('resetPassword')
    router.on('/activate').render('pages/auth/activate').as('activateAccount')
}).as('auth').prefix('/account')

router.group(() => {
    router.get('/', [AccountsController, 'overview']).as('overview')
    router.get('/settings', [AccountsController, 'settings']).as('settings')
    router.get('/addresses', [AccountsController, 'addresses']).as('addresses')
    router.get('/orders', [AccountsController, 'orders']).as('orders')
}).as('account').prefix('/account')

// API Routes
router.group(() => {
    router.post('/login', [AuthController, 'login']).as('login')
    router.post('/register', [AuthController, 'register']).as('register')
    router.post('/forgot-password', [AuthController, 'forgotPassword']).as('forgotPassword')
    router.post('/reset-password', [AuthController, 'resetPassword']).as('resetPassword')
    router.post('/activate-account', [AuthController, 'activateAccount']).as('activateAccount')
    router.post('/delete-access-token', [AuthController, 'deleteAccessToken']).as('deleteAccessToken')
}).prefix('/api/auth').as('api.auth')