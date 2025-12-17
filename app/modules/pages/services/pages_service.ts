import mail from '@adonisjs/mail/services/main'
import env from '#start/env'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import app from '@adonisjs/core/services/app'
import { readFile } from 'node:fs/promises'

export class PagesService {
    private countriesCache: any

    async contactUs(
        data: Record<string, any>,
        subject = 'New Contact Message',
        type: 'contact' | 'sell' = 'contact'
    ) {
        await mail.sendLater((message) => {
            message
                .from(data.email)
                .to(env.get('CONTACT_TO'))
                .subject(subject)
                .htmlView(
                    type === 'contact' ? 'mail/contact' : 'mail/sellUs',
                    data
                )
        })
    }

    private async handleFormWithImages(
        data: Record<string, any>,
        subject: string,
        template: string
    ) {
        await mail.sendLater((message) => {
            message
                .from(data.email)
                .to(env.get('CONTACT_TO'))
                .subject(subject)
                .htmlView(template, data)

            if (Array.isArray(data.images)) {
                for (const image of data.images as MultipartFile[]) {
                    if (!image.tmpPath) continue

                    message.attach(image.tmpPath, {
                        filename: image.clientName,
                        contentType: image.type,
                    })
                }
            }
        })
    }

    async sellToUs(data: Record<string, any>) {
        await this.handleFormWithImages(
            data,
            'New Sell To Us Inquiry',
            'mail/sellUs'
        )
    }

    async warranty(data: Record<string, any>) {
        await this.handleFormWithImages(
            data,
            'New Warranty Request',
            'mail/warranty'
        )
    }

    async getCountries() {
        if (this.countriesCache) {
            return this.countriesCache
        }

        const countriesPath = app.makePath(
            'app/modules/pages/data/countries.json'
        )

        const raw = await readFile(countriesPath, 'utf8')
        const parsed = JSON.parse(raw)

        this.countriesCache = parsed.data
        return this.countriesCache
    }
}
