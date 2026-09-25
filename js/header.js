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
        <a href="javascript:void(0)" class="nav-dropdown-trigger">
          <span>Services</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>
        
        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="${pfx}services/compliance-audit-return.html">Annual Compliance Audit Return Filing</a></li>
            <li><a href="${pfx}services/outsourced-dpo.html">Appoint Outsourced Certified DPO</a></li>
            <li><a href="${pfx}services/data-protection-audit.html">Data Protection Audit</a></li>
            <li><a href="${pfx}services/data-privacy-training.html">Data Privacy Training</a></li>
            <li><a href="${pfx}services/vapt-services.html">VAPT Services</a></li>
            <li><a href="${pfx}services/index.html">View All</a></li>
          </ul>
        </div>
      </li>

      <!-- 2. Our Organisation Dropdown (Dropdown with direct link to about.html) -->
      <li class="nav-item-dropdown">
        <a href="javascript:void(0)" class="nav-dropdown-trigger">
          <span>Our Organisation</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>
        
        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="${pfx}about.html">About Us</a></li>
            <li><a href="${pfx}licensed-dpco-status.html">Licensed DPCO Status</a></li>
            <li><a href="${pfx}team.html">Team &amp; Advisory Board</a></li>
            <li><a href="${pfx}careers.html">Career &amp; Partnerships</a></li>
          </ul>
        </div>
      </li>

      <!-- 3. Knowledge Hub Dropdown -->
      <li class="nav-item-dropdown">
        <a href="javascript:void(0)" class="nav-dropdown-trigger">
          <span>Knowledge Hub</span>
          <i class="fa-solid fa-chevron-down nav-chevron"></i>
        </a>

        <div class="simple-dropdown-menu">
          <ul class="simple-dropdown-list">
            <li><a href="${pfx}publication-detail.html">Complying With NDPA 2023</a></li>
            <li><a href="${pfx}regulatory-guidance.html">Regulatory Guidance</a></li>
            <li><a href="${pfx}ai-regulatory-tracker.html">Artificial Intelligence Tracker</a></li>
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
        <nav class="mobile-nav-menu">
          <!-- 1. Services Dropdown -->
          <div class="mobile-nav-item has-dropdown">
            <button type="button" class="mobile-nav-trigger" onclick="toggleMobileDropdown(this)" aria-expanded="false">
              <span>Services</span>
              <i class="fa-solid fa-chevron-down mobile-nav-chevron"></i>
            </button>
            <div class="mobile-submenu">
              <ul class="mobile-submenu-list">
                <li><a href="${pfx}services/compliance-audit-return.html" onclick="toggleMobileMenu()">Annual Compliance Audit Return Filing</a></li>
                <li><a href="${pfx}services/outsourced-dpo.html" onclick="toggleMobileMenu()">Appoint Outsourced Certified DPO</a></li>
                <li><a href="${pfx}services/data-protection-audit.html" onclick="toggleMobileMenu()">Data Protection Audit</a></li>
                <li><a href="${pfx}services/data-privacy-training.html" onclick="toggleMobileMenu()">Data Privacy Training</a></li>
                <li><a href="${pfx}services/vapt-services.html" onclick="toggleMobileMenu()">VAPT Services</a></li>
                <li><a href="${pfx}services/index.html" onclick="toggleMobileMenu()">View All</a></li>
              </ul>
            </div>
          </div>

          <!-- 2. Our Organisation Dropdown -->
          <div class="mobile-nav-item has-dropdown">
            <button type="button" class="mobile-nav-trigger" onclick="toggleMobileDropdown(this)" aria-expanded="false">
              <span>Our Organisation</span>
              <i class="fa-solid fa-chevron-down mobile-nav-chevron"></i>
            </button>
            <div class="mobile-submenu">
              <ul class="mobile-submenu-list">
                <li><a href="${pfx}about.html" onclick="toggleMobileMenu()">About Us</a></li>
                <li><a href="${pfx}licensed-dpco-status.html" onclick="toggleMobileMenu()">Licensed DPCO Status</a></li>
                <li><a href="${pfx}team.html" onclick="toggleMobileMenu()">Team &amp; Advisory Board</a></li>
                <li><a href="${pfx}careers.html" onclick="toggleMobileMenu()">Career &amp; Partnerships</a></li>
              </ul>
            </div>
          </div>

          <!-- 3. Knowledge Hub Dropdown -->
          <div class="mobile-nav-item has-dropdown">
            <button type="button" class="mobile-nav-trigger" onclick="toggleMobileDropdown(this)" aria-expanded="false">
              <span>Knowledge Hub</span>
              <i class="fa-solid fa-chevron-down mobile-nav-chevron"></i>
            </button>
            <div class="mobile-submenu">
              <ul class="mobile-submenu-list">
                <li><a href="${pfx}publication-detail.html" onclick="toggleMobileMenu()">Complying With NDPA 2023</a></li>
                <li><a href="${pfx}regulatory-guidance.html" onclick="toggleMobileMenu()">Regulatory Guidance</a></li>
                <li><a href="${pfx}ai-regulatory-tracker.html" onclick="toggleMobileMenu()">Artificial Intelligence Tracker</a></li>
                <li><a href="${pfx}blog/index.html" onclick="toggleMobileMenu()">View All</a></li>
              </ul>
            </div>
          </div>

          <!-- 4. Contact Us (Direct Link) -->
          <div class="mobile-nav-item">
            <a href="${pfx}contact.html" class="mobile-nav-trigger mobile-nav-direct-link" onclick="toggleMobileMenu()">
              <span>Contact Us</span>
            </a>
          </div>
        </nav>
      </div>
      <div class="mobile-drawer-footer">
        <a href="${pfx}services/compliance-audit-return.html" onclick="toggleMobileMenu()" class="btn-mobile-car">
          <span>FILE YOUR CAR</span>
        </a>
      </div>
    </div>
  </div>

  <!-- 5. Universal Site Search Modal (Available on every page) -->
  <div id="siteSearchModal" class="search-modal-overlay" onclick="if(event.target===this) window.closeSiteSearchModal()">
    <div class="search-modal-card">
      <div class="search-input-wrap">
        <i class="fa-solid fa-magnifying-glass" onclick="window.navigateToSearchPage()" style="cursor: pointer;" title="Search"></i>
        <input type="text" id="siteSearchInput" class="search-input" placeholder="Search services, NDPA regulations, DPCO audit rules, DPO..." autocomplete="off">
        <button type="button" class="btn-modal-search-go" onclick="window.navigateToSearchPage()">
          <span>Search</span>
        </button>
        <button type="button" onclick="window.closeSiteSearchModal()" class="search-close-btn" aria-label="Close search">&times;</button>
      </div>
      <div id="searchResults" class="search-results-list"></div>
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
  } else {
    if (!document.getElementById('mobileNavOverlay')) {
      const drawerIdx = headerHTML.indexOf('<!-- 4. Responsive Mobile Slideout Drawer -->');
      if (drawerIdx !== -1) {
        document.body.insertAdjacentHTML('beforeend', headerHTML.slice(drawerIdx));
      }
    }
    if (!document.getElementById('siteSearchModal') && !document.getElementById('searchModalOverlay')) {
      const modalIdx = headerHTML.indexOf('<!-- 5. Universal Site Search Modal');
      if (modalIdx !== -1) {
        document.body.insertAdjacentHTML('beforeend', headerHTML.slice(modalIdx));
      }
    }
  }

  // Interactive Logic: Mobile Drawer
  window.toggleMobileMenu = function () {
    const overlay = document.getElementById('mobileNavOverlay');
    if (overlay) {
      const willOpen = !overlay.classList.contains('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = willOpen ? 'hidden' : '';
    }
  };

  // Interactive Logic: Mobile Dropdown Accordion
  window.toggleMobileDropdown = function (button) {
    const parent = button.closest('.mobile-nav-item');
    if (!parent) return;
    const wasOpen = parent.classList.contains('open');

    // Close any other open dropdowns for smooth accordion feel
    document.querySelectorAll('.mobile-nav-item.has-dropdown').forEach(function (item) {
      if (item !== parent) {
        item.classList.remove('open');
        const trigger = item.querySelector('.mobile-nav-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });

    if (wasOpen) {
      parent.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    } else {
      parent.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
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
      desc: 'Comprehensive Article 30/31 technical, organisational & cybersecurity gap assessments, ROPA mapping, DPIAs, and breach response.',
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
      title: 'VAPT Services (Vulnerability Assessment & Penetration Testing)',
      url: 'services/vapt-services.html',
      badge: 'Cybersecurity',
      desc: 'Specialist-led Vulnerability Assessment and Penetration Testing for web applications, mobile applications, APIs, network infrastructure, and cloud environments.',
      keywords: 'vapt vulnerability assessment penetration testing pentest security testing web application mobile app api network cloud owasp remediation infrastructure cyber'
    },
    {
      title: 'NDPA 2023 Alignment: Strategic Executive Checklist',
      url: 'publication-detail.html',
      badge: 'Executive Briefing',
      desc: 'Top 5 strategic NDPA requirements to mitigate regulatory risk, prevent statutory fines of up to 2% of annual revenue.',
      keywords: 'checklist executive ndpa 2023 alignment align aligning strategic c-suite board directors fines 2 percent lawful basis breach 72 hours dpia dpo car filing audit circulars regulations ndpa alignment strategic checklist public sector private sector executives compliance comply complying guide proactive mitigation statutory requirements article publication complying with ndpa knowledge hub'
    },
    {
      title: 'Regulatory Guidance — Practical Explanations & Compliance Center',
      url: 'regulatory-guidance.html',
      badge: 'Regulatory Guidance',
      desc: 'Practical regulatory explanations under the Nigeria Data Protection Act 2023 covering CAR filings, DPO duties, DPIAs, breach management, and vendor oversight.',
      keywords: 'knowledge hub regulatory guidance articles publications insights ndpc circulars research briefings legal intelligence comply compliance regulations major importance car dpo dpia breach cross border'
    },
    {
      title: 'Must a Data Protection Officer Be Nigerian? Examining the NDPC’s NIN Requirement',
      url: 'must-a-data-protection-officer-be-nigerian.html',
      badge: 'Regulatory Analysis',
      desc: 'Examining whether a Data Protection Officer must be a Nigerian citizen or resident under the NDPA 2023 and the NDPC NIN requirement for DPCO licensing.',
      keywords: 'dpo nigerian nin requirement ndpc national identification number dpco licence application data protection officer citizenship residency foreign dpo section 32 section 33'
    },
    {
      title: 'Artificial Intelligence Regulatory Tracker',
      url: 'ai-regulatory-tracker.html',
      badge: 'AI Tracker',
      desc: 'Monitoring AI governance, legislation, automated decision-making policies, and algorithmic accountability across Nigeria, Africa, and international markets.',
      keywords: 'artificial intelligence tracker ai machine learning algorithms automated decisions generative ai tech governance llm compliance safety ethics knowledge hub regulatory tracker'
    },
    {
      title: 'Our Organisation: About Amstel Consulting',
      url: 'about.html',
      badge: 'Company Profile',
      desc: 'Amstel Consulting Ltd is a premier licensed Data Protection Compliance Organisation (DPCO) bridging statutory regulations with corporate operations.',
      keywords: 'about us organisation amstel consulting ltd mission principles leadership integrity corporate governance profile lagos abuja values credentials team advisory board consultants alignment align comply compliance'
    },
    {
      title: 'Licensed DPCO Credentials & Statutory Authorisation',
      url: 'about.html#credentials',
      badge: 'Accreditation',
      desc: 'Our Credentials as a Licensed DPCO authorised by the Nigeria Data Protection Commission (NDPC) to verify and submit statutory returns.',
      keywords: 'licensed dpco credentials authority ndpc registration certification authorisation statutory compliance organisation verification accreditation licence licensing comply compliant status'
    },
    {
      title: 'Team & Advisory Board — Senior Compliance Consultants',
      url: 'team.html',
      badge: 'Advisory Board',
      desc: 'Multidisciplinary Advisory Board and senior consultants delivering boardroom-level privacy, regulatory, and cybersecurity guidance.',
      keywords: 'team advisory board leadership senior compliance consultants specialists charles odetola martha jowah esther samson femi leslie subhash desai oluwatosin reis oluwabukola olasehinde slav nakov our organisation'
    },
    {
      title: 'Career & Strategic Advisory Partnerships',
      url: 'careers.html',
      badge: 'Partnership',
      desc: 'Partner with Amstel Consulting or explore careers in data protection compliance, statutory audit return filing, and cybersecurity advisory.',
      keywords: 'career partnerships partner advisory partnership join jobs team hiring strategic alliance collaborate contact alignment our organisation'
    },
    {
      title: 'Charles Odetola, LLM, CIPP/E — International Privacy Consultant',
      url: 'charles-odetola.html',
      badge: 'Leadership',
      desc: 'International Privacy Consultant specialising in data protection, GDPR, NDPA compliance, and corporate governance with over a decade of legal practice experience.',
      keywords: 'charles odetola llm cipp e international privacy consultant lawyer attorney privacy data protection gdpr eprivacy ndpa toms corporate governance legal risk iapp law society cmi partner team advisor'
    },
    {
      title: 'Martha Jowah, Esq — Head of Legal & Privacy Compliance',
      url: 'martha-jowah.html',
      badge: 'Leadership',
      desc: 'Accomplished legal practitioner specialising in corporate and regulatory compliance, data protection and privacy, and contract management.',
      keywords: 'martha jowah esq head of legal privacy compliance corporate regulatory contract management risk management legal practitioner lawyer attorney partner team advisor consultant'
    },
    {
      title: 'Esmee de Jong — Advisory Board Member (International Expansion, Media & Communications)',
      url: 'esmee-de-jong.html',
      badge: 'Advisory Board',
      desc: 'Creative entrepreneur and communications specialist advising on international expansion, audience engagement, storytelling, and corporate training design.',
      keywords: 'esmee de jong advisory board member international expansion media communications netherlands creative entrepreneurship training awareness storytelling partner team advisor'
    },
    {
      title: 'Subhash Desai — Senior Advisory Board Member (Enterprise Risk & Governance)',
      url: 'subhash-desai.html',
      badge: 'Advisory Board',
      desc: 'Senior risk executive with over 25 years experience leading enterprise risk, governance, and operational resilience across international markets.',
      keywords: 'subhash desai senior advisory board member enterprise risk governance operational resilience london internal controls business continuity'
    },
    {
      title: 'Oluwatosin Reis — Advisory Board Member (Global Privacy & Data Governance)',
      url: 'oluwatosin-reis.html',
      badge: 'Advisory Board',
      desc: 'Dual-qualified lawyer and international privacy professional managing privacy programmes across Canada, India, the US, and Denmark.',
      keywords: 'oluwatosin reis advisory board global privacy data governance international cross-border compliance canada ontario tecsys'
    },
    {
      title: 'Esther Samson — Data Privacy Training Consultant',
      url: 'esther-samson.html',
      badge: 'Leadership',
      desc: 'Data Privacy Training Consultant drawing on banking sector expertise to deliver practical employee privacy awareness and customer-data training.',
      keywords: 'esther samson data privacy training consultant banking uba fcmb kyc customer service employee education'
    },
    {
      title: 'Femi Leslie — IT Network & Infrastructure Consultant',
      url: 'femi-leslie.html',
      badge: 'Leadership',
      desc: 'IT Network Operator and infrastructure consultant connecting data protection requirements with technical controls, access management, and network security.',
      keywords: 'femi leslie it network infrastructure consultant network security access management technical troubleshooting'
    },
    {
      title: 'Oluwabukola C. Olasehinde — Cybersecurity & VAPT Consultant',
      url: 'oluwabukola-olasehinde.html',
      badge: 'Leadership',
      desc: 'Cybersecurity professional specialising in vulnerability assessment, penetration testing (VAPT), OWASP testing, and web-application security.',
      keywords: 'oluwabukola olasehinde cybersecurity vapt penetration testing owasp web application api vulnerability testing'
    },
    {
      title: 'Slav Nakov, LL.M. — Senior Advisory Board Member',
      url: 'slav-nakov.html',
      badge: 'Advisory Board',
      desc: 'Senior international expert in privacy, regulatory compliance, corporate governance, and digital business.',
      keywords: 'slav nakov senior advisory board member compliance international governance'
    },
    {
      title: 'Contact Practice Offices & RFP Enquiries',
      url: 'contact.html',
      badge: 'Advisory Desk',
      desc: 'Direct engagement with licensed DPCO partners, request a scoped compliance assessment, or submit an RFP within 4 business hours.',
      keywords: 'contact help phone email office lagos abuja consult consultant consulting enquiry get in touch quote rfp assessment free consultation advisory desk talk to consultant initiate consultation'
    },
    {
      title: 'Corporate Privacy & Legal Statement',
      url: 'legal/privacy-statement.html',
      badge: 'Statutory Notice',
      desc: 'Official statement detailing our binding fiduciary commitments regarding collection, lawful basis, and data subject rights under NDPA 2023.',
      keywords: 'privacy statement legal rights data subject sar lawful basis gdpr ndpa fiduciary compliance terms transparency notice'
    },
    {
      title: 'Terms of Service',
      url: 'terms-of-service.html',
      badge: 'Legal Terms',
      desc: 'Official Terms of Service for Amstel Tech Compliance and Consulting Limited. Governing website access, DPCO services, outsourced DPO, compliance audits, and professional advisory.',
      keywords: 'terms of service terms and conditions agreement legal retainer engagement liability disclaimer contract dpco dpo amstel tech compliance'
    },
    {
      title: 'Legal Disclaimer',
      url: 'legal-disclaimer.html',
      badge: 'Legal Terms',
      desc: 'Official Legal Disclaimer of Amstel Tech Compliance and Consulting Ltd. Regulatory guidance, DPCO advisory remit, professional engagement boundaries, and liability limitations.',
      keywords: 'legal disclaimer regulatory advisory no legal advice liability warranty terms engagement amstel consulting ndpc ndpa'
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
          <a href="${pfx}services/vapt-services.html">VAPT Services</a>
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
                Open Full Search Page
              </button>
              <a href="${pfx}contact.html" style="display: inline-flex; align-items: center; gap: 0.45rem; background: #fff5ee; color: var(--pwc-orange, #d04a02); padding: 0.55rem 1.15rem; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 0.85rem; border: 1px solid #fed7aa;">
                <span>Advisory Desk</span>
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
    let overlay = document.getElementById('siteSearchModal') || document.getElementById('searchModalOverlay');
    if (!overlay) {
      const modalDiv = document.createElement('div');
      modalDiv.id = 'siteSearchModal';
      modalDiv.className = 'search-modal-overlay';
      modalDiv.onclick = function (e) { if (e.target === this) window.closeSiteSearchModal(); };
      modalDiv.innerHTML = `
        <div class="search-modal-card">
          <div class="search-input-wrap">
            <i class="fa-solid fa-magnifying-glass" onclick="window.navigateToSearchPage()" style="cursor: pointer;" title="Search"></i>
            <input type="text" id="siteSearchInput" class="search-input" placeholder="Search services, NDPA regulations, DPCO audit rules, DPO..." autocomplete="off">
            <button type="button" class="btn-modal-search-go" onclick="window.navigateToSearchPage()">
              <span>Search</span>
            </button>
            <button type="button" onclick="window.closeSiteSearchModal()" class="search-close-btn" aria-label="Close search">&times;</button>
          </div>
          <div id="searchResults" class="search-results-list"></div>
        </div>
      `;
      document.body.appendChild(modalDiv);
      overlay = modalDiv;
    }

    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Ensure search submit button exists in modal input bar
      const inputWrap = overlay.querySelector('.search-input-wrap');
      if (inputWrap && !inputWrap.querySelector('.btn-modal-search-go')) {
        const goBtn = document.createElement('button');
        goBtn.type = 'button';
        goBtn.className = 'btn-modal-search-go';
        goBtn.innerHTML = '<span>Search</span>';
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
    const overlays = document.querySelectorAll('.search-modal-overlay, #siteSearchModal');
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


