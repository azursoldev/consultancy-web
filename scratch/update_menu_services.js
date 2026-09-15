const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update js/header.js
let header = fs.readFileSync(path.join(rootDir, 'js', 'header.js'), 'utf8');

// Update menu label to Services
header = header.replace(
  '<span>Our Solutions</span>',
  '<span>Services</span>'
);

// Add All Services to desktop dropdown
const oldDropdownList = `            <li><a href="\${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>
          </ul>`;
const newDropdownList = `            <li><a href="\${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>
            <li><a href="\${pfx}services/index.html">All Services</a></li>
          </ul>`;

if (header.includes(oldDropdownList)) {
  header = header.replace(oldDropdownList, newDropdownList);
} else {
  // Regex fallback
  header = header.replace(
    /(<li><a href="\$\{pfx\}services\/data-privacy-training\.html">Data Privacy Training<\/a><\/li>)/,
    '$1\n            <li><a href="${pfx}services/index.html">All Services</a></li>'
  );
}

// Update mobile nav title to Services
header = header.replace(
  '<div class="mobile-nav-group-title">Our Solutions</div>',
  '<div class="mobile-nav-group-title">Services</div>'
);

// Add All Services to mobile nav
const oldMobileList = `<li><a href="\${pfx}services/data-privacy-training.html" onclick="toggleMobileMenu()">Data Privacy Training <i class="fa-solid fa-chevron-right text-xs"></i></a></li>`;
const newMobileList = `<li><a href="\${pfx}services/data-privacy-training.html" onclick="toggleMobileMenu()">Data Privacy Training <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}services/index.html" onclick="toggleMobileMenu()">All Services <i class="fa-solid fa-chevron-right text-xs"></i></a></li>`;

header = header.replace(oldMobileList, newMobileList);

fs.writeFileSync(path.join(rootDir, 'js', 'header.js'), header, 'utf8');
console.log('Updated js/header.js');

// 2. Update js/footer.js
let footer = fs.readFileSync(path.join(rootDir, 'js', 'footer.js'), 'utf8');
footer = footer.replace('<!-- Col 1: Our Solutions -->', '<!-- Col 1: Services -->');
footer = footer.replace('<h5>Our Solutions</h5>', '<h5>Services</h5>');

const oldFooterList = `<li><a href="\${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>`;
const newFooterList = `<li><a href="\${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>
            <li><a href="\${pfx}services/index.html">All Services</a></li>`;

footer = footer.replace(oldFooterList, newFooterList);
fs.writeFileSync(path.join(rootDir, 'js', 'footer.js'), footer, 'utf8');
console.log('Updated js/footer.js');

// 3. Update breadcrumbs across service pages
const servicePages = [
  path.join(rootDir, 'services', 'index.html'),
  path.join(rootDir, 'services.html'),
  path.join(rootDir, 'services', 'compliance-audit-return.html'),
  path.join(rootDir, 'services', 'outsourced-dpo.html'),
  path.join(rootDir, 'services', 'data-protection-audit.html'),
  path.join(rootDir, 'services', 'data-privacy-training.html'),
  path.join(rootDir, 'service-car.html'),
  path.join(rootDir, 'service-dpo.html'),
  path.join(rootDir, 'service-audit.html'),
  path.join(rootDir, 'service-training.html'),
  path.join(rootDir, 'data-privacy-training.html')
];

servicePages.forEach(fp => {
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, 'utf8');
    content = content.replace(
      '<span>Our Solutions</span>',
      '<span>Services</span>'
    );
    content = content.replace(
      '>Our Solutions</a>',
      '>Services</a>'
    );
    content = content.replace(
      'Our Solutions: Enterprise Data Protection',
      'Services: Enterprise Data Protection'
    );
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`Updated breadcrumbs in ${path.basename(fp)}`);
  }
});
