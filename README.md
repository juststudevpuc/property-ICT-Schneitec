# Schneitec Property — Frontend

A modern, high-performance frontend for **Schneitec Property**, a luxury real estate and architectural firm. The site showcases iconic properties, 5-star hotel destinations, portfolio projects, career opportunities, and more — built with a premium aesthetic and smooth user experience in mind.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Lucide React](https://lucide.dev/) | Icon library |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible UI components |
| [React Helmet Async](https://github.com/staylor/react-helmet-async) | SEO & `<head>` management |
| [Geist Variable Font](https://vercel.com/font) | Typography |

---

## 📁 Project Structure

```
property-frontend/
├── public/               # Static assets (images, videos, favicon)
├── src/
│   ├── assets/           # Bundled assets (icons, etc.)
│   ├── components/
│   │   ├── layout/       # Header, Footer, page shell (HeaderFooter)
│   │   ├── shared/       # Reusable shared components (SEO, etc.)
│   │   └── ui/           # Base UI primitives (shadcn components)
│   ├── lib/              # Utility helpers
│   ├── pages/            # Route-level page components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── PortfolioProjectDetailPage.jsx
│   │   ├── DestinationsPage.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   ├── CareerPage.jsx
│   │   ├── MediaPage.jsx
│   │   ├── NewsArchivePage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── ExperiencePage.jsx
│   │   ├── OffersPage.jsx
│   │   ├── FeedbackPage.jsx
│   │   └── TermsConditionsPage.jsx
│   ├── App.jsx           # Root router & route definitions
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles & design tokens
├── index.html            # HTML shell (GA4 + GSC integration)
├── vite.config.js        # Vite + Tailwind v4 configuration
├── components.json       # shadcn/ui configuration
└── vercel.json           # Vercel deployment configuration
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero video, featured projects, expertise areas, CEO quote |
| `/about` | About | Company legacy, philosophy, lead architects, awards |
| `/portfolio` | Portfolio | Grid of completed architectural projects |
| `/projects/:projectId` | Project Detail | Individual portfolio project detail |
| `/destinations` | Destinations | Hotel & property destination listings |
| `/destinations/:hotelId` | Hotel Detail | Individual hotel/property detail |
| `/career` | Career | Open positions and company culture |
| `/media` | Media | News, press releases, and media coverage |
| `/media/news` | News Archive | Archived news articles |
| `/contact` | Contact | Contact form and company information |
| `/experience` | Experience | Guest experience highlights |
| `/offers` | Offers | Current promotions and special packages |
| `/feedback` | Feedback | Guest feedback form |
| `/terms` | Terms & Conditions | Legal terms of service |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18`
- **npm** `>= 9`

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd property-frontend

# 2. Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The development server will start at `http://localhost:5173` with hot module replacement (HMR) enabled.

### API environment

Vite loads `.env.development` for `npm run dev` and `.env.production` for production builds. Set `VITE_API_BASE_URL` to the Laravel API base URL, including its API prefix (for example, `http://localhost:8000/api/v1`).

The local `.env.production` currently uses the reserved `api.example.com` example URL. Replace it with the real production API URL before building, or configure `VITE_API_BASE_URL` in the production hosting environment. Do not put credentials or secrets in `VITE_*` variables; they are included in the browser bundle.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## ✨ Key Features

- **Immersive Hero** — Full-viewport video hero with overlay gradients and animated CTAs
- **Responsive Design** — Mobile-first layouts that scale gracefully to desktop
- **SEO Ready** — Per-page `<title>` and meta descriptions via `react-helmet-async`; Google Search Console & GA4 integrated in `index.html`
- **Smooth Animations** — Framer Motion powers page transitions and micro-interactions
- **Accessible Markup** — Semantic HTML5, ARIA labels, and landmark regions throughout
- **Path Aliases** — `@/` maps to `src/` for clean, absolute imports
- **Vercel Deployment** — Preconfigured `vercel.json` for seamless CI/CD deploys

---

## 🌐 Deployment

The project is configured for deployment on **[Vercel](https://vercel.com)**. Push to your connected branch and Vercel will automatically build and deploy.

```bash
# Manual production build
npm run build
```

---

## 📊 Analytics & SEO

| Service | Integration |
|---|---|
| Google Analytics 4 | `gtag.js` script in `index.html` (ID: `G-P6YF0DLJK7`) |
| Google Search Console | Meta verification tag in `index.html` |
| Per-page SEO | `<SEO />` component using `react-helmet-async` |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is proprietary. All rights reserved © Schneitec Property.
