# Gale Tour and Safaris

A production-quality static website for **Gale Tour and Safaris** — a Zanzibar-based tourism and transfer company.

## Pages
- `gale-tour-safaris.html` — home (hero, about, transfers, excursions preview, mainland, why-us, contact).
- `excursions.html` — full catalogue of all 29 excursions with category filtering.

## Shared assets
- `assets/style.css` — the full design system (OKLCH coastal palette, light/dark, tokens, components).
- `assets/app.js` — shared behaviour (theme toggle, mobile menu, scroll reveal, contact form) and the
  activity data + card rendering + category filter (runs only where a `#cards` grid exists).
- `assets/` — also holds any site images you add.

## Features
- Custom Zanzibar coastal palette (deep ocean teal + golden sunset), light & dark mode toggle.
- Instrument Serif + Plus Jakarta Sans typography, custom inline SVG dhow-sail logo & favicon.
- Sticky blurred nav, mobile slide-in menu, 29 filterable excursion photo-cards (Lucide icons),
  transfer zones, contact section, floating WhatsApp button.
- Fully responsive, semantic HTML5, WCAG AA, scroll-reveal animations honoring prefers-reduced-motion.

## Images
Photographs are pulled live from LoremFlickr by keyword (e.g. `zanzibar,tortoise`). To use your own
photos, drop a file in `assets/` and edit the activity's `image-search-tags` / `src` in `assets/app.js`
(for cards) or the relevant `<img src>` in the HTML (for hero, transfers and gallery).

Open `gale-tour-safaris.html` in any browser — no build step, no dependencies beyond CDN fonts/icons.
