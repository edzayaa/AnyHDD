import Swiper from "swiper";
import { EffectFade, Navigation, Pagination, Scrollbar } from "swiper/modules";

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
            { num: 3, upperText: "Connect. Charge. Simplify.", lowerText: "Gigabit ethernet RJ45" },
            { num: 4, upperText: "Built to perform, built to last.", lowerText: "HDMI 2.0 port" },
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
            { num: 3, upperText: "Connect. Charge. Simplify.", lowerText: "Gigabit ethernet RJ45" },
            { num: 4, upperText: "Built to perform, built to last.", lowerText: "HDMI 2.0 port" },
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
                            ${item.labels.map(label => `
                                <div class='label-item label-${label.num}'>
                                    <div class='label-texts'>
                                        <span class="label-upper-text">${label.upperText}</span>
                                        <span class="label-lower-text">${label.lowerText}</span>
                                    </div>
                                    <span class="label-num">${label.num}</span>
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
}

document.addEventListener('DOMContentLoaded', renderConnectivitySlider);