const http = require('http');

const urls = [
  'http://localhost:3000/services/data-privacy-training.html',
  'http://localhost:3000/services/data-protection-audit.html',
  'http://localhost:3000/services/compliance-audit-return.html',
  'http://localhost:3000/services/outsourced-dpo.html',
  'http://localhost:3000/contact.html',
  'http://localhost:3000/js/compliance-form.js'
];

function fetch(url) {
  return new Promise(resolve => {
    http.get(url, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ url, body }));
    });
  });
}

async function verify() {
  for (const u of urls) {
    const { url, body } = await fetch(u);
    const hasVerifDesk = /Verification\s+Desk/i.test(body);
    const hasDiagnostic = /diagnostic/i.test(body);
    console.log(`${url}:`);
    console.log(`  Verification Desk: ${hasVerifDesk ? 'FOUND (BAD)' : 'CLEAN (GOOD)'}`);
    console.log(`  Diagnostic: ${hasDiagnostic ? 'FOUND (CHECK)' : 'CLEAN (GOOD)'}`);
    if (url.includes('compliance-form.js')) {
      const hasPlaceholders = /placeholder=/i.test(body);
      console.log(`  Form Placeholders: ${hasPlaceholders ? 'FOUND (BAD)' : 'CLEAN (GOOD)'}`);
    }
  }
}

verify();
