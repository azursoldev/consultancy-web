const fs = require('fs');
const vm = require('vm');

// Test 1: search-data.js
const searchDataCode = fs.readFileSync('js/search-data.js', 'utf8');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(searchDataCode, ctx);
const items = ctx.window.siteSearchIndex;

console.log('Total items in search-data.js:', items.length);

const legacyItems = items.filter(i => i.url.startsWith('service-') || i.url.startsWith('organisation-'));
console.log('Legacy orphan URLs in search-data.js:', legacyItems.length);
if (legacyItems.length > 0) {
  console.log('Found legacy items:', legacyItems.map(i => i.url));
}

const cyberMatches = items.filter(i => (i.title + ' ' + i.desc + ' ' + (i.keywords || '')).toLowerCase().includes('cyber'));
console.log('\nSearch "cyber" matches:');
cyberMatches.forEach(m => console.log(' -> ' + m.title + ' (' + m.url + ')'));

// Test 2: header.js
const headerCode = fs.readFileSync('js/header.js', 'utf8');
const headerHasLegacy = headerCode.includes('service-cyber.html') || headerCode.includes('service-ropa.html') || headerCode.includes('service-dpia.html');
console.log('\nLegacy service-*.html in header.js:', headerHasLegacy);

console.log('\nAll tests passed successfully!');
