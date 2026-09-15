const fs = require('fs');
const path = require('path');

const rootDir = 'd:/sohaib/consultancy-web1/consultancy-web';

let convertedCount = 0;

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== '.git' && item !== 'node_modules' && item !== '.gemini') {
        processDirectory(fullPath);
      }
    } else if (item.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      const isSubdir = relPath.startsWith('services/') || relPath.startsWith('blog/') || relPath.startsWith('legal/');
      const pfx = isSubdir ? '../' : '';

      const startTag = '<footer class="pwc-footer">';
      const endTag = '</footer>';

      const startIndex = content.indexOf(startTag);
      if (startIndex !== -1) {
        const endIndex = content.indexOf(endTag, startIndex);
        if (endIndex !== -1) {
          const before = content.slice(0, startIndex);
          const after = content.slice(endIndex + endTag.length);
          const replacement = `<!-- Unified Site Footer (Single Source: js/footer.js) -->\n  <div id="site-footer"></div>\n  <script src="${pfx}js/footer.js"></script>`;
          const newContent = before + replacement + after;
          
          fs.writeFileSync(fullPath, newContent, 'utf8');
          convertedCount++;
          console.log(`Converted: ${relPath}`);
        } else {
          console.warn(`Could not find closing </footer> in ${relPath}`);
        }
      } else {
        console.warn(`Could not find <footer class="pwc-footer"> in ${relPath}`);
      }
    }
  }
}

processDirectory(rootDir);
console.log(`Done! Converted ${convertedCount} files.`);
