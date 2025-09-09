import Swiper from 'swiper';
import { Autoplay, EffectCards, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const mockTestimonials = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet consectetur. Malesuada tempor imperdiet fermentum vitae ut lorem placerat lectus. Consectetur tincidunt erat id diam phasellus viverra. Amet dolor semper eu id id in pulvinar. Orci varius nisi feugiat porttitor turpis in at.",
        author: "Happy Customer"
    },
    {
        id: 2,
        text: "I can't imagine my life without this product!",
        author: "Satisfied Client"
    },
    {
        id: 3,
        text: "The best investment I've ever made!",
        author: "Loyal User"
    },
    {
        id: 4,
        text: "Lorem ipsum dolor sit amet consectetur. Malesuada tempor imperdiet fermentum vitae ut lorem placerat lectus. Consectetur tincidunt erat id diam phasellus viverra. Amet dolor semper eu id id in pulvinar. Orci varius nisi feugiat porttitor turpis in at.",
        author: "Happy Customer"
    },
    {
        id: 5,
        text: "I can't imagine my life without this product!",
        author: "Satisfied Client"
    }
];

function renderTestimonialsSlider() {
    const section = document.querySelector('.testimonial-carousel');
    if (!section) return;

        section.innerHTML = `
                <div class="swiper testimonials-swiper swiper-container">
                    <div class="swiper-wrapper">
                        ${mockTestimonials.map((testimonial, index) => `
                            <div class="swiper-slide">
                                <div class="testimonial-card ${index % 2 !== 0 ? "testimonial-blue" : ""}">
                                        <div class="bg-img">
                                                <img src="/img/${index % 2 !== 0 ? "blue" : "grey"}-testimonial-card.png" alt="${testimonial.author}" />
                                        </div>
                                        <div class="testimonial-content">
                                                <p class='text'>${testimonial.text}</p>
                                                <p class='author'>${testimonial.author}</p>
                                        </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-next swiper-nav-desktop"></div>
                    <div class="swiper-button-prev swiper-nav-desktop"></div>
                </div>
                <style>
                    .swiper-nav-desktop {
                        display: none;
                    }
                    @media (min-width: 1024px) {
                        .swiper-nav-desktop {
                            display: block;
                        }
                    }
                </style>
        `;

    const swiperTestimonial = new Swiper('.testimonials-swiper', {
        modules: [EffectCards, Pagination, Autoplay, Navigation],
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
        },
        effect: 'cards',
        cardsEffect:{
            slideShadows: false,
            rotate: false
        },
        loop: true,
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: false
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: false
            },
            768: {
                slidesPerView: 1.2,
                spaceBetween: 40,
                navigation: false
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 50,
                cardsEffect: {
                    slideShadows: false,
                    rotate: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
        }
    });
}

document.addEventListener('DOMContentLoaded', renderTestimonialsSlider);