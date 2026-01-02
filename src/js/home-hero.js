import Swiper from "swiper";
import 'swiper/css'
import { Pagination } from "swiper/modules";
import gsap from "gsap";

export function initHeroSlider() {
    const container = document.querySelector('.hero-container');
    const swiperElement = container?.querySelector('.hero-swiper');
    if (!swiperElement) return;

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
                let pagHtml = '';
                for (let i = 1; i <= total; i++) {
                    pagHtml += `<span class="swiper-pagination-bullet${i === current ? ' active' : ''}" data-index="${i}"><span class="bullet-inner">${i}</span></span>`;
                    if (i < total) {
                        pagHtml += `<span class="bullet-separator" aria-hidden="true"></span>`;
                    }
                }
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

    document.addEventListener('click', function(e) {
        const bullet = e.target.closest('.swiper-pagination-bullet');
        if (!bullet) return;
        const index = parseInt(bullet.getAttribute('data-index')) - 1;
        heroSlide.slideTo(index);
    });
}

function positionBullets(swiper) {
    const arc = document.querySelector('.swiper-pagination-arc');
    if (!arc) return;
    window.requestAnimationFrame(() => {
        if (arc.style.display !== 'flex') {
            arc.style.display = 'flex';
            arc.style.flexDirection = 'row';
            arc.style.justifyContent = 'center';
            arc.style.alignItems = 'center';
            arc.style.width = '100%';
            arc.style.height = 'auto';
            arc.style.gap = '0.75rem';
            arc.style.margin = '20px auto';
        }
    });
}

document.addEventListener('DOMContentLoaded', initHeroSlider);