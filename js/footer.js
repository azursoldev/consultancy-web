/**
 * Amstel Consulting — Standalone Footer Component
 * Single Source of Truth for Footer HTML, Navigation & Legal Disclaimers
 */
(function () {
  const isSubdir = window.location.pathname.includes('/services/') || 
                   window.location.pathname.includes('/legal/') || 
                   window.location.pathname.includes('/blog/');
  const pfx = isSubdir ? '../' : '';

  const footerHTML = `
  <!-- ==========================================================================
       PwC MULTI-COLUMN MEGA FOOTER (Standardised Across All Pages)
       ========================================================================== -->
  <footer class="pwc-footer">
    <div class="pwc-footer-container">
      <div class="pwc-footer-columns">

        <!-- Col 1: Services -->
        <div class="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="${pfx}services/compliance-audit-return.html">Annual Compliance Audit Return (CAR)</a></li>
            <li><a href="${pfx}services/outsourced-dpo.html">Appoint Outsourced Certified DPO</a></li>
            <li><a href="${pfx}services/data-protection-audit.html">Data Protection Audit</a></li>
            <li><a href="${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>
            <li><a href="${pfx}services/index.html">View All</a></li>
          </ul>
        </div>

        <!-- Col 2: Our Organisation -->
        <div class="footer-col">
          <h5>Our Organisation</h5>
          <ul>
            <li><a href="${pfx}about.html">About Us</a></li>
            <li><a href="${pfx}licensed-dpco-status.html">Licensed DPCO Status</a></li>
            <li><a href="${pfx}team.html">Team &amp; Advisory Board</a></li>
            <li><a href="${pfx}careers.html">Career &amp; Partnerships</a></li>
          </ul>
        </div>

        <!-- Col 3: Knowledge Hub -->
        <div class="footer-col">
          <h5>Knowledge Hub</h5>
          <ul>
            <li><a href="${pfx}publication-detail.html">Complying With NDPA 2023</a></li>
            <li><a href="${pfx}regulatory-guidance.html">Regulatory Guidance</a></li>
            <li><a href="${pfx}ai-regulatory-tracker.html">Artificial Intelligence Tracker</a></li>
            <li><a href="${pfx}blog/index.html">View All</a></li>
          </ul>
        </div>

        <!-- Col 4: Legal -->
        <div class="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><a href="${pfx}privacy-statement.html">Privacy Statement</a></li>
            <li><a href="${pfx}cookie-policy.html">Cookie Policy</a></li>
            <li><a href="javascript:void(0)" onclick="window.openCookiePreferences &amp;&amp; window.openCookiePreferences(); return false;">Cookie Preferences</a></li>
            <li><a href="${pfx}terms-of-service.html">Terms of Service</a></li>
            <li><a href="${pfx}legal-disclaimer.html">Legal Disclaimer</a></li>
            <li><a href="${pfx}faq.html">FAQ</a></li>
            <li><a href="${pfx}contact.html">Contact</a></li>
          </ul>
        </div>

        <!-- Col 5: Contact Information -->
        <div class="footer-col footer-col-contact">
          <h5>Contact Information</h5>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <a href="https://wa.me/2347070228766" target="_blank" rel="noopener noreferrer" class="footer-contact-icon-box" title="WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <div class="footer-contact-text-group">
                <a href="tel:+2347070228766" class="footer-contact-link">+2347070228766</a>
              </div>
            </div>

            <div class="footer-contact-item">
              <a href="https://wa.me/2349116904723" target="_blank" rel="noopener noreferrer" class="footer-contact-icon-box" title="WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <div class="footer-contact-text-group">
                <a href="tel:+2349116904723" class="footer-contact-link">+2349116904723</a>
              </div>
            </div>

            <div class="footer-contact-item">
              <a href="mailto:info@amstel.ng" class="footer-contact-icon-box" title="Email Us">
                <i class="fa-solid fa-envelope"></i>
              </a>
              <div class="footer-contact-text-group">
                <a href="mailto:info@amstel.ng" class="footer-contact-link">info@amstel.ng</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar with Logo & Legal -->
      <div class="pwc-footer-bottom">
        <div class="footer-logo-wrap">
          <img src="${pfx}logo.png" alt="Amstel Consulting" class="brand-logo-img">
          <span class="brand-logo-text"><span class="brand-mstel">mstel</span> <span class="brand-consulting">Consulting</span></span>
        </div>
        <div class="footer-disclaimer">
          <p class="footer-license-text">Licensed as a Data Protection Compliance Organisation (DPCO) by the Nigeria Data Protection Commission. License No: DPCO/XXXX/2026.</p>
          <p class="footer-copyright-text" style="margin-top: 0.35rem;">&copy; 2026 Amstel Tech Compliance and Consulting Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  `;

  // Mount Footer to DOM
  const mount = document.getElementById('site-footer');
  if (mount) {
    mount.outerHTML = footerHTML;
  } else {
    const existingFooter = document.querySelector('footer.pwc-footer');
    if (existingFooter) {
      existingFooter.outerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
  }

  // Automatically initialize Cookie Consent Banner & Preference Centre across all pages
  if (!document.getElementById('amstel-cookie-script')) {
    const cookieScript = document.createElement('script');
    cookieScript.id = 'amstel-cookie-script';
    cookieScript.src = `${pfx}js/cookie-banner.js`;
    document.body.appendChild(cookieScript);
  }
})();
