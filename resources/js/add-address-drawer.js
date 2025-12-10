import gsap from "gsap"; // Importa GSAP

document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionar los elementos del DOM
    const openDrawerBtn = document.querySelector('.add-address-btn'); // El botón para abrir el drawer
    const editButtons = document.querySelectorAll('.action-link'); // Botones de Edit en las tarjetas

    const addressDrawer = document.querySelector('#add-address-drawer');
    const overlay = document.querySelector('#add-address-overlay');
    const closeBtn = document.querySelector('.close-btn-address-drawer');
    const body = document.body;

    // Validar que todos los elementos existan
    if (!openDrawerBtn || !addressDrawer || !overlay || !closeBtn) {
        console.error("No se encontraron todos los elementos para el Add Address Drawer.");
        return;
    }

    // 2. Crear una timeline de GSAP para controlar las animaciones
    // 'paused: true' evita que se ejecute al crearse
    const tl = gsap.timeline({ paused: true });

    // Definir las animaciones en la timeline
    tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'auto' // Hacer el overlay clickeable
    })
        .to(addressDrawer, {
            x: '0%', // Mueve el drawer a su posición original
            visibility: 'visible',
            duration: 0.4,
            ease: 'power2.inOut'
        }, "<"); // El "<" hace que esta animación inicie al mismo tiempo que la anterior

    // 3. Funciones para abrir y cerrar
    const openDrawer = () => {

        body.classList.add('address-drawer-open'); // Bloquea el scroll del body
        tl.play(); // Ejecuta la animación de apertura
    };

    const closeDrawer = () => {
        // Ejecuta la animación en reversa
        tl.reverse();

        // Cuando la animación de reversa se complete, quita la clase del body
        tl.eventCallback("onReverseComplete", () => {
            body.classList.remove('address-drawer-open');
        });
    };

    // 4. Asignar los eventos a los botones y al overlay
    openDrawerBtn.addEventListener('click', openDrawer);

    // Agregar evento a todos los botones de Edit
    editButtons.forEach(btn => {
        if (btn.textContent.trim() === 'Edit') {
            btn.addEventListener('click', openDrawer);
        }
    });

    overlay.addEventListener('click', closeDrawer); // Cierra el drawer si se clickea fuera

    closeBtn.addEventListener('click', closeDrawer);

    // También cerrar el drawer con el botón de cancelar
    const cancelBtn = document.querySelector('#cancel-address-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeDrawer);
    }

});
