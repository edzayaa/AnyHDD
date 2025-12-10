// Toggle Password Visibility with Animation
document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('.password-field input');
    const toggleLine = document.querySelector('.toggle-line');

    if (togglePasswordBtn && passwordInput && toggleLine) {
        // Por defecto, la línea está visible (password oculto)
        let isPasswordVisible = false;

        togglePasswordBtn.addEventListener('click', function () {
            isPasswordVisible = !isPasswordVisible;

            if (isPasswordVisible) {
                // Mostrar password - animar la línea desapareciendo
                passwordInput.type = 'text';

                // Animación: la línea se dibuja de vuelta (desaparece)
                toggleLine.style.strokeDasharray = '16';
                toggleLine.style.strokeDashoffset = '0';

                // Animar el strokeDashoffset para que la línea desaparezca
                setTimeout(() => {
                    toggleLine.style.transition = 'stroke-dashoffset 0.3s ease-in-out';
                    toggleLine.style.strokeDashoffset = '16';
                }, 10);

            } else {
                // Ocultar password - animar la línea apareciendo
                passwordInput.type = 'password';

                // Resetear la línea
                toggleLine.style.strokeDasharray = '16';
                toggleLine.style.strokeDashoffset = '16';

                // Animar el strokeDashoffset para que la línea aparezca
                setTimeout(() => {
                    toggleLine.style.transition = 'stroke-dashoffset 0.3s ease-in-out';
                    toggleLine.style.strokeDashoffset = '0';
                }, 10);
            }
        });

        // Inicializar el estado de la línea (visible por defecto)
        toggleLine.style.strokeDasharray = '16';
        toggleLine.style.strokeDashoffset = '0';
    }
});