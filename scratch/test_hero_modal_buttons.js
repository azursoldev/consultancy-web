const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const formJs = fs.readFileSync('js/compliance-form.js', 'utf8');

const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
const { window } = dom;

// Inject compliance-form script
const scriptEl = window.document.createElement('script');
scriptEl.textContent = formJs;
window.document.body.appendChild(scriptEl);

// Wait for event handlers to attach
setTimeout(() => {
  console.log('Testing Button 1: Get FREE NDPA Gap Assessment');
  const btn1 = window.document.querySelector('.btn-hero-primary');
  console.log('Btn 1 Text:', btn1.textContent.trim().replace(/\s+/g, ' '));
  btn1.click();

  const modal = window.document.getElementById('complianceModalOverlay');
  const title1 = modal.querySelector('.modal-header h3').textContent;
  const badge1 = modal.querySelector('.compliance-form-badge').textContent;
  const submitBtn1 = modal.querySelector('.btn-compliance-submit span').textContent;
  const checked1 = Array.from(modal.querySelectorAll('input[name="objectives"]:checked')).map(i => i.value);
  console.log('Modal 1 Title:', title1);
  console.log('Modal 1 Badge:', badge1);
  console.log('Modal 1 Submit Text:', submitBtn1);
  console.log('Modal 1 Checked Objectives:', checked1);

  console.log('\nTesting Button 2: Initiate Compliance Audit Return (CAR)');
  const btn2 = window.document.querySelector('.btn-hero-primary-outline');
  console.log('Btn 2 Text:', btn2.textContent.trim().replace(/\s+/g, ' '));
  btn2.click();

  const title2 = modal.querySelector('.modal-header h3').textContent;
  const badge2 = modal.querySelector('.compliance-form-badge').textContent;
  const submitBtn2 = modal.querySelector('.btn-compliance-submit span').textContent;
  const checked2 = Array.from(modal.querySelectorAll('input[name="objectives"]:checked')).map(i => i.value);
  console.log('Modal 2 Title:', title2);
  console.log('Modal 2 Badge:', badge2);
  console.log('Modal 2 Submit Text:', submitBtn2);
  console.log('Modal 2 Checked Objectives:', checked2);
}, 200);
