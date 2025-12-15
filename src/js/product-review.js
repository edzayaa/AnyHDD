document.addEventListener('DOMContentLoaded', () => {
    const writeReviewBtn = document.querySelector('.write-review-button');
    const reviewListContainer = document.querySelector('.review-list');
    const reviewContainer = document.querySelector('.review-container'); // Parent container
    const reviewFormContainer = document.querySelector('.review-form-container');
    const submitBtn = document.querySelector('.submit-review-btn');
    const backBtn = document.querySelector('.back-to-reviews-btn'); // Optional, if we add one

    if (writeReviewBtn && reviewContainer && reviewFormContainer) {
        writeReviewBtn.addEventListener('click', () => {
            // Hide review list and title


            if (reviewListContainer) reviewListContainer.style.display = 'none';
            writeReviewBtn.style.display = 'none'; // Hide the "Write a review" button itself if desired, or keep it. 
            // Based on user request "reemplazandola", it should probably replace the list interaction.
            // But usually the button is on the left. Let's hide the list in the right column.

            reviewFormContainer.style.display = 'block';

            // Animation class if needed
            reviewFormContainer.classList.add('fade-in');
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
