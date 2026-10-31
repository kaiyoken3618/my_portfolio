# Enamul Haq Chowdhury · Portfolio

Static portfolio built with **Astro 5**, **Tailwind CSS 4** and two small **React** islands (terminal + command palette).

## Run locally

Requires Node 20.19+ or 22+ (with nvm-windows: `nvm use 22.0.0`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to dist/
npm run preview   # serve the built site
```

## Editing content

All text lives in [`src/data/profile.ts`](src/data/profile.ts): profile, stats, experience, projects, skills, education.
Photos are in `src/assets/`, the CV PDF is in `public/`.

## Deploy to Netlify (free)

**Option A: Git (auto-deploys on every push)**
1. Push this folder to a new GitHub repository.
2. Netlify → *Add new site* → *Import an existing project* → pick the repo.
3. Build settings are read from `netlify.toml` (`npm run build`, publish `dist`, Node 22).
4. *Site configuration → Change site name* to keep `enamul18.netlify.app`, or add a custom domain.

**Option B: CLI**
```bash
npx netlify-cli deploy --build --prod
```

If the final URL differs from `https://enamul18.netlify.app`, update `SITE_URL` in `astro.config.mjs` and the sitemap line in `public/robots.txt`.

## Contact form

The form uses Netlify Forms (free tier: 100 submissions/month). After the first deploy, submissions appear under
*Netlify → Forms*. Enable email notifications in *Forms → Form notifications*.
