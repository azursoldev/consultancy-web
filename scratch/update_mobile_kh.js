const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, '..', 'js', 'header.js');
let header = fs.readFileSync(headerPath, 'utf8');

const oldMobileNav = `        <!-- Navigation Links -->
        <div>
          <div class="mobile-nav-group-title">Navigation</div>
          <ul class="mobile-nav-links">
            <li><a href="\${pfx}about.html" onclick="toggleMobileMenu()">Our Organization <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">Knowledge Hub <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}contact.html" onclick="toggleMobileMenu()">Contact Us <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>`;

const newMobileNav = `        <!-- Knowledge Hub -->
        <div>
          <div class="mobile-nav-group-title">Knowledge Hub</div>
          <ul class="mobile-nav-links">
            <li><a href="\${pfx}publication-detail.html" onclick="toggleMobileMenu()">Complying With NDPA 2023 <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">Regulatory Guidance <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">Artificial Intelligence Tracker <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}blog/index.html" onclick="toggleMobileMenu()">View All <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>

        <!-- Organization & Contact -->
        <div>
          <div class="mobile-nav-group-title">Organization</div>
          <ul class="mobile-nav-links">
            <li><a href="\${pfx}about.html" onclick="toggleMobileMenu()">Our Organization <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="\${pfx}contact.html" onclick="toggleMobileMenu()">Contact Us <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>`;

// Normalizing CRLF
const normalizedHeader = header.replace(/\r\n/g, '\n');
const normalizedOld = oldMobileNav.replace(/\r\n/g, '\n');

if (normalizedHeader.includes(normalizedOld)) {
  header = normalizedHeader.replace(normalizedOld, newMobileNav);
  fs.writeFileSync(headerPath, header, 'utf8');
  console.log('Successfully updated mobile drawer Knowledge Hub');
} else {
  console.log('Could not find old mobile nav in header');
}
