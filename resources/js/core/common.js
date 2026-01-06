import '../core/services/cart'

document.body.addEventListener('htmx:configRequest', (event) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    event.detail.headers['x-csrf-token'] = csrfToken;
});