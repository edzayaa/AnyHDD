import Swiper from "swiper";
import 'swiper/css'
import { Pagination } from "swiper/modules";
import gsap from "gsap";

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
            <div class="swiper-pagination"></div>
        </div>
        <div class="swiper-hero-thumbnail-container"></div>
    `;
const heroSlide = new Swiper('.hero-swiper', {
    modules: [Pagination],
    slidesPerView: 1,
    loop: true,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        renderCustom: (swiper, current, total) => {
            // Genera los números de página con separadores
            let pagHtml = '';
            for (let i = 1; i <= total; i++) {
                pagHtml += `<span class="swiper-pagination-bullet${i === current ? ' active' : ''}" data-index="${i}"><span class="bullet-inner">${i}</span></span>`;
                if (i < total) {
                    pagHtml += `<span class="bullet-separator" aria-hidden="true"></span>`;
                }
            }
            // Envuelve en un contenedor para el arco
            return `<div class="swiper-pagination-arc">${pagHtml}</div>`;
        },
    },
    on: {
        init: function() {
            positionBullets(this);
        },
        slideChange: function() {
            positionBullets(this);
        },
        slideChangeTransitionEnd: function() {
            positionBullets(this);
        }
    }
});

// Función para posicionar las bullets en forma de ruleta
function positionBullets(swiper) {
    const total = swiper.slides.length;
    const activeIndex = swiper.realIndex;
    const arc = document.querySelector('.swiper-pagination-arc');
    if (!arc) return;
    const bullets = arc.querySelectorAll('.swiper-pagination-bullet');
    const separators = arc.querySelectorAll('.bullet-separator');

    // Layout horizontal, 100% ancho, separación y punto blanco
    gsap.set(arc, {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        gap: '0.75rem',
        margin: '20px auto',
    });
}

// Añadir event listeners para los bullets
document.addEventListener('click', function(e) {
    if (e.target.closest('.swiper-pagination-bullet')) {
        const bullet = e.target.closest('.swiper-pagination-bullet');
        const index = parseInt(bullet.getAttribute('data-index')) - 1;
        heroSlide.slideTo(index);
    }
});
}

document.addEventListener('DOMContentLoaded', renderHeroSlider);