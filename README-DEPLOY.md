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
| **No 404 page** | Default host error | Branded `/404` with recovery links, served for every unmatched path. Requires `not_found_handling = "404-page"` — the file alone does nothing. See §3 |
| **Site unreachable — redirect loop** | `_redirects` used an apex→`www` rule that Cloudflare Pages read as a path pattern (it cannot match hostnames), so every request answered `Location: /` → `ERR_TOO_MANY_REDIRECTS` | Rule removed; no `.html` rules either, since Cloudflare handles those itself. Build fails if either returns. See §3 |
| **Whole source tree published** | `[assets] directory = "."` uploaded the repo: `/src/config.js`, `/tools/build.js`, `/README-DEPLOY.md` and **`/.git/HEAD`** were all downloadable | Deploy `./dist`; build fails if `src/`, `tools/`, `.git/`, `.wrangler/` or any `.md`/`.toml` reaches it. See §3 |

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

## 2. Before you deploy — two remaining steps

The form endpoint is already configured (§2.1, for reference). Two things still
need a human:

### 2.1 Set your form endpoint ✓

**Already done** — `site.formId` in `src/config.js` is set to `mbgdydjj`, and
all 12 forms post to `https://formspree.io/f/mbgdydjj`.

To change it, edit one line:

```js
// src/config.js
formId: 'mbgdydjj',
```

then rebuild. The endpoint is composed as `site.formAction + site.formId`, so
there is no second place to update.

#### Why forms used to open your email client

`js/forms.js` refuses to show a success message for a submission that went
nowhere. While the endpoint was still the placeholder, every submit was
intercepted and turned into a `mailto:` with the answers pre-filled — which is
why the form appeared to "open the local mailbox" instead of submitting.

That was the intended safety behaviour, but it was a poor experience, because a
`mailto:` depends on the visitor having a mail client wired up. On a phone with
no mail app — or a locked-down browser — nothing happens at all, and the visitor
is left thinking the form ignored them.

Two things now prevent that:

- The build prints a **loud warning** if you ship the placeholder, and the form
  itself says *"This form is not connected yet — opening your email app…"* with
  the address to copy, instead of navigating away without explanation.
- `data-endpoint-configured` is written into every form, so the script and the
  markup can never disagree about whether the endpoint is live.

#### Verifying it works

```bash
curl -s -X POST https://formspree.io/f/mbgdydjj \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","message":"test"}'
# {"next":"/thanks","ok":true}
```

The forms are ordinary HTML `POST` forms and work **without JavaScript** — a
no-JS visitor gets a normal POST and lands on `/thank-you/`. `js/forms.js` only
adds inline validation, a status message, a GA4 `generate_lead` event and the
email fallback.

> **Formspree free tier is 50 submissions/month.** Check the dashboard if you
> start running paid traffic; a full mailbox fails silently from the visitor's
> side.

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

Build first, then deploy **`dist/`** — never the repository root.

```bash
node tools/build.js            # regenerate dist/
npx wrangler pages deploy dist # deploy ONLY the build output
```

`wrangler.toml` already sets `[assets] directory = "./dist"`, so a bare
`npx wrangler deploy` also does the right thing. Preview with:

```bash
node tools/build.js --serve          # http://127.0.0.1:4173
```

> ### Never deploy `.`
>
> The previous configuration had `[assets] directory = "."`, and that
> published the **entire repository**. These were all downloadable over
> HTTPS at the time of writing:
>
> ```
> https://www.metapackink.com/src/config.js        -> 200
> https://www.metapackink.com/tools/build.js       -> 200
> https://www.metapackink.com/README-DEPLOY.md     -> 200
> https://www.metapackink.com/.git/HEAD            -> 200
> ```
>
> `.git/` being public is the worst of these: the full history, every past
> commit, and any credential ever committed. Two things now prevent it —
> `wrangler.toml` points at `./dist`, and `tools/build.js` **fails the build**
> if anything from `src/`, `tools/`, `scripts/`, `.git/`, `.wrangler/` or any
> `.md`/`.toml` file appears in `dist/`. `.wranglerignore` is a third layer.

### Connecting the Git repository instead

If you deploy through the Cloudflare dashboard Git integration rather than
from your machine, the settings matter more, because the build runs inside a
clone of the repo.

**This project runs in Workers Builds mode** (a `wrangler.toml` is present, so
Cloudflare configures it as a Worker). That matters for one reason: **there is
no "Output directory" field to fill in.** In Workers Builds the deploy
directory comes from `wrangler.toml`'s `[assets] directory`, and the form has
these fields instead:

| Setting | Value |
|---|---|
| Build command | `node tools/build.js` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` (leave default) |
| Build watch paths → Include paths | leave **empty** |

Two things that have gone wrong here before, both worth knowing:

- **Do not clear the Deploy command.** It has to stay `npx wrangler deploy`.
  An empty value is rejected, and the earlier "Invalid request body" error came
  from a half-filled form, not from this field.
- **An empty chip in "Include paths" fails the save,** because an empty string
  is submitted as a path. Remove the chip rather than leaving it blank.

If your project is instead configured in **Pages** mode, the third field is
named "Output directory" and its value is `dist` — same result, different form.

The build command you had — `node scripts/inject-ga.js` — is from the **old**
WordPress/Elementor setup and does nothing on this codebase (`共注入 0 个
HTML 文件` in your log). It also left `scripts/` in the upload. Replace it.

### How the routing works

Pages are emitted as **directory-style output**. Cloudflare Pages serves
`/about/` from `about/index.html`:

| URL | File |
|---|---|
| `/` | `index.html` |
| `/about/` | `about/index.html` |
| `/industries/cosmetics/` | `industries/cosmetics/index.html` |
| `/products/rigid-boxes/` | `products/rigid-boxes/index.html` |
| anything unmatched | `404.html` — and only because `not_found_handling` is set |

Every internal link uses the clean trailing-slash form, which matches the
`rel="canonical"` and the sitemap entry on the same page.

### The `[assets]` keys in `wrangler.toml`

This deploys through `npx wrangler deploy`, so what gets published and how a
miss is handled come from `wrangler.toml` — there is no "output directory"
field in the dashboard to set.

```toml
[assets]
directory = "./dist"
not_found_handling = "404-page"
html_handling = "auto-trailing-slash"
```

**`not_found_handling` is the one that is easy to leave out.** Its default is
`"none"`, and with `"none"` Workers Static Assets answers an unmatched request
itself, with an empty body. `dist/404.html` is still built, still uploaded and
still reachable at `/404`, so nothing looks wrong — but no visitor who mistypes
a URL ever sees it. Setting `"404-page"` makes the platform serve the nearest
`404.html` with a real `404 Not Found` status.

**`html_handling` is stated rather than left to default** because every
canonical URL on the site depends on it. `auto-trailing-slash` serves a folder
index (`about/index.html`) at `/about/` and a bare file (`thank-you.html`) at
`/thank-you` — exactly how the pages are linked. Changing this value moves
every URL and every canonical tag with it.

`tools/build.js` (`checkWranglerConfig()`) fails the build if `directory` stops
being `./dist`, if `not_found_handling` is missing or not `"404-page"`, if
`html_handling` is set to an undocumented value, or if `dist/404.html` is not
there to serve.

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
node tools/build.js          # regenerate dist/
node tools/build.js --check  # build, then verify links, redirects and JSON-LD
node tools/build.js --serve  # build, then preview at http://127.0.0.1:4173
```

`--check` **fails the build** on any unresolvable internal link, unparseable
JSON-LD, a redirect rule that could loop, or a source file that has leaked
into `dist/` — so the guards run on every build rather than being something
you remember to do.

### Source and output are separate

`tools/build.js` reads from `src/`, `css/`, `js/`, `img/` and the three
hand-maintained files `style.css`, `main.js`, `llms.txt` — then writes 64
files into `dist/`. **Only `dist/` is ever deployed.**

```
repo root                 dist/  (the only deployed directory)
──────────                ────────────────────────────────────
src/          ──build──▶  about/index.html
css/                      products/rigid-boxes/index.html
js/                       sitemap.xml, _redirects, _headers …
img/                      css/, js/, img/
style.css                 style.css
main.js                   main.js
llms.txt                  llms.txt
wrangler.toml             (config, not uploaded)
```

**There must be no rendered `*.html` at the repo root.** If you see an
`index.html` or an `about/` folder sitting next to `src/`, they are stale
output from an earlier build and should be deleted — the build no longer
writes there, so they will silently go out of date. This bit us once: a stale
`contact/index.html` still carried the placeholder form endpoint after the
real one had been configured, so a deployment from the root would have
brought the broken form back.

`dist/` is disposable: it is deleted and regenerated on every build, so never
edit files inside it — your changes are lost on the next run. Edit the
sources, then rebuild.

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
