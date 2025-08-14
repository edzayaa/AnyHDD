import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import gsap from "gsap";

const mockProducts = [
    {
        id: '1',
        name: 'Dell Docking Station',
        category: 'Docking Station',
        img: '/img/product-img.png',
        price: 30000
    },
    {
        id: '2',
        name: 'Apple MacBook Pro',
        category: 'Laptop',
        img: '/img/product-img.png',
        price: 150000
    },
    {
        id: '3',
        name: 'Samsung Galaxy S21',
        category: 'Smartphone',
        img: '/img/product-img.png',
        price: 80000
    },
    {
        id: '4',
        name: 'Dell Docking Station',
        category: 'Docking Station',
        img: '/img/product-img.png',
        price: 30000
    },
    {
        id: '5',
        name: 'Apple MacBook Pro',
        category: 'Laptop',
        img: '/img/product-img.png',
        price: 150000
    },
    {
        id: '6',
        name: 'Samsung Galaxy S21',
        category: 'Smartphone',
        img: '/img/product-img.png',
        price: 80000
    },
    {
        id: '7',
        name: 'Product 7',
        category: 'Category 7',
        img: '/img/product-img.png',
        price: 70000
    },
    {
        id: '8',
        name: 'Product 8',
        category: 'Category 8',
        img: '/img/product-img.png',
        price: 80000
    }
];

const filterOptions = [
    {
        header: "Price",
        options: [
            { value: "80", label: "$ 25.00 - $80.00" },
            { value: "150", label: "$ 80.00 - $150.00" },
            { value: "200", label: "$ 150.00 - $200.00" },
        ],
    },
    {
        header: "Status",
        options: [
            { value: "on-sale", label: "On Sale" },
        ],
    },
    {
        header: "Number of Ports",
        options: [
            { value: "1", label: "1 Port" },
            { value: "2", label: "2 -3 Ports" },
            { value: "+3", label: "More than 3 Ports" },
        ],
    },
    {
        header: "Charging Type",
        options: [
            { value: "Built-in Battery", label: "Built-in Battery" },
            { value: "Magnetic", label: "Magnetic" },
        ],
    }
];

// Estado global para la paginación
const paginationState = {
    currentPage: 1,
    productsPerPage: 6,
    totalPages: Math.ceil(mockProducts.length / 6)
};

/**
 * Genera el HTML para una sola tarjeta de producto.
 * @param {object} product - El objeto de producto.
 * @returns {string} El string HTML de la tarjeta de producto.
 */
function renderProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-card-top">
                <h3>${product.name}</h3>
                <a href='/shop/category'>${product.category}</a>
            </div>
            <div class='product-card-img'>
                <img src="${product.img}" alt="${product.name}" />
            </div>
            <div class="product-card-details">
                <a href="/product/${product.id}">See Details</a>
                <div>
                    <button class="add-to-cart-button">
                        <img src="/img/plus-button.svg" alt="Add to Cart" />
                    </button>
                    <span>${product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renderiza el slider de "Mejores Vendedores".
 */
function renderBestSellersSlider() {
    const container = document.querySelector('.best-sellers-slide');
    if (!container) return;

    const slides = mockProducts.map(product => `
        <div class="swiper-slide">
            ${renderProductCard(product)}
        </div>
    `).join('');

    container.innerHTML = `
        <div class="swiper best-sellers-swiper">
            <div class="swiper-wrapper">
                ${slides}
            </div>
        </div>
    `;

    new Swiper('.best-sellers-swiper', {
        modules: [Navigation],
        slidesPerView: 1.3,
        spaceBetween: 20,
        navigation: {
            prevEl: ".best-sellers-slider-prev",
            nextEl: ".best-sellers-slider-next"
        },
        breakpoints: {
            480: {
                slidesPerView: 1.7,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 2.3,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1350: {
                slidesPerView: 4.4,
                spaceBetween: 25
            }
        }
    });
}

/**
 * Renderiza el componente de filtros y añade la interactividad.
 * @param {Array<object>} options - Las opciones de filtro.
 */
function renderFilter(options) {
    const container = document.querySelector('.filter-container');
    if (!container) return;

    container.innerHTML = options.map(option => `
        <div class="filter-option">
            <div class="filter-header" tabindex="0" role="button">
                <h4>${option.header}</h4>
                <svg class="filter-arrow" xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
                    <path d="M1 9L8.5 2L16 9" stroke="#052F5A" stroke-width="2"/>
                </svg>
            </div>
            <div class="filter-content">
                <ul class="filter-options">
                    ${option.options.map(opt => `
                        <li>
                            <label>
                                <input type="checkbox" value="${opt.value}" />
                                ${opt.label}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.filter-option').forEach(optionEl => {
        const header = optionEl.querySelector('.filter-header');
        const content = optionEl.querySelector('.filter-content');
        const arrow = optionEl.querySelector('.filter-arrow');
        // Asegura que los filtros están inicializados como abiertos
        gsap.set(content, { height: "auto" });
        arrow.style.transform = "rotate(0deg)";

        header.addEventListener('click', () => {
            const isContentVisible = content.offsetHeight > 0;
            if (isContentVisible) {
                gsap.to(content, { height: 0, duration: 0.3, ease: "none" });
                gsap.to(arrow, { rotate: -180, duration: 0.3 });
            } else {
                gsap.to(content, { height: "auto", duration: 0.3, ease: "none" });
                gsap.to(arrow, { rotate: 0, duration: 0.3 });
            }
        });
        header.addEventListener('keydown', (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                header.click();
            }
        });
    });
}

/**
 * Renderiza la lista de productos paginados.
 * @param {Array<object>} products - La lista de productos a mostrar.
 */
function renderProductsList(products) {
    const container = document.querySelector('.products-container .products');
    if (!container) return;

    const startIndex = (paginationState.currentPage - 1) * paginationState.productsPerPage;
    const endIndex = startIndex + paginationState.productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    container.innerHTML = paginatedProducts.map(renderProductCard).join('');
}

/**
 * Lógica para obtener los números de página.
 * @param {number} current - La página actual.
 * @param {number} total - El total de páginas.
 * @returns {Array<(number|string)>} Un array de números de página y elipses.
 */
function getPageNumbers(current, total) {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    const pages = [];
    pages.push(1);

    if (current > 4) {
        pages.push('...');
    }

    const start = Math.max(2, current - 2);
    const end = Math.min(total - 1, current + 2);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < total - 1) {
        pages.push('...');
    }

    if (total > 1) {
        pages.push(total);
    }

    // Asegurarse de que el total no se duplique si está en el rango
    return pages.filter((value, index, self) => self.indexOf(value) === index);
}

/**
 * Renderiza el componente de paginación.
 * @param {number} currentPage - La página actual.
 * @param {number} totalPages - El total de páginas.
 */
function renderPagination(currentPage, totalPages) {
    const container = document.querySelector('.pagination-container');
    if (!container) return;

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    const paginationHTML = `
        <div class="pagination">
            <button class="prev-button" ${currentPage === 1 ? 'disabled' : ''}>
                <img src="/img/prev-arrow.svg" alt="Previous" />
            </button>
            ${pageNumbers.map((page, idx) =>
                typeof page === 'number' ? `
                    <button class="page-button ${currentPage === page ? 'active' : ''}" data-page="${page}">
                        ${page < 10 ? `0${page}` : page}
                    </button>
                ` : `
                    <span key="ellipsis-${idx}" class="ellipsis">...</span>
                `
            ).join('')}
            <button class="next-button" ${currentPage === totalPages ? 'disabled' : ''}>
                <img src="/img/next-arrow.svg" alt="Next" />
            </button>
        </div>
    `;

    container.innerHTML = paginationHTML;

    // Agregar event listeners a los botones de paginación
    const prevButton = container.querySelector('.prev-button');
    const nextButton = container.querySelector('.next-button');
    const pageButtons = container.querySelectorAll('.page-button');

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    });

    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.dataset.page);
            onPageChange(page);
        });
    });
}

/**
 * Maneja el cambio de página y actualiza la UI.
 * @param {number} newPage - La nueva página a la que navegar.
 */
function onPageChange(newPage) {
    if (newPage >= 1 && newPage <= paginationState.totalPages) {
        paginationState.currentPage = newPage;
        // Volver a renderizar la lista de productos y la paginación con el nuevo estado
        renderProductsList(mockProducts);
        renderPagination(paginationState.currentPage, paginationState.totalPages);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBestSellersSlider();
    renderFilter(filterOptions);
    renderProductsList(mockProducts);
    renderPagination(paginationState.currentPage, paginationState.totalPages);
});