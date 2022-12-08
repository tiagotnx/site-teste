const slideItems = document.querySelectorAll(".slide-items > *");
const nextBtn = document.querySelector(".slide-next");
const prevBtn = document.querySelector(".slide-prev");
const thumb = document.querySelector(".slide-thumb");
let thumbItems;
let timeout;

let active = 0;

const activeSlide = (index) => {
    active = index;
    slideItems.forEach((item) => item.classList.remove("active"));
    slideItems[index].classList.add("active");

    thumbItems.forEach((item) => item.classList.remove("active"));
    thumbItems[index].classList.add("active");

    autoSlide();
};

const prev = () => {
    if (active > 0) {
        active--;
        activeSlide(active);
    } else {
        activeSlide(slideItems.length - 1);
    }
};

const next = () => {
    if (active < slideItems.length - 1) {
        active++;
        activeSlide(active);
    } else {
        activeSlide(0);
    }
};

const addThumbItems = () => {
    slideItems.forEach(() => (thumb.innerHTML += `<span></span>`));
    thumbItems = Array.from(thumb.children);
};

const autoSlide = () => {
    clearTimeout(timeout);
    timeout = setTimeout(next, 10000);
};

const init = () => {
    addThumbItems();
    activeSlide(0);
};

init();

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

export {};
