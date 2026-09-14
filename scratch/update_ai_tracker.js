const fs = require('fs');
const path = require('path');

const rootDir = 'd:/sohaib/consultancy-web1/consultancy-web';

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
      let changed = false;

      // Replace in pills
      if (content.includes('Artificial Intelligence vs Data Privacy?')) {
        content = content.replaceAll('Artificial Intelligence vs Data Privacy?', 'Artificial Intelligence Tracker');
        changed = true;
      }
      if (content.includes('Artificial Intelligence vs Data Privacy')) {
        content = content.replaceAll('Artificial Intelligence vs Data Privacy', 'Artificial Intelligence Tracker');
        changed = true;
      }

      // Replace anchor hash if present
      if (content.includes('#ai-data-privacy')) {
        content = content.replaceAll('#ai-data-privacy', '#ai-tracker');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', path.relative(rootDir, fullPath));
      }
    }
  }
}

processDirectory(rootDir);
console.log('Done updating to Artificial Intelligence Tracker.');
