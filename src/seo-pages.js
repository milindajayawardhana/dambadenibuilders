import { servicePages, districts, priorityAreas } from './seo-content.js';
import './seo-pages.css';
const serviceLink = s => `<a href="/services/${s.slug}">${s.name} <span aria-hidden="true">→</span></a>`;

export function serviceDetail(service, banner) {
  return `${banner(service.name, service.intro)}<section class="page-content service-detail-page">
    <div class="service-detail-layout"><div><span class="process-eyebrow">OUR SCOPE</span><h2>Practical support for <em>your project.</em></h2><p>${service.detail}</p><ul class="service-scope">${service.scope.map(item => `<li>${item}</li>`).join('')}</ul>
    <h2>Relevant experience</h2><p>${service.evidence}</p><a class="text-link" href="/portfolio">Explore our project experience →</a>
    <h2>Planning your enquiry</h2><details class="service-question"><summary>${service.faq[0]}</summary><p>${service.faq[1]}</p></details></div>
    <aside class="service-enquiry"><span class="process-eyebrow">LET’S DISCUSS THE WORK</span><h2>Start with <em>a clear scope.</em></h2><p>Tell us your site location, requirements and preferred timeframe. Our team will discuss the next steps with you.</p><a class="primary-button" href="/contact">Request a quotation →</a><p>Based in Alawwa. Enquiries welcome from Kurunegala, Ampara, Nuwara Eliya, Kandy, Gampola and across Sri Lanka.</p><a class="text-link" href="/service-areas">View areas served →</a></aside></div>
    <section class="related-services" aria-label="Other construction services"><h2>Other services</h2><div>${servicePages.filter(s => s.slug !== service.slug).map(serviceLink).join('')}</div></section>
  </section>`;
}

export function areasPage(banner) {
  return `${banner('Construction Services Across Sri Lanka', 'Based in Alawwa, serving civil, electrical and building project enquiries islandwide.')}<section class="page-content areas-page">
    <div class="documents-heading"><span class="process-eyebrow">WHERE WE WORK</span><h2>A local base.<br/><em>Islandwide reach.</em></h2><p>Contact our team in Alawwa for projects in any of Sri Lanka’s 25 districts. Site visits, mobilisation and scheduling are agreed according to the location and scope of the work. The areas below are service locations, not separate offices.</p></div>
    <div class="area-grid">${priorityAreas.map(([name, detail]) => `<article><h3>${name}</h3><p>${detail}</p></article>`).join('')}</div>
    <section class="district-coverage"><h2>Enquiries from all 25 districts</h2><p>Share your location and project requirements so we can discuss the right services and practical next steps.</p><ul>${districts.map(name => `<li>${name}</li>`).join('')}</ul></section>
    <section class="related-services"><h2>How we can help</h2><div>${servicePages.map(serviceLink).join('')}</div></section>
    <aside class="document-help"><div><h3>Planning a project in your area?</h3><p>Send the location, available drawings and a short description of the work.</p></div><a class="primary-button" href="/contact">Discuss your project →</a></aside>
  </section>`;
}

export const coverageSummary = `<section class="coverage-summary"><div><span class="process-eyebrow">BASED IN ALAWWA · WORKING ISLANDWIDE</span><h2>Civil and electrical construction <em>across Sri Lanka.</em></h2><p>Discuss your project in Kurunegala, Alawwa, Ampara, Nuwara Eliya, Kandy or Gampola. We welcome enquiries from all 25 districts.</p></div><a class="text-link" href="/service-areas">Explore our service areas →</a></section>`;
