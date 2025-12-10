import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const elementsToAnimatedTop = gsap.utils.toArray(".fade-in-feature")

elementsToAnimatedTop.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, y: -20, duration: 0.5, delay:0.5,
    scrollTrigger:{
      trigger:element,
      start:"top top+=85%",
      end:"top top+=60%",
      scrub:1,
      //markers:true,
      id:"FEATURE"
} }))



// New code for bottom-to-top animation
const elementsToAnimatedBottom = gsap.utils.toArray(".fade-in-bottom-feature")

elementsToAnimatedBottom.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, y: 20, duration: 0.5, delay:0.5,
    scrollTrigger:{
      trigger:element,
      start:"top top+=85%",
      end:"top top+=60%",
      scrub:1,
       id:"FEATURE-down",
    // markers:true
} }))

