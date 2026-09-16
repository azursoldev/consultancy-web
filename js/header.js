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
      <!-- 1. Our Solutions Dropdown (Client Sitemap: Exactly 4 Core Services) -->
      <li class="nav-item-dropdown">
        <a href="${pfx}services/index.html" class="nav-dropdown-trigger">
          <span>Services</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>
        
        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="${pfx}services/compliance-audit-return.html">Annual Compliance Audit Return Filing</a></li>
            <li><a href="${pfx}services/outsourced-dpo.html">Appoint Outsourced Certified DPO</a></li>
            <li><a href="${pfx}services/data-protection-audit.html">Data Protection Audit</a></li>
            <li><a href="${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>
            <li><a href="${pfx}services/index.html">All Services</a></li>
          </ul>
        </div>
      </li>

      <!-- 2. Our Organization (Client Sitemap: Direct Link) -->
      <li>
        <a href="${pfx}about.html">Our Organization</a>
      </li>

      <!-- 3. Knowledge Hub Dropdown -->
      <li class="nav-item-dropdown">
        <a href="${pfx}blog/index.html" class="nav-dropdown-trigger">
          <span>Knowledge Hub</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>

        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="${pfx}publication-detail.html">Complying With NDPA 2023</a></li>
            <li><a href="${pfx}blog/index.html">Regulatory Guidance</a></li>
            <li><a href="${pfx}blog/index.html">Artificial Intelligence Tracker</a></li>
            <li><a href="${pfx}blog/index.html">View All</a></li>
          </ul>
        </div>
      </li>

      <!-- 4. Contact Us (Client Sitemap: Direct Link) -->
      <li>
        <a href="${pfx}contact.html">Contact Us</a>
      </li>
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
        <!-- Our Solutions (Client Sitemap) -->
        <div>
          <div class="mobile-nav-group-title">Services</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}services/compliance-audit-return.html" onclick="toggleMobileMenu()">Annual Compliance Audit Return Filing <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}services/outsourced-dpo.html" onclick="toggleMobileMenu()">Appoint Outsourced Certified DPO <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}services/data-protection-audit.html" onclick="toggleMobileMenu()">Data Protection Audit <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}services/data-privacy-training.html" onclick="toggleMobileMenu()">Data Privacy Training <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}services/index.html" onclick="toggleMobileMenu()">All Services <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>

        <!-- Knowledge Hub -->
        <div>
          <div class="mobile-nav-group-title">Knowledge Hub</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}publication-detail.html" onclick="toggleMobileMenu()">Complying With NDPA 2023 <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}blog/index.html" onclick="toggleMobileMenu()">Regulatory Guidance <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}blog/index.html" onclick="toggleMobileMenu()">Artificial Intelligence Tracker <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
            <li><a href="${pfx}blog/index.html" onclick="toggleMobileMenu()">View All <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
          </ul>
        </div>

        <!-- Organization & Contact -->
        <div>
          <div class="mobile-nav-group-title">Organization</div>
          <ul class="mobile-nav-links">
            <li><a href="${pfx}about.html" onclick="toggleMobileMenu()">Our Organization <i class="fa-solid fa-chevron-right text-xs"></i></a></li>
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
  const existingHeader = document.querySelector('header.header');
  if (!existingHeader) {
    const mount = document.getElementById('site-header');
    if (mount) {
      mount.outerHTML = headerHTML;
    } else {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
  } else if (!document.getElementById('mobileNavOverlay')) {
    const drawerIdx = headerHTML.indexOf('<!-- 4. Responsive Mobile Slideout Drawer -->');
    if (drawerIdx !== -1) {
      document.body.insertAdjacentHTML('beforeend', headerHTML.slice(drawerIdx));
    }
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
      title: 'Our Solutions: Enterprise Data Protection Compliance',
      url: 'services/index.html',
      badge: 'Our Solutions',
      desc: 'Comprehensive data protection compliance, statutory CAR return filing, outsourced DPO services, audits, and workforce training.',
      keywords: 'our solutions services all services enterprise data protection compliance security car filing outsourced dpo audits training advisory consultants nigeria ndpa 2023 alignment align comply complying compliant'
    },
    {
      title: 'Compliance Audit Return (CAR)',
      url: 'services/compliance-audit-return.html',
      badge: 'Statutory Filing',
      desc: 'Statutory annual NDPA 2023 compliance audit return filing preparation, assurance & NDPC submission before March 15 statutory deadline.',
      keywords: 'car filing annual compliance audit return ndpc ndpa 2023 statutory deadline penalty fines licensed dpco audit rules regulations returns march 15 portal certificate assurance mandate comply complying compliant alignment align services solutions consulting consultant'
    },
    {
      title: 'Data Protection Audit & Governance',
      url: 'services/data-protection-audit.html',
      badge: 'Technical & Operational',
      desc: 'Comprehensive Article 30/31 technical, organizational & cybersecurity gap assessments, ROPA mapping, DPIAs, and breach response.',
      keywords: 'audit audits auditing assessment privacy assessment ndpa gap analysis security controls ndpc dpco audit rules regulations verification risk assessment ropa record of processing activities dpia notices cybersecurity cyber penetration testing pen test breach response 72 hours incident protocol notification hardening section 39 section 40 vulnerability policies vendor dpa contracts cookie consent telemetry technical audit comply compliance compliant alignment align services solutions consulting consultant'
    },
    {
      title: 'Data Privacy Training & Capacity Building',
      url: 'services/data-privacy-training.html',
      badge: 'Workforce & DPO',
      desc: 'Certified executive and workforce data privacy training, employee awareness modules, and advanced DPO masterclasses.',
      keywords: 'training education masterclass workforce awareness staff training ndpa certification privacy skills compliance comply compliant course elearning section 31 staff phish simulation certificate alignment align services solutions capacity building'
    },
    {
      title: 'Outsourced DPO (DPOaaS)',
      url: 'services/outsourced-dpo.html',
      badge: 'Designated Officer',
      desc: 'Accredited external Data Protection Officer statutory representation, compliance monitoring, and direct NDPC liaison.',
      keywords: 'dpo outsourced data protection officer dpoaas representation contact liaison advisory ndpa officer dcmi compliance comply compliant complying legal privacy conflict alignment align services solutions consulting consultant hire appoint'
    },
    {
      title: 'NDPA 2023 Alignment: Strategic Executive Checklist',
      url: 'publication-detail.html',
      badge: 'Executive Briefing',
      desc: 'Top 5 strategic NDPA requirements to mitigate regulatory risk, prevent statutory fines of up to 2% of annual revenue.',
      keywords: 'checklist executive ndpa 2023 alignment align aligning strategic c-suite board directors fines 2 percent lawful basis breach 72 hours dpia dpo car filing audit circulars regulations ndpa alignment strategic checklist public sector private sector executives compliance comply complying guide proactive mitigation statutory requirements article publication complying with ndpa knowledge hub'
    },
    {
      title: 'Knowledge Hub: Insights & Regulatory Guidance',
      url: 'blog/index.html',
      badge: 'Regulatory Guidance',
      desc: 'Explore legal analyses, empirical compliance checklists, and technical implementation playbooks published by licensed DPCO practitioners.',
      keywords: 'knowledge hub regulatory guidance articles publications blog insights ndpc circulars research briefings legal intelligence comply compliance regulations artificial intelligence tracker'
    },
    {
      title: 'Artificial Intelligence Tracker',
      url: 'blog/index.html#ai-tracker',
      badge: 'AI Tracker',
      desc: 'Regulatory intelligence monitoring algorithmic accountability, AI ethics, automated decision systems, and emerging privacy frameworks.',
      keywords: 'artificial intelligence tracker ai machine learning algorithms automated decisions generative ai tech governance llm compliance safety ethics knowledge hub'
    },
    {
      title: 'Our Organisation: About Amstel Consulting',
      url: 'about.html',
      badge: 'Company Profile',
      desc: 'Amstel Consulting Ltd is a premier licensed Data Protection Compliance Organisation (DPCO) bridging statutory regulations with corporate operations.',
      keywords: 'about us organisation organization amstel consulting ltd mission principles leadership integrity corporate governance profile lagos abuja values credentials team advisory board consultants alignment align comply compliance'
    },
    {
      title: 'Licensed DPCO Credentials & Statutory Authorization',
      url: 'about.html#credentials',
      badge: 'Accreditation',
      desc: 'Our Credentials as a Licensed DPCO authorized by the Nigeria Data Protection Commission (NDPC) to verify and submit statutory returns.',
      keywords: 'licensed dpco credentials authority ndpc registration certification authorization statutory compliance organization verification accreditation license licensing comply compliant'
    },
    {
      title: 'Charles Odetola — Lead Privacy & Regulatory Practice Leader',
      url: 'charles-odetola.html',
      badge: 'Leadership',
      desc: 'Data Protection, Privacy, Regulatory Compliance and Corporate Governance Specialist with over a decade of legal practice experience.',
      keywords: 'charles odetola leadership practice leader lawyer attorney privacy data protection gdpr eprivacy ndpa toms corporate governance legal risk iapp law society cmi partner team advisor consultant'
    },
    {
      title: 'Contact Practice Offices & RFP Inquiries',
      url: 'contact.html',
      badge: 'Advisory Desk',
      desc: 'Direct engagement with licensed DPCO partners, request a scoped compliance assessment, or submit an RFP within 24 hours.',
      keywords: 'contact help phone email office lagos abuja consult consultant consulting inquiry get in touch quote rfp assessment free consultation advisory desk talk to consultant initiate consultation'
    },
    {
      title: 'Corporate Privacy & Legal Statement',
      url: 'legal/privacy-statement.html',
      badge: 'Statutory Notice',
      desc: 'Official statement detailing our binding fiduciary commitments regarding collection, lawful basis, and data subject rights under NDPA 2023.',
      keywords: 'privacy statement legal rights data subject sar lawful basis gdpr ndpa fiduciary compliance terms transparency notice'
    },
    {
      title: 'Terms and Conditions of Engagement',
      url: 'terms-and-conditions.html',
      badge: 'Legal Terms',
      desc: 'Terms of engagement, client obligations, statutory filing timelines, confidentiality covenants, and limitation of liability.',
      keywords: 'terms conditions agreement legal retainer engagement liability disclaimer contract'
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
          <a href="${pfx}services/data-privacy-training.html">Data Privacy Training</a>
          <a href="${pfx}publication-detail.html">Complying With NDPA 2023</a>
          <a href="${pfx}about.html#credentials">Licensed DPCO</a>
          <a href="${pfx}contact.html">Contact Advisory Desk</a>
        </div>
      </div>
    `;
    containers.forEach(c => {
      c.innerHTML = html;
    });
  };

  window.navigateToSearchPage = function (overrideQuery) {
    const input = document.getElementById('siteSearchInput') || document.querySelector('.search-input');
    const q = (overrideQuery !== undefined ? overrideQuery : (input ? input.value : '')).trim();
    window.location.href = `${pfx}search.html?q=` + encodeURIComponent(q);
  };

  window.handleSearch = function (query) {
    const containers = document.querySelectorAll('.search-results-list, #searchResults');
    if (!containers || containers.length === 0) return;

    const q = (query || '').toLowerCase().trim();
    if (!q) {
      window.renderDefaultQuickLinks();
      return;
    }

    const safeQ = q.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });

    const itemsToSearch = (window.siteSearchIndex && window.siteSearchIndex.length > 0) ? window.siteSearchIndex : searchIndex;
    const words = q.split(/\s+/).filter(Boolean);
    const matched = itemsToSearch.filter(item => {
      if (typeof window.matchSearchItem === 'function') {
        return window.matchSearchItem(item, q);
      }
      const t = item.title ? item.title.toLowerCase() : '';
      const d = item.desc ? item.desc.toLowerCase() : '';
      const k = item.keywords ? item.keywords.toLowerCase() : '';
      const b = item.badge ? item.badge.toLowerCase() : '';
      const fullText = (t + ' ' + d + ' ' + k + ' ' + b);
      return fullText.includes(q) || (words.length > 1 && words.every(w => fullText.includes(w)));
    });

    if (matched.length === 0) {
      containers.forEach(c => {
        c.innerHTML = `
          <div style="padding: 1.75rem 1rem; text-align: center;">
            <i class="fa-solid fa-circle-question" style="font-size: 2rem; color: #cbd5e1; margin-bottom: 0.75rem; display: block;"></i>
            <p style="color: #475569; font-size: 0.95rem; margin-bottom: 0.5rem; font-weight: 500;">
              No direct matches found in preview for "<strong>${safeQ}</strong>"
            </p>
            <p style="font-size: 0.82rem; color: #94a3b8; margin-bottom: 1.25rem;">
              You can still search our full directory or contact our advisory team.
            </p>
            <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
              <button type="button" onclick="window.navigateToSearchPage('${safeQ}')" style="background: var(--pwc-orange); color: #fff; padding: 0.55rem 1.25rem; border-radius: 9999px; border: none; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
                Open Full Search Page &rarr;
              </button>
              <a href="${pfx}contact.html" style="display: inline-flex; align-items: center; gap: 0.45rem; background: #fff5ee; color: var(--pwc-orange, #d04a02); padding: 0.55rem 1.15rem; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 0.85rem; border: 1px solid #fed7aa;">
                <span>Advisory Desk</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
              </a>
            </div>
          </div>
        `;
      });
      return;
    }

    const html = `
      <!-- Top Call-to-Action to Full Search Page -->
      <a href="${pfx}search.html?q=${encodeURIComponent(q)}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.88rem; color: var(--pwc-orange, #d04a02); margin-bottom: 0.85rem; transition: background 0.15s ease;" onmouseover="this.style.background='#ffedd5'" onmouseout="this.style.background='#fff7ed'">
        <span><i class="fa-solid fa-arrow-up-right-from-square" style="margin-right: 0.45rem;"></i> View all matching results for &ldquo;${safeQ}&rdquo; in Dedicated Search Page</span>
        <i class="fa-solid fa-arrow-right"></i>
      </a>

      <div style="font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem; padding-left: 0.25rem;">
        ${matched.length} Quick Preview Result${matched.length > 1 ? 's' : ''}
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 320px; overflow-y: auto; padding-right: 0.25rem;">
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

      // Ensure search submit button exists in modal input bar
      const inputWrap = overlay.querySelector('.search-input-wrap');
      if (inputWrap && !inputWrap.querySelector('.btn-modal-search-go')) {
        const goBtn = document.createElement('button');
        goBtn.type = 'button';
        goBtn.className = 'btn-modal-search-go';
        goBtn.innerHTML = '<span>Search</span> <i class="fa-solid fa-arrow-right"></i>';
        goBtn.onclick = function (e) {
          e.preventDefault();
          window.navigateToSearchPage();
        };

        const icon = inputWrap.querySelector('i.fa-magnifying-glass');
        if (icon) {
          icon.style.cursor = 'pointer';
          icon.title = 'Click to search';
          icon.onclick = function (e) {
            e.preventDefault();
            window.navigateToSearchPage();
          };
        }

        const closeBtn = inputWrap.querySelector('.search-close-btn');
        if (closeBtn) {
          inputWrap.insertBefore(goBtn, closeBtn);
        } else {
          inputWrap.appendChild(goBtn);
        }
      }

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
        window.navigateToSearchPage();
      }
    }
  });
})();


