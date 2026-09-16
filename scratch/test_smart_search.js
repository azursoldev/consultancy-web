function normalizeTerm(word) {
  if (!word) return '';
  let w = word.toLowerCase().trim();
  if (w.startsWith('compli') || w.startsWith('comply')) return 'compli';
  if (w.startsWith('align')) return 'align';
  if (w.startsWith('regul')) return 'regul';
  if (w.startsWith('audit')) return 'audit';
  if (w.startsWith('protect')) return 'protect';
  if (w.startsWith('train')) return 'train';
  if (w.startsWith('licen')) return 'licen';
  if (w.startsWith('govern')) return 'govern';
  if (w.startsWith('certif')) return 'certif';
  if (w.startsWith('consult')) return 'consult';
  if (w.startsWith('assess')) return 'assess';
  if (w.startsWith('organis') || w.startsWith('organiz')) return 'organis';
  if (w.startsWith('secur')) return 'secur';
  if (w.startsWith('privac') || w.startsWith('privat')) return 'privac';
  if (w.startsWith('solut')) return 'solut';
  if (w.startsWith('servic')) return 'servic';
  if (w.startsWith('partner')) return 'partner';
  if (w.startsWith('requir')) return 'requir';
  if (w.startsWith('statut')) return 'statut';
  if (w.startsWith('breach')) return 'breach';
  if (w.startsWith('incid')) return 'incid';

  if (w.endsWith('ies')) w = w.slice(0, -3) + 'y';
  else if (w.endsWith('ing') && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith('ment') && w.length > 6) w = w.slice(0, -4);
  else if (w.endsWith('tion') && w.length > 6) w = w.slice(0, -4);
  else if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) w = w.slice(0, -1);
  else if (w.endsWith('ed') && w.length > 4) w = w.slice(0, -2);
  
  return w;
}

global.window = global;
const fs = require('fs');
const content = fs.readFileSync('js/search-data.js', 'utf8');
eval(content);

function testSmartSearch(q) {
  const rawTerms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const normTerms = rawTerms.map(normalizeTerm);

  let total = 0;
  let solutions = 0;
  let matchesList = [];

  siteSearchIndex.forEach(item => {
    const rawHaystack = (item.title + ' ' + item.desc + ' ' + (item.keywords || '') + ' ' + (item.badge || '')).toLowerCase();
    const haystackWords = rawHaystack.split(/[\s,.;:()&/\\-]+/).filter(Boolean);
    const normHaystackWords = haystackWords.map(normalizeTerm);

    const isMatch = rawTerms.every((term, idx) => {
      // 1. Direct substring
      if (rawHaystack.includes(term)) return true;
      // 2. Normalized term match
      const nTerm = normTerms[idx];
      if (normHaystackWords.some(hw => hw === nTerm || hw.startsWith(nTerm) || nTerm.startsWith(hw))) return true;
      return false;
    });

    if (isMatch) {
      total++;
      if (item.category === 'Solutions') solutions++;
      matchesList.push(`[${item.category}] ${item.title}`);
    }
  });

  console.log(`\nQUERY: "${q}" => Total: ${total}, Solutions: ${solutions}`);
  matchesList.forEach(m => console.log('  ' + m));
}

testSmartSearch('comply');
testSmartSearch('complying');
testSmartSearch('compliance');
testSmartSearch('alignment');
testSmartSearch('align');
testSmartSearch('services');
testSmartSearch('solutions');
testSmartSearch('auditing');
testSmartSearch('consultant');
