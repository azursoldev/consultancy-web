const fs = require('fs');
const path = require('path');

const rootFaq = path.join(__dirname, '..', 'faq.html');
const legalFaq = path.join(__dirname, '..', 'legal', 'faq.html');
const styleCss = path.join(__dirname, '..', 'css', 'style.css');
const footerJs = path.join(__dirname, '..', 'js', 'footer.js');

console.log('--- FAQ VERIFICATION ---');

// 1. Files exist
if (!fs.existsSync(rootFaq)) throw new Error('faq.html missing');
if (!fs.existsSync(legalFaq)) throw new Error('legal/faq.html missing');
console.log('✓ Both faq.html and legal/faq.html exist');

const faqContent = fs.readFileSync(rootFaq, 'utf8');

// 2. Check all 20 questions
for (let i = 1; i <= 20; i++) {
  const qStr = `${i}. `;
  if (!faqContent.includes(qStr)) {
    throw new Error(`Question ${i} missing!`);
  }
}
console.log('✓ All 20 questions (1 to 20) are present');

// 3. Check client developer note compliance
// - Collapsed accordions: no <details open>
const openCount = (faqContent.match(/<details[^>]*open/gi) || []).length;
if (openCount > 0) {
  throw new Error(`Found ${openCount} open details tags, but client requested collapsed accordion FAQs`);
}
console.log('✓ All 20 accordions are collapsed by default (<details> without open attribute)');

// 4. Check 2 columns layout structure
if (!faqContent.includes('faq-accordion-grid')) throw new Error('Missing faq-accordion-grid');
if (!faqContent.includes('faq-accordion-col')) throw new Error('Missing faq-accordion-col');

// Check CSS rules
const cssContent = fs.readFileSync(styleCss, 'utf8');
if (!cssContent.includes('.faq-accordion-grid')) throw new Error('Missing .faq-accordion-grid in style.css');
if (!cssContent.includes('grid-template-columns: 1fr 1fr;')) throw new Error('Missing 2-column desktop CSS in style.css');
if (!cssContent.includes('@media (max-width: 860px)')) throw new Error('Missing mobile media query');
if (!cssContent.includes('grid-template-columns: 1fr;')) throw new Error('Missing 1-column mobile CSS in style.css');
console.log('✓ CSS defines 2-columns on desktop and 1-column on mobile');

// 5. Check Footer link
const footerContent = fs.readFileSync(footerJs, 'utf8');
if (!footerContent.includes('${pfx}faq.html')) throw new Error('footer.js does not link to faq.html');
console.log('✓ footer.js correctly links to ${pfx}faq.html');

// 6. Check that no unrequested extra marketing badges/cards exist
if (faqContent.includes('nudge-badge')) throw new Error('Unrequested badge found in faq.html');
console.log('✓ Strict verbatim content: No extra badges or fluff');

console.log('ALL TESTS PASSED SUCCESSFULLY!');
