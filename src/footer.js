import whiteLogomark from '../logo-white.svg';
import { company } from './company.js';
import { icons } from './icons.js';
import './footer.css';

export const siteFooter = `<footer class="site-footer">
  <section class="footer-columns" aria-label="Company information and links">
    <div class="footer-identity">
      <a class="brand" href="/"><img class="brand-mark" src="${whiteLogomark}" alt="" width="42" height="62" /><span>Dambadeni <em>Builders</em><small>Construction &amp; Engineering</small></span></a>
      <p>Civil and electrical expertise. Clear communication. Work built to last.</p>
    </div>
    <nav class="footer-navigation" aria-label="Footer navigation"><h3>Explore</h3><a href="/about">About us</a><a href="/services">Our services</a><a href="/portfolio">Our projects</a><a href="/downloads">Downloads</a><a href="/contact">Contact us</a></nav>
    <div class="footer-contact"><h3>Let’s connect</h3>
      <div class="footer-contact-row"><span class="footer-icon">${icons.phone}</span><div><a href="tel:${company.phoneHref}">${company.phone}</a></div></div>
      <div class="footer-contact-row"><span class="footer-icon">${icons.mail}</span><div><a href="mailto:hello@dambadenibuilders.lk">hello@dambadenibuilders.lk</a></div></div>
      <div class="footer-contact-row"><span class="footer-icon">${icons.pin}</span><div><address>${company.address}</address></div></div>
    </div>
  </section>
  <div class="footer-bottom"><span>© ${new Date().getFullYear()} Dambadeni Builders (Pvt) Ltd. All rights reserved.</span><span class="footer-credit">Developed by <a href="https://ruwanm.com" target="_blank" rel="noopener noreferrer">RuwanHQ <span aria-hidden="true">↗</span></a></span></div>
</footer>`;
