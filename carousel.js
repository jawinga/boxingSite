const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = document.querySelectorAll('.carousel__nav__indicator');

const slideWidth = slides[0].getBoundingClientRect().width;

console.log(slideWidth);

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

// Fix 1: Ensure initial current-slide
slides[0].classList.add('current-slide');

const moveToSlide = (track, currentSlide, targetSlide) => {
  // Fix 2: Check if targetSlide exists
  if (targetSlide) {
    track.style.transform = 'translateX(-' + targetSlide.style.left + 'px)';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }
};

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
});



//When I click nav indicator, move slides to the right place