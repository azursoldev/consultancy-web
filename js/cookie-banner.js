/**
 * Amstel Consulting — Standardized Cookie Consent Banner & Preference Centre
 * Compliant with Nigeria Data Protection Act (NDPA) 2023 & NDPC GAID 2025.
 * Provides granular user choice: Necessary (Always active), Analytics (Optional), Marketing (Optional).
 */

(function () {
  'use strict';

  const CONSENT_KEY = 'amstel_cookie_consent';
  const isSubdir = window.location.pathname.includes('/services/') || 
                   window.location.pathname.includes('/legal/') || 
                   window.location.pathname.includes('/blog/');
  const pfx = isSubdir ? '../' : '';

  // Get current consent if exists
  function getConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    // Fallback check document.cookie
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + CONSENT_KEY + '=([^;]+)'));
    if (match) {
      try {
        return JSON.parse(decodeURIComponent(match[2]));
      } catch (e) {}
    }
    return null;
  }

  // Save consent to both localStorage and cookie (12 months validity)
  function saveConsent(data) {
    const payload = {
      necessary: true,
      analytics: !!data.analytics,
      marketing: !!data.marketing,
      timestamp: new Date().toISOString(),
      choice: data.choice || 'custom'
    };

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    } catch (e) {}

    // 12 months = 31536000 seconds
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(JSON.stringify(payload))}; Max-Age=31536000; path=/; SameSite=Lax; Secure`;

    // Apply consent changes (e.g. enable/disable telemetry)
    applyConsentState(payload);

    hideBanner();
    hidePreferencesModal();
  }

  function applyConsentState(consent) {
    window.AmstelCookieConsent = consent;
    // Dispatch custom event in case analytics or scripts want to listen
    window.dispatchEvent(new CustomEvent('amstel:cookie-consent-updated', { detail: consent }));
  }

  // Render Banner and Modal into DOM
  function injectCookieUI() {
    if (document.getElementById('amstel-cookie-banner-wrap')) return;

    const container = document.createElement('div');
    container.id = 'amstel-cookie-banner-wrap';
    container.innerHTML = `
      <!-- 1. Floating Cookie Consent Banner -->
      <div id="amstelCookieBanner" class="amstel-cookie-banner" role="region" aria-label="Cookie Privacy Choices">
        <div class="cookie-banner-inner">
          <div class="cookie-banner-text">
            <h4 class="cookie-banner-title">
              <i class="fa-solid fa-shield-halved cookie-shield-icon"></i>
              Your privacy choices
            </h4>
            <p class="cookie-banner-desc">
              We use necessary cookies to operate and secure this website. With your permission, we may also use analytics cookies to understand how visitors use the website and improve our services. You can accept all cookies, reject optional cookies or manage your preferences. You can change your choice at any time through our <a href="${pfx}cookie-policy.html" class="cookie-policy-link">Cookie Policy</a>.
            </p>
          </div>
          <div class="cookie-banner-actions">
            <button type="button" id="btnAcceptAllCookies" class="btn-cookie btn-cookie-accept">Accept all</button>
            <button type="button" id="btnRejectOptionalCookies" class="btn-cookie btn-cookie-reject">Reject optional</button>
            <button type="button" id="btnManageCookiePreferences" class="btn-cookie btn-cookie-manage">Manage preferences</button>
          </div>
        </div>
      </div>

      <!-- 2. Manage Preferences Modal Overlay -->
      <div id="amstelCookieModal" class="cookie-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle">
        <div class="cookie-modal-card">
          <div class="cookie-modal-header">
            <h3 id="cookieModalTitle" class="cookie-modal-title">Manage your cookie preferences</h3>
            <button type="button" id="btnCloseCookieModal" class="cookie-modal-close" aria-label="Close preferences">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="cookie-modal-body">
            <p class="cookie-modal-lead">
              Choose which optional cookies Amstel Consulting may use. Necessary cookies cannot be disabled because they are required for the website to function securely.
            </p>

            <div class="cookie-category-list">
              
              <!-- Category 1: Necessary -->
              <div class="cookie-category-card">
                <div class="cookie-cat-header">
                  <div class="cookie-cat-info">
                    <span class="cookie-cat-name">Necessary cookies</span>
                    <span class="cookie-badge-locked">Always active</span>
                  </div>
                </div>
                <p class="cookie-cat-desc">
                  These cookies support essential website functions, security, form operation and your privacy preferences.
                </p>
              </div>

              <!-- Category 2: Analytics -->
              <div class="cookie-category-card">
                <div class="cookie-cat-header">
                  <div class="cookie-cat-info">
                    <span class="cookie-cat-name">Analytics cookies</span>
                    <span class="cookie-badge-optional">Optional</span>
                  </div>
                  <label class="cookie-switch" aria-label="Toggle Analytics Cookies">
                    <input type="checkbox" id="toggleAnalyticsCookies">
                    <span class="cookie-slider"></span>
                  </label>
                </div>
                <p class="cookie-cat-desc">
                  These cookies help us understand how visitors use the website, including which pages are visited and whether technical problems occur. We use this information to improve the website and our services.
                </p>
              </div>

              <!-- Category 3: Marketing -->
              <div class="cookie-category-card">
                <div class="cookie-cat-header">
                  <div class="cookie-cat-info">
                    <span class="cookie-cat-name">Marketing cookies</span>
                    <span class="cookie-badge-optional">Optional</span>
                  </div>
                  <label class="cookie-switch" aria-label="Toggle Marketing Cookies">
                    <input type="checkbox" id="toggleMarketingCookies">
                    <span class="cookie-slider"></span>
                  </label>
                </div>
                <p class="cookie-cat-desc">
                  These cookies may be used to measure campaigns or provide more relevant communications. We will not activate them without your consent.
                </p>
              </div>

            </div>
          </div>

          <div class="cookie-modal-footer">
            <button type="button" id="btnSaveCookiePreferences" class="btn-cookie btn-cookie-save">Save preferences</button>
            <button type="button" id="btnModalAcceptAll" class="btn-cookie btn-cookie-accept">Accept all</button>
            <button type="button" id="btnModalRejectOptional" class="btn-cookie btn-cookie-reject">Reject optional</button>
          </div>
        </div>
      </div>

      <!-- 3. Persistent Floating Privacy Badge (Allows Reopening) -->
      <button type="button" id="amstelCookieReopenBtn" class="cookie-reopen-pill" title="Manage Cookie Preferences" aria-label="Manage Cookie Preferences">
        <i class="fa-solid fa-cookie-bite"></i>
        <span>Cookie Preferences</span>
      </button>
    `;

    document.body.appendChild(container);
    attachEvents();
  }

  function attachEvents() {
    // Banner buttons
    const btnAcceptAll = document.getElementById('btnAcceptAllCookies');
    const btnRejectOptional = document.getElementById('btnRejectOptionalCookies');
    const btnManage = document.getElementById('btnManageCookiePreferences');

    // Modal buttons
    const btnCloseModal = document.getElementById('btnCloseCookieModal');
    const btnSavePref = document.getElementById('btnSaveCookiePreferences');
    const btnModalAcceptAll = document.getElementById('btnModalAcceptAll');
    const btnModalRejectOptional = document.getElementById('btnModalRejectOptional');
    const modalOverlay = document.getElementById('amstelCookieModal');
    const reopenBtn = document.getElementById('amstelCookieReopenBtn');

    if (btnAcceptAll) {
      btnAcceptAll.addEventListener('click', () => {
        saveConsent({ analytics: true, marketing: true, choice: 'all' });
      });
    }

    if (btnRejectOptional) {
      btnRejectOptional.addEventListener('click', () => {
        saveConsent({ analytics: false, marketing: false, choice: 'rejected_optional' });
      });
    }

    if (btnManage) {
      btnManage.addEventListener('click', () => {
        showPreferencesModal();
      });
    }

    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', hidePreferencesModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hidePreferencesModal();
      });
    }

    if (btnSavePref) {
      btnSavePref.addEventListener('click', () => {
        const analytics = document.getElementById('toggleAnalyticsCookies')?.checked || false;
        const marketing = document.getElementById('toggleMarketingCookies')?.checked || false;
        saveConsent({ analytics, marketing, choice: 'custom' });
      });
    }

    if (btnModalAcceptAll) {
      btnModalAcceptAll.addEventListener('click', () => {
        saveConsent({ analytics: true, marketing: true, choice: 'all' });
      });
    }

    if (btnModalRejectOptional) {
      btnModalRejectOptional.addEventListener('click', () => {
        saveConsent({ analytics: false, marketing: false, choice: 'rejected_optional' });
      });
    }

    if (reopenBtn) {
      reopenBtn.addEventListener('click', () => {
        showPreferencesModal();
      });
    }

    // Keyboard ESC to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        hidePreferencesModal();
      }
    });
  }

  function showBanner() {
    const banner = document.getElementById('amstelCookieBanner');
    if (banner) {
      banner.classList.add('active');
    }
  }

  function hideBanner() {
    const banner = document.getElementById('amstelCookieBanner');
    if (banner) {
      banner.classList.remove('active');
    }
  }

  function showPreferencesModal() {
    const modal = document.getElementById('amstelCookieModal');
    const current = getConsent() || { analytics: false, marketing: false };
    
    const toggleA = document.getElementById('toggleAnalyticsCookies');
    const toggleM = document.getElementById('toggleMarketingCookies');

    if (toggleA) toggleA.checked = !!current.analytics;
    if (toggleM) toggleM.checked = !!current.marketing;

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function hidePreferencesModal() {
    const modal = document.getElementById('amstelCookieModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Global helper to trigger modal from footer link
  window.openCookiePreferences = function () {
    showPreferencesModal();
  };

  // Init on DOM ready
  function init() {
    injectCookieUI();
    const consent = getConsent();
    if (!consent) {
      // User has not made a choice yet: display banner after a brief micro-delay
      setTimeout(showBanner, 600);
    } else {
      applyConsentState(consent);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
