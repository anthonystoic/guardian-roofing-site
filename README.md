# Guardian Roofing & Gutters — Website

Static marketing site for Guardian Roofing & Gutters (Fort Wayne, IN).
Plain HTML / CSS / JS — no build step. Deployed on Vercel.

## Structure
- `index.html` + top-level pages (about, services, contact, financing, etc.)
- 16 dedicated service pages (roof-replacement, roof-repair, metal-roofing, …)
- `assets/css/style.css` — all styling
- `assets/js/app.js` — menu, scroll header, form handling
- `assets/img/` — imagery (incl. `services/` job photos)
- `sitemap.xml`, `robots.txt`

## Local preview
```
python -m http.server 8899
```
Then open http://127.0.0.1:8899/

## Deploy
Auto-deploys to Vercel on push to `main`.
