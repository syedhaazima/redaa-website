# Redaa Developing Company – Website (React + Vite)

Bilingual (English / Arabic, LTR / RTL) corporate website.

## Run it

Requires Node.js 18 or newer (https://nodejs.org).

```bash
npm install
npm run dev
```

The site opens at http://localhost:5173

## Publish it

```bash
npm run build
```

Upload the contents of the `dist` folder to any web host (Netlify, Vercel, cPanel, etc.).
Pages use hash links (`#about`, `#projects`, `#sector-oil-gas`), so no server setup is needed.

## Where things are

| What | File |
|---|---|
| All text, English and Arabic | `src/data/content.js` |
| Styles, colours and typography | `src/styles/global.css` |
| Pages | `src/pages/` (Home, About, Services, Sectors, SectorDetail, Projects, Partners, Contact) |
| Header, menu, footer, mobile bar, project panel, 3D hero, map | `src/components/` |
| Scroll animations | `src/lib/motion.js` |
| Language switching (RTL/LTR) | `src/lib/i18n.jsx` |
| Photos | `public/img/` (replace with high-resolution files of the same name) |

## Enquiry form

The form validates and shows a confirmation, but does not send anywhere yet.
Connect it in `src/pages/Contact.jsx` inside `submit()` (for example to Formspree, EmailJS or your own backend) so enquiries reach info@alredaa.net.

## Libraries

React 18, GSAP + ScrollTrigger (animation), Lenis (smooth scrolling), Three.js (3D hero map).
Fonts load from Google Fonts: Archivo, IBM Plex Sans Arabic, Noto Kufi Arabic.
