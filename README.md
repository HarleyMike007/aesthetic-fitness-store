# AESTHETIX LAB // POD AESTHETIC FITNESS E-COMMERCE STORE

A high-converting, mobile-first e-commerce template designed specifically for high-end aesthetic fitness, calisthenics, and bodybuilding streetwear brands (in the lineage of Gymshark, YoungLA, and Vanquish Fitness).

Featuring **muscle-defining optical cuts**, **360° All-Over-Print (AOP) fabric showcase**, dynamic cart drawer with free shipping gamification, interactive size matrices, and a complete automated dropshipping fulfillment integration plan.

---

## 📁 Project Structure

```
aesthetic-fitness-store/
├── index.html                   # Complete Standalone Single-Page Store (Instant Open in any Browser)
├── COPYWRITING.md               # Persuasive Brand Strategy, Hero Hooks & Product Copy
├── POD_INTEGRATION_GUIDE.md     # Automated Printify/Printful + Shopify/Next.js API Guide
├── README.md                    # Setup & Deployment Documentation
└── src/
    ├── types.ts                 # TypeScript definitions for Products, Cart & Sizing
    └── components/
        ├── ProductCard.tsx      # React/Next.js Product Card with Swatches & Size Selectors
        ├── FitGuideModal.tsx    # Interactive Metric / Imperial Sizing Modal
        └── CartDrawer.tsx       # Slide-out Cart Drawer with Shipping Progress Bar
```

---

## ⚡ Instant Quick Start (Zero Build Step)

You can launch and preview the storefront immediately without installing Node or NPM:

1. Navigate to the project folder:
   ```bash
   cd D:\Users\bacinam\.gemini\antigravity\scratch\aesthetic-fitness-store
   ```
2. Double-click `index.html` to open it in Chrome, Edge, or Firefox.
3. Or serve it via any static web server:
   ```bash
   npx serve .
   # or
   python -m http.server 3000
   ```

---

## 🎯 Key Front-End Features

- **Dark Mode Aesthetic**: Custom color palette (`#08080A` obsidian matte, `#111115` cards, `#FF2A54` neon crimson accent, and `#00F0FF` tech cyan).
- **Hero Section**: High-impact bold typography (`Bebas Neue` & `Space Grotesk`), live batch countdown urgency timer, and SVG anatomical V-Taper caliper HUD graphic.
- **Biomechanical Value Proposition**: 4-pillar breakdown explaining optical shoulder broadening, zero-crack sublimation inks, 4-way calisthenics stretch, and frictionless seams.
- **Interactive Product Catalog**:
  - Category filtering (`All`, `Hoodies`, `Muscle Tees`, `Shorts & Pants`).
  - Dynamic color swatch switcher that updates mockup highlights.
  - Size selectors (`S`, `M`, `L`, `XL`, `2XL`).
  - Hover quick-add buttons.
- **Slide-out Cart Drawer**:
  - Live in-memory shopping cart.
  - Interactive item quantity increment/decrement and removal.
  - Dynamic **Free Shipping Goal Bar** (threshold: $85) with live remaining dollar calculation.
- **V-Taper Sizing Matrix Modal**:
  - Toggle between **Inches (IN)** and **Centimeters (CM)**.
  - Clear chest and waist ranges matched to athlete physique profiles.
  - 30-Day Zero-Hassle Fit Guarantee disclaimer.
- **Athlete Community UGC Section**:
  - Instagram-style gallery with athlete height, weight, verified tags, and "Shop this look" CTA.
- **VIP Drop Newsletter & Footer**:
  - Drop notification form, trust badges, and automated POD fulfillment schedule.

---

## 🔗 Automated POD & Dropshipping Integration

Check [`POD_INTEGRATION_GUIDE.md`](POD_INTEGRATION_GUIDE.md) for step-by-step instructions:
1. **Catalog Setup**: Connecting Cut & Sew AOP products in Printify (MWW On Demand / SwiftPOD) or Printful.
2. **Shopify Storefront**: Linking cart checkout permalinks directly to Shopify checkout with auto-order approval.
3. **Headless Next.js**: Ready-to-use API routes (`/api/checkout` and `/api/webhooks/printful`) for zero-touch fulfillment.
4. **Returns SOP**: High-margin return-less remake strategy that turns sizing mismatches into brand loyalty.

---

## ✍️ Brand Strategy & Copywriting

Check [`COPYWRITING.md`](COPYWRITING.md) for the complete brand manifesto, gymshark-style product descriptions, bullet points, and high-converting micro-copy.
