# Metapackink — deployment guide

This package is a **drop-in replacement** for the current `metapackink.com` site on
Cloudflare Pages. It keeps every existing page, in the existing design, and adds
the pages and conversion paths the site was missing.

---

## 1. What changed

### Fixed

| Problem | Before | After |
|---|---|---|
| **No way to enquire** | 0 `<form>` elements site-wide; 45 "Get a Quote" buttons all led to a contact page with only phone/WhatsApp/email | 4 working forms (`/request-a-quote/`, `/contact/`, `/request-sample/`, plus one on every product page) |
| **Two competing templates** | `site-header` on 9 pages, a second inline-styled `mp-*` template on 4 more — the nested industry pages had **two stacked headers** | One header and one footer, generated once, shared by all 31 pages |
| **Links contradicted canonical** | All internal links pointed at `.html` files while `rel="canonical"` and `sitemap.xml` used clean paths | Every link, canonical and sitemap entry uses the same clean trailing-slash path |
| **Canonical pointed at URLs that never existed** | `/industries-cosmetics/`, `/industries-perfume/`, `/industries-premium-consumer-products/` | Now real 301 redirects to `/industries/cosmetics/` etc. |
| **Two GA4 properties ran at once** | `G-0M988Y84GV` (script) + `G-G4VHR7QGD` (config) — data split across two properties | One property: `G-G4VHR7QGD` |
| **Brand-mismatched email** | `sales@gooinpack.com` on a `metapackink.com` site | `sales@metapackink.com` |
| **No `<h1>` on 9 pages** | Several pages went straight from the nav into a wall of cards | Every page has exactly one `<h1>` |
| **No OG/Twitter/JSON-LD** | None anywhere | Per-page OG + Twitter cards, Organization / BreadcrumbList / FAQPage JSON-LD |
| **Two industries dead-ended** | "Gift & Presentation" and "Retail & Branded" cards linked to nothing | Both now have real pages |
| **Broken in-page anchors** | `products.html#gift-packaging` and footer `#rigid-boxes` resolved to nothing | 7 product anchors became 7 real product pages |
| **No 404 page** | Default host error | Branded `/404` with recovery links, served for every unmatched path |
| **Site unreachable — redirect loop** | `_redirects` used an apex→`www` rule that Cloudflare Pages read as a path pattern (it cannot match hostnames), so every request answered `Location: /` → `ERR_TOO_MANY_REDIRECTS` | Rule removed; no `.html` rules either, since Cloudflare handles those itself. Build fails if either returns. See §3 |

### Added

- **7 product detail pages** — `/products/rigid-boxes/`, `magnetic-boxes`, `two-piece-boxes`,
  `drawer-boxes`, `perfume-packaging`, `cosmetic-packaging`, `gift-packaging`
  (each with construction detail, a specification table, 4–5 FAQs and its own RFQ form)
- **2 industry pages** — `/industries/gift-presentation/`, `/industries/retail-branded/`
- **Conversion pages** — `/request-a-quote/` (full RFQ with file upload),
  `/request-sample/`, `/thank-you/` (noindex)
- **Support pages** — `/faq/` (~24 questions in 6 groups), `/sitemap/` (generated from
  the real page list, so it cannot go stale)
- **Legal pages** — `/privacy-policy/`, `/terms/`, `/cookie-policy/` (with a cookie table)
- **`_redirects`** — 3 real 301s for the legacy industry URLs Cloudflare cannot infer
  on its own. There is deliberately **no** apex→`www` rule (see §3) and **no**
  `.html` rule (Cloudflare already redirects those).
- **`_headers`** — security headers and immutable caching for CSS/JS/images
- **`_routes.json`**, refreshed **`robots.txt`** (including AI crawler allowances) and **`sitemap.xml`**

**Content volume: 4,268 → 20,342 words across 13 → 31 pages.**

---

## 2. Before you deploy — three required steps

### 2.1 Set your form endpoint

All four forms post to a placeholder. **Until you change it, forms fall back to
opening the visitor's email client** (see `js/forms.js`) rather than silently
claiming success — so no enquiry is lost — but you should configure a real
endpoint.

1. Create a free form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Open `src/partials.js` and replace the placeholder:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

3. Rebuild (`node tools/build.js`) — or, if you are editing `dist/` directly,
   find-and-replace `https://formspree.io/f/YOUR_FORM_ID` across all `*.html`.

The forms are ordinary HTML `POST` forms, so they also work **without
JavaScript**. `js/forms.js` only adds inline validation, a status message, a GA4
`generate_lead` event and the email fallback.

### 2.2 Have the legal pages reviewed

`/privacy-policy/`, `/terms/` and `/cookie-policy/` are accurate drafts written
against what this site and business actually do (the forms, the file uploads,
Google Analytics 4, export sales from China). They are **not legal advice** —
have a lawyer review them for the jurisdictions you sell into. Each file carries
a non-rendering `REVIEW_NOTE` comment marking it.

### 2.3 Confirm the GA4 property

The site now loads a single measurement ID: **`G-G4VHR7QHGD`**
(set in `src/config.js`, and hardcoded in `js/forms.js`).

The old site loaded `G-0M988Y84GV` in the script tag and configured
`G-G4VHR7QGD` inline, so traffic was split across two properties. If
`G-G4VHR7QHGD` is not the property you want to keep, change it in both places
and rebuild.

---

## 3. Deploying to Cloudflare Pages

`wrangler.toml` is already present and points at this directory
(`[assets] directory = "."`).

```bash
# preview locally first
npx wrangler pages dev .

# deploy
npx wrangler pages deploy .
```

Or connect the Git repository in the Cloudflare dashboard:
build command **none**, output directory **`/`** (the files are pre-built and committed).

> **Upload the whole directory, and delete what was there before.** The
> previous deploy went out with a broken `_redirects` still sitting next to
> the files; if you upload on top of an existing deployment, make sure the
> old files are gone. Cloudflare Pages replaces the deployment atomically on
> `wrangler pages deploy`, so a fresh deploy is enough — do not merge folders.

### How the routing works

Pages are emitted as **directory-style output**. Cloudflare Pages serves
`/about/` from `about/index.html`:

| URL | File |
|---|---|
| `/` | `index.html` |
| `/about/` | `about/index.html` |
| `/industries/cosmetics/` | `industries/cosmetics/index.html` |
| `/products/rigid-boxes/` | `products/rigid-boxes/index.html` |
| anything unmatched | `404.html` (at the root, by convention) |

Every internal link uses the clean trailing-slash form, which matches the
`rel="canonical"` and the sitemap entry on the same page.

Old `.html` links keep working **without any rule in `_redirects`** —
Cloudflare Pages redirects `/about.html` to `/about` on its own, precisely
because the output is directory-style and there is no `about.html` at the
root to serve. That is intentional: see the warning below.

### Do not put these rules back in `_redirects`

Two rules that look sensible caused a full outage
(`ERR_TOO_MANY_REDIRECTS`) and are deliberately absent. The build now fails
if either is reintroduced.

**1. No apex → www redirect.** Cloudflare Pages `_redirects` **cannot match
on hostname** — domain-level redirects are unsupported. A rule written as

```
https://metapackink.com/*   https://www.metapackink.com/:splat   301
```

is parsed as a plain *path* pattern that also matches `www.metapackink.com`,
with `:splat` resolving to the empty string. Every request to the site then
answered `Location: /`, looping forever.

To force the canonical host, use a **Redirect Rule in the Cloudflare
dashboard** (Rules → Redirect Rules), which *does* match on hostname:

- **If** hostname equals `metapackink.com`
- **Then** dynamic redirect to `concat("https://www.metapackink.com", http.request.uri.path)`
- Status **301**

**2. No `/foo.html → /foo/` redirects.** Cloudflare already does this
redirect (to the extension-less form, `/foo`, not `/foo/`). Writing your own
rule for the same path means two rules acting on one URL, which is how the
loop started. `_redirects` now contains only the three rules that Cloudflare
cannot infer on its own:

```
/industries-cosmetics/  /industries/cosmetics/  301
/industries-perfume/  /industries/perfume/  301
/industries-premium-consumer-products/  /industries/premium-consumer-products/  301
```

### Verify before you walk away

After deploying, check the actual headers — a 200 with no `Location` header
means you are clear:

```bash
curl -sI https://www.metapackink.com/ | head -3
curl -sI https://www.metapackink.com/about/ | head -3
curl -sI https://metapackink.com/ | head -3
```

---

## 4. Rebuilding from source

The site is generated by a small Node script with **no dependencies** — no
framework, no bundler, no `node_modules`.

```bash
node tools/build.js          # regenerate every page in place
node tools/build.js --check  # build, then verify links, redirects and JSON-LD
node tools/build.js --serve  # build, then preview at http://127.0.0.1:4173
```

`--check` **fails the build** on any unresolvable internal link, unparseable
JSON-LD, or redirect rule that could loop, so the guards run on every build
rather than being something you remember to do.

### This directory is both the source and the deploy root

There is no `dist/` to upload. `tools/build.js` writes each page straight to
its final path — `src/pages/10-existing.js` becomes `about/index.html` right
here in this directory. `dist/` is a scratch directory only; you never copy
from it.

`wrangler.toml` points at `.`, so `npx wrangler pages deploy .` publishes
exactly what you see here.

Three files are read at build time and stood next to the output:
`style.css`, `main.js` and `llms.txt`. They are both source and output —
edit them directly.

### Where things live

```
src/
  config.js         every phone number, email, social URL, nav label and redirect
  layout.js         <head>, header, floating contact panel, footer — written once
  partials.js       the RFQ / sample / contact forms, dark CTA, related-links grid
  carried.js        adapts the original page bodies (links, classes, assets, hero)
  bodies/*.html     the 13 original <main> bodies, verbatim
  pages/
    10-existing.js  the 13 original pages
    20-conversion.js  contact, quote, sample, thank-you, 404
    30-support-legal.js  FAQ, privacy, terms, cookies
    40-products.js  the 7 product pages
    50-industries.js  2 new industry pages
    90-sitemap.js  the HTML sitemap (generated from the page list)
tools/build.js      the generator
css/style-additions.css  new components only — adds to style.css, never overrides it
js/forms.js         progressive enhancement for the forms
```

### Converting sitemap.html to sitemap.xml

`sitemap.xml` is written by the build. If you only have the rendered
`sitemap.html` — for example after editing it by hand — `tools/sitemap-xml.js`
does the conversion on its own, with no build step and no dependencies:

```bash
node tools/sitemap-xml.js                      # sitemap.html -> sitemap.xml
node tools/sitemap-xml.js in.html out.xml      # explicit paths
```

It reads the same structure the page uses (`<h2>` group headings and
`<ul class="sitemap-list">` lists), takes the domain from the page's
`<link rel="canonical">`, canonicalises `../products/foo.html` to
`/products/foo/`, drops `/404/`, `/thank-you/` and the sitemap itself, and
assigns `<priority>` and `<changefreq>` to match the build pipeline — so
either route produces the same file.

The generated `sitemap.xml` lists **29 URLs**, which is the 28 the HTML page
shows **plus `/sitemap/` itself** (the page does not link to itself).

### Important: the source files are the originals

To edit site-wide values (phone, email, nav, footer, redirects) change
`src/config.js`. To edit page copy, change the relevant file under
`src/bodies/` or `src/pages/`, then rebuild.

The existing `style.css` and `main.js` are **loaded unmodified** — all new
styling lives in `css/style-additions.css` and uses the tokens `style.css`
already declares. The language switcher in `main.js` keeps working because every
`data-i18n` key emitted by `layout.js` is one `main.js` already defines.

---

## 5. Optional follow-ups

Not included in this package, listed in the order they would pay off:

1. **Publish real case studies.** `/case-studies/` currently explains what a
   case study contains rather than naming projects. Six illustrative examples
   were considered and deliberately **not** carried over, because invented
   projects are worse than none. Replace the page content with real ones as
   soon as you have permission to name the clients.
2. **Publish the blog.** `/blog/` has category headings and no articles. The
   highest-value first three, given the search intent this site should target:
   *How to choose between rigid, magnetic and two-piece boxes*,
   *What to include in a packaging brief*, and
   *Sampling: what to check on a rigid box sample*.
3. **Add product photography.** Several pages use the same placeholder imagery.
   Real photos of finished work convert better than anything else on a
   manufacturer's site.
4. **Server-side form fallback.** The current `mailto:` fallback works but is a
   worse experience than a hosted endpoint. Configuring Formspree/Web3Forms
   (step 2.1) removes it entirely.
5. **Add a cookie consent banner** if you market into the EU/UK — the cookie
   policy currently describes the GA4 cookies as set on load.
