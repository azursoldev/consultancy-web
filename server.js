const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  let safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  function serveFile(f) {
    fs.readFile(f, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Server Error');
      }
      const ext = path.extname(f).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    });
  }

  // Legacy redirects for obsolete file cleanup
  const legacyRedirects = {
    '/service-car.html': '/services/compliance-audit-return.html',
    '/service-car': '/services/compliance-audit-return.html',
    '/service-dpo.html': '/services/outsourced-dpo.html',
    '/service-dpo': '/services/outsourced-dpo.html',
    '/service-audit.html': '/services/data-protection-audit.html',
    '/service-audit': '/services/data-protection-audit.html',
    '/data-protection-audit.html': '/services/data-protection-audit.html',
    '/service-training.html': '/services/data-privacy-training.html',
    '/service-training': '/services/data-privacy-training.html',
    '/data-privacy-training.html': '/services/data-privacy-training.html',
    '/services.html': '/services/index.html',
    '/organisation.html': '/about.html',
    '/organisation': '/about.html',
    '/terms-and-conditions.html': '/terms-of-service.html',
    '/topics.html': '/blog/index.html'
  };
  if (legacyRedirects[urlPath]) {
    res.writeHead(301, { 'Location': legacyRedirects[urlPath] });
    return res.end();
  }

  // 1. Root
  if (urlPath === '/' || urlPath === '') {
    const rootIndex = path.join(__dirname, 'index.html');
    if (fs.existsSync(rootIndex)) return serveFile(rootIndex);
  }

  // 2. Direct file or directory
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const dirIndex = path.join(filePath, 'index.html');
      if (fs.existsSync(dirIndex)) {
        return serveFile(dirIndex);
      }
      const htmlFile = filePath.replace(/[\/\\]$/, '') + '.html';
      if (fs.existsSync(htmlFile)) {
        return serveFile(htmlFile);
      }
    } else {
      return serveFile(filePath);
    }
  }

  // 3. Path + '.html' (Clean URL support)
  if (fs.existsSync(filePath + '.html')) {
    return serveFile(filePath + '.html');
  }

  // 4. Trimmed trailing slash + '.html'
  const trimmed = filePath.replace(/[\/\\]$/, '');
  if (fs.existsSync(trimmed + '.html')) {
    return serveFile(trimmed + '.html');
  }

  // 5. If within directory and file.html exists
  const asIndexInDir = path.join(filePath, 'index.html');
  if (fs.existsSync(asIndexInDir)) {
    return serveFile(asIndexInDir);
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!DOCTYPE html><html><head><title>404 Not Found</title><link rel="stylesheet" href="/css/style.css"></head><body style="padding:4rem;text-align:center;font-family:sans-serif;"><h1 style="font-size:2.5rem;color:#d04a02;">404 Page Not Found</h1><p style="font-size:1.1rem;color:#475569;margin:1.5rem 0;">The requested page could not be located.</p><a href="/" class="btn-pwc-orange" style="display:inline-block;padding:0.8rem 1.6rem;background:#d04a02;color:#fff;text-decoration:none;border-radius:4px;font-weight:700;">Return to Homepage</a></body></html>');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Production-ready static server running at http://localhost:${PORT}/`);
});
