import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Swiper from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

// Animaciones de entrada
const tl = gsap.timeline({});

tl.to('.white-overlay', {
    opacity: 0,
    pointerEvents: 'none',
    duration: 1.5,
});

tl.fromTo('nav',{
    yPercent: -100,
},{
    yPercent: 0,
    duration: 2,
    ease: 'power2.out',
}, "<")

tl.fromTo(".hero-container",{
    yPercent: 10,
},{
    yPercent: 0,
    duration: 2,
    ease: 'power2.out',
}, "<")

/*Categories*/
tl.fromTo(".section-2",{
    yPercent: 40,
},{
    yPercent: 0,
    duration: 2,
    ease: 'power2.out',
}, "<")

const shopTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.shop-section',
        start: 'top 80%',
        end: '20% 80%',
        scrub: true,
    }
});

shopTl.fromTo(".shop-section",{
    opacity: 0,
},{
    opacity: 1,
    duration: 2,
    ease: 'power2.out',
}, "<")

/*Benefits Section TL*/

const benefitsTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.benefits-section',
        start: 'top 80%',
        end: '70% 80%',
        scrub: true,
    }
});

benefitsTl.fromTo(".benefits-section h2",{
    yPercent: -500,
    alpha: 0
},{
    alpha: 1,
    yPercent: 0,
    duration: 1,
    ease: 'power2.out'
});

benefitsTl.fromTo(".benefits-section .img-container", {
    yPercent: -50,
    alpha: 0
},{
    alpha: 1,
    yPercent: 0,
    duration: 1,
    ease: 'power2.out'
}, "<");

/* benefitsTl.from(".benefits-section .benefit-item.item-1", {
    x: -500,
    duration: 1,
    ease: 'power2.out'
}, "<");
benefitsTl.from(".benefits-section .benefit-item.item-4", {
    x: 500,
    duration: 1,
    ease: 'power2.out'
}, "<"); */

/*About Section TL*/

const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.home-about',
        start: 'top 80%',
        end: '70% 80%',
        scrub: true,
    }
});

aboutTl.fromTo(".home-about h2",{
    scale: 0.9,
},{
    scale: 1,
    duration: 1,
    ease: 'power2.out'
})
.fromTo(".about-img-container",{
    width: '60%',
},{
    width: '100%',
    duration: 1,
    ease: 'power2.out'
}, "<")

/*Testimonial Tl*/
const testimonialTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 90%',
        end: '45% 90%',
        scrub: true,
    }
});

testimonialTl.fromTo(".testimonials .head", {
    xPercent: -100,
    autoAlpha: 0
}, {
    xPercent: 0,
    autoAlpha: 1,
    duration: 1,
    ease: 'power2.out'
}, "<")

testimonialTl.fromTo(".testimonials .text", {
    xPercent: 100,
    autoAlpha: 0
}, {
    xPercent: 0,
    autoAlpha: 1,
    duration: 1,
    ease: 'power2.out'
}, "<")

testimonialTl.fromTo(".testimonials .testimonial-carousel", {
    yPercent: 100,
    autoAlpha: 0
}, {
    yPercent: 0,
    autoAlpha: 1,
    duration: 1,
    ease: 'power2.out'
}, "<")


/*Benefits Slider*/

new Swiper(".benefits-slider", {
    modules: [Navigation, Pagination, EffectFade, Autoplay],
    loop: true,
    effect: "fade",
    autoplay: {
        delay: 5000,
        disableOnInteraction: true
    },
    slidesPerView: 1,
    pagination: {
        el: ".benefits-slider .swiper-pagination",
        type: "progressbar"
    },
});