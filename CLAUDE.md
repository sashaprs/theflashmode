# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

TheFlashMode is a static HTML landing page for a SaaS AI fashion photography platform. It lets fashion brands dress AI-generated models with their own garments and get campaign-ready visuals in minutes. Pricing starts at 29€/month. The site is deployed via GitHub Pages at **theflashmode.com** (CNAME configured).

## Running locally

No build step. Open `index.html` directly in a browser, or serve the root with any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

The entire product is a **single-file prototype** — `index.html` inlines both the CSS design system and the HTML structure. The `assets/` folder contains the modular source files that were authored separately:

| File | Role |
|------|------|
| `assets/system.css` | Full design-system tokens and component styles |
| `assets/components.jsx` | All React section components (Nav, Hero variants, sections, Footer) |
| `assets/app.jsx` | App shell; wires Tweaks state to `<body>` class changes; mounts React root |
| `assets/tweaks-panel.jsx` | Floating Tweaks toolbar UI (TweaksPanel, TweakSection, TweakRadio, TweakSelect, useTweaks hook) |
| `assets/image-slot.js` | `<image-slot>` custom element — drag-and-drop image placeholder with pan/zoom reframe, persists via `.image-slots.state.json` sidecar |

`index.html` has the CSS inlined (copied from `system.css`) and loads React + Babel from CDN, then the four asset files as `<script>` tags. When editing the design, **keep `index.html` and `assets/system.css` in sync** — they duplicate the design tokens.

## Design system

The design language is inspired by Apple's minimal-premium editorial style:

- **Accent**: `#0066cc` (Action Blue), `#2997ff` on dark backgrounds
- **Surfaces**: white canvas, parchment `#f5f5f7`, near-black tiles `#272729` / `#2a2a2c`
- **Typography**: Inter (body/UI) + Instrument Serif (editorial headlines) — loaded from Google Fonts
- **Single drop-shadow rule**: `filter: drop-shadow(3px 5px 30px rgba(0,0,0,0.22))` — used only on product imagery (`.product-shadow`, `.hero-visual`)
- **Layout**: edge-to-edge alternating light/dark tiles (`.tile`, `.tile.dark`, `.tile.parchment`)
- **Buttons**: pill-shaped only (`.btn-primary`, `.btn-secondary-pill`)

### Theme classes applied to `<body>`

| Tweak | Classes |
|-------|---------|
| Palette | `theme-light` / `theme-dark` / `theme-sepia` |
| Typography | `type-editorial` / `type-neutral` / `type-display` |
| Density | `density-airy` / `density-compact` |

### Tweaks panel

A floating panel (bottom-right) lets users switch palette, headline font style, hero variant, and layout density at runtime. State is managed by the `useTweaks` hook in `tweaks-panel.jsx` and applied via `useEffect` in `App` → body class mutations.

### Hero variants

Three variants controlled by the `tweaks.hero` value:
- `ba-slider` — draggable before/after comparison slider (default)
- `video-loop` — four-frame looping video strip with dot indicators
- `static` — single campaign image

### `<image-slot>` custom element

Drop-target placeholder for user images anywhere in the page. Key behaviours:
- Drag a PNG/JPEG/WebP/AVIF file onto any slot to fill it
- Double-click a filled `cover` slot to enter reframe mode (pan + corner-drag zoom, wheel zoom)
- Images persist across reloads via `.image-slots.state.json` sidecar (only works inside the Claude Design omelette runtime; read-only on a plain static host)
- Each slot needs a unique `id` attribute for persistence

## Deployment

Deployed to GitHub Pages with a custom domain:
- Repo: `github.com/sashaprs/theflashmode`
- `CNAME` file at root contains `theflashmode.com`
- DNS must point to GitHub Pages IPs (`185.199.108-111.153`) with a `CNAME www → sashaprs.github.io`
- No CI pipeline — push to `main` deploys automatically via GitHub Pages
