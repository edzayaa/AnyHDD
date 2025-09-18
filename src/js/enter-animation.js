import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const elementsToAnimatedTop = gsap.utils.toArray(".fade-in-top")

elementsToAnimatedTop.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, y: -20, duration: 0.5, delay:1,
    scrollTrigger:{
      trigger:element,
      start:"top top+=10%",
      //markers:true
} }))

const elementsToAnimatedLeft = gsap.utils.toArray(".fade-in-left")

elementsToAnimatedLeft.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, x: -20, duration: 0.5, delay:1,
    scrollTrigger:{
      trigger:element,
      start:"top top+=10%",
      //markers:true
} }))

// New code for right-to-left animation
const elementsToAnimatedRight = gsap.utils.toArray(".fade-in-right")

elementsToAnimatedRight.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, x: 20, duration: 0.5, delay:1,
    scrollTrigger:{
      trigger:element,
      start:"top top+=10%",
      //markers:true
} }))

// New code for bottom-to-top animation
const elementsToAnimatedBottom = gsap.utils.toArray(".fade-in-bottom")

elementsToAnimatedBottom.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, y: 20, duration: 0.5, delay:1,
    scrollTrigger:{
      trigger:element,
      start:"top top+=10%",
      //markers:true
} }))