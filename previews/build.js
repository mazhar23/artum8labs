/* Render lead data -> previews/<slug>.html (premium cinematic template)
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
  ...require('./data-part-c.js'),
  ...require('./data-part-new.js'),
  ...require('./data-part-4.js'),
  ...require('./data-part-5.js')
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^[-]+|[-]+$/g, '');
const pad = (n) => String(n).padStart(2, '0');

function renderLead(lead) {
  const b = lead.brand;
  const seed = slugify(lead.name);
  const tags = (lead.heroTags || []).map(t => `<span class="chip">${esc(t)}</span>`).join('');

  /* ---------- Trust stats (counters) ---------- */
  const trust = (lead.trust || []).map((s) => {
    const m = String(s.n).match(/^([\d.,]+)\s*([A-Za-z%+]*)$/);
    const inner = m
      ? `<span data-count="${esc(m[1])}" data-suffix="${esc(m[2])}">0</span>`
      : esc(s.n);
    return `
    <div class="stat rv" data-reveal>
        <p class="stat-n">${inner}</p>
        <p class="stat-l">${esc(s.l)}</p>
    </div>`;
  }).join('');

  /* ---------- Services cards (asymmetric grid) ---------- */
  const services = (lead.services || []).map((s, i) => `
    <div class="c">
      <div class="card rv" data-reveal>
        <span class="num">${pad(i + 1)}</span>
        <h3>${esc(s.t)}</h3>
        <p>${esc(s.d)}</p>
        <span class="ghost-back">${pad(i + 1)}</span>
      </div>
    </div>`).join('');

  /* ---------- Gallery -> horizontal CSS scroll-snap rail ---------- */
  let gallery = '';
  if (lead.gallery) {
    const items = lead.gallery.items.map((it, i) => `
      <figure class="rail-card">
        <img src="https://picsum.photos/seed/${seed}-p${i + 1}/1200/1400" alt="${esc(it)}" loading="lazy" />
        <span class="rail-idx">/${pad(i + 1)}</span>
        <figcaption class="rail-cap"><span class="serif">${esc(it)}</span></figcaption>
      </figure>`).join('');
    gallery = `
    <section id="projects" class="section rail-section" data-section>
      <div class="wrap">
        <div class="section-head">
          <p class="label" data-reveal>Projects</p>
          <h2 class="h-1" data-reveal>${esc(lead.gallery.title)}</h2>
        </div>
        <p class="lede" style="margin-top:-.6rem; margin-bottom:2.5rem" data-reveal>${esc(lead.gallery.sub)}</p>
      </div>
      <div class="rail">${items}</div>
    </section>`;
  }

  /* ---------- Finance split (dark) ---------- */
  let finance = '';
  if (lead.finance) {
    const points = (lead.finance.points || []).map(p => `<li>${esc(p)}</li>`).join('');
    finance = `
    <section class="section tone-ink" data-section>
      <div class="wrap split">
        <div class="rv" data-reveal>
          <p class="label" style="margin-bottom:1rem">Money questions, answered</p>
          <h2 class="h-1">${esc(lead.finance.title)}</h2>
          <p class="lede" style="margin-top:1rem">${esc(lead.finance.sub)}</p>
        </div>
        <ul class="rv" data-reveal>${points}</ul>
      </div>
    </section>`;
  }

  /* ---------- Insurance split (light) ---------- */
  let insurance = '';
  if (lead.insurance) {
    const points = (lead.insurance.points || []).map(p => `<li>${esc(p)}</li>`).join('');
    insurance = `
    <section class="section" data-section>
      <div class="wrap split">
        <div class="rv" data-reveal>
          <p class="label" style="margin-bottom:1rem">Insurance</p>
          <h2 class="h-1">${esc(lead.insurance.title)}</h2>
          <p class="lede" style="margin-top:1rem">${esc(lead.insurance.sub)}</p>
        </div>
        <ul class="rv" data-reveal>${points}</ul>
      </div>
    </section>`;
  }

  const bookingTitle = lead.bookingTitle || 'Talk to us';
  const bookingSub = lead.bookingSub || 'One form in the real build routes straight to your phone or calendar.';
  const bookingButton = lead.booking ? 'Direct booking slot, first-come' : 'Phone-first contact';
  const seeLink = lead.gallery ? '#projects' : '#services';

  const fill = {
    '{{NAME}}': lead.name.replace(/&/g, '&amp;'),
    '{{INDUSTRY}}': esc(lead.industry),
    '{{INDUSTRY_L}}': lead.industry.toLowerCase(),
    '{{AREA}}': esc(lead.area),
    '{{PHONE}}': esc(lead.phone),
    '{{PHONELINK}}': lead.phoneLink || 'tel:+1',
    '{{PHOTOSEED}}': seed,
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
    '{{SEELINK}}': seeLink,
    '{{TRUST}}': trust,
    '{{MARQUEE}}': (lead.marquee || lead.heroTags || ['Design', 'Build', 'Launch']).map(t =>
      `<span>${esc(t)}</span>`).join(''),
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