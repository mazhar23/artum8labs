/*
 * Client-industry website page data.
 * Each object renders one page at /services/<slug>.
 * Keep copy genuinely unique per industry — swapping only names = doorway pages.
 */

module.exports = [
  {
    slug: 'website-design-for-hvac-companies',
    title: 'Website Design for HVAC Companies | Artum8 Labs',
    name: 'Website Design for HVAC Companies',
    short: 'HVAC',
    desc: 'Custom websites for HVAC contractors: always-visible emergency call button, service-area pages, financing and seasonal promos, online booking. Fixed price, you own it, code in your GitHub.',
    intro: 'An HVAC website has one job in July and a different job in November, and most contractor sites fail at both. We build service websites for heating and cooling companies that make the phone ring during breakdown season and build the trust that wins maintenance contracts and system replacements the rest of the year.',
    blurb: 'Emergency-call layouts, service-area pages, and financing promos built around the two very different ways homeowners buy HVAC.',
    price: 'Custom HVAC websites run $2,000–$7,000 fixed-scope. The code lands in your GitHub from day one and you review live staging at every milestone.',
    pains: [
      { t: 'Calls lost in the summer rush', d: 'When the AC dies in Texas heat, the company that answers first gets the job. Your website should put a tap-to-call button in front of every visitor on every device — not bury it four clicks deep in a menu.' },
      { t: 'Emergency and maintenance traffic collide', d: 'One page cannot serve a homeowner in a 2 AM emergency and one planning a new system. The right structure separates "call now" traffic from "book a tune-up" traffic so neither converts badly.' },
      { t: 'Thin service-area pages', d: 'Google rewards contractors who prove local presence. Generic "we serve the whole state" pages do nothing; real service-area pages that answer who you are and where you work earn local search visibility.' }
    ],
    features: [
      { t: 'Emergency call button, always visible', d: 'Sticky tap-to-call and a phone-first layout so a broken system finds a field tech before a competitor‘s ad does.' },
      { t: 'Financing and seasonal promos', d: 'Dedicated sections for 0% financing, tune-up specials and seasonal campaigns — so you are never hand-editing code when a promo drops.' },
      { t: 'Service-area and local SEO pages', d: 'Service areas, brands serviced, license/insurance details and NAP data structured so local search understands exactly where you work.' },
      { t: 'Booking, estimates and warranty records', d: 'Online booking, estimate requests and a simple equipment/warranty ledger that keeps customers off the fence and in your pipeline.' }
    ],
    faqs: [
      { q: 'Why does an HVAC site need a different design from a generic small-business site?', a: 'Because buying is split: emergency buyers must call now, planned buyers must trust you enough to call later. Those two paths need different layouts, CTAs and content. A generic template forces both through one funnel and typically loses the emergency half.' },
      { q: 'Do you build on a template?', a: 'No. Each build is custom-fit to your service area, brand and offers. You own everything — source code, design, content — with the code in your GitHub from the first milestone.' },
      { q: 'Can you wire up google business, reviews, coupons and financing logos?', a: 'Yes. Local schema, your own review content (never fake ratings), coupon/offer sections and financing logos are all in scope on the build.' },
      { q: 'What if the project runs late?', a: 'A timeline SLA applies: 10% off the final invoice for every week shipped late, capped at 25%. If the first milestone misses the agreed spec, your deposit is returned.' }
    ],
    related: ['website-design-for-plumbing-companies', 'website-design-for-roofing-companies', 'website-design-for-home-service-companies']
  },
  {
    slug: 'website-design-for-landscapers',
    title: 'Website Design for Landscapers | Artum8 Labs',
    name: 'Website Design for Landscapers',
    short: 'landscaping',
    desc: 'Custom websites for landscaping companies: project galleries, seasonal services, service-area pages and easy estimate requests. Fixed price, you own the site and the code.',
    intro: 'Landscaping is sold in before-and-after photos, and most landscaper websites hide those photos behind slow galleries and dated templates. We build fast, image-first websites for lawn care, design/build and maintenance companies that turn a portfolio into booked seasons.',
    blurb: 'Image-first build for lawn care, design/build and maintenance companies — portfolios that actually convert into estimates.',
    price: 'Custom landscaping websites run $2,000–$7,000 fixed-scope, with code in your GitHub and a live preview to review at every milestone.',
    pains: [
      { t: 'Portfolio photos that take too long to load', d: 'Homeowners judge landscapers on the work. A slow gallery or slideshow on a dated template makes them bounce straight to the next company instead of requesting an estimate.' },
      { t: 'One business, three services, zero structure', d: 'Design/build, lawn maintenance and irrigation are bought differently and at different seasons. Squeezing them onto one page means each one loses.' },
      { t: 'Nobody knows your true service area', d: 'Landscapers live and die by their radius. Vague wording here costs both search visibility and filtering — homeowners skip crews they think won’t come.' }
    ],
    features: [
      { t: 'Fast, height-cropped project galleries', d: 'Before/after galleries built for speed and impact, with image optimization so they load instantly on a phone in the yard.' },
      { t: 'Seasonal services that make sense', d: 'Separate paths for design/build, maintenance plans and seasonal cleanup — each with its own offer and booking step.' },
      { t: 'Service-area maps and borders', d: 'Clear coverage areas with maps and nearby-city pages so search engines and homeowners both understand your radius.' },
      { t: 'Estimate requests that filter leads', d: 'A short estimate form that asks the right 4–5 questions up front, so you quote fewer tyre-kickers and more jobs.' }
    ],
    faqs: [
      { q: 'How do you make a portfolio site feel fast on mobile?', a: 'Real image optimization — compressed next-gen formats, responsive sizes and lazy loading — not a plug-in that says “fast.” Galleries are the heaviest part of a landscaper site and the easiest to get right.' },
      { q: 'My business is mostly recurring lawn care — do I still need a portfolio?', a: 'Even a maintenance business wins on proof. A lean site with a small gallery, pricing transparency and an easy signup reduces the friction a homeowner feels before calling you.' },
      { q: 'Do you handle estimates, contracts and scheduling?', a: 'Online estimate requests and landing pages per service are in scope. Full scheduling/contracting software is an upsell we can scope separately on the maintenance retainer.' },
      { q: 'Can I edit content myself after launch?', a: 'Yes. You get an owner’s manual in plain English, and optional CMS/blog training. You own the code, so there is no hostage situation.' }
    ],
    related: ['website-design-for-home-service-companies', 'website-design-for-cleaning-companies', 'website-design-for-hvac-companies']
  },
  {
    slug: 'website-design-for-plumbing-companies',
    title: 'Website Design for Plumbing Companies | Artum8 Labs',
    name: 'Website Design for Plumbing Companies',
    short: 'plumbing',
    desc: 'Custom websites for plumbers: 24/7 emergency call dominance, license badges, service and financing pages, online booking. Fixed price, code in your GitHub from day one.',
    intro: 'The plumbing company that answers the call wins the emergency job — but only if the website puts a working number in front of a panicking homeowner in under a second. We build emergency-first, trust-heavy websites for residential and commercial plumbers.',
    blurb: 'Emergency-first builds: a number that is impossible to miss, license badges, financing and service pages structured for trust.',
    price: 'Custom plumbing websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging reviewed at every milestone.',
    pains: [
      { t: 'The call button is impossible to find', d: 'A buried contact page costs emergency jobs. A homeowner with a burst pipe compares you for the ten seconds it takes to tap a number — and yours must be there first.' },
      { t: 'Trust is everything and most sites don’t show it', d: 'License numbers, insured details, review counts and guarantee copy win the “will they show up and not overcharge” moment. Most plumber sites bury this below stock photos.' },
      { t: 'One price, many services', d: 'Repair, drain cleaning, water heaters, repiping — each is a separate buying decision with its own keyword. Flat pages force customers to guess whether you do their job.' }
    ],
    features: [
      { t: 'Emergency number above the fold, always', d: 'Tap-to-call in the header and sticky bar, so the number is reachable from anywhere on the site in one tap.' },
      { t: 'Licensed, bonded, insured — front and center', d: 'A trust strip with license numbers, insurance, guarantees and real review content placed where price-sensitive homeowners look first.' },
      { t: 'Dedicated service pages', d: 'A page per service — drain cleaning, water heaters, repiping — each tuned to its own search and its own upsell path.' },
      { t: 'Flat-rate pricing and financing', d: 'Published price anchors where you’re comfortable and financing sections that match how homeowners budget for big repairs.' }
    ],
    faqs: [
      { q: 'How fast does an emergency customer find my number?', a: 'With a sticky call bar and header phone on a phone-first layout, the number is reachable in under a second and on every page. That is the standard we build to.' },
      { q: 'Should I publish prices on the site?', a: 'Where you set flat rates, yes — price anchoring converts. Where jobs vary, a “what repairs typically cost” guide is proven to earn more qualified calls than silence.' },
      { q: 'Can you handle scheduling and after-hours booking?', a: 'Online booking and after-hours request forms are in scope. If you want dispatch software, we can scope it as a separate automation build.' },
      { q: 'What happens if I want changes after launch?', a: '30 days of warranty fixes are included, and you own the code plus an editing manual. Optional maintenance retainers cover anything after that.' }
    ],
    related: ['website-design-for-hvac-companies', 'website-design-for-home-service-companies', 'website-design-for-roofing-companies']
  },
  {
    slug: 'website-design-for-auto-body-shops',
    title: 'Website Design for Auto Body Shops | Artum8 Labs',
    name: 'Website Design for Auto Body Shops',
    short: 'auto body',
    desc: 'Custom websites for collision and auto body shops: instant-quote angles, insurance-partner coverage, before/after galleries and estimate requests. Fixed price, you own it.',
    intro: 'Accidents are an emotional, time-sensitive purchase. A body shop site that confuses the visitor is a car being quoted elsewhere. We build collision-shop websites that get accident customers from “what now” to “get my quote” with insurance status, real repair photos and zero friction.',
    blurb: 'Websites that turn accident stress into scheduled estimates — insurance-partner badges, repair galleries and instant-quote paths.',
    price: 'Custom auto body websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging at every milestone.',
    pains: [
      { t: 'The visitor just had an accident', d: 'They are panicking, on a phone, and comparing five shops. If your site makes them hunt for “estimate”, they are gone before they read about your 20 years of experience.' },
      { t: 'Insurance questions go unanswered', d: '“Do you work with my insurance?” is the first question. Shops that answer it clearly convert; shops that bury it lose the most expensive visits they get.' },
      { t: 'No proof of the actual work', d: 'Damage and repair photos are the entire credibility argument. Generic stock cars instead of your real before/after work is a silent credibility leak.' }
    ],
    features: [
      { t: 'Estimate-first conversion path', d: 'A one-form estimate request with photos, plus tap-to-call, placed above the fold on every page.' },
      { t: 'Insurance-partner section', d: 'A clear “we work with every major insurer” area with brand logos, plus a plain-language walkthrough of the claims process.' },
      { t: 'Real repair galleries', d: 'Damage-to-repair photo sets from your actual jobs — organized, fast-loading and productized so they build trust without a slow site.' },
      { t: 'Shop services and OEM capabilities', d: 'Detailed pages for paint/refinish, collision repair, dent removal and the OEM/quality certifications that matter to insurers and owners.' }
    ],
    faqs: [
      { q: 'Should I list OEM parts and certifications?', a: 'Yes. Insurers and informed customers look for OEM certification and paint quality (e.g. color-matching guarantees). It is a differentiator most shop sites completely omit.' },
      { q: 'How do I handle the estimate form without wasting my staff’s time?', a: 'The form asks the 4–5 questions that qualify a job — vehicle, damage area, insurance status, location — so shop staff only touch serious leads.' },
      { q: 'Do you build booking and status tracking?', a: 'Estimate requests are in scope. If you want automated appointment reminders or repair-status updates, that is a clean AI-automation add-on we can scope.' },
      { q: 'What guarantees does the build carry?', a: 'Milestone refund gate on the first milestone, a timeline SLA (10%/week late, capped 25%), 30-day warranty, and full code ownership in your GitHub.' }
    ],
    related: ['website-design-for-home-service-companies', 'website-design-for-hvac-companies', 'website-design-for-cleaning-companies']
  },
  {
    slug: 'website-design-for-cleaning-companies',
    title: 'Website Design for Cleaning Companies | Artum8 Labs',
    name: 'Website Design for Cleaning Companies',
    short: 'cleaning',
    desc: 'Custom websites for residential and commercial cleaning companies: recurring bookings, service pages, crew vetting and review trust. Fixed price, you own the code.',
    intro: 'Cleaning is bought on trust and repeatability. A company with a strong local reputation but a thin website loses to the one that looks organized online. We build cleaning-company sites that turn “we’re insured and background check” into recurring bookings you can schedule without a phone call.',
    blurb: 'Recurring-booking sites for residential and commercial cleaners — trust signals, transparent pricing and online scheduling.',
    price: 'Custom cleaning websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging reviewed each milestone.',
    pains: [
      { t: 'Trust is the entire sale', d: 'Homeowners hand you keys. If you can’t show vetting, insurance, reviews and consistent crews in two seconds of scrolling, you lose to a slightly worse company that looks more professional online.' },
      { t: 'Recurring customers are the profit', d: 'One-time cleans are acquisition; recurring cleans are the business. Sites built only for “book a clean” ignore the subscription-style repeat sale entirely.' },
      { t: 'Commercial and residential are two different businesses', d: 'B2B buyers want contracts and compliance; homeowners want schedules and prices. One undifferentiated page serves neither.' }
    ],
    features: [
      { t: 'Book-a-recurring-clean path', d: 'Online scheduling that fronts the recurring offer — weekly, biweekly, one-time — with transparent per-service pricing.' },
      { t: 'Vetting and trust section', d: 'Crew vetting, insurance, satisfaction guarantees and review content placed where trust is decided.' },
      { t: 'Separate commercial and residential paths', d: 'A distinct commercial route with contract, compliance and cleaning-checklists content, and a home route with pricing and slots.' },
      { t: 'Move-out / deep-clean specials', d: 'Targeted landing sections for deep cleans and move-out cleaning that capture high-value impulse searches.' }
    ],
    faqs: [
      { q: 'How do recurring bookings work on a website?', a: 'A scheduling flow that asks how often, which service and which days, then confirms the slot and the plan. You own the leads — nothing is held hostage in a third-party platform.' },
      { q: 'Do I have to publish prices?', a: 'For a cleaning business, transparent pricing is a competitive weapon. Where packages vary, a “starting at” anchor converts more booked visits than a coy “contact us” button.' },
      { q: 'Can you integrate with my existing booking software?', a: 'Yes. If you already use a scheduler, we design around it. If not, we can scope a simple booking model into the build.' },
      { q: 'Who owns the site when it’s done?', a: 'You do — code in your GitHub from day one, written IP transfer, and a plain-English owner’s manual so you are never dependent on us to make small changes.' }
    ],
    related: ['website-design-for-landscapers', 'website-design-for-salons-and-spas', 'website-design-for-home-service-companies']
  },
  {
    slug: 'website-design-for-remodeling-contractors',
    title: 'Website Design for Remodeling Contractors | Artum8 Labs',
    name: 'Website Design for Remodeling Contractors',
    short: 'remodeling',
    desc: 'Custom websites for remodeling and renovation contractors: project case studies, ROI framing, licensed-and-insured trust and qualified project requests.',
    intro: 'A remodel is the most emotional, expensive purchase a homeowner makes next to a house itself. They research heavily and buy from whoever feels like a professional partner. We build remodeling sites that document projects properly, frame ROI honestly, and pull serious project requests — not “send me a brochure” leads.',
    blurb: 'Project-led sites for remodeling contractors — case-study depth, ROI framing and discovery-call funnels.',
    price: 'Custom remodeling websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging reviewed each milestone.',
    pains: [
      { t: 'Projects shown as thumbnails, not stories', d: 'A remodel is bought on the story of a project — budget range, timeline, obstacles, outcome. Thumbnail grids of pretty photos don’t prove you can run a job.' },
      { t: 'No honest budget framing', d: 'Homeowners are terrified of scope creep and surprise invoices. Contractors who address budgets and process head-on convert serious buyers and filter window shoppers.' },
      { t: 'Licensed/insured buried in the footer', d: 'For a $60,000 kitchen it’s the top question. Sites that hide licensing and insurance lose the exact buyers they want.' }
    ],
    features: [
      { t: 'Project case-study layouts', d: 'Each project gets scope, budget band, timeline, photos and a “what we’d improve next time” honesty section — a document, not a thumbnail.' },
      { t: 'Budget and process pages', d: 'A no-surprises breakdown of how quoting, milestones, change orders and payments work — the professional-partner signal remodelers need.' },
      { t: 'Licensing and insurance front-loaded', d: 'License numbers, insurance, memberships and warranty terms displayed where trust is decided, not in the footer.' },
      { t: 'Qualified project request form', d: 'A structured intake — project type, budget, timeline, photos — that routes only real projects into your calendar.' }
    ],
    faqs: [
      { q: 'Why show budget bands and not exact numbers?', a: 'Exact quotes on a public site are self-inflicted anchors. Budget bands set expectations while preserving room for real scoping — the honest framing buyers respond to.' },
      { q: 'Can you build before/after galleries without slowing the site?', a: 'Yes — real image optimization and lazy loading. Remodel sites love photos, and slow ones punish exactly the luxury buyers you want.' },
      { q: 'Do you integrate with project management tools?', a: 'Estimate intake and case studies are in scope. Integration with your PM tools (HoneyBook, Jobber, etc.) can be scoped as an add-on.' },
      { q: 'What happens if the timeline slips?', a: 'A written timeline SLA — 10% off the final invoice per week late, capped at 25% — and a milestone refund gate on the first deliverable.' }
    ],
    related: ['website-design-for-home-service-companies', 'website-design-for-real-world-trades', 'website-design-for-cleaning-companies']
  },
  {
    slug: 'website-design-for-roofing-companies',
    title: 'Website Design for Roofing Companies | Artum8 Labs',
    name: 'Website Design for Roofing Companies',
    short: 'roofing',
    desc: 'Custom websites for roofing contractors: storm-response landing pages, insurance-claim guidance, financing and visible project proof. Fixed price, you own it.',
    intro: 'Roofing demand arrives in storms — literally and commercially. The companies that convert are the ones ready with storm-response pages, insurance-claim guidance and instant credibility before the next hailstorm hits. We build roofing sites that are always emergency-ready, then quietly win the planned-replacement market the rest of the year.',
    blurb: 'Storm-ready roofing sites: insurance-claim paths, emergency response pages, financing and projects that prove you finish jobs.',
    price: 'Custom roofing websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging reviewed at every milestone.',
    pains: [
      { t: 'The storm window closes in days', d: 'After hail, homeowners file quickly. If your site can’t publish a storm-response page and get “file my claim” traffic within hours, the work goes to whoever could.' },
      { t: 'Insurance-claim confusion kills trust', d: 'Roofers who walk homeowners through the claims process in plain language win. Sites that say “we deal with insurance” without the how, lose the nervous first-timer.' },
      { t: 'Financing is the silent deal-maker', d: 'Roofs are $8k–$20k. Shops that show financing options openly capture the homeowner who was never going to write the whole check at once.' }
    ],
    features: [
      { t: 'Storm-response landing system', d: 'Pre-built response pages and a process to publish a storm-area page within hours — with claim-checklists and proof requirements already written.' },
      { t: 'Insurance-claims walkthrough', d: 'A plain-language, step-by-step claims section that answers the questions homeowners actually ask after a storm.' },
      { t: 'Financing and payment options', d: 'Financing terms and payment structures displayed openly to widen the pool of buyers a replacement roof reaches.' },
      { t: 'Completed-project proof', d: 'Job galleries with location, materials and timeline metadata — evidence you finish what you start.' }
    ],
    faqs: [
      { q: 'How fast can you stand up a storm-response page?', a: 'The template is pre-built. On short notice we can publish a local response page the same day — you review it live before it goes up, and a weather event is exactly the moment that matters.' },
      { q: 'Should I show financing prominently?', a: 'For roofing, yes. The buyer pool without upfront savings is massive, and transparent financing is the difference between a quote and a yes.' },
      { q: 'Do you help with local lead flow after storms?', a: 'The site structure (area pages plus response templates) is the foundation. Our SEO package can add the local search work on top afterwards.' },
      { q: 'What protection do I get on the build itself?', a: 'Milestone refund gate, a written timeline SLA, 30-day warranty, GA4 + Search Console set up, and full code ownership in your GitHub.' }
    ],
    related: ['website-design-for-hvac-companies', 'website-design-for-plumbing-companies', 'website-design-for-home-service-companies']
  },
  {
    slug: 'website-design-for-salons-and-spas',
    title: 'Website Design for Salons & Spas | Artum8 Labs',
    name: 'Website Design for Salons & Spas',
    short: 'salon',
    desc: 'Custom websites for salons and spas: online booking, service menus with pricing, staff pages and a booking-slot experience. Fixed price, you own it.',
    intro: 'A salon website is a booking machine first and a brand second. Clients decide in the first few swipes whether you’re their vibe and whether it’s easy to book. We build salon sites where style shows and the booking button is never more than a thumb away.',
    blurb: 'Booking-first sites for salons and spas — pricing menus, staff pages and online scheduling that never fight the vibe.',
    price: 'Custom salon websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging reviewed each milestone.',
    pains: [
      { t: 'Booking friction costs your busiest hours', d: 'Clients who can’t instantly see slots and book them will happily take them to a competitor’s one-tap system. Speed to booking is the entire conversion.' },
      { t: 'No prices on the menu', d: 'Hair and spa services are researched budgets. A menu without pricing makes you look expensive by default and sends price-sensitive clients away without a call.' },
      { t: 'The vibe is unreadable in a template', d: 'A generic template reads “corporate” or “startup”, not “curly-girl specialist” or “quiet luxury spa”. Style is a booking signal and most themes can’t carry it.' }
    ],
    features: [
      { t: 'Book-inside-3-taps', d: 'A booking flow that opens the service calendar from the homepage and any service page — no accounts, no signup walls.' },
      { t: 'Priced service menus', d: 'Every service with price and duration visible, so the menu doubles as your price anchor and your sales pitch.' },
      { t: 'Staff and specialty pages', d: 'Personal pages for stylists and techs with pricing tiers and portfolios — the “who am I booking with” trust moment done right.' },
      { t: 'Google integration', d: 'Booking and business details wired to your Google presence so discovery (Google) and conversion (your site) are one smooth loop.' }
    ],
    faqs: [
      { q: 'Should online booking replace phone booking?', a: 'Neither. You get a phone-first layout AND online booking — some clients will always call, and the ones who won’t are the ones the button captures.' },
      { q: 'Do you integrate with my current booking software?', a: 'If you use a scheduler (Fresha, Vagaro, etc.), we design the site around it. If not, we scope a simple booking model into the build.' },
      { q: 'Can you make it feel premium without stockiness?', a: 'Yes — typography, spacing, brand color and image treatment carry the vibe, and they’re exactly the template parts we customize first.' },
      { q: 'Do I own the design?', a: 'Completely. Code in your GitHub from day one, IP transferred in writing, and you can take it to any developer later.' }
    ],
    related: ['website-design-for-cleaning-companies', 'website-design-for-landscapers', 'website-design-for-dentists']
  },
  {
    slug: 'website-design-for-home-service-companies',
    title: 'Website Design for Home Service Companies | Artum8 Labs',
    name: 'Website Design for Home Service Companies',
    short: 'home service',
    desc: 'Custom websites for general contractors and home service companies: service pages, area pages, schedule-first CTAs and trust badges. Fixed price, you own it.',
    intro: 'Plumbing, electrical, HVAC, handyman, pest, moving — home service buyers want a trustworthy company that schedules fast and shows up. We build multi-service home service company websites that route every call type to the right place and make “book a time” the path of least resistance.',
    blurb: 'Multi-service builds for contractors and home service companies — clear service routes, area pages and schedule-first CTAs.',
    price: 'Custom home service websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging reviewed at every milestone.',
    pains: [
      { t: 'Multiple services, one muddled homepage', d: 'A handyman who does electrical, plumbing and painting buries each service’s keyword and each service’s buyer. Big-ticket services die in the mix.' },
      { t: '“Call us” is the only CTA', d: 'Homeowners who just want a quote or a time slot are forced to make a phone call they didn’t want. They’ll pick a business that removes that step.' },
      { t: 'No credibility stack', d: 'Licensed, insured, background-checked, reviewed, guaranteed — the home service assurance stack. Sites that don’t display it are priced as the risky option.' }
    ],
    features: [
      { t: 'One page per service', d: 'A dedicated page per service line, each with its own offer, booking step and SEO target — no cannibalized homepages.' },
      { t: 'Schedule-first conversion', d: 'Request-a-time flows with phone fallback on every page, so “book a slot” is always one tap, never one form-essay away.' },
      { t: 'Coverage and area pages', d: 'Real area pages with maps and NAP consistency so local search and local customers both know your radius.' },
      { t: 'Assurance stack', d: 'A visible licensed/insured/reviewed/guaranteed strip plus transparent pricing anchors where you have flat rates.' }
    ],
    faqs: [
      { q: 'Why a page per service instead of one big page?', a: 'Each service is bought by a different person at a different moment for a different keyword. Separate pages let each one rank and convert without competing with the others.' },
      { q: 'I already show up in Google Maps — do I need all this?', a: 'Maps gets you click-to-call. The site is where you prove trust, show pricing and capture the booking or quote — the profit lives there.' },
      { q: 'Can you integrate with my scheduling software?', a: 'Yes, we design around it. Or we scope a simple built-in booking date-picker into the build so you’re not dependent on a monthly subscription.' },
      { q: 'Who owns the website?', a: 'You do — code in your GitHub from day one, IP transferred in writing, 30-day warranty, and an owner’s manual so you can edit content yourself.' }
    ],
    related: ['website-design-for-hvac-companies', 'website-design-for-plumbing-companies', 'website-design-for-remodeling-contractors']
  },
  {
    slug: 'website-design-for-dentists',
    title: 'Website Design for Dentists | Artum8 Labs',
    name: 'Website Design for Dentists',
    short: 'dental',
    desc: 'Custom websites for dental practices: new-patient funnels, treatment-cost pages, insurance and financing paths plus easy appointment requests. Fixed price, you own it.',
    intro: 'Dental websites win or lose on the new-patient funnel — “I have a problem, can I get in, and can I afford it.” We build dental practice sites that make new patients call, answer the cost and financing questions that gate treatment acceptance, and keep your team’s phone ringing with the right cases.',
    blurb: 'New-patient dental sites: treatment-cost transparency, financing paths, insurance lists and easy appointment requests.',
    price: 'Custom dental websites run $2,000–$7,000 fixed-scope with code in your GitHub and live staging reviewed each milestone.',
    pains: [
      { t: 'The new-patient moment is make or break', d: 'Fearful, price-uncertain people land on your site after a search. If they can’t instantly see if you accept their insurance and how to request a visit, they never call.' },
      { t: 'Treatment costs are a black box', d: 'Patients estimate cost and insurance coverage before they ever call. Practices that address costs and financing openly get more of the calls that matter.' },
      { t: 'Services stuffed into one page', d: 'Cosmetic, ortho, implants, emergency — each is a different patient with a different search. Flat pages force them all to compete for the same space.' }
    ],
    features: [
      { t: 'New-patient-first funnel', d: 'Insurance accepted list, “new patients welcome” cues, and a request-an-appointment flow front-loaded on the homepage.' },
      { t: 'Cost and financing pages', d: 'Treatment-cost guides and financing options that answer the money question before it becomes a reason to not call.' },
      { t: 'One page per treatment line', d: 'Cosmetic, orthodontics, implants, emergency and general — each with its own page, FAQ and call-to-action.' },
      { t: 'Scheduling and reminders', d: 'Appointment requests plus optional automated reminders (AI automation add-on) that cut no-shows.' }
    ],
    faqs: [
      { q: 'Should a dental site publish prices?', a: 'Pricing guides and financing transparency increase treatment acceptance and filter unqualified callers. We build cost-comfort into the funnel you approve.' },
      { q: 'Do you handle insurance lists and plan logos?', a: 'Yes — a clean “we accept these plans” section that keeps the trust signal current without a developer every time you add a plan.' },
      { q: 'Can you reduce no-shows?', a: 'Appointment request flows are in scope; automated SMS/email reminders are a clean add-on we can scope through the A8 Automations tier.' },
      { q: 'Who owns the site?', a: 'You own everything — code in your GitHub, written IP transfer, 30-day warranty, GA4 + Search Console set up, and an owner’s manual.' }
    ],
    related: ['website-design-for-salons-and-spas', 'website-design-for-cleaning-companies', 'website-design-for-home-service-companies']
  }
];