import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";

// Importa los estilos necesarios
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const products_image = [
    { id:1, img: "/src/assets/product/1.webp" },
    { id:2, img: "/src/assets/product/2.webp" },
    { id:3, img: "/src/assets/product/3.webp" },
    { id:4, img: "/src/assets/product/4.webp" },
    { id:5, img: "/src/assets/product/1.webp" },
    { id:6, img: "/src/assets/product/2.webp" },
    { id:7, img: "/src/assets/product/3.webp" },
];

function renderCategoriesSlider() {
    const container = document.querySelector('.product-slider-container');
    console.log("holis")
    if (!container) return;
   console.log("aloha")
    // Estructura HTML con ambos sliders SEPARADOS
    container.innerHTML = `
        <div class="swiper gallery-main">
            <div class="swiper-wrapper">
                ${products_image.map(item => `
                    <div class="swiper-slide product-slide">
                        <img src="${item.img}" class="product-img" /> 
                    </div>
                `).join('')}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>

        <div class="swiper gallery-thumbs">
            <div class="swiper-wrapper">
                ${products_image.map(item => `
                    <div class="swiper-slide product-slide-thumb">
                        <img src="${item.img}" class="product-img-thumb" /> 
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 1. Inicializar el Swiper de miniaturas PRIMERO
    const thumbsSwiper = new Swiper('.gallery-thumbs', {
        modules: [Thumbs],
        spaceBetween: 10,
        slidesPerView: 4, // Muestra 4 miniaturas a la vez
        freeMode: true,
        watchSlidesProgress: true, // Importante para que la sincronización funcione
    });

    // 2. Inicializar el Swiper principal y conectarlo con las miniaturas
    new Swiper('.gallery-main', {
        modules: [Navigation, Thumbs],
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // ✨ La magia sucede aquí: se conecta con la instancia del swiper de miniaturas
        thumbs: {
            swiper: thumbsSwiper,
        },
    });
}

document.addEventListener('DOMContentLoaded', renderCategoriesSlider);