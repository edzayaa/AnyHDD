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
    Alpine.data('sellUsForm', () => ({
        loading: false,
        files: [],
        error: '',
        
        handleFiles(event) {
            this.error = '';
            const selectedFiles = Array.from(event.target.files);
            
            if (this.files.length + selectedFiles.length > 5) {
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
                    continue;
                }
                
                if (file.size > maxSize) {
                    this.error = `File too large: ${file.name}. Maximum size is 5MB.`;
                    continue;
                }
                
                validFiles.push(file);
            }
            
            this.files = [...this.files, ...validFiles];
            
            const dataTransfer = new DataTransfer();
            this.files.forEach(file => dataTransfer.items.add(file));
            event.target.files = dataTransfer.files;
        },
        
        removeFile(index) {
            this.files.splice(index, 1);
            this.error = '';
            
            const input = document.getElementById('file-upload');
            const dataTransfer = new DataTransfer();
            this.files.forEach(file => dataTransfer.items.add(file));
            input.files = dataTransfer.files;
        },
        
        resetForm() {
            this.files = [];
            this.error = '';
            this.$refs.sellUsForm.reset();
        }
    }));
});
