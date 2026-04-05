import { gsap, ScrollTrigger } from './gsap';

const section = document.querySelector<HTMLElement>('.skills');
const hoveredBubbles = Array.from(document.querySelectorAll<HTMLElement>('[data-bubble]'));
let openBubble: HTMLElement | null = null;

function activate(hoveredBubble: HTMLElement) {
  if (openBubble && openBubble !== hoveredBubble) deactivate(openBubble);
  if (openBubble === hoveredBubble) return;

  const list = hoveredBubble.querySelector<HTMLElement>('.skills__bubble-list');

  // Measure at fit-content width so text isn't artificially wrapped, giving an accurate height
  gsap.set(hoveredBubble, { width: 'fit-content', height: 'auto', padding: '2.5rem' });
  if (list) gsap.set(list, { maxHeight: 9999, marginTop: '0.8rem' });
  const size = hoveredBubble.scrollHeight;
  gsap.set(hoveredBubble, { width: '13rem', height: '13rem', padding: '1.5rem' });
  if (list) gsap.set(list, { maxHeight: 0, marginTop: 0 });

  gsap.to(hoveredBubble, { width: size, height: size, backgroundColor: 'var(--color-carbon-black)', color: 'var(--color-luna-white)', borderColor: 'transparent', padding: '2.5rem', duration: 1, ease: 'power2.inOut' });
  if (list) gsap.to(list, { maxHeight: size, opacity: 1, marginTop: '0.8rem', duration: 1.8, delay: 0.2, ease: 'power2.inOut' });

  openBubble = hoveredBubble;
}

function deactivate(hoveredBubble: HTMLElement) {
  const list = hoveredBubble.querySelector<HTMLElement>('.skills__bubble-list');

  gsap.killTweensOf(hoveredBubble);
  if (list) gsap.killTweensOf(list);

  if (list) gsap.to(list, { maxHeight: 0, opacity: 0, marginTop: 0, duration: 0.8, ease: 'power2.out' });
  gsap.to(hoveredBubble, { width: '13rem', height: '13rem', backgroundColor: 'transparent', color: 'var(--color-carbon-black)', borderColor: 'var(--color-carbon-black)', padding: '1.5rem', duration: 1.2, delay: 0.5, ease: 'power3.inOut' });
}

if (section) {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 70%',
    end: 'bottom top',
    onEnter: () => activate(hoveredBubbles[0]),
    onLeave: () => { hoveredBubbles.forEach(deactivate); openBubble = null; },
    onEnterBack: () => activate(hoveredBubbles[0]),
    onLeaveBack: () => { hoveredBubbles.forEach(deactivate); openBubble = null; },
  });
}

hoveredBubbles.forEach(b => {
  b.addEventListener('mouseenter', () => activate(b));
  b.addEventListener('focus', () => activate(b));
});
