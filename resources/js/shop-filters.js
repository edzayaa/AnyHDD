import gsap from "gsap";
import customSelect from 'custom-select';
import 'custom-select/build/custom-select.css';
/**
 * Inicializa la animación de acordeón para los filtros.
 */
function initFilterAccordions() {
    const filterOptions = document.querySelectorAll('.filter-option');

    filterOptions.forEach(optionEl => {
        const header = optionEl.querySelector('.filter-header');
        const content = optionEl.querySelector('.filter-content');
        const arrow = optionEl.querySelector('.filter-arrow');

        if (!header || !content || !arrow) return;

        // Inicializar estado: content visible y flecha en 0 grados
        // Esto coincide con el HTML estático donde style="height: auto;"
        gsap.set(content, { height: "auto" });
        gsap.set(arrow, { rotate: 0 });

        header.addEventListener('click', () => {
            // Verificamos si el contenido tiene altura > 0 para saber si está abierto
            const isContentVisible = content.offsetHeight > 0;

            if (isContentVisible) {
                // Cerrar
                gsap.to(content, { height: 0, duration: 0.3, ease: "none" });
                gsap.to(arrow, { rotate: -180, duration: 0.3 });
            } else {
                // Abrir
                gsap.to(content, { height: "auto", duration: 0.3, ease: "none" });
                gsap.to(arrow, { rotate: 0, duration: 0.3 });
            }
        });

        // Accesibilidad: permitir abrir/cerrar con Enter o Espacio
        header.addEventListener('keydown', (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                header.click();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initFilterAccordions);

document.addEventListener('DOMContentLoaded', () => {

    const select = customSelect('#shop-sort-select');
});