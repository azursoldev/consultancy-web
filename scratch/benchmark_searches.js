global.window = global;
const fs = require('fs');
const content = fs.readFileSync('js/search-data.js', 'utf8');
eval(content);

const queries = [
  'comply', 'complying', 'compliant', 'compliance',
  'align', 'alignment', 'aligning',
  'services', 'solutions', 'consulting', 'consultant',
  'audit', 'audits', 'auditing', 'assessment',
  'dpo', 'outsourced dpo', 'car', 'car filing',
  'training', 'staff training', 'awareness',
  'privacy', 'data privacy', 'data protection',
  'ndpa', 'ndpc', 'dpco', 'license', 'licensed',
  'annual', 'march 15', 'deadline', 'return', 'returns',
  'breach', 'incident', '72 hours', 'ropa', 'dpia',
  'ai', 'artificial intelligence', 'guidance', 'checklist',
  'charles', 'odetola', 'about', 'team', 'contact'
];

console.log('Query | Total Matches | Solutions Matches');
console.log('------------------------------------------');
queries.forEach(q => {
  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let total = 0;
  let solutions = 0;
  siteSearchIndex.forEach(item => {
    const haystack = (item.title + ' ' + item.desc + ' ' + (item.keywords || '') + ' ' + (item.badge || '')).toLowerCase();
    if (terms.every(t => haystack.includes(t))) {
      total++;
      if (item.category === 'Solutions') solutions++;
    }
  });
  console.log(`${q.padEnd(20)} | Total: ${String(total).padEnd(2)} | Solutions: ${solutions}`);
});
