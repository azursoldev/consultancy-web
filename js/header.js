/**
 * Amstel Consulting — Standalone Header Component
 * Single Source of Truth for Header HTML, Navigation & Interactive Logic
 */
(function () {
  const isSubdir = window.location.pathname.includes('/services/') || window.location.pathname.includes('/legal/') || window.location.pathname.includes('/blog/');
  const pfx = isSubdir ? '../' : '';

  const headerHTML = `

  <!-- 2. Top Utility Bar (PwC Standard) -->
  <div class="top-bar">
    <span class="top-bar-item"><i class="fa-solid fa-location-dot"></i> Nigeria</span>
    <span class="top-bar-item"><i class="fa-solid fa-globe"></i> EN</span>
  </div>

  <!-- 3. Main Navigation Header -->
  <header class="header">
    <a href="${pfx}index.html" class="brand-logo-link">
      <img src="${pfx}logo.png" alt="Amstel Consulting" class="brand-logo-img">
      <span class="brand-logo-text"><span class="brand-mstel">mstel</span> <span class="brand-consulting">Consulting</span></span>
    </a>

    <ul class="main-nav">
      <!-- 1. Our Solutions Dropdown & Hub (Client 12 Sept Spec) -->
      <li class="nav-item-dropdown">
        <a href="${pfx}services/index.html" class="nav-dropdown-trigger">
          <span>Our Solutions</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>
        
        <div class="mega-dropdown-menu">
          <div class="mega-dropdown-grid">
            
            <!-- Column 1: Core Statutory Pillars (12 Sept Spec) -->
            <div>
              <div class="mega-col-heading">Core Compliance Solutions</div>
              <ul class="mega-subnav-list">
                <li><a href="${pfx}services/compliance-audit-return.html">Annual Compliance Audit Return Filing</a></li>
                <li><a href="${pfx}services/data-protection-audit.html">Data Protection Audit</a></li>
                <li><a href="${pfx}services/outsourced-dpo.html">Appoint Outsourced Certified DPO</a></li>
                <li><a href="${pfx}services/index.html" style="color: var(--pwc-orange); font-weight: 700;">Explore All Solutions &rarr;</a></li>
              </ul>
            </div>

            <!-- Column 2: Governance & Privacy -->
            <div>
              <div class="mega-col-heading">Operational Privacy</div>
              <ul class="mega-subnav-list">
                <li><a href="${pfx}service-ropa.html">Record of Processing Activities (ROPA)</a></li>
                <li><a href="${pfx}service-dpia.html">DPIA &amp; LIA Assessments</a></li>
                <li><a href="${pfx}service-policies.html">Privacy Policies &amp; Notices</a></li>
                <li><a href="${pfx}service-dpa.html">Data Processing Agreements (DPA)</a></li>
              </ul>
            </div>

            <!-- Column 3: Advisory & Defense -->
            <div>
              <div class="mega-col-heading">Advanced Advisory</div>
              <ul class="mega-subnav-list">
                <li><a href="${pfx}service-training.html">Data Protection Training</a></li>
                <li><a href="${pfx}service-ai.html">AI Governance &amp; Ethics</a></li>
                <li><a href="${pfx}service-cyber.html">Cybersecurity Advisory</a></li>
                <li><a href="${pfx}service-gov.html">Corporate Governance</a></li>
              </ul>
            </div>

          </div>
        </div>
      </li>

      <!-- 2. Our Organisation -->
      <li class="nav-item-dropdown">
        <a href="${pfx}about.html" class="nav-dropdown-trigger">
          <span>Our Organisation</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>

        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="${pfx}about.html">About Amstel Consulting</a></li>
            <li><a href="${pfx}about.html#credentials">Licensed DPCO Status</a></li>
            <li><a href="${pfx}about.html#leadership">Advisory Board &amp; Team</a></li>
            <li><a href="${pfx}contact.html">Careers &amp; Partnerships</a></li>
          </ul>
        </div>
      </li>

      <!-- 3. Knowledge Hub -->
      <li class="nav-item-dropdown">
        <a href="${pfx}blog/index.html" class="nav-dropdown-trigger">
          <span>Knowledge Hub</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>

        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="${pfx}publication-detail.html">Complying with Nigeria Data Protection Act (NDPA)</a></li>
            <li><a href="${pfx}service-ai.html">Artificial Intelligence for Business</a></li>
            <li><a href="${pfx}service-cyber.html">Cyber Security Best Practices</a></li>
            <li><a href="${pfx}topics.html">All Publications &amp; Regulatory Insights</a></li>
          </ul>
        </div>
      </li>

      <!-- 4. Contact Us -->
      <li><a href="${pfx}contact.html">Contact Us</a></li>
    </ul>

    <div class="header-right">
      <div class="header-search-wrap">
        <button class="header-search-trigger" onclick="openSearchModal()" aria-label="Search site">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span>Search</span>
        </button>
      </div>
      <a href="${pfx}services/compliance-audit-return.html" class="btn-contact-nav btn-header-cta">FILE YOUR CAR</a>
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Toggle navigation menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </header>

  <!-- 4. Responsive Mobile Slideout Drawer -->
  <div id="mobileNavOverlay" class="mobile-nav-overlay" onclick="if(event.target === this) toggleMobileMenu()">
    <div class="mobile-nav-drawer">
      <div class="mobile-drawer-header">
        <a href="${pfx}index.html" class="brand-logo-link">
          <img src="${pfx}logo.png" alt="Amstel Consulting" class="brand-logo-img">
          <span class="brand-logo-text"><span class="brand-mstel">mstel</span> <span class="brand-consulting">Consulting</span></span>
        </a>
        <button class="mobile-drawer-close" onclick="toggleMobileMenu()" aria-label="Close menu">&times;</button>
      </div>
      <div class="mobile-drawer-body">
        <!-- Our Solutions (Client 12 Sept Pillars) -->
        <div>
          <div class="mobile-nav-group-title">Core Solutions (NDPC Certified)</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}services/compliance-audit-return.html" onclick="toggleMobileMenu()">Annual CAR Filing Support <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}services/data-protection-audit.html" onclick="toggleMobileMenu()">Data Protection Audit <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}services/outsourced-dpo.html" onclick="toggleMobileMenu()">Appoint Outsourced Certified DPO <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}services/index.html" onclick="toggleMobileMenu()" style="color: var(--pwc-orange); font-weight: 700;">View All Solutions Hub <i class="fa-solid fa-arrow-right text-xs"></i></a></li>
          </ul>
        </div>
        <!-- Services: Operational Privacy -->
        <div>
          <div class="mobile-nav-group-title">Operational Privacy</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}service-ropa.html" onclick="toggleMobileMenu()">Record of Processing (ROPA) <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}service-dpia.html" onclick="toggleMobileMenu()">DPIA &amp; LIA Assessments <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}service-policies.html" onclick="toggleMobileMenu()">Privacy Policies &amp; Notices <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}service-dpa.html" onclick="toggleMobileMenu()">Data Processing Agreements <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>
        <!-- Services: Advanced Advisory -->
        <div>
          <div class="mobile-nav-group-title">Advanced Advisory</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}service-training.html" onclick="toggleMobileMenu()">Data Protection Training <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}service-ai.html" onclick="toggleMobileMenu()">AI Consulting &amp; Ethics <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}service-cyber.html" onclick="toggleMobileMenu()">Cybersecurity Advisory <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>
        <!-- Our Organisation -->
        <div>
          <div class="mobile-nav-group-title">Our Organisation</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}about.html" onclick="toggleMobileMenu()">About Amstel Consulting <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}about.html#credentials" onclick="toggleMobileMenu()">Licensed DPCO Status <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}about.html#leadership" onclick="toggleMobileMenu()">Advisory Board &amp; Team <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>
        <!-- Knowledge Hub -->
        <div>
          <div class="mobile-nav-group-title">Knowledge Hub</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}blog/index.html" onclick="toggleMobileMenu()">Complying with NDPA 2023 <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}topics.html" onclick="toggleMobileMenu()">Regulatory Guidance &amp; Insights <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>
        <div>
          <div class="mobile-nav-group-title">Direct Inquiries</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}contact.html" onclick="toggleMobileMenu()">Contact Us <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>
      </div>
      <div class="mobile-drawer-footer">
        <a href="${pfx}services/compliance-audit-return.html" onclick="toggleMobileMenu()" class="btn-mobile-car">
          <span>FILE YOUR CAR</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>

  `;

  // Mount Header to DOM
  const mount = document.getElementById('site-header');
  if (mount) {
    mount.outerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // Interactive Logic: Mobile Drawer
  window.toggleMobileMenu = function () {
    const overlay = document.getElementById('mobileNavOverlay');
    if (overlay) {
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    }
  };

  // 5. Site-Wide Comprehensive Search Engine
  const searchIndex = [
    {
      title: 'Compliance Audit Return (CAR)',
      url: 'services/compliance-audit-return.html',
      badge: 'Statutory Filing',
      desc: 'Statutory annual NDPA 2023 compliance audit return filing preparation, assurance & NDPC submission before March 15 statutory deadline.',
      keywords: 'car filing compliance audit return ndpc ndpa 2023 statutory deadline penalty fines licensed dpco audit rules regulations returns'
    },
    {
      title: 'Data Protection Audit',
      url: 'services/data-protection-audit.html',
      badge: 'Technical & Operational',
      desc: 'Comprehensive Article 30/31 technical, organizational & physical security gap assessments under NDPA and DPCO audit rules.',
      keywords: 'audit privacy assessment ndpa gap analysis security controls ndpc dpco audit rules regulations verification risk assessment'
    },
    {
      title: 'Data Protection Training & Awareness',
      url: 'service-training.html',
      badge: 'Workforce & DPO',
      desc: 'Certified executive and workforce data privacy training, employee awareness modules, and advanced DPO masterclasses.',
      keywords: 'training education masterclass workforce awareness ndpa certification privacy skills compliance course elearning'
    },
    {
      title: 'Outsourced DPO (DPOaaS)',
      url: 'services/outsourced-dpo.html',
      badge: 'Designated Officer',
      desc: 'Accredited external Data Protection Officer statutory representation, compliance monitoring, and direct NDPC liaison.',
      keywords: 'dpo outsourced data protection officer dpoaas representation contact liaison advisory ndpa officer'
    },
    {
      title: 'DPIA & LIA Assessments',
      url: 'service-dpia.html',
      badge: 'Risk Assessment',
      desc: 'Data Protection Impact Assessments (DPIA) and Legitimate Interest Assessments (LIA) for high-risk processing operations.',
      keywords: 'dpia lia impact assessment risk assessment high risk legitimate interest ndpa section 28 processing'
    },
    {
      title: 'ROPA Data Lineage & Inventory',
      url: 'service-ropa.html',
      badge: 'Article 24 Record',
      desc: 'Article 24 Records of Processing Activities mapping, department data flow registries, and lawful basis documentation.',
      keywords: 'ropa record of processing activities data mapping inventory data flow article 24 registers lineage data assets'
    },
    {
      title: 'Privacy Policies & Notices',
      url: 'service-policies.html',
      badge: 'Legal Notices',
      desc: 'Drafting statutory NDPA external privacy notices, employee handbooks, consent management charters and retention schedules.',
      keywords: 'privacy policy notices transparent ndpa laws consent notices privacy notice employee policy'
    },
    {
      title: 'Data Processing Agreements (DPAs)',
      url: 'service-dpa.html',
      badge: 'Vendor Contracts',
      desc: 'Statutory Article 29 & Section 39 controller-to-processor covenants, vendor risk audits, standard contractual clauses and sub-processor agreements.',
      keywords: 'dpa data processing agreements vendor contract supply chain scc standard contractual clauses subprocessor processor controller'
    },
    {
      title: 'Cybersecurity & Pen-Testing',
      url: 'service-cyber.html',
      badge: 'Security Posture',
      desc: 'Section 39 security posture hardening, external/internal vulnerability assessment, penetration testing, and breach drills.',
      keywords: 'cybersecurity cyber penetration testing pen test vulnerability security hardening breach response posture technical audit'
    },
    {
      title: 'Corporate Governance & Risk Advisory',
      url: 'service-gov.html',
      badge: 'Boardroom Advisory',
      desc: 'Boardroom digital trust charters, fiduciary risk monitoring, and executive privacy governance matrices.',
      keywords: 'governance boardroom corporate risk oversight leadership compliance fiduciary charter board'
    },
    {
      title: 'AI Consulting & Compliance',
      url: 'service-ai.html',
      badge: 'Emerging Tech',
      desc: 'Artificial intelligence compliance, algorithmic accountability, ethical AI safety, and automated decision rights.',
      keywords: 'ai artificial intelligence machine learning algorithmic accountability automated decisions tech generative ai'
    },
    {
      title: 'Cookie & Consent Compliance',
      url: 'service-cookie.html',
      badge: 'Consent CMP',
      desc: 'Zero-party consent telemetry, Ketch-style tracking audits, and compliant cookie banner management.',
      keywords: 'cookie consent cmp tracking cookies zero party banner telemetry opt in gdpr ndpa banner'
    },
    {
      title: 'NDPA 2023 Statutory Laws & Regulations',
      url: 'topics.html#ndpa-laws',
      badge: 'Statutory Guidance',
      desc: 'Full breakdown of the Nigeria Data Protection Act (NDPA) 2023 regulations, enforcement sections, and DPCO audit rules.',
      keywords: 'ndpa regulations ndpa 2023 statutory laws rules act legislation nigeria data protection act section penalties legal regulatory'
    },
    {
      title: 'Licensed DPCO Credentials & Governance',
      url: 'organisation-governance.html',
      badge: 'Accreditation',
      desc: 'Amstel Consulting official licensed Data Protection Compliance Organization (DPCO) credentials and authorization under NDPC.',
      keywords: 'dpco licensed licensed dpco accreditation ndpc authorization credentials compliance organization'
    },
    {
      title: 'About Us & Leadership Values',
      url: 'organisation-values.html',
      badge: 'Company Profile',
      desc: 'Our mission, ethical values, digital trust principles, and regulatory integrity commitments.',
      keywords: 'about us values mission purpose ethics team leadership amstel consulting practice'
    },
    {
      title: 'Consultants & Practice Directors',
      url: 'organisation-consultants.html',
      badge: 'Our Practice',
      desc: 'Certified privacy engineers, legal counsels, accredited lead auditors, and enterprise security architects.',
      keywords: 'consultants team auditors lawyers experts engineers partners practice directors staff'
    },
    {
      title: 'Advisory Board',
      url: 'organisation-board.html',
      badge: 'Leadership',
      desc: 'Distinguished governance and regulatory leadership advisory board guiding strategic compliance.',
      keywords: 'advisory board directors governance leadership partners'
    },
    {
      title: 'Regulatory Guidance: NDPC Updates',
      url: 'publication-detail.html',
      badge: 'Publications',
      desc: 'Official NDPC enforcement advisories, annual audit filing circulars, and regulatory compliance updates.',
      keywords: 'publications regulatory guidance circulars ndpc enforcement news articles updates bulletins'
    },
    {
      title: 'Contact Practice Offices & RFP Inquiries',
      url: 'contact.html',
      badge: 'Contact',
      desc: 'Direct engagement with licensed DPCO partners, request a free privacy assessment, or submit an RFP.',
      keywords: 'contact help phone email office lagos abuja consult inquiry get in touch quote rfp assessment free'
    }
  ];

  window.renderDefaultQuickLinks = function () {
    const containers = document.querySelectorAll('.search-results-list, #searchResults');
    const html = `
      <div class="search-quick-links-wrap" style="padding: 0.25rem 0;">
        <div style="font-size: 0.8rem; font-weight: 600; color: #64748b; margin-bottom: 0.65rem;">Quick links:</div>
        <div class="search-quick-links" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0;">
          <a href="${pfx}services/compliance-audit-return.html">Compliance Audit Return (CAR)</a>
          <a href="${pfx}services/outsourced-dpo.html">Outsourced DPO</a>
          <a href="${pfx}services/data-protection-audit.html">Data Protection Audit</a>
          <a href="${pfx}service-training.html">Data Protection Training</a>
          <a href="${pfx}topics.html#ndpa-laws">NDPA 2023 Statutory Laws</a>
          <a href="${pfx}service-ai.html">AI Governance</a>
          <a href="${pfx}about.html#credentials">Licensed DPCO</a>
          <a href="${pfx}contact.html">Contact Advisory Desk</a>
        </div>
      </div>
    `;
    containers.forEach(c => {
      c.innerHTML = html;
    });
  };

  window.handleSearch = function (query) {
    const containers = document.querySelectorAll('.search-results-list, #searchResults');
    if (!containers || containers.length === 0) return;

    const q = (query || '').toLowerCase().trim();
    if (!q) {
      window.renderDefaultQuickLinks();
      return;
    }

    const words = q.split(/\s+/).filter(Boolean);
    const matched = searchIndex.filter(item => {
      const t = item.title ? item.title.toLowerCase() : '';
      const d = item.desc ? item.desc.toLowerCase() : '';
      const k = item.keywords ? item.keywords.toLowerCase() : '';
      const b = item.badge ? item.badge.toLowerCase() : '';
      const fullText = (t + ' ' + d + ' ' + k + ' ' + b);
      return fullText.includes(q) || (words.length > 1 && words.every(w => fullText.includes(w)));
    });

    if (matched.length === 0) {
      const safeQ = q.replace(/[&<>"']/g, function (m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
      });
      containers.forEach(c => {
        c.innerHTML = `
          <div style="padding: 2.25rem 1rem; text-align: center;">
            <i class="fa-solid fa-circle-question" style="font-size: 2rem; color: #cbd5e1; margin-bottom: 0.75rem; display: block;"></i>
            <p style="color: #475569; font-size: 0.95rem; margin-bottom: 0.5rem; font-weight: 500;">
              No direct matches found for "<strong>${safeQ}</strong>"
            </p>
            <p style="font-size: 0.82rem; color: #94a3b8; margin-bottom: 1.25rem;">
              Try searching for <em>CAR</em>, <em>Audit</em>, <em>DPO</em>, <em>NDPA</em>, or <em>Training</em>.
            </p>
            <a href="${pfx}contact.html" style="display: inline-flex; align-items: center; gap: 0.45rem; background: #fff5ee; color: var(--pwc-orange, #d04a02); padding: 0.5rem 1.15rem; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 0.85rem; border: 1px solid #fed7aa;">
              <span>Contact our DPCO Advisory Desk</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        `;
      });
      return;
    }

    const html = `
      <div style="font-size: 0.78rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; padding-left: 0.25rem;">
        ${matched.length} Result${matched.length > 1 ? 's' : ''} Found
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    ` + matched.map(m => `
      <a href="${pfx}${m.url}" class="search-result-row" style="display: block; padding: 0.85rem 1rem; border-radius: 8px; text-decoration: none; background: #f8fafc; border: 1px solid #f1f5f9; transition: all 0.15s ease;" onmouseover="this.style.background='#fff5ee'; this.style.borderColor='#fed7aa';" onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#f1f5f9';">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.25rem;">
          <div style="font-weight: 700; color: #0f172a; font-size: 0.95rem;">${m.title}</div>
          <span style="font-size: 0.7rem; font-weight: 700; color: var(--pwc-orange, #d04a02); background: #fff7ed; border: 1px solid #ffedd5; padding: 0.15rem 0.5rem; border-radius: 9999px; white-space: nowrap;">${m.badge || 'Advisory'}</span>
        </div>
        <div style="font-size: 0.82rem; color: #64748b; line-height: 1.45;">${m.desc}</div>
      </a>
    `).join('') + `</div>`;

    containers.forEach(c => {
      c.innerHTML = html;
    });
  };

  // Interactive Logic: Search Modal Triggering
  window.openSiteSearchModal = function () {
    const overlay = document.getElementById('siteSearchModal') || document.getElementById('searchModalOverlay');
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      const input = overlay.querySelector('input') || document.getElementById('siteSearchInput');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 80);
      }
      if (typeof window.renderDefaultQuickLinks === 'function') {
        window.renderDefaultQuickLinks();
      }
    }
  };

  window.closeSiteSearchModal = function () {
    const overlays = document.querySelectorAll('.search-modal-overlay');
    overlays.forEach(o => o.classList.remove('open'));
    document.body.style.overflow = '';
  };

  window.openSearchModal = window.openSiteSearchModal;
  window.closeSearchModal = window.closeSiteSearchModal;
  window.executeSiteSearch = window.handleSearch;

  // Global click handler for search trigger buttons
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.header-search-trigger');
    if (trigger) {
      e.preventDefault();
      window.openSiteSearchModal();
    }
  });

  // Global Event Delegations: Input, Enter key & Escape
  document.addEventListener('input', function (e) {
    if (e.target && (e.target.id === 'siteSearchInput' || e.target.classList.contains('search-input'))) {
      if (typeof window.executeSiteSearch === 'function') {
        window.executeSiteSearch(e.target.value);
      } else if (typeof window.handleSearch === 'function') {
        window.handleSearch(e.target.value);
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      window.closeSiteSearchModal();
      const overlay = document.getElementById('mobileNavOverlay');
      if (overlay && overlay.classList.contains('open')) {
        window.toggleMobileMenu();
      }
    } else if (e.key === 'Enter') {
      const active = document.activeElement;
      if (active && (active.id === 'siteSearchInput' || active.classList.contains('search-input'))) {
        e.preventDefault();
        const firstLink = document.querySelector('.search-results-list a.search-result-row, .search-results-list a');
        if (firstLink && firstLink.href) {
          window.location.href = firstLink.href;
        }
      }
    }
  });
})();


