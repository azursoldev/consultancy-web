const fs = require('fs');
const path = require('path');

const compFormPath = path.join(__dirname, '..', 'js', 'compliance-form.js');
let code = fs.readFileSync(compFormPath, 'utf8');

// 1. Update formTitle and ctaText in generateFormHTML for car and readiness
code = code.replace(
  "formTitle = 'Initiate Your CAR Filing';",
  "formTitle = 'Initiate Compliance Audit Return (CAR)';"
);
code = code.replace(
  "ctaText = 'Initiate CAR Filing Support Now ➔';",
  "ctaText = 'Initiate Compliance Audit Return (CAR) ➔';"
);
code = code.replace(
  "formTitle = 'Schedule NDPA Readiness Assessment';",
  "formTitle = 'Get FREE NDPA Gap Assessment';"
);
code = code.replace(
  "ctaText = 'Book NDPA Readiness Assessment ➔';",
  "ctaText = 'Get FREE NDPA Gap Assessment ➔';"
);

// 2. Update modal headers in openComplianceModal
const oldModalBlock = `      if (precheckOption === 'readiness') {
        if (badgeEl) badgeEl.textContent = 'NDPA 2023 Readiness Assessment';
        if (titleEl) titleEl.textContent = 'Schedule an NDPA Readiness Assessment';
        if (subEl) subEl.textContent = 'Connect with our accredited DPCO directors to identify and close your compliance gaps.';
      } else if (precheckOption === 'pia' || precheckOption === 'audit') {
        if (badgeEl) badgeEl.textContent = 'Privacy Impact Assessment';
        if (titleEl) titleEl.textContent = 'Request a Privacy Impact Assessment';
        if (subEl) subEl.textContent = 'Uncover compliance vulnerabilities and receive a tailored gap assessment within 24 hours.';
      } else if (precheckOption === 'car') {
        if (badgeEl) badgeEl.textContent = 'Statutory DPCO Filing';
        if (titleEl) titleEl.textContent = 'Initiate CAR Filing Support';
        if (subEl) subEl.textContent = 'Connect with an NDPC-licensed DPCO lead auditor within 24 hours to secure your filing certificate.';
      } else {`;

const newModalBlock = `      if (precheckOption === 'readiness' || precheckOption === 'gap' || precheckOption === 'pia') {
        if (badgeEl) badgeEl.textContent = 'NDPA 2023 Gap Assessment';
        if (titleEl) titleEl.textContent = 'Get FREE NDPA Gap Assessment';
        if (subEl) subEl.textContent = 'Connect with our accredited DPCO directors to identify vulnerabilities and receive your tailored NDPA gap assessment within 24 hours.';
      } else if (precheckOption === 'audit') {
        if (badgeEl) badgeEl.textContent = 'Data Protection Audit';
        if (titleEl) titleEl.textContent = 'Request Data Protection Audit';
        if (subEl) subEl.textContent = 'Uncover compliance vulnerabilities and receive a tailored audit proposal within 24 hours.';
      } else if (precheckOption === 'car') {
        if (badgeEl) badgeEl.textContent = 'Statutory DPCO Filing';
        if (titleEl) titleEl.textContent = 'Initiate Compliance Audit Return (CAR)';
        if (subEl) subEl.textContent = 'Connect with an NDPC-licensed DPCO lead auditor within 24 hours to secure your filing certificate.';
      } else {`;

code = code.replace(oldModalBlock, newModalBlock);

// 3. Update targetValue mapping and submitBtnSpan
const oldPrecheckMap = `        // Pre-selection logic (map pia -> audit)
        const targetValue = precheckOption === 'pia' ? 'audit' : precheckOption;`;

const newPrecheckMap = `        // Pre-selection logic (map pia/gap -> readiness)
        let targetValue = precheckOption;
        if (precheckOption === 'pia' || precheckOption === 'gap') {
          targetValue = 'readiness';
        }`;

code = code.replace(oldPrecheckMap, newPrecheckMap);

const oldSubmitBtnSpan = `          if (precheckOption === 'pia') {
            submitBtnSpan.textContent = 'Request Free Privacy Impact Assessment ➔';
          } else if (precheckOption === 'car') {
            submitBtnSpan.textContent = 'Initiate CAR Filing Support ➔';
          } else if (precheckOption === 'general') {`;

const newSubmitBtnSpan = `          if (precheckOption === 'pia' || precheckOption === 'gap' || precheckOption === 'readiness') {
            submitBtnSpan.textContent = 'Get FREE NDPA Gap Assessment ➔';
          } else if (precheckOption === 'car') {
            submitBtnSpan.textContent = 'Initiate Compliance Audit Return (CAR) ➔';
          } else if (precheckOption === 'general') {`;

code = code.replace(oldSubmitBtnSpan, newSubmitBtnSpan);

fs.writeFileSync(compFormPath, code, 'utf8');
console.log('Updated js/compliance-form.js successfully');
