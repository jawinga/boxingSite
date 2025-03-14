const formName = document.querySelector("#name");
const formSurname = document.querySelector("#surname");
const formEmail = document.querySelector("#email");
const formPhone = document.querySelector("#phone");
const formTerms = document.querySelector("#terms");
const formSubmit = document.querySelector("#submit");

function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.textContent;
}

formSubmit.addEventListener("click", (e)=>{

    const name = sanitizeInput(formName.value.trim());
    const surname = sanitizeInput(formSurname.value.trim());
    const email = sanitizeInput(formEmail.value.trim()).toLowerCase();
    const phone = sanitizeInput(formPhone.value.trim());


    if (name === "" || surname === "" || email === "" || phone === "" ||!formTerms.checked) {

            Qual.sd("Please fill in all required fields and agree to the terms and conditions.");

    }else if(/\d/.test(name) || /\d/.test(surname)){

        Qual.sd("Name and Surname cannot contain numbers.");
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

        Qual.sd("Invalid email address.");
    }else if(!/^\d+$/.test(phone)){

        Qual.sd("Invalid phone number.");
    }else{
        Qual.sd("Form submitted successfully.");
    }
    e.preventDefault();

});

const buttonHome = document.querySelector("#button-home");
const carousel = document.querySelector("#carousel");
const form = document.querySelector("#form");

if (!buttonHome || !carousel || !form) {
    console.error("ButtonHome, Carousel, or Form not found in the DOM.");
} else {
    // Set initial states
    if (!carousel.style.display) {
        carousel.style.display = "block";
        form.style.display = "none";
    }

    buttonHome.addEventListener("click", (e) => {
        e.preventDefault();

        // Get carousel's position and size
        const carouselRect = carousel.getBoundingClientRect();
        const parentRect = carousel.parentElement.getBoundingClientRect(); // Relative to parent

        // Calculate position relative to .main-content__section1__right
        const top = carouselRect.top - parentRect.top;
        const left = carouselRect.left - parentRect.left;

        // Apply carousel's exact position and size to form
        form.style.position = "absolute";
        form.style.top = `${top}px`;
        form.style.left = `${left}px`;
   

        // Toggle display
        const currentCarouselDisplay = window.getComputedStyle(carousel).display;
        carousel.style.display = currentCarouselDisplay === "none" ? "block" : "none";
        form.style.display = currentCarouselDisplay === "none" ? "none" : "block";
    });
}




