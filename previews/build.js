/* Render lead data -> previews/<slug>.html 
 * Run: node previews/build.js   (from repo root)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(__dirname);

const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const leads = [
  ...require('./data-part-a.js'),
  ...require('./data-part-b.js'),
  ...require('./data-part-c.js')
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^[-]+|[-]+$/g, '');

function renderLead(lead) {
  const b = lead.brand;
  const tags = (lead.heroTags || []).map(t => `<span class="chip rounded-full px-4 py-1.5 text-sm font-medium">${esc(t)}</span>`).join('');
  const trust = (lead.trust || []).map((s, i) => {
    const m = String(s.n).match(/^([\d.,]+)\s*([A-Za-z%+]*)$/);
    const stat = m
      ? `<span class="count" data-count="${m[1]}" data-suffix="${esc(m[2])}">0</span>`
      : esc(s.n);
    return `
    <div class="text-center md:text-left reveal" style="transition-delay:${i * 90}ms">
      <p class="stat-n text-3xl font-extrabold mono">${stat}</p>
      <p class="text-white/60 text-sm mt-1">${esc(s.l)}</p>
    </div>`;
  }).join('');

  const services = (lead.services || []).map((s, i) => `
    <div class="reveal tilt-card border border-line rounded-2xl p-7 bg-white hover:shadow-xl" data-tilt style="transition-delay:${(i % 2) * 80}ms">
      <p class="font-bold text-lg mb-2" style="color:var(--ink)">${esc(s.t)}</p>
      <p class="text-mid leading-relaxed">${esc(s.d)}</p>
    </div>`).join('');

  let gallery = '';
  if (lead.gallery) {
    const palettes = [[b.accent, b.accent2], [b.ink, b.mid], [b.accent2, b.ink], [b.mid, b.accent]];
    const items = lead.gallery.items.map((it, i) => {
      const [c1, c2] = palettes[i % palettes.length];
      return `<div class="photo-slot tilt-card" data-tilt style="background:linear-gradient(150deg, ${c1}, ${c2})"><span>${esc(it)}</span></div>`;
    }).join('');
    gallery = `
    <section class="bg-paper border-t border-line">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <p class="mono uppercase text-xs tracking-[.18em] mb-2 section-label reveal">Projects</p>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-3 reveal" style="color:var(--ink)">${esc(lead.gallery.title)}</h2>
        <p class="text-mid max-w-2xl mb-12 reveal">${esc(lead.gallery.sub)}</p>
        <div class="grid md:grid-cols-2 gap-6"><div class="reveal">${items}</div></div>
      </div>
    </section>`;
  }

  let finance = '';
  if (lead.finance) {
    const points = lead.finance.points.map(p => `
      <li class="flex items-start gap-3"><span class="text-accent font-bold">&#10003;</span><span>${esc(p)}</span></li>`).join('');
    finance = `
    <section class="bg-mid text-white" style="background:linear-gradient(140deg, var(--mid), var(--ink))">
      <div class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p class="mono uppercase text-xs tracking-[.18em] mb-2 text-white/60 reveal">Money questions, answered</p>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal">${esc(lead.finance.title)}</h2>
          <p class="text-white/75 leading-relaxed reveal">${esc(lead.finance.sub)}</p>
        </div>
        <ul class="space-y-4 text-lg reveal">${points}</ul>
      </div>
    </section>`;
  }

  let insurance = '';
  if (lead.insurance) {
    const points = lead.insurance.points.map(p => `
      <li class="flex items-start gap-3"><span class="text-accent font-bold">&#10003;</span><span>${esc(p)}</span></li>`).join('');
    insurance = `
    <section class="bg-paper border-t border-line">
      <div class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p class="mono uppercase text-xs tracking-[.18em] mb-2 section-label reveal">Insurance</p>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4 reveal" style="color:var(--ink)">${esc(lead.insurance.title)}</h2>
          <p class="text-mid leading-relaxed reveal">${esc(lead.insurance.sub)}</p>
        </div>
        <ul class="space-y-4 text-lg text-mid reveal">${points}</ul>
      </div>
    </section>`;
  }

  const bookingTitle = lead.bookingTitle || 'Talk to us';
  const bookingSub = lead.bookingSub || 'One form in the real build routes straight to your phone or calendar.';
  const bookingButton = lead.booking ? lead.bookingTitle && lead.bookingSub ? 'Book now' : 'Book now' : "Let's talk";

  const fill = {
    '{{NAME}}': lead.name.replace(/&/g, '&amp;'),
    '{{INDUSTRY}}': esc(lead.industry),
    '{{INDUSTRY_L}}': lead.industry.toLowerCase(),
    '{{AREA}}': esc(lead.area),
    '{{PHONE}}': esc(lead.phone),
    '{{INK}}': b.dark,
    '{{MID}}': b.mid,
    '{{ACCENT}}': b.accent,
    '{{ACCENT2}}': b.accent2,
    '{{PAPER}}': b.light,
    '{{KICKER}}': esc(lead.kicker),
    '{{HEADLINE}}': esc(lead.headline),
    '{{SUB}}': esc(lead.sub),
    '{{TAGS}}': tags,
    '{{CTA1}}': esc(lead.ctaPrimary.label),
    '{{CTA1HREF}}': lead.ctaPrimary.href,
    '{{CTA2}}': esc(lead.ctaSecondary.label),
    '{{TRUST}}': trust,
    '{{MARQUEE}}': (lead.marquee || lead.heroTags || ['Design', 'Build', 'Launch']).map(t =>
      `<span class="mono uppercase tracking-widest text-sm text-white/70">${esc(t)}</span>`).join(''),
    '{{SERVICESTITLE}}': esc(lead.servicesTitle || 'Services'),
    '{{SERVICES}}': services,
    '{{GALLERY}}': gallery,
    '{{FINANCE}}': finance,
    '{{INSURANCE}}': insurance,
    '{{BOOKINGTITLE}}': esc(bookingTitle),
    '{{BOOKINGSUB}}': esc(bookingSub),
    '{{BOOKINGBUTTON}}': esc(bookingButton),
    '{{TESTIMONIAL}}': esc(lead.testimonial),
    '{{PROOFLINE}}': esc(lead.proofLine),
    '{{YEAR}}': new Date().getFullYear()
  };

  let html = template;
  for (const [k, v] of Object.entries(fill)) {
    html = html.split(k).join(String(v));
  }

  const file = path.join(OUT, `${slugify(lead.name)}.html`);
  fs.writeFileSync(file, html);
  return { slug: slugify(lead.name), name: lead.name, industry: lead.industry, phone: lead.phone, email: lead.email || '', file };
}

const results = leads.map(renderLead);
console.log('Rendered previews:');
results.forEach(r => console.log('  ' + r.file.split('/').pop() + '  <-  ' + r.name));

// Listing page (noindex)
const cards = results.map(r => `
  <a href="/previews/${r.slug}" class="block border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-colors">
    <p class="text-lg font-bold text-white mb-1">${esc(r.name)}</p>
    <p class="text-gray-400 text-sm">${esc(r.industry)} · ${esc(r.phone)}</p>
    <p class="text-amber-400 text-sm mt-3">View concept &rarr;</p>
  </a>`).join('');

const index = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="robots" content="noindex"/><title>Website concepts by Artum8 Labs</title>
<style>body{background:#0b0d10;color:#e5e7eb;font-family:Inter,system-ui,sans-serif;margin:0}main{max-width:900px;margin:0 auto;padding:48px 20px}a{text-decoration:none}.mono{font-family:'JetBrains Mono',monospace}.mut{color:#9ca3af;font-size:14px;line-height:1.6}</style></head>
<body><main>
  <p class="mono" style="color:#f59e0b;text-transform:uppercase;letter-spacing:.18em;font-size:12px">Artum8 Labs &middot; concept previews</p>
  <h1 style="font-size:32px;margin:8px 0 4px">Website concepts for local businesses</h1>
  <p class="mut" style="max-width:640px">Original niche designs created for each business as a preview of a custom rebuild. Placeholder copy and imagery only &mdash; approval structure, not finished work.</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;margin-top:28px">${cards}</div>
</main></body></html>`;
fs.writeFileSync(path.join(OUT, 'index.html'), index);
console.log('  index.html  <- listing page');