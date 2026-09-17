const http = require('http');

const urls = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/faq.html',
  '/cookie-policy.html',
  '/terms-of-service.html',
  '/legal-disclaimer.html',
  '/privacy-statement.html',
  '/charles-odetola.html',
  '/martha-jowah.html',
  '/publication-detail.html',
  '/search.html',
  '/services/index.html',
  '/services/compliance-audit-return.html',
  '/services/outsourced-dpo.html',
  '/services/data-protection-audit.html',
  '/services/data-privacy-training.html',
  '/blog/index.html',
  '/blog/complying-with-ndpa-2023.html',
  '/legal/faq.html',
  '/legal/legal-disclaimer.html',
  '/legal/privacy-statement.html',
  '/legal/terms-of-service.html'
];

async function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      if (res.statusCode === 200) {
        resolve({ url, status: res.statusCode });
      } else {
        reject(new Error(`Failed ${url}: status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

(async () => {
  console.log('Testing all active pages on server...');
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(`✓ [${res.status}] ${res.url}`);
  }
  console.log('ALL ACTIVE PAGES RESPOND WITH 200 OK!');
})();
