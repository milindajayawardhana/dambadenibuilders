import profileUrl from '../Dambadeni_Builders_Company_Profile.pdf?url';
import { company, projects, team } from './company.js';
export { profileUrl };

export const projectCards = (items = projects) => `<div class="verified-projects">${items.map(([status, title, detail], i) => `<article><div class="project-meta"><span>${status}</span><span>${String(i + 1).padStart(2, '0')}</span></div><h3>${title}</h3><p>${detail}</p></article>`).join('')}</div>`;

export function downloadsPage() {
  const documents = [
    ['ICTAD / CIDA Registration', 'Contact our team for contractor registration details and any supporting documentation needed for your project.', 'M12 3 4 6v6c0 4 8 9 8 9s8-5 8-9V6l-8-3Zm-4 9 3 3 5-6'],
    ['Business Registration Certificate', 'Request a copy of the business registration certificate for Dambadeni Builders (Pvt) Ltd.', 'M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM9 12l-1 9 4-2 4 2-1-9'],
    ['Capability Statement', 'Discuss a summary of our civil and electrical services, key personnel, equipment and relevant project experience.', 'M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6'],
  ];
  return `<section class="page-content documents-section" aria-labelledby="documents-title">
    <div class="documents-heading"><span class="process-eyebrow">COMPANY DOCUMENTS</span><h2 id="documents-title">Get to know <em>our company.</em></h2><p>Our people, capabilities and selected work, together in one document.</p></div>
    <article class="profile-download">
      <div class="profile-cover"><span>DAMBADENI BUILDERS (PVT) LTD</span><h3>Built with<br/><em>intention.</em></h3><p>Civil · Electrical · Design &amp; Build</p><span>COMPANY PROFILE / PDF</span></div>
      <div class="profile-download-copy"><span class="document-meta">PDF · 9 PAGES · 1.94 MB</span><h3>Company profile</h3><p>A practical introduction to Dambadeni Builders: our civil and electrical services, management team, equipment, project experience and contact details.</p><ul><li>Company background and approach</li><li>Services, people and equipment</li><li>Selected projects and site gallery</li></ul><div class="document-actions"><a class="primary-button" href="${profileUrl}" download="Dambadeni_Builders_Company_Profile.pdf">Download profile <span aria-hidden="true">↓</span></a><a class="text-link" href="${profileUrl}" target="_blank" rel="noopener noreferrer">View PDF (new tab) ↗</a></div></div>
    </article>
    <div class="request-documents" aria-label="Request supporting documents">
      ${documents.map(([title, description, icon]) => `<article class="request-document"><span class="request-document-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon}"/></svg></span><div class="request-document-copy"><h3>${title}</h3><p>${description}</p><div class="request-document-action"><span>Contact to request</span><a href="/contact" aria-label="Request ${title}">Request document <span aria-hidden="true">→</span></a></div></div></article>`).join('')}
    </div>
    <div class="company-facts"><div><span>Registered company</span><strong>${company.name}</strong></div><div><span>Registration number</span><strong>${company.registration}</strong></div><div><span>Incorporated</span><strong>${company.incorporated}</strong></div></div>
    <aside class="document-help"><div><h3>Need more information?</h3><p>For project-specific information or supporting documents, let us know what you need.</p></div><a class="text-link" href="/contact">Contact our team →</a></aside>
  </section>`;
}

export function aboutDetails() {
  return `<section class="page-content company-team"><div class="documents-heading"><span class="process-eyebrow">OUR PEOPLE</span><h2>Experience behind <em>every decision.</em></h2><p>Our leadership brings civil and electrical expertise together, supported by skilled electricians and more than 50 general workers.</p></div><div class="team-grid">${team.map(([name, role, detail]) => `<article><span>${role}</span><h3>${name}</h3><p>${detail}</p></article>`).join('')}</div><div class="document-help"><div><h3>Ready to mobilise</h3><p>Our equipment includes concrete mixers, compactors, welding machines, HDPE pipe-jointing equipment and site safety gear. Heavier equipment is hired when required.</p></div><a class="text-link" href="/downloads">Explore our company profile →</a></div></section>`;
}
