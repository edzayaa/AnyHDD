import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);


const footerTl = gsap.timeline({
  scrollTrigger: {
    trigger: 'footer',
    start: 'top bottom',
    end: 'top top',
    scrub: true,
  }
});

footerTl.fromTo("footer .first-divider", {
    width: "80%"
}, {
    width: "100%",
    duration: 1,
    ease: 'power2.out'
});
footerTl.fromTo("footer .content", {
    yPercent: 80,
},{
    yPercent: 0,
    duration: 3,
    ease: 'power2.out'
}, "<");