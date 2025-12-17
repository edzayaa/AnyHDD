import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export class BadRequestException extends Exception {
    constructor(
        message: string,
        public type: string = 'alert',
        public validationErrors?: any[]
    ) {
        super(message)
    }

    async handle(_error: this, ctx: HttpContext) {
        return ctx.response.status(400).json({
            error: 'BAD_REQUEST',
            message: this.message || 'An unexpected error occurred',
            code: 400
        })
    }
}

export class NotFoundException extends Exception {
    constructor(message: string) {
        super(message)
    }

    async handle(_error: this, ctx: HttpContext) {
        return ctx.response.status(404).json({
            error: 'NOT_FOUND',
            message: this.message || 'Not found',
            code: 404
        })
    }
}
    