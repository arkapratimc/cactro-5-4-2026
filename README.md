# Cactro Forex - High-Reliability Rate Aggregator

A production-ready currency exchange dashboard built with **React Router v7**. This project solves the "Trust Gap" for free-tier users by implementing a multi-source API waterfall and transparent data freshness indicators.

## 🚀 Live Demo
**Deployment:** [Your Vercel URL Here]

## 🛠 Tech Stack
- **Framework:** React Router v7 (Framework Mode)
- **Runtime:** Node.js
- **Styling:** CSS Modules (Scoped, zero-leakage styles)
- **Architecture:** Server-only modules (`.server.ts`) for secure data fetching.

## 🌿 Branch Strategy
- **`main`**: Production branch. Optimized for **Vercel** deployment with SSR enabled.
- **`node`**: Local development branch. Used for testing the API waterfall logic and in-memory caching mechanisms in a standard Node.js environment.

## ⚙️ Features
- **3-Tier Waterfall:** Primary (Frankfurter) -> Fallback (Fawaz Ahmed CDN) -> Strategic Cache (LKG).
- **Hydration-Safe UI:** Handles USA-to-India timezone differences without SSR mismatch errors.
- **Trust Signals:** Dynamic status badges (Live/Delayed/Offline) and "Last Verified" local timestamps.
- **Conversion Nudge:** Integrated CTA for 1-second real-time updates to drive $9/mo subscriptions.

## 💻 Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arkapratimc/cactro-5-4-2026.git
   cd cactro-5-4-2026
   ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Development
To run the project locally in the Node environment:

```bash
git checkout node
npm run dev
```

### Production Build
To test the production build locally:

```bash
npm run build
npm run start
```