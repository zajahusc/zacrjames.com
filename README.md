# Zac R. James

A standalone, single-page author site for **zacrjames.com**. Plain HTML, CSS, and JavaScript; no dependencies or build step.

## Local preview

Run `python3 -m http.server 8001 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:8001/.

## Content

Edit `index.html` for the biography, book descriptions, and retailer links. Each book opens an accessible native dialog with a shareable URL fragment. Without JavaScript, descriptions remain readable on the page. Missing retailer links use disabled buttons; replace them with links when available. Covers live in `assets/covers/`.

## Hosting

This site is ready for static hosting. For GitHub Pages, select the `main` branch and root directory in repository Settings → Pages. The `CNAME` file declares `zacrjames.com`; domain DNS must be configured with the hosting provider before it can serve the site. Creating this repository does not change DNS or enable hosting.

All writing and cover artwork © Zac R. James. All rights reserved.
