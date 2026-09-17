const fs = require('fs');
const path = require('path');

const candidates = [
  'service-car.html',
  'service-dpo.html',
  'service-audit.html',
  'service-training.html',
  'services.html',
  'data-protection-audit.html',
  'data-privacy-training.html',
  'service-ai.html',
  'service-cookie.html',
  'service-cyber.html',
  'service-dpa.html',
  'service-dpia.html',
  'service-gov.html',
  'service-policies.html',
  'service-ropa.html',
  'organisation.html',
  'organisation-board.html',
  'organisation-consultants.html',
  'organisation-governance.html',
  'organisation-values.html',
  'industries.html',
  'industry-banking.html',
  'industry-education.html',
  'industry-energy.html',
  'industry-engineering.html',
  'industry-fintech.html',
  'industry-health.html',
  'industry-insurance.html',
  'industry-pension.html',
  'industry-public-sector.html',
  'industry-real-estate.html',
  'industry-retail.html',
  'industry-telecom.html',
  'industry-transport.html',
  'terms-and-conditions.html',
  'topics.html'
];

const activeFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'faq.html',
  'legal/faq.html',
  'cookie-policy.html',
  'terms-of-service.html',
  'legal/terms-of-service.html',
  'legal-disclaimer.html',
  'legal/legal-disclaimer.html',
  'privacy-statement.html',
  'legal/privacy-statement.html',
  'privacy-policy.html',
  'legal/privacy-policy.html',
  'publication-detail.html',
  'blog/index.html',
  'blog/complying-with-ndpa-2023.html',
  'charles-odetola.html',
  'martha-jowah.html',
  'search.html',
  'services/index.html',
  'services/compliance-audit-return.html',
  'services/outsourced-dpo.html',
  'services/data-protection-audit.html',
  'services/data-privacy-training.html',
  'js/header.js',
  'js/footer.js',
  'js/search-data.js',
  'js/compliance-form.js'
];

console.log('Checking exact references...');

for (const cand of candidates) {
  for (const act of activeFiles) {
    const actPath = path.join(__dirname, '..', act);
    if (!fs.existsSync(actPath)) continue;
    const content = fs.readFileSync(actPath, 'utf8');

    // We search for href="cand", href='cand', or url: 'cand' without 'services/'
    const regex1 = new RegExp(`["'/(]${cand.replace('.', '\\.')}["')]`, 'i');
    const matches = content.match(regex1);
    if (matches) {
      // Check if it's preceded by 'services/'
      const idx = content.indexOf(cand);
      const preceding = content.substring(Math.max(0, idx - 15), idx);
      if (!preceding.includes('services/')) {
        console.log(`FOUND: ${cand} in ${act}: context "...${preceding}${cand}..."`);
      }
    }
  }
}
