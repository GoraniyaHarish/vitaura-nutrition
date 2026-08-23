# GronLiv — Design Analysis
> Derived from Stitch Reference: `d:\GROLIV\stitch_gronliv_premium_nutrition_platform\`
> Design system: **"Vitality & Earth"**

---

## 1. Page Inventory

| Page | Desktop Design | Mobile Design | Notes |
|------|---------------|---------------|-------|
| Home | ✅ `home_desktop/` | ✅ `home_mobile/` | Full sections |
| Menu | ✅ `menu_desktop/` | ✅ `menu_mobile/` | Product grid + filters |
| About | ✅ `about_desktop/` | — | Bento ingredient grid |
| Delivery | ✅ `delivery_desktop/` | — | Pincode checker |
| Contact | ✅ `contact_desktop/` | — | Bento layout |
| Product Detail | — | — | Not designed in Stitch — needs full design |
| Cart / Checkout | — | — | Not designed in Stitch — needs full design |

---

## 2. Color Palette

### Primary Surface Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `surface` / `background` | `#fff8f3` | Page background (warm cream) |
| `surface-container-lowest` | `#ffffff` | Cards, modals (pure white) |
| `surface-container-low` | `#fbf2e8` | Subtle tinted sections |
| `surface-container` | `#f6ece3` | Section backgrounds |
| `surface-container-high` | `#f0e7dd` | More visible containers |
| `surface-container-highest` / `surface-variant` | `#eae1d7` | Hero overlays, highest |
| `surface-dim` | `#e1d9cf` | Dark mode / dimmed |

### Brand Green
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#154212` | Deep forest green — text on light, active states |
| `primary-container` | `#2d5a27` | Primary buttons bg, strong accents |
| `on-primary` | `#ffffff` | Text on primary button |
| `inverse-primary` | `#a1d494` | Light green — dark mode, accents |
| `primary-fixed` | `#bcf0ae` | Very light green |
| `primary-fixed-dim` | `#a1d494` | Lighter green |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `on-surface` | `#1f1b15` | Primary text (near black, warm) |
| `on-surface-variant` | `#42493e` | Secondary text (muted) |
| `on-background` | `#1f1b15` | Body text |
| `secondary` | `#5f5e5a` | Subdued UI labels |

### Borders & Outline
| Token | Hex | Usage |
|-------|-----|-------|
| `outline` | `#72796e` | Strong borders |
| `outline-variant` | `#c2c9bb` | Subtle borders (most cards) |

### Tertiary (Forest Green, slightly warmer)
| Token | Hex | Usage |
|-------|-----|-------|
| `tertiary` | `#263f25` | Alternative green |
| `tertiary-container` | `#3d563a` | Ingredient tag bg |
| `on-tertiary` | `#ffffff` | Text on dark green |

### Error
| Token | Hex | Usage |
|-------|-----|-------|
| `error` | `#ba1a1a` | Error states |
| `on-error` | `#ffffff` | Text on error |

---

## 3. Typography

### Font Families
- **Manrope** (sans-serif) — Headlines, navigation, buttons, labels, captions
- **Merriweather** (serif) — Body text, editorial copy, product descriptions

### Type Scale
| Token | Family | Size | Weight | Line-Height | Letter-Spacing |
|-------|--------|------|--------|-------------|----------------|
| `display-lg` | Manrope | 48px | 700 | 56px | -0.02em |
| `display-lg-mobile` | Manrope | 32px | 700 | 40px | -0.01em |
| `headline-md` | Manrope | 32px | 600 | 40px | — |
| `headline-sm` | Manrope | 24px | 600 | 32px | — |
| `body-lg` | Merriweather | 18px | 400 | 30px | — |
| `body-md` | Merriweather | 16px | 400 | 26px | — |
| `label-md` | Manrope | 14px | 600 | 20px | 0.05em |
| `caption` | Manrope | 12px | 400 | 16px | — |

### Typography Rules
- Use `display-lg` for hero sections — tight tracking makes it editorial
- `label-md` for ALL buttons, tags, navigation items — tracked out for premium feel
- `body-md` for product descriptions, form labels, general copy
- Mix Manrope headers with Merriweather body for editorial contrast
- Never use system fonts for brand text

---

## 4. Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `base` | 8px | Smallest unit |
| `stack-sm` | 16px | Internal card padding |
| `gutter` | 24px | Column gaps |
| `stack-md` | 32px | Section sub-spacing |
| `margin-mobile` | 20px | Mobile horizontal margins |
| `margin-desktop` | 64px | Desktop horizontal margins |
| `stack-lg` | 64px | Between major sections |
| `container-max` | 1280px | Max content width |

---

## 5. Elevation & Shadow

**Principle:** Tonal layering + ambient green-tinted shadows. NO heavy drop shadows.

```
Level 0: #fff8f3 (warm cream base)
Level 1: #ffffff (cards — pop against cream)
Level 2: surface-container-low (#fbf2e8)
Level 3: surface-container-high (#f0e7dd)
```

**Shadow Values:**
- Default: `0 4px 12px rgba(27,51,26,0.04)` — extremely light, green-tinted
- Hover: `0 8px 24px rgba(27,51,26,0.08)` — slightly more visible

---

## 6. Border Radius

| Name | Value | Usage |
|------|-------|-------|
| DEFAULT | 4px (0.25rem) | Small elements |
| `rounded-lg` | 8px (0.5rem) | Buttons, inputs, default |
| `rounded-xl` | 12px (0.75rem) | Cards |
| `rounded-2xl` | ~20px | Large image containers |
| `rounded-3xl` | ~24px | Feature containers |
| `rounded-full` | 9999px | Tags, pills, avatars, icons |

---

## 7. Component Inventory

### Announcement Bar
- Background: `primary` (#154212)
- Text: `on-primary` (#ffffff)
- Content: "Freshly Made in Rajkot"
- Position: Top of page, above nav

### Desktop Navigation
- Position: Sticky top, `z-50`
- Background: `surface/80` + `backdrop-blur-md`
- Border-bottom: `outline-variant/10`
- Structure: [Logo] [Nav Links] [Cart Icon + Person Icon + "Order Now" CTA]
- Active link: `text-primary font-bold border-b-2 border-primary`
- Hover: `text-primary hover:bg-primary-container/10`
- CTA Button: `bg-primary-container text-on-primary rounded-lg px-4 py-2`

### Mobile Navigation
- **Top bar:** `surface/90 backdrop-blur-md`, sticky, `z-40`
  - Left: GronLiv wordmark
  - Right: Cart icon
- **Bottom nav:** Fixed, `z-50`, `surface`, shadow top
  - Items: Home | Menu | Orders | Account
  - Active: `text-primary bg-primary-container/20 rounded-xl`
  - Inactive: `text-secondary`
  - Icons: Material Symbols Outlined (filled when active)

### Hero Section
- Full viewport height (`h-[80vh]` to `h-[90vh]`)
- Full-bleed lifestyle photography
- Gradient overlay: `from-background via-background/40 to-transparent`
- Centered text on desktop, bottom-anchored on mobile
- H1: `display-lg` green text on warm background
- Subtext: semi-transparent surface card `bg-surface/80 backdrop-blur-sm`
- CTAs: Primary + Secondary side-by-side

### USP Strip
- Background: `surface-container-lowest`
- Border: top/bottom `outline-variant/20`
- Layout: 4 icon+label items with vertical dividers (desktop), wrapped (mobile)
- Icons: Material Symbols, `text-primary`, `text-4xl`
- Labels: `label-md`

### Product Card
- Background: `surface-container-lowest` (white)
- Border-radius: `rounded-xl`
- Shadow: `0 4px 12px rgba(27,51,26,0.04)`
- Hover shadow: `0 8px 24px rgba(27,51,26,0.08)`
- Image: `h-64`, `rounded-lg`, hover scale: `group-hover:scale-105`
- Badge (top-right): `surface-container-lowest/90 backdrop-blur-sm`, `rounded-full`, `caption`
- Title: `headline-sm text-on-surface`
- Description: `body-md text-on-surface-variant`
- Price: `label-md text-primary-container`
- Tags: `bg-[#F1EDE4] text-[#3d563a] rounded-full px-3 py-1 label-md/caption`
- Add to Cart: full-width, `bg-primary text-on-primary rounded-lg py-3`

### Primary Button
- Background: `bg-primary` or `bg-primary-container`
- Text: `text-on-primary` (white)
- Padding: `px-6 py-3` or `px-8 py-4`
- Border-radius: `rounded-lg`
- Font: `label-md` (Manrope, 14px, 600, tracked)
- Hover: opacity-90 or transition to darker green

### Secondary Button
- Border: `border border-primary`
- Text: `text-primary`
- Background: transparent or `bg-surface/90`
- Hover: `hover:bg-primary/5`

### Input Field
- Background: `surface-container-lowest` (white)
- Border: `border border-outline-variant/20`
- Rounded: `rounded-lg` or `rounded`
- Focus: `focus:border-primary focus:ring-2 focus:ring-primary/10`
- Font: `body-md text-on-surface`
- Placeholder: `text-secondary`

### Dietary Tags / Chips
- Background: `#F1EDE4` (warm beige)
- Text: `#3d563a` (dark green)
- Shape: `rounded-full px-3 py-1`
- Font: `label-md` or `caption`
- Examples: Vegan, High Protein, Antioxidant, Detox, Low Calorie, High Fiber

### Bento Grid
- Used on About page ingredient gallery
- Grid: `grid-cols-4 grid-rows-2` desktop, `grid-cols-1` mobile
- Large featured item: `col-span-2 row-span-2`
- All items: `rounded-2xl overflow-hidden` with hover `scale-105`
- Gradient overlay: `from-black/60 to-transparent`
- Text: `on-tertiary` (white) with semi-transparent descriptions

### Footer
- Background: `surface-container-lowest`
- Border-top: `outline-variant/20`
- Layout: Logo + tagline + copyright | Nav links
- Text: `secondary-fixed-variant` for links, `text-primary` for logo

---

## 8. Navigation Structure (Production — Differs from Stitch)

```
Desktop Nav Links:
Our Menu → /menu
About → /about  
Delivery → /delivery
Contact → /contact

Mobile Bottom Nav:
Home → /
Menu → /menu
Orders → /cart (or /orders)
Account → /account (future)
```

> **UX Note:** Stitch uses "Ingredients" and "Nutrition" as nav items — these are NOT separate pages but sections. Production nav maps to real routes.

---

## 9. Page-by-Page Layout Notes

### Home Page Sections (in order)
1. Announcement bar — "Freshly Made in Rajkot"
2. Desktop Nav (sticky)
3. Hero — full-viewport, lifestyle photo, headline, subtext, 2 CTAs
4. USP Strip — 4 pillars (Fresh / No Preservatives / Smooth / Premium)
5. Why GronLiv — 2-col: text+checklist + ingredient photo
6. Featured Blends — 3 product cards
7. How It Works — 3-step process
8. Ingredient Gallery — bento grid
9. Rajkot Delivery — pincode checker
10. Social Proof — placeholder section
11. Final CTA — dark section
12. Footer
13. Mobile Bottom Nav (fixed)

### Menu Page
- Page hero: headline + subtext
- Category filter pills (horizontal scroll on mobile)
- Product grid: 3-col desktop, 1-col mobile
- Loading, empty, error states

### Product Detail Page (not in Stitch — design from system)
- Large product image (left) + info (right)
- Name, price, description
- Nutrition grid
- Ingredient circles
- Quantity + Add to Cart
- Pincode delivery checker
- Related products (3 cards)

### About Page
- Full-viewport hero with editorial copy
- 2-col: mission text + brand photo (NOT founder portrait)
- Ingredient bento grid "Nothing to Hide."
- Values section

### Delivery Page
- Headline: "FRESHLY MADE IN RAJKOT."
- Pincode checker (connected to backend)
- Delivery zones (from backend)
- Operating hours
- Pickup info

### Contact Page
- 12-col bento: Form (7) + WhatsApp CTA + Location card (5)
- Instagram grid section

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| Mobile | 375px–767px | Bottom nav, stacked layout |
| Tablet | 768px–1023px | md: breakpoint triggers |
| Desktop | 1024px+ | Full nav, multi-column |
| Max container | 1280px | Content centered |

---

## 11. Animation Rules

- **Only** `transform` and `opacity` for animations (no layout shift)
- Product card images: `group-hover:scale-105 transition-transform duration-500`
- Hover shadows: `transition-shadow duration-300`
- Button hover: `transition-colors duration-200` or `transition-opacity`
- Page transitions: Subtle fade (Framer Motion `AnimatePresence`)
- Respect `prefers-reduced-motion` — no motion for users who request it
- **NO**: Layout animations, width/height transitions, color shifts on scroll

---

## 12. Real Assets Available

| Asset | Location | Usage |
|-------|----------|-------|
| Logo "G" | `logo_g.jpg/` | Brand logo (circular) |
| Home Desktop Screenshot | `home_desktop/screen.png` | Visual reference |
| Home Mobile Screenshot | `home_mobile/screen.png` | Mobile visual reference |
| Menu Desktop Screenshot | `menu_desktop/screen.png` | Menu reference |
| Menu Mobile Screenshot | `menu_mobile/screen.png` | Mobile menu reference |
| About Desktop Screenshot | `about_desktop/screen.png` | About reference |
| Contact Desktop Screenshot | `contact_desktop/screen.png` | Contact reference |
| Delivery Desktop Screenshot | `delivery_desktop/screen.png` | Delivery reference |

---

## 13. Identified UX/Design Problems (Will Improve)

| # | Problem in Stitch | Improvement |
|---|-------------------|-------------|
| 1 | USD prices ($12.99) | Use INR (₹) throughout |
| 2 | Invented founder portrait ("Aarav Mehta") | Use ingredient/brand photography instead |
| 3 | "Unveiling Soon" / "Notify Me" CTAs on hero | Replace with real "Explore Menu" CTAs for launched brand |
| 4 | "Feed" in mobile bottom nav (unclear) | Replace with "Home" |
| 5 | Nav links point to sections (Ingredients, Nutrition) not pages | Align to real route structure |
| 6 | No cart/checkout designed | Build from design system principles |
| 7 | No error/loading/empty states | Build full state coverage |
| 8 | Contact email `hello@gronliv.com` hardcoded | Use environment variable |
| 9 | "© 2024" in footer | Use dynamic year |
| 10 | Delivery form has fake `alert()` | Connect to real backend API |

---

## 14. Performance Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Large hero images | High | `next/image` with WebP, responsive sizes |
| Google Fonts network request | Medium | `next/font` self-hosted |
| Material Symbols icon font | Medium | Load only needed subset or use SVGs |
| External Stitch image URLs | Critical | Replace with `/public/images/` locally |
| Product images (large JPEGs) | High | Optimize, serve WebP |

---

## 15. Accessibility Audit (Stitch Reference)

| Issue | Location | Fix |
|-------|----------|-----|
| No `alt` on most `<img>` elements (only `data-alt`) | All pages | Use real `alt` attributes in Next.js |
| Form inputs have no associated labels in some places | Contact | Use `<label htmlFor>` properly |
| Color contrast: `secondary` (#5f5e5a) on white | Buttons, labels | Check — may fail WCAG AA |
| No visible focus rings in Stitch | All interactive | Add `focus-visible:` ring in Tailwind |
| Icon-only buttons (cart, person) have no aria-label | Nav | Add `aria-label="Shopping Cart"` etc. |

---

*Document created by: GronLiv UI/UX Design Agent*  
*Based on: Stitch reference analysis + Vitality & Earth design system*
