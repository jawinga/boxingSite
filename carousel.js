const track =  document.querySelector('.carousel__track');
const slides =  Array.from(track.children);
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

//When I click left, move slides to the left



//When I click right, move slides to the right

nextButton.addEventListener('click', e => {

    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const amountToMove = nextSlide.style.left;

    //move to next slide

    track.style.transform = 'translateX(-' + amountToMove + ')';
    currentSlide.classList.remove('current-slide');
    nextSlide.classList.add('current-slide');


});



//When I click nav indicator, move slides to the right place