import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const showAnim = gsap.from("nav", {
    yPercent: -300,
    paused: true,
    duration: 0.6,
    ease: "power1.inOut"
}).progress(1);

ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
        if (self.direction === -1) {
            showAnim.play();
        } else {
            showAnim.reverse();
        }
    }
});
setTimeout(() => {
    ScrollTrigger.refresh();
}, 100);


const menuButton = document.getElementById('menu-mb-buttom');
const overlay = document.querySelector('.submenu-overlay');
const mbMenu = document.querySelector('.mb-menu');
const cartButton = document.querySelector('.cart-button');
const signInLink = document.querySelector('.sign-in-link');
menuButton.addEventListener('click', () => {
  // Toggle the menu visibility
  menuButton.classList.toggle('active');
  overlay.classList.toggle('active');
  mbMenu.classList.toggle('active');
  cartButton.classList.toggle('inactive');
  signInLink.classList.toggle('active');
});
overlay.addEventListener('click', () => {
  menuButton.classList.remove('active');
  overlay.classList.remove('active');
  mbMenu.classList.remove('active');
  cartButton.classList.remove('inactive');
  signInLink.classList.remove('active');
});
