import { HttpContext } from "@adonisjs/core/http"
import { PagesService } from "#modules/pages/services/pages_service"
import { contactValidator, sellToUsValidator, warrantyValidator } from "../../validators/pages_validator.js"

export class PagesApiController {
    private pagesService: PagesService
    constructor() {
        this.pagesService = new PagesService()
    }  

    async contactUs({ response, request }: HttpContext) {
        const payload = await request.validateUsing(contactValidator, {
            data: request.body()
        })
        await this.pagesService.contactUs(payload, 'New Contact Message', 'contact')
        return response
            .status(200)
            .header('HX-Trigger', JSON.stringify({
                'app:success': {
                    message: 'Thank you for reaching out! We will get back to you shortly.',
                    title: 'Contact Message Sent',
                    scope: request.header('X-Error-Scope') || 'global'
                }
            }))
            .noContent()
    }

    async sellToUs({ response, request }: HttpContext) {
        const payload = await request.validateUsing(sellToUsValidator)
        await this.pagesService.sellToUs(payload)
        return response
            .status(200)
            .header('HX-Trigger', JSON.stringify({
                'app:success': {
                    message: 'Thank you for your interest in selling to us! We will review your inquiry and get back to you soon.',
                    title: 'Sell To Us Inquiry Submitted',
                    scope: request.header('X-Error-Scope') || 'global'
                }
            }))
            .noContent()
    }
    async warranty({ response, request }: HttpContext) {
        const payload = await request.validateUsing(warrantyValidator, {
            data: request.body()
        })
        await this.pagesService.warranty(payload)      
        return response
            .status(200)
            .header('HX-Trigger', JSON.stringify({
                'app:success': {
                    message: 'Your warranty request has been submitted successfully! Our team will review it and get back to you shortly.',
                    title: 'Warranty Request Submitted',
                    scope: request.header('X-Error-Scope') || 'global'
                }
            }))
            .noContent()
    }

    async countries({ response }: HttpContext) {
        const countries = await this.pagesService.getCountries()
        return response.json(countries)
    }
}