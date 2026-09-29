import './back-to-top.css';

const button = document.createElement('button');
button.type = 'button';
button.className = 'back-to-top';
button.setAttribute('aria-label', 'Back to top');
button.title = 'Back to top';
button.hidden = true;
button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V4m-7 7 7-7 7 7"/></svg>';
document.body.append(button);

const update = () => {
  button.hidden = window.scrollY < 500;
  const contact = document.querySelector('.floating-contact');
  if (contact) {
    button.style.bottom = `${Math.max(20, innerHeight - contact.getBoundingClientRect().top + 12)}px`;
  }
};
window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update, { passive: true });
window.addEventListener('pageshow', update);
button.addEventListener('click', () => {
  // Move keyboard focus to the header before the button becomes hidden.
  document.querySelector('.header .brand')?.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});
update();
