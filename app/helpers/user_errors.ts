import { BadRequestException } from "#exceptions/common";
import { CustomerUserErrors } from "#interfaces/shopify_interface";

export default function handleUserErrors(errors: CustomerUserErrors[]) {
    console.log('Handling user errors:', errors);
    if (errors.length > 0) {
        const firstError = errors[0];
        if (firstError.code === 'UNIDENTIFIED_CUSTOMER') {
            if (firstError.message.toLocaleLowerCase() === 'could not find customer') {
                throw new BadRequestException('No account found with the provided email address.');
            }
            throw new BadRequestException('The provided credentials are incorrect. Please try again.');
        }
        throw new BadRequestException(errors[0].message)
    }
} 