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

    if (resultsContainer) {
        resultsContainer.addEventListener('htmx:afterSwap', (e) => {
            if (resultsContainer.innerHTML.trim().length > 0) {
                showResults();
            } else {
                hideResults();
            }
        });
    }

    if (resultsWrapper) {
        resultsWrapper.addEventListener('click', (e) => {
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            hideResults();
        });
    }

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

        input.addEventListener('blur', () => {
            setTimeout(() => {
                hideResults();
            }, 200);
        });
    }

    const navElement = document.querySelector('nav');
    const allCategoriesLink = document.querySelector('.desk-submenu .all-categories-toggle');
    const allCategoriesItem = allCategoriesLink?.closest('li');
    const dropdown = allCategoriesItem?.querySelector('.all-categories-dropdown');

    if (navElement && allCategoriesLink && allCategoriesItem && dropdown) {
        allCategoriesItem.classList.add('all-categories-item');
        allCategoriesLink.classList.add('all-categories-toggle');
        allCategoriesLink.setAttribute('role', 'button');
        allCategoriesLink.setAttribute('aria-haspopup', 'true');
        allCategoriesLink.setAttribute('aria-expanded', 'false');

        const closeDropdown = () => {
            allCategoriesItem.classList.remove('open');
            allCategoriesLink.setAttribute('aria-expanded', 'false');
        };

        const openDropdown = () => {
            allCategoriesItem.classList.add('open');
            allCategoriesLink.setAttribute('aria-expanded', 'true');
        };

        allCategoriesLink.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = allCategoriesItem.classList.contains('open');
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        dropdown.addEventListener('click', (event) => event.stopPropagation());

        document.addEventListener('click', (event) => {
            if (allCategoriesItem.classList.contains('open') && !allCategoriesItem.contains(event.target)) {
                closeDropdown();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeDropdown();
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