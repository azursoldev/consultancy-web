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
       PwC MULTI-COLUMN MEGA FOOTER (Standardized Across All Pages)
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
            <li><a href="javascript:void(0)">Licensed DPCO Status</a></li>
            <li><a href="javascript:void(0)">Team &amp; Advisory Board</a></li>
            <li><a href="javascript:void(0)">Career &amp; Partnerships</a></li>
          </ul>
        </div>

        <!-- Col 3: Knowledge Hub -->
        <div class="footer-col">
          <h5>Knowledge Hub</h5>
          <ul>
            <li><a href="${pfx}publication-detail.html">Complying With NDPA 2023</a></li>
            <li><a href="javascript:void(0)">Regulatory Guidance</a></li>
            <li><a href="javascript:void(0)">Artificial Intelligence Tracker</a></li>
            <li><a href="${pfx}blog/index.html">View All</a></li>
          </ul>
        </div>

        <!-- Col 4: Legal -->
        <div class="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><a href="${pfx}privacy-statement.html">Privacy Statement</a></li>
            <li><a href="${pfx}cookie-policy.html">Cookie Policy</a></li>
            <li><a href="${pfx}terms-of-service.html">Terms of Service</a></li>
            <li><a href="${pfx}legal-disclaimer.html">Legal Disclaimer</a></li>
            <li><a href="${pfx}faq.html">FAQ</a></li>
            <li><a href="${pfx}contact.html">Contact</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar with Logo & Legal -->
      <div class="pwc-footer-bottom">
        <div class="footer-logo-wrap">
          <img src="${pfx}logo.png" alt="Amstel Consulting" class="brand-logo-img">
          <span class="brand-logo-text"><span class="brand-mstel">mstel</span> <span class="brand-consulting">Consulting</span></span>
        </div>
        <div class="footer-disclaimer">
          Licensed as a Data Protection Compliance Organization (DPCO) by the Nigeria Data Protection Commission | License No: DPCO/XXXX/2026. &copy; 2026 Amstel Tech Compliance and Consulting Ltd. All rights reserved.
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
})();
