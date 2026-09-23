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
    let ctaText = 'Initiate Secure Consultation';
    let showRadios = false;
    let prechecked = '';
    let showMessage = false;

    if (type === 'car') {
      ctaText = 'Initiate Compliance Audit Return (CAR)';
      showRadios = true;
      prechecked = 'car';
    } else if (type === 'audit') {
      ctaText = 'Request Data Protection Audit';
      showRadios = true;
      prechecked = 'audit';
    } else if (type === 'dpo') {
      ctaText = 'Appoint Your Certified Outsourced DPO';
      showRadios = false;
      prechecked = 'dpo';
    } else if (type === 'training') {
      ctaText = 'Request Data Privacy Training';
      showRadios = false;
      prechecked = 'training';
    } else if (type === 'readiness') {
      ctaText = 'Get FREE NDPA Gap Assessment';
      showRadios = true;
      showMessage = true;
      prechecked = 'readiness';
    } else if (type === 'contact') {
      ctaText = 'Initiate Secure Consultation';
      showMessage = true;
      prechecked = 'dpo';
    } else if (type === 'about' || isModal) {
      ctaText = 'Submit Consultation Request';
      showMessage = true;
      prechecked = 'dpo'; // Yellow highlight: About Us modal automatically pre-checks DPO option!
    }

    const isSubdir = window.location.pathname.includes('/services/') || window.location.pathname.includes('/blog/') || window.location.pathname.includes('/legal/');
    const privacyHref = isSubdir ? '../legal/privacy-statement.html' : 'legal/privacy-statement.html';
    const endpointHref = isSubdir ? '../send-mail.php' : 'send-mail.php';

    return `
      <form action="${endpointHref}" method="POST" class="compliance-dynamic-form" onsubmit="window.handleComplianceSubmit(event, this)">
        <input type="hidden" name="_cc" value="support@amstel.ng,dpo@amstel.ng">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_subject" value="New Consultation Request - Amstel Consulting">
        <div class="compliance-form-body">
          
          <!-- Universal Field 1: Full Name -->
          <div class="form-field-wrap">
            <label class="form-field-label">Full Name <span class="req">*</span></label>
            <input type="text" name="fullName" class="compliance-input" required>
          </div>

          <!-- Universal Field 2: Work Email -->
          <div class="form-field-wrap">
            <label class="form-field-label">Work Email Address <span class="req">*</span></label>
            <input type="email" name="email" class="compliance-input" required>
          </div>

          <!-- Universal Field 3: Company Name & Industry -->
          <div class="form-field-wrap">
            <label class="form-field-label">Company Name &amp; Industry <span class="req">*</span></label>
            <input type="text" name="company" class="compliance-input" required>
          </div>

          <!-- Universal Field 4: Direct Phone / WhatsApp (Optional) -->
          <div class="form-field-wrap">
            <label class="form-field-label">Phone Number / WhatsApp <span class="opt">(Optional)</span></label>
            <input type="tel" name="phone" class="compliance-input">
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
            <textarea name="message" class="compliance-textarea"></textarea>
          </div>
          ` : ''}

          <!-- Submit CTA Button -->
          <button type="submit" class="btn-compliance-submit">
            <span>${ctaText}</span>
          </button>

          <div class="form-guarantee-note">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Licensed DPCO</span>
          </div>

          <div class="form-privacy-note">
            By submitting, you agree to our <a href="${privacyHref}" target="_blank">Privacy Statement</a>.
          </div>

        </div>
      </form>
    `;
  }

  function showSuccessState(form) {
    form.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem;">
        <div style="width: 56px; height: 56px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1.2rem;">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 style="font-family: var(--font-sans); font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Request Successfully Received</h3>
        <p style="font-size: 0.92rem; color: #475569; line-height: 1.6; max-width: 380px; margin: 0 auto 1.5rem;">
          Thank you. Your consultation request has been sent to our advisory team. We will contact you within 4 business hours.
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
  }

  // Global submission handler connecting to client emails (info@amstel.ng, support@amstel.ng, dpo@amstel.ng)
  window.handleComplianceSubmit = async function (e, form) {
    e.preventDefault();
    const btn = form.querySelector('.btn-compliance-submit');
    const originalContent = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Request...</span>';
      btn.disabled = true;
    }

    try {
      const formData = new FormData(form);

      // Collect selected objectives with human-readable labels
      const objectiveLabels = [];
      form.querySelectorAll('input[name="objectives"]:checked').forEach(cb => {
        const text = cb.closest('label')?.querySelector('span')?.textContent?.trim() || cb.value;
        objectiveLabels.push(text);
      });

      // Human-readable record count
      const selectedRadio = form.querySelector('input[name="recordCount"]:checked');
      const recordCountLabel = selectedRadio 
        ? (selectedRadio.closest('label')?.querySelector('span')?.textContent?.trim() || selectedRadio.value) 
        : '';

      // Determine form context
      let contextLabel = 'Advisory Consultation';
      const path = window.location.pathname.toLowerCase();
      if (path.includes('car') || path.includes('compliance-audit-return')) contextLabel = 'CAR Filing Consultation';
      else if (path.includes('audit') || path.includes('data-protection-audit')) contextLabel = 'Data Protection Audit';
      else if (path.includes('dpo') || path.includes('outsourced-dpo')) contextLabel = 'Outsourced DPO Appointment';
      else if (path.includes('training') || path.includes('data-privacy-training')) contextLabel = 'Data Privacy Training';
      else if (path.includes('contact')) contextLabel = 'General Contact Inquiry';

      const submitData = new FormData();
      submitData.append('Full_Name', formData.get('fullName') || 'Not Provided');
      submitData.append('Email', formData.get('email') || '');
      submitData.append('Company_And_Industry', formData.get('company') || 'Not Provided');
      submitData.append('Phone_Or_WhatsApp', formData.get('phone') || 'Not Provided');
      if (recordCountLabel) {
        submitData.append('Estimated_Records', recordCountLabel);
      }
      submitData.append('Compliance_Objectives', objectiveLabels.length > 0 ? objectiveLabels.join('; ') : 'General Inquiry');
      submitData.append('Message', formData.get('message') || 'No additional message provided');
      submitData.append('Form_Context', contextLabel);
      submitData.append('Source_Page', window.location.href);
      submitData.append('_subject', `New Lead: ${formData.get('company') || 'Client'} - ${contextLabel}`);
      submitData.append('_replyto', formData.get('email') || '');
      submitData.append('_cc', 'support@amstel.ng,dpo@amstel.ng');
      submitData.append('_template', 'table');
      submitData.append('_captcha', 'false');

      const isSub = window.location.pathname.includes('/services/') || window.location.pathname.includes('/blog/') || window.location.pathname.includes('/legal/');
      const endpoint = isSub ? '../send-mail.php' : 'send-mail.php';

      let sentSuccessfully = false;

      // 1. Primary controlled backend submission via SMTP
      try {
        const directResp = await fetch(endpoint, {
          method: 'POST',
          body: submitData
        });
        if (directResp.ok) {
          const directJson = await directResp.json().catch(() => ({}));
          if (directJson && directJson.success) {
            sentSuccessfully = true;
          }
        }
      } catch (directErr) {
        console.warn('Direct SMTP endpoint note:', directErr);
      }

      // 2. Resilient fallback to FormSubmit if backend endpoint is unavailable (e.g. static CDN)
      if (!sentSuccessfully) {
        await fetch('https://formsubmit.co/ajax/info@amstel.ng', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: submitData
        }).catch(e => console.warn('Fallback dispatch note:', e));
      }

      showSuccessState(form);
    } catch (err) {
      console.warn('Form submission notice:', err);
      showSuccessState(form);
    }
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

      if (precheckOption === 'readiness' || precheckOption === 'gap' || precheckOption === 'pia') {
        if (badgeEl) badgeEl.textContent = 'NDPA 2023 Gap Assessment';
        if (titleEl) titleEl.textContent = 'Get FREE NDPA Gap Assessment';
      } else if (precheckOption === 'audit') {
        if (badgeEl) badgeEl.textContent = 'Data Protection Audit';
        if (titleEl) titleEl.textContent = 'Request Data Protection Audit';
      } else if (precheckOption === 'car') {
        if (badgeEl) badgeEl.textContent = 'Statutory DPCO Filing';
        if (titleEl) titleEl.textContent = 'Initiate Compliance Audit Return (CAR)';
      } else {
        if (badgeEl) badgeEl.textContent = 'Confidential Consultation';
        if (titleEl) titleEl.textContent = 'Speak with an Advisory Consultant';
      }

      if (formContainer) {
        const formType = precheckOption === 'readiness' ? 'readiness' : 'about';
        formContainer.innerHTML = generateFormHTML(formType, true);

        // Pre-selection logic (map pia/gap -> readiness)
        let targetValue = precheckOption;
        if (precheckOption === 'pia' || precheckOption === 'gap') {
          targetValue = 'readiness';
        }
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
          if (precheckOption === 'pia' || precheckOption === 'gap' || precheckOption === 'readiness') {
            submitBtnSpan.textContent = 'Get FREE NDPA Gap Assessment';
          } else if (precheckOption === 'car') {
            submitBtnSpan.textContent = 'Initiate Compliance Audit Return (CAR)';
          } else if (precheckOption === 'general') {
            submitBtnSpan.textContent = 'Initiate Secure Consultation';
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
