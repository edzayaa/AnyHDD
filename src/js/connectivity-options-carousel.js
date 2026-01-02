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
function initConnectivitySlider() {
    const container = document.querySelector('.connectivity-options-carousel');
    const swiperElement = container?.querySelector('.gallery-main-connectivity');
    if (!swiperElement) return;

    new Swiper('.gallery-main-connectivity', {
        modules: [Navigation, Scrollbar, Pagination, EffectFade],
        spaceBetween: 0,
        effect: 'fade',
        loop: true,
        navigation: {
            nextEl: '.custom-next-connectivity',
            prevEl: '.custom-prev-connectivity',
        },
        fadeEffect: {
            crossFade: true,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        }
    });

    setupConnectivityAnimations();
}

function setupConnectivityAnimations() {
    const allLabels = document.querySelectorAll('.label-item');

    allLabels.forEach(label => {
        const parentSlide = label.closest('.swiper-slide');
        if (!parentSlide) return;

        const labelNumMatch = label.className.match(/label-(\d+)/);
        if (!labelNumMatch) return;
        
        const num = labelNumMatch[1];
        
        const getArrow = () => {
            const isMobile = window.matchMedia('(max-width: 767px)').matches;
            if (isMobile) {
                return parentSlide.querySelector(`.arrow-mobile-${num}`);
            } else {
                return label.querySelector(`.arrow-${num}`);
            }
        };

        label.addEventListener('mouseenter', () => {
            // Actuar solo si el label está en el slide activo
            if (parentSlide.classList.contains('swiper-slide-active')) {
                const arrow = getArrow();
                if (arrow) {
                    gsap.killTweensOf(arrow); // Detener animación previa
                    gsap.to(arrow, { opacity: 1, duration: 0.3 });
                }
            }
        });

        label.addEventListener('mouseleave', () => {
            const arrow = getArrow();
            if (arrow) {
                gsap.killTweensOf(arrow); // Detener animación previa
                gsap.to(arrow, { opacity: 0, duration: 0.3 });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initConnectivitySlider);