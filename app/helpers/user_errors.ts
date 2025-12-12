import { BadRequestException } from "#exceptions/common";
import { CustomerUserErrors } from "#interfaces/shopify_interface";

export default function handleUserErrors(errors: CustomerUserErrors[]) {
    if (errors.length > 0) {
        const firstError = errors[0];
        if (firstError.code === 'UNIDENTIFIED_CUSTOMER') {
            throw new BadRequestException('The provided credentials are incorrect. Please try again.');
        }
        throw new BadRequestException(errors[0].message)
    }
} 