const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

const targetRegex = /<div class="trust-marker-text">Nigerian &amp; Foreign Consultants Living Across Nigeria, Europe, and America\s*<\/div>/;
const replacement = '<div class="trust-marker-text">Global Network of Consultants Across Nigeria, Europe &amp; the Americas</div>';

if (targetRegex.test(html)) {
  html = html.replace(targetRegex, replacement);
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log('Successfully updated Trust Marker 4 in index.html');
} else {
  console.error('Target regex did not match in index.html');
}
