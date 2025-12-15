import vine, { SimpleMessagesProvider } from "@vinejs/vine";

const messages = {
    'required': '{{ field }} is required.',
    'email': '{{ field }} is invalid.',
    'minLength': '{{ field }} must be at least {{ min }} characters long.',
    'maxLength': '{{ field }} must be at most {{ max }} characters long.',
    'activateToken.minLength': 'Activate Token is invalid.',
    'resetToken.minLength': 'Reset Token is invalid.',
    'rating.minLength': 'Invalid rating (1-5).',
    'rating.maxLength': 'Invalid rating (1-5).',
    'newPassword.required': 'New Password is required.',
    'newPassword.minLength': 'New Password must be at least {{ min }} characters long.',
    'confirmPassword.required': 'Confirm Password is required.',
    'confirmPassword.minLength': 'Confirm Password must be at least {{ min }} characters long.',
    'confirmPassword.sameAs': 'Confirm Password does not match New Password.',
    'phone.regex': 'Phone number is invalid.',
    'firstName.regex': 'First Name contains invalid characters.',
    'lastName.regex': 'Last Name contains invalid characters.',
    'message.minLength': 'Message must be at least {{ min }} characters long.',
    'message.maxLength': 'Message must be at most {{ max }} characters long.',
    'reason.in': 'Please select a valid reason for contact.',
    'notes.minLength': 'Notes must be at least {{ min }} characters long.',
    'notes.maxLength': 'Notes must be at most {{ max }} characters long.',
    'productList.minLength': 'Product List must be at least {{ min }} characters long.',
    'productList.maxLength': 'Product List must be at most {{ max }} characters long.',
}

const fields = {
    // Customer
    'email': 'Email',
    'password': 'Password',
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'customerId': 'Customer ID',
    'resetToken': 'Reset Token',
    'activateToken': 'Activate Token',
    'customerAccessToken': 'Access Token',

    // Address
    'address1': 'Address 1',
    'address2': 'Address 2',
    'city': 'City',
    'country': 'Country',
    'province': 'Province',
    'zip': 'Zip',
    'phone': 'Phone',
    'prefixCode': 'Prefix Code',
    'isDefault': 'Is Default',
    'addressId': 'Address ID',

    // Shop
    'productId': 'Product ID',
    'page': 'Page',
    'name': 'Name',
    'rating': 'Rating',
    'content': 'Content',
    'title': 'Title',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, fields)