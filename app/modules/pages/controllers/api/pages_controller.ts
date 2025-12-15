import { HttpContext } from "@adonisjs/core/http"
import { PagesService } from "#modules/pages/services/pages_service"
import { contactValidator, sellToUsValidator, warrantyValidator } from "../../validators/pages_validator.js"

export class PagesApiController {
    private pagesService: PagesService
    constructor() {
        this.pagesService = new PagesService()
    }  

    async contactUs({ view, request }: HttpContext) {
        const payload = await request.validateUsing(contactValidator, {
            data: request.body()
        })
        await this.pagesService.contactUs(payload, 'New Contact Message', 'contact')
        return view.render('components/feedback/_response_success', { message: 'Thank you for reaching out! We will get back to you shortly.' })
    }

    async sellToUs({ view, request }: HttpContext) {
        const payload = await request.validateUsing(sellToUsValidator)
        await this.pagesService.sellToUs(payload)
        return view.render('components/feedback/_response_success', { message: 'Thank you for your interest in selling to us! We will review your inquiry and get back to you soon.' })
    }

    async warranty({ view, request }: HttpContext) {
        const payload = await request.validateUsing(warrantyValidator, {
            data: request.body()
        })
        await this.pagesService.warranty(payload)
        return view.render('components/feedback/_response_success', { message: 'Your warranty request has been submitted successfully! Our team will review it and get back to you shortly.' })        
    }
}