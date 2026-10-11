<div align="center">

# 🌿 Nimboni Farm

**A four-acre permaculture farm in Maharashtra — farm stay, weekend courses, and a living food forest.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github)](https://pages.github.com/)
[![License](https://img.shields.io/badge/License-Proprietary-lightgrey.svg)](#license)

[Overview](#-overview) ·
[Features](#-features) ·
[Getting Started](#-getting-started) ·
[Project Structure](#-project-structure) ·
[Deployment](#-deployment) ·
[Release Process](#-release-process)

</div>

---

## 🌱 Overview

**Nimboni Farm** is the website for a four-acre permaculture farm in Maharashtra, offering a farm stay and a weekend permaculture design course.

The site is built around the farm’s central story: **bare ground in 2016 became a living farm forest**. It leads with that transformation through full-bleed drone imagery, a warm earth-and-forest visual language, and a booking experience designed to turn interest into a WhatsApp enquiry.

Built with **React 19 + Vite**, optimized for fast static hosting, and deployed through GitHub Actions to GitHub Pages.

---

## ✨ Features

### Experience-led design

- Full-bleed drone video hero: *“Barren ground in 2016. A living farm forest now.”*
- Parchment, forest ink, clay, and harvest-amber palette.
- **Instrument Serif** for display typography paired with **Inter** for interface text.
- Photography-first layout with a subtle paper-grain texture.
- Custom neem-sprig brand mark and `Nimboni.farm` wordmark.

### Visitor journey

| Section | Purpose |
|---|---|
| **Hero** | Establish the farm’s transformation with drone footage and key facts |
| **Marquee** | Highlight organic practices, rainwater harvesting, solar power, and zero waste |
| **The Turn** | Tell the origin story and introduce permaculture principles |
| **Two Ways In** | Compare the farm stay and permaculture course |
| **Farm Stay** | Showcase the villa, night skies, weather, and moonlight considerations |
| **Food Forest** | Present planted species and biodiversity |
| **From Above** | Aerial photographs, drone footage, and a farm-walk gallery |
| **Guest Book** | Collect and display visitor feedback |
| **Plan a Visit** | Booking form with live estimate and WhatsApp handoff |
| **Before You Come** | Answer common visitor questions |
| **Find Us** | Map, directions, and contact options |

### Booking and conversion

- Booking form validates input and opens WhatsApp with a pre-filled enquiry.
- Live estimate rail shows expected pricing as visitors select options.
- Course and farm-stay cards pass their selection directly into the booking form.
- Weekend-only scheduling rules apply specifically to the course.
- Sticky mobile booking bar keeps the primary call to action accessible.

### Engineering

- Optimized media: responsive WebP images with JPEG fallbacks and compressed MP4 video.
- Video respects `prefers-reduced-motion` and `Save-Data`.
- Content is centralized in `src/data/site.js`.
- Scroll reveal, count-up animations, and navigation highlighting use `IntersectionObserver`.
- Accessible lightbox, accordion, skip link, focus states, and form validation.
- `node_modules/` and `.DS_Store` are excluded from version control.

---

## 🚀 Getting Started

### Requirements

| Tool | Minimum version |
|---|---|
| [Node.js](https://nodejs.org/) | 18+ |
| [npm](https://www.npmjs.com/) | 9+ |

### Installation

```bash
git clone [https://github.com/deepakppatil/nimbonifarm.git](https://github.com/deepakppatil/nimbonifarm.git)
cd nimbonifarm
npm install
```

### Available scripts

```bash
npm run dev        # Start local development server at http://localhost:5173
npm run build      # Create production build in dist/
npm run preview    # Preview the production build locally
npm run lint       # Run linting
```

---

## ⚙️ Configuration

No environment variables are required for the standard build. Site content, contact details, pricing, links, and media references are managed in:

```text
src/data/site.js
```

Before going live, replace all `TODO` placeholders, including:

- WhatsApp numbers and contact names
- Farm address and driving directions
- Email address
- Social media links
- Canonical URL in `index.html`

---

## 📁 Project Structure

```text
src/
├── data/
│   └── site.js              # Copy, pricing, contacts, links, and media data
├── components/              # One component file per page section
├── lib/
│   └── hooks.js             # Reveal, count-up, scroll progress, and body-lock hooks
└── styles/
    ├── tokens.css           # Palette, typography, spacing, and motion tokens
    ├── base.css             # Reset, typography, buttons, and shared primitives
    └── sections.css         # Section-specific layout styles

public/
└── media/                   # Optimized WebP, JPEG, and MP4 assets
```

---

## 📦 Deployment

The production build is generated into `dist/`:

```bash
npm run build
```

The site can be deployed to any static hosting provider, including:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

For GitHub Pages, deployment is automated through GitHub Actions whenever a release tag is pushed.

---

## 🏷️ Release Process

This project uses `develop` for development and `main` for production releases. Production deployment is triggered only when a semantic version tag is pushed to `main`.

### Branch model

| Branch / ref | Purpose |
|---|---|
| `develop` | Active development and integration |
| `main` | Stable production release branch |
| `feature/*` | Feature or bug-fix branches |
| `vX.Y.Z` | Immutable release tags created on `main` |

### Versioning

The project follows [Semantic Versioning](https://semver.org/):

| Change type | Version example | Example |
|---|---|---|
| Bug fixes | `v1.0.1` | Patch release |
| New backward-compatible features | `v1.1.0` | Minor release |
| Breaking changes | `v2.0.0` | Major release |

### Standard release

1. Ensure all intended work is merged into `develop`.
2. Verify the site builds and behaves correctly.
3. Merge `develop` into `main`.
4. Run the release script.
5. Monitor the GitHub Actions deployment.

```bash
# Update develop
git checkout develop
git pull origin develop

# Merge develop into main
git checkout main
git pull origin main
git merge --no-ff develop
git push origin main

# Create and push a release
./scripts/release.sh patch
```

The release script supports:

```bash
./scripts/release.sh patch    # v1.0.0 -> v1.0.1
./scripts/release.sh minor    # v1.0.0 -> v1.1.0
./scripts/release.sh major    # v1.0.0 -> v2.0.0
./scripts/release.sh 1.2.3    # Explicit version
```

It performs the following safety checks and actions:

- Requires a clean Git working tree.
- Fetches and updates `main` and `develop`.
- Confirms `develop` has no unmerged commits.
- Bumps `package.json` and `package-lock.json`.
- Commits the version bump.
- Creates an annotated `vX.Y.Z` tag.
- Pushes `main` and the tag.
- Triggers the GitHub Pages deployment workflow.

### First release

Ensure `package.json` contains:

```json
{
  "version": "1.0.0"
}
```

Then merge `develop` into `main` and run:

```bash
./scripts/release.sh 1.0.0
```

This creates the first production tag, `v1.0.0`, and starts the deployment.

### Hotfix release

For an urgent production fix:

```bash
# Create a hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/short-description

# Fix, commit, and push
git push origin hotfix/short-description
```

Open a pull request into `main`, merge it, then release:

```bash
./scripts/release.sh patch
```

Finally, merge `main` back into `develop`:

```bash
git checkout develop
git pull origin develop
git merge --no-ff main
git push origin develop
```

### Create a GitHub Release

After the tag is pushed and deployment succeeds:

1. Open **Releases** in the GitHub repository.
2. Select **Draft a new release**.
3. Choose the existing tag, such as `v1.0.0`.
4. Add a title and release notes.
5. Select **Publish release**.

Or use GitHub CLI:

```bash
gh release create v1.0.0 \
  --target main \
  --title "Release v1.0.0" \
  --notes "Initial production release."
```

---

## 🧰 Troubleshooting

### Workflow did not run

- Confirm the tag follows `v*.*.*`, such as `v1.0.0`.
- Confirm the tag was pushed to GitHub.
- Confirm the workflow contains:

```yaml
on:
  push:
    tags:
      - "v*.*.*"
```

### Release script reports unmerged `develop` commits

Merge `develop` into `main` before releasing:

```bash
git checkout main
git pull origin main
git merge --no-ff develop
git push origin main
```

### Tag already exists

Do not move or reuse release tags. Create the next valid semantic version:

```bash
./scripts/release.sh patch
```

### Deployment failed

Check the failed workflow under **GitHub → Actions**. Common causes include build errors, missing dependencies, an incorrect `BASE_PATH`, or GitHub Pages permissions.

---

## 🙌 Credits

- **Typography:** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) and [Inter](https://fonts.google.com/specimen/Inter)
- **Photography:** Nimboni Farm drone and farm photography
- **Brand mark:** Custom neem-sprig identity
- **Icons:** Custom SVG artwork

---

<div align="center">

Built with 🌱 for regenerative agriculture.

</div>