import gsap  from "gsap"; // Importa GSAP

document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionar los elementos del DOM
    const openBagBtn = document.querySelector('.cart-button'); // El botón para abrir el carrito en tu nav
    const closeBagBtn = document.querySelector('#close-bag-btn');
    const shoppingBag = document.querySelector('#shopping-bag');
    const overlay = document.querySelector('#shopping-bag-overlay');
    const body = document.body;
    
    // Validar que todos los elementos existan
    if (!openBagBtn || !closeBagBtn || !shoppingBag || !overlay) {
        console.error("No se encontraron todos los elementos para el Shopping Bag.");
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
    .to(shoppingBag, { 
        x: '0%', // Mueve el bag a su posición original
        visibility: 'visible', 
        duration: 0.4, 
        ease: 'power2.inOut' 
    }, "<"); // El "<" hace que esta animación inicie al mismo tiempo que la anterior

    // 3. Funciones para abrir y cerrar
    const openBag = () => {
       
        body.classList.add('shopping-bag-open'); // Bloquea el scroll del body
        tl.play(); // Ejecuta la animación de apertura
    };

    const closeBag = () => {
        // Ejecuta la animación en reversa
        tl.reverse(); 
        
        // Cuando la animación de reversa se complete, quita la clase del body
        tl.eventCallback("onReverseComplete", () => {
            body.classList.remove('shopping-bag-open');
        });
    };

    // 4. Asignar los eventos a los botones y al overlay
    openBagBtn.addEventListener('click', openBag);
    closeBagBtn.addEventListener('click', closeBag);
    overlay.addEventListener('click', closeBag); // Cierra el bag si se clickea fuera

});