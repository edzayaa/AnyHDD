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
import '../../add-address-drawer.js';

document.addEventListener('alpine:init', () => {
    Alpine.data('addressDrawer', () => ({
        isOpen: false,
        isEditMode: false,
        loading: false,
        errorMessage: '',
        noChangesWarning: false,
        countries: [],
        selectedCountry: null,
        editingAddressId: null,
        originalFormData: null,
        formData: {
            firstName: '',
            lastName: '',
            company: '',
            address1: '',
            address2: '',
            zip: '',
            city: '',
            country: '',
            province: '',
            phone: ''
        },

        async init() {
            await this.fetchCountries();
            window.addEventListener('open-address-drawer', (e) => this.openDrawer(e.detail?.address));
            
            const cancelBtn = document.getElementById('cancel-address-btn');
            const closeBtn = document.querySelector('.close-btn-address-drawer');
            const overlay = document.getElementById('add-address-overlay');
            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    this.closeDrawer();
                });
            }
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeDrawer();
                });
            }
            
            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.closeDrawer();
                });
            }
        },

        async fetchCountries() {
            try {
                const response = await fetch('/api/countries');
                if (response.ok) {
                    const data = await response.json();
                    this.countries = data.countries || data || [];
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        },

        openDrawer(addressData = null) {
            this.resetForm();
            this.errorMessage = '';
            this.noChangesWarning = false;
            
            if (addressData) {
                this.isEditMode = true;
                this.editingAddressId = addressData.id;
                this.formData = {
                    firstName: addressData.firstName || '',
                    lastName: addressData.lastName || '',
                    company: addressData.company || '',
                    address1: addressData.address1 || '',
                    address2: addressData.address2 || '',
                    zip: addressData.zip || '',
                    city: addressData.city || '',
                    country: addressData.countryCode || '',
                    province: addressData.provinceCode || '',
                    phone: addressData.phone || ''
                };
                this.originalFormData = { ...this.formData };
                this.updateSelectedCountry();
            } else {
                this.isEditMode = false;
                this.editingAddressId = null;
                this.originalFormData = null;
            }
            
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        },

        closeDrawer() {
            if (this.loading) return;
            this.isOpen = false;
            document.body.style.overflow = '';
            window.dispatchEvent(new CustomEvent('close-address-drawer'));
        },

        resetForm() {
            this.formData = {
                firstName: '',
                lastName: '',
                company: '',
                address1: '',
                address2: '',
                zip: '',
                city: '',
                country: '',
                province: '',
                phone: ''
            };
            this.selectedCountry = null;
        },

        onCountryChange() {
            this.formData.province = '';
            this.updateSelectedCountry();
        },

        updateSelectedCountry() {
            this.selectedCountry = this.countries.find(c => c.code === this.formData.country) || null;
        },

        showField(fieldKey) {
            if (!this.selectedCountry) return true;
            const format = this.selectedCountry.formatting?.edit || '';
            return format.includes(`{${fieldKey}}`);
        },

        getFieldLabel(labelKey) {
            const defaults = {
                firstName: 'First Name',
                lastName: 'Last Name',
                company: 'Company',
                address1: 'Address',
                address2: 'Apartment, suite, etc',
                city: 'City',
                postalCode: 'Postal Code',
                country: 'Country',
                zone: 'Province/State',
                phone: 'Phone'
            };
            
            if (!this.selectedCountry) {
                return defaults[labelKey] || labelKey;
            }
            
            if (this.selectedCountry.optionalLabels?.[labelKey]) {
                return this.selectedCountry.optionalLabels[labelKey];
            }
            
            return this.selectedCountry.labels?.[labelKey] || defaults[labelKey] || labelKey;
        },

        hasChanges() {
            if (!this.originalFormData) return true;
            return Object.keys(this.formData).some(key => 
                this.formData[key] !== this.originalFormData[key]
            );
        },

        async submitForm() {
            if (this.loading) return;
            
            this.errorMessage = '';
            this.noChangesWarning = false;
            
            if (this.isEditMode && !this.hasChanges()) {
                this.noChangesWarning = true;
                return;
            }
            
            this.loading = true;
            
            try {
                const url = '/api/customer/addresses';
                const method = this.isEditMode ? 'PUT' : 'POST';
                
                const body = {
                    address: {
                        firstName: this.formData.firstName,
                        lastName: this.formData.lastName,
                        company: this.formData.company,
                        address1: this.formData.address1,
                        address2: this.formData.address2,
                        zip: this.formData.zip,
                        city: this.formData.city,
                        country: this.formData.country,
                        province: this.formData.province,
                        phone: this.formData.phone
                    }
                };
                
                if (this.isEditMode) {
                    body.addressId = this.editingAddressId;
                }
                
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Feedback-Scope': 'global',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify(body)
                });
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData[0]?.message || 'An error occurred while saving the address');
                }
                
                const html = await response.text();

                this.loading = false;
                this.closeDrawer();
                
                if (this.isEditMode) {
                    const existingItem = document.querySelector(`[data-address-id="${this.editingAddressId}"]`);
                    if (existingItem) {
                        existingItem.outerHTML = html;
                    }
                    window.dispatchEvent(new CustomEvent('app:success', {
                        detail: {
                            message: 'Address has been updated successfully!',
                            title: 'Address Updated',
                            scope: 'global'
                        }
                    }));
                } else {
                    const container = document.querySelector('.address-item-container');
                    if (container) {
                        const noAddressMsg = container.querySelector('.no-addresses-message');
                        if (noAddressMsg) {
                            noAddressMsg.remove();
                        }
                        container.insertAdjacentHTML('beforeend', html);
                    }
                    window.dispatchEvent(new CustomEvent('app:success', {
                        detail: {
                            message: 'Address has been added successfully!',
                            title: 'Address Added',
                            scope: 'global'
                        }
                    }));
                }
                
            } catch (error) {
                this.errorMessage = error.message || 'An unexpected error occurred';
            } finally {
                this.loading = false;
            }
        }
    }));
});