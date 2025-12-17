import '../SmoothScroll.js';
import '../navbar.js';
import '../hover-matcher.js';
import '../main.js';
import '../enter-animation.js';
import '../fade-in.js';
import '../shopping-bag.js';
import '../white-overlay.js';
import '../show-navbar.js';

document.addEventListener('alpine:init', () => {
    Alpine.data('warrantyForm', () => ({
        loading: false,
        files: [],
        error: '',
        
        handleFiles(event) {
            this.error = '';
            const selectedFiles = Array.from(event.target.files);
            
            if (selectedFiles.length > 5) {
                this.error = 'Maximum 5 images allowed';
                event.target.value = '';
                return;
            }
            
            const validFiles = [];
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const maxSize = 5 * 1024 * 1024;
            
            for (const file of selectedFiles) {
                if (!allowedTypes.includes(file.type)) {
                    this.error = `Invalid file type: ${file.name}. Only JPG, PNG, and WEBP are allowed.`;
                    event.target.value = '';
                    return;
                }
                
                if (file.size > maxSize) {
                    this.error = `File too large: ${file.name}. Maximum size is 5MB.`;
                    event.target.value = '';
                    return;
                }
                
                validFiles.push(file);
            }
            
            this.files = validFiles;
        },
        
        resetForm() {
            this.files = [];
            this.error = '';
            this.$refs.warrantyForm.reset();
        }
    }));
});
