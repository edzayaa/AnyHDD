import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import 'swiper/css'

function initCategoriesSlider() {
    const container = document.querySelector('.categories-slider-container');
    const swiperElement = container?.querySelector('.categories-swiper');
    if (!swiperElement) return;

    new Swiper('.categories-swiper', {
        modules: [Navigation],
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 20,
        navigation: {
            prevEl: ".categories-slider-prev",
            nextEl: ".categories-slider-next"
        },
        breakpoints: {
            10: {
                slidesPerView: 1.8,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 5,
                spaceBetween: 20,
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initCategoriesSlider);