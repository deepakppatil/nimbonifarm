# Deploying Nimboni Farm — free hosting with a GoDaddy domain

This site is a **static site**. `npm run build` produces a `dist/` folder of plain
HTML, CSS, JS and images — no server, no database, no backend. The booking form
hands off to WhatsApp, so there is nothing to run at runtime.

That means you can host it **free, permanently**, and point your GoDaddy domain
at it. Your only ongoing cost is the domain renewal itself.

---

## 0. Before you deploy: fix the placeholders

**Do not put this on a real domain as it stands.** Every placeholder inherited
from the original build is still in the code, and "Mr. Foo Bar" as the contact
name on a live booking site will cost you enquiries.

Everything is in one file: **`src/data/site.js`**. Search it for `TODO`.

| What | Where | Current value |
| --- | --- | --- |
| WhatsApp numbers | `CONTACTS[].number` | `+919930123456`, `+919930456789` |
| Contact names | `CONTACTS[].person` | `Mr. Foo Bar`, `Mrs. Foo Bar` |
| Address | `FARM.address` | `Survey No. 123/4, Near Green Valley …` |
| Email | `FARM.email` | `hello@nimbonifarm.example` |
| Social links | `SOCIALS[].href` | `instagram.com`, `facebook.com`, `youtube.com` |
| Drive distances | `FARM.distanceNotes` | `Add real distance / drive time` |

Then in **`index.html`**, line 17:

```html
<link rel="canonical" href="https://nimbonifarm.example/" />
```

Replace with your real domain.

Two more judgement calls, both in the PR description:

- **The guest book is empty.** Notes save to the visitor's own browser, so a new
  visitor sees an empty wall. An empty wall does not sell. Either paste in real
  guest feedback, or decide you are happy to grow it organically.
- **Enquiries have no server.** The form opens WhatsApp and keeps a
  `localStorage` copy. If a visitor closes the tab without sending, the enquiry
  is lost.

---

## 1. Pick a host

| | Bandwidth | Custom domain | SSL | Commercial use | Notes |
| --- | --- | --- | --- | --- | --- |
| **Cloudflare Pages** ← recommended | Unlimited | Yes | Free, auto | Yes | Fastest in India, no card needed |
| Netlify | 100 GB/mo | Yes | Free, auto | Yes | 300 build minutes/mo |
| GitHub Pages | 100 GB/mo (soft) | Yes | Free, auto | Yes | No build UI; needs an Action |

**You have chosen GitHub Pages** — see section 4, which is already wired up and
waiting on a one-time switch in your repo settings. It is the simplest option:
no new account, no new dashboard.

If you later outgrow it (100 GB/month soft cap) or want faster Indian edge
delivery, Cloudflare Pages is the drop-in alternative — unlimited bandwidth, no
credit card, commercial use allowed, and edge nodes in Mumbai, Chennai and
Delhi. Section 2 covers it.

Two things to note:

- **Skip Vercel** for this one. Its free Hobby tier is licensed for
  non-commercial use; a farm taking bookings is commercial.
- **You do not need hosting from GoDaddy.** Keep the domain registered there,
  but do not buy their Web Hosting, Website Builder, or any bundle. You are only
  paying them for the name.

---

## 2. Deploy to Cloudflare Pages

### Step 1 — Create a Cloudflare account
Go to <https://dash.cloudflare.com/sign-up>. Free plan is fine. No card.

### Step 2 — Start a Pages project
In the dashboard: **Compute (Workers) → Workers & Pages → Create → Pages →
Get started** (or "Import an existing Git repository").

Cloudflare's labels move around; you are looking for **Pages**, connected to Git.

### Step 3 — Connect GitHub
Authorise Cloudflare to access GitHub, then select the `nimbonifarm`
repository. If it is not listed, click "Configure account" and grant access to
that specific repo.

### Step 4 — Build settings ⚠️ the important bit

| Field | Value |
| --- | --- |
| Framework preset | `Vite` (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (leave empty) |

Then open **Environment variables** and add:

| Variable | Value | Why |
| --- | --- | --- |
| `NODE_VERSION` | `22` | **Required.** Vite 8 needs Node `^20.19 \|\| >=22.12`. The default build image may be older, and the build will fail without this. |

Optionally set `NPM_FLAGS` = `--no-audit --no-fund` to shave a few seconds.

### Step 5 — Save and Deploy
Click through. The first build takes 1–3 minutes. When it succeeds, Cloudflare
gives you a live URL like `nimbonifarm-abc.pages.dev`. Open it and click around
— check the video plays, the gallery lightbox works, and the booking form opens
WhatsApp.

Every push to `main` (or your production branch) from now on redeploys
automatically. 500 builds/month on the free plan — far more than you will use.

### Step 6 — Add your custom domain
In the project: **Custom domains → Set up a custom domain**. Enter your domain.

Cloudflare will ask you to add **both**:

```
nimbonifarm.com        (apex / bare domain)
www.nimbonifarm.com    (www)
```

Adding both means both work; Cloudflare redirects one to the other for you.

---

## 3. Point the GoDaddy domain at it (Cloudflare path)

Only needed if you deploy to Cloudflare Pages. For GitHub Pages DNS, see the
end of section 4.

Here is the one real complication.

**GoDaddy does not support CNAME flattening** (also called ALIAS or ANAME). The
DNS standard forbids a CNAME at the bare root of a domain, and most CDNs —
including Cloudflare Pages — solve this with flattening. GoDaddy does not offer
it. So you have two paths.

### Option A — Move DNS to Cloudflare (recommended)

You keep the domain registered at GoDaddy. You only hand DNS to Cloudflare.
This is free and unlocks the bare domain, free SSL, and much better performance
in India.

**⚠️ Read this before you switch.** If the domain currently handles email —
anything `@nimbonifarm.com`, or Microsoft 365 / Google Workspace / Zoho —
your `MX` records live in GoDaddy DNS. When Cloudflare scans your domain it
imports most records automatically, but **verify every MX, TXT (SPF/DKIM) and
CNAME record appears in Cloudflare before you switch nameservers.** If you get
this wrong, your email stops working and it is a genuinely bad afternoon.

1. In Cloudflare: **Add a domain**, enter `nimbonifarm.com`, choose the **Free**
   plan.
2. Cloudflare scans and lists your existing records. **Check them carefully** —
   especially anything named `MX`, or TXT records starting `v=spf1`.
   Add back anything missing before continuing.
3. Cloudflare gives you two nameservers, e.g.
   `ada.ns.cloudflare.com` and `bob.ns.cloudflare.com`.
4. In GoDaddy: **My Products → Domain Portfolio → your domain → DNS →
   Nameservers → Change nameservers → Enter my own nameservers (Advanced)**.
   Add both, save.
5. Back in Cloudflare, wait for the status to flip to **Active**. This is
   usually minutes but can take up to 24 hours.
6. Cloudflare adds the Pages DNS records for you automatically when you added
   the custom domain. Confirm you see a CNAME for `www` and a flattened record
   for the apex pointing at `pages.dev`.

### Option B — Keep GoDaddy DNS (simpler, www only)

Only do this if you want to avoid touching nameservers.

1. Add a CNAME in GoDaddy DNS:
   - Type: `CNAME`
   - Name: `www`
   - Value: `nimbonifarm-abc.pages.dev` (your Pages URL)
   - TTL: 1 hour
2. In GoDaddy, turn on **domain forwarding** for the bare domain:
   forward `nimbonifarm.com` → `https://www.nimbonifarm.com`, and choose
   **301 (permanent)** if offered.
3. In Cloudflare Pages, add only `www.nimbonifarm.com` as the custom domain.

Trade-off: visitors who type the bare domain get a redirect first, and the
redirect is GoDaddy's — slower and occasionally flaky. Fine to start with; move
to Option A when you have a spare half hour.

### Step 7 — Wait for SSL
Cloudflare issues the certificate automatically once DNS resolves — usually
under 15 minutes, up to 24 hours in the worst case. Do not panic and change
records during this window; you will only reset the clock.

### Step 8 — Verify
1. Visit `https://www.nimbonifarm.com` — it should load with a padlock.
2. Visit `https://nimbonifarm.com` — should land on the site (redirect or direct).
3. Try `http://` (no s) — should redirect to HTTPS.
4. **Test on a phone on mobile data, not your office WiFi** — that is how most
   of your visitors will arrive.
5. Click the WhatsApp button on a real phone and confirm it opens a chat with
   your (now real) number, with the message pre-filled.

---

## 4. Deploy to GitHub Pages from `feature/0.1.1`

This is already wired up. `.github/workflows/deploy-pages.yml` builds the site
and deploys it to GitHub Pages on every push to **`feature/0.1.1`**, and can be
run by hand from the Actions tab against any branch you pick.

### One-time setup (about 5 minutes)

**a. Turn on Pages**

Repo **Settings → Pages → Build and deployment → Source**, choose
**GitHub Actions**. (Not "Deploy from a branch" — the workflow does the
deploying.) Save.

**b. Set the base path, if you are using a custom domain**

Out of the box, with no configuration, the site deploys to

```
https://deepakppatil.github.io/nimbonifarm/
```

and the workflow builds with `BASE_PATH=/nimbonifarm/` so assets resolve under
that subpath. That works with zero setup.

If you attach your GoDaddy domain instead, the site sits at the domain root and
needs `BASE_PATH=/`. Set a repository variable:

**Settings → Secrets and variables → Actions → Variables → New repository variable**

| Variable | Value |
| --- | --- |
| `PAGES_CUSTOM_DOMAIN` | `nimbonifarm.com` (bare, no `https://`) |

Setting that variable does two things: builds with `BASE_PATH=/`, and writes a
`CNAME` file into the deploy so GitHub keeps the custom domain attached. Then
point DNS at it — see *Pointing your GoDaddy domain at GitHub Pages* below.

There is also a `PAGES_BASE_PATH` variable if you ever need to force an exact
base path. Precedence is:

```
PAGES_BASE_PATH  >  PAGES_CUSTOM_DOMAIN (=> /)  >  /<repo-name>/
```

**c. Create the branch and push**

This work currently lives on `arena/01a0c5bb-nimbonifarm`. Branch off that and
push:

```bash
git fetch origin
git switch arena/01a0c5bb-nimbonifarm
git switch -c feature/0.1.1
git push -u origin feature/0.1.1
```

(If you have merged this into `develop` instead, just
`git switch develop && git switch -c feature/0.1.1`.)

The first deploy starts immediately. Watch it under the **Actions** tab — the
whole run takes about a minute. When it goes green, GitHub prints the live URL
in the job summary.

### Why the base path matters

This is the one thing that silently breaks a Vite site on GitHub Pages.

GitHub serves a *project* site from `https://user.github.io/<repo>/`, not from
the domain root. A default Vite build emits absolute asset URLs
(`/assets/index.js`), so the browser fetches
`https://user.github.io/assets/index.js` — which does not exist. You get an
unstyled white page and a console full of 404s.

`vite.config.js` now reads `base` from a `BASE_PATH` environment variable, and
every public asset path goes through an `asset()` helper built on
`import.meta.env.BASE_URL`. Both build modes are verified:

```
BASE_PATH=/            →  /assets/…, /media/…, /favicon.svg
BASE_PATH=/nimbonifarm/ →  /nimbonifarm/assets/…, /nimbonifarm/media/…, /nimbonifarm/favicon.svg
```

### Changing the deploy branch

Edit the top of `.github/workflows/deploy-pages.yml`:

```yaml
on:
  push:
    branches:
      - feature/0.1.1   # <- change or add branches here
```

Or leave it and use **Actions → Deploy to GitHub Pages → Run workflow**, which
lets you deploy any branch on demand.

### Pointing your GoDaddy domain at GitHub Pages

Skip this entirely if you are happy on
`https://deepakppatil.github.io/nimbonifarm/` — that address works with no DNS
changes at all.

If you attach the custom domain, set `PAGES_CUSTOM_DOMAIN` first (above), then
add records in **GoDaddy → DNS → Records**. Unlike Cloudflare Pages, GitHub
Pages works fine with plain A records at the bare domain, so GoDaddy's lack of
CNAME flattening is not a problem here.

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `deepakppatil.github.io` |

Those four A records are GitHub's long-standing Pages IPs. **Verify them
against GitHub's current documentation before you save** — they have been
stable for years but I could not re-check them while writing this, and GitHub
does occasionally change them.

Do **not** add a `CNAME` at `@` — the DNS standard forbids it.

Then, back in **Settings → Pages**, enter the domain. GitHub checks DNS and
issues the SSL certificate automatically — usually within minutes, occasionally
up to 24 hours. Tick **Enforce HTTPS** once it is issued.

Remove any old `A` record pointing at `@` (GoDaddy often parks a default one
there) or the domain will resolve to the parking page intermittently.

### A note on the committed `dist/` folder

`dist/` is currently tracked in git — a leftover from deploying by committing
build output. The Actions workflow ignores it and builds from source, so the
committed copy is now just a stale duplicate that churns ~5 MB on every commit.

Once you have confirmed the Actions deploy works, it is worth untracking it
(the files stay on your machine; history keeps the old copies). Say the word
and it will be done.

## 5. After launch

- **Analytics.** Add a free Plausible or Cloudflare Web Analytics snippet to
  `index.html`. You want to know how many people reach the booking form and how
  many bounce off it.
- **Track the WhatsApp button.** Add an `onClick` that fires an analytics event.
  That click *is* your conversion — worth counting properly.
- **Submit to Google Search Console** once DNS resolves, and request indexing.
  A new domain takes a few days to appear.
- **Set a calendar reminder for the domain renewal.** GoDaddy domains expire and
  the redemption fee is painful. Auto-renew is worth leaving on.

## 6. Optional: shrink the repository

The repo is ~99 MB, almost all of it the original master media in
`src/assets/farm-images/` (a 78 MB 4K drone clip and three 4 MB JPEGs).

Nothing imports those files — the site ships the optimised derivatives in
`public/media/` (3 MB total). The originals are kept purely as masters.

If you want, they can be removed from Git (keeping them on your machine) or
moved to Git LFS, which drops the repo to a few MB and makes every cloud build
clone faster. Say the word and it will be done carefully — the working files
stay put either way.

---

## Cost summary

| Item | Cost |
| --- | --- |
| Cloudflare Pages hosting | ₹0 |
| SSL certificate | ₹0 |
| Bandwidth | ₹0 |
| GoDaddy domain renewal | ~₹1,000–1,900 / year (check your cart — varies by TLD and promo) |

The domain is the only thing you pay for.