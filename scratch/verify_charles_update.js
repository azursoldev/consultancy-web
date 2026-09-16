const fs = require('fs');
const assert = require('assert');

// Verify files exist and have content
const charlesHtml = fs.readFileSync('charles-odetola.html', 'utf8');
assert(charlesHtml.includes('Charles Odetola, LLM, CIPP/E'), 'charles-odetola.html must have LLM, CIPP/E');
assert(charlesHtml.includes('International Privacy Consultant'), 'charles-odetola.html must have International Privacy Consultant');
assert(charlesHtml.includes('assets/team/charles-odetola.jpg'), 'charles-odetola.html must reference photo');

const aboutHtml = fs.readFileSync('about.html', 'utf8');
assert(aboutHtml.includes('LLM, CIPP/E'), 'about.html must have LLM, CIPP/E');
assert(aboutHtml.includes('International Privacy Consultant'), 'about.html must have International Privacy Consultant');

const orgHtml = fs.readFileSync('organisation.html', 'utf8');
assert(orgHtml.includes('LLM, CIPP/E'), 'organisation.html must have LLM, CIPP/E');
assert(orgHtml.includes('International Privacy Consultant'), 'organisation.html must have International Privacy Consultant');

const photoStats = fs.statSync('assets/team/charles-odetola.jpg');
console.log('Photo size:', photoStats.size);
assert(photoStats.size > 200000, 'Photo must exist and have good size');

console.log('ALL CHARLES ODETOLA VERIFICATIONS PASSED SUCCESSFULLY!');
