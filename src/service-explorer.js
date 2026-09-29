const photos = [
  ['building', '1504307651254-35680f356dfd', 'Building work at a construction site'],
  ['roads', '1562259949-e8e7689d7828', 'Road and civil construction work'],
  ['landscaping', '1558904541-efa843a96f01', 'Landscaped outdoor grounds'],
  ['water', '1581092160607-ee22731c9f48', 'Infrastructure installation work'],
  ['consultancy', '1503387762-592deb58ef4e', 'Architectural plans for construction'],
  ['institutional', '1580582932707-520aed937b7b', 'School and community facilities'],
];

export const serviceAnchors = photos.map(([id]) => id);

export function serviceExplorer(services, arrow) {
  return `<section class="services section service-directory" id="services" aria-labelledby="directory-title">
    <div class="directory-heading">
      <span>02 / OUR SERVICES</span>
      <h2 id="directory-title">The expertise <em>your project needs.</em></h2>
    </div>
    <div class="directory-list">
      ${services.map((service, i) => `<a class="directory-row" href="/services#${photos[i][0]}" aria-labelledby="directory-service-${i}">
        <span class="directory-thumbnail"><img src="https://images.unsplash.com/photo-${photos[i][1]}?auto=format&fit=crop&w=360&q=80" alt="" loading="lazy" width="180" height="120" /></span>
        <h3 id="directory-service-${i}">${service[1]}</h3>
        <span class="directory-arrow" aria-hidden="true">${arrow}</span>
      </a>`).join('')}
    </div>
  </section>`;
}
