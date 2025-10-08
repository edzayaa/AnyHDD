import Swiper from "swiper";
import { EffectFade, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { gsap } from "gsap"; // Importa GSAP
// Importa los estilos necesarios
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; 
// Ahora es un array de objetos, donde cada objeto es un label.
const products_image = [
    { 
        id: 1, 
        img: "/src/assets/product/connectivity-options/connectivity.webp", 
        labels: [
            { num: 1, upperText: "reliable printers for all your needs.", lowerText: "power in Port" },
            { num: 2, upperText: "Stunning visuals, exceptional quality.", lowerText: "HDMI 2.0 port" },
            { num: 3, upperText: "Connect. Charge. Simplify.", lowerText: "DisplayPort 1.2 (2)" },
            { num: 4, upperText: "Built to perform, built to last.", lowerText: "Gigabit ethernet RJ45" },
            { num: 5, upperText: "Great deals on top tech.", lowerText: "uSB a 3.2 gen 2 (2)" },
            { num: 6, upperText: "Solutions you can depend on.", lowerText: "USB 3.2 Gen2 Type C" }
        ] 
    },
    { 
        id: 2, 
        img: "/src/assets/product/connectivity-options/connectivity.webp", 
        labels: [
            { num: 1, upperText: "reliable printers for all your needs.", lowerText: "power in Port" },
            { num: 2, upperText: "Stunning visuals, exceptional quality.", lowerText: "HDMI 2.0 port" },
            { num: 3, upperText: "Connect. Charge. Simplify.", lowerText: "DisplayPort 1.2 (2)" },
            { num: 4, upperText: "Built to perform, built to last.", lowerText:"Gigabit ethernet RJ45"  },
            { num: 5, upperText: "Great deals on top tech.", lowerText: "uSB a 3.2 gen 2 (2)" },
            { num: 6, upperText: "Solutions you can depend on.", lowerText: "USB 3.2 Gen2 Type C" }
        ]  
    },
];

function renderConnectivitySlider() {
    const container = document.querySelector('.connectivity-options-carousel');
    if (!container) return;

    container.innerHTML = `
        <div class="swiper gallery-main-connectivity">
            <div class="swiper-wrapper">
                ${products_image.map(item => `
                    <div class="swiper-slide connectivity-slide">
                        <img src="${item.img}" class="connectivity-img" /> 
                        <div class="label-container">
                            <div class='arrow-item-mobile-container' >
                                <div class='arrow-item-mobile arrow-mobile-1' >
                                    <div class='second-line' ></div>
                                    <div class="blue-circle"></div>
                                </div>
                                <div class='arrow-item-mobile arrow-mobile-2' >
                                    <div class='second-line' ></div>
                                    <div class="blue-circle"></div>
                                </div>
                                <div class='arrow-item-mobile arrow-mobile-3' >
                                    <div class='second-line' ></div>
                                    <div class="blue-circle"></div>
                                </div>
                                <div class='arrow-item-mobile arrow-mobile-4' >
                                    <div class='second-line' ></div>
                                    <div class="blue-circle"></div>
                                </div>
                                <div class='arrow-item-mobile arrow-mobile-5' >
                                    <div class='second-line' ></div>
                                    <div class="blue-circle"></div>
                                </div>
                                <div class='arrow-item-mobile arrow-mobile-6' >
                                    <div class='second-line' ></div>
                                    <div class="blue-circle"></div>
                                </div>
                            </div>
                            ${item.labels.map(label => `
                                <div class='label-item label-${label.num}'>
                                    <div class='label-texts'>
                                        <span class="label-upper-text">${label.upperText}</span>
                                        <span class="label-lower-text">${label.lowerText}</span>
                                    </div>
                                    <span class="label-num">${label.num}</span>
                                    <div class='arrow-item arrow-${label.num}' >
                                        <div class='first-line'></div>
                                        <div class='second-line' /></div>
                                        <div class="blue-circle"/></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="nav-container">
                           <div class="swiper-pagination"></div> 
                <div class="swiper-scrollbar"></div> 
 

                <div class="swiper-button-prev custom-prev-connectivity">
                    <img src="/img/prev-arrow.svg" alt="Previous"/>
                </div>
                <div class="swiper-button-next custom-next-connectivity">
                    <img src="/img/next-arrow.svg" alt="Next"/>
                </div>
            </div> 
        </div>
    `;

    new Swiper('.gallery-main-connectivity', {
        modules: [Navigation, Scrollbar, Pagination, EffectFade],
        spaceBetween: 0,
        effect: 'fade', 
        loop: true,
        navigation: {
            // CORRECCIÓN 2: Los selectores ahora coinciden con las clases del HTML.
            nextEl: '.custom-next-connectivity',
            prevEl: '.custom-prev-connectivity',
        },
         fadeEffect: {
            crossFade: true,
        },
    scrollbar: {
        el: '.swiper-scrollbar', // ✅ Selector correcto
        hide: false,            // ✅ Configuración para que esté visible
    },
            pagination: {
            el: '.swiper-pagination',
            type: 'fraction', // Esto mostrará "1 / 2"
        }
    });

    setupConnectivityAnimations();
}

function setupConnectivityAnimations() {
    const swiperContainer = document.querySelector('.gallery-main-connectivity');
    if (!swiperContainer) return;

    swiperContainer.addEventListener('click', (event) => {
        // 1. Identificar la zona clicable y el label-item padre.
        const clickableArea = event.target.closest('.label-texts, .label-num');
        if (!clickableArea) return;
        
        const clickedLabel = clickableArea.closest('.label-item');
        if (!clickedLabel) return;
        
        // 2. Asegurarse de que la interacción ocurra solo en el slide activo.
        const parentSlide = clickedLabel.closest('.swiper-slide');
        if (!parentSlide || !parentSlide.classList.contains('swiper-slide-active')) {
            return;
        }

        // Evitar re-animar el item que ya está activo.
        if (clickedLabel.classList.contains('active')) {
            return;
        }

        // --- LÓGICA RESPONSIVA ---
        // 3. Detectar si estamos en vista móvil.
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        // 4. Ocultar el 'arrow' activo anterior.
        const currentActiveLabel = parentSlide.querySelector('.label-item.active');
        if (currentActiveLabel) {
            currentActiveLabel.classList.remove('active');

            // Extraer el número del label anterior para saber qué flecha ocultar.
            const prevLabelNumMatch = currentActiveLabel.className.match(/label-(\d+)/);
            if (prevLabelNumMatch) {
                const prevNum = prevLabelNumMatch[1];
                let arrowToHide;

                if (isMobile) {
                    // En móvil, buscar la flecha en el contenedor del slide.
                    arrowToHide = parentSlide.querySelector(`.arrow-mobile-${prevNum}`);
                } else {
                    // En escritorio, buscar la flecha dentro del propio label.
                    arrowToHide = currentActiveLabel.querySelector('.arrow-item');
                }

                if (arrowToHide) {
                    gsap.to(arrowToHide, { opacity: 0, duration: 0.3 });
                }
            }
        }

        // 5. Mostrar el nuevo 'arrow' activo.
        clickedLabel.classList.add('active');

        // Extraer el número del label clickeado para saber qué flecha mostrar.
        const newLabelNumMatch = clickedLabel.className.match(/label-(\d+)/);
        if (newLabelNumMatch) {
            const newNum = newLabelNumMatch[1];
            let arrowToShow;
            
            if (isMobile) {
                // En móvil, buscar la flecha correspondiente en el contenedor del slide.
                arrowToShow = parentSlide.querySelector(`.arrow-mobile-${newNum}`);
            } else {
                // En escritorio, buscar la flecha dentro del label clickeado.
                arrowToShow = clickedLabel.querySelector('.arrow-item');
            }
            
            if (arrowToShow) {
                gsap.to(arrowToShow, { opacity: 1, duration: 0.3 });
            }
        }
    });

    // ACTUALIZADO: Aplicar la lógica de detener propagación a AMBOS tipos de flechas.
    const allArrows = document.querySelectorAll('.arrow-item, .arrow-item-mobile');
    allArrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            if (window.getComputedStyle(arrow).opacity === '0') {
                e.stopPropagation();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', renderConnectivitySlider);