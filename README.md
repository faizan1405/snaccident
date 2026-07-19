# SNACCIDENT

A single-product, scroll-driven storefront for the premium T-shirt brand **SNACCIDENT** — one signature tee, treated like a fashion campaign.

> _Not a Mistake. A Statement._

Minimal, luxury, futuristic. Palette: `#000000` · `#FFFFFF` · `#F5F5F5` · `#7A7A7A`.

---

## Stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 15 (App Router) + TypeScript               |
| Styling        | Tailwind CSS v4 (CSS-first `@theme` tokens)        |
| Motion         | Framer Motion · GSAP ScrollTrigger · Lenis         |
| State          | Zustand _(Phase 3)_                                |
| Forms          | Zod + React Hook Form _(Phase 3)_                  |
| 3D             | react-three-fiber + drei _(Phase 2)_               |
| Database       | MongoDB Atlas via Mongoose _(Phase 3)_             |
| Payments       | Razorpay _(Phase 3)_                               |
| Email          | Resend _(Phase 3)_                                 |
| Hosting        | Vercel                                             |

---

## Build phases

- [x] **Phase 1 — Foundation** _(current)_: scaffold, folder structure, Tailwind theme tokens, Lenis + GSAP smooth-scroll provider, root layout, custom cursor, loading screen, scroll-progress bar, sticky nav, global `prefers-reduced-motion` support.
- [ ] **Phase 2 — Story (home)**: scrubbed hero, marquee reveal, 3D tee, product details, size selector, shared scroll toolkit.
- [ ] **Phase 3 — Commerce**: Zustand cart + drawer, checkout (Zod + RHF), Razorpay flow, Resend email, thank-you page.
- [ ] **Phase 4 — Admin**: `/admin` auth, orders table, stock/price editing, CSV export, analytics.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local   # then fill in values (see below)

# 3. Run the dev server
npm run dev                  # http://localhost:3000
```

### Scripts

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Start the dev server                |
| `npm run build`     | Production build                    |
| `npm run start`     | Serve the production build          |
| `npm run lint`      | ESLint (next/core-web-vitals)       |
| `npm run typecheck` | `tsc --noEmit` type check           |

---

## Environment variables

Copy `.env.example` → `.env.local`. Everything **without** the `NEXT_PUBLIC_` prefix is server-only and must never reach a client component.

| Variable                       | Phase | Notes                                              |
| ------------------------------ | ----- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | 1     | Canonical site URL (used by metadata / OG).        |
| `MONGODB_URI`                  | 3     | MongoDB Atlas connection string.                   |
| `RAZORPAY_KEY_ID`              | 3     | Razorpay key id (server).                          |
| `RAZORPAY_KEY_SECRET`          | 3     | Razorpay secret — **server-only**, signs orders.   |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`  | 3     | Public key id for the checkout widget.             |
| `RESEND_API_KEY`               | 3     | Resend API key for order confirmation email.       |
| `RESEND_FROM_EMAIL`            | 3     | Verified "from" address.                           |
| `ADMIN_PASSWORD`               | 4     | Gates `/admin` login.                              |
| `SESSION_SECRET`               | 4     | Signs the admin session cookie.                    |

---

## Project structure

```
app/          App Router routes, root layout, pages
components/    UI + layout + providers (presentational, reusable)
  layout/     Navbar, Footer
  providers/  SmoothScrollProvider (Lenis + GSAP)
  ui/         CustomCursor, LoadingScreen, ScrollProgress
hooks/        usePrefersReducedMotion, useMounted
lib/          constants (brand copy, nav, palette)
utils/        cn() and small helpers
types/        shared TypeScript types
models/        Mongoose schemas          (Phase 3)
actions/       server actions            (Phase 3/4)
styles/       globals.css + @theme tokens
```

---

## Accessibility & motion

Motion is intentional, never decorative — and every effect has an off switch. `prefers-reduced-motion: reduce` is honoured globally: Lenis is never instantiated, the custom cursor snaps instead of trailing, the loading veil dismisses near-instantly, and a CSS guard neutralises long transitions/animations. Native, instant scrolling is the fallback.

---

## Performance note

Scroll-scrubbed frame sequences, a 3D model, and a custom cursor are deliberate brand choices that trade some mobile Lighthouse headroom for feel. Target: **90+ desktop**, smoothness prioritised on capable devices, with a clean reduced-motion fallback rather than chasing a perfect mobile score.
