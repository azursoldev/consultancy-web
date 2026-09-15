const fs = require('fs');
const path = require('path');

const rootDir = 'd:/sohaib/consultancy-web1/consultancy-web';

const findings = [];

function checkFile(filePath) {
  const rel = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Check for old commission name
  if (content.includes('National Data Protection Commission')) {
    findings.push({ file: rel, type: 'OLD_COMMISSION_NAME', details: 'Contains "National Data Protection Commission"' });
  }

  // 2. Check for "Amstel Consulting Nigeria" (should be "Amstel Consulting Ltd" or "Amstel Consulting")
  if (content.includes('Amstel Consulting Nigeria')) {
    findings.push({ file: rel, type: 'OLD_COMPANY_NAME', details: 'Contains "Amstel Consulting Nigeria"' });
  }

  // 3. Check for old footer/category strings
  if (content.includes('NDPA 2023 Executive Checklist') && !rel.includes('audit')) {
    // Note: if in text as checklist name, maybe ok, but let's check
    if (content.includes('All Insights & Regulatory Briefings')) {
      findings.push({ file: rel, type: 'OLD_FOOTER_KNOWLEDGE_HUB', details: 'Contains deleted footer link "All Insights & Regulatory Briefings"' });
    }
  }

  // 4. Check for old AI string
  if (content.includes('Artificial Intelligence vs Data Privacy')) {
    findings.push({ file: rel, type: 'OLD_AI_TITLE', details: 'Contains "Artificial Intelligence vs Data Privacy"' });
  }

  // 5. Check for "Authority" in credentials heading
  if (content.includes('Our Credentials as a Licensed DPCO Authority')) {
    findings.push({ file: rel, type: 'CREDENTIALS_AUTHORITY', details: 'Contains "Our Credentials as a Licensed DPCO Authority"' });
  }

  // 6. Check for old DPCO badge text
  if (content.includes('OFFICIAL STATUTORY LICENSING • NDPC REGISTERED DPCO')) {
    findings.push({ file: rel, type: 'OLD_DPCO_BADGE', details: 'Contains old badge text "OFFICIAL STATUTORY LICENSING • NDPC REGISTERED DPCO"' });
  }

  // 7. Check for Lorem ipsum
  if (/lorem\s+ipsum/i.test(content)) {
    findings.push({ file: rel, type: 'LOREM_IPSUM', details: 'Contains lorem ipsum placeholder text' });
  }

  // 8. Check for broken internal links
  const linkMatches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const m of linkMatches) {
    const href = m[1];
    // Skip external, anchors, mailto, tel, javascript
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }
    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    const fileDir = path.dirname(filePath);
    const targetPath = path.resolve(fileDir, cleanHref);
    if (!fs.existsSync(targetPath)) {
      findings.push({ file: rel, type: 'BROKEN_LINK', details: `Broken link: href="${href}" -> target not found: ${path.relative(rootDir, targetPath)}` });
    }
  }

  // 9. Check for broken image sources
  const imgMatches = content.matchAll(/src=["']([^"']+)["']/g);
  for (const m of imgMatches) {
    const src = m[1];
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('#') || src.startsWith('javascript:')) continue;
    const cleanSrc = src.split('?')[0].split('#')[0];
    if (!cleanSrc) continue;

    const fileDir = path.dirname(filePath);
    const targetPath = path.resolve(fileDir, cleanSrc);
    if (!fs.existsSync(targetPath)) {
      findings.push({ file: rel, type: 'BROKEN_IMAGE_SRC', details: `Broken img src: src="${src}" -> target not found: ${path.relative(rootDir, targetPath)}` });
    }
  }
}

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== '.git' && item !== 'node_modules' && item !== '.gemini' && item !== 'scratch') {
        walk(full);
      }
    } else if (item.endsWith('.html') || item.endsWith('.js')) {
      checkFile(full);
    }
  }
}

walk(rootDir);

console.log('=== AUDIT REPORT ===');
console.log(`Total findings: ${findings.length}`);
const grouped = {};
for (const f of findings) {
  if (!grouped[f.type]) grouped[f.type] = [];
  grouped[f.type].push(f);
}

for (const [type, list] of Object.entries(grouped)) {
  console.log(`\n--- ${type} (${list.length}) ---`);
  list.forEach(item => console.log(`[${item.file}] ${item.details}`));
}
