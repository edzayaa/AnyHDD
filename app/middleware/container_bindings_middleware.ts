import { Logger } from '@adonisjs/core/logger'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
//import StorefrontClient from '#shopify/storefront'
//import AdminClient from '#shopify/admin'

/**
 * The container bindings middleware binds classes to their request
 * specific value using the container resolver.
 *
 * - We bind "HttpContext" class to the "ctx" object
 * - And bind "Logger" class to the "ctx.logger" object
 * - We bind Shopify clients as singletons
 */
export default class ContainerBindingsMiddleware {
  handle(ctx: HttpContext, next: NextFn) {
    ctx.containerResolver.bindValue(HttpContext, ctx)
    ctx.containerResolver.bindValue(Logger, ctx.logger)
    
    // Bind Shopify clients as singletons (created once per application lifecycle)
    //ctx.containerResolver.bindValue(StorefrontClient, ctx.containerResolver.make(StorefrontClient))
    //ctx.containerResolver.bindValue(AdminClient, ctx.containerResolver.make(AdminClient))

    return next()
  }
}
