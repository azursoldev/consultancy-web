const fs = require('fs');
const path = require('path');

const rootDir = 'd:/sohaib/consultancy-web1/consultancy-web';

function checkDirectory(dir) {
  let count = 0;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== '.git' && item !== 'node_modules' && item !== '.gemini') {
        count += checkDirectory(fullPath);
      }
    } else if (item.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('id="site-footer"') || !content.includes('js/footer.js')) {
        console.error('MISSING footer component in:', fullPath);
      } else {
        count++;
      }
    }
  }
  return count;
}

const total = checkDirectory(rootDir);
console.log('Total HTML files verified with site-footer component:', total);
