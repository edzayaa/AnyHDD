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

// --- Lógica de búsqueda y mock ---
document.addEventListener('DOMContentLoaded', () => {
  const resultsWrapper = document.querySelector('.search-results-container');
  const overlay = document.querySelector('.search-overlay'); // Asegúrate de tener este elemento en tu HTML
  const input = document.getElementById('search-nav-input');
  const button = document.getElementById('search-nav-button');
  const resultsContainer = document.querySelector('.search-results-list');

  // Mock de productos
  const mockProducts = [
    {
      name: 'Product 1',
      price: '50.00$',
      img: '/img/product-img.png',
      url: '#1'
    },
    {
      name: 'Product 2',
      price: '75.00$',
      img: '/img/product-img.png',
      url: '#2'
    },
    {
      name: 'Product 3',
      price: '100.00$',
      img: '/img/product-img.png',
      url: '#3'
    }
  ];

  function renderResults(products) {
    if (!resultsContainer) return;
    if (!products.length) {
      resultsContainer.innerHTML = '<li class="search-result-item">No results found</li>';
      return;
    }
    resultsContainer.innerHTML = products.map(p => `
      <li class="search-result-item">
        <a href="${p.url}">
          <div class="img-container">
            <img src="${p.img}" alt="">
          </div>
          <div class="search-result-content">
            <div class="text-container">
              <h5>${p.name}</h5>
              <h5 class="price">${p.price}</h5>
            </div>
            <h6>See Details</h6>
          </div>
        </a>
      </li>
    `).join('');
  }


  // Debounce helper
  function debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const handleSearch = debounce(() => {
    const query = input.value.trim().toLowerCase();
    if (query) {
      button.setAttribute('data-search-content', '');
      const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(query));
      renderResults(filtered);
      if (resultsContainer) resultsContainer.parentElement.classList.add('show');
      if (overlay) overlay.classList.remove('not-show');
    } else {
      button.removeAttribute('data-search-content');
      renderResults([]);
      if (resultsContainer) resultsContainer.parentElement.classList.remove('show');
      if (overlay) overlay.classList.add('not-show');
    }
  }, 300);


  input.addEventListener('input', handleSearch);


  // Ocultar resultados al hacer click en el contenedor de resultados
  if (resultsWrapper) {
    resultsWrapper.addEventListener('click', (e) => {
      if (resultsContainer) resultsContainer.parentElement.classList.remove('show');
      if (overlay) overlay.classList.add('not-show');
    });
  }

  // Ocultar resultados y overlay al hacer click en el overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (resultsContainer) resultsContainer.parentElement.classList.remove('show');
      overlay.classList.add('not-show');
    });
  }

  // Mostrar resultados al hacer focus en el input
  input.addEventListener('focus', () => {
    if (input.value.trim()) {
      if (resultsContainer) resultsContainer.parentElement.classList.add('show');
      if (overlay) overlay.classList.remove('not-show');
    }
  });

  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (button.hasAttribute('data-search-content')) {
      // Limpiar
      input.value = '';
      button.removeAttribute('data-search-content');
      renderResults([]);
      if (resultsContainer) resultsContainer.parentElement.classList.remove('show');
      input.focus();
    } else {
      // Buscar (mock)
      const query = input.value.trim().toLowerCase();
      if (query) {
        button.setAttribute('data-search-content', '');
        const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(query));
        console.log(filtered)
        renderResults(filtered);
        if (resultsContainer) resultsContainer.parentElement.classList.add('show');
      }
    }
  });
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
