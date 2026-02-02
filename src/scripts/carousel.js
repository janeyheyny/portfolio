document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.reference__card');
  let currentIndex = 0;
  let autoPlayTimer;
  const autoPlayInterval = 6500;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const slideWidth = slides[0].offsetWidth + 16;

    carousel.scrollTo({
      left: currentIndex * slideWidth,
      behavior: 'smooth'
    });

    clearTimeout(autoPlayTimer);
    autoPlayTimer = setTimeout(nextSlide, autoPlayInterval);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  autoPlayTimer = setTimeout(nextSlide, autoPlayInterval);
});
