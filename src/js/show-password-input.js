// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecciona el input de la contraseña por su ID
    const passwordInput = document.getElementById('password-input');

    // 2. Selecciona el icono que mostrará/ocultará la contraseña por su clase
    const togglePasswordIcon = document.querySelector('.show-password-icon');

    // Verifica que ambos elementos existen antes de continuar
    if (passwordInput && togglePasswordIcon) {

        // 3. Añade un 'click' event listener al icono
        togglePasswordIcon.addEventListener('click', () => {

            // Obtiene el tipo actual del input
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';

            // 4. Cambia el tipo del input
            passwordInput.setAttribute('type', type);

            if (type === 'text') {
                togglePasswordIcon.setAttribute('alt', 'hide-password-icon');

            } else {
                togglePasswordIcon.setAttribute('alt', 'show-password-icon');
            }
        });
    } else {
        console.error("No se encontraron los elementos 'password-input' o 'show-password-icon' en el DOM.");
    }
});