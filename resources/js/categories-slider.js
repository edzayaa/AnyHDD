import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import 'swiper/css'

let categories = [];

const getCollections = async () => {
    try {
        const response = await fetch('/api/shop/collections');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        categories = data.edges;
    } catch (error) {
        console.error('Error fetching collections:', error);
        return [];
    }
}

function renderCategoriesSlider() {
    const container = document.querySelector('.categories-slider-container');
    if (!container) return;

    if (categories.length === 0) return;

    container.innerHTML = `
        <div class="navigation-wrapper" style="position: relative;">
            <div class="categories-slider-prev"></div>
            <div class="categories-slider-next"></div>
            
            <div class="swiper categories-swiper">
                <div class="swiper-wrapper">
                    ${categories.map(category => `
                        <div class="swiper-slide category-slide">
                            <a href="/collections/${category.node.handle}" class="category-card">
                                <img src="/img/category-bg.png" alt="Category" class="category-bg" />
                                <div class="content-hover-bg">
                                </div>
                                <div class="content">
                                    <h3>${category.node.title}</h3>
                                    <p>${category.node.description}</p>
                                    <div class="explore-category">
                                        <span>Explore Category</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                                            <path d="M15.4178 5.29061C15.6613 5.04705 15.6613 4.65217 15.4178 4.40861L11.4488 0.439595C11.2052 0.196036 10.8103 0.196036 10.5668 0.439595C10.3232 0.683153 10.3232 1.07804 10.5668 1.3216L14.0948 4.84961L10.5668 8.37762C10.3232 8.62118 10.3232 9.01607 10.5668 9.25962C10.8103 9.50318 11.2052 9.50318 11.4488 9.25962L15.4178 5.29061ZM0.0742188 4.84961L0.0742188 5.47328L14.9768 5.47328V4.84961V4.22594L0.0742187 4.22594L0.0742188 4.84961Z" fill="black"/>
                                        </svg>
                                    </div>
                                    <img src="${category.node.image ? category.node.image.url : '/img/category-bg.png'}" alt="${category.node.title}" class="category-img" />
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // Inicializa Swiper
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

document.addEventListener('DOMContentLoaded', async () => {
    await getCollections();
    renderCategoriesSlider();
});