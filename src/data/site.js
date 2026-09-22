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
  address: [
    'Nimboni Farm',
    'Bhalgaon Chowk, Jalu',
    'Taluka - Erandol, Maharashtra 425109',
    'India',
  ],
  mapUrl: 'https://maps.app.goo.gl/E1kVSBikEybRzZaS8',
  distanceNotes: [
    { from: 'Pune(via Ssamruddhi Expressway)', detail: '~350 Km/7 Hours' },
    { from: 'Mumbai(via Ssamruddhi Expressway)', detail: '~400 Km/6 Hours' },
    { from: 'Nearest railway station', detail: 'Jalgaon, 40 Mins' },
  ],
  email: 'info@nimbonifarm.com', 
}

/**
 * WhatsApp is the real booking channel for this farm — there is no payment
 * gateway. Both numbers are placeholders in the original build.
 */
export const CONTACTS = [
  { person: 'Admin - Nimboni Farms', number: '+91-XXXXXXXXXX', role: 'Stays & bookings(Booking are yet to be opened' },
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
  eyebrow: 'Nimboni Farm · Maharashtra · Established 2016',
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
    'Bird Friendly',
    'Rainwater Harvested',
    'Solar Powered',
    'Zero Waste',
    'Pollinator Friendly',
    'Forest',
    'Wildlife Habitat',
    'Organic',
    'Biodiversity',
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
      'and let the day be arranged by the sun for once. A weekend of slow mornings, muddy shoes and a slightly rearranged ' +
      'idea of what a piece of land can do, No Wi-Fi, no TV, no distractions — just the farm and its rhythms!',
    price: 4000,
    priceUnit: 'per person / night',
    priceNote: 'Includes all three meals, farm tours and evening bonfire in season.',
    schedule: 'All Days · Check-in: 12:00, Check-out: 11:00',
    accent: 'leaf',
    icon: '🏡',
    features: [
      '2 BHK Villa with Fully Equipped Kitchen & Dining Area',
      'Lunch, Dinner & Breakfast from the farm',
      'Guided farm tour & nature walk',
      'Bird watching and stargazing',
      'Bonfire evenings (in season)',
      'Amenities: Luxury Bed, towels, toiletries in common areas, hammocks, outdoor seating, fire pit, open-air dining, and more',
      'Endulge in the books from our library',
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
    kicker: 'Experience & Learn',
    title: 'Permaculture Design Course',
    summary:
      'A hands-on weekend course, taught standing up in the field. The first day covers the ' +
      'core work; the second is lighter, with time to reflect, revisit what we did and connect ' +
      'it to your own patch of land — balcony, terrace or acreage.',
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
      'Certificate of completion',
    ],
    requiresWeekend: true,
    itinerary: [
      { time: 'Day 1 · morning', text: 'Ethics, principles, and how to read a piece of land.' },
      { time: 'Day 1 · afternoon', text: 'Soil. Hands in it — compost building, sheet mulching, biology you can see.' },
      { time: 'Day 2 · morning', text: 'Revisit the farm’s water systems and reflect on how the pieces fit together.' },
      { time: 'Day 2 · afternoon', text: 'Open conversation, questions and time to connect the work to your own project. Certificate at 5 PM.' },
    ],
  },
]

export const GROUP_ENQUIRY = {
  id: 'group-visit',
  title: 'Group, school or corporate visit',
  summary: 'Custom dates, custom programme. Tell us the headcount and what you want the day to teach.',
}

/* ------------------------------------------------------------------ */
/* People and testimonials                                             */
/* ------------------------------------------------------------------ */

export const TEAM = [
  {
    name: 'The farm team',
    role: 'Land, food and welcome',
    note: 'The people who keep the food forest growing, the kitchen moving and the welcome warm.',
    initials: 'FT',
  },
  {
    name: 'Your field guide',
    role: 'Farm walks and learning',
    note: 'Ask a question about soil, water or trees and someone will probably lead you outside to show you.',
    initials: 'FG',
  },
  {
    name: 'The living landscape',
    role: 'Resident host',
    note: 'Birds, pollinators, shade trees and the occasional very confident chicken are part of the team too.',
    initials: 'LL',
  },
]

export const TESTIMONIALS = [
  {
    id: 'first-visit',
    name: 'Your story could be here',
    rating: 5,
    message: 'We are opening this space for the first guests and learners who want to share what the farm felt like in their own words.',
    date: '2026-01-01T00:00:00.000Z',
  },
]

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
    q: 'What is a stay at Nimboni Farm actually like?',
    a: 'It is less resort, more living landscape. Expect birdsong, fresh food, muddy paths, slow mornings and very few reasons to check your phone. The farm is remote, peaceful and gloriously unhurried.',
  },
  {
    q: 'What is included in a farm stay?',
    a: 'Your stay includes accommodation, three vegetarian meals a day, a guided farm tour, a nature walk and seasonal evening activities such as a bonfire. We will confirm the exact details when we reply on WhatsApp.',
  },
  {
    q: 'How much does a farm stay cost?',
    a: 'Farm stays are priced at INR 4,000 per person per night, including accommodation, meals and listed farm activities. Send us your dates and group size for confirmation.',
  },
  {
    q: 'How many guests can stay, and how many nights can we book?',
    a: 'Farm stays currently allow up to six guests and a maximum of two nights. Larger groups should send us a separate enquiry so we can suggest the best arrangement.',
  },
  {
    q: 'Is the farm actually chemical-free?',
    a: 'Yes. No synthetic fertilisers or pesticides have been used on the farm since 2016. We rely on compost, mulch, cover crops and beneficial insects instead.',
  },
  {
    q: 'What should we pack?',
    a: 'Pack relaxed clothes, closed shoes you do not mind getting muddy, a hat, sunscreen, a torch and warm layers for the evening. Binoculars are optional but highly recommended if you enjoy being quietly judged by birds.',
  },
  {
    q: 'Is it suitable for children?',
    a: 'Yes, provided they are comfortable with uneven ground, outdoor walks and a little dust. Tell us their ages when you enquire so we can suggest the most suitable activities.',
  },
  {
    q: 'Is there mobile network and Wi-Fi?',
    a: 'There is no Wi-Fi at the farm. Jio coverage is generally good, while Airtel may be intermittent away from the villa. Consider it a gentle invitation to let the trees have your attention for a while.',
  },
  {
    q: 'What food is served?',
    a: 'Vegetarian meals feature local cuisine and seasonal produce, much of it grown on the farm(depdending on season). Barbecue and non-vegetarian meals can be arranged with advance notice with extra charges. We are in a remote village, but several excellent local restaurants nearby serve both vegetarian and non-vegetarian food if you have your own vehicle. Contact us and we will gladly guide you.',
  },
  {
    q: 'Are the rooms air-conditioned?',
    a: 'The rooms are not air-conditioned. During the monsoon and winter, you should not need it: the property opens into the greens through large windows, bringing in fresh air and the landscape itself. Summer conditions can vary, so contact us before booking if this is important to you.',
  },
  {
    q: 'What is the weather like, and do you open in the monsoon?',
    a: 'The farm is green throughout the year, with the monsoon usually bringing its most dramatic transformation. Some paths may be harder to access during heavy rain, so ask us about current conditions before travelling.',
  },
  {
    q: 'How is the Permaculture Design Course structured?',
    a: 'The core course is covered on the first day, with plenty of hands-on time in the field. The second day is much lighter — we revisit what we did, reflect on the process, answer questions and connect the ideas to your own land or project.',
  },
  {
    q: 'How do I confirm a booking?',
    a: 'Fill in the booking form and send it to the farm on WhatsApp. We will check availability and reply with the next steps. Your dates are confirmed only after we respond.',
  },
  {
    q: 'Are there security cameras at the farm?',
    a: 'Camera surveillance is present in public areas for security. Private spaces, bedrooms and guest areas remain private.',
  },
  {
    q: 'How do we find the farm?',
    a: 'We are near Jalu in Erandol, Maharashtra. The final stretch is a farm track, so open the map before you leave and message us when you are close. Someone will guide you in from there.',
  },
  {
    q: 'Can we bring a pet?',
    a: 'Yes, pets are welcome, but they are strictly not allowed inside the bedrooms. Please mention your pet when booking so we can help make the stay comfortable for everyone.',
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
  { id: 'faq', label: 'FAQ' },
]
