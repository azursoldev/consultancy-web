/**
 * Amstel Consulting — Centralised Search Data Index & Matcher
 * Single Source of Truth for Search Queries across Modal and Dedicated Search Page
 * Contains active, approved website pages (Core Solutions, Knowledge Hub, Organisation, Legal, Contact)
 */

// Universal search normaliser / stemmer for robust query matching
window.normalizeSearchTerm = function (word) {
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
  if (w.startsWith('penalt') || w.startsWith('fine')) return 'penalt';

  if (w.endsWith('ies')) w = w.slice(0, -3) + 'y';
  else if (w.endsWith('ing') && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith('ment') && w.length > 6) w = w.slice(0, -4);
  else if (w.endsWith('tion') && w.length > 6) w = w.slice(0, -4);
  else if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) w = w.slice(0, -1);
  else if (w.endsWith('ed') && w.length > 4) w = w.slice(0, -2);
  
  return w;
};

// Check whether an indexed item matches a search query
window.matchSearchItem = function (item, query) {
  if (!query || !query.trim()) return true;
  const rawTerms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (rawTerms.length === 0) return true;

  const rawHaystack = (
    (item.title || '') + ' ' + 
    (item.desc || '') + ' ' + 
    (item.keywords || '') + ' ' + 
    (item.badge || '') + ' ' + 
    (item.category || '')
  ).toLowerCase();

  const normTerms = rawTerms.map(window.normalizeSearchTerm);
  const haystackWords = rawHaystack.split(/[\s,.;:()&/\\-]+/).filter(Boolean);
  const normHaystackWords = haystackWords.map(window.normalizeSearchTerm);

  // Every query term must match in some form
  return rawTerms.every((term, idx) => {
    // 1. Direct substring match
    if (rawHaystack.includes(term)) return true;
    
    // 2. Normalised stem match
    const nTerm = normTerms[idx];
    if (!nTerm) return false;
    return normHaystackWords.some(hw => hw === nTerm || hw.startsWith(nTerm) || nTerm.startsWith(hw));
  });
};

window.siteSearchIndex = [
  {
    id: 'solutions-hub',
    title: 'Our Solutions: Enterprise Data Protection Compliance & Security',
    url: 'services/index.html',
    category: 'Solutions',
    badge: 'Our Solutions',
    desc: 'Explore Amstel Consulting comprehensive data protection compliance services: Annual CAR Filing, Outsourced DPO, Comprehensive Audits, and Staff Privacy Training.',
    keywords: 'our solutions services all services enterprise data protection compliance security car filing outsourced dpo audits training advisory consultants nigeria ndpa 2023 alignment align comply complying compliant legal practice'
  },
  {
    id: 'car-filing',
    title: 'Statutory Compliance Audit Return (CAR) Filing',
    url: 'services/compliance-audit-return.html',
    category: 'Solutions',
    badge: 'Statutory Filing',
    desc: 'Mandatory annual NDPA 2023 compliance audit return filing preparation, assurance, documentation compilation, and official portal submission to the NDPC before March 15 deadline.',
    keywords: 'car filing annual compliance audit return ndpc ndpa 2023 statutory deadline penalty fines licensed dpco audit rules regulations returns march 15 portal certificate assurance mandate comply complying compliant alignment align services solutions consulting consultant'
  },
  {
    id: 'outsourced-dpo',
    title: 'Licensed Outsourced DPO (DPO-as-a-Service)',
    url: 'services/outsourced-dpo.html',
    category: 'Solutions',
    badge: 'Advisory Liaison',
    desc: 'Legally mandated external Data Protection Officer designation, ongoing compliance monitoring, regulatory representation, privacy attorney network access, and direct NDPC liaison.',
    keywords: 'dpo outsourced data protection officer dpoaas representation contact liaison advisory ndpa officer dcmi compliance comply compliant complying legal privacy conflict alignment align services solutions consulting consultant hire appoint designated officer'
  },
  {
    id: 'data-protection-audit',
    title: 'Comprehensive Data Protection Audits & Governance',
    url: 'services/data-protection-audit.html',
    category: 'Solutions',
    badge: 'Technical Audit',
    desc: 'End-to-end evaluation of organisational data flows, technical cybersecurity posture, penetration testing, ROPA mapping, DPIAs, breach response protocols, and corporate Privacy Notices.',
    keywords: 'audit audits auditing assessment privacy assessment ndpa gap analysis security controls ndpc dpco audit rules regulations verification risk assessment ropa record of processing activities dpia notices cybersecurity cyber penetration testing pen test breach response 72 hours incident protocol notification hardening section 39 section 40 vulnerability policies vendor dpa contracts cookie consent telemetry technical audit comply compliance compliant alignment align services solutions consulting consultant'
  },
  {
    id: 'data-privacy-training',
    title: 'Data Privacy Training for (Staff Awareness Certification)',
    url: 'services/data-privacy-training.html',
    category: 'Solutions',
    badge: 'Capacity Building',
    desc: 'Fulfil your statutory training requirements under Section 31 of the NDPA without disrupting business operations. Practical workforce awareness, compliance certificate tracking, and simulated breach drills.',
    keywords: 'training education masterclass workforce awareness staff training ndpa certification privacy skills compliance comply compliant course elearning section 31 staff phish simulation certificate alignment align services solutions capacity building executive training'
  },
  {
    id: 'vapt-services',
    title: 'Vulnerability Assessment and Penetration Testing (VAPT)',
    url: 'services/vapt-services.html',
    category: 'Solutions',
    badge: 'Cybersecurity',
    desc: 'Specialist-led Vulnerability Assessment and Penetration Testing services across web applications, mobile apps, APIs, networks, and cloud infrastructure.',
    keywords: 'vapt vulnerability assessment penetration testing pentest security testing web application mobile app api network cloud owasp remediation infrastructure cyber cybersecurity technical security'
  },
  {
    id: 'executive-checklist',
    title: 'NDPA 2023 Alignment: A Strategic Checklist for Public and Private Sector Executives',
    url: 'publication-detail.html',
    category: 'Knowledge Hub',
    badge: 'Complying With NDPA 2023',
    desc: 'Proactive alignment strategy for C-suite leaders and founders. The top 5 strategic NDPA requirements to mitigate regulatory risk, prevent statutory fines of up to 2% of annual revenue, and ensure operational continuity.',
    keywords: 'checklist executive ndpa 2023 alignment align aligning strategic c-suite board directors fines 2 percent lawful basis breach 72 hours dpia dpo car filing audit circulars regulations ndpa alignment strategic checklist public sector private sector executives compliance comply complying guide proactive mitigation statutory requirements article publication complying with ndpa knowledge hub whitepaper'
  },
  {
    id: 'regulatory-guidance',
    title: 'Regulatory Guidance — Practical Compliance Explanations',
    url: 'regulatory-guidance.html',
    category: 'Knowledge Hub',
    badge: 'Regulatory Guidance',
    desc: 'Clear guidance for an evolving data-protection environment covering CAR filings, major-importance obligations, DPO duties, DPIAs, and cross-border transfers.',
    keywords: 'regulatory guidance framework car filing major importance dpo dpia breach notification cross border transfers vendor management ndpa 2023 ndpc directives'
  },
  {
    id: 'dpo-nin-requirement',
    title: 'Must a Data Protection Officer Be Nigerian? Examining the NDPC’s NIN Requirement',
    url: 'must-a-data-protection-officer-be-nigerian.html',
    category: 'Knowledge Hub',
    badge: 'Regulatory Analysis',
    desc: 'Examining whether a Data Protection Officer must be a Nigerian citizen or resident under the NDPA 2023 and the NDPC NIN requirement for DPCO licensing.',
    keywords: 'must a data protection officer be nigerian nin requirement ndpc national identification number dpco licence application data protection officer citizenship residency foreign dpo section 32 section 33'
  },
  {
    id: 'ai-tracker',
    title: 'Artificial Intelligence Regulatory Tracker',
    url: 'ai-regulatory-tracker.html',
    category: 'Knowledge Hub',
    badge: 'AI Tracker',
    desc: 'Monitoring AI governance, legislation, automated decision-making policies, and algorithmic accountability across Nigeria, Africa, and international markets.',
    keywords: 'artificial intelligence regulatory tracker ai machine learning algorithms automated decisions generative ai tech governance llm compliance safety ethics knowledge hub technology data privacy africa nigeria'
  },
  {
    id: 'about-organisation',
    title: 'Our Organisation: About Amstel Consulting',
    url: 'about.html',
    category: 'Organisation',
    badge: 'Company Profile',
    desc: 'Amstel Consulting Ltd is a premier licensed Data Protection Compliance Organisation (DPCO) bridging statutory regulations with corporate operations, providing plain-language compliance and cybersecurity defence.',
    keywords: 'about us organisation amstel consulting ltd mission principles leadership integrity corporate governance profile lagos abuja values credentials team advisory board consultants alignment align comply compliance'
  },
  {
    id: 'dpco-status',
    title: 'Licensed DPCO Status & Regulatory Verification',
    url: 'licensed-dpco-status.html',
    category: 'Organisation',
    badge: 'Statutory Credential',
    desc: 'Official licensing status, RC number, DPCO licence number, issuing authority, and NDPC registry verification details for Amstel Consulting.',
    keywords: 'licensed dpco status rc number licence number credentials verification ndpc authority issuing renewal date register compliance audit organisation'
  },
  {
    id: 'dpco-credentials',
    title: 'AMSTEL CONSULTING IS AN NDPC LICENSED DPCO',
    url: 'about.html#credentials',
    category: 'Organisation',
    badge: 'Accreditation',
    desc: 'Our Credentials as a Licensed DPCO authorised by the Nigeria Data Protection Commission (NDPC) to verify, assure, and submit statutory returns with institutional validity.',
    keywords: 'licensed dpco credentials authority ndpc registration certification authorisation statutory compliance organisation verification accreditation licence licensing comply compliant legal official'
  },
  {
    id: 'leadership-team',
    title: 'Team & Advisory Board — Senior Compliance Consultants',
    url: 'team.html',
    category: 'Organisation',
    badge: 'Advisory Board',
    desc: 'Multidisciplinary Advisory Board and senior consultants delivering boardroom-level privacy, regulatory, and cybersecurity guidance.',
    keywords: 'team leadership advisory board consultants partners legal practitioners privacy experts charles odetola martha jowah subhash desai oluwatosin reis esther samson femi leslie oluwabukola olasehinde'
  },
  {
    id: 'charles-odetola',
    title: 'Charles Odetola, LLM, CIPP/E — International Privacy Consultant',
    url: 'charles-odetola.html',
    category: 'Organisation',
    badge: 'Leadership',
    desc: 'International Privacy Consultant specialising in data protection, GDPR, NDPA compliance, and corporate governance with over a decade of legal practice experience.',
    keywords: 'charles odetola llm cipp/e international privacy consultant lawyer attorney privacy data protection gdpr eprivacy ndpa toms corporate governance legal risk iapp law society cmi partner team advisor'
  },
  {
    id: 'martha-jowah',
    title: 'Martha Jowah, Esq — Head of Legal & Privacy Compliance',
    url: 'martha-jowah.html',
    category: 'Organisation',
    badge: 'Leadership',
    desc: 'Accomplished legal practitioner specialising in corporate and regulatory compliance, data protection and privacy, contract management and legal risk.',
    keywords: 'martha jowah esq head of legal privacy compliance corporate regulatory contract management risk management legal practitioner lawyer attorney partner team advisor consultant'
  },
  {
    id: 'esmee-de-jong',
    title: 'Esmee de Jong — Advisory Board Member (International Expansion, Media & Communications)',
    url: 'esmee-de-jong.html',
    category: 'Organisation',
    badge: 'Advisory Board',
    desc: 'Creative entrepreneur and communications specialist advising on international expansion, audience engagement, storytelling, and corporate training design.',
    keywords: 'esmee de jong advisory board member international expansion media communications netherlands creative entrepreneurship training awareness storytelling public relations stakeholder relations partner team advisor'
  },
  {
    id: 'subhash-desai',
    title: 'Subhash Desai — Senior Advisory Board Member (Enterprise Risk & Governance)',
    url: 'subhash-desai.html',
    category: 'Organisation',
    badge: 'Advisory Board',
    desc: 'Senior risk executive with over 25 years experience leading enterprise risk, governance, and operational resilience across international markets.',
    keywords: 'subhash desai senior advisory board member enterprise risk governance operational resilience london internal controls business continuity'
  },
  {
    id: 'oluwatosin-reis',
    title: 'Oluwatosin Reis — Advisory Board Member (Global Privacy & Data Governance)',
    url: 'oluwatosin-reis.html',
    category: 'Organisation',
    badge: 'Advisory Board',
    desc: 'Dual-qualified lawyer and international privacy professional managing privacy programmes across Canada, India, the US, and Denmark.',
    keywords: 'oluwatosin reis advisory board global privacy data governance international cross-border compliance canada ontario tecsys'
  },
  {
    id: 'esther-samson',
    title: 'Esther Samson — Data Privacy Training Consultant',
    url: 'esther-samson.html',
    category: 'Organisation',
    badge: 'Leadership',
    desc: 'Data Privacy Training Consultant drawing on banking sector expertise to deliver practical employee privacy awareness and customer-data training.',
    keywords: 'esther samson data privacy training consultant banking uba fcmb kyc customer service employee education'
  },
  {
    id: 'femi-leslie',
    title: 'Femi Leslie — IT Network & Infrastructure Consultant',
    url: 'femi-leslie.html',
    category: 'Organisation',
    badge: 'Leadership',
    desc: 'IT Network Operator and infrastructure consultant connecting data protection requirements with technical controls, access management, and network security.',
    keywords: 'femi leslie it network infrastructure consultant network security access management technical troubleshooting'
  },
  {
    id: 'oluwabukola-olasehinde',
    title: 'Oluwabukola C. Olasehinde — Cybersecurity & VAPT Consultant',
    url: 'oluwabukola-olasehinde.html',
    category: 'Organisation',
    badge: 'Leadership',
    desc: 'Cybersecurity professional specialising in vulnerability assessment, penetration testing (VAPT), OWASP testing, and web-application security.',
    keywords: 'oluwabukola olasehinde cybersecurity vapt penetration testing owasp web application api vulnerability testing'
  },
  {
    id: 'career-partnerships',
    title: 'Careers & Partnerships — Work With Us',
    url: 'careers.html',
    category: 'Organisation',
    badge: 'Partnership',
    desc: 'Work with Amstel Consulting. Explore careers, independent consultant network, and strategic partnerships across Nigeria and African markets.',
    keywords: 'careers partnerships work with us partner advisory consultant jobs hiring alliance vacancies nigeria africa digital trust compliance our organisation'
  },
  {
    id: 'car-regulatory-filing',
    title: 'Annual Statutory CAR Regulatory Filing Framework',
    url: 'services/compliance-audit-return.html',
    category: 'Regulatory',
    badge: 'Statutory Returns',
    desc: 'Official regulatory filing guidelines, compliance criteria, and DPCO assurance requirements for submitting Annual Compliance Audit Returns before March 15.',
    keywords: 'regulatory filing car return statutory deadline march 15 ndpc national register compliance assurance licensed dpco audit report ndpa regulations comply compliant alignment'
  },
  {
    id: 'privacy-statement',
    title: 'Corporate Privacy Statement',
    url: 'privacy-statement.html',
    category: 'Regulatory',
    badge: 'Statutory Notice',
    desc: 'Official statement detailing our binding fiduciary commitments regarding collection, processing lawful basis, and data subject rights under NDPA 2023.',
    keywords: 'privacy statement legal rights data subject sar lawful basis gdpr ndpa fiduciary compliance terms transparency notice policy comply regulation'
  },
  {
    id: 'contact-advisory',
    title: 'Connect with Our Data Privacy & CyberSecurity Compliance Experts',
    url: 'contact.html',
    category: 'Contact',
    badge: 'Advisory Desk',
    desc: 'Connect with our senior advisory team within 4 business hours. Scoped compliance consultation, gap checks, and direct RFP engagement at our Abuja corporate offices.',
    keywords: 'contact help phone email office lagos abuja consult consultant consulting inquiry get in touch quote rfp assessment free consultation advisory desk talk to consultant initiate consultation'
  },
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    url: 'terms-of-service.html',
    category: 'Legal',
    badge: 'Legal Terms',
    desc: 'Official Terms of Service for Amstel Tech Compliance and Consulting Limited. Governing website access, DPCO services, outsourced DPO, compliance audits, and professional advisory.',
    keywords: 'terms of service terms and conditions agreement legal retainer engagement liability disclaimer contract dpco dpo amstel tech compliance'
  },
  {
    id: 'legal-disclaimer',
    title: 'Legal Disclaimer',
    url: 'legal-disclaimer.html',
    category: 'Legal',
    badge: 'Legal Terms',
    desc: 'Official Legal Disclaimer of Amstel Tech Compliance and Consulting Ltd. Regulatory guidance, DPCO advisory remit, professional engagement boundaries, and liability limitations.',
    keywords: 'legal disclaimer regulatory advisory no legal advice liability warranty terms engagement amstel consulting ndpc ndpa'
  },
  {
    id: 'cookie-notice',
    title: 'Cookie Notice',
    url: 'cookie-policy.html',
    category: 'Legal',
    badge: 'Legal Notice',
    desc: 'Official Cookie Notice of Amstel Tech Compliance and Consulting Ltd d/b/a Amstel Consulting. Explaining our use of cookies and tracking technologies under NDPA 2023 and GAID 2025.',
    keywords: 'cookie cookies cookie notice tracking telemetry gaid ndpa consent preferences analytics strictly necessary third party cookies'
  },
  {
    id: 'site-map',
    title: 'Site Map & Navigation Directory',
    url: 'sitemap.html',
    category: 'Navigation',
    badge: 'Directory',
    desc: 'Comprehensive visual site map and directory index of all services, publications, leadership biographies, and compliance resources at Amstel Consulting.',
    keywords: 'sitemap site map directory index pages navigation links architecture overview all pages sitemap.xml structure'
  }
];
