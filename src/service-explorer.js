const photos = [
  ['building', '1504307651254-35680f356dfd', 'Building work at a construction site'],
  ['development', '1504307651254-35680f356dfd', 'Land and building development'],
  ['water', '1581092160607-ee22731c9f48', 'Water infrastructure work'],
  ['electrical', '1581094794329-c8112a89af12', 'Electrical engineering'],
  ['wiring', '1581092160607-ee22731c9f48', 'Technical installation work'],
  ['design-build', '1503387762-592deb58ef4e', 'Architectural plans for construction'],
];

export const serviceAnchors = photos.map(([id]) => id);

export function serviceExplorer(services, arrow) {
  return `<section class="services section service-directory" id="services" aria-labelledby="directory-title">
    <div class="directory-heading">
      <span>02 / OUR SERVICES</span>
      <h2 id="directory-title">The expertise <em>your project needs.</em></h2>
    </div>
    <div class="directory-list">
      ${services.map((service, i) => `<a class="directory-row" href="/services/${servicePages[i].slug}" aria-labelledby="directory-service-${i}">
        <span class="directory-thumbnail"><img src="https://images.unsplash.com/photo-${photos[i][1]}?auto=format&fit=crop&w=360&q=80" alt="" loading="lazy" width="180" height="120" /></span>
        <h3 id="directory-service-${i}">${service[1]}</h3>
        <span class="directory-arrow" aria-hidden="true">${arrow}</span>
      </a>`).join('')}
    </div>
  </section>`;
}
import { servicePages } from './seo-content.js';
