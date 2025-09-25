import gsap from "gsap";


gsap.to(".float", {
  y: -25, 
  duration: 2,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});