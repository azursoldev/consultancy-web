const http = require('http');
const assert = require('assert');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- Verifying Server & Assets ---');
  
  // 1. Verify CSS styles
  const css = await fetchUrl('http://localhost:3000/css/style.css');
  assert(css.includes('bottom: 1.5rem;'), 'Desktop pause button must have bottom: 1.5rem');
  assert(css.includes('right: 2.5rem;'), 'Desktop pause button must have right: 2.5rem');
  assert(css.includes('bottom: 0.85rem !important;'), 'Mobile pause button must have bottom: 0.85rem !important');
  assert(css.includes('right: 1rem !important;'), 'Mobile pause button must have right: 1rem !important');
  console.log('✓ CSS verification passed: video-pause-btn positioned at bottom-right on both desktop & mobile');

  // 2. Verify Index.html has video-pause-btn
  const indexHtml = await fetchUrl('http://localhost:3000/index.html');
  assert(indexHtml.includes('class="video-pause-btn"'), 'index.html must have video-pause-btn');
  assert(indexHtml.includes('Secure Your Corporate Data Assets &amp; Achieve NDPA Compliance.'), 'index.html must have headline');
  console.log('✓ index.html verification passed');

  // 3. Verify search-data.js
  const searchData = await fetchUrl('http://localhost:3000/js/search-data.js');
  assert(searchData.includes('normalizeSearchTerm'), 'search-data.js must have stemmer');
  assert(searchData.includes('matchSearchItem'), 'search-data.js must have matcher');
  
  const vm = require('vm');
  const ctx = { window: {} };
  vm.runInNewContext(searchData, ctx);
  
  const alignmentMatches = ctx.window.siteSearchIndex.filter(item => 
    ctx.window.matchSearchItem(item, 'Alignment')
  );
  
  console.log(`Found ${alignmentMatches.length} matches for 'Alignment'`);
  assert(alignmentMatches.length >= 10, 'Must have at least 10 matches for Alignment');

  const solutionsMatches = alignmentMatches.filter(i => i.category === 'Solutions');
  console.log(`Found ${solutionsMatches.length} solutions matches for 'Alignment'`);
  assert(solutionsMatches.length >= 5, 'Must have at least 5 solutions matches for Alignment');

  const khMatches = alignmentMatches.filter(i => i.category === 'Knowledge Hub');
  console.log(`Found ${khMatches.length} Knowledge Hub matches for 'Alignment'`);
  assert(khMatches.length >= 1, 'Must have at least 1 Knowledge Hub match for Alignment');

  // 4. Verify search.html page
  const searchHtml = await fetchUrl('http://localhost:3000/search.html');
  assert(searchHtml.includes('search-filter-strip'), 'search.html must have filter strip');
  assert(searchHtml.includes('totalAll'), 'search.html must count totalAll');
  console.log('✓ search.html verification passed');

  console.log('\nALL VERIFICATIONS PASSED SUCCESSFULLY!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
