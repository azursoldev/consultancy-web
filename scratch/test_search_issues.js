global.window = global;
const fs = require('fs');
const content = fs.readFileSync('js/search-data.js', 'utf8');
eval(content);

console.log('Total items in siteSearchIndex:', siteSearchIndex.length);

function testSearch(q) {
  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  console.log('\n--- SEARCH FOR:', q, '---');
  let matched = 0;
  let byCat = {};
  siteSearchIndex.forEach(item => {
    const haystack = (item.title + ' ' + item.desc + ' ' + (item.keywords || '') + ' ' + (item.badge || '')).toLowerCase();
    const matches = terms.every(t => haystack.includes(t));
    if (matches) {
      matched++;
      byCat[item.category] = (byCat[item.category] || 0) + 1;
      console.log('  [' + item.category + '] ' + item.title);
    }
  });
  console.log('Total matches:', matched, byCat);
}

testSearch('Comply');
testSearch('Alignment');
testSearch('compliance');
testSearch('training');
testSearch('audit');
testSearch('DPO');
testSearch('NDPA');
