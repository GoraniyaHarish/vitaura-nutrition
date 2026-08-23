---
name: Vitality & Earth
colors:
  surface: '#fff8f3'
  surface-dim: '#e1d9cf'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2e8'
  surface-container: '#f6ece3'
  surface-container-high: '#f0e7dd'
  surface-container-highest: '#eae1d7'
  on-surface: '#1f1b15'
  on-surface-variant: '#42493e'
  inverse-surface: '#343029'
  inverse-on-surface: '#f8efe5'
  outline: '#72796e'
  outline-variant: '#c2c9bb'
  surface-tint: '#3b6934'
  primary: '#154212'
  on-primary: '#ffffff'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#a1d494'
  secondary: '#5f5e5a'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2dc'
  on-secondary-container: '#656460'
  tertiary: '#263f25'
  on-tertiary: '#ffffff'
  tertiary-container: '#3d563a'
  on-tertiary-container: '#adcaa6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#e5e2dc'
  secondary-fixed-dim: '#c9c6c1'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#cdebc5'
  tertiary-fixed-dim: '#b1cfab'
  on-tertiary-fixed: '#082009'
  on-tertiary-fixed-variant: '#344d31'
  background: '#fff8f3'
  on-background: '#1f1b15'
  surface-variant: '#eae1d7'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Merriweather
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Merriweather
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

The brand identity centers on the intersection of nature and modern wellness. It is designed to evoke a sense of "premium vitality"—a lifestyle that is as much about sophisticated living as it is about organic health. The UI targets health-conscious individuals who value quality, transparency, and holistic well-being.

The visual style is a blend of **Minimalism** and **Modern Editorial**. It leverages expansive white space to denote cleanliness and "room to breathe," while using rich, organic textures and photography to ground the digital experience in the physical world. The interface should feel like a premium lifestyle magazine: authoritative, serene, yet energetic.

## Colors

The palette is rooted in an "Earth-to-Table" philosophy.
- **Primary Green (#2D5A27):** Derived from the brand logo, representing growth and fresh vitality. Used for primary actions and brand emphasis.
- **Sophisticated Cream (#F9F6F0):** The primary background color. It is warmer and more premium than pure white, reducing eye strain and feeling more "organic."
- **Deep Forest (#1B331A):** Used for high-contrast text and grounding elements, providing a more refined alternative to black.
- **Soft Earth (#4A453E / #D4A373):** Secondary tones used for borders, secondary text, and subtle accents that mimic natural elements like soil, nuts, and grain.

## Typography

The typography strategy employs a "Functional Contrast" pairing:
- **Manrope (Sans-Serif):** Used for headlines, navigation, and UI labels. It conveys modern authority and technical reliability.
- **Merriweather (Serif):** Used for body copy and editorial segments. The serif structure aids long-form readability and adds a classical, trustworthy "health journal" feel.

**Hierarchy Guidance:**
- Use `display-lg` for hero sections with tight tracking.
- `label-md` should always be used for categories or small metadata, often paired with the Primary Green or Earth tones.
- Maintain generous line heights (1.5x - 1.6x) for body text to preserve the premium, airy aesthetic.

## Layout & Spacing

The design system utilizes a **Fixed-Fluid Hybrid Grid**. Content is centered within a 1280px container on desktop, while background elements and certain gallery sections may bleed to the edges to create a dynamic, modern feel.

**Rhythm:**
- A base-8 spacing scale ensures consistency.
- **Desktop:** 12-column grid with 24px gutters. Large vertical margins (stack-lg) are used between sections to emphasize the premium nature of the brand.
- **Mobile:** 4-column grid with 20px side margins.
- **Product Cards:** Should use `stack-sm` for internal padding to maintain a tight, clean look, but be separated from each other by `gutter` units.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Soft Ambient Shadows** rather than heavy borders.

- **Level 0 (Base):** Sophisticated Cream (#F9F6F0).
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF). Used for cards to make them "pop" against the cream background.
- **Shadows:** Use extremely diffused, low-opacity shadows with a hint of the primary green in the tint (e.g., `rgba(27, 51, 26, 0.04)`). This creates a "hovering" effect that feels light and energetic.
- **Outlines:** Use 1px borders in Earth (#4A453E) at 10% opacity for subtle definition on interactive elements like input fields.

## Shapes

The shape language is **Organic-Geometric**. 
- **Standard Corners:** 0.5rem (8px) is the default for buttons, cards, and input fields. This provides a friendly but professional appearance.
- **Large Components:** Containers and large image cards use `rounded-xl` (1.5rem) to echo the soft curves found in nature (fruit, leaves, bowls).
- **Icons:** Should be monolinear with slightly rounded caps to match the `manrope` typeface style.

## Components

### Buttons
- **Primary:** Solid Primary Green (#2D5A27) with White text. 8px border radius. Medium weight Manrope.
- **Secondary:** Transparent with a 1.5px Primary Green border.
- **Tertiary/Ghost:** Text-only with an underline on hover, using Deep Forest green.

### Product Cards
- Background: Pure White.
- Border: None, or 1px very light earth tone.
- Shadow: Level 1 soft ambient shadow.
- Content: Image should be top-aligned, followed by `headline-sm` title and `body-md` description.

### Input Fields
- Background: Pure White.
- Border: 1px Earth tone at 20% opacity.
- Focus State: Border color shifts to Primary Green with a 2px outer "glow" of the same color at 10% opacity.

### Chips & Tags
- Used for dietary preferences (e.g., "Vegan", "High Protein").
- Style: Pill-shaped, light Earth tone background (#F1EDE4) with `label-md` text in Deep Forest.

### Special Components
- **Nutrition Grid:** A stylized 2-column list for product details using `label-md` for keys and `body-md` for values, separated by light horizontal rules.
- **Ingredient Gallery:** Circular image avatars (fully rounded) with captions below to highlight natural raw ingredients.