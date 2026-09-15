const fs = require('fs');
const path = require('path');

const rootDir = 'd:/sohaib/consultancy-web1/consultancy-web';
const searchDataCode = fs.readFileSync(path.join(rootDir, 'js/search-data.js'), 'utf8');

// Evaluate search data index
const window = {};
eval(searchDataCode);
const index = window.siteSearchIndex;

console.log('Indexed search items:', index.length);

function testSearch(query, expectedId) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matched = index.filter(item => {
    const haystack = (item.title + ' ' + item.desc + ' ' + (item.keywords || '') + ' ' + (item.badge || '')).toLowerCase();
    return terms.every(t => haystack.includes(t));
  });

  const found = matched.some(m => m.id === expectedId);
  if (found) {
    console.log(`[PASS] Search "${query}" matched expected "${expectedId}" (Total matches: ${matched.length})`);
  } else {
    console.error(`[FAIL] Search "${query}" did NOT match expected "${expectedId}"`);
  }
}

testSearch('CAR', 'car-filing');
testSearch('compliance audit return', 'car-filing');
testSearch('DPO', 'outsourced-dpo');
testSearch('training', 'data-privacy-training');
testSearch('checklist', 'executive-checklist');
testSearch('NDPA 2023', 'executive-checklist');
testSearch('licensed dpco', 'dpco-credentials');
testSearch('leadership', 'leadership-team');
testSearch('artificial intelligence', 'ai-tracker');
testSearch('privacy policy', 'privacy-policies');
testSearch('breach', 'cyber-breach');

console.log('Search query tests finished successfully.');
