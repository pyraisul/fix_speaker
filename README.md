# SpeakerFix Pro 🔊💦

SpeakerFix Pro is a high-performance, mobile-first web tool designed to eject water and fix muffled sound from smartphone speakers using targeted sound frequency technology.

## 🚀 Key Features
- **Web Audio API Engine**: Pure oscillator-generated tones (no MP3 lag).
- **Multiple Modes**:
  - **Water Eject (200Hz)**: Heavy physical vibration to push liquid out.
  - **Standard (440Hz)**: Clear, steady square wave.
  - **Deep Clean (Sweep)**: Frequency range (150Hz - 600Hz) to dislodge fine debris.
  - **Pulse Mode**: Rhythmic bursts for stubborn obstructions.
- **Premium UI**: Apple-inspired minimalist design with glassmorphism and animations.
- **SEO Optimized**: 4+ deep-dive guides with 1000+ words each and FAQ Schema.
- **Static Ready**: Fully compatible with Vercel, Netlify, and Cloudflare Pages.

---

## 🛠️ Architecture Overview
The application is built using **Next.js 14+ (App Router)** with a focus on performance and SEO.

- **Audio Service**: Contained within `src/components/SpeakerCleaner.tsx`, using the native browser `AudioContext`. It ensures high fidelity and zero network overhead for the cleaning tones.
- **Design System**: A global CSS variable-based system in `src/app/globals.css` that supports both light and dark modes with a premium, aesthetic feel.
- **SEO Strategy**: Pages are statically generated for maximum Lighthouse scores. Structured FAQ data is injected into each guide page to improve SERP rankings.
- **Static Export**: The project is configured to export as a static site (`output: 'export'`), ensuring fast TTFB and easy hosting.

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

### Production Build
Next.js is configured for static export. Run:
```bash
npm run build
```
The production-ready files will be in the `/out` directory.

---

## 🚢 Deployment (Vercel)
1. Push this code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. The framework will be automatically detected as Next.js.
4. Deployment settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `out` (Vercel handles this automatically if `output: 'export'` is detected)
5. Click **Deploy**.

---

## 💰 Monetization Settings
Placeholders for monetization are clearly marked in the code:
- **AdSense**: Located in `src/components/SpeakerCleaner.tsx`.
- **Affiliate Links**: Located in `src/app/page.tsx` within the 'Protect Your Phone' section.
- **Pro Features**: CTA section at the bottom of the homepage.

---

## ⚖️ License
This project is intended for resale as a digital asset. All content is original and SEO-optimized.
