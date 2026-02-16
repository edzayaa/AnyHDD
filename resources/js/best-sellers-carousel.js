import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import 'swiper/css';

// Inicializar el carousel de Best Sellers
document.addEventListener('DOMContentLoaded', () => {
    const bestSellersSwiper = new Swiper('.best-sellers-swiper', {
        modules: [Navigation],
        loop:'infinite',
        slidesPerView: 1.2,
        spaceBetween: 20,
        navigation: {
            prevEl: ".best-sellers-slider-prev",
            nextEl: ".best-sellers-slider-next"
        },
        breakpoints: {
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            768: {
                slidesPerView: "auto"
            },
            1024: {
                slidesPerView: "auto",
            },
            1280: {
                slidesPerView: "auto",
            }
        }
    });
});
