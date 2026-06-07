# ZONKED Design System

The single source of truth for the visual language of zonked.vercel.app. Every new section, component, or feature **must** follow this document. If you find yourself wanting to deviate, update this doc first.

---

## 1. Brand

- **Name**: ZONKED
- **Voice**: Punchy, informal, opinionated, conversational. Like a friend who's obsessed with celebrity gossip, not a corporate news outlet.
- **Visual identity**: Dark editorial / indie news magazine. The site feels like a printed tabloid that learned CSS — bold typography, color-coded sections, hard edges, no rounded fluff.
- **Logo**: The word "ZONKED" rendered in heavy black weight with a vertical gradient (lighter at top, darker at bottom). Purple in light mode, yellow in dark mode. Implemented via the `.zonked-logo` class with `background-clip: text`.

---

## 2. Color System

### 2.1 Category Colors (7 — fixed, do not change)

| Category | Hex | Tailwind-friendly name | Used for |
|---|---|---|---|
| Film | `#E01A4F` | red-rose | Section bars, badges, reading progress, nav hover |
| TV | `#F9C22E` | yellow | Same |
| Celebs | `#1aafc9` | cyan | Same |
| Fashion | `#14b57a` | emerald | Same |
| Lifestyle | `#ad6e47` | brown | Same |
| Dating | `#F15946` | orange | Same |
| Internet | `#8B5CF6` | purple | Same |

**Rule**: Every category-tagged element MUST use the exact hex from this table. Never invent a new shade.

### 2.2 Theme Tokens (CSS variables)

All themeable values are CSS variables defined in `src/app/globals.css`. **Never hardcode theme-dependent colors** — always use the variable.

#### Light mode (`:root`)

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#ffffff` | Page background |
| `--bg-secondary` | `#ffffff` | Alternate sections (Trending etc.) |
| `--bg-card` | `#d4d5d6` | Card surface (light grey, not white) |
| `--bg-card-solid` | `#ffffff` | Reserved (currently unused, do not adopt) |
| `--bg-section` | `#d4d5d6` | Section backgrounds, card bottoms |
| `--bg-header-start` | `#eaeaea` | Header gradient top (lighter) |
| `--bg-header-end` | `#d4d5d6` | Header gradient bottom (matches cards) |
| `--bg-footer-start` | `#d4d5d6` | Footer gradient top |
| `--bg-footer-end` | `#eaeaea` | Footer gradient bottom (mirrored) |
| `--border-color` | `#e0e0e0` | Card borders |
| `--border-color-light` | `#f0f0f0` | Subtle dividers |
| `--text-primary` | `#1a1a2e` | Main text, headings |
| `--text-secondary` | `#333333` | Body copy in articles |
| `--text-muted` | `#666666` | Timestamps, captions |
| `--text-header` | `#1a1a2e` | Header text |
| `--text-footer` | `#333333` | Footer text |
| `--shadow-card` | `rgba(0,0,0,0.08)` | Card drop shadow |
| `--shadow-hover` | `rgba(0,0,0,0.12)` | Card hover shadow |
| `--skeleton-1` / `--skeleton-2` | `#e8e8e8` / `#f0f0f0` | Loading placeholders |
| `--logo-gradient` | purple→deep purple | ZONKED wordmark |
| `--nav-item-color` | `#1a1a2e` | Nav link default color |

#### Dark mode (`[data-theme="dark"]`)

| Token | Value | Notes |
|---|---|---|
| `--bg-primary` | `#080808` | Near-black |
| `--bg-secondary` | `#2a2a2a` | Dark grey alternate |
| `--bg-card` | `linear-gradient(135deg, #2a2a2a 0%, #222222 100%)` | Subtle gradient on cards |
| `--bg-card-solid` | `#151515` | Flat card variant |
| `--bg-section` | `#151515` | Section/card bg |
| `--bg-header-start` | `#151515` | Header gradient top |
| `--bg-header-end` | `#0a0a0a` | Header gradient bottom (darker) |
| `--bg-footer-start` | `#0a0a0a` | Footer gradient top (mirrored) |
| `--bg-footer-end` | `#151515` | Footer gradient bottom |
| `--border-color` | `#2a2a2a` | Card borders |
| `--text-primary` | `#e0e0e0` | Light text |
| `--text-secondary` | `#b0b0b0` | Body copy |
| `--text-muted` | `#808080` | Timestamps |
| `--text-header` | `#ffffff` | Header text white |
| `--text-footer` | `#e0e0e0` | Footer text |
| `--shadow-card` | `rgba(0,0,0,0.4)` | Stronger shadow |
| `--shadow-hover` | `rgba(0,0,0,0.6)` | Stronger hover |
| `--logo-gradient` | yellow→deep yellow | ZONKED wordmark |
| `--nav-item-color` | `#ffffff` | Nav default |

**Body has a subtle vignette gradient** in both modes (left/right edges slightly darker than center). This is set on `body` in `globals.css`.

---

## 3. Typography

- **Font**: Inter, weights 300/400/500/600/700/800/900. Loaded via `@fontsource/inter/*` in `globals.css`.
- **Tracking**: `letter-spacing: -0.01em` on body, `letter-spacing: -0.02em` on large headings, `letter-spacing: -0.04em` on the ZONKED logo.
- **Headings**: Use Tailwind `font-black` (900) for hero titles, `font-extrabold` (800) for section titles, `font-bold` (700) for card titles, `font-semibold` (600) for body emphasis.
- **Section titles**: Always uppercase + `tracking-wide` (Tailwind). Example: `text-2xl sm:text-3xl font-black uppercase tracking-wide`.
- **Card titles**: Title-case or sentence-case is fine. Never uppercase on card titles (only on section titles).
- **Time stamps**: `text-xs` or `text-xs sm:text-sm` in `--text-muted` color.

---

## 4. Spacing & Layout

- **Container**: `mx-auto max-w-[1200px] px-3 sm:px-4` is the standard page container. (Mobile: 12px padding auto-applied via global rule at `max-width: 640px`.)
- **Section spacing**: Sections use `mb-6 sm:mb-8` (24-32px) vertical gap.
- **Card grid gap**: `gap-3 sm:gap-5` for article grids.
- **Header height**: 64px desktop (`h-16`), 56px mobile (`h-14`).
- **Mobile main padding-top**: `pt-14` (56px) to clear mobile header. Desktop: `pt-16` (64px).
- **Mobile bottom safe area**: 48px footer. Content should not rely on `pb-` larger than 12px on mobile.

---

## 5. Components (Reusable)

| Component | Path | Use |
|---|---|---|
| `ArticleCard` | `src/components/articles/ArticleCard.tsx` | Web post card. Image + colored bar accent + title + time. |
| `MobileArticleCard` | `src/components/articles/MobileArticleCard.tsx` | Mobile post card. Horizontal layout. |
| `HeroSlider` | `src/components/articles/HeroSlider.tsx` | Web homepage hero carousel. |
| `MobileHeroSlider` | `src/components/articles/MobileHeroSlider.tsx` | Mobile homepage hero carousel. |
| `Badge` | `src/components/ui/badge.tsx` | Category badge (rounded, gradient). |
| `Button` | `src/components/ui/button.tsx` | Standard button variants. |
| `Card` | `src/components/ui/card.tsx` | Generic shadcn card. |
| `Input` | `src/components/ui/input.tsx` | Standard input. |
| `Skeleton` | `src/components/ui/skeleton.tsx` | Loading placeholder. |
| `ImageWithFallback` | `src/components/shared/ImageWithFallback.tsx` | Image with og:image + Pexels fallback + skeleton. |
| `SearchBar` | `src/components/shared/SearchBar.tsx` | Site search. |
| `SiteBanner` / `MobileSiteBanner` | `src/components/shared/SiteBanner.tsx` / `MobileSiteBanner.tsx` | Banner image. |
| `ReadingProgress` | `src/components/shared/ReadingProgress.tsx` | Top progress bar. |
| `SocialShare` | `src/components/shared/SocialShare.tsx` | Social share buttons. |
| `TrendingSidebar` | `src/components/articles/TrendingSidebar.tsx` | Trending list (sidebar). |
| `Header` / `MobileHeader` | `src/components/layout/Header.tsx` / `MobileHeader.tsx` | Site header. |
| `Footer` / `MobileFooter` | `src/components/layout/Footer.tsx` / `MobileFooter.tsx` | Site footer. |
| `ResponsiveLayout` | `src/components/layout/ResponsiveLayout.tsx` | Switches mobile vs web layouts. |
| `ThemeProvider` | `src/components/shared/ThemeProvider.tsx` | next-themes wrapper, `data-theme` attribute, default `dark`. |

### 5.1 Section title pattern (DO use this everywhere)

Every homepage section uses:
```jsx
<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
  <span className="inline-block h-5 sm:h-6 w-1.5" style={{ backgroundColor: "CATEGORY_COLOR" }} />
  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide" style={{ color: "var(--text-primary)" }}>
    Section Name
  </h2>
</div>
```

**Bar dimensions**: 6px wide (`w-1.5`), 20-24px tall (`h-5 sm:h-6`). Color from the category palette.

### 5.2 Card pattern (DO use `ArticleCard` / `MobileArticleCard`)

Never build a new card from scratch. Use the existing components. They handle:
- `editorial-card` class (shadow + hover lift)
- `white-card` class (background, border, hover)
- Time + colored dot (category color)
- Image with `ImageWithFallback`

### 5.3 Image pattern (DO use `ImageWithFallback`)

All images must use `<ImageWithFallback src={imageUrl} alt={title} className="..." />`.
It handles:
- `og:image` source
- Pexels API fallback
- Loading skeleton
- Opacity fade-in
- Cached image detection

### 5.4 Badge pattern (DO use `<Badge>`)

```jsx
<Badge colorScheme="film">Film</Badge>
```

Color schemes match the 7 categories. The Badge uses a 135deg gradient with a darker bottom half.

---

## 6. Effects & Animations

| Effect | Class | What it does |
|---|---|---|
| Fade in up | `animate-in` | `fadeIn 0.5s ease-out forwards` — initial mount |
| Staggered delay | `delay-1` ... `delay-5` | `animation-delay: 0.1s ... 0.5s` |
| Skeleton shimmer | `skeleton` | Shimmer animation for loading |
| Pulse | `animate-pulse-slow` | 2s opacity pulse |
| Card hover | `editorial-card` / `white-card` | `transform: translateY(-2px)` + larger shadow |
| Body link hover | (global) | `transform: translateY(-1px)` |
| Film grain | `film-grain` (on body) | Subtle noise overlay, `opacity: 0.18` |
| Vignette | `film-grain::before` | Inset box-shadow, `300px` blur |
| Slider button | (inline) | Red→green hover (light mode), blue→red hover (dark mode) |
| Drop cap | `.prose > p:first-child::first-letter` | First letter of article, 3.5rem, bold, category color |

**Default transition** for all interactive elements:
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 7. Reusable Section Components (new)

| Component | Path | Use |
|---|---|---|
| `SectionHeader` | `src/components/shared/SectionHeader.tsx` | Standard "colored bar + title" wrapper |
| `HomepageSection` | `src/components/shared/HomepageSection.tsx` | Standard section wrapper with consistent margins |

Both consume design tokens and must be used by every homepage section to ensure consistency.

---

## 8. Design Checklist (Enforced Before Deploy)

Every new section, widget, or feature must pass this checklist. If it doesn't, don't ship it.

- [ ] Uses CSS variables for all theme-dependent colors (never hardcoded hex for backgrounds, text, borders)
- [ ] Looks correct in **both light and dark mode** (test both)
- [ ] Works on **both web (≥768px) and mobile (<768px)** with appropriate layout
- [ ] Reuses `ArticleCard` / `MobileArticleCard` for any article previews (no one-off cards)
- [ ] Uses `ImageWithFallback` for any images
- [ ] Uses `<Badge>` for any category tags
- [ ] Uses `SectionHeader` for the title + colored bar
- [ ] Uses `HomepageSection` for the section wrapper (or follows the same margin pattern)
- [ ] Has a colored vertical bar (1.5px wide, 5-6px tall) next to the section title
- [ ] Shows the category dot next to timestamps
- [ ] Uses `timeAgo()` for time formatting (no raw dates)
- [ ] Hover states work on desktop (cards lift, links change color)
- [ ] No new rounded corners beyond what's already used (header search is `rounded-full`, cards are square, buttons are sharp)
- [ ] No new fonts (Inter only)
- [ ] No hardcoded color outside the 7-category palette (other than the established theme tokens)
- [ ] No animations beyond what's already defined (`animate-in`, `skeleton`, `animate-pulse-slow`, `delay-1..5`)
- [ ] Mobile breakpoint is 768px (`useIsMobile()` from `src/hooks/useMediaQuery.ts`)

---

## 9. Don'ts

- **Don't** introduce new border-radius values (e.g., `rounded-lg`, `rounded-2xl`). Cards are square, search is full-round, that's it.
- **Don't** use Inter at any weight outside 300-900. No system fonts as fallbacks unless the global already does.
- **Don't** add new colors. The 7-category palette + theme tokens are exhaustive.
- **Don't** invent new section title patterns. Always use `SectionHeader`.
- **Don't** create a new card layout. Always use `ArticleCard` / `MobileArticleCard`.
- **Don't** bypass `ImageWithFallback` with raw `<img>` tags.
- **Don't** use inline color styles for theme-dependent values. Use CSS variables.
- **Don't** add a theme toggle UI. Dark mode is the default and only mode (toggle is hidden).
- **Don't** add social media icons that link to accounts that don't exist yet.

---

## 10. When This Doc Changes

If you need to introduce a new design element (e.g., a new section type, a new color, a new component), **edit this file first** with the new addition, then implement. Never add a new design pattern without documenting it here. Reviewers should reject PRs that violate this document.
