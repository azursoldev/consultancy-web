const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const filesToDelete = [
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

console.log(`Starting deletion of ${filesToDelete.length} obsolete files...`);

let count = 0;
for (const file of filesToDelete) {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✓ Deleted: ${file}`);
    count++;
  } else {
    console.log(`- Already absent: ${file}`);
  }
}

console.log(`Total deleted: ${count} files.`);
