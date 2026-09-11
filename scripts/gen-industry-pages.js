/**
 * Generates client-industry website pages from content/industries.js.
 * Run: node scripts/gen-industry-pages.js
 * Output: services/website-design-for-*.html + services/for-your-industry.html
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'services');
const industries = require('../content/industries.js');

const BASE = 'https://www.artum8labs.com';
const slugName = slug => {
  const hit = industries.find(i => i.slug === slug);
  return hit ? hit.name : slug;
};

function buildJsonLd(d) {
  const graph = [
    {
      '@type': 'Service',
      name: d.name,
      description: d.desc,
      url: `${BASE}/services/${d.slug}`,
      provider: { '@type': 'Organization', name: 'Artum8 Labs', url: `${BASE}/` },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '2000',
        description: d.price,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
        { '@type': 'ListItem', position: 3, name: d.name, item: `${BASE}/services/${d.slug}` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: d.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function relatedLinks(related) {
  if (!related || !related.length) return '';
  return related
    .map(r => `<a href="/services/${r}" class="inline-block px-4 py-2 bg-secondary border border-white/10 rounded-full text-sm text-gray-300 hover:text-accent hover:border-accent/40 transition-colors duration-300">${slugName(r)}</a>`)
    .join('\n                        ');
}

const TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0a0a0f" />
    <title>{{TITLE}}</title>
    <meta name="description" content="{{DESC}}" />
    <link rel="canonical" href="{{CANONICAL}}" />

    <!-- Open Graph -->
    <meta property="og:title" content="{{TITLE}}" />
    <meta property="og:description" content="{{DESC}}" />
    <meta property="og:image" content="https://www.artum8labs.com/images/logo.png" />
    <meta property="og:url" content="{{OGURL}}" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{TITLE}}" />
    <meta name="twitter:description" content="{{DESC}}" />
    <meta name="twitter:image" content="https://www.artum8labs.com/images/logo.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/css/main.css" />

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
{{JSONLD}}
    </script>

    <!-- GA4 (Google Analytics 4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FS9T95JPNH"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FS9T95JPNH');
    </script>
</head>
<body class="bg-primary text-white overflow-x-hidden">
    <style>.skip-link{position:absolute;top:-40px;left:6px;background:#ff6b35;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;z-index:1000}.skip-link:focus{top:6px}</style>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Navigation Header -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-md border-b border-secondary/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <a href="/" class="flex items-center">
                        <img src="/images/logo.png" alt="Artum8 Labs Logo" class="h-12 w-auto" width="192" height="48" />
                    </a>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="/" class="text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm">Home</a>
                        <a href="/services" class="text-accent font-semibold px-3 py-2 rounded-md text-sm">Services</a>
                        <a href="/portfolio" class="text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm">Portfolio</a>
                        <a href="/team" class="text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm">Team</a>
                        <a href="/success-stories" class="text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm">Success Stories</a>
                        <a href="/innovation-lab" class="text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm">Innovation Lab</a>
                        <a href="/services/for-your-industry" class="text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm">For Your Industry</a>
                    </div>
                </div>
                <div class="hidden md:block">
                    <a href="/inquiry" class="btn-primary">Start Your Transformation</a>
                </div>
                <div class="md:hidden">
                    <button id="mobile-menu-button" class="text-gray-300 hover:text-accent p-2" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden bg-primary/95 backdrop-blur-md">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="/" class="text-gray-300 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a href="/services" class="text-accent block px-3 py-2 rounded-md text-base font-medium">Services</a>
                <a href="/portfolio" class="text-gray-300 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Portfolio</a>
                <a href="/team" class="text-gray-300 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Team</a>
                <a href="/success-stories" class="text-gray-300 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Success Stories</a>
                <a href="/innovation-lab" class="text-gray-300 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Innovation Lab</a>
                <a href="/automations" class="text-gray-300 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">A8 Automations</a>
            </div>
        </div>
    </nav>

    <main id="main-content">
        <!-- Hero -->
        <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-primary">
            <div class="max-w-7xl mx-auto">
                <p class="text-accent font-mono text-sm mb-4">Artum8 Labs &mdash; custom web development studio</p>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">{{H1}}</h1>
                <p class="text-xl text-gray-300 max-w-3xl leading-relaxed">{{INTRO}}</p>
                <div class="mt-8 flex flex-wrap gap-4">
                    <a href="/inquiry" class="btn-primary">Start Your Project</a>
                    <a href="/services/for-your-industry" class="btn-outline">See All Industries</a>
                </div>
            </div>
        </section>

        <!-- Pains -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl font-bold text-white mb-4">Where most {{SHORT}} sites quietly lose business</h2>
                <p class="text-gray-300 mb-12 max-w-3xl">These are the problems we see on almost every {{SHORT}} website we audit &mdash; and exactly what we fix.</p>
                <div class="grid md:grid-cols-3 gap-8">
                        {{PAINS}}
                </div>
            </div>
        </section>

        <!-- Features / What we'd build -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-secondary">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl font-bold text-white mb-4">What we&rsquo;d build for you</h2>
                <p class="text-gray-300 mb-12 max-w-3xl">Not a template with your logo swapped in. A custom build, sized to how {{SHORT}} businesses actually win customers.</p>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {{FEATURES}}
                </div>
            </div>
        </section>

        <!-- Offer / trust -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
            <div class="max-w-7xl mx-auto">
                <div class="glass-card rounded-2xl p-8 sm:p-12">
                    <h2 class="text-3xl font-bold text-white mb-6">Built on the ARC Launch Sprint</h2>
                    <p class="text-gray-300 max-w-3xl mb-8">{{PRICE}}</p>
                    <ul class="grid md:grid-cols-2 gap-4 text-gray-300">
                        <li class="flex items-start gap-3"><span class="text-accent">&#10003;</span> Code lands in <strong class="text-white">your GitHub from day one</strong> &mdash; you own everything, in writing.</li>
                        <li class="flex items-start gap-3"><span class="text-accent">&#10003;</span> You review a <strong class="text-white">live staging link at every milestone</strong> &mdash; working software, not screenshots.</li>
                        <li class="flex items-start gap-3"><span class="text-accent">&#10003;</span> <strong class="text-white">50/50 payment</strong>: deposit to start, balance at launch. No surprise invoices.</li>
                        <li class="flex items-start gap-3"><span class="text-accent">&#10003;</span> <strong class="text-white">Milestone refund gate</strong> &mdash; if the first milestone misses the agreed spec, your deposit is returned.</li>
                        <li class="flex items-start gap-3"><span class="text-accent">&#10003;</span> <strong class="text-white">Timeline SLA</strong> &mdash; 10% off per week late, capped at 25%.</li>
                        <li class="flex items-start gap-3"><span class="text-accent">&#10003;</span> <strong class="text-white">30-day post-launch warranty</strong> plus GA4 + Search Console set up and an owner&rsquo;s manual.</li>
                    </ul>
                    <div class="mt-8">
                        <a href="/inquiry" class="btn-primary">Get a Fixed-Price Quote</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-primary">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl font-bold text-white mb-12">{{SHORT}} website questions, answered</h2>
                <div class="grid md:grid-cols-2 gap-6 max-w-5xl">
                        {{FAQS}}
                </div>
            </div>
        </section>

        <!-- Cross-links -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-3xl font-bold text-white mb-8">Also designing websites for</h2>
                <div class="flex flex-wrap gap-4 max-w-4xl">
                        {{RELATED}}
                </div>
                <p class="mt-8 text-gray-400">Looking for another trade or profession? <a href="/services/for-your-industry" class="text-accent hover:underline">Browse all industries we build for</a> or <a href="/inquiry" class="text-accent hover:underline">tell us what you do</a>.</p>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-primary border-t border-secondary/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid md:grid-cols-4 gap-8">
                <div class="md:col-span-2">
                    <div class="flex items-center mb-6">
                        <img src="/images/logo.png" alt="Artum8 Labs Logo" class="h-14 w-auto" width="224" height="56" />
                    </div>
                    <p class="text-gray-300 mb-6 max-w-md">
                        Architect-led web development studio. Custom websites and web apps for local businesses &mdash; fixed price, code in your GitHub from day one, live staging at every milestone.
                    </p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-white mb-6">Quick Links</h3>
                    <ul class="space-y-3">
                        <li><a href="/" class="text-gray-300 hover:text-accent transition-colors duration-300">Home</a></li>
                        <li><a href="/services" class="text-gray-300 hover:text-accent transition-colors duration-300">Services</a></li>
                        <li><a href="/services/for-your-industry" class="text-gray-300 hover:text-accent transition-colors duration-300">For Your Industry</a></li>
                        <li><a href="/portfolio" class="text-gray-300 hover:text-accent transition-colors duration-300">Portfolio</a></li>
                        <li><a href="/team" class="text-gray-300 hover:text-accent transition-colors duration-300">Team</a></li>
                        <li><a href="/success-stories" class="text-gray-300 hover:text-accent transition-colors duration-300">Success Stories</a></li>
                        <li><a href="/automations" class="text-gray-300 hover:text-accent transition-colors duration-300">A8 Automations</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-white mb-6">Industries</h3>
                    <ul class="space-y-3">
                        {{FOOTER_LINKS}}
                    </ul>
                </div>
            </div>
            <div class="border-t border-secondary/20 mt-12 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; 2026 Artum8 Labs. All rights reserved. | <a href="/privacy" class="hover:text-accent">Privacy Policy</a> | <a href="/terms" class="hover:text-accent">Terms of Service</a></p>
            </div>
        </div>
    </footer>

    <script>
      document.getElementById('mobile-menu-button').addEventListener('click', function () {
        var menu = document.getElementById('mobile-menu');
        var expanded = this.getAttribute('aria-expanded') === 'true';
        menu.classList.toggle('hidden');
        this.setAttribute('aria-expanded', String(!expanded));
      });
    </script>
</body>
</html>
`;

function render(d) {
  let out = TEMPLATE;
  const pairs = {
    '{{TITLE}}': d.title,
    '{{DESC}}': d.desc,
    '{{CANONICAL}}': `${BASE}/services/${d.slug}`,
    '{{OGURL}}': `${BASE}/services/${d.slug}`,
    '{{H1}}': d.name,
    '{{INTRO}}': d.intro,
    '{{PRICE}}': d.price,
    '{{SHORT}}': d.short,
    '{{JSONLD}}': buildJsonLd(d),
  };
  for (const [k, v] of Object.entries(pairs)) out = out.split(k).join(v);

  out = out.split('{{PAINS}}').join(
    d.pains.map(p => `<div class="glass-card rounded-2xl p-8 h-full">
                            <h3 class="text-xl font-semibold text-white mb-3">${p.t}</h3>
                            <p class="text-gray-300 leading-relaxed">${p.d}</p>
                        </div>`).join('\n                        '));

  out = out.split('{{FEATURES}}').join(
    d.features.map(f => `<div class="glass-card rounded-2xl p-8 h-full">
                            <h3 class="text-xl font-semibold text-white mb-3">${f.t}</h3>
                            <p class="text-gray-300 leading-relaxed">${f.d}</p>
                        </div>`).join('\n                        '));

  out = out.split('{{FAQS}}').join(
    d.faqs.map(f => `<div class="glass-card rounded-2xl p-6">
                            <h3 class="text-lg font-semibold text-white mb-2">${f.q}</h3>
                            <p class="text-gray-300 leading-relaxed">${f.a}</p>
                        </div>`).join('\n                        '));

  out = out.split('{{RELATED}}').join(relatedLinks(d.related));
  out = out.split('{{FOOTER_LINKS}}').join(
    industries
      .filter(i => i.slug !== d.slug)
      .slice(0, 5)
      .map(i => `<li><a href="/services/${i.slug}" class="text-gray-300 hover:text-accent transition-colors duration-300">${i.name.replace(/Website Design for /, '')}</a></li>`)
      .join('\n                        '));

  return out;
}

function renderHub() {
  const cards = industries
    .map(i => `<div class="glass-card rounded-2xl p-8 h-full">
                    <h3 class="text-xl font-semibold text-white mb-3">${i.name}</h3>
                    <p class="text-gray-300 leading-relaxed mb-6">${i.blurb}</p>
                    <a href="/services/${i.slug}" class="text-accent font-semibold hover:text-accent-hover transition-colors duration-300">See what we&rsquo;d build &rarr;</a>
                </div>`)
    .join('\n                        ');

  let hub = fs.readFileSync(path.join(__dirname, 'industry-hub-template.html'), 'utf8');
  const pairs = {
    '{{CARDS}}': cards,
    '{{COUNT}}': String(industries.length),
    '{{JSONLD}}': JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Website Design for Your Industry | Artum8 Labs',
        url: `${BASE}/services/for-your-industry`,
        isPartOf: { '@type': 'WebSite', name: 'Artum8 Labs', url: `${BASE}/` },
      },
      null,
      2
    ),
  };
  for (const [k, v] of Object.entries(pairs)) hub = hub.split(k).join(v);
  return hub;
}

let count = 0;
industries.forEach(d => {
  const file = path.join(OUT, `${d.slug}.html`);
  fs.writeFileSync(file, render(d));
  count++;
});
fs.writeFileSync(path.join(OUT, 'for-your-industry.html'), renderHub());
console.log(`Generated ${count} industry pages + hub page in /services`);