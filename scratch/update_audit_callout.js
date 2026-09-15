const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const oldText = "Fill out the brief form below to request a tailored Data Protection Audit proposal from our senior advisory team within 24 hours.";
const newText = "Contact us to receive a tailored training proposal for your organization.";

// 1. Update services/data-protection-audit.html
const serviceAuditPath = path.join(rootDir, 'services', 'data-protection-audit.html');
let content1 = fs.readFileSync(serviceAuditPath, 'utf8');
content1 = content1.replace(oldText, newText);
fs.writeFileSync(serviceAuditPath, content1, 'utf8');
console.log('Updated services/data-protection-audit.html');

// 2. Update service-audit.html in root
const rootServiceAuditPath = path.join(rootDir, 'service-audit.html');
let content2 = fs.readFileSync(rootServiceAuditPath, 'utf8');
content2 = content2.replace(oldText, newText);
fs.writeFileSync(rootServiceAuditPath, content2, 'utf8');
console.log('Updated service-audit.html');

// 3. Create/update data-protection-audit.html in root with adjusted paths
let rootContent = content1
  .replace(/href="\.\.\//g, 'href="')
  .replace(/src="\.\.\//g, 'src="')
  .replace('href="index.html">Services</a>', 'href="services/index.html">Services</a>');
fs.writeFileSync(path.join(rootDir, 'data-protection-audit.html'), rootContent, 'utf8');
console.log('Created/Updated data-protection-audit.html in root');
