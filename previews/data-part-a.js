/* Preview design data - part A (3 leads). Renders to previews/<slug>.html via build.js */

module.exports = [
  {
    slug: 'landcraft',
    name: 'Landcraft',
    industry: 'Landscaping',
    area: 'Austin, TX',
    phone: '512-301-1991',
    phoneLink: 'tel:+15123011991',
    brand: { dark: '#14261c', mid: '#2c4a35', accent: '#7fb069', accent2: '#d9a441', light: '#f4f1ea' },
    kicker: 'Austin landscape design & build since 1995',
    headline: 'Outdoor living, designed and built to last the Texas sun',
    sub: 'Landcraft designs, builds and maintains outdoor spaces across greater Austin: patios, poolscaping, native plantings and full outdoor kitchens. One team, one contract, seasons of follow-through.',
    heroTags: ['Design + Build', 'Native planting', 'Water management'],
    ctaPrimary: { label: 'Call 512-301-1991', href: 'tel:+15123011991' },
    ctaSecondary: { label: 'Request a design consult', href: '#estimate' },
    trust: [
      { n: '1995', l: 'Established' },
      { n: '600+', l: 'Projects completed' },
      { n: '5.0', l: 'Google rating' },
      { n: '1', l: 'In-house crew' }
    ],
    servicesTitle: 'What a Landcraft site sells',
    services: [
      { t: 'Design / Build', d: 'Landscaping and hardscaping scoped, designed and built by one team: patios, walkways, retaining walls, outdoor structures.' },
      { t: 'Poolscaping', d: 'Planting and surfacing around pools that survives the Austin heat and looks intentional from every window.' },
      { t: 'Native & adaptive planting', d: 'Drought-tolerant, low-water planting plans matched to your soil and sun: less irrigation, more curb.' },
      { t: 'Seasonal maintenance', d: 'Scheduled care that keeps landscapes sold at open houses and loved in every season.' }
    ],
    gallery: {
      title: 'The proof section a portfolio site needs',
      sub: 'Before / after project galleries, organized by project with real photos, scope notes and budgets.',
      items: ['Patio + outdoor kitchen, Northwest Austin', 'Native planting, Circle C', 'Poolside aggregate, Mueller', 'New build hardscape, Spicewood']
    },
    booking: true,
    bookingTitle: 'Book a design consult',
    bookingSub: 'In the real build, this connects to your calendar or a one-field estimate request.',
    testimonial: 'The crew was in and out in eight days, and the patio looks like it was part of the house. (Placeholder for a real quote.)',
    proofLine: 'This is a concept homepage for Landcraft. It shows the structure and feel a rebuild can have; your real photos, brand and numbers go in at build time.'
  },
  {
    slug: 'titan-hvac',
    name: 'Titan HVAC Houston',
    industry: 'HVAC',
    area: 'Houston, TX',
    phone: '281-552-7766',
    phoneLink: 'tel:+12815527766',
    brand: { dark: '#0c2431', mid: '#14405a', accent: '#f0682b', accent2: '#7fd1e0', light: '#f2f6f8' },
    kicker: 'Houston heating & air: installations, repairs, maintenance',
    headline: 'When it is 98 outside, the cool call answers in seconds',
    sub: 'Titan HVAC serves greater Houston with installation, repair and maintenance you can schedule online and trust on time. A contact page should never be where people go to call about a broken AC.',
    heroTags: ['24/7 emergency', 'Same-day service', 'Financing available'],
    ctaPrimary: { label: 'Call 281-552-7766', href: 'tel:+12815527766' },
    ctaSecondary: { label: 'Book a service', href: '#booking' },
    trust: [
      { n: 'TACLA', l: 'Licensed & insured' },
      { n: '4.7', l: 'Average rating' },
      { n: '0%', l: 'Financing offers' },
      { n: '24/7', l: 'Emergency line' }
    ],
    servicesTitle: 'Services a Houston HVAC site has to own',
    services: [
      { t: 'AC repair', d: 'Diagnostics and repair for all major brands, prioritized by how hot your house is getting.' },
      { t: 'AC installation', d: 'Sizing, load and efficiency guidance, then a clean install with financing priced up front.' },
      { t: 'Preventive maintenance', d: 'Seasonal tune-up plans that keep warranties valid and breakdowns rare.' },
      { t: 'Emergency service', d: '24/7 line and on-call priority for after-hours failures.' }
    ],
    finance: {
      title: 'Financing with the cost questions answered',
      sub: 'A financing section that names terms up front so the can-I-afford-it question never stops a call.',
      points: ['0% APR promotional plans where offered', 'Estimates in writing before work starts', 'Warranty details on parts and labor']
    },
    booking: true,
    bookingTitle: 'Book a technician online',
    bookingSub: 'In the real build, this connects to a real-time schedule or your dispatch software.',
    testimonial: 'They showed up at 7pm same-day and had us cold again by 9. (Placeholder for a real Houston client.)',
    proofLine: 'This is a concept homepage for Titan HVAC Houston. Real phone numbers, booking and financing sections are what you approve in the build.'
  },
  {
    slug: 'jb-rogers',
    name: 'JB Rogers Landscape',
    industry: 'Landscaping',
    area: 'Austin, TX',
    phone: '512-243-2413',
    phoneLink: 'tel:+15122432413',
    brand: { dark: '#232b1e', mid: '#3c4a33', accent: '#b58a3c', accent2: '#889c6b', light: '#f5f2eb' },
    kicker: 'Three generations of Austin landscaping',
    headline: 'The Rogers name has been on Austin lawns since 1962',
    sub: 'JB Rogers builds and maintains landscapes across Travis County. A family name more than sixty years in the soil deserves a site that looks like the legacy it carries.',
    heroTags: ['Est. 1962', 'Family owned', 'Design + maintenance'],
    ctaPrimary: { label: 'Call 512-243-2413', href: 'tel:+15122432413' },
    ctaSecondary: { label: 'Get an estimate', href: '#estimate' },
    trust: [
      { n: '1962', l: 'Family owned' },
      { n: '60+', l: 'Years in Austin' },
      { n: '3', l: 'Generations' },
      { n: 'TX', l: 'Travis Co. service' }
    ],
    servicesTitle: 'Services structured for search and sales',
    services: [
      { t: 'Landscape design', d: 'Plans that fit Austin lots, Austin sun and Austin watering rules.' },
      { t: 'Installation', d: 'Planting, sod, irrigation and hardscape installed by the same crews that design.' },
      { t: 'Lawn care programs', d: 'Mowing, fertilizing and weed control on schedules you set once.' },
      { t: 'Treescapes', d: 'Shade and structure planting sized to stay in the space as it grows.' }
    ],
    gallery: {
      title: 'Six decades of work, presented properly',
      sub: 'A portfolio section that treats projects as documentation: photos, scope, and the year the work was done.',
      items: ['Design/build, Westlake', 'Irrigation + planting, Tarrytown', 'Lawn program, Round Rock', 'Treescapes, Rollingwood']
    },
    booking: true,
    bookingTitle: 'Request a free estimate',
    bookingSub: 'A short form that gathers scope, timing and photos, then routes to the right crew lead.',
    testimonial: 'Same family answering the phone as forty years ago, and the yard has never looked better. (Placeholder for a real quote.)',
    proofLine: 'This is a concept homepage for JB Rogers Landscape. It shows the structure and feel of a rebuild, approval-ready.'
  }
];