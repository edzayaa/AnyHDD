import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const elementsToAnimatedTop = gsap.utils.toArray(".fade-in-top")

elementsToAnimatedTop.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, y: -20, duration: 0.5, delay:0.5,
    scrollTrigger:{
      trigger:element,
      start:"top top+=60%",
      end:"top top+=40%",
      scrub:1,
      markers:true
} }))

const elementsToAnimatedLeft = gsap.utils.toArray(".fade-in-left")

elementsToAnimatedLeft.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, x: -20, duration: 0.5, delay:0.5,
    scrollTrigger:{
      trigger:element,
      start:"top top+=60%",
      end:"top top+=30%",
      scrub:1,
      markers:true
} }))

// New code for right-to-left animation
const elementsToAnimatedRight = gsap.utils.toArray(".fade-in-right")

elementsToAnimatedRight.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, x: 20, duration: 0.5, delay:0.5,
    scrollTrigger:{
      trigger:element,
      start:"top top+=60%",
      end:"top top+=30%",
      scrub:1,
      markers:true
} }))

// New code for bottom-to-top animation
const elementsToAnimatedBottom = gsap.utils.toArray(".fade-in-bottom")

elementsToAnimatedBottom.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, y: 20, duration: 0.5, delay:0.5,
    scrollTrigger:{
      trigger:element,
      start:"top top+=60%",
      end:"top top+=85%",
      scrub:1
    // markers:true
} }))

// New code for bottom-to-top animation
const subtitleToAnimatedBottom = gsap.utils.toArray(".fade-in-bottom-subtitle")

subtitleToAnimatedBottom.forEach((element) => gsap.from(element, { 
    autoAlpha: 0, y: 20, duration: 0.25, delay:0.5,
    scrollTrigger:{
      trigger:element,
      start:"top top+=85%",
      end:"top top+=95%",
      scrub:1,
      markers:true
} }))