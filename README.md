# Vedant Achole — Portfolio Site

Personal portfolio built with **Next.js 15 + Tailwind CSS**. Dark Linear-style aesthetic.

---

## 🚀 Quick start — get it running on your laptop in 5 minutes

### 1. Open Terminal and navigate to this folder

```bash
cd path/to/portfolio
```

### 2. Install dependencies

```bash
npm install
```

This takes ~30 seconds and installs Next.js, React, Tailwind.

### 3. Run the dev server

```bash
npm run dev
```

### 4. Open http://localhost:3000 in your browser

You'll see the full portfolio, rendered properly with Tailwind working. No more broken layouts.

**Live reload:** any edit you make to `app/page.tsx` reflects instantly in the browser.

---

## 📁 Project structure

```
portfolio/
├── app/
│   ├── globals.css         ← All custom styles (fonts, animations, grid)
│   ├── layout.tsx          ← Root HTML layout + meta tags
│   └── page.tsx            ← THE ENTIRE PORTFOLIO (edit here)
├── public/
│   ├── images/
│   │   └── vedant.jpg      ← Your headshot
│   ├── projects/
│   │   ├── billingshield-architecture.svg
│   │   └── billingshield-github.png
│   └── Vedant_Achole_Resume.pdf  ← Downloaded from "Résumé" button
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

**Want to change content?** Edit `app/page.tsx`. Content data is at the top of the file in `NAV_ITEMS`, `STATS`, `PROJECTS`, `LIFE_INTERESTS` arrays. Change any text there.

---

## 🌐 Deploy to Vercel (production) in 3 steps

### Step 1 — Push to GitHub

```bash
# In the portfolio folder
git init
git add .
git commit -m "initial portfolio"

# Create a new repo on github.com/new (name it "portfolio" or "vedantachole-site")
# Then push:
git remote add origin https://github.com/VedantVAchole/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to **https://vercel.com/new** (sign in with GitHub)
2. Click **"Import"** next to your portfolio repo
3. Leave all settings as default (Vercel auto-detects Next.js)
4. Click **"Deploy"**

Takes ~90 seconds. You'll get a URL like `vedantachole-portfolio.vercel.app`.

### Step 3 — Point vedantachole.com at Vercel

1. Buy `vedantachole.com` on **Namecheap** or **Cloudflare Registrar** (~$10–12/year)
2. In Vercel → your project → **Settings → Domains**
3. Add `vedantachole.com` and `www.vedantachole.com`
4. Vercel shows you DNS records — copy them into your domain registrar's DNS settings
5. Wait 5–30 minutes for DNS propagation. Done.

---

## ✏️ Quick edit cheatsheet

| What you want to change | Edit this |
|---|---|
| Tagline "Data & AI engineer building systems..." | `app/page.tsx` → search for `Data & AI engineer` |
| Stats (10M+, $2.3B, 40%, 1,707) | `app/page.tsx` → `STATS` array (line ~17) |
| Project details | `app/page.tsx` → `PROJECTS` array (line ~30) |
| About section text | `app/page.tsx` → search for "I grew up in Maharashtra" |
| YouTube channel URL | `app/page.tsx` → search for `youtube.com/@vedantacholee` |
| Email / phone / LinkedIn | `app/page.tsx` → contact section |
| Resume file | Replace `public/Vedant_Achole_Resume.pdf` with new version |
| Your photo | Replace `public/images/vedant.jpg` with new photo |

---

## 🎨 Design notes

- **Background:** near-black (`#08080A`) with subtle grid pattern
- **Accent:** amber-to-pink gradient (`#E8A87C` → `#C38D9E`)
- **Typography:** Inter (body), Instrument Serif italic (display), JetBrains Mono (metadata)
- **Motion:** mouse-following glow in hero, scroll-triggered fade-ins, animated marquee
- **Sections:** Hero (with photo), Marquee, Work (3 projects), About, Life, Contact

---

## 🐛 Troubleshooting

**`npm install` errors?**
Make sure you have Node.js 18+ installed. Run `node --version`. If not: https://nodejs.org/

**Page looks unstyled / no Tailwind?**
Kill the dev server (Ctrl+C) and run `npm run dev` again. First run sometimes needs a second start.

**Build errors on Vercel?**
Most common issue: Node.js version. In Vercel → Settings → General → Node.js Version, set to `20.x`.

**Domain not working after DNS changes?**
DNS can take up to 24 hours. Use https://dnschecker.org to verify propagation. In the meantime, your site works on `vercel.app`.

---

## 🔮 What to add later (v2)

Not tonight. For future iteration:
- **Writing / Blog section** once you have 3+ Learning Log entries
- **F1 telemetry project** when BillingShield is done
- **Testimonials** from CGI leadership or professors at BU
- **Case study pages** — individual pages for each project with deeper writeup
- **OG image** — custom social preview at `public/og-image.png` (1200×630)

---

Built: April 17, 2026. Vedant Achole · vedant4815@gmail.com
