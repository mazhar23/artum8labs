# SEO Audit Report — Artum8 Labs
**Date:** 2026-09-10  
**Site:** https://www.artum8labs.com/  
**Scope:** Full site technical + on-page + content audit  
**Pages Audited:** index.html, about.html, contact.html, services, portfolio, privacy, terms, 404, and all `pages/` variants

---

## Executive Summary

Overall SEO health is **strong structurally** but has **critical canonicalization issues** that will dilute ranking signals and cause indexation confusion. The site has excellent foundational elements: clean HTML, unique titles/meta descriptions on every page, proper heading structure, comprehensive JSON-LD, good internal linking, and solid E-E-A-T signals. 

**Top 3 Priority Issues:**
1. **6 pages have self-sabotaging canonical tags** pointing to `/pages/...` URLs instead of the clean rewrite URLs (`/services`, `/portfolio`, `/team`, `/success-stories`, `/innovation-lab`, `/inquiry`)
2. **4 valid rewrite targets missing from XML sitemap** (`/team`, `/success-stories`, `/innovation-lab`, `/inquiry`)
3. **No WebP/image optimization pipeline** — all imagery is PNG/SVG/JPEG without modern format delivery

---

## Technical SEO Findings

### 1. Canonicalization Failure on 6 Pages
**Impact:** HIGH — Directly causes duplicate content signals and wastes link equity  
**Evidence:** `pages/services_deep_dive.html:9`, `pages/portfolio_showcase.html:9`, `pages/about_team_universe.html:9`, `pages/client_success_hub.html:9`, `pages/innovation_lab.html:9`, `pages/inquiry.html:9` all have canonical URLs pointing to `/pages/...` paths.

**Context:** Vercel rewrites clean URLs (`/services`, `/portfolio`, etc.) to these `/pages/...` files. This means:
- Google sees two URLs with identical content: `https://www.artum8labs.com/services` AND `https://www.artum8labs.com/pages/services_deep_dive.html`
- The canonical tag tells Google "the `/pages/...` version is the real one" — but that URL is never linked to externally, never submitted in sitemap, and looks like an internal implementation detail
- Link equity from internal links pointing to `/services` gets fragmented

**Fix:** Update canonicals in all 6 `pages/` files to match their vercel.json rewrite targets:

| File | Current Canonical (WRONG) | Should Be |
|------|---------------------------|-----------|
| `pages/services_deep_dive.html` | `/pages/services_deep_dive.html` | `/services` |
| `pages/portfolio_showcase.html` | `/pages/portfolio_showcase.html` | `/portfolio` |
| `pages/about_team_universe.html` | `/pages/about_team_universe.html` | `/team` |
| `pages/client_success_hub.html` | `/pages/client_success_hub.html` | `/success-stories` |
| `pages/innovation_lab.html` | `/pages/innovation_lab.html` | `/innovation-lab` |
| `pages/inquiry.html` | `/pages/inquiry.html` | `/inquiry` |

---

### 2. Sitemap Missing 4 Valid Public URLs
**Impact:** MEDIUM — Google may not discover or prioritize these pages  
**Evidence:** `sitemap.xml` contains only 8 URLs. `vercel.json` defines 8 rewrite targets, but 4 are absent from sitemap.

**Missing from sitemap:**
- `https://www.artum8labs.com/team`
- `https://www.artum8labs.com/success-stories`
- `https://www.artum8labs.com/innovation-lab`
- `https://www.artum8labs.com/inquiry`

**Fix:** Add these 4 URLs to `sitemap.xml` with appropriate priorities (0.8-0.9).

---

### 3. Missing JSON-LD on Key Pages
**Impact:** MEDIUM — Lost rich result opportunities and weaker entity recognition  
**Evidence:**
- `pages/services_deep_dive.html` — **No JSON-LD at all**
- `pages/portfolio_showcase.html` — Only minimal `CollectionPage` schema; no `Organization` back-reference, no items listed

**Fix:**
- Add `Service` array schema to `services_deep_dive.html` (link back to `#organization`)
- Expand `portfolio_showcase.html` schema to include `ItemList` or individual `CreativeWork` entries for case studies

---

### 4. Image Format Optimization
**Impact:** MEDIUM — Slower LCP, higher bandwidth costs  
**Evidence:** 100+ image references found. All local images are PNG/SVG. No WebP or AVIF variants detected in the `images/` directory listing. External Unsplash images use `auto=format` which is good, but local PNGs (e.g., `AI-Powered Automation.png` at ~1.4MB, `Collaboration Rooms.png` at ~1.4MB) are large.

**Fix:**
- Convert PNGs to WebP/AVIF
- Implement `<picture>` element with fallbacks
- Consider lazy-loading non-critical images below the fold (many already have `loading="lazy"` — good)

---

### 5. Duplicate Root-Level HTML Files (RESOLVED)
**Status:** FIXED — Removed duplicate copies. The site now ships a single file per route: root-level `*.html` for top-level pages and `services/*.html` (plus intentional keyword-alias files) for service routes. The `pages/` directory, per-route `index.html` copies, and directory duplicates were deleted; `vercel.json` rewrites, `middleware.js` markdown routes, and internal `/pages/...` links were repointed to the canonical files. `tailwind.config.js` content globs updated accordingly.

---

## On-Page SEO Findings

### Strengths
- **Unique title tags** on all 11+ pages (50-70 chars, brand at end)
- **Unique meta descriptions** on all pages (150-160 chars, clear value prop)
- **Exactly one H1 per page** across all audited pages
- **Descriptive H2s** used throughout for content structure
- **All images have alt text** — no empty or missing alt attributes
- **Lazy loading** implemented on most below-fold images and all map iframes
- **Semantic HTML** — proper `<nav>`, `<main>`, `<footer>`, `<section>` usage
- **Skip links** present on several pages for accessibility

### Issues

**A. Title Tag Length Variance**
- Some titles are excellent (e.g., homepage at ~90 chars will be truncated)
- `services.html` title: "Services - Artum8 Labs | Web Applications, 3D Websites, Fintech & Healthtech" — good
- `index.html` title: "Artum8 Labs — Digital Innovation Studio | Web Applications, 3D Experiences, Fintech & Healthtech Solutions" — slightly long

**B. Internal Linking — Absolute Clean-URL Paths (RESOLVED)**
- Navigation now uses absolute clean-URL paths (`/services`, `/portfolio`, etc.) across all templates; no `/pages/...` links remain.

**Status:** FIXED — All internal links standardized to absolute clean-URL paths.

---

## Content Quality Assessment

### E-E-A-T Signals: STRONG
- **Founder credentials** visible (Mazhar Khan, Lead Full-Stack Architect)
- **Contact information** prominent on contact page
- **Structured data** on homepage without self-serving aggregate/rating markup (removed to align with Google review-policy)
- **Detailed case studies** with client names and metrics
- **Trust pages** (Privacy, Terms, About) all present and populated
- **Physical addresses** in 3 locations with embedded maps

### Content Depth
- Homepage is comprehensive (~2100 lines, 6800+ chars raw text)
- Services page covers 4 verticals in detail
- Portfolio has 6 case studies with metrics
- About page includes philosophy, leadership, and global hubs

### Thin Content Concerns
- `pages/portfolio_showcase.html` — CollectionPage schema but no individual case study markup
- Legal pages are standard but adequate

---

## Schema Markup Assessment

### Excellent Coverage
- **Homepage (`index.html`):** Complete `@graph` with Organization, 4× Service, FAQPage (5 Q&As), BreadcrumbList, WebSite, 3× Place — **exceptional**
- **About page:** Full Organization + ProfessionalService schema
- **Contact page:** ContactPage + Organization + 3× Place
- **Privacy/Terms:** WebPage + BreadcrumbList

### Gaps
- **Services page:** No JSON-LD whatsoever
- **Portfolio page:** Minimal CollectionPage only
- **No `VideoObject` schema** despite video backgrounds
- **No `Article`/`BlogPosting` schema** for any content

---

## Crawlability & Indexation

### Robots.txt: GOOD
```
User-agent: *
Allow: /
Disallow: /404.html
Sitemap: https://www.artum8labs.com/sitemap.xml
```
- Clean, allows all important content
- Sitemap reference present

### XML Sitemap: NEEDS EXPANSION
- Current: 8 URLs
- Missing: `/team`, `/success-stories`, `/innovation-lab`, `/inquiry`
- Priority scheme is reasonable (1.0 home, 0.9 core pages, 0.7 llms.txt, 0.6 legal)

### Vercel Configuration: EXCELLENT
- Clean rewrites without SPA catch-all
- Proper `Vary: Accept, Accept-Encoding` headers
- Markdown content negotiation working
- No redirect chains detected

### Mobile-Friendliness: GOOD
- Responsive viewport meta on all pages
- Tailwind responsive classes throughout
- No horizontal scroll indicators
- Touch targets appear adequate

---

## Prioritized Action Plan

### Critical (Blocking Rankings)
1. **Fix 6 canonical tags** in `pages/` files to point to clean URLs (`/services`, `/portfolio`, `/team`, `/success-stories`, `/innovation-lab`, `/inquiry`)
2. **Add 4 missing URLs to sitemap.xml** (`/team`, `/success-stories`, `/innovation-lab`, `/inquiry`)

### High Impact
3. **Add JSON-LD to `services_deep_dive.html`** — Service schema with Organization provider
4. **Expand portfolio schema** — Add ItemList or individual CreativeWork entries
5. **Convert internal links in `pages/` to absolute paths** — Update all `/pages/...` hrefs to match vercel.json rewrites

### Quick Wins
6. **Convert top local PNGs to WebP** — Start with `AI-Powered Automation.png` and `Collaboration Rooms.png` (each ~1.4MB)
7. **Add `width`/`height` attributes** to all `<img>` tags missing them (prevents CLS)
8. **Add `lang` attributes** to any embedded content iframes

### Long-term
9. **Consolidate duplicate HTML files** — Choose one directory structure (root or `pages/`)
10. **Add hreflang if expanding to other languages/regions**
11. **Implement image CDN** for automatic format optimization
12. **Add `VideoObject` schema** for background video on homepage

---

## Validation Checklist
- [ ] Run Google Rich Results Test on all pages after schema fixes
- [ ] Submit updated sitemap in Google Search Console
- [ ] Use URL Inspection tool to request indexing for fixed canonicals
- [ ] Run PageSpeed Insights after WebP conversion
- [ ] Verify no 404s in Search Console Coverage report
- [ ] Check for duplicate title/description warnings in Search Console

---

## Files Requiring Changes
| File | Issue | Priority |
|------|-------|----------|
| `pages/services_deep_dive.html` | Wrong canonical + no JSON-LD | CRITICAL |
| `pages/portfolio_showcase.html` | Wrong canonical + minimal schema | CRITICAL |
| `pages/about_team_universe.html` | Wrong canonical | CRITICAL |
| `pages/client_success_hub.html` | Wrong canonical | CRITICAL |
| `pages/innovation_lab.html` | Wrong canonical | CRITICAL |
| `pages/inquiry.html` | Wrong canonical | CRITICAL |
| `sitemap.xml` | Missing 4 URLs | CRITICAL |
| `pages/services_deep_dive.html` | No JSON-LD | HIGH |
| `pages/portfolio_showcase.html` | Weak JSON-LD | HIGH |
| All `pages/*.html` files | Relative internal links | MEDIUM |
| `images/` directory | No WebP/AVIF | MEDIUM |

---

## Notes
- Schema detection via static file review may miss JS-injected markup. Verify with [Google Rich Results Test](https://search.google.com/test/rich-results).
- All existing JSON-LD on audited pages is syntactically valid and follows schema.org specs.
- No `noindex` tags found — good.
- No redirect chains detected in vercel.json.
- HTTPS assumed (not verifiable from static files alone).
