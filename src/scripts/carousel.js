document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.reference__card');
  const dots = document.querySelectorAll('.references__dot');
  let currentIndex = 0;
  let autoPlayTimer;
  const autoPlayInterval = 6500;

  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const slideWidth = slides[0].offsetWidth + 16;

    carousel.scrollTo({
      left: currentIndex * slideWidth,
      behavior: 'smooth'
    });

    updateDots();

    clearTimeout(autoPlayTimer);
    autoPlayTimer = setTimeout(nextSlide, autoPlayInterval);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  updateDots();

  autoPlayTimer = setTimeout(nextSlide, autoPlayInterval);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
});
