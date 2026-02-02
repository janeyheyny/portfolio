document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [role="button"]')) {
      cursor.classList.add('shrink');
    } else {
      cursor.classList.remove('shrink');
    }
  });
});
