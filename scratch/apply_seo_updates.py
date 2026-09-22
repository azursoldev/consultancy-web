#!/usr/bin/env python3
"""
Comprehensive SEO Optimization Script for amstel.ng
1. Standardizes all canonical tags to https://amstel.ng/...
2. Adds Open Graph and Twitter Card tags.
3. Injects Schema.org JSON-LD structured data:
   - Organization/ProfessionalService schema on index.html and about.html
   - Service schema on core service pages
   - FAQPage schema on faq.html
"""

import os
import re
import json

BASE_URL = "https://amstel.ng"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Canonical mapping for each file
CANONICAL_MAP = {
    "index.html": f"{BASE_URL}/",
    "services/index.html": f"{BASE_URL}/services/",
    "services/compliance-audit-return.html": f"{BASE_URL}/services/compliance-audit-return.html",
    "services/data-protection-audit.html": f"{BASE_URL}/services/data-protection-audit.html",
    "services/outsourced-dpo.html": f"{BASE_URL}/services/outsourced-dpo.html",
    "services/data-privacy-training.html": f"{BASE_URL}/services/data-privacy-training.html",
    "about.html": f"{BASE_URL}/about.html",
    "contact.html": f"{BASE_URL}/contact.html",
    "faq.html": f"{BASE_URL}/faq.html",
    "legal/faq.html": f"{BASE_URL}/faq.html",
    "blog/index.html": f"{BASE_URL}/blog/",
    "blog/complying-with-ndpa-2023.html": f"{BASE_URL}/blog/complying-with-ndpa-2023.html",
    "publication-detail.html": f"{BASE_URL}/publication-detail.html",
    "charles-odetola.html": f"{BASE_URL}/charles-odetola.html",
    "martha-jowah.html": f"{BASE_URL}/martha-jowah.html",
    "search.html": f"{BASE_URL}/search.html",
    "privacy-statement.html": f"{BASE_URL}/privacy-statement.html",
    "legal/privacy-statement.html": f"{BASE_URL}/privacy-statement.html",
    "privacy-policy.html": f"{BASE_URL}/privacy-statement.html",
    "legal/privacy-policy.html": f"{BASE_URL}/privacy-statement.html",
    "cookie-policy.html": f"{BASE_URL}/cookie-policy.html",
    "legal/cookie-policy.html": f"{BASE_URL}/cookie-policy.html",
    "terms-of-service.html": f"{BASE_URL}/terms-of-service.html",
    "legal/terms-of-service.html": f"{BASE_URL}/terms-of-service.html",
    "legal-disclaimer.html": f"{BASE_URL}/legal-disclaimer.html",
    "legal/legal-disclaimer.html": f"{BASE_URL}/legal-disclaimer.html",
}

# Rich Schema snippets
ORGANIZATION_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Amstel Consulting",
    "legalName": "Amstel Tech Compliance and Consulting Limited",
    "url": "https://amstel.ng",
    "logo": "https://amstel.ng/logo.png",
    "image": "https://amstel.ng/logo.png",
    "description": "Accredited Data Protection Compliance Organisation (DPCO) licensed by the Nigeria Data Protection Commission (NDPC). Specialising in statutory CAR filing, Outsourced DPO, and Data Protection Audits under NDPA 2023.",
    "telephone": "+234 (0) 803 000 0000",
    "email": "info@amstel.ng",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "NG",
        "addressLocality": "Lagos",
        "addressRegion": "Lagos State"
    },
    "sameAs": [
        "https://www.linkedin.com/company/amstel-consulting"
    ],
    "knowsAbout": [
        "Nigeria Data Protection Act 2023 (NDPA)",
        "Compliance Audit Return (CAR) Filing",
        "Outsourced Data Protection Officer (DPO)",
        "Data Protection Impact Assessment (DPIA)",
        "NDPC Whitelist Compliance"
    ]
}

CAR_SERVICE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Compliance Audit Return (CAR) Statutory Filing",
    "serviceType": "Regulatory Compliance & Audit Filing",
    "provider": {
        "@type": "ProfessionalService",
        "name": "Amstel Consulting",
        "url": "https://amstel.ng"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
    },
    "description": "Preparation, assurance verification, and official portal filing of annual Compliance Audit Returns (CAR) with the Nigeria Data Protection Commission (NDPC)."
}

DPO_SERVICE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Outsourced Data Protection Officer (DPO-as-a-Service)",
    "serviceType": "Data Protection Officer Designation & Governance",
    "provider": {
        "@type": "ProfessionalService",
        "name": "Amstel Consulting",
        "url": "https://amstel.ng"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
    },
    "description": "Accredited external Data Protection Officer designation, direct NDPC regulatory liaison, and continuous data privacy governance under the NDPA 2023."
}

AUDIT_SERVICE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise Data Protection Audit",
    "serviceType": "Data Protection Audit & Privacy Risk Assessment",
    "provider": {
        "@type": "ProfessionalService",
        "name": "Amstel Consulting",
        "url": "https://amstel.ng"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
    },
    "description": "Comprehensive enterprise privacy audit, Records of Processing Activities (ROPA) mapping, and DPIA risk assessments by licensed DPCO lead auditors."
}

TRAINING_SERVICE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Corporate Data Privacy & NDPA Training",
    "serviceType": "Workforce Capacity Building & Executive Training",
    "provider": {
        "@type": "ProfessionalService",
        "name": "Amstel Consulting",
        "url": "https://amstel.ng"
    },
    "areaServed": {
        "@type": "Country",
        "name": "Nigeria"
    },
    "description": "Corporate privacy workshops, workforce data handling courses, and executive boardroom briefings on Nigeria Data Protection Act (NDPA) compliance."
}

FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is a Data Protection Compliance Organisation (DPCO)?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A DPCO is an organisation licensed by the Nigeria Data Protection Commission (NDPC) to provide data protection compliance, auditing, consulting, and training services to data controllers and processors under the Nigeria Data Protection Act 2023."
            }
        },
        {
            "@type": "Question",
            "name": "Who is required to file an annual Compliance Audit Return (CAR)?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Under the NDPA 2023 and NDPC regulations, organisations designated as Data Controllers and Data Processors of Major Importance (DCMI) that process personal data exceeding statutory thresholds are required to conduct an annual audit and file a CAR through a licensed DPCO."
            }
        },
        {
            "@type": "Question",
            "name": "What is the deadline for filing the annual CAR?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The statutory deadline for filing the annual Compliance Audit Return with the NDPC is March 31st of each calendar year."
            }
        },
        {
            "@type": "Question",
            "name": "Why should an organisation appoint an Outsourced DPO?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Appointing an outsourced DPO provides immediate access to seasoned privacy legal counsel and certified auditors without the overhead of a full-time executive salary, while fulfilling statutory NDPA requirements and ensuring conflict-free independent oversight."
            }
        }
    ]
}

def process_file(rel_path):
    abs_path = os.path.join(PROJECT_ROOT, rel_path)
    if not os.path.exists(abs_path):
        print(f"Skipping missing: {rel_path}")
        return

    with open(abs_path, "r", encoding="utf-8") as f:
        content = f.read()

    canonical_url = CANONICAL_MAP.get(rel_path, f"{BASE_URL}/{rel_path}")

    # 1. Update/Add Canonical Tag
    canonical_tag = f'<link rel="canonical" href="{canonical_url}">'
    if re.search(r'<link\s+rel=["\']canonical["\'][^>]*>', content, flags=re.IGNORECASE):
        content = re.sub(
            r'<link\s+rel=["\']canonical["\'][^>]*>',
            canonical_tag,
            content,
            flags=re.IGNORECASE
        )
    else:
        content = re.sub(r'(</title>)', r'\1\n  ' + canonical_tag, content, flags=re.IGNORECASE)

    # Clean old mentions of amstelconsulting.ng in description
    content = content.replace("Amstel Consulting Ltd (amstelconsulting.ng)", "Amstel Consulting Ltd (amstel.ng)")

    # 2. Extract Title and Description for Open Graph tags
    title_m = re.search(r'<title>(.*?)</title>', content, flags=re.DOTALL)
    title = title_m.group(1).strip() if title_m else "Amstel Consulting — Licensed DPCO & Regulatory Advisory"

    desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content="([^"]*)"', content, flags=re.DOTALL | re.IGNORECASE)
    if not desc_m:
        desc_m = re.search(r'<meta\s+name=["\']description["\']\s+content=\'([^\']*)\'', content, flags=re.DOTALL | re.IGNORECASE)
    if not desc_m:
        desc_m = re.search(r'<meta\s+content="([^"]*)"\s+name=["\']description["\']', content, flags=re.DOTALL | re.IGNORECASE)
    desc = re.sub(r'\s+', ' ', desc_m.group(1).strip()) if desc_m else "Amstel Consulting is Nigeria's premier licensed DPCO advisory firm providing statutory CAR filing, Outsourced DPO, and Data Protection Audits."

    # Build OG & Twitter Card block
    og_block = f"""  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="{"website" if rel_path in ("index.html", "about.html", "contact.html") else "article"}">
  <meta property="og:site_name" content="Amstel Consulting">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{BASE_URL}/logo.png">

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="{canonical_url}">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="{BASE_URL}/logo.png">"""

    # Check if OG tags already exist; if so, replace them; if not, inject before </head>
    if "<!-- Open Graph" in content:
        # replace existing block
        content = re.sub(
            r'<!-- Open Graph.*?<!-- Twitter.*?<meta name="twitter:image"[^>]*>',
            og_block,
            content,
            flags=re.DOTALL
        )
    else:
        content = content.replace("</head>", f"{og_block}\n</head>")

    # 3. Inject Specific Schema.org JSON-LD
    schema_to_inject = None
    if rel_path in ("index.html", "about.html"):
        schema_to_inject = ORGANIZATION_SCHEMA
    elif rel_path == "services/compliance-audit-return.html":
        schema_to_inject = CAR_SERVICE_SCHEMA
    elif rel_path == "services/outsourced-dpo.html":
        schema_to_inject = DPO_SERVICE_SCHEMA
    elif rel_path == "services/data-protection-audit.html":
        schema_to_inject = AUDIT_SERVICE_SCHEMA
    elif rel_path == "services/data-privacy-training.html":
        schema_to_inject = TRAINING_SERVICE_SCHEMA
    elif rel_path in ("faq.html", "legal/faq.html"):
        schema_to_inject = FAQ_SCHEMA

    if schema_to_inject:
        schema_str = json.dumps(schema_to_inject, indent=2)
        schema_block = f'  <script type="application/ld+json">\n{schema_str}\n  </script>'
        if '<script type="application/ld+json">' not in content:
            content = content.replace("</head>", f"{schema_block}\n</head>")

    with open(abs_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Optimized: {rel_path} -> canonical: {canonical_url}")

def main():
    for path in CANONICAL_MAP:
        process_file(path)
    print("\nAll HTML files successfully optimized for SEO!")

if __name__ == "__main__":
    main()
