const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Set up track container
const trackContainer = document.querySelector('.carousel__track-container');
trackContainer.style.overflow = 'hidden';

// Position slides
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

// Enhanced move to slide with smooth animation
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    const targetPosition = targetSlide.style.left;
    track.style.transform = `translateX(-${targetPosition})`;
    
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Update dots with animation
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

// Update arrows with fade effect
const updateArrows = (targetIndex) => {
    prevButton.style.transition = 'opacity 0.3s ease';
    nextButton.style.transition = 'opacity 0.3s ease';
    
    prevButton.style.opacity = targetIndex === 0 ? '0' : '1';
    prevButton.style.pointerEvents = targetIndex === 0 ? 'none' : 'auto';
    
    nextButton.style.opacity = targetIndex === slides.length - 1 ? '0' : '1';
    nextButton.style.pointerEvents = targetIndex === slides.length - 1 ? 'none' : 'auto';
};

// Event Listeners
prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    if (prevSlide) {
        const currentIndex = slides.indexOf(currentSlide);
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(dots[currentIndex], dots[currentIndex - 1]);
        updateArrows(currentIndex - 1);
    }
});

nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide) {
        const currentIndex = slides.indexOf(currentSlide);
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(dots[currentIndex], dots[currentIndex + 1]);
        updateArrows(currentIndex + 1);
    }
});

dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('.carousel__nav__indicator');
    if (!targetDot) return;
    
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.indexOf(targetDot);
    moveToSlide(track, currentSlide, slides[targetIndex]);
    updateDots(currentDot, targetDot);
    updateArrows(targetIndex);
});

// Initial setup
slides[0].classList.add('current-slide');
dots[0].classList.add('current-slide');
updateArrows(0);

// Autoplay functionality - changed to 6 seconds (6000ms)
let autoplayInterval = setInterval(() => {
    const currentSlide = track.querySelector('.current-slide');
    const currentIndex = slides.indexOf(currentSlide);
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(track, currentSlide, slides[nextIndex]);
    updateDots(dots[currentIndex], dots[nextIndex]);
    updateArrows(nextIndex);
}, 6000);

// Pause on hover
trackContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
trackContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        const currentSlide = track.querySelector('.current-slide');
        const currentIndex = slides.indexOf(currentSlide);
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(track, currentSlide, slides[nextIndex]);
        updateDots(dots[currentIndex], dots[nextIndex]);
        updateArrows(nextIndex);
    }, 6000); // Also updated here to 6 seconds
});