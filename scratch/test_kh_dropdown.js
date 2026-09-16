const fs = require('fs');

const header = fs.readFileSync('js/header.js', 'utf8');
const footer = fs.readFileSync('js/footer.js', 'utf8');

console.log('Header has Knowledge Hub dropdown:', header.includes('<span>Knowledge Hub</span>') && header.includes('Complying With NDPA 2023'));
console.log('Header has Complying With NDPA 2023:', header.includes('Complying With NDPA 2023'));
console.log('Header has Regulatory Guidance:', header.includes('Regulatory Guidance'));
console.log('Header has Artificial Intelligence Tracker:', header.includes('Artificial Intelligence Tracker'));
console.log('Header has View All:', header.includes('View All</a>'));
console.log('Footer has View All:', footer.includes('View All</a>'));
