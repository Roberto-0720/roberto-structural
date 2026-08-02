/* ============================================================
   Roberto Structural — static detail-page generator
   ------------------------------------------------------------
   WHY THIS EXISTS
   The site renders tool/article detail pages with JavaScript from a single
   HTML shell. Googlebot runs JS and copes, but the crawlers that build link
   previews — Facebook, Zalo, LinkedIn — do NOT. They read the raw <head> and
   nothing else, so every shared tool link used to preview as the same generic
   "Chi tiết Tool", with no image. Since most traffic arrives from Facebook,
   that was the single most expensive defect on the site.

   WHAT IT DOES
   Emits one flat file per published tool / article at the repo root:
       tool-<id>.html      article-<id>.html
   Each carries its own <title>, description, og:*, twitter:* and canonical.
   The BODY is still rendered by the same JS from the same *-data.js files —
   this generator never duplicates content, so the data files stay the single
   source of truth. It also rewrites sitemap.xml from the same data.

   WHY FLAT FILES AT THE ROOT, NOT tool/<id>.html
   Every path on this site is relative (assets/…, Resource/…, index.html#…) so
   that the same files work at both /roberto-structural/ and /. A subdirectory
   would break all of them, and <base href> would break in-page #anchors.

   RUN IT
       node scripts/build-pages.mjs
   Re-run after editing tools-data.js or articles-data.js. Nothing else needs
   to change: the generated files are overwritten and stale ones are removed.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/* Canonical origin of the live site. Changing this ONE line and re-running the
   script moves every generated page and the sitemap to the new address — that is
   the whole reason the absolute URLs are not hand-written into 20 files.
   The old roberto-0720.github.io/roberto-structural/ address still works: GitHub
   Pages redirects it here automatically once a custom domain is configured. */
const SITE = 'https://robertostructural.com/';

/* Fallback preview image — a PNG, because some older platforms still refuse
   WebP for og:image. Kept in the repo on purpose (see CLAUDE.md §5). */
const FALLBACK_IMG = 'Resource/01.png';

/* ---------- helpers ---------- */

// The data files are plain scripts assigning to `window`. Run them in a
// sandbox and read the globals back out — no parsing, no second definition.
function loadData(file) {
  const ctx = { window: {}, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  return ctx.window;
}

const attr = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Meta descriptions are plain text: drop the <b>/<i> markup the data files allow.
const plain = s => String(s ?? '')
  .replace(/<[^>]+>/g, '')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

function clip(s, n = 155) {
  const t = plain(s);
  if (t.length <= n) return t;
  const cut = t.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…';
}

const abs = rel => SITE + String(rel || '').replace(/^\.?\//, '');

function head({ title, desc, url, image, type, extra = '' }) {
  return `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${attr(title)}</title>
<meta name="description" content="${attr(desc)}" />
<link rel="canonical" href="${attr(url)}" />
<meta property="og:type" content="${type}" />
<meta property="og:site_name" content="Roberto Structural" />
<meta property="og:title" content="${attr(title)}" />
<meta property="og:description" content="${attr(desc)}" />
<meta property="og:url" content="${attr(url)}" />
<meta property="og:image" content="${attr(image)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${attr(title)}" />
<meta name="twitter:description" content="${attr(desc)}" />
<meta name="twitter:image" content="${attr(image)}" />${extra}
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="assets/css/style.css" />`;
}

function page({ id, page: pageName, mount, scripts, ...meta }) {
  return `<!DOCTYPE html>
<!-- ============================================================
     GENERATED FILE — DO NOT EDIT BY HAND.
     Produced by scripts/build-pages.mjs from assets/js/*-data.js.
     Edit the data file, then re-run:  node scripts/build-pages.mjs
     ============================================================ -->
<html lang="en">
<head>
${head(meta)}
</head>
<body data-page="${pageName}">

<header id="site-header"></header>

<main id="${mount}"><!-- rendered by JS from RS_PAGE_ID --></main>

<footer id="site-footer"></footer>

<script>window.RS_PAGE_ID = ${JSON.stringify(id)};</script>
${scripts.map(s => `<script src="assets/js/${s}"></script>`).join('\n')}
</body>
</html>
`;
}

/* ---------- build ---------- */

const { TOOLS = [] } = loadData('assets/js/tools-data.js');
const { ARTICLES = [] } = loadData('assets/js/articles-data.js');

// EVERY tool gets a file, including "soon" ones — the catalog links to all of
// them, so skipping any would turn a working detail page into a 404.
// Unreleased tools are still kept out of the index: they are thin content that
// would compete with the catalog for the same keywords. They get noindex here
// and are left out of the sitemap below, but they keep a proper preview card
// so sharing an upcoming tool on Facebook still looks right.
const NOINDEX = '\n<meta name="robots" content="noindex,follow" />';

const written = new Set();
let out = [];

for (const t of TOOLS) {
  const file = `tool-${t.id}.html`;
  const published = (t.status || 'ready') === 'ready';
  fs.writeFileSync(path.join(ROOT, file), page({
    id: t.id,
    page: 'tools',
    mount: 'tool-detail',
    scripts: ['main.js', 'lightbox.js', 'tools-data.js', 'tools.js'],
    title: `${plain(t.name.en)} — Roberto Structural`,
    desc: clip(t.tagline?.en),
    url: abs(file),
    image: abs(t.thumb || FALLBACK_IMG),
    type: 'product',
    extra: published ? '' : NOINDEX
  }), 'utf8');
  written.add(file);
  if (published) out.push({ loc: abs(file), priority: '0.8' });
}

for (const a of ARTICLES) {
  const file = `article-${a.id}.html`;
  fs.writeFileSync(path.join(ROOT, file), page({
    id: a.id,
    page: 'insights',
    mount: 'article-root',
    scripts: ['main.js', 'lightbox.js', 'articles-data.js', 'articles.js'],
    title: `${plain(a.title.en)} — Roberto Structural`,
    desc: clip(a.excerpt?.en),
    url: abs(file),
    image: abs(a.cover || FALLBACK_IMG),
    type: 'article',
    extra: `\n<meta property="article:published_time" content="${attr(a.date)}" />`
  }), 'utf8');
  written.add(file);
  out.push({ loc: abs(file), priority: '0.8' });
}

// Drop pages for items that were removed or unpublished, so the site never
// serves a detail page the catalog no longer links to.
let removed = 0;
for (const f of fs.readdirSync(ROOT)) {
  if (/^(tool|article)-.+\.html$/.test(f) && !written.has(f)) {
    fs.unlinkSync(path.join(ROOT, f));
    removed++;
  }
}

/* ---------- sitemap ---------- */

const statics = [
  { loc: SITE, changefreq: 'monthly', priority: '1.0' },
  { loc: abs('tools.html'), changefreq: 'weekly', priority: '0.9' },
  { loc: abs('drawings.html'), changefreq: 'monthly', priority: '0.9' },
  { loc: abs('insights.html'), changefreq: 'weekly', priority: '0.9' }
];

const urls = [...statics, ...out].map(u =>
  `  <url><loc>${attr(u.loc)}</loc>` +
  (u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : '') +
  `<priority>${u.priority}</priority></url>`
).join('\n');

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/build-pages.mjs — do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, 'utf8');

console.log(`✓ ${TOOLS.length} tool pages (${out.length - ARTICLES.length} indexed)`
  + ` · ${ARTICLES.length} article pages`
  + (removed ? ` · ${removed} stale removed` : '')
  + `\n✓ sitemap.xml — ${statics.length + out.length} URLs`);
