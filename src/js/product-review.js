import gsap from "gsap";

document.addEventListener('DOMContentLoaded', () => {
    const writeReviewBtn = document.querySelector('.write-review-button');
    const reviewListContainer = document.querySelector('.review-list');
    const reviewContainer = document.querySelector('.review-container'); // Parent container
    const reviewFormContainer = document.querySelector('.review-form-container');
    const submitBtn = document.querySelector('.submit-review-btn');
    const backBtn = document.querySelector('.back-to-reviews-btn'); // Optional, if we add one

    if (writeReviewBtn && reviewFormContainer) {
        writeReviewBtn.addEventListener('click', () => {
            // Hide review list and title
            if (reviewListContainer) reviewListContainer.style.display = 'none';
            writeReviewBtn.style.display = 'none';

            // Show form
            reviewFormContainer.style.display = 'block';

            // GSAP Animation
            gsap.fromTo(reviewFormContainer,
                { autoAlpha: 0, y: 20 },
                { duration: 0.8, autoAlpha: 1, y: 0, ease: "power2.out" }
            );
        });
    }

    // Star Rating Interaction
    const starContainer = document.querySelector('.form-stars');
    if (starContainer) {
        const stars = starContainer.querySelectorAll('svg');
        let currentRating = 0;

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                currentRating = index + 1;
                updateStars(stars, currentRating);
            });

            star.addEventListener('mouseover', () => {
                updateStars(stars, index + 1);
            });

            star.addEventListener('mouseout', () => {
                updateStars(stars, currentRating);
            });
        });
    }

    function updateStars(stars, rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
                star.querySelector('path').setAttribute('fill', '#2F80ED'); // Blue
                star.querySelector('path').setAttribute('stroke', '#2F80ED');
            } else {
                star.classList.remove('active');
                star.querySelector('path').setAttribute('fill', 'none');
                star.querySelector('path').setAttribute('stroke', '#052F5A'); // Dark Blue border
            }
        });
    }
});
