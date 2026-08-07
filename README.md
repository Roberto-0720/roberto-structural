# Roberto Structural — Website

Professional bilingual (VI/EN) website for **Roberto Structural** — structural engineering for
heavy-industry plants (petrochemical, thermal, gas and waste-to-energy), plus a catalog of
design **software** and a **drawings library**.

*Engineering the Core of Heavy Industry.*

## Tech
Static site — plain HTML/CSS/JS, no build step. Hosted on **GitHub Pages**.

## Structure
```
├─ index.html              # Home (hero, structure types, projects, software teaser, contact)
├─ tools.html              # Software catalog (filter by category)
├─ tool.html               # Software detail (reads ?id= from tools-data.js)
├─ drawings.html           # Drawings library (filter + lightbox gallery)
├─ 404.html                # Branded not-found page
├─ favicon.svg             # RS monogram
├─ assets/
│  ├─ css/style.css        # Design tokens + all components (edit colors in :root)
│  └─ js/
│     ├─ main.js           # Header/footer inject, VI/EN toggle, mobile menu,
│     │                    #   scroll-reveal, shared email-gate (RS_FORM_ENDPOINT)
│     ├─ tools-data.js     # ★ Software list (edit this to add tools)
│     ├─ tools.js          # Catalog + detail rendering
│     ├─ drawings-data.js  # ★ Drawings list (edit this to add drawing sets)
│     └─ drawings.js       # Drawings catalog + lightbox
├─ Logo/  Resource/        # Logo, photos, screenshots, drawing previews
├─ HUONG_DAN_TOOLS.md      # How to publish a tool/drawing via GitHub Releases
├─ HUONG_DAN_DEPLOY.md     # How to deploy this site to GitHub Pages
├─ DESIGN_SYSTEM.md        # Colors, fonts, components
└─ PLAN.md                 # Overall roadmap
```

## Common edits
- **Add software** → edit `assets/js/tools-data.js` (see comments at top).
- **Add a drawing set** → edit `assets/js/drawings-data.js`.
- **Receive download emails** → set `RS_FORM_ENDPOINT` in `assets/js/main.js` (Formspree URL).
- **Brand colors / fonts** → `assets/css/style.css` `:root`.

## Deploy
See **HUONG_DAN_DEPLOY.md**. In short: push this folder to a public GitHub repo →
Settings → Pages → deploy from `main` → `/ (root)`.
