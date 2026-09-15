const fs = require('fs');
const path = require('path');

// 1. Update js/header.js
let header = fs.readFileSync(path.join(__dirname, '..', 'js', 'header.js'), 'utf8');
header = header.replace(
  '<li><a href="javascript:void(0)" style="cursor: default; opacity: 0.75;">Data Privacy Training</a></li>',
  '<li><a href="${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>'
);
header = header.replace(
  '<li><a href="javascript:void(0)" style="cursor: default; opacity: 0.75;">Data Privacy Training</a></li>',
  '<li><a href="${pfx}services/data-privacy-training.html" onclick="toggleMobileMenu()">Data Privacy Training <i class="fa-solid fa-chevron-right text-xs"></i></a></li>'
);
fs.writeFileSync(path.join(__dirname, '..', 'js', 'header.js'), header, 'utf8');
console.log('Updated js/header.js');

// 2. Update js/footer.js
let footer = fs.readFileSync(path.join(__dirname, '..', 'js', 'footer.js'), 'utf8');
footer = footer.replace(
  '<li><a href="javascript:void(0)" style="cursor: default; opacity: 0.75;">Data Privacy Training</a></li>',
  '<li><a href="${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>'
);
fs.writeFileSync(path.join(__dirname, '..', 'js', 'footer.js'), footer, 'utf8');
console.log('Updated js/footer.js');

// 3. Update index.html
let index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const oldBtnIndex = `<button type="button" class="btn-intent-action" data-open-modal="compliance" data-precheck="general"
            style="border: none; cursor: pointer;">
            <span>Request Data Privacy Training</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>`;
const newBtnIndex = `<a href="services/data-privacy-training.html" class="btn-intent-action">
            <span>Request Data Privacy Training</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>`;
if (index.includes('data-open-modal="compliance" data-precheck="general"')) {
  index = index.replace(oldBtnIndex, newBtnIndex);
  // Also fallback regex in case whitespace differs
  index = index.replace(
    /<button type="button" class="btn-intent-action" data-open-modal="compliance" data-precheck="general"[^>]*>[\s\S]*?<\/button>/,
    newBtnIndex
  );
  fs.writeFileSync(path.join(__dirname, '..', 'index.html'), index, 'utf8');
  console.log('Updated index.html');
}

// 4. Update services/index.html
let sIndex = fs.readFileSync(path.join(__dirname, '..', 'services', 'index.html'), 'utf8');
const newBtnSIndex = `<a href="data-privacy-training.html" class="btn-pillar-route">
          <span>Request Data Privacy Training</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>`;
sIndex = sIndex.replace(
  /<button type="button" class="btn-pillar-route" data-open-modal="compliance" data-precheck="general"[^>]*>[\s\S]*?<\/button>/,
  newBtnSIndex
);
fs.writeFileSync(path.join(__dirname, '..', 'services', 'index.html'), sIndex, 'utf8');
console.log('Updated services/index.html');

// 5. Create root data-privacy-training.html
let trainingHtml = fs.readFileSync(path.join(__dirname, '..', 'services', 'data-privacy-training.html'), 'utf8');
// Fix relative links for root
let rootTrainingHtml = trainingHtml
  .replace(/href="\.\.\//g, 'href="')
  .replace(/src="\.\.\//g, 'src="')
  .replace('href="index.html">Our Solutions</a>', 'href="services/index.html">Our Solutions</a>');
fs.writeFileSync(path.join(__dirname, '..', 'data-privacy-training.html'), rootTrainingHtml, 'utf8');
console.log('Created root data-privacy-training.html');

// 6. Update service-training.html to match
fs.writeFileSync(path.join(__dirname, '..', 'service-training.html'), rootTrainingHtml, 'utf8');
console.log('Updated root service-training.html');
