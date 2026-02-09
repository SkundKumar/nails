# NailedIT — Architecture Deep Dive

A press-on nail art portfolio & ordering site built with **Next.js 16**, **GSAP**, **Framer Motion**, and **Tailwind CSS v4**.

---

## Ring 1 — The 30-Second Overview

```
User lands → Sees SVG curtain preloader with brand text
           → Hero section: brand title + interactive image gallery
           → Nail customizer (shape + length stepper)
           → Bento grid of designs that GSAP-Flip expands on scroll
           → Pinned scroll gallery showing 3 collections
           → Footer with Instagram DM link

User clicks a collection → Masonry gallery of that collection's designs
                         → Tap a design → Modal with "DM to Order" button
                                          (copies order message + nail prefs to clipboard,
                                           opens Instagram DM)
```

**That's the whole app.** A visual portfolio where customers browse designs, pick their nail shape/length, and message the artist on Instagram to order.

---

## Ring 2 — Project Layout & Routing

### File Structure (only your code, no third-party)

```
src/
├── app/                          ← Next.js App Router (file-based routing)
│   ├── layout.tsx                ← Root layout — fonts, preloader, global wrapper
│   ├── page.tsx                  ← Homepage
│   ├── globals.css               ← Tailwind v4 config + CSS variables (theme)
│   └── collection/
│       ├── signature/page.tsx    ← /collection/signature route
│       ├── classics/page.tsx     ← /collection/classics route
│       └── custom/page.tsx       ← /collection/custom route
│
├── components/
│   ├── Preloader.tsx             ← SVG curtain reveal + letter animation
│   ├── BrandTitle.tsx            ← "NailedIT" animated heading on hero
│   ├── NailCustomizer.tsx        ← Shape & length picker (stepper wizard)
│   ├── BentoGallery.tsx          ← Bento grid that GSAP-Flips to fullscreen
│   ├── PinnedScrollGallery.tsx   ← GSAP ScrollTrigger pinned section
│   ├── ScrollTextSection.tsx     ← Scroll-triggered text fade-in
│   ├── CollectionPageLayout.tsx  ← Shared layout for all 3 collection pages
│   ├── DesignModal.tsx           ← Framer Motion modal for ordering a design
│   ├── DesignerNavbar.tsx        ← Navbar (currently unused on homepage)
│   ├── Footer.tsx                ← Footer with Instagram link
│   └── ui/
│       ├── Masonry.tsx           ← Custom masonry grid (GSAP-animated)
│       └── Stepper.tsx           ← Multi-step wizard component
│
├── lib/
│   └── utils.ts                  ← cn() helper — merges Tailwind classes
│
public/nails/                     ← All nail design images
```

### How Routing Works

Next.js App Router uses the **folder = route** convention:

| File path                              | URL                     |
|----------------------------------------|-------------------------|
| `src/app/page.tsx`                     | `/`                     |
| `src/app/collection/signature/page.tsx`| `/collection/signature` |
| `src/app/collection/classics/page.tsx` | `/collection/classics`  |
| `src/app/collection/custom/page.tsx`   | `/collection/custom`    |

Every `page.tsx` is a **React Server Component** by default. Components that need interactivity (state, effects, browser APIs) are marked `"use client"` at the top.

### Layout Chain

```
layout.tsx (root)
  ├── Loads 4 Google Fonts as CSS variables
  ├── Renders <Preloader /> (fixed overlay, removes itself when done)
  └── Renders {children} (whatever page.tsx matches the URL)
```

---

## Ring 3 — How Each Section Works (Deep Dive)

### 3.1 — The Preloader (`Preloader.tsx`)

**What it does:** Full-screen loading animation. Shows the brand name letter-by-letter, then sweeps away with an organic SVG curtain.

**How it works under the hood:**

1. **SVG Curtain:** Two `<path>` elements fill the entire viewport (viewBox `0 0 100 100`). Each path is defined by 10 control points, all starting at `y=100` (fully covering the page).

2. **Letter Animation:** A GSAP timeline animates each letter of "NailedIT" from `y:60, opacity:0, rotateX:-90` to natural position with `stagger: 0.04` (40ms between each letter).

3. **Curtain Reveal:** After the letters animate in and pause briefly, each of the 10 points on each path is tweened from `100 → 0` with random delay offsets (`DELAY_POINTS_MAX = 0.3`). This creates an organic wave-like reveal.

4. **Coordination with Hero:** When done, it dispatches `window.dispatchEvent(new Event("preloader-done"))`. The `BrandTitle` component listens for this event to start its own entrance animation.

5. **Cleanup:** After the curtain finishes, `setVisible(false)` removes the preloader from the DOM entirely.

```
Timeline:
  0.0s ──── Letters fade in (stagger 0.04s each)
  0.8s ──── Hold
  1.3s ──── Letters animate out (y:-40, rotateX:90)
  1.7s ──── SVG paths animate points to 0 (wave reveal)
  2.5s ──── dispatch "preloader-done" → unmount
```

**Key GSAP pattern used here:** `gsap.timeline()` chains multiple animations in sequence. The `call()` method inserts a function call into the timeline to trigger the curtain phase.

---

### 3.2 — Brand Title (`BrandTitle.tsx`)

**What it does:** The "NailedIT" text that stays on the hero section after the preloader is gone.

**How it works:**

- Splits the text string into individual `<span>` elements using `.split("")` and maps over each character.
- Each span gets a ref stored in a `useRef` array (`lettersRef.current[i]`).
- On mount, sets all letters to `y:60, opacity:0, rotateX:-90` (hidden below, rotated back).
- Listens for the `"preloader-done"` custom event, then runs the entrance tween.
- Has a 3-second fallback timeout in case the preloader doesn't fire the event.
- Uses CSS `perspective: 600px` on the container for the 3D rotation effect.

**Why this pattern matters:** This is the **event-driven animation coordination** pattern. Instead of hardcoding delays, Component A fires an event when done, Component B listens and reacts. Much more maintainable.

---

### 3.3 — Nail Customizer (`NailCustomizer.tsx`)

**What it does:** A 3-step wizard where users pick nail shape and length before browsing collections.

**Architecture:**

```
NailCustomizer
  └── Stepper (ui/Stepper.tsx)
       ├── Step 1: Shape selection (grid of SVG nail outlines)
       ├── Step 2: Length selection (slider with finger illustration)
       └── Step 3: Confirmation ("You're All Set!")
```

**Deep dive on shape rendering:**

Each nail shape is defined as an **SVG path** in the `NAIL_SHAPES` array:

```ts
{
  id: "almond",
  path: "M25 85 Q25 10 50 2 Q75 10 75 85 Q50 90 25 85Z",
  //     └─ start    └─ curves to tip    └─ back down   └─ close
}
```

These are **quadratic Bézier curves** (`Q` command). The viewBox is `0 0 100 95`, so each path lives in that coordinate space. When selected, the path renders twice — once filled with `opacity: 0.2` for the tinted bg, once stroked for the outline.

**Persistence:**

- On every shape/size change, saves to `localStorage` under key `"nailPreferences"`.
- On mount, reads from `localStorage` to restore selections.
- Uses `hydrated` state flag to avoid hydration mismatch (SSR renders `null`, client renders the real UI).
- Exports `getNailPreferences()` so other components (like `DesignModal`) can read the saved preferences without prop drilling.

**The finger illustration (Step 2):**

A hand-crafted SVG of a finger with a nail overlay. The nail's `x`, `width` attributes change based on the selected size (`Short`/`Medium`/`Long`). The entire finger is flipped horizontally via `scaleX(-1)` so the nail appears on the correct side.

---

### 3.4 — Bento Gallery (`BentoGallery.tsx`)

**What it does:** A CSS Grid gallery that scroll-animates into a fully expanded layout using GSAP Flip.

**How the GSAP Flip technique works:**

1. **Initial state:** Gallery renders as a compact bento grid (3 columns × 4 rows) using CSS Grid with specific `grid-area` assignments for each item (creating the asymmetric bento layout).

2. **Capture final state:** In `useEffect`, the code temporarily adds the CSS class `bento-final` (which changes the grid to `3 × 100vw` columns), captures each element's position with `Flip.getState(items)`, then removes the class.

3. **Create scroll-driven Flip:** `Flip.to(flipState)` generates the tween that transitions each item from its initial grid position to its final expanded position. This tween is added to a `ScrollTrigger`-pinned timeline.

4. **Result:** As the user scrolls, the compact bento grid smoothly expands into a fullscreen grid. The pin keeps it centered while the animation plays.

```
User scrolls:
  0% ──── Compact bento grid (3 cols, ~30vw each)
  50% ─── Mid-transition (cards expanding)
  100% ── Full expansion (3 cols × 100vw each)
```

**Why `Flip` instead of manual tweens:** GSAP Flip calculates the position/size delta between two CSS states automatically. You don't manually compute x/y/width/height — just define two CSS layouts and Flip handles the interpolation.

**The CSS Grid placements (`grid-area`):**

```css
.bento-item:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }  /* Spans 2 rows */
.bento-item:nth-child(3) { grid-area: 2 / 2 / 4 / 3; }  /* Spans 2 rows */
```

`grid-area: row-start / col-start / row-end / col-end` — this creates the intentionally uneven bento look.

**Styled JSX:** This component uses Next.js `<style jsx>` instead of Tailwind for the grid definitions because the grid-area placements and media queries are complex and more readable as plain CSS.

---

### 3.5 — Pinned Scroll Gallery (`PinnedScrollGallery.tsx`)

**What it does:** Shows 3 collection cards (Signature, Classics, Made For You) that highlight one at a time as you scroll, with an image sliding in on the right — all while the section stays pinned on screen.

**ScrollTrigger Pin explained:**

```ts
scrollTrigger: {
  trigger: pinSectionRef.current,
  start: "top top",       // Pin starts when section's top hits viewport top
  end: "+=" + n * 50 + "%", // Pin lasts for 150% of viewport height
  pin: true,               // Section stays fixed during scroll
  scrub: true,             // Animation progress tied to scroll position
}
```

`pin: true` means the section doesn't scroll away — it stays in place while the scroll position controls the timeline. `scrub: true` means the timeline progress maps 1:1 to scroll position (not time-based).

**The sequential highlight logic:**

```ts
listItems.forEach((item, i) => {
  tl.set(item, { color: "#d4707a" }, 0.5 * i)         // Highlight current
    .to(slides[i], { autoAlpha: 1 }, 0.5 * i)          // Show current image
    .set(previousItem, { color: "#9a8a8a" }, 0.5 * i)  // Dim previous
    .to(slides[i-1], { autoAlpha: 0 }, 0.5 * i)        // Hide previous image
```

Each item gets 0.5 "units" in the timeline. At position `0`, item 1 is active. At `0.5`, item 2 is active. At `1.0`, item 3 is active.

**Navigation cleanup pattern:**

```ts
const handleNavigate = useCallback((href: string) => {
  if (ctxRef.current) {
    ctxRef.current.revert();    // ← Clean up GSAP context
    ctxRef.current = null;
  }
  ScrollTrigger.getAll().forEach((st) => st.kill());  // ← Kill all ScrollTriggers
  router.push(href);
}, [router]);
```

This prevents a common GSAP + SPA bug: pinned elements create DOM clones. If you navigate away without cleaning up, React tries to `removeChild` on an element that GSAP moved, causing an error. **Always revert GSAP contexts before client-side navigation.**

---

### 3.6 — Collection Pages & the Shared Layout

**The DRY pattern:** All three collection pages (`/collection/signature`, `/classics`, `/custom`) use the exact same layout component. Each page file just provides data:

```tsx
// signature/page.tsx
export default function SignatureCollection() {
  return (
    <CollectionPageLayout
      title="The Signature Collection"
      subtitle="handcrafted 2d art on every nail"
      price="₹98"
      items={signatureItems}    // ← Array of { id, img, name, height }
    />
  );
}
```

**`CollectionPageLayout.tsx` provides:**
- Back navigation link to `/`
- Styled header (title, subtitle, price)
- The `Masonry` grid component
- The `DesignModal` (managed via `selectedItem` state)

---

### 3.7 — Masonry Grid (`ui/Masonry.tsx`)

**What it does:** A responsive, auto-arranged masonry gallery with GSAP entrance animations, hover effects, and smart image sizing.

**How column count is determined:**

```ts
const columns = useMedia(
  ["(min-width:1200px)", "(min-width:800px)", "(min-width:500px)"],
  [4, 3, 2],
  2  // default
);
```

Custom `useMedia` hook checks CSS media queries. Maps breakpoints to column counts.

**How layout is calculated:**

```ts
const grid = useMemo(() => {
  const colHeights = new Array(columns).fill(0);  // Track height of each column
  return items.map((child) => {
    const col = colHeights.indexOf(Math.min(...colHeights));  // Shortest column
    const x = col * (columnWidth + gap);
    const height = columnWidth / aspectRatio;   // From preloaded image dimensions
    const y = colHeights[col];
    colHeights[col] += height + gap;            // Update column height
    return { ...child, x, y, w: columnWidth, h: height };
  });
}, [columns, items, width, imageDims]);
```

This is the **shortest-column-first** algorithm: for each image, find which column is shortest, place the image there, update that column's height. This produces the characteristic masonry look.

**Image dimension preloading:**

Before computing layout, images are preloaded to get their natural aspect ratios:

```ts
const img = new Image();
img.src = url;
img.onload = () => dims.set(src, { naturalWidth, naturalHeight });
```

This means each card's height is proportional to its actual image — no fixed heights needed.

**Entrance animation:**

On first mount, items animate in from a direction (bottom by default) with blur:

```ts
gsap.fromTo(selector,
  { opacity: 0, y: window.innerHeight + 200, filter: "blur(10px)" },
  { opacity: 1, y: item.y, filter: "blur(0px)", delay: index * stagger }
);
```

On subsequent renders (e.g., window resize), items smoothly tween to their new positions without the entrance animation (tracked via `hasMounted` ref).

---

### 3.8 — Design Modal (`DesignModal.tsx`)

**What it does:** When a user taps a design in any collection, a modal pops up with the image, design name, and a "DM to Order" button.

**The ordering flow:**

```ts
const handleDmToOrder = () => {
  const prefs = getNailPreferences();  // Read from localStorage
  navigator.clipboard.writeText(
    `Hi! I'd love to order the "${item.name}" design ✨\nShape: ${prefs.shape} | Length: ${prefs.size}`
  );
  window.open(`https://ig.me/m/${instagramUsername}`, "_blank");
};
```

1. Reads the nail preferences the user selected earlier (from `localStorage`).
2. Constructs a pre-written DM message with the design name + shape + length.
3. Copies it to clipboard.
4. Opens Instagram DM in a new tab.
5. User just pastes the message and sends.

**No backend needed.** The entire ordering flow is clipboard + Instagram redirect.

**Animation:** Uses Framer Motion's `AnimatePresence` for mount/unmount transitions. The overlay fades in, the card springs in with `damping: 25, stiffness: 300`.

---

## Ring 4 — Architecture Patterns & Decisions

### Why "use client" on almost everything?

GSAP and Framer Motion require browser APIs (`window`, `document`, `ResizeObserver`, `matchMedia`). These can't run on the server. However, the collection **page files** (`signature/page.tsx` etc.) are Server Components — they just pass data to the client `CollectionPageLayout`.

### Font Strategy

```tsx
// layout.tsx
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", ... });
const dancingScript = Dancing_Script({ variable: "--font-dancing", ... });
```

Next.js `next/font/google` downloads fonts at build time and serves them as self-hosted files (no Google Fonts network request at runtime). Each font is assigned a CSS variable, then mapped in `globals.css`:

```css
--font-serif: var(--font-cormorant);
--font-script: var(--font-dancing);
```

Components use `style={{ fontFamily: "var(--font-dancing)" }}` to reference them.

### GSAP Context Pattern

Every GSAP-using component follows this cleanup pattern:

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP animations here
  });
  return () => ctx.revert();   // Cleanup on unmount
}, []);
```

`gsap.context()` scopes all animations and `ctx.revert()` kills them + reverts DOM changes. This prevents memory leaks and stale animations in React's strict mode (which double-mounts in dev).

### State Flow Diagram

```
                    ┌──────────────┐
                    │  localStorage │
                    │  (nailPrefs)  │
                    └──────┬───────┘
                           │ read/write
              ┌────────────┴────────────┐
              │                         │
     ┌────────▼────────┐      ┌────────▼────────┐
     │ NailCustomizer   │      │ DesignModal      │
     │ (writes prefs)   │      │ (reads prefs     │
     │                  │      │  via exported fn) │
     └─────────────────┘      └─────────────────┘
```

No global state library. `localStorage` acts as the shared store. `getNailPreferences()` is an exported plain function — any component can import and call it.

### Image Strategy

- All images in `public/nails/` — served statically by Next.js.
- `next.config.ts` allows `images.unsplash.com` as a remote pattern for future use.
- Masonry component preloads images with `new Image()` to get natural dimensions before computing layout.

### CSS Architecture

- **Tailwind CSS v4** with the new `@import "tailwindcss"` syntax (no `tailwind.config.js` needed).
- **CSS Variables** for the design system (colors, radii) defined in `:root` in `globals.css`.
- **Shadcn/ui** is configured (via `components.json`) but the project mostly uses custom components.
- **Styled JSX** used in `BentoGallery` for complex CSS Grid layouts that would be awkward in Tailwind.

---

## Ring 5 — Running & Building

```bash
npm run dev     # Start dev server (http://localhost:3000)
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # Run ESLint
```

### Key Dependencies (only the ones you actively use)

| Package          | What it does in this project                           |
|------------------|--------------------------------------------------------|
| `next 16`        | Framework — routing, SSR, font loading, image optimization |
| `gsap`           | All scroll-driven animations, Flip, ScrollTrigger      |
| `framer-motion`  | Modal animations, navbar mobile menu transitions       |
| `lenis`          | Smooth scroll library (imported but used minimally)    |
| `tailwindcss v4` | Utility-first styling                                  |

### Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

```tsx
import Masonry from "@/components/ui/Masonry";   // → src/components/ui/Masonry.tsx
import { cn } from "@/lib/utils";                // → src/lib/utils.ts
```
