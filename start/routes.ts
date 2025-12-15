/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { PagesController } from '#modules/pages/controllers/http/pages_controller'
import { ShopController } from '#modules/shop/controllers/Http/ShopController'
import { CustomerController } from '#modules/customer/controllers/http/customer_controller'

// API 
import { AuthController } from '#modules/auth/controllers/auth_controller'
import { CustomerApiController } from '#modules/customer/controllers/api/customer_controller'
import { PagesApiController } from '#modules/pages/controllers/api/pages_controller'

import { middleware } from '#start/kernel'

router.group(() => {
    router.get('/', [PagesController, 'home']).as('home')
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
    router.on('/login').render('pages/auth/login').as('login').use(middleware.isLogged())
    router.on('/register').render('pages/auth/register').as('register').use(middleware.isLogged())
    router.on('/forgot-password').render('pages/auth/forgot').as('forgotPassword')
    router.on('/reset-password').render('pages/auth/reset').as('resetPassword')
    router.on('/activate').render('pages/auth/activate').as('activateAccount')
}).as('auth').prefix('/account')

router.group(() => {
    router.get('/', [CustomerController, 'overview']).as('overview')
    router.get('/settings', [CustomerController, 'settings']).as('settings')
    router.get('/addresses', [CustomerController, 'addresses']).as('addresses')
    router.get('/orders', [CustomerController, 'orders']).as('orders')
}).as('customer').prefix('/account').middleware(middleware.auth())

// API Routes
router.group(() => {
    router.post('/login', [AuthController, 'login']).as('login')
    router.post('/register', [AuthController, 'register']).as('register')
    router.post('/forgot-password', [AuthController, 'forgotPassword']).as('forgotPassword')
    router.post('/reset-password', [AuthController, 'resetPassword']).as('resetPassword')
    router.post('/activate-account', [AuthController, 'activateAccount']).as('activateAccount')
    router.post('/logout', [AuthController, 'deleteAccessToken']).as('deleteAccessToken')
}).prefix('/api/auth').as('api.auth')

router.group(() => {
    router.post('/', [CustomerApiController, 'updateCustomer']).as('updateCustomer')
}).prefix('/api/customer').as('api.customer')

router.group(() => {
    router.post('/contact', [PagesApiController, 'contactUs']).as('contactUs').as('contactUs')
    router.post('/sell-to-us', [PagesApiController, 'sellToUs']).as('sellToUs')
    router.post('/warranty', [PagesApiController, 'warranty']).as('warranty')
}).prefix('/api').as('api.pages')