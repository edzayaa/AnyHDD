import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import 'swiper/css';

// Inicializar el carousel de Best Sellers
let bestSellersSwiper = null;

const initBestSellersSwiper = () => {
    const swiperElement = document.querySelector('.best-sellers-swiper');

    if (!swiperElement) {
        return;
    }

    if (bestSellersSwiper) {
        bestSellersSwiper.destroy(true, true);
        bestSellersSwiper = null;
    }

    bestSellersSwiper = new Swiper('.best-sellers-swiper', {
        modules: [Navigation],
        slidesPerView: 1.2,
        loop: true,
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
};

document.addEventListener('DOMContentLoaded', () => {
    initBestSellersSwiper();

    document.body.addEventListener('htmx:afterSwap', (evt) => {
        if (evt.detail.target.id === 'best-sellers-wrapper') {
            initBestSellersSwiper();
        }
    });


    // if (window.location.pathname.includes('/collections')) {
    //     setTimeout(() => {
    //         bestSellersSwiper.update();
    //     }, 100);
    // }
});
