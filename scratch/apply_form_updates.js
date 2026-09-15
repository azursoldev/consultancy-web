const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update js/compliance-form.js
let compForm = fs.readFileSync(path.join(rootDir, 'js', 'compliance-form.js'), 'utf8');

// Remove placeholders
compForm = compForm.replace(
  '<input type="text" name="fullName" class="compliance-input" placeholder="e.g. Tunde Adeyemi" required>',
  '<input type="text" name="fullName" class="compliance-input" required>'
);
compForm = compForm.replace(
  '<input type="email" name="email" class="compliance-input" placeholder="tunde@organization.ng" required>',
  '<input type="email" name="email" class="compliance-input" required>'
);
compForm = compForm.replace(
  '<input type="text" name="company" class="compliance-input" placeholder="e.g. Apex FinTech PLC (Banking & Finance)" required>',
  '<input type="text" name="company" class="compliance-input" required>'
);
compForm = compForm.replace(
  '<input type="tel" name="phone" class="compliance-input" placeholder="+234 (0) 803 000 0000">',
  '<input type="tel" name="phone" class="compliance-input">'
);
compForm = compForm.replace(
  '<textarea name="message" class="compliance-textarea" placeholder="Briefly describe your current timeline or business goals..."></textarea>',
  '<textarea name="message" class="compliance-textarea"></textarea>'
);

// Remove "Verification Desk" from form guarantee note
compForm = compForm.replace(
  '<span>NDA Protected &bull; Licensed DPCO Verification Desk</span>',
  '<span>NDA Protected &bull; Licensed DPCO</span>'
);

fs.writeFileSync(path.join(rootDir, 'js', 'compliance-form.js'), compForm, 'utf8');
console.log('Updated js/compliance-form.js');

// 2. Update services/data-protection-audit.html & service-audit.html
const auditFiles = [
  path.join(rootDir, 'services', 'data-protection-audit.html'),
  path.join(rootDir, 'service-audit.html')
];

auditFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Remove "diagnostic"
    content = content.replace(
      'customized diagnostic audit roadmap',
      'customized audit roadmap'
    );
    // Remove "Desk" from badge
    content = content.replace(
      '<span class="compliance-form-badge">Enterprise Audit Desk</span>',
      '<span class="compliance-form-badge">Enterprise Audit</span>'
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${path.basename(file)}`);
  }
});

// 3. Update data-privacy-training files to remove "Desk" from form badge
const trainingFiles = [
  path.join(rootDir, 'services', 'data-privacy-training.html'),
  path.join(rootDir, 'data-privacy-training.html'),
  path.join(rootDir, 'service-training.html')
];

trainingFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(
      '<span class="compliance-form-badge">Workforce Training Desk</span>',
      '<span class="compliance-form-badge">Workforce Training</span>'
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${path.basename(file)}`);
  }
});

// 4. Also check service-dpia.html for diagnostic
const dpiaFile = path.join(rootDir, 'service-dpia.html');
if (fs.existsSync(dpiaFile)) {
  let content = fs.readFileSync(dpiaFile, 'utf8');
  content = content.replace('Statutory Section 28 & High-Risk Diagnostic', 'Statutory Section 28 & High-Risk Assessment');
  content = content.replace('diagnostic screening', 'risk screening');
  fs.writeFileSync(dpiaFile, content, 'utf8');
  console.log('Updated service-dpia.html');
}
