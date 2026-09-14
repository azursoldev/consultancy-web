/**
 * Amstel Consulting — Dynamic & Conditional Compliance Form Component
 * Implements the client's 12 September specification (Pages 10, 11, 12, 13)
 * Handles contextual fields, pre-selection, and pop-up modal UX.
 */

(function () {
  'use strict';

  // Helper to determine the current page type
  function detectFormType(container) {
    if (container.dataset.formType) {
      return container.dataset.formType;
    }
    const path = window.location.pathname.toLowerCase();
    if (path.includes('car') || path.includes('compliance-audit-return')) return 'car';
    if (path.includes('audit') || path.includes('data-protection-audit')) return 'audit';
    if (path.includes('dpo') || path.includes('outsourced-dpo')) return 'dpo';
    if (path.includes('contact')) return 'contact';
    if (path.includes('about') || path.includes('organisation')) return 'about';
    return 'general';
  }

  // Generate form HTML based on context
  function generateFormHTML(type, isModal = false) {
    let formTitle = 'Appoint Your DPO Team';
    let formSubtitle = 'Fill out the form below to map out a tailored, fixed-fee DPCO architecture';
    let ctaText = 'Initiate Secure Consultation ➔';
    let showRadios = false;
    let prechecked = '';
    let showMessage = false;

    if (type === 'car') {
      formTitle = 'Initiate Your CAR Filing';
      formSubtitle = 'Connect with an NDPC-licensed DPCO lead auditor within 24 hours to secure your filing certificate.';
      ctaText = 'Initiate CAR Filing Support Now ➔';
      showRadios = true;
      prechecked = 'car';
    } else if (type === 'audit') {
      formTitle = 'Request Data Protection Audit';
      formSubtitle = 'Uncover compliance vulnerabilities and receive a tailored audit proposal within 24 hours.';
      ctaText = 'Request Data Protection Audit ➔';
      showRadios = true;
      prechecked = 'audit';
    } else if (type === 'dpo') {
      formTitle = 'Appoint Your DPO Team';
      formSubtitle = 'Fill out the form below to map out a tailored, fixed-fee DPCO architecture.';
      ctaText = 'Appoint Your Certified Outsourced DPO ➔';
      showRadios = false;
      prechecked = 'dpo';
    } else if (type === 'training') {
      formTitle = 'Request Corporate Training';
      formSubtitle = 'Empower your leadership and staff with certified NDPA data privacy training programs.';
      ctaText = 'Request Data Privacy Training ➔';
      showRadios = false;
      prechecked = 'training';
    } else if (type === 'readiness') {
      formTitle = 'Schedule NDPA Readiness Assessment';
      formSubtitle = 'Identify and close your NDPA 2023 compliance gaps with licensed DPCO experts.';
      ctaText = 'Book NDPA Readiness Assessment ➔';
      showRadios = true;
      showMessage = true;
      prechecked = 'readiness';
    } else if (type === 'contact') {
      formTitle = 'Initiate Corporate Scoping';
      formSubtitle = 'Direct channel to our senior data privacy partners. Response within 2 business hours.';
      ctaText = 'Initiate Secure Consultation ➔';
      showMessage = true;
      prechecked = 'dpo';
    } else if (type === 'about' || isModal) {
      formTitle = 'Speak with an Advisory Consultant';
      formSubtitle = 'Our senior partners provide boardroom-level guidance and rapid incident support.';
      ctaText = 'Submit Consultation Request ➔';
      showMessage = true;
      prechecked = 'dpo'; // Yellow highlight: About Us modal automatically pre-checks DPO option!
    }

    return `
      <form class="compliance-dynamic-form" onsubmit="window.handleComplianceSubmit(event, this)">
        <div class="compliance-form-body">
          
          <!-- Universal Field 1: Full Name -->
          <div class="form-field-wrap">
            <label class="form-field-label">Full Name <span class="req">*</span></label>
            <input type="text" name="fullName" class="compliance-input" placeholder="e.g. Tunde Adeyemi" required>
          </div>

          <!-- Universal Field 2: Work Email -->
          <div class="form-field-wrap">
            <label class="form-field-label">Work Email Address <span class="req">*</span></label>
            <input type="email" name="email" class="compliance-input" placeholder="tunde@organization.ng" required>
          </div>

          <!-- Universal Field 3: Company Name & Industry -->
          <div class="form-field-wrap">
            <label class="form-field-label">Company Name &amp; Industry <span class="req">*</span></label>
            <input type="text" name="company" class="compliance-input" placeholder="e.g. Apex FinTech PLC (Banking & Finance)" required>
          </div>

          <!-- Universal Field 4: Direct Phone / WhatsApp (Optional) -->
          <div class="form-field-wrap">
            <label class="form-field-label">Phone Number / WhatsApp <span class="opt">(Optional)</span></label>
            <input type="tel" name="phone" class="compliance-input" placeholder="+234 (0) 803 000 0000">
          </div>

          <!-- Contextual Field 5: Estimated Records (Radio Buttons for CAR, Audit, & Readiness) -->
          ${showRadios ? `
          <div class="form-field-wrap">
            <label class="form-field-label">Estimated Customer / Employee Count <span class="req">*</span></label>
            <div class="form-radio-options">
              <label class="form-radio-label">
                <input type="radio" name="recordCount" value="micro" required>
                <span>Micro (&lt; 1,000 records)</span>
              </label>
              <label class="form-radio-label selected">
                <input type="radio" name="recordCount" value="midmarket" checked required>
                <span>Mid-Market (1,000 – 5,000 records)</span>
              </label>
              <label class="form-radio-label">
                <input type="radio" name="recordCount" value="enterprise" required>
                <span>Enterprise (5,000+ records)</span>
              </label>
            </div>
          </div>
          ` : ''}

          <!-- Contextual Field 6: Compliance Objectives (Tickboxes with Pre-selection) -->
          <div class="form-field-wrap">
            <label class="form-field-label">Compliance Objectives <span class="opt">(Select all that apply)</span></label>
            <div class="form-checkbox-options">
              <label class="form-checkbox-label ${prechecked === 'readiness' ? 'pre-selected' : ''}">
                <input type="checkbox" name="objectives" value="readiness" ${prechecked === 'readiness' ? 'checked' : ''}>
                <span>NDPA 2023 Readiness Assessment &amp; Gap Analysis</span>
              </label>
              <label class="form-checkbox-label ${prechecked === 'car' ? 'pre-selected' : ''}">
                <input type="checkbox" name="objectives" value="car" ${prechecked === 'car' ? 'checked' : ''}>
                <span>File annual Compliance Audit Return (CAR)</span>
              </label>
              <label class="form-checkbox-label ${prechecked === 'dpo' ? 'pre-selected' : ''}">
                <input type="checkbox" name="objectives" value="dpo" ${prechecked === 'dpo' ? 'checked' : ''}>
                <span>Appoint Outsourced Certified DPO</span>
              </label>
              <label class="form-checkbox-label ${prechecked === 'audit' ? 'pre-selected' : ''}">
                <input type="checkbox" name="objectives" value="audit" ${prechecked === 'audit' ? 'checked' : ''}>
                <span>Data Protection Audit (ROPA, DPIA, &amp; Privacy Notices)</span>
              </label>
              <label class="form-checkbox-label ${prechecked === 'training' ? 'pre-selected' : ''}">
                <input type="checkbox" name="objectives" value="training" ${prechecked === 'training' ? 'checked' : ''}>
                <span>Data Privacy Training &amp; Capacity Building</span>
              </label>
              <label class="form-checkbox-label">
                <input type="checkbox" name="objectives" value="general">
                <span>General Corporate Inquiry / Partnership</span>
              </label>
            </div>
          </div>

          <!-- Message Box (Contact page and About modal) -->
          ${showMessage ? `
          <div class="form-field-wrap">
            <label class="form-field-label">Message / Project Scope <span class="opt">(Optional)</span></label>
            <textarea name="message" class="compliance-textarea" placeholder="Briefly describe your current timeline or business goals..."></textarea>
          </div>
          ` : ''}

          <!-- Submit CTA Button -->
          <button type="submit" class="btn-compliance-submit">
            <span>${ctaText}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>

          <div class="form-guarantee-note">
            <i class="fa-solid fa-shield-halved"></i>
            <span>NDA Protected &bull; Licensed DPCO Verification Desk</span>
          </div>

        </div>
      </form>
    `;
  }

  // Global submission handler
  window.handleComplianceSubmit = function (e, form) {
    e.preventDefault();
    const btn = form.querySelector('.btn-compliance-submit');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Securing Consultation...</span>';
    btn.disabled = true;

    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem;">
          <div style="width: 56px; height: 56px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1.2rem;">
            <i class="fa-solid fa-check"></i>
          </div>
          <h3 style="font-family: var(--font-sans); font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Request Successfully Received</h3>
          <p style="font-size: 0.92rem; color: #475569; line-height: 1.6; max-width: 360px; margin: 0 auto 1.5rem;">
            Thank you. Your compliance parameters have been assigned to an NDPC-licensed DPCO lead auditor. We will contact you within 2 business hours.
          </p>
          <button type="button" class="btn-pwc-orange" onclick="window.location.reload()" style="font-size: 0.88rem; padding: 0.6rem 1.4rem;">Submit Another Inquiry</button>
        </div>
      `;

      // If inside a modal, auto close after 3.5 seconds
      const modalOverlay = form.closest('.compliance-modal-overlay');
      if (modalOverlay) {
        setTimeout(() => {
          modalOverlay.classList.remove('active');
        }, 3500);
      }
    }, 700);
  };

  // Mount all dynamic form containers on DOM ready
  function initDynamicForms() {
    // 1. In-page cards
    document.querySelectorAll('.dynamic-compliance-form-slot').forEach(slot => {
      const type = detectFormType(slot);
      slot.innerHTML = generateFormHTML(type, false);

      // Add radio selection styling handlers
      slot.querySelectorAll('.form-radio-label input').forEach(radio => {
        radio.addEventListener('change', function () {
          slot.querySelectorAll('.form-radio-label').forEach(l => l.classList.remove('selected'));
          if (this.checked) this.closest('.form-radio-label').classList.add('selected');
        });
      });

      // Add checkbox selection styling handlers
      slot.querySelectorAll('.form-checkbox-label input').forEach(cb => {
        cb.addEventListener('change', function () {
          if (this.checked) {
            this.closest('.form-checkbox-label').classList.add('pre-selected');
          } else {
            this.closest('.form-checkbox-label').classList.remove('pre-selected');
          }
        });
      });
    });

    // 2. Set up Pop-Up Modal Route (Elite UX)
    setupComplianceModal();
  }

  // Pop-Up Modal Setup
  function setupComplianceModal() {
    let modalOverlay = document.getElementById('complianceModalOverlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'complianceModalOverlay';
      modalOverlay.className = 'compliance-modal-overlay';
      modalOverlay.innerHTML = `
        <div class="compliance-modal-container">
          <button class="modal-close-btn" onclick="window.closeComplianceModal()" aria-label="Close modal">&times;</button>
          <div class="modal-header">
            <span class="compliance-form-badge">Confidential Consultation</span>
            <h3>Speak with an Advisory Consultant</h3>
            <p>Connect with our senior data privacy lawyers and cybersecurity engineers.</p>
          </div>
          <div id="modalFormContainer"></div>
        </div>
      `;
      document.body.appendChild(modalOverlay);

      // Click outside to close
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          window.closeComplianceModal();
        }
      });

      // Escape key to close
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          window.closeComplianceModal();
        }
      });
    }

    // Modal API
    window.openComplianceModal = function (precheckOption = 'dpo') {
      const formContainer = document.getElementById('modalFormContainer');
      const badgeEl = modalOverlay.querySelector('.compliance-form-badge');
      const titleEl = modalOverlay.querySelector('.modal-header h3');
      const subEl = modalOverlay.querySelector('.modal-header p');

      if (precheckOption === 'readiness') {
        if (badgeEl) badgeEl.textContent = 'NDPA 2023 Readiness Assessment';
        if (titleEl) titleEl.textContent = 'Schedule an NDPA Readiness Assessment';
        if (subEl) subEl.textContent = 'Connect with our accredited DPCO directors to identify and close your compliance gaps.';
      } else if (precheckOption === 'pia' || precheckOption === 'audit') {
        if (badgeEl) badgeEl.textContent = 'Privacy Impact Assessment';
        if (titleEl) titleEl.textContent = 'Request a Privacy Impact Assessment';
        if (subEl) subEl.textContent = 'Uncover compliance vulnerabilities and receive a tailored gap assessment within 24 hours.';
      } else if (precheckOption === 'car') {
        if (badgeEl) badgeEl.textContent = 'Statutory DPCO Filing';
        if (titleEl) titleEl.textContent = 'Initiate CAR Filing Support';
        if (subEl) subEl.textContent = 'Connect with an NDPC-licensed DPCO lead auditor within 24 hours to secure your filing certificate.';
      } else {
        if (badgeEl) badgeEl.textContent = 'Confidential Consultation';
        if (titleEl) titleEl.textContent = 'Speak with an Advisory Consultant';
        if (subEl) subEl.textContent = 'Connect with our senior data privacy lawyers and cybersecurity engineers.';
      }

      if (formContainer) {
        const formType = precheckOption === 'readiness' ? 'readiness' : 'about';
        formContainer.innerHTML = generateFormHTML(formType, true);

        // Pre-selection logic (map pia -> audit)
        const targetValue = precheckOption === 'pia' ? 'audit' : precheckOption;
        if (targetValue) {
          // Uncheck all first
          formContainer.querySelectorAll('input[name="objectives"]').forEach(cb => {
            cb.checked = false;
            cb.closest('.form-checkbox-label')?.classList.remove('pre-selected');
          });
          const targetCb = formContainer.querySelector(`input[name="objectives"][value="${targetValue}"]`);
          if (targetCb) {
            targetCb.checked = true;
            targetCb.closest('.form-checkbox-label')?.classList.add('pre-selected');
          }
        }

        // Contextual CTA button text
        const submitBtnSpan = formContainer.querySelector('.btn-compliance-submit span');
        if (submitBtnSpan) {
          if (precheckOption === 'pia') {
            submitBtnSpan.textContent = 'Request Free Privacy Impact Assessment ➔';
          } else if (precheckOption === 'car') {
            submitBtnSpan.textContent = 'Initiate CAR Filing Support ➔';
          } else if (precheckOption === 'general') {
            submitBtnSpan.textContent = 'Initiate Secure Consultation ➔';
          }
        }
      }
      modalOverlay.classList.add('active');
    };

    window.closeComplianceModal = function () {
      modalOverlay.classList.remove('active');
    };

    // Attach delegated click listener for all CTA modal triggers (including inline links & buttons)
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-open-modal="compliance"]');
      if (btn) {
        e.preventDefault();
        const precheck = btn.dataset.precheck || 'dpo';
        window.openComplianceModal(precheck);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicForms);
  } else {
    initDynamicForms();
  }
})();
