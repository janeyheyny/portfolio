import { gsap, ScrollTrigger } from './gsap';

const skillsSection = document.querySelector<HTMLElement>('.skills');
const bubbles = Array.from(document.querySelectorAll<HTMLElement>('[data-bubble]'));
const desktopMQ = window.matchMedia('(min-width: 40rem)');

const ACTIVE_CLASS = 'skills__bubble--active';
const MEASURING_CLASS = 'skills__bubble--measuring';

// Measure all bubbles upfront so hover only needs a class toggle — no mid-animation layout reads.
const MOBILE_SIZE_BUFFER = 1.15;

const precomputeSizes = () => {
  const isMobile = !desktopMQ.matches;
  bubbles.forEach((bubble) => {
    bubble.classList.add(MEASURING_CLASS);
    const size = Math.max(bubble.scrollWidth, bubble.scrollHeight);
    bubble.classList.remove(MEASURING_CLASS);
    bubble.style.setProperty('--expanded-size', `${isMobile ? size * MOBILE_SIZE_BUFFER : size}px`);
  });
};

const setActive = (bubble: HTMLElement, active: boolean) => {
  bubble.classList.toggle(ACTIVE_CLASS, active);
  bubble.setAttribute('aria-expanded', String(active));
};

const setSingleActive = (target: HTMLElement) => {
  bubbles.forEach((b) => setActive(b, b === target));
};

if (skillsSection && bubbles.length) {
  precomputeSizes();
  setSingleActive(bubbles[0]);

  bubbles.forEach((bubble) => {
    bubble.addEventListener('mouseenter', () => {
      if (desktopMQ.matches) setSingleActive(bubble);
    });

    bubble.addEventListener('focus', () => {
      if (desktopMQ.matches) setSingleActive(bubble);
    });

    bubble.addEventListener('click', () => {
      if (desktopMQ.matches) {
        setSingleActive(bubble);
      } else {
        setActive(bubble, !bubble.classList.contains(ACTIVE_CLASS));
      }
    });

    bubble.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      bubble.click();
    });
  });

  const mm = gsap.matchMedia();

  mm.add('(max-width: 39.99rem)', () => {
    setSingleActive(bubbles[0]);

    const getIndexFromProgress = (progress: number) =>
      Math.min(Math.floor(progress * bubbles.length), bubbles.length - 1);

    const trigger = ScrollTrigger.create({
      trigger: skillsSection,
      start: 'top 70%',
      end: 'bottom 40%',
      invalidateOnRefresh: true,
      onEnter: () => setSingleActive(bubbles[0]),
      onEnterBack: () => setSingleActive(bubbles.at(-1)!),
      onLeave: () => setSingleActive(bubbles.at(-1)!),
      onLeaveBack: () => setSingleActive(bubbles[0]),
      onUpdate: ({ progress }) => setSingleActive(bubbles[getIndexFromProgress(progress)]),
    });

    return () => trigger.kill();
  });

  mm.add('(min-width: 40rem)', () => {
    setSingleActive(bubbles[0]);
  });

  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(precomputeSizes);
  });
}
