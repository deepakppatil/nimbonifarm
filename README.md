# Nimboni Farm - Permaculture Farm Stay & Learning Center

A modern, responsive React website for Nimboni Farm — a 4-acre permaculture farm in Maharashtra, India offering farm stays, permaculture design courses, and regenerative agriculture experiences.

## 🌿 Overview

Nimboni Farm is a thriving permaculture farm transformed from barren land since 2015. The farm hosts 700+ trees across 15+ varieties, creating a biodiverse food forest ecosystem. This website showcases the farm's offerings, enables bookings via WhatsApp, and shares the farm's regenerative agriculture journey.

## ✨ Features

### Core Sections
- **Hero** — Immersive landing with animated brand icon, trust badges, and key statistics
- **Featured Trees** — Interactive carousel showcasing 6 key tree species with animated cards
- **About** — Farm story, permaculture principles, and certifications
- **Services** — Farm Stay Experience (₹4,500/night) & Permaculture Design Course (₹12,000/person)
- **Gallery** — Photo & video carousel with lightbox (supports images + drone video)
- **Booking** — Weekend-only booking form with validation, submits via WhatsApp
- **Contact** — Google Maps embed with animated marker, visit info, social links, WhatsApp booking
- **Feedback** — Guest feedback wall with star ratings, stored in localStorage
- **Footer** — Brand, quick links, copyright

### Design Highlights
- **Custom SVG Brand Icon** — Animated leaf with gradients, used in Hero (72px), Header (28px), Footer (24px)
- **Airbnb-inspired Design System** — Inter font, neutral grays, sage green accent, subtle shadows
- **Consistent White Background** — All sections use white/gray-50, no dark mode overrides
- **Micro-interactions** — Hover lifts, floating animations, bounce markers, staggered reveals
- **Accessibility** — Semantic HTML, ARIA labels, focus-visible states, keyboard navigation

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 (functional components, hooks) |
| Build Tool | Vite 8 |
| Styling | Custom CSS with CSS Variables (design tokens) |
| Fonts | Inter (Google Fonts, 300-700) |
| Linting | oxlint (ESLint-compatible) |
| Icons | Custom inline SVGs |
| Deployment | Static assets (Vite build) |

## 📁 Project Structure

```
permaculture-farm/
├── index.html                 # Entry HTML with font preconnect
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.jsx              # React entry point
│   ├── index.css             # Design tokens, base styles, utilities
│   ├── App.jsx               # All components (single file for simplicity)
│   └── assets/
│       └── farm-images/      # DJI drone photos + Drone.mp4
└── dist/                     # Production build output
```

## 🎨 Design System (CSS Variables)

### Colors
```css
/* Neutrals */
--color-gray-50  #fafafa   /* Section backgrounds */
--color-gray-100 #f5f5f5   /* Card hover, inputs */
--color-gray-500 #737373   /* Muted text */
--color-gray-700 #404040   /* Body text */
--color-gray-900 #171717   /* Headings */

/* Brand */
--color-sage       #7a9e5e  /* Primary accent */
--color-sage-light #9cc47a  /* Hover states */
--color-sage-dark  #5d7a45  /* Active states */
--color-accent     #e86c4a  /* Terracotta for pricing */

/* Semantic */
--color-white      #ffffff
--color-border     rgba(0,0,0,0.06)
--color-shadow     rgba(0,0,0,0.04)
```

### Typography
- **Display & UI**: Inter (300-700)
- **Scale**: `clamp()` fluid sizing
- **Features**: `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'`

### Spacing & Radius
- **Spacing**: 4px base (`--spacing-1` through `--spacing-32`)
- **Radius**: 8px–32px (`--radius-sm` to `--radius-2xl`)
- **Shadows**: 4 elevation levels (`--elevation-1` to `--elevation-4`)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Develop
```bash
npm install
npm run dev          # Start dev server at http://localhost:5173
```

### Build & Preview
```bash
npm run build        # Production build to /dist
npm run preview      # Preview production build
npm run lint         # Run oxlint
```

## 📱 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | < 640px | Single column, stacked layouts |
| Tablet | 640–959px | 2-col grids, adjusted padding |
| Desktop | 960–1199px | Multi-col grids, side-by-side layouts |
| Large | ≥ 1200px | Max container width 1200px |

## ♿ Accessibility

- Semantic HTML5 (`header`, `main`, `section`, `footer`, `nav`, `article`)
- ARIA labels on all interactive elements
- `focus-visible` outlines (2px sage, 2px offset)
- Skip link (hidden until focused)
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast ratios ≥ 4.5:1
- Keyboard-navigable gallery lightbox (Esc, arrows)

## 🌍 SEO & Meta

- **Title**: "Nimboni Farm"
- **Description**: "Nimboni Farm - 4 acres, 700+ trees, permaculture farm stay, weekend courses in Maharashtra"
- **Theme Color**: `#7a9e5e` (sage)
- **Open Graph**: Ready for social sharing (add tags as needed)
- **Sitemap**: Generate from routes for production

## 📸 Assets

All farm media in `src/assets/farm-images/`:
- `DJI_0924.JPG` — Hero background (4.3 MB)
- `DJI_0964.JPG` — Gallery image (4.1 MB)
- `DJI_0965.JPG` — Gallery image (4.2 MB)
- `Drone.mp4` — Drone tour video (81 MB, plays inline/muted/looped)

> **Note**: Large assets are imported via Vite for hashing. For production, consider:
> - Image optimization (WebP/AVIF, responsive sizes)
> - Video compression / external hosting (Vimeo/YouTube)
> - CDN delivery

## 📦 Deployment

### Static Hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages)
```bash
npm run build
# Deploy /dist folder
```

### Build Output
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css      (~38 KB gzipped)
│   ├── index-[hash].js       (~264 KB gzipped)
│   ├── DJI_0924-[hash].JPG
│   ├── DJI_0964-[hash].JPG
│   ├── DJI_0965-[hash].JPG
│   └── Drone-[hash].mp4
└── favicon.svg, icons.svg
```

### Environment Variables
None required for current implementation. All config in source.

## 🔧 Customization

### Update Farm Info
Edit constants at top of `src/App.jsx`:
```jsx
const WHATSAPP_NUMBERS = ['+919930123456', '+919930456789']
const CONTACT_PERSONS = ['Mr. Foo Bar', 'Mrs. Foo Bar']
const TREE_TYPES = [ ... ]
const SERVICES = [ ... ]
```

### Modify Design Tokens
Edit `src/index.css` `:root` variables for colors, spacing, fonts.

### Add Sections
1. Create component function in `App.jsx`
2. Add styles in `App.css`
3. Include in `App()` render order

## 🐛 Known Limitations

- Single-file `App.jsx` — consider splitting for team scaling
- Large media files increase bundle size
- Google Maps iframe uses placeholder coordinates (update `src` with actual embed URL)
- Feedback stored in localStorage only (no backend)
- No i18n support

## 📄 License

MIT License — feel free to adapt for your own farm/project.

## 🤝 Credits

- **Design Inspiration**: Airbnb Design System
- **Font**: Inter by Rasmus Andersson (Google Fonts)
- **Icons**: Custom SVGs + Unicode emojis
- **Images**: Nimboni Farm drone photography

---

**Built with ❤️ for regenerative agriculture**