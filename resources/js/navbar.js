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

// --- Lógica de búsqueda (HTMX) ---
document.addEventListener('DOMContentLoaded', () => {
    const resultsWrapper = document.querySelector('.search-results-container');
    const overlay = document.querySelector('.search-overlay');
    const input = document.getElementById('search-nav-input');
    const button = document.getElementById('search-nav-button');
    const resultsContainer = document.querySelector('.search-results-list');

    function showResults() {
        if (resultsContainer) resultsContainer.parentElement.classList.add('show');
        if (overlay) overlay.classList.remove('not-show');
        if (button) button.setAttribute('data-search-content', '');
    }

    function hideResults() {
        if (resultsContainer) resultsContainer.parentElement.classList.remove('show');
        if (overlay) overlay.classList.add('not-show');
        if (button) button.removeAttribute('data-search-content');
    }

    // HTMX Handler
    if (resultsContainer) {
        resultsContainer.addEventListener('htmx:afterSwap', (e) => {
             // Check if content is actually empty or just whitespace
            if (resultsContainer.innerHTML.trim().length > 0) {
                showResults();
            } else {
                hideResults();
            }
        });
    }

    // Ocultar resultados al hacer click en el contenedor de resultados (opcional)
    if (resultsWrapper) {
        resultsWrapper.addEventListener('click', (e) => {
             // Optional: close on click? Generally predictive search stays open until selection.
             // But maybe clicking outside closes it.
        });
    }

    // Ocultar resultados y overlay al hacer click en el overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            hideResults();
        });
    }

    // Mostrar resultados al hacer focus en el input
    if (input) {
        input.addEventListener('focus', () => {
            if (input.value.trim() && resultsContainer.innerHTML.trim().length > 0) {
                showResults();
            }
        });
        
        input.addEventListener('input', () => {
             if (input.value.trim() === '') {
                 hideResults();
                 resultsContainer.innerHTML = '';
             }
        });
    }
});


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