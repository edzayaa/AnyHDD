import '../../SmoothScroll';
import '../../navbar';
import '../../home-hero';
import '../../categories-slider';
import '../../shop-filters';
import '../../hover-matcher';
import '../../main';
import '../../shopping-bag';
import '../../fade-in';
import '../../white-overlay';
import '../../show-navbar';
import '../../best-sellers-carousel';

document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const paginationData = document.getElementById('pagination-data');
    
    if (!paginationData) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const hasNext = paginationData.dataset.hasNext === 'true';
            const endCursor = paginationData.dataset.endCursor;
            
            if (hasNext && endCursor) {
                const url = new URL(window.location.href);
                url.searchParams.set('nextCursor', endCursor);
                url.searchParams.delete('previousCursor');
                window.location.href = url.toString();
            }
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const hasPrev = paginationData.dataset.hasPrev === 'true';
            const startCursor = paginationData.dataset.startCursor;
            
            if (hasPrev && startCursor) {
                const url = new URL(window.location.href);
                url.searchParams.set('previousCursor', startCursor);
                url.searchParams.delete('nextCursor');
                window.location.href = url.toString();
            }
        });
    }
});