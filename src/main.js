import './styles.css';
import './finish.css';
import './company-pages.css';
import { siteFooter } from './footer.js';
import { company, projects } from './company.js';
import { downloadsPage, aboutDetails, projectCards } from './company-pages.js';
import logomark from '../logo.svg';
import whiteLogomark from '../logo-white.svg';
import { contactForm, contactDetails, initContact } from './contact.js';
import { serviceExplorer, serviceAnchors } from './service-explorer.js';

const svg = p => `<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
const I = {
  arrow: svg('<path d="M5 12h13M13 6l6 6-6 6"/>'),
  external: svg('<path d="M5 19 19 5M8 5h11v11"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'), close: svg('<path d="m6 6 12 12M18 6 6 18"/>'),
  building: svg('<path d="M4 21V5l8-3 8 3v16M8 9h2m4 0h2M8 13h2m4 0h2M8 17h2m4 0h2M2 21h20"/>'),
  road: svg('<path d="M8 21 12 3l4 18M10 15h4M11 10h2M4 21h16"/>'),
  landscape: svg('<path d="M3 20 9 9l4 5 3-4 5 10M3 20h18M7 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>'),
  water: svg('<path d="M12 3S6 10 6 14a6 6 0 0 0 12 0c0-4-6-11-6-11Z"/>'),
  design: svg('<path d="m4 16-1 5 5-1L20 8l-4-4L4 16ZM13 5l4 4M3 12h5M16 21h5"/>'),
  government: svg('<path d="M4 21h16M6 21V9m12 12V9M3 9h18L12 3 3 9Zm5 4h2m4 0h2m-8 4h2m4 0h2"/>'),
  check: svg('<path d="m5 12 4 4L19 6"/>')
};

const services = [
  ['01', 'Building Construction', 'Building and commercial construction, including major upgrading works, from structure through to finishing.', I.building],
  ['02', 'Land & Building Development', 'Land and building development, from groundwork and excavation through to completion.', I.landscape],
  ['03', 'Water Supply & Sanitation', 'Water supply and sewerage works, including large-scale pipe laying and HDPE pipe jointing.', I.water],
  ['04', 'High & Low Voltage Electrical', 'High-voltage and low-voltage electrical line works supervised by experienced electrical engineers.', I.design],
  ['05', 'Panel Boards & Wiring', 'Panel board wiring and single-phase and three-phase wiring for buildings and industrial use.', I.design],
  ['06', 'Design, Build & Project Management', 'Design input, engineering solutions and coordination of specialist trades on industrial and commercial projects.', I.building]
];

document.querySelector('#app').innerHTML = `
  <div class="topbar"><div><span>Serving clients across Sri Lanka</span><span>Civil &amp; electrical contractors · Est. 2018</span></div><div><a href="mailto:hello@dambadenibuilders.lk">hello@dambadenibuilders.lk</a><a href="tel:${company.phoneHref}">${company.phone}</a></div></div>
  <header class="header"><a class="brand" href="/"><img class="brand-mark" src="${logomark}" alt="" width="36" height="54" /><span>Dambadeni <em>Builders</em><small>Construction &amp; Engineering</small></span></a><nav><a href="/about">About us</a><a href="/services">Services</a><a href="/portfolio">Projects</a><a href="/contact">Contact</a></nav><div class="header-actions"><a class="downloads-button" href="/downloads"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/></svg>Downloads</a><a class="quote-button" href="/contact">Request a quotation ${I.arrow}</a></div><button class="menu-toggle">${I.menu}</button></header>
  <main id="top">
    <section class="hero"><div class="hero-photo hero-photo-1"></div><div class="hero-photo hero-photo-2"></div><div class="hero-photo hero-photo-3"></div><div class="hero-shade"></div><div class="hero-content reveal"><div class="crumb">HOME <span>/</span> CONSTRUCTION COMPANY</div><p class="eyebrow"><i></i> Your project, properly handled</p><h1><span class="hero-title-line">Built right.</span><br/><em>Built for life.</em></h1><p>Civil and electrical construction, design-and-build solutions and project management from our team in Alawwa.</p><div class="hero-buttons"><a class="primary-button" href="#contact">Request a free quote ${I.arrow}</a><a class="secondary-link" href="#services">Explore our services ${I.external}</a></div></div><div class="hero-brief"><span class="brief-label">STARTING A PROJECT?</span><strong>Tell us what<br/>you want to build.</strong><a href="/contact">Plan with our team ${I.arrow}</a></div><div class="hero-cert"><img class="hero-logomark" src="${whiteLogomark}" alt="Dambadeni Builders" width="42" height="62" /><span><b>Construction partner</b><br/>Clear scope · Quality work · Proper handover</span></div><div class="hero-controls"><button class="hero-prev" aria-label="Previous slide">←</button><div><button class="hero-dot active" data-slide="0"></button><button class="hero-dot" data-slide="1"></button><button class="hero-dot" data-slide="2"></button></div><button class="hero-next" aria-label="Next slide">→</button></div><div class="hero-caption"><span>01</span><span class="caption-line"></span><span>BUILT WITH PURPOSE</span></div></section>
    <section class="trust-bar"><div><strong>Free consultation</strong><span>Start with a conversation</span></div><div><strong>Clear quotations</strong><span>Scope and pricing explained</span></div><div><strong>Site supervision</strong><span>Careful work at every stage</span></div><div><strong>Proper handover</strong><span>Finished with attention to detail</span></div></section>
    <section class="stats"><div><strong>2018</strong><span>Year<br/>established</span></div><div><strong>50+</strong><span>Site<br/>workforce</span></div><div><strong>02</strong><span>Chartered<br/>engineers</span></div><div class="stats-note"><span>Our promise</span><p>Good work, clear communication and a finished project you can be proud of.</p></div></section>
    <section class="build-types"><div class="build-intro"><span>WHAT ARE YOU BUILDING?</span><h2>Start with <em>the right team.</em></h2><p>Different projects need different thinking. Choose the kind of work you are planning and see how we can help.</p></div><a href="/services#building" class="build-type build-home"><span>01 / RESIDENTIAL</span><strong>Homes &amp;<br/><em>living spaces</em></strong><small>Design, construction and finishing</small><b>${I.arrow}</b></a><a href="/services#building" class="build-type build-business"><span>02 / COMMERCIAL</span><strong>Business &amp;<br/><em>work spaces</em></strong><small>Buildings, shops and facilities</small><b>${I.arrow}</b></a><a href="/services#water" class="build-type build-civil"><span>03 / CIVIL WORKS</span><strong>Infrastructure &amp;<br/><em>public works</em></strong><small>Water, electrical and site development</small><b>${I.arrow}</b></a></section>
    <section class="vision"><div class="vision-mark">“</div><div><h2>Creating a stronger future<br/><em>through quality.</em></h2><span></span><p>Our vision is to be a respected civil and electrical contractor, delivering beyond expectation. We combine competitive procurement, safe working conditions and quality workmanship with a practical delivery schedule.</p><small>Dambadeni Builders · Construction &amp; Engineering</small></div></section>
    <section class="about about-new section" id="about"><div class="about-label"><span>01 / ABOUT US</span><b>01</b></div><div class="about-grid"><div class="about-copy"><p class="eyebrow"><i></i> A dependable partner from start to finish</p><h2>Built on practical<br/><em>experience.</em></h2><p>Established in 2018, Dambadeni Builders (Pvt) Ltd is a civil and electrical contractor based in Alawwa. Our work brings together building construction, water infrastructure, electrical installations and design-and-build solutions.</p><p>We act as main contractor on small to medium-sized projects and coordinate specialist trades on industrial and commercial work. Clear communication, close supervision and our clients’ objectives guide every stage.</p><a class="text-link" href="#contact">Talk to our team ${I.arrow}</a></div><div class="about-photo"></div></div></section>
    ${serviceExplorer(services, I.arrow)}
    <section class="choose section"><div class="choose-photo"></div><div class="choose-content"><div class="section-heading light-heading"><span>03 / WHY CHOOSE US</span><h2>Construction done<br/><em>properly.</em></h2></div><div class="choose-list"><div><b>01</b><span><strong>We keep the scope clear</strong><small>Detailed conversations and quotations before work starts.</small></span></div><div><b>02</b><span><strong>We stay close to the site</strong><small>Supervision, coordination and quality checks throughout.</small></span></div><div><b>03</b><span><strong>We respect your budget</strong><small>Practical recommendations without unnecessary extras.</small></span></div><div><b>04</b><span><strong>We finish what we start</strong><small>Proper checks and a clear handover at the end.</small></span></div></div></div></section>
    <section class="projects section" id="projects"><div class="section-heading project-heading"><span>04 / SELECTED PROJECTS</span><h2>Experience you can<br/><em>build on.</em></h2><a class="text-link" href="/portfolio">Explore our projects ${I.arrow}</a></div>${projectCards(projects.slice(0, 3))}</section>
    <section class="process section" id="process" aria-labelledby="process-title">
      <div class="process-intro">
        <span class="process-eyebrow">OUR PROCESS</span>
        <h2 id="process-title">From your first idea<br/><em>to handover.</em></h2>
        <p>Six clear steps, with our team alongside you throughout. Here’s what to expect when you build with us.</p>
        <a class="primary-button" href="/contact">Discuss your project ${I.arrow}</a>
        <figure class="process-photo">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85" alt="Construction work on site" loading="lazy" width="1000" height="650" />
        </figure>
      </div>
      <ol class="process-timeline" aria-label="Construction process">
        <li class="reveal"><span class="step-number" aria-hidden="true">01</span><div><h3>Free consultation</h3><p>Tell us about your plans, priorities, timeline and budget.</p></div></li>
        <li class="reveal"><span class="step-number" aria-hidden="true">02</span><div><h3>Site visit</h3><p>We assess access, ground conditions and the work your site needs.</p></div></li>
        <li class="reveal"><span class="step-number" aria-hidden="true">03</span><div><h3>Design &amp; quotation</h3><p>Review the proposed design, scope and costs before work begins.</p></div></li>
        <li class="reveal"><span class="step-number" aria-hidden="true">04</span><div><h3>Construction</h3><p>We coordinate the team and materials, with updates as work progresses.</p></div></li>
        <li class="reveal"><span class="step-number" aria-hidden="true">05</span><div><h3>Inspection</h3><p>We check the finished work and take care of any outstanding details.</p></div></li>
        <li class="reveal step-complete"><span class="step-number" aria-hidden="true">06</span><div><h3>Handover</h3><p>A final walkthrough together, then your project is ready for its next chapter.</p></div></li>
      </ol>
    </section>
    <section class="cta" id="contact"><div><p class="eyebrow light"><i></i> Start your project</p><h2>Have a construction<br/><em>project in mind?</em></h2><p>Tell us what you are planning. We offer a free first discussion and respond with the next practical step.</p></div><div class="cta-action"><a href="mailto:hello@dambadenibuilders.lk">Request a quotation ${I.external}</a><span>hello@dambadenibuilders.lk<br/>${company.phone}</span></div></section>
  </main>
  ${siteFooter}
  <div class="mobile-menu"><button class="mobile-close">${I.close}</button><nav><a href="/about">About us</a><a href="/services">Services</a><a href="/portfolio">Projects</a><a href="/downloads">Downloads</a><a href="/contact">Contact</a></nav></div>
`;

const path = window.location.pathname.replace(/\/$/, '') || '/';
const pageHeader = (title, subtitle) => `<section class="page-banner"><div class="page-banner-photo"></div><div class="page-banner-shade"></div><div class="page-banner-copy"><div class="crumb">HOME <span>/</span> ${title.toUpperCase()}</div><p class="eyebrow"><i></i> Dambadeni Builders</p><h1>${title}</h1><p>${subtitle}</p></div></section>`;
const pageFooter = siteFooter;
function renderInteriorPage() {
  if (path === '/') return;
  let body = '';
  if (path === '/about') body = `${pageHeader('About Us', 'A dependable construction partner built around quality, practical experience and clear communication.')}<section class="page-content"><div class="page-intro"><span>01 / OUR COMPANY</span><h2>Building better<br/><em>for the long term.</em></h2><p>Incorporated on 07 July 2018, Dambadeni Builders (Pvt) Ltd is a civil and electrical contractor based in Alawwa. We deliver small to medium-sized projects and manage specialist trades on industrial and commercial work.</p></div><div class="about-page-grid"><div class="about-photo"></div><div><h3>Our vision</h3><p>To be a respected civil and electrical contractor, delivering beyond expectation.</p><h3>Our mission</h3><p>To procure at competitive prices, provide safe working conditions and deliver quality work within a reasonable time frame.</p><h3>How we work</h3><p>We plan schedules and resources, communicate clearly, track progress, supervise quality and complete and commission each project with the client’s objectives in mind.</p></div></div></section><section class="values-band"><div><b>01</b><span>Quality materials</span></div><div><b>02</b><span>Clear communication</span></div><div><b>03</b><span>Responsible delivery</span></div><div><b>04</b><span>Built to last</span></div></section>`;
  if (path === '/services') body = `${pageHeader('Our Services', 'Civil and electrical contracting, building development, water infrastructure and design-and-build services.')}<section class="page-content"><div class="page-intro services-intro"><span>01 / CONSTRUCTION SERVICES</span><h2>Everything your<br/><em>project needs.</em></h2><p>We bring the people, planning and practical site experience needed to take a project from first conversation to final handover.</p></div><div class="detail-service-grid">${services.map((s, i) => `<article id="${serviceAnchors[i]}"><div class="detail-service-icon">${s[3]}</div><small>${s[0]}</small><h3>${s[1]}</h3><p>${s[2]}</p><a href="/contact">Request a quotation ${I.arrow}</a></article>`).join('')}</div></section><section class="service-callout"><div><span>NEED HELP PLANNING A PROJECT?</span><h2>Start with a<br/><em>free consultation.</em></h2></div><a href="/contact">Talk to our team ${I.arrow}</a></section>`;
  if (path === '/portfolio' || path === '/projects') body = `${pageHeader('Our Projects', 'Civil construction, water infrastructure and building projects from our company profile.')}<section class="page-content"><div class="documents-heading"><span class="process-eyebrow">SELECTED WORK</span><h2>Practical experience.<br/><em>Proven scope.</em></h2><p>Project details and completion statuses are as recorded in our company profile. Contact us for the latest progress updates.</p></div>${projectCards()}<div class="document-help"><div><h3>See more of our work</h3><p>Our company profile includes a gallery of site work and construction progress.</p></div><a class="text-link" href="/downloads">View company profile →</a></div></section>`;
  if (path === '/news') body = `${pageHeader('News & Updates', 'Project updates, company milestones and useful news from the Dambadeni Builders team.')}<section class="page-content"><div class="page-intro"><span>01 / LATEST UPDATES</span><h2>On site and<br/><em>moving forward.</em></h2><p>News and updates from the work we do across buildings, roads, site works and community infrastructure.</p></div><div class="news-page-grid"><article><div class="news-photo news-one"></div><small>PROJECT UPDATE · 2024</small><h3>Road and infrastructure work progressing across Sri Lanka</h3><p>Updates from the site, including earthworks, drainage, paving and final finishing.</p></article><article><div class="news-photo news-two"></div><small>COMPANY NEWS · 2024</small><h3>Building a stronger team around every project</h3><p>Good delivery starts with the people who plan, supervise and coordinate the work.</p></article><article><div class="news-photo news-three"></div><small>PROJECT COMPLETION</small><h3>From first site visit to final handover</h3><p>We keep the process clear and make sure the final details are properly completed.</p></article></div></section>`;
  if (path === '/downloads') body = `${pageHeader('Downloads', 'Explore our company profile, people, services and project experience.')} ${downloadsPage()}`;
  if (path === '/contact') body = `${pageHeader('Contact Us', 'Tell us about your project and our team will help you plan the next step.')}<section class="contact-page"><div class="contact-info"><span>LET'S TALK</span><h2>Start with a<br/><em>conversation.</em></h2><p>For a quotation, site visit or general enquiry, contact Dambadeni Builders directly.</p>${contactDetails}</div>${contactForm}</section>`;
  if (path === '/about') body += aboutDetails();
  document.querySelector('#app').innerHTML = `<div class="topbar"><div><span>Serving clients across Sri Lanka</span><span>Quality construction. Fair pricing.</span></div><div><a href="mailto:hello@dambadenibuilders.lk">hello@dambadenibuilders.lk</a><a href="tel:${company.phoneHref}">${company.phone}</a></div></div><header class="header"><a class="brand" href="/"><img class="brand-mark" src="${logomark}" alt="" width="36" height="54" /><span>Dambadeni <em>Builders</em><small>Construction &amp; Engineering</small></span></a><nav><a href="/about">About us</a><a href="/services">Services</a><a href="/portfolio">Projects</a><a href="/contact">Contact</a></nav><div class="header-actions"><a class="downloads-button" href="/downloads"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/></svg>Downloads</a><a class="quote-button" href="/contact">Request a quotation ${I.arrow}</a></div><button class="menu-toggle">${I.menu}</button></header><main class="inner-main">${body}</main>${pageFooter}<div class="mobile-menu"><button class="mobile-close">${I.close}</button><nav><a href="/about">About us</a><a href="/services">Services</a><a href="/portfolio">Projects</a><a href="/downloads">Downloads</a><a href="/contact">Contact</a></nav></div>`;
}
renderInteriorPage();
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
  if (link.pathname === path) link.setAttribute('aria-current', 'page');
});
heroDots.forEach((dot, i) => dot.setAttribute('aria-label', `Show construction image ${i + 1}`));
