import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'
import { errors } from '@vinejs/vine'
import { BadRequestException } from '#exceptions/common'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**1
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { view }) => {
      return view.render('pages/errors/not_found', { error })
    },
    '500..599': (error, { view }) => {
      return view.render('pages/errors/server_error', { error })
    },
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    const isHtmx = ctx.request.header('HX-Request')
    if (error instanceof errors.E_VALIDATION_ERROR) {
      if (isHtmx) {
        const html = await ctx.view.render('components/feedback/_response_error', {
          message: error.messages[0].message
        })

        return ctx.response
          .status(422)
          .header('Content-Type', 'text/html')
          .send(html)
      }

      return ctx.response.status(422).json(error.messages)
    }

    if (error instanceof BadRequestException) {
      if (isHtmx) {
        const html = await ctx.view.render('components/feedback/_response_error', {
          message: error.message
        })

        return ctx.response
          .status(400)
          .header('Content-Type', 'text/html')
          .send(html)
      }

      return ctx.response.status(400).json({
        error: 'BAD_REQUEST',
        message: error.message,
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
