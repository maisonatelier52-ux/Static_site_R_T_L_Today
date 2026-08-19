# RTL Today News — Next.js editorial demo

A responsive, JavaScript-only Next.js news site inspired by the supplied desktop reference. Content is fully data-driven from the two JSON files in `/json`.

## Routes

- `/` — latest-first homepage composed from individual section components
- `/[category]` — category landing pages
- `/[category]/[slug]` — article detail pages
- `/author/[slug]` — journalist profile pages

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

Replace the example domain in `app/layout.jsx`, `app/robots.js`, and `app/sitemap.js` before publishing. Images use Unsplash's image CDN and are optimized by `next/image`.
