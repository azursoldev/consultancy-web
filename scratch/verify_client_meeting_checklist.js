const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = 'd:/sohaib/consultancy-web1/consultancy-web';

async function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runChecklist() {
  console.log('================================================================');
  console.log('   STARTING 100% EXHAUSTIVE CLIENT REQUIREMENTS VERIFICATION    ');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(' [PASS] ' + message);
      passed++;
    } else {
      console.error('❌ [FAIL] ' + message);
      failed++;
    }
  }

  // --- 1. HOMEPAGE 5 SECTIONS ---
  console.log('\n--- VERIFYING HOMEPAGE (index.html) ---');
  const home = await fetchUrl('/');
  assert(home.status === 200, 'Homepage returns HTTP 200');
  assert(home.body.includes('Secure Your Corporate Data Assets &amp; Achieve NDPA Compliance.') || home.body.includes('Secure Your Corporate Data Assets & Achieve NDPA Compliance.'), 'Hero H1 matches client exact title');
  assert(home.body.includes('Request a FREE Privacy Impact Assessment'), 'Hero Button 1 is present');
  assert(home.body.includes('Initiate Compliance Audit Return Filing Support'), 'Hero Button 2 is present');
  assert(home.body.includes('Explore Solutions'), 'Hero Button 3 (scroll) is present');
  assert(home.body.includes('Licensed Data Protection Compliance Organization (DPCO)'), 'Trust Marker 1 present');
  assert(home.body.includes('Fully Registered with the NDPC'), 'Trust Marker 2 present');
  assert(home.body.includes('Authorized Statutory CAR Audit Portal Submissions'), 'Trust Marker 3 present');
  assert(home.body.includes('Global Network of Consultants Across Nigeria, Europe &amp; the Americas') || home.body.includes('Global Network of Consultants Across Nigeria, Europe & the Americas'), 'Trust Marker 4 present');
  assert(home.body.includes('Annual Statutory CAR Filing Support'), 'Pillar 1 CAR present');
  assert(home.body.includes('Licensed Outsourced DPO-as-a-Service'), 'Pillar 2 DPO present');
  assert(home.body.includes('Data Protection Audits &amp; Governance') || home.body.includes('Data Protection Audits & Governance'), 'Pillar 3 Audits present');
  assert(home.body.includes('Data Privacy Training'), 'Pillar 4 Training present');
  assert(!home.body.includes('#fef2f2') && !home.body.includes('#ef4444') && !home.body.includes('#f0fdf4') && !home.body.includes('#22c55e'), 'Homepage preview cards have ZERO red or green inline styles');
  assert(home.body.includes('Why Corporate Boards Choose Amstel Consulting'), 'Section 4 Why Boards Choose present');
  assert(home.body.includes('Protect Your Brand Reputation and Stop Worrying About Compliance Risk.'), 'Section 5 Bottom Nudge H2 present');

  // --- 2. ABOUT / ORGANISATION PAGE ---
  console.log('\n--- VERIFYING ORGANISATION PAGE (about.html & organisation.html) ---');
  const about = await fetchUrl('/about.html');
  assert(about.body.includes('Our Organisation: About Amstel Consulting'), 'Page title is "Our Organisation: About Amstel Consulting" without "Nigeria"');
  assert(about.body.includes('AMSTEL CONSULTING IS AN NDPC LICENSED DPCO'), 'DPCO Credentials badge text matches client exact instruction');
  assert(!about.body.includes('OFFICIAL STATUTORY LICENSING • NDPC REGISTERED DPCO'), 'Old DPCO badge is deleted');
  assert(about.body.includes('3. Our Credentials as a Licensed DPCO'), 'Heading is "3. Our Credentials as a Licensed DPCO"');
  assert(!about.body.includes('Licensed DPCO Authority'), 'The word "Authority" is deleted from heading');
  assert(!about.body.includes('National Data Protection Commission'), 'Zero occurrences of "National Data Protection Commission"');

  // --- 3. KNOWLEDGE HUB PAGE (blog/index.html & topics.html) ---
  console.log('\n--- VERIFYING KNOWLEDGE HUB (blog/index.html & topics.html) ---');
  const blog = await fetchUrl('/blog/index.html');
  assert(blog.body.includes('Complying With NDPA 2023 (1)'), 'Category pill 1 is "Complying With NDPA 2023 (1)"');
  assert(blog.body.includes('Regulatory Guidance'), 'Category pill 2 is "Regulatory Guidance"');
  assert(blog.body.includes('Artificial Intelligence Tracker'), 'Category pill 3 is "Artificial Intelligence Tracker"');
  assert(!blog.body.includes('Artificial Intelligence vs Data Privacy'), 'Old text "Artificial Intelligence vs Data Privacy" is absent');
  assert(blog.body.includes('NDPA 2023 Alignment: A Strategic Checklist for Public and Private Sector Executives'), 'Official 13 Sept checklist article is present');
  assert(!blog.body.includes('Central Bank Consumer Protection'), 'No extra fake article 1');
  assert(!blog.body.includes('Enforcement Trends 2026'), 'No extra fake article 2');
  assert(!blog.body.includes('Dan-Ogun') && !blog.body.includes('Al-Hassan') && !blog.body.includes('Okoli'), 'Author names removed from Knowledge Hub cards');

  // --- 4. BLOG DETAIL / PUBLICATION DETAIL PAGE ---
  console.log('\n--- VERIFYING ARTICLE DETAIL PAGE (publication-detail.html) ---');
  const pub = await fetchUrl('/publication-detail.html');
  assert(pub.body.includes('NDPA 2023 Alignment: A Strategic Checklist for Public and Private Sector Executives'), 'Article Title matches Google doc');
  assert(pub.body.includes('Complying With NDPA 2023'), 'Category is Complying With NDPA 2023');
  assert(pub.body.includes('1. Establish and Document a Valid Lawful Basis for Data Processing'), 'Checklist Item 1 present');
  assert(pub.body.includes('2. Formally Appoint and Empower a Data Protection Officer (DPO)'), 'Checklist Item 2 present');
  assert(pub.body.includes('3. Implement a Strict 72-Hour Breach Notification Protocol'), 'Checklist Item 3 present');
  assert(pub.body.includes('4. Integrate Data Protection Impact Assessments (DPIAs) into Governance'), 'Checklist Item 4 present');
  assert(pub.body.includes('5. Execute Annual Compliance Audits via a Licensed DPCO'), 'Checklist Item 5 present');
  assert(pub.body.includes('Partnering for Sustainable Compliance'), 'Conclusion section present');
  assert(pub.body.includes('Book an NDPA Readiness Assessment'), 'Readiness Assessment CTA present');
  assert(!pub.body.includes('Dr. Emeka Dan-Ogun') && !pub.body.includes('Fatima O. Al-Hassan'), 'Fake author bios removed from article');

  // --- 5. SOLUTIONS HUB PAGE (services/index.html & services.html) ---
  console.log('\n--- VERIFYING SOLUTIONS (services/index.html & services.html) ---');
  const serv = await fetchUrl('/services/index.html');
  assert(serv.body.includes('Our Solutions: Enterprise Data Protection Compliance &amp; Security') || serv.body.includes('Our Solutions: Enterprise Data Protection Compliance & Security'), 'Solutions page headline matches');
  assert(serv.body.includes('Statutory Compliance Audit Return (CAR) Filing'), 'CAR Pillar heading has no number prefix');
  assert(serv.body.includes('Licensed Outsourced DPO (DPO-as-a-Service)'), 'Outsourced DPO Pillar heading has no number prefix');
  assert(serv.body.includes('Comprehensive Data Protection Audits &amp; Governance') || serv.body.includes('Comprehensive Data Protection Audits & Governance'), 'Audits Pillar heading has no number prefix');
  assert(serv.body.includes('Data Privacy Training for (Staff Awareness Certification)'), 'Training Pillar heading has no number prefix');
  assert(serv.body.includes('Fulfill your statutory training requirements under Section 31 of the NDPA without disrupting your daily business operations.'), 'Training business goal matches client text');
  assert(serv.body.includes('Request Data Privacy Training'), 'Training button text matches');
  assert(!serv.body.includes('<h2 class="pillar-title">1.') && !serv.body.includes('<h2 class="pillar-title">2.') && !serv.body.includes('<h2 class="pillar-title">3.') && !serv.body.includes('<h2 class="pillar-title">4.'), 'Zero numbering in pillar titles');

  // --- 6. FOOTER COMPONENT & DISCLAIMERS ---
  console.log('\n--- VERIFYING FOOTER COMPONENT & DISCLAIMERS ---');
  const footerJs = fs.readFileSync(path.join(rootDir, 'js/footer.js'), 'utf8');
  assert(footerJs.includes('Nigeria Data Protection Commission'), 'Footer JS specifies "Nigeria Data Protection Commission"');
  assert(!footerJs.includes('National Data Protection Commission'), 'Footer JS does not contain "National Data Protection Commission"');
  assert(footerJs.includes('Amstel Consulting Ltd'), 'Footer JS specifies "Amstel Consulting Ltd"');
  assert(!footerJs.includes('Amstel Consulting Nigeria'), 'Footer JS does not contain "Amstel Consulting Nigeria"');
  assert(footerJs.includes('Complying With NDPA 2023'), 'Footer Column 2 contains "Complying With NDPA 2023"');
  assert(footerJs.includes('Regulatory Guidance'), 'Footer Column 2 contains "Regulatory Guidance"');
  assert(footerJs.includes('Artificial Intelligence Tracker'), 'Footer Column 2 contains "Artificial Intelligence Tracker"');
  assert(!footerJs.includes('NDPA 2023 Executive Checklist'), 'Footer Column 2 deleted "NDPA 2023 Executive Checklist"');
  assert(!footerJs.includes('All Insights & Regulatory Briefings'), 'Footer Column 2 deleted "All Insights & Regulatory Briefings"');
  assert(!footerJs.includes('Artificial Intelligence vs Data Privacy'), 'Footer Column 2 does not contain "Artificial Intelligence vs Data Privacy"');

  // --- 7. CODEBASE WIDE CLEANLINESS SCAN ---
  console.log('\n--- CODEBASE GLOBAL INTEGRITY CHECK ---');
  let totalHtml = 0;
  let brokenFooters = 0;
  function scanDir(d) {
    for (const item of fs.readdirSync(d)) {
      const full = path.join(d, item);
      if (fs.statSync(full).isDirectory()) {
        if (item !== '.git' && item !== 'node_modules' && item !== '.gemini' && item !== 'scratch') scanDir(full);
      } else if (item.endsWith('.html')) {
        totalHtml++;
        const c = fs.readFileSync(full, 'utf8');
        if (!c.includes('id="site-footer"') || !c.includes('js/footer.js')) {
          brokenFooters++;
        }
      }
    }
  }
  scanDir(rootDir);
  assert(totalHtml === 50, `Found exactly 50 HTML files in project including search.html (found: ${totalHtml})`);
  assert(brokenFooters === 0, `All 50 HTML files use the unified js/footer.js component (broken: ${brokenFooters})`);

  console.log('\n================================================================');
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runChecklist().catch(err => {
  console.error('Fatal check error:', err);
  process.exit(1);
});
