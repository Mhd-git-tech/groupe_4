const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
    index = (index + 1) % slides.length;
    carousel-container.style.transform = `translateX(-${index * 100}%)`;
}

// Défile toutes les 3 secondes
setInterval(showNextSlide, 3000);