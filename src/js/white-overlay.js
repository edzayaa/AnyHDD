import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";


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