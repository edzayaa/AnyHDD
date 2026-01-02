


import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";

// Importa los estilos necesarios
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function initProductSliders() {
    const container = document.querySelector('.product-slider-container');
    if (!container) return;

    const thumbsElement = container.querySelector('.gallery-thumbs');
    const mainElement = container.querySelector('.gallery-main');
    if (!thumbsElement || !mainElement) return;

    const thumbsSwiper = new Swiper('.gallery-thumbs', {
        modules: [Thumbs],
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });

    new Swiper('.gallery-main', {
        modules: [Navigation, Thumbs],
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        },
        thumbs: {
            swiper: thumbsSwiper,
        },
    });
}

document.addEventListener('DOMContentLoaded', initProductSliders);