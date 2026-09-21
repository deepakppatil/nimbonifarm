# Nimboni Farm

Website for a four-acre permaculture farm in Maharashtra: a farm stay and a
weekend permaculture design course. Built with React 19 + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
npm run lint
```

---

## What changed in this redesign

The old site was a competent but generic React template: grey-on-white, Inter
throughout, a stock Vite favicon, and a booking form that ended in
`console.log()`. It described the farm without ever making you want to go there.

The rebuild is built around one idea, taken straight from the farm's own
history: **this land was bare in 2016, and it is a forest now.** That
transformation is the single most persuasive thing about the place, so it leads
the page instead of sitting buried in an "About" block.

### Art direction

- **Parchment, forest ink, clay, harvest amber.** No neutral grey — the palette
  is soil, leaf and sun. A single low-opacity paper-grain film sits over the
  whole page to keep the photography from feeling like a screenshot.
- **Fraunces** for display (organic, high-contrast serif with a soft, wonky
  italic) against **Inter** for UI. Small-caps eyebrows with a leading rule are
  the recurring editorial signature.
- **Photography first.** The drone imagery is the best asset the farm has, so it
  is full-bleed, un-cropped and given room to breathe.

### Structure, in the order a visitor meets it

| Section | Job |
| --- | --- |
| **Hero** | Full-bleed drone loop. "Barren ground in 2016. / A living farm forest now." Four hard numbers underneath. |
| **Marquee** | Credentials ticker — organic, rainwater, solar, zero waste. |
| **The turn** | The origin story, the eight permaculture principles, and a stat band that counts up on scroll. |
| **Two ways in** | Farm stay vs. course, priced, with a tabbed hour-by-hour schedule for each. |
| **The food forest** | The species that are actually planted, with counts. |
| **From above** | Mosaic gallery + lightbox (the old grid rendered nothing — it sliced a 4-item array at index 4). |
| **Guest book** | Working feedback wall. |
| **Plan a visit** | Booking form with a live estimate rail and a real WhatsApp handoff. |
| **Before you come** | FAQ accordion that answers the objections that stop a booking. |
| **Find us** | Map, directions, both WhatsApp lines. |

Plus a **sticky mobile bar** so the booking CTA is never more than a thumb away,
and a scroll-progress hairline in the header.

### Conversion work

- **The booking form goes somewhere.** It validates, stores the enquiry locally,
  then opens WhatsApp with every detail pre-written for the farm to read. The
  old form validated, logged to the console, and thanked you.
- **Per-service rules.** Weekend-only validation now applies to the course only
  — it used to reject weekday farm stays too, which is a third of the week's
  potential bookings turned away.
- **Live estimate rail** next to the form, so nobody has to do mental arithmetic.
- **Service cards hand their choice to the form.** "Check dates" on the course
  card scrolls to booking *with the course already selected*.
- **Price shown early and plainly**, with what's included.

### Engineering

- **Media is 3 MB, not 90 MB.** The 78 MB 4K drone clip is now a 495 KB 720p
  loop with a poster frame; the 4 MB JPEGs are WebP at 640/1280/1920 with JPEG
  fallbacks. Originals stay in `src/assets/farm-images/` as masters and are
  deliberately not imported, so they never reach the bundle.
- **Video respects `prefers-reduced-motion` and Save-Data** — it never
  auto-plays in those cases.
- Content is split out into `src/data/site.js`; components hold no copy.
- Scroll-reveal, count-up and nav highlighting all run off `IntersectionObserver`.
- Keyboard-navigable lightbox, proper accordion semantics, skip link, focus
  rings, `aria-invalid` on failed fields.
- `node_modules/` and `.DS_Store` are no longer tracked.

---

## Before you go live

Every value marked `TODO` in `src/data/site.js` is a placeholder inherited from
the original build. Nothing else needs editing.

1. **WhatsApp numbers and contact names** — currently `+919930123456` /
   "Mr. Foo Bar" and `+919930456789` / "Mrs. Foo Bar".
2. **Address** — "Survey No. 123/4, Near Green Valley … 410XXX".
3. **Driving distances** — the FAQ and "find us" card need real times from Pune
   and Mumbai.
4. **Email** — `hello@nimbonifarm.example`.
5. **Social links** — still pointing at `instagram.com`, `facebook.com`,
   `youtube.com`.
6. **`<link rel="canonical">` in `index.html`** — set to the real domain.

Two things to decide on:

- **The guest book is local-only.** Notes are saved in the visitor's browser, so
  new visitors see an empty wall. Fabricating testimonials would have been the
  faster-looking option and the wrong one — but an empty wall does not sell.
  Either point this form at a real backend/review platform, or paste in genuine
  guest feedback once you have it.
- **Enquiries have no server.** The form hands off to WhatsApp and keeps a copy
  in `localStorage`. That matches how the farm actually works, but it means no
  enquiry is captured if a visitor closes the tab without sending. A form
  endpoint (Formspree, a Netlify function, anything) would close that gap.

## Layout

```
src/
  data/site.js          all copy, prices, contacts, links
  components/           one file per section
  lib/hooks.js          reveal, count-up, scroll progress, body lock
  styles/
    tokens.css          palette, type scale, spacing, motion
    base.css            reset, typography, buttons, primitives
    sections.css        per-section layout
public/media/           optimised derivatives (WebP/JPEG/MP4)
```
