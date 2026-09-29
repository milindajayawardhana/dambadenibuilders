import { renderPage } from './render.js';
import { company } from './company.js';
import { initContact } from './contact.js';
import { normalizePath, seoHead } from './seo.js';
const path = normalizePath(window.location.pathname);
const app = document.querySelector('#app');
if (app.dataset.route !== path) {
  app.innerHTML = renderPage(path);
  document.head.querySelectorAll('title, meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]').forEach(node => node.remove());
  document.head.insertAdjacentHTML('beforeend', seoHead(path, { email: (import.meta.env.VITE_CONTACT_EMAIL || company.email).trim() }));
}
initContact();
document.body.insertAdjacentHTML('beforeend', `<a class="floating-contact" href="tel:${company.phoneHref}" aria-label="Call Dambadeni Builders"><span class="floating-dot"></span><span>Call our team</span></a>`);
const heroSlides = document.querySelectorAll('.hero-photo'); const heroDots = document.querySelectorAll('.hero-dot'); let heroIndex = 0; const setHeroSlide = (index) => { if (!heroSlides.length) return; heroIndex = (index + heroSlides.length) % heroSlides.length; heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === heroIndex)); heroDots.forEach((dot, i) => dot.classList.toggle('active', i === heroIndex)); const number = document.querySelector('.hero-caption>span:first-child'); if (number) number.textContent = `0${heroIndex + 1}`; }; if (heroSlides.length) { setHeroSlide(0); document.querySelector('.hero-prev')?.addEventListener('click', () => setHeroSlide(heroIndex - 1)); document.querySelector('.hero-next')?.addEventListener('click', () => setHeroSlide(heroIndex + 1)); heroDots.forEach(dot => dot.addEventListener('click', () => setHeroSlide(Number(dot.dataset.slide)))); setInterval(() => setHeroSlide(heroIndex + 1), 6500); }
document.body.insertAdjacentHTML('afterbegin', '<div class="scroll-progress"></div>'); window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - window.innerHeight; document.querySelector('.scroll-progress').style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`; }, { passive: true });
const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); }), { threshold: .1 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const header = document.querySelector('.header'); window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.mobile-close');
menuToggle.setAttribute('aria-label', 'Open navigation');
menuToggle.setAttribute('aria-expanded', 'false');
menuClose.setAttribute('aria-label', 'Close navigation');
mobileMenu.id = 'mobile-navigation';
menuToggle.setAttribute('aria-controls', mobileMenu.id);
function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  if (open) menuClose.focus(); else menuToggle.focus();
}
menuToggle.addEventListener('click', () => setMenu(true));
menuClose.addEventListener('click', () => setMenu(false));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
window.matchMedia('(max-width: 900px)').addEventListener('change', event => {
  if (!event.matches && mobileMenu.classList.contains('open')) setMenu(false);
});
document.querySelectorAll('.contact-page input:not([name="website"]), .contact-page textarea').forEach(input => {
  if (input.type === 'email') { input.autocomplete = 'email'; input.inputMode = 'email'; }
  else if (input.type === 'tel') { input.autocomplete = 'tel'; input.inputMode = 'tel'; }
  else if (input.tagName === 'INPUT') input.autocomplete = 'name';
});
document.addEventListener('keydown', event => {
  if (!mobileMenu.classList.contains('open')) return;
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab') {
    const items = [...mobileMenu.querySelectorAll('button, a')];
    const first = items[0], last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.querySelectorAll('.header nav a, .header .downloads-button, .mobile-menu nav a').forEach(link => {
  if (link.pathname === path || (link.pathname === '/services' && path.startsWith('/services/'))) link.setAttribute('aria-current', link.pathname === path ? 'page' : 'location');
});
heroDots.forEach((dot, i) => dot.setAttribute('aria-label', `Show construction image ${i + 1}`));
import('./back-to-top.js');
