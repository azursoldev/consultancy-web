const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const formJs = fs.readFileSync('js/compliance-form.js', 'utf8');

console.log('--- Checking index.html Hero Buttons ---');
const btn1Match = indexHtml.match(/btn-hero-primary[^>]*>([\s\S]*?)<\/button>/);
console.log('Button 1 innerHTML:', btn1Match ? btn1Match[1].replace(/\s+/g, ' ').trim() : 'NOT FOUND');

const btn2Match = indexHtml.match(/btn-hero-primary-outline[^>]*>([\s\S]*?)<\/button>/);
console.log('Button 2 innerHTML:', btn2Match ? btn2Match[1].replace(/\s+/g, ' ').trim() : 'NOT FOUND');

console.log('\n--- Checking compliance-form.js Modal Headings Logic ---');
console.log("Has 'Get FREE NDPA Gap Assessment' modal title:", formJs.includes("titleEl.textContent = 'Get FREE NDPA Gap Assessment';"));
console.log("Has 'Initiate Compliance Audit Return (CAR)' modal title:", formJs.includes("titleEl.textContent = 'Initiate Compliance Audit Return (CAR)';"));
console.log("Has 'Get FREE NDPA Gap Assessment ➔' CTA text:", formJs.includes("submitBtnSpan.textContent = 'Get FREE NDPA Gap Assessment ➔';"));
console.log("Has 'Initiate Compliance Audit Return (CAR) ➔' CTA text:", formJs.includes("submitBtnSpan.textContent = 'Initiate Compliance Audit Return (CAR) ➔';"));

const pass = 
  indexHtml.includes('Get FREE NDPA Gap Assessment') &&
  indexHtml.includes('Initiate Compliance Audit Return (CAR)') &&
  formJs.includes("titleEl.textContent = 'Get FREE NDPA Gap Assessment';") &&
  formJs.includes("titleEl.textContent = 'Initiate Compliance Audit Return (CAR)';");

console.log('\nVERIFICATION RESULT:', pass ? 'ALL PASSED' : 'FAILED');
