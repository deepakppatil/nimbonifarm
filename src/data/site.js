/**
 * Nimboni Farm — single source of truth for every word, number and link
 * on the site.
 *
 * Everything marked `TODO` is a placeholder carried over from the original
 * build (fake phone numbers, "Mr. Foo Bar", survey numbers, social URLs).
 * Replace those values here and the whole site updates — no component edits
 * needed.
 */

export const FARM = {
  name: 'Nimboni Farm',
  tagline: 'Permaculture Farm Stay & Learning Centre',
  established: 2016,
  location: 'Maharashtra, India',
  // TODO: replace with the real postal address
  address: [
    'Nimboni Farm',
    'Taluka - Erandol',
    'Maharashtra 425109',
    'India',
  ],
  mapUrl: 'https://maps.app.goo.gl/E1kVSBikEybRzZaS8',
  // TODO: real driving distances. These drive the "how far" copy on the visit page.
  distanceNotes: [
    { from: 'Pune', detail: '~350 Km/6 Hours' },
    { from: 'Mumbai', detail: '~400 Km/6 Hours' },
    { from: 'Nearest railway station', detail: 'Jalgaon / 40 Mins' },
  ],
  email: 'info@nimbonifarm.com', // TODO
}

/**
 * WhatsApp is the real booking channel for this farm — there is no payment
 * gateway. Both numbers are placeholders in the original build.
 */
export const CONTACTS = [
  { person: 'Admin@Nimboni', number: '+919930XXXXXX', role: 'Stays & bookings(Booking are yet to be opened' }, // TODO
]

export const SOCIALS = [
  // TODO: point these at the real accounts
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
]

export const whatsappLink = (number, message) =>
  `https://wa.me/${number.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`

export const whatsappHref = (message, index = 0) =>
  whatsappLink(CONTACTS[index]?.number ?? CONTACTS[0].number, message)

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: 'Nimboni Farm · Maharashtra',
  lineOne: 'Barren ground in 2016.',
  lineTwo: 'A living farm forest now.',
  body:
    'Four acres of regenerated land — 700+ trees, no chemicals, and one stubborn idea: ' +
    'if you stop fighting the land, it feeds you. Come sleep in it, or come learn how we did it.',
  primaryCta: { label: 'Plan your weekend', target: 'booking' },
  secondaryCta: { label: 'See the farm from above', target: 'gallery' },
  stats: [
    { value: 4, suffix: '', label: 'acres', sub: 'of regenerated land' },
    { value: 700, suffix: '+', label: 'trees', sub: 'across 15+ species' },
    { value: 10, suffix: '+', label: 'species', sub: 'in the food forest' },
    { value: 0, suffix: '', label: 'chemicals', sub: 'since day one' },
  ],
  trust: [
    'NPOP Organic',
    'Rainwater Harvested',
    'Solar Powered',
    'Zero Waste',
    'Pollinator Friendly',
    'Permaculture Demo Site',
  ],
}

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

/**
 * Optimised derivatives live in /public/media (WebP at 640/1280/1920 with a
 * JPEG fallback). The multi-megabyte originals stay in src/assets/farm-images
 * as masters and are deliberately not imported.
 */
export const MEDIA = [
  {
    id: 'farm-01',
    alt: 'Aerial view of the Nimboni Farm canopy at midday',
    caption: 'The canopy from 120 feet — nine growing seasons, one slope.',
  },
  {
    id: 'farm-03',
    alt: 'Permaculture beds and tree lines laid out across the farm',
    caption: 'Contour beds and tree lines, laid out to hold water where it falls.',
  },
  {
    id: 'farm-02',
    alt: 'Green hillside terraces on the Nimboni Farm estate',
    caption: 'The eastern terraces, planted to stop the topsoil leaving.',
  },
  {
    id: 'drone',
    type: 'video',
    alt: 'Six-second drone flight over Nimboni Farm',
    caption: 'Six seconds over four acres.',
  },
]

export const mediaSrc = (id, width) => `/media/${id}-${width}.webp`
export const mediaFallback = (id) => `/media/${id}.jpg`

export const HERO_VIDEO = {
  src: '/media/drone-hero.mp4',
  poster: '/media/drone-poster.webp',
}

/* ------------------------------------------------------------------ */
/* The story                                                           */
/* ------------------------------------------------------------------ */

export const STORY = {
  eyebrow: 'The turn',
  title: 'We did not plant a farm. We stopped undoing one.',
  paragraphs: [
    'What started as barren land in 2016 has turned into a working ecosystem. No grand ' +
      'design arrived on day one — just careful observation, patient regeneration, and a ' +
      'willingness to let natural cycles set the pace.',
    'Today the farm carries over 700 trees across 15+ varieties: a layered food forest ' +
      'where beneficial insects, birds and soil microbiology do most of the labour. ' +
      'No chemical fertiliser, no pesticides. Just regenerative agriculture, practised ' +
      'long enough that the land started doing it by itself.',
  ],
  principles: [
    { icon: '👁️', name: 'Observe & Interact' },
    { icon: '💧', name: 'Catch & Store Energy' },
    { icon: '🌿', name: 'Obtain a Yield' },
    { icon: '🔄', name: 'Apply Self-Regulation' },
    { icon: '🌍', name: 'Use & Value Renewables' },
    { icon: '♻️', name: 'Produce No Waste' },
    { icon: '🎨', name: 'Design from Patterns' },
    { icon: '🤝', name: "Integrate, Don't Segregate" },
  ],
  imageNote: 'Survey No. 123/4 — the same slope, nine growing seasons on.',
}

/* ------------------------------------------------------------------ */
/* Experiences (services)                                              */
/* ------------------------------------------------------------------ */

export const EXPERIENCES = [
  {
    id: 'farm-stay',
    kicker: 'Stay',
    title: 'Farm Stay',
    summary:
      'Sleep inside the food forest. Wake to birdsong, eat what was picked that morning, ' +
      'and let the day be arranged by the sun for once.',
    price: 4500,
    priceUnit: 'per person / night',
    priceNote: 'Includes all three meals, farm tours and evening bonfire in season.',
    accent: 'leaf',
    icon: '🏡',
    features: [
      'Eco-friendly mud & bamboo cottages',
      'Farm-to-table organic meals — 3 a day',
      'Guided farm tour & nature walk',
      'Bird watching and stargazing',
      'Bonfire evenings (in season)',
      'Wi-Fi in the common areas',
      'Pick-up and drop from the nearest station',
    ],
    requiresWeekend: false,
    itinerary: [
      { time: 'Arrive · afternoon', text: 'Settle into your cottage, walk the tree lines with a cup of lemongrass tea.' },
      { time: 'Late afternoon', text: 'Guided farm tour — the water systems, the compost, the lime terraces.' },
      { time: 'Evening', text: 'Wood-fire dinner from that morning’s harvest, then the bonfire.' },
      { time: 'Night', text: 'No streetlights for eleven kilometres. The sky does the rest.' },
      { time: 'Early morning', text: 'Bird walk at first light — over forty species recorded on the farm.' },
      { time: 'Breakfast & departure', text: 'Farm breakfast, then a slow goodbye.' },
    ],
  },
  {
    id: 'permaculture-course',
    kicker: 'Learn',
    title: 'Permaculture Design Course',
    summary:
      'A two-day weekend intensive, taught standing up in the field. You leave with a ' +
      'design for your own patch of land — balcony, terrace or acreage.',
    price: 12000,
    priceUnit: 'per person, all-inclusive',
    priceNote: 'Stay, all meals, course materials and certificate included.',
    schedule: 'Saturdays & Sundays · 9 AM – 5 PM',
    accent: 'clay',
    icon: '🌱',
    features: [
      'Permaculture ethics & principles',
      'Soil building and composting',
      'Water harvesting & management',
      'Food forest design & implementation',
      'Natural building basics',
      'Seed saving & propagation',
      'Design your own project',
      'Certificate of completion',
    ],
    requiresWeekend: true,
    itinerary: [
      { time: 'Day 1 · morning', text: 'Ethics, principles, and how to read a piece of land.' },
      { time: 'Day 1 · afternoon', text: 'Soil. Hands in it — compost building, sheet mulching, biology you can see.' },
      { time: 'Day 2 · morning', text: 'Water. Contours, swales, harvesting — then a walk to the farm’s own systems.' },
      { time: 'Day 2 · afternoon', text: 'Design your own project, present it, take it home. Certificate at 5 PM.' },
    ],
  },
]

export const GROUP_ENQUIRY = {
  id: 'group-visit',
  title: 'Group, school or corporate visit',
  summary: 'Custom dates, custom programme. Tell us the headcount and what you want the day to teach.',
}

/* ------------------------------------------------------------------ */
/* Food forest                                                         */
/* ------------------------------------------------------------------ */

export const SPECIES = [
  { name: 'Lime', count: 450, note: 'Organic cultivation across two acres', icon: '🍋', tone: '#8FBC5A' },
  { name: 'Mahogany', count: 100, note: 'Premium timber, 15+ years established', icon: '🌳', tone: '#3F6B34' },
  { name: 'Indian Lilac (Nim)', count: 10, note: 'The native guardian the farm is named for', icon: '🌿', tone: '#5E8C3F' },
  { name: 'Guava', count: 2, note: 'White and pink-fleshed varieties', icon: '🍐', tone: '#A7C46A' },
  { name: 'Chikoo', count: 2, note: 'Sweet sapodilla, fruiting in summer', icon: '🍑', tone: '#C2703C' },
  { name: 'Banana', count: 2, note: 'Multiple harvest cycles a year', icon: '🍌', tone: '#D9A62E' },
]

export const SPECIES_NOTE =
  'Six of the fifteen species on the farm, and the ones you are most likely to taste. ' +
  'The remaining 130-odd trees are spread across nine more — fruit, timber, nitrogen-fixers ' +
  'and the understory that holds it all together.'

/* ------------------------------------------------------------------ */
/* Good to know / FAQ                                                  */
/* ------------------------------------------------------------------ */

export const FAQ = [
  {
    q: 'Is the farm actually chemical-free?',
    a: 'Yes — no synthetic fertiliser and no pesticides have gone on this land since 2016. ' +
      'The farm works on compost, mulch, cover crops and beneficial insects instead.',
  },
  {
    q: 'What should we pack?',
    a: 'Closed shoes you do not mind getting muddy, a hat, a torch, and warm layers for the ' +
      'evening — it cools down faster than the city. Binoculars if you have them.',
  },
  {
    q: 'Is it suitable for children?',
    a: 'Very. Kids get the most out of the farm tour and the animal-feeding rounds. ' +
      'Tell us their ages when you book and we will shape the day around them.',
  },
  {
    q: 'Is there mobile network and Wi-Fi?',
    a: 'Wi-Fi is available in the common areas. Mobile coverage is patchy away from the ' +
      'cottages — most guests stop noticing by the second day.',
  },
  {
    q: 'What food is served?',
    a: 'Three farm-to-table vegetarian meals a day, largely grown on site. Tell us about ' +
      'allergies or dietary requirements in the booking notes and we will cook around them.',
  },
  {
    q: 'What is the weather like, and do you open in the monsoon?',
    a: 'The farm is at its greenest between July and September. The monsoon is a genuinely ' +
      'beautiful time to visit, but some trails close — ask when you book and we will be honest.',
  },
  {
    q: 'How do I confirm a booking?',
    a: 'There is no payment gateway. Send the form, then message us on WhatsApp — we confirm ' +
      'availability and hold your dates there. It is deliberately low-tech.',
  },
  {
    q: 'Can we bring a pet?',
    a: 'Usually yes, if they are comfortable around farm animals. Mention it in the booking ' +
      'notes so we can prepare a space.',
  },
]

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV = [
  { id: 'story', label: 'The Farm' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'forest', label: 'Food Forest' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'booking', label: 'Plan a Visit' },
  { id: 'visit', label: 'Find Us' },
]
