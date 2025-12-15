import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export class PagesService {
    async contactUs(data: any, subject?: string, type?: string) {
        await mail.sendLater((message) => {
            message
                .from(data.email)
                .to(env.get('CONTACT_TO'))
                .subject(subject || 'New Contact Message')
                .htmlView(type === 'contact' ? 'mail/contact' : 'mail/sellUs', data)
        })
    }

    private async handleFormWithImages(data: any, subject: string, template: string) {
        await mail.sendLater((message) => {
            const msg = message
                .from(data.email)
                .to(env.get('CONTACT_TO'))
                .subject(subject)
                .htmlView(template, data)

            if (data.images && data.images.length > 0) {
                data.images.forEach((image: MultipartFile) => {
                    msg.attach(image.tmpPath!, {
                        filename: image.clientName
                    })
                })
            }
        })
    }

    async sellToUs(data: any) {
        await this.handleFormWithImages(data, 'New Sell To Us Inquiry', 'mail/sellUs')
    }

    async warranty(data: any) {
        await this.handleFormWithImages(data, 'New Warranty Request', 'mail/warranty')
    }
}