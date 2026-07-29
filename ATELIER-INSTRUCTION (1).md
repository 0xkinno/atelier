# ATELIER - Complete Build Instruction for Antigravity

> "Your digital storefront. One link. Instant NIM."

This document is the single source of truth for building Atelier from scratch. Follow every phase sequentially. Do not skip steps. Do not simplify. Do not use placeholder content. Every section must be fully implemented, fully styled, and fully functional before moving to the next phase.

---

## PROJECT OVERVIEW

**What Atelier is:** A premium creator storefront and digital goods marketplace built as a Nimiq Pay Mini App. Creators sell digital products (presets, templates, art, guides, music, code) directly from their wallet. Buyers pay in NIM or USDT, verified on-chain, and get instant file access. Zero platform fees. Non-custodial. Local-first.

**Who it's for:** Photographers selling presets, designers selling templates, musicians selling sample packs, developers selling boilerplates, writers selling ebooks, educators selling courses. Anyone who creates digital goods and wants to sell them without a middleman.

**How it works (5 steps):**
1. Creator opens Atelier inside Nimiq Pay, connects wallet (no signup)
2. Creator builds a storefront: name, bio, avatar, accent color
3. Creator uploads products: title, description, preview image, price, downloadable file
4. Creator shares their link (atelier.app/handle)
5. Buyer visits, pays in NIM or USDT, payment is verified on-chain, file unlocks instantly

**Tech stack:**
- Next.js 15 with App Router and TypeScript
- React 19
- @nimiq/mini-app-sdk for wallet connection, signing, payments
- Vercel KV (Upstash Redis) for data persistence
- Vercel Blob for file storage (product files + preview images)
- CoinGecko API for live NIM/USDT price feeds
- Deployed on Vercel

**No smart contracts. No test tokens. No faucets.** Nimiq Pay SDK handles all wallet operations and payments natively. Your app calls SDK methods, the user approves in their wallet, NIM goes directly wallet-to-wallet.

---

## DESIGN SYSTEM

This is the most critical section. The visual quality must compete with Apple, Linear, Figma, and Stripe. Every spacing decision, every animation, every font weight must feel intentional and handcrafted.

### Design Language
Modern editorial minimalism with magazine-quality typography. Luxury software aesthetics on a Swiss grid. Large breathing whitespace. Sophisticated composition. Premium but not flashy. Confident but not loud. Timeless, not trendy. Never Web3-looking. Never glassmorphism. Never Tailwind-default cards.

### Color Palette

```
BACKGROUNDS
--bg-primary:       #F7F6F2    /* warm ivory, main background, never pure white */
--bg-secondary:     #F0EFE9    /* slightly darker warm tone for alternating sections */
--bg-card:          #FFFFFF    /* pure white cards floating on ivory */
--bg-accent-card:   #D4E157    /* lime-yellow for featured/highlight cards (like Solv calculator) */
--bg-dark:          #2C3319    /* deep olive-black for dark sections and footer */
--bg-dark-card:     #3A4422    /* slightly lighter olive for cards on dark backgrounds */

TEXT
--text-primary:     #1A1C16    /* near-black with warm undertone */
--text-secondary:   #5A5D52    /* warm medium gray for body copy */
--text-tertiary:    #8A8D82    /* light warm gray for captions, labels */
--text-on-dark:     #F7F6F2    /* ivory text on dark backgrounds */
--text-on-dark-sub: #B8BBA8    /* muted text on dark backgrounds */
--text-on-accent:   #2C3319    /* dark olive text on lime cards */

ACCENT
--accent-primary:   #D4E157    /* lime-yellow, primary CTA highlight */
--accent-olive:     #4A5D23    /* deep olive green for primary buttons */
--accent-olive-hover: #3D4E1C  /* darker olive on hover */
--accent-moss:      #6B7F3A    /* moss green for secondary elements */
--accent-sage:      #A4B87C    /* soft sage for subtle highlights */

BORDERS & SHADOWS
--border-light:     rgba(26, 28, 22, 0.06)
--border-medium:    rgba(26, 28, 22, 0.12)
--shadow-sm:        0 1px 3px rgba(26, 28, 22, 0.04)
--shadow-md:        0 4px 16px rgba(26, 28, 22, 0.06)
--shadow-lg:        0 8px 32px rgba(26, 28, 22, 0.08)
--shadow-xl:        0 16px 48px rgba(26, 28, 22, 0.10)
--shadow-float:     0 24px 64px rgba(26, 28, 22, 0.12)  /* for floating hero widgets */
```

### Typography

Use premium modern fonts. Load from Google Fonts with these specific weights:

```
DISPLAY / HEADLINES
Font: "Playfair Display" (serif) — weight 400, 500, 600, 700 + italic
Fallback: Georgia, "Times New Roman", serif
Usage: All headlines, hero text, section titles, storefront names
Sizing: Hero: clamp(3rem, 6vw, 4.8rem), Section: clamp(2rem, 4vw, 3rem)
Letter-spacing: -0.025em (tight)
Line-height: 1.08

BODY / UI
Font: "Inter" — weight 300, 400, 500, 600
Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
Usage: Body copy, navigation, buttons, labels, descriptions
Sizing: Body: 0.95rem, Small: 0.82rem, Caption: 0.72rem
Letter-spacing: -0.01em (body), 0.08em (uppercase labels)
Line-height: 1.65

MONO / DATA
Font: "JetBrains Mono" — weight 400, 500
Fallback: "SF Mono", "Fira Code", monospace
Usage: Prices, wallet addresses, transaction hashes, stats, eyebrow labels
Sizing: 0.72rem for labels, 0.85rem for prices
Letter-spacing: 0.04em
```

**Typography hierarchy rules:**
- Headlines are large, bold, tight-spaced, with editorial weight
- Body text has generous leading (1.65) for comfortable reading
- Navigation uses small uppercase Inter at medium weight
- Numbers use tabular figures for alignment
- Eyebrow labels use JetBrains Mono, tiny uppercase, wide-tracked
- Never use more than 3 type families on any single view

### Layout Grid

```
Max content width: 1200px
Page padding: 32px (desktop), 20px (mobile)
Section vertical padding: 120px (desktop), 80px (mobile)
Card gap: 16-24px
Card padding: 28-40px
Card border-radius: 16px (standard), 24px (large feature cards)
Button border-radius: 100px (pill) for primary, 8px for secondary
```

### Shadows & Depth
All shadows are extremely soft, large blur, very low opacity. Natural ambient lighting feel. No harsh Material Design shadows. Cards should appear to gently float above the surface.

### Borders
Hairline only. Warm gray. Almost invisible. Used to separate, not to contain. 1px solid var(--border-light) maximum.

### Icons
Use Lucide React icons exclusively. Thin stroke (1.5px). Professional. No emoji in the UI. No cartoon. No filled icons.

### Image Placement & Spacing Rules

Images are a core design element, not decoration. Every image must feel intentionally placed with generous breathing room, exactly like the Solv fintech reference where photos sit naturally alongside UI cards with perfect spatial rhythm.

**General image rules:**
- All images have border-radius: 16px (matching card radius) unless full-bleed
- Images never touch the edge of their container. Minimum 32px clearance from adjacent elements on desktop, 20px on mobile
- Images inside cards have 0 padding (edge-to-edge within the card), but the card itself has its own margin/padding
- When an image sits next to text in a 2-column layout, the gap between columns is 64-80px on desktop, 40px on tablet, collapsing to stacked on mobile with 32px between
- Images always have an aspect ratio set (via CSS aspect-ratio or explicit height) to prevent layout shift during loading
- All images use object-fit: cover, never stretch or distort

**Hero image placement:**
- The hero photograph occupies roughly 45-50% of the hero width on the right side
- It sits vertically centered within the hero section
- The image has border-radius: 24px (larger than standard cards, feels more editorial)
- Floating widget cards overlap the image by 20-30% of their width, anchored to the image's edges
- The image has a subtle warm overlay (linear-gradient with rgba(247,246,242,0.05)) to blend with the ivory background
- On mobile: the image moves above the text, full-width with 20px side margins, max-height: 360px, floating widgets reposition or hide

**Feature section images (2-column layouts):**
- Image column is exactly 50-55% width, text column gets the remainder
- Image has border-radius: 16px and box-shadow: var(--shadow-lg)
- Between image and text: 64px gap (desktop), 48px (tablet)
- The image slightly overflows its grid column by 20-30px on the outer edge for an editorial "breaking the grid" feel
- On mobile: image stacks above text, full-width, margin-bottom: 32px before text begins

**Full-width image with text overlay card:**
- Image spans the full content width (max 1200px) with border-radius: 24px
- Height: 400-480px on desktop, 300px on mobile
- Dark gradient overlay on the bottom 40% of the image (linear-gradient transparent to rgba(44,51,25,0.85))
- Text card sits on the bottom-left of the image with 32px padding from edges
- Text on image uses --text-on-dark colors

**Product preview images (in grids):**
- Aspect ratio: 4:3 (landscape) for grid cards
- border-radius: 12px (slightly smaller than feature images since cards are smaller)
- On hover: scale(1.03) with overflow:hidden on the container so the image zooms without breaking the card boundary
- Transition: 400ms var(--ease-premium)
- Below image: 12px padding before the product title text

**Avatar images:**
- Always circular (border-radius: 50%)
- Sizes: 32px (inline mentions), 48px (cards), 64px (profile headers), 96px (storefront headers)
- Border: 2px solid var(--bg-primary) to separate from backgrounds
- On creator storefronts: avatar has a subtle box-shadow: 0 2px 8px rgba(0,0,0,0.08)

**Image loading:**
- Use next/image with priority={true} for hero and above-fold images
- Below-fold images use loading="lazy"
- Show a subtle shimmer skeleton placeholder (matching the image's exact dimensions and border-radius) while loading
- Skeleton color: linear-gradient animation between var(--bg-secondary) and var(--bg-primary)

**Photography inside dark sections (olive backgrounds):**
- Images have border-radius: 16px with a 1px border of rgba(255,255,255,0.08) to subtly separate from the dark background
- Box-shadow increases to var(--shadow-xl) for more float effect against dark surfaces

**Spacing between image-heavy sections:**
- Two consecutive sections that both contain large images need extra vertical padding: 140px instead of the standard 120px
- This prevents visual heaviness and lets each image breathe

---

## MOTION SYSTEM

Motion quality must match Figma's homepage. Not fast, not playful. Elegant, confident, sophisticated. Every movement should feel physical and intentional.

### Easing
```css
--ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```
Never use linear. Never use bounce. Never use overshoot.

### Scroll Animations (Intersection Observer)
- Sections fade in with translateY(24px) -> translateY(0), opacity 0 -> 1
- Cards reveal with slight upward translation, staggered by 80ms per card
- Text and images reveal independently (text first, then image)
- Cards scale from scale(0.98) to scale(1.0) as they enter viewport
- All transitions: 600ms with var(--ease-premium)

### Hero Floating Widgets
- 2-3 floating UI cards around the hero (earnings widget, payment verified badge, live storefront preview)
- Each floats independently: translateY oscillation, 6-8s duration, different delays
- Extremely soft shadow (var(--shadow-float))
- On scroll, widgets drift at different parallax speeds (subtle, 0.02-0.05 multiplier)

### Hover Interactions
- Cards: translateY(-3px) + shadow deepens from --shadow-md to --shadow-lg, 200ms
- Buttons: brightness increase + translateY(-1px), 150ms
- Images: scale(1.02), 300ms
- Links: underline slides in from left, 200ms
- No exaggerated effects. Everything is subtle and premium.

### Page Transitions
- Route changes: fade + translateY(8px), 200ms
- Modal/sheet open: slide up from bottom with backdrop fade, 300ms
- Toast notifications: slide in from top-right, 250ms

### Number Animations
- Metrics/stats count up when they enter viewport
- Use requestAnimationFrame for smooth counting
- Duration: 1200ms with ease-out

---

## HUMAN ARTWORK / PHOTOGRAPHY

Gemini must generate photorealistic images for the landing page. These are NOT stock photos, NOT AI-looking illustrations, NOT cartoon characters.

### Image Generation Prompts for Gemini

**Hero image (main) -- this is the single most important image in the entire app:**
```
Professional editorial photograph of a young Black male creative entrepreneur sitting at a clean minimal desk with a laptop, wearing a casual olive green crew neck sweater, natural warm daylight streaming from a large window on the left side, shallow depth of field (f/1.4), the background is a softly blurred modern studio space with a monstera plant and warm wood shelving, warm natural skin tones, natural expression (slight confident smile, looking slightly off-camera to the left), shoulders and head framed in upper two-thirds of composition with some desk space visible below, shot on Canon R5 85mm f/1.4, editorial magazine quality equivalent to Apple "Shot on iPhone" campaign or Monocle magazine portraits, warm color grading with slightly lifted shadows and gentle highlight roll-off, muted saturation, the overall color temperature should complement the warm ivory (#F7F6F2) background it will sit against, absolutely no text overlays, no logos, no UI elements in the image itself
```
**Placement context for this image:** It occupies the right 45-50% of the hero section. The subject should be positioned so that floating UI widget cards can overlap the right edge and bottom-right corner without obscuring the face. The left edge of the image will have a subtle feathered fade into the ivory background (CSS mask or gradient overlay) so there is no harsh cutoff line between the photo and the text column.

**Feature section - Creator working:**
```
Professional editorial photograph of a young woman of South Asian descent sitting cross-legged on a modern sofa with a tablet, reviewing her digital art portfolio, wearing a cream knit top, warm natural afternoon light, cozy modern apartment with warm wood tones, plants visible, authentic relaxed expression, shallow depth of field, shot on Sony A7IV 50mm f/1.8, warm editorial color grading, no text
```

**Feature section - Buyer on phone:**
```
Professional editorial close-up photograph of hands holding an iPhone, screen showing a clean product page (screen can be slightly blurred), person wearing a dark green jacket sleeve visible, outdoor cafe setting with soft bokeh background, warm daylight, shot from slightly above, editorial commercial quality, warm tones, no text
```

**Testimonial/social proof section:**
```
Professional editorial photograph of a diverse group of three young creative professionals (one Black woman, one East Asian man, one white man) standing together in a bright modern co-working space, laughing naturally, casual smart dress, warm natural light, editorial lifestyle quality, NOT posed stock photo energy, authentic candid moment, warm color grading, no text
```

**These images should:**
- Feel like Apple campaign photography
- Have warm, natural lighting (golden hour / window light)
- Show authentic expressions, never forced smiles
- Use shallow depth of field
- Have warm editorial color grading (slightly desaturated, warm shadows)
- Feature diverse, real-looking people
- Blend seamlessly into the ash-white/ivory UI

**Placement rules:**
- Hero: large image (40-50% of hero width) with UI widget cards floating over/around it
- Feature sections: image fills one side of a 2-column grid, text on the other
- One section uses a full-width image with text overlay (dark card on the image, like the Solv "Hassle-free cap" card)
- Images have 16-24px border-radius to match card system

---

## LANDING PAGE SECTIONS (in order)

> **IMPORTANT:** This landing page follows the exact structural skeleton of the original HTML concept (nav -> hero with floating widgets -> dark metrics strip -> 4-step cards -> browser mockup storefront preview -> category grid -> comparison table -> CTA -> footer). The upgrades are: olive/lime color system instead of gold, real photography replacing the phone mockup in the hero, a revenue calculator section added between categories and comparison, a payment flow trust section added after comparison, and a social proof section before the final CTA. The layout patterns, grid proportions, card styles, and section flow remain the same foundation, elevated with richer content and the motion system.

### 1. Navigation Bar (fixed, frosted glass)
- Logo: "A" mark (dark olive square, italic serif A in lime) + "Atelier" wordmark in Playfair Display
- Links: HOW IT WORKS, FOR CREATORS, EXPLORE (uppercase Inter, small, tracked)
- CTA: "Connect Nimiq" pill button, deep olive background, ivory text
- On scroll: subtle shadow appears, background becomes more opaque
- Mobile: hamburger menu with slide-in drawer

### 2. Hero Section (full viewport height)
- Left side: eyebrow label "A NIMIQ PAY MINI APP" in JetBrains Mono
- Headline: "Your digital storefront. One link. Instant NIM." in Playfair Display, 4.8rem
- "Instant NIM" in lime-yellow gradient text
- Subhead: "Sell presets, templates, art, guides, music, and code directly from your wallet. Zero platform fees. Payments settle in seconds, not days." in Inter light
- Two CTAs: "Open your Atelier" (olive pill) + "See how it works" (ghost pill)
- Right side: Gemini-generated hero photograph of creative entrepreneur
- Floating over the photo: 2-3 UI widget cards (earnings card, payment verified badge) with independent float animations
- Background: warm ivory with very subtle grain texture

### 3. Metrics Strip (dark olive background)
- 4 columns: "0% fees" / "<3s settlement" / "NIM + USDT" / "Wallet = login"
- Values in Playfair Display 2rem, lime-yellow color
- Labels in JetBrains Mono tiny uppercase, muted olive text
- Numbers animate (count up) when entering viewport

### 4. How It Works (4-step cards)
- Section eyebrow: "HOW IT WORKS" in JetBrains Mono
- Headline: "From connect to first sale in under sixty seconds" in Playfair Display
- 4 cards in a row, white background, hairline border
- Each card: step number (JetBrains Mono "01"), icon (Lucide), title (Playfair), description (Inter)
- Cards have hover: border turns olive, subtle lift, shadow deepens
- Steps: Connect wallet -> Build storefront -> Upload products -> Get paid instantly
- Cards stagger-animate in on scroll

### 5. Creator Storefront Preview (2-column, ash background)
- Left: section eyebrow, headline "A storefront that makes your work look as good as it is", body text, feature checklist
- Feature list: 6 items with olive checkmark circles (wallet-signature auth, on-chain verification, cryptographic receipts, live fiat conversion, earnings dashboard, share kit)
- Right: browser mockup window showing a sample storefront
- Browser chrome: 3 dots (red/yellow/green), URL bar showing "atelier.app/mayastudio"
- Inside: creator avatar, name, bio, wallet address snippet, product count, sales count
- Product grid: 6 product cards with gradient placeholder images, names, NIM prices
- Mockup has shadow-xl, slight rotation (1-2deg) for depth
- Include Gemini-generated photo of creator integrated into this section

### 6. Categories Grid (8 categories)
- Section eyebrow + headline: "If it's digital and it's yours, it belongs on Atelier"
- 4x2 grid of category cards: Design, Photography, Audio, Code, Education, Video, Writing, Digital Art
- Each card: Lucide icon in olive-tinted circle, category name (Playfair), short description (Inter)
- Cards hover: border turns olive, lift, shadow
- Stagger-animate on scroll

### 7. Revenue Calculator (lime-yellow featured section)
- Left side: headline "One transparent fee. None." + body text about keeping 100%
- Right side: lime-yellow card with interactive revenue calculator
- Slider: "Your monthly sales" ($0 - $10,000)
- Shows: "On Gumroad you'd lose: $X" vs "On Atelier you keep: $Y (100%)"
- Numbers animate smoothly as slider moves
- Card has soft shadow, 24px radius

### 8. Comparison Table (dark olive background)
- Headline: "Keep what you earn" in ivory Playfair
- Table comparing Gumroad vs Payhip vs Atelier
- Rows: Platform fee, Processing fee, Payout speed, Account required, Chargebacks, Data collected
- Atelier column highlighted in lime-yellow text
- Clean table with hairline separators

### 9. How Payments Work (technical trust section)
- Illustrative flow: Connect wallet -> Browse storefront -> Pay in NIM/USDT -> On-chain verification -> Instant file access
- Include Gemini-generated photo of buyer on phone
- Feature cards: "Non-custodial" / "On-chain verified" / "Signed receipts" / "Instant delivery"
- Each card has olive icon, title, one-line description

### 10. Social Proof / Creator Showcase
- Headline: "Creators already selling on Atelier"
- 3 sample creator cards (pre-seeded demo data): photographer, designer, developer
- Each card: avatar, name, product count, total sales, preview of top product
- Include Gemini-generated group photo of creators

### 11. CTA Section (warm ivory, centered)
- Large Playfair headline: "Your work deserves a storefront without a middleman"
- Subtext in Inter light
- Single olive pill CTA: "Open your Atelier"
- Subtle lime-yellow gradient glow behind the CTA

### 12. Footer (dark olive background)
- Logo + wordmark
- Links: GitHub, Documentation, Nimiq Pay, Competition
- "Built for Nimiq Pay" + MIT License
- Social links row
- Clean, minimal, no clutter

---

## APPLICATION PAGES & ROUTES

### Public Routes (no wallet required)
```
/                     Landing page (above)
/[handle]             Public creator storefront
/[handle]/[productId] Product detail page
/explore              Discover storefronts (recently active creators)
```

### Authenticated Routes (wallet signature required)
```
/create               Create storefront (first-time setup)
/dashboard            Creator dashboard (earnings, products, analytics)
/dashboard/products   Manage products (add, edit, archive)
/dashboard/sales      Sales history with filters + CSV export
/dashboard/share      Share kit (social templates, QR, badge)
/dashboard/settings   Edit profile (name, bio, avatar, accent color)
/purchases            Buyer's purchase library (re-downloadable files)
```

### API Routes
```
POST   /api/auth/nonce          Generate signing nonce for wallet auth
POST   /api/auth/session        Verify signature, create session
GET    /api/auth/me             Get current session user

POST   /api/profile/create      Create creator profile (signed)
GET    /api/profile/[handle]    Get public profile
PUT    /api/profile/[handle]    Update profile (signed)
DELETE /api/profile/[handle]    Delete profile + tombstone handle (signed)
GET    /api/profile/wallet/[addr] Lookup profile by wallet address

POST   /api/products/create     Create product (signed)
GET    /api/products/[handle]   List products for a storefront
GET    /api/products/[handle]/[id] Get single product
PUT    /api/products/[id]       Update product (signed)
DELETE /api/products/[id]       Archive product (signed)

POST   /api/purchase/initiate   Start purchase flow (generates quote)
POST   /api/purchase/verify     Verify on-chain payment + unlock file
GET    /api/purchase/[txHash]   Get purchase receipt
GET    /api/purchases/me        Get buyer's purchase history (signed)

GET    /api/quote/nim           Get NIM price in fiat (CoinGecko)
GET    /api/quote/usdt          Get USDT price in fiat (CoinGecko)

GET    /api/stats/[handle]      Get creator stats (public: product count, sales count)
GET    /api/stats/dashboard     Get creator dashboard stats (signed)

POST   /api/upload/image        Upload preview image (signed, returns URL)
POST   /api/upload/file         Upload product file (signed, returns encrypted URL)

GET    /api/explore             List recently active storefronts
GET    /api/badge/[handle]      Live SVG badge for READMEs
GET    /api/og/[handle]         Dynamic OG image for storefront
GET    /api/og/[handle]/[id]    Dynamic OG image for product
```

---

## DATA SCHEMA (Vercel KV / Upstash Redis)

```
PROFILES
profile:{handle}              -> JSON { handle, walletAddress, displayName, bio, avatarUrl, accentColor, createdAt, updatedAt, productCount, totalSales, totalNimEarned, totalUsdtEarned }
wallet:{walletAddress}        -> handle (reverse lookup)
handle:tombstone:{handle}     -> "deleted" (prevents re-registration)

PRODUCTS
product:{handle}:{productId}  -> JSON { id, handle, title, description, previewImageUrl, fileUrl, fileSize, fileType, priceUsd, category, status (active/archived), createdAt, updatedAt, salesCount }
products:{handle}             -> sorted set of productIds by createdAt

PURCHASES
purchase:{txHash}             -> JSON { txHash, buyerAddress, creatorAddress, handle, productId, amountNim, amountUsdt, priceFiat, currency (NIM/USDT), chain, verifiedAt, receiptSignature }
purchases:buyer:{walletAddress} -> sorted set of txHashes by date
purchases:creator:{handle}    -> sorted set of txHashes by date
purchase:dedup:{txHash}       -> "used" (prevents replay)

QUOTES
quote:{quoteId}               -> JSON { id, productId, priceUsd, nimAmount, usdtAmount, nimRate, usdtRate, expiresAt, createdAt }

AUTH
nonce:{walletAddress}         -> JSON { nonce, expiresAt, used }
session:{sessionToken}        -> JSON { walletAddress, handle, expiresAt }

STATS
stats:global                  -> JSON { totalStorefronts, totalProducts, totalSales, totalNimTransacted }
stats:daily:{YYYY-MM-DD}:{handle} -> JSON { views, purchases, nimEarned, usdtEarned }

RATE LIMITS
ratelimit:{ip}:{endpoint}     -> counter with TTL
```

---

## BUILD PHASES

### PHASE 1: Foundation (Core Infrastructure)

**Goal:** Project setup, authentication, database layer, SDK integration.

**Steps:**
1. Initialize Next.js 15 project with TypeScript, App Router, src/ directory
2. Install dependencies: @nimiq/mini-app-sdk, @noble/curves, @noble/hashes, lucide-react, canvas-confetti
3. Set up Vercel KV connection (lib/kv.ts)
4. Set up Vercel Blob for file uploads (lib/blob.ts)
5. Create the global CSS with the complete design token system (all CSS variables from the design system above)
6. Load fonts: Playfair Display, Inter, JetBrains Mono from Google Fonts
7. Build the Nimiq SDK wrapper (lib/nimiq.ts):
   - Initialize MiniAppSDK
   - listAccounts() for wallet discovery
   - sign() for authentication signatures
   - sendBasicTransactionWithData() for NIM payments
   - getBlockNumber() for chain height
   - Graceful fallback when outside Nimiq Pay container
8. Build authentication flow (lib/auth.ts):
   - Generate random nonce with 5-minute TTL
   - Verify Ed25519 signature against nonce
   - Derive Nimiq address from public key server-side
   - Create session token (HttpOnly cookie, 7-day expiry)
   - Middleware for protected routes
9. Build the KV data layer (lib/db.ts):
   - All CRUD operations for profiles, products, purchases
   - Rate limiting helpers (per-IP, per-endpoint)
   - Atomic counter operations for stats
10. Set up environment variables (.env.example):
    - KV_REST_API_URL, KV_REST_API_TOKEN
    - BLOB_READ_WRITE_TOKEN
    - NIMIQ_RPC_URL (https://api.nimiq.com)
    - NEXT_PUBLIC_APP_URL
    - COINGECKO_API_URL

**Verify phase 1:** `npm run build` passes, SDK initializes without errors, KV connects, auth flow works end-to-end in console tests.

---

### PHASE 2: Creator Flow (Storefront + Product Management)

**Goal:** Creators can create profiles, upload products, and manage their storefront.

**Steps:**
1. Build /create page:
   - Connect wallet button (calls SDK listAccounts)
   - Sign nonce for authentication
   - Form: handle (validated: lowercase, alphanumeric, 3-24 chars, not tombstoned), display name, bio, accent color picker
   - Avatar upload (Vercel Blob)
   - On submit: create profile in KV, redirect to /dashboard
   - Handle validation: reserved words blocked (admin, api, explore, dashboard, etc.)

2. Build /dashboard page:
   - Authenticated layout with sidebar navigation
   - Overview: total earnings (NIM + USDT + fiat equivalent), product count, total sales
   - Period selector: Today, 7D, 30D, All
   - Recent sales feed (last 10 purchases)
   - Quick actions: Add product, Share storefront, View storefront

3. Build /dashboard/products page:
   - Product list with status badges (active/archived)
   - Add product form:
     - Title (required, max 100 chars)
     - Description (required, max 1000 chars, supports basic markdown)
     - Category selector (Design, Photography, Audio, Code, Education, Video, Writing, Digital Art)
     - Price in USD (decimal input, min $0.50, max $10,000)
     - Preview image upload (Vercel Blob, max 5MB, jpg/png/webp)
     - Product file upload (Vercel Blob, max 100MB, any type)
     - Save -> creates product in KV, increments profile productCount
   - Edit product: same form, pre-filled
   - Archive product: soft delete (status: archived), doesn't show on public storefront
   - Product cards show: preview image, title, price, sales count, status

4. Build /dashboard/sales page:
   - Sales table: date, product, buyer wallet (truncated), amount (NIM/USDT), fiat value, tx link
   - Period filters: Today, 7D, 30D, All
   - Summary bar: total payments, total fiat, total NIM, total USDT
   - Export CSV button (generates and downloads CSV for selected period)
   - Transaction links: NimiqHub for NIM, Polygonscan for USDT

5. Build /dashboard/settings page:
   - Edit display name, bio, avatar, accent color
   - All changes require wallet signature
   - Delete storefront: double confirmation, requires signature, tombstones handle, deletes all data

6. Build /dashboard/share page:
   - Storefront URL with copy button
   - QR code (generated client-side, downloadable as PNG)
   - Pre-written social posts for X, Telegram, WhatsApp (with storefront URL embedded)
   - Embeddable SVG badge for GitHub READMEs
   - Nimiq Pay deeplink

**Verify phase 2:** Creator can create profile, upload products with real files, see them in dashboard, edit/archive them, export CSV, and delete their storefront.

---

### PHASE 3: Buyer Flow (Purchase + Delivery)

**Goal:** Buyers can browse storefronts, purchase products, receive files, and view purchase history.

**Steps:**
1. Build /[handle] page (public storefront):
   - Creator header: avatar, display name, bio, wallet address (truncated), product count, sales count
   - Product grid: preview images, titles, prices (USD + NIM equivalent)
   - Accent color from creator profile applied as CSS variable
   - OG metadata: dynamic title, description, image
   - If wallet connected: show "My Purchases" link in header
   - If creator is viewing own storefront: show "Edit" link

2. Build /[handle]/[productId] page (product detail):
   - Large preview image
   - Product title, description (rendered markdown), category badge
   - Price: show USD price, live NIM equivalent, live USDT equivalent
   - "Buy for X NIM" primary CTA (olive pill) + "Pay with USDT" secondary
   - File info: type, size
   - Creator info card: avatar, name, link to storefront
   - If already purchased (check by wallet): show "Download" button instead of buy

3. Build purchase flow:
   a. Buyer clicks "Buy for X NIM":
      - Generate quote: fetch NIM price from CoinGecko, calculate exact Luna amount
      - Quote has 5-minute validity with visible countdown timer
      - Display: "Send exactly X.XXXXX NIM to [creator address]"
      - Generate QR code with payment details
      - Call SDK sendBasicTransactionWithData() with creator address, Luna amount, and receipt data
      - User approves in Nimiq Pay wallet

   b. Payment verification:
      - After SDK returns txHash, call /api/purchase/verify
      - Server checks Nimiq RPC for transaction: correct recipient, correct amount (exact Luna match), confirmed
      - If mismatch: clear error message ("Amount doesn't match quote, expected X got Y")
      - If RPC unavailable: show "Verifying..." with retry, fallback to Nimiq explorer API
      - Check txHash deduplication (prevent replay)
      - On success: create purchase record, increment product salesCount, increment creator earnings

   c. File delivery:
      - Generate time-limited download URL for the product file (Vercel Blob signed URL, 1-hour expiry)
      - Show download button + receipt (txHash, amount, timestamp, creator, product)
      - Link to transaction on NimiqHub

   d. USDT flow (same pattern):
      - Use Nimiq Pay EVM provider for Polygon USDT
      - Verify on Polygon RPC
      - Link to Polygonscan

4. Build quote system (lib/quote.ts):
   - Fetch NIM/USD and USDT/USD from CoinGecko
   - Cache quotes for 30 seconds (avoid hammering API)
   - Fallback hardcoded rates if CoinGecko is unreachable (show warning)
   - 5-minute quote validity with countdown
   - Auto-refresh QR and amount when quote expires

5. Build /purchases page (buyer):
   - List of all purchases by connected wallet
   - Each: product preview, title, creator, date, amount, download button, tx link
   - Re-download: generates fresh signed URL

6. Build payment verification (lib/verify.ts):
   - Nimiq RPC client: getTransactionByHash, check recipient, amount, confirmations
   - Polygon RPC client: same for USDT transactions
   - Explorer API fallback for both chains
   - Deduplication check against KV

7. Build receipt system:
   - JSON receipt: { txHash, product, creator, buyer, amount, currency, timestamp }
   - Creator signs receipt with wallet (via SDK sign())
   - Receipt is verifiable by anyone with the creator's public key

**Verify phase 3:** Complete purchase flow works end-to-end. Buyer can browse storefront, purchase with NIM, payment is verified on-chain, file downloads, receipt is generated. Quote refresh works. Error states display correctly.

---

### PHASE 4: Discovery + Social (Viral Mechanics)

**Goal:** Explore page, dynamic OG images, share kit, badges, storefront SEO.

**Steps:**
1. Build /explore page:
   - Grid of recently active storefronts (sorted by last sale or last product added)
   - Each card: creator avatar, name, bio excerpt, product count, accent color stripe
   - Search/filter by category
   - Pagination (load more)
   - Update explore index whenever a creator adds a product or receives a sale

2. Build dynamic OG images (/api/og/[handle] and /api/og/[handle]/[id]):
   - Use @vercel/og (Satori) for image generation
   - Storefront OG: creator name, bio, product count, accent color, "Powered by Atelier" footer
   - Product OG: preview image, product title, price, creator name
   - Set og:image meta tags on storefront and product pages
   - Twitter card meta tags

3. Build SVG badge (/api/badge/[handle]):
   - Live badge showing creator name + product count + "Powered by Atelier"
   - Returns SVG with correct content-type
   - Embeddable in GitHub READMEs: `![My Atelier](https://atelier.app/api/badge/handle)`

4. Build sitemap (/sitemap.ts):
   - Include all public storefronts
   - Update on profile creation/deletion

5. Build share kit enhancements:
   - Post-purchase share prompt for buyers ("Just got [product] from [creator] on Atelier!")
   - Pre-written posts with UTM tracking
   - Downloadable QR poster (styled, with creator branding)

**Verify phase 4:** OG images render correctly when shared on X/Telegram. Badge SVG loads. Explore page shows storefronts. Share links work.

---

### PHASE 5: Polish + Production (The Last 20%)

**Goal:** Error handling, loading states, mobile optimization, Nimiq Pay container testing, performance, README, demo.

**Steps:**
1. Error states for EVERY flow:
   - Wallet not connected: friendly message + connect CTA
   - Outside Nimiq Pay: explanation + deeplink to open in Nimiq Pay
   - Network error: retry button with exponential backoff
   - Payment mismatch: clear explanation of what went wrong
   - Quote expired: "Price updated" with new amount + refresh
   - RPC unavailable: "Verifying payment..." with automatic retry
   - File upload failed: retry with progress indicator
   - Handle taken: suggest alternatives
   - Rate limited: "Too many requests, please wait"

2. Loading states:
   - Skeleton screens for storefront, product grid, dashboard
   - Shimmer animation on skeleton blocks (subtle pulse)
   - Progress indicators for file uploads (percentage bar)
   - Spinner for payment verification (animated checkmark on success)

3. Mobile optimization:
   - Bottom-anchored CTA bar on product pages ("Buy for X NIM")
   - Thumb-zone aware: primary actions in bottom 40% of screen
   - Full-bleed images on mobile
   - Sheet-style modals (slide up from bottom)
   - Touch-friendly tap targets (minimum 44x44px)
   - Test in Nimiq Pay container viewport

4. Success celebrations:
   - Purchase success: confetti burst (canvas-confetti library) + receipt slide-up animation
   - First sale: special celebration animation on dashboard
   - Milestone badges: 10 sales, 50 sales, 100 sales

5. Wake Lock:
   - Request Wake Lock during pending payment verification (screen stays on while customer pays)

6. PWA setup:
   - manifest.json with Atelier branding
   - Service worker for offline fallback page
   - App icons in all required sizes

7. Performance:
   - Image optimization: next/image with Vercel Image Optimization
   - Lazy load below-fold sections
   - Preconnect to fonts.googleapis.com, api.coingecko.com
   - Bundle analysis: ensure < 200KB initial JS

8. Security:
   - All write operations require valid session (wallet signature)
   - Rate limiting on all API routes (per IP)
   - File upload: validate MIME type by magic bytes, reject executables
   - XSS prevention: sanitize all user input (display name, bio, product descriptions)
   - No private keys ever touch the server
   - No sensitive data in client-side storage

9. README.md:
   - Project description (250 words for submission)
   - Feature list
   - Tech stack
   - Local development instructions
   - Environment variables table
   - Architecture diagram (text-based)
   - Screenshots
   - License (MIT)

10. Demo preparation:
    - Seed 3-5 sample storefronts with real products
    - Record 60-second demo video showing: connect wallet -> create storefront -> upload product -> share link -> buyer purchases -> payment verified -> file delivered
    - Write submission description (250 words)

**Verify phase 5:** Complete app works in Nimiq Pay container on mobile. All error states display correctly. Loading skeletons work. Confetti fires on purchase. README is complete. Demo video recorded.

---

## QUALITY CHECKLIST (verify before submission)

- [ ] Landing page loads in < 2 seconds
- [ ] All 12 landing page sections render correctly on desktop and mobile
- [ ] Human artwork images are generated and placed correctly
- [ ] Scroll animations fire smoothly at 60fps
- [ ] Floating hero widgets animate independently
- [ ] Navigation frosted glass effect works on scroll
- [ ] Wallet connection works inside Nimiq Pay
- [ ] Graceful fallback when opened outside Nimiq Pay
- [ ] Creator can create storefront with handle, name, bio, avatar
- [ ] Creator can upload products with preview image and downloadable file
- [ ] Product prices display in USD + live NIM/USDT equivalent
- [ ] Quote countdown works (5 minutes) with auto-refresh
- [ ] NIM payment flow works end-to-end (SDK call -> on-chain verify -> file unlock)
- [ ] USDT payment flow works end-to-end
- [ ] Transaction hash deduplication prevents replay
- [ ] Purchase receipts generate with tx links
- [ ] Buyer can re-download purchased files
- [ ] Dashboard shows correct earnings, sales count, product stats
- [ ] CSV export generates correct data
- [ ] Share kit: QR code, social posts, badge all work
- [ ] Explore page shows active storefronts
- [ ] Dynamic OG images render (test by pasting URL in X/Telegram)
- [ ] All error states display user-friendly messages
- [ ] Skeleton loading states show during data fetches
- [ ] Mobile: bottom CTA bar, sheet modals, thumb-zone layout
- [ ] Confetti on successful purchase
- [ ] No console errors in production
- [ ] No TypeScript errors
- [ ] `npm run build` passes clean
- [ ] README is complete with setup instructions
- [ ] MIT LICENSE file exists
- [ ] .env.example lists all required variables (no secrets committed)

---

## ABSOLUTE RULES

1. **No Tailwind CSS.** Write custom CSS. Every class must be intentional.
2. **No SVG illustrations.** Only Gemini-generated photorealistic images and Lucide icons.
3. **No stock photos.** Generate all human imagery with Gemini using the prompts above.
4. **No placeholder content.** Every text string, every number, every label must be real and final.
5. **No "coming soon" features.** Everything listed above must be fully implemented and functional.
6. **No console.log in production.** Clean console.
7. **No any types in TypeScript.** Strict typing throughout.
8. **No default Next.js styling.** Zero Tailwind, zero CSS modules with generic names.
9. **Every page must work on mobile.** Test at 375px width minimum.
10. **Every API route must have rate limiting.** No unprotected write endpoints.

---

## APPENDIX A: NIMIQ MINI APP SDK REFERENCE

> Feed this entire appendix to Antigravity alongside the main instruction. It contains the exact method signatures and patterns needed to build Atelier correctly. Do not guess at SDK methods. Use exactly what is documented here.

### SDK Installation & Initialization

```bash
npm install @nimiq/mini-app-sdk
```

```typescript
import { init } from '@nimiq/mini-app-sdk'

// Initialize inside a useEffect or onMount. Timeout prevents hanging if opened outside Nimiq Pay.
const nimiq = await init({ timeout: 10_000 })
```

Always wrap init() in a try/catch. If the app is opened outside Nimiq Pay, init() will timeout and throw. Show a graceful fallback message in that case.

### Nimiq Provider Methods (the ones Atelier uses)

**listAccounts()** - Get the user's Nimiq wallet addresses
```typescript
const accounts = await nimiq.listAccounts()
// Returns: string[] (user-friendly Nimiq addresses like "NQ07 0000...")
// Triggers: user confirmation dialog in Nimiq Pay
// Errors: PermissionDeniedError if user rejects
```

**sign(message)** - Sign a message with the user's Nimiq key (used for authentication)
```typescript
const signed = await nimiq.sign('your-nonce-string-here')
// Returns: { publicKey: string, signature: string } (hex strings)
// Triggers: user confirmation dialog
// Errors: PermissionDeniedError if user rejects
```
For auth: generate a random nonce server-side, have the user sign it, then verify the signature server-side using @noble/curves Ed25519.

**sendBasicTransactionWithData(params)** - Send NIM payment with attached data (used for purchases)
```typescript
const txHash = await nimiq.sendBasicTransactionWithData({
  recipient: 'NQ07 0000 0000 0000 0000 0000 0000 0000 0000', // creator's Nimiq address
  value: 100000, // amount in Luna (1 NIM = 100,000 Luna)
  data: 'atelier:purchase:productId123', // receipt reference
  // fee and validityStartHeight are optional; Nimiq Pay auto-selects fee
})
// Returns: string (transaction hash)
// Triggers: user approval dialog showing recipient + amount
// Errors: PermissionDeniedError, InvalidTransactionError
```
IMPORTANT: value is in Luna, not NIM. Multiply NIM amount by 100,000 to get Luna.

**getBlockNumber()** - Get current blockchain height (used for transaction context)
```typescript
const height = await nimiq.getBlockNumber()
// Returns: number
// No user confirmation needed
```

**isConsensusEstablished()** - Check if wallet has network consensus
```typescript
const ready = await nimiq.isConsensusEstablished()
// Returns: boolean
// No user confirmation needed
```

### Ethereum/EVM Provider Methods (for USDT on Polygon)

The EVM provider is accessed via window.ethereum (standard EIP-1193).

**Connect and get accounts:**
```javascript
const accounts = await window.ethereum.request({
  method: 'eth_requestAccounts',
})
const userAddress = accounts[0]
// Same address works on all EVM chains (Polygon, Arbitrum, etc.)
```

**Switch to Polygon (required before USDT operations):**
```javascript
await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x89' }], // Polygon chain ID
})
```

**USDT contract address on Polygon:**
```
0xc2132D05D31c914a87C6611C10748AEb04B58e8F
```
USDT uses 6 decimals (not 18). 1 USDT = 1,000,000 raw units.

**Send USDT transfer (requires viem library):**
```typescript
import { encodeFunctionData, parseUnits } from 'viem'

const USDT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'

const data = encodeFunctionData({
  abi: [{
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  }],
  functionName: 'transfer',
  args: [
    recipientEvmAddress, // creator's EVM address
    parseUnits(usdtAmount, 6), // amount with 6 decimals
  ],
})

const txHash = await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: userAddress,
    to: USDT_ADDRESS, // contract address, NOT the recipient
    data,
    value: '0x0', // no native token, this is a contract call
  }],
})
```
IMPORTANT: The `to` field is the USDT contract address, NOT the recipient. The recipient is encoded in the `data` field. The `value` is 0x0 because you're calling a contract, not sending native tokens.

**Verify USDT transaction (read receipt):**
```javascript
const receipt = await window.ethereum.request({
  method: 'eth_getTransactionReceipt',
  params: [txHash],
})
// receipt is null if not yet mined, object if confirmed
```

**Read USDT balance:**
```typescript
import { encodeFunctionData, formatUnits } from 'viem'

const data = encodeFunctionData({
  abi: [{
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  }],
  functionName: 'balanceOf',
  args: [userAddress],
})

const rawBalance = await window.ethereum.request({
  method: 'eth_call',
  params: [{ to: USDT_ADDRESS, data }, 'latest'],
})

const balance = formatUnits(BigInt(rawBalance), 6)
```

### Gas Fee Warning for USDT
The user must hold POL (formerly MATIC) on Polygon to cover gas fees for USDT transfers. If they have no POL, the transaction will fail. Display a clear message about this in the checkout UI.

### Localization

Nimiq Pay injects the user's language:
```javascript
const language = window.nimiqPay?.language
  || navigator.language.split('-')[0]
  || 'en'
```
Supported languages: en, es, de, fr, pt. Outside Nimiq Pay, window.nimiqPay is undefined.

### Secure Context Warning

When testing locally via http://<ip>:5173, some Web APIs (like crypto.randomUUID()) won't work. Use crypto.getRandomValues() as a fallback for ID generation:
```typescript
function generateId(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}
```

### Testing in Nimiq Pay

1. Dev server must run with --host flag: `npm run dev -- --host`
2. Phone and dev machine on same Wi-Fi
3. Open Nimiq Pay -> Mini Apps -> enter network URL (e.g. http://192.168.1.42:5173)
4. For testnet: long-press settings button for 10 seconds to access dev menu, switch to Testnet, tap "Get free NIM" for 110,000 test NIM
5. Testnet only affects Nimiq operations. EVM operations still run against mainnet.

### Error Handling Pattern

```typescript
function getProviderErrorMessage(value: unknown): string | null {
  if (typeof value !== 'object' || value === null || !('error' in value))
    return null
  const maybeError = (value as { error?: { message?: unknown } }).error
  if (maybeError && typeof maybeError.message === 'string')
    return maybeError.message
  return 'Provider request failed.'
}

// Usage after any SDK call:
const result = await nimiq.listAccounts()
const error = getProviderErrorMessage(result)
if (error) throw new Error(error)
```

### Additional Dependencies for Atelier

```bash
npm install @nimiq/mini-app-sdk    # Nimiq Pay SDK
npm install @noble/curves          # Ed25519 signature verification (server-side auth)
npm install @noble/hashes          # SHA-256 for nonce generation
npm install viem                   # EVM ABI encoding for USDT transfers
npm install lucide-react           # Icons
npm install canvas-confetti        # Purchase celebration
npm install qrcode                 # QR code generation for checkout + share
```

### Install the AI Skill (optional but recommended)

Before building, install the official Nimiq AI skill for more accurate framework context:
```bash
npx skills add nimiq/developer-center --skill mini-apps
```
This gives Antigravity additional rules and patterns specific to the Mini Apps Framework.

