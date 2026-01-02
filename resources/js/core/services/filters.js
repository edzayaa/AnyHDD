function filterProducts() {
    const searchInput = document.getElementById('shop-search-input');
    const searchQuery = searchInput.value.toLowerCase().trim();
    const productsGrid = document.getElementById('products-grid');
    const products = productsGrid.querySelectorAll('.product-card');

    let visibleCount = 0;

    products.forEach(product => {
        const productTitle = product.querySelector('h3');
        const titleText = productTitle ? productTitle.textContent.toLowerCase() : '';

        const productType = product.querySelector('.product-card-top a');
        const typeText = productType ? productType.textContent.toLowerCase() : '';

        if (searchQuery === '' || titleText.includes(searchQuery) || typeText.includes(searchQuery)) {
            product.classList.remove('product-hidden');
            visibleCount++;
        } else {
            product.classList.add('product-hidden');
        }
    });

    let noResultsMsg = productsGrid.querySelector('.no-products-message');
    if (visibleCount === 0 && searchQuery !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-products-message';
            noResultsMsg.textContent = 'No products match your search.';
            productsGrid.appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

function clearFilters() {
    const form = document.getElementById('shop-filters-form');
    const sortSelect = document.getElementById('shop-sort-select');
    const searchInput = document.getElementById('shop-search-input');

    form.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    form.querySelectorAll('input[name="after"], input[name="before"]').forEach(input => input.remove());

    sortSelect.value = '';

    if (searchInput) {
        searchInput.value = '';
        filterProducts();
    }

    htmx.trigger(form, 'change');
}

window.filterProducts = filterProducts;
window.clearFilters = clearFilters;

function updatePaginationButtons() {
    const paginationData = document.getElementById('pagination-data');
    if (!paginationData) return;

    const hasNext = paginationData.getAttribute('data-has-next') === 'true';
    const hasPrev = paginationData.getAttribute('data-has-prev') === 'true';
    const endCursor = paginationData.getAttribute('data-end-cursor');
    const startCursor = paginationData.getAttribute('data-start-cursor');

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    if (prevButton) {
        prevButton.disabled = !hasPrev;
        prevButton.setAttribute('data-cursor', startCursor || '');
    }

    if (nextButton) {
        nextButton.disabled = !hasNext;
        nextButton.setAttribute('data-cursor', endCursor || '');
    }
}

function handlePagination(direction) {
    const form = document.getElementById('shop-filters-form');
    const paginationData = document.getElementById('pagination-data');
    if (!form || !paginationData) return;

    form.querySelectorAll('input[name="after"], input[name="before"]').forEach(input => input.remove());

    let cursorInput = document.createElement('input');
    cursorInput.type = 'hidden';

    if (direction === 'next') {
        const endCursor = paginationData.getAttribute('data-end-cursor');
        if (endCursor) {
            cursorInput.name = 'after';
            cursorInput.value = endCursor;
            form.appendChild(cursorInput);
        }
    } else if (direction === 'prev') {
        const startCursor = paginationData.getAttribute('data-start-cursor');
        if (startCursor) {
            cursorInput.name = 'before';
            cursorInput.value = startCursor;
            form.appendChild(cursorInput);
        }
    }

    htmx.trigger(form, 'change');
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('shop-filters-form');
    const sortSelect = document.getElementById('shop-sort-select');

    form.addEventListener('change', function (e) {
        if (!e.target.matches('input[name="after"], input[name="before"]')) {
            form.querySelectorAll('input[name="after"], input[name="before"]').forEach(input => input.remove());
        }
    });

    sortSelect.addEventListener('change', function () {
        let sortInput = form.querySelector('input[name="sortKey"]');
        if (!sortInput) {
            sortInput = document.createElement('input');
            sortInput.type = 'hidden';
            sortInput.name = 'sortKey';
            form.appendChild(sortInput);
        }
        sortInput.value = this.value;

        form.querySelectorAll('input[name="after"], input[name="before"]').forEach(input => input.remove());

        htmx.trigger(form, 'change');
    });

    document.querySelector('.prev-button')?.addEventListener('click', function () {
        if (!this.disabled) {
            handlePagination('prev');
        }
    });

    document.querySelector('.next-button')?.addEventListener('click', function () {
        if (!this.disabled) {
            handlePagination('next');
        }
    });

    document.body.addEventListener('htmx:afterSwap', function (evt) {
        if (evt.detail.target.id === 'products-grid') {
            updatePaginationButtons();
        }
    });

    updatePaginationButtons();

    document.body.addEventListener('htmx:configRequest', function (evt) {
        if (evt.detail.elt === form || evt.detail.elt.closest('#shop-filters-form')) {
            if (sortSelect.value) {
                evt.detail.parameters['sortKey'] = sortSelect.value;
            }
        }
    });
});