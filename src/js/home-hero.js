import Swiper from "swiper";
import 'swiper/css'

const mockData = [
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    },
    {
        title1: "AnyHDD Dual Monitor",
        title2: "Docking Station",
        image1: "/img/hero-bg.png",
        subimg: "/img/hero-img-2.jpg",
        subtitle: "Find out about us and our mission",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et arcu enim."
    }
];

export function renderHeroSlider() {
    const container = document.querySelector('.hero-container');
    if (!container) return;

    let slides = '';
    mockData.forEach(item => {
        slides += `
        <div class="swiper-slide hero-slide">
            <div class="hero-bg-img">
                <img src="${item.image1}" alt="${item.title1}" />
            </div>
            <div class="overlay"></div>
            <div class="content">
                <div class="titles">
                    <h1 class="hero-title">${item.title1}</h1>
                    <h1 class="hero-title hero-title-2">${item.title2}</h1>
                </div>
                <div class="card">
                    <img src="${item.subimg}" alt="${item.title2}" />
                    <div>
                        <h3>${item.subtitle}</h3>
                        <p>${item.text}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = `
        <div class="swiper hero-swiper">
            <div class="swiper-wrapper">
                ${slides}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="swiper-hero-thumbnail-container"></div>
    `;

    new Swiper('.hero-swiper', {
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
}

document.addEventListener('DOMContentLoaded', renderHeroSlider);