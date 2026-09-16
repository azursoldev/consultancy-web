const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update js/header.js
const headerPath = path.join(rootDir, 'js', 'header.js');
let header = fs.readFileSync(headerPath, 'utf8');

// Target desktop Knowledge Hub link
const oldKnowledgeHubNav = `      <!-- 3. Knowledge Hub (Client Sitemap: Direct Link) -->
      <li>
        <a href="\${pfx}blog/index.html">Knowledge Hub</a>
      </li>`;

const newKnowledgeHubNav = `      <!-- 3. Knowledge Hub Dropdown -->
      <li class="nav-item-dropdown">
        <a href="\${pfx}blog/index.html" class="nav-dropdown-trigger">
          <span>Knowledge Hub</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>

        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="\${pfx}publication-detail.html">Complying With NDPA 2023</a></li>
            <li><a href="\${pfx}blog/index.html">Regulatory Guidance</a></li>
            <li><a href="\${pfx}blog/index.html">Artificial Intelligence Tracker</a></li>
            <li><a href="\${pfx}blog/index.html">View All</a></li>
          </ul>
        </div>
      </li>`;

if (header.includes(oldKnowledgeHubNav)) {
  header = header.replace(oldKnowledgeHubNav, newKnowledgeHubNav);
  console.log('Replaced desktop Knowledge Hub with dropdown');
} else {
  // Regex fallback
  header = header.replace(
    /<li>\s*<a href="\$\{pfx\}blog\/index\.html">Knowledge Hub<\/a>\s*<\/li>/,
    newKnowledgeHubNav
  );
  console.log('Replaced desktop Knowledge Hub via regex');
}

// Target mobile drawer navigation
const oldMobileNav = `        <!-- Navigation Links -->
        <div>
          <div class="mobile-nav-group-title">Navigation</div>
          <ul class="mobile-nav-links">
            <li><a href="\${pfx}about.html" onclick="toggleMobileMenu()">Our Organization <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">Knowledge Hub <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}contact.html" onclick="toggleMobileMenu()">Contact Us <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>`;

const newMobileNav = `        <!-- Knowledge Hub Links -->
        <div>
          <div class="mobile-nav-group-title">Knowledge Hub</div>
          <ul class="mobile-nav-links">
            <li><a href="\${pfx}publication-detail.html" onclick="toggleMobileMenu()">Complying With NDPA 2023 <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">Regulatory Guidance <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">Artificial Intelligence Tracker <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">View All <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>

        <!-- Navigation Links -->
        <div>
          <div class="mobile-nav-group-title">Organization</div>
          <ul class="mobile-nav-links">
            <li><a href="\${pfx}about.html" onclick="toggleMobileMenu()">Our Organization <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}contact.html" onclick="toggleMobileMenu()">Contact Us <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>`;

if (header.includes(oldMobileNav)) {
  header = header.replace(oldMobileNav, newMobileNav);
  console.log('Replaced mobile drawer Knowledge Hub links');
}

fs.writeFileSync(headerPath, header, 'utf8');
console.log('Updated js/header.js');

// 2. Update js/footer.js
const footerPath = path.join(rootDir, 'js', 'footer.js');
let footer = fs.readFileSync(footerPath, 'utf8');

const oldFooterKH = `        <!-- Col 3: Knowledge Hub -->
        <div class="footer-col">
          <h5>Knowledge Hub</h5>
          <ul>
            <li><a href="\${pfx}publication-detail.html">Complying With NDPA 2023</a></li>
            <li><a href="javascript:void(0)" style="cursor: default; opacity: 0.75;">Regulatory Guidance</a></li>
            <li><a href="javascript:void(0)" style="cursor: default; opacity: 0.75;">Artificial Intelligence Tracker</a></li>
          </ul>
        </div>`;

const newFooterKH = `        <!-- Col 3: Knowledge Hub -->
        <div class="footer-col">
          <h5>Knowledge Hub</h5>
          <ul>
            <li><a href="\${pfx}publication-detail.html">Complying With NDPA 2023</a></li>
            <li><a href="\${pfx}blog/index.html">Regulatory Guidance</a></li>
            <li><a href="\${pfx}blog/index.html">Artificial Intelligence Tracker</a></li>
            <li><a href="\${pfx}blog/index.html">View All</a></li>
          </ul>
        </div>`;

if (footer.includes(oldFooterKH)) {
  footer = footer.replace(oldFooterKH, newFooterKH);
  fs.writeFileSync(footerPath, footer, 'utf8');
  console.log('Updated js/footer.js');
}
