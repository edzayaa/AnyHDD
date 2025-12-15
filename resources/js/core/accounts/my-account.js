import '../../SmoothScroll.js';
import '../../navbar.js';
import '../../hover-matcher.js';
import '../../main.js';
import '../../enter-animation.js';
import '../../fade-in.js';
import '../../shopping-bag.js';
import '../../white-overlay.js';
import '../../show-navbar.js';
import '../../toggle-password-input.js';
import '../../edit-account-drawer.js';

document.addEventListener('alpine:init', () => {
    Alpine.data('editAccountDrawer', (initial) => ({
        loading: false,

        original: {
            ...initial,
            password: '',
            confirmPassword: ''
        },

        form: {
            ...initial,
            password: '',
            confirmPassword: ''
        },

        get hasChanges() {
            const baseChanged = Object.keys(this.original).some(
                key => this.form[key] !== this.original[key]
            );

            const passwordChanged =
                this.form.password.length > 0 ||
                this.form.confirmPassword.length > 0;

            const hasAtLeastOneField = 
                (this.form.firstName && this.form.firstName.trim().length > 0) ||
                (this.form.lastName && this.form.lastName.trim().length > 0) ||
                (this.form.email && this.form.email.trim().length > 0) ||
                (this.form.phone && this.form.phone.trim().length > 0) ||
                (this.form.password && this.form.password.length > 0);

            const passwordValid = 
                (this.form.password.length === 0 && this.form.confirmPassword.length === 0) ||
                (this.form.password.length > 0 && this.form.confirmPassword.length > 0);

            return (baseChanged || passwordChanged) && hasAtLeastOneField && passwordValid;
        }
    }));
});