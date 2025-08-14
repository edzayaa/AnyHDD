import Swiper from 'swiper';
import { EffectCards, Pagination } from 'swiper/modules';
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
        </div>
    `;

    new Swiper('.testimonials-swiper', {
        modules: [EffectCards, Pagination],
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
        },
        effect: 'cards',
        loop: true,
        spaceBetween: 30,
        slidesPerView: 3,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        }
    });
}

document.addEventListener('DOMContentLoaded', renderTestimonialsSlider);