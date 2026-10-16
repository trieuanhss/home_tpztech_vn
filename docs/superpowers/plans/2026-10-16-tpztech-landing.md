# TPZTech Studio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, high-tech, professional landing page for Công ty TNHH TPZTech Studio (software and online games development) in Apple Liquid Glass style with Light/Dark/Auto theme support, English/Vietnamese language toggle, and zero-build GitHub Pages deployment.

**Architecture:** A static, single-page application using HTML5, modern CSS3 with custom properties for Apple Liquid Glass styling, and Vue 3 (via CDN) to render dynamic content loaded from an external `config.json` file. State management in `app.js` handles real-time theme switching (Dark/Light/Auto), bilingual translation (VI/EN), category filtering for upcoming games, and an interactive game teaser modal.

**Tech Stack:** HTML5, CSS3 (Vanilla Glassmorphism, CSS Variables, Flexbox/Grid), Vue.js 3 (Global CDN build), Google Fonts (Plus Jakarta Sans / Outfit).

**Spec:** [`docs/superpowers/specs/2026-10-16-tpztech-landing-design.md`](file:///d:/DevWeb/TPZ/tpx-landing/docs/superpowers/specs/2026-10-16-tpztech-landing-design.md)

## Global Constraints

- Must run statically without Node build tools (Vite/Webpack), directly servable by GitHub Pages.
- Company name must be displayed as "Công ty TNHH TPZTech Studio" (in English: "TPZTech Studio Co., Ltd.").
- Company location must strictly show "Thành Phố Đồng Nai, Việt Nam" (in English: "Dong Nai City, Vietnam").
- All display text, game lists, and company details must be loaded from `config.json` so editing does not require changing HTML.
- Must provide 3 theme modes: Light, Dark, Auto (System OS sync), stored in `localStorage`.
- Must provide bilingual support: Vietnamese (VI) and English (EN), stored in `localStorage`.
- The product section must showcase games with "Sắp ra mắt" / "Coming Soon" badges in an expandable card layout.

## Review Focus

1. **Theme Switching Persistence & Flash of Unstyled Theme (FOUC):** Initial theme must be applied before DOM paint to prevent white flash in dark mode.
2. **Offline/Local JSON Fetching Compatibility:** Handle fetch failure gracefully if user opens via `file://` by providing fallback defaults or clear instructions.
3. **Card Layout Scalability:** Adding or removing games in `config.json` must automatically render clean responsive rows on mobile, tablet, and desktop without layout break.
4. **Bilingual Key Completeness:** Every visible element in the UI must have corresponding `vi` and `en` values in `config.json` with no undefined labels.
5. **Apple Liquid Glass Usability:** High contrast and readability must be maintained in both Dark and Light modes (ensure text is crisp against blurred backdrops).

---

### Task 1: Bilingual Configuration Data Model (`config.json`)

**Files:**
- Create: `config.json`
- Test: `tests/validate-config.js`

**Interfaces:**
- Produces: JSON object containing keys: `company`, `themeLabels`, `navigation`, `hero`, `about`, `services`, `upcomingGames`, `techStack`, `contact`, and `footer`.

- [ ] **Step 1: Write validation test for config structure**

Create a node script `tests/validate-config.js` verifying that `config.json` exists, is valid JSON, and has all required bilingual fields (`vi` and `en`) for company, upcoming games, and navigation.

- [ ] **Step 2: Run validation test to verify it fails**

Run: `node tests/validate-config.js`
Expected: FAIL (config.json not found)

- [ ] **Step 3: Implement `config.json`**

Write `config.json` with complete structured data for TPZTech Studio:
- Company: name ("Công ty TNHH TPZTech Studio" / "TPZTech Studio Co., Ltd."), address ("Thành Phố Đồng Nai, Việt Nam" / "Dong Nai City, Vietnam"), email, hotline, socials.
- Navigation links (Home, About, Services, Upcoming Games, Tech Stack, Contact).
- Hero headline, tagline, and trust metric chips.
- About section: Vision, Mission, and Core Philosophy.
- Services: Online Game Development, Software Engineering, UI/UX & Digital Art.
- Upcoming Games: Array of 4+ games with id, title, genre, platforms, status, badge, releaseDate, shortDesc, fullDesc, features.
- Tech Stack: Unreal Engine 5, Unity, Vue.js, Node.js, Cloud Native.
- Footer and contact form labels.

- [ ] **Step 4: Run validation test to verify it passes**

Run: `node tests/validate-config.js`
Expected: PASS with 0 errors.

---

### Task 2: Core Design System & Apple Liquid Glass CSS (`style.css`)

**Files:**
- Create: `style.css`

**Interfaces:**
- Consumes: CSS custom properties for `:root`, `[data-theme="dark"]`, `[data-theme="light"]`.
- Produces: Utility classes `.liquid-glass`, `.liquid-nav`, `.liquid-card`, `.liquid-btn`, `.game-badge`, `.theme-pill`, `.modal-overlay`, `.modal-content`.

- [ ] **Step 1: Define CSS Design Tokens & Themes**

Set up CSS variables for:
- Dark Mode: deep obsidian `#07090e`, neon glow cyan `#38bdf8`, amethyst `#818cf8`, frosted glass background `rgba(255, 255, 255, 0.04)`, specular border `rgba(255, 255, 255, 0.12)`.
- Light Mode: liquid ice `#f8fafc`, surface `rgba(255, 255, 255, 0.7)`, deep typography `#0f172a`, subtle shadow `0 10px 30px rgba(0,0,0,0.06)`.
- Glassmorphism effects with `-webkit-backdrop-filter` and `backdrop-filter: blur(20px)`.

- [ ] **Step 2: Implement Component Styles**

Style navbar, hero section, trust metrics, 3-pillar about cards, service cards, upcoming game grid, game cards with pulse badges, filter buttons, contact section, modal dialog, and footer.

- [ ] **Step 3: Add Responsive Breakpoints & Animations**

Add media queries for `@media (max-width: 1024px)`, `@media (max-width: 768px)`, and `@media (max-width: 480px)`. Add ambient light floating animations and smooth card hover transitions.

---

### Task 3: Interactive Application Logic & State Management (`app.js`)

**Files:**
- Create: `app.js`

**Interfaces:**
- Consumes: `config.json` via `fetch()`.
- Produces: Vue 3 root instance with reactive state: `config`, `lang`, `theme`, `activeCategory`, `selectedGame`, `toastMessage`.

- [ ] **Step 1: Setup Vue 3 Reactive State and Theme Manager**

Implement theme detection logic:
- Reads `localStorage.getItem('tpz_theme')` (defaults to `'auto'`).
- Checks `window.matchMedia('(prefers-color-scheme: dark)')` when in `'auto'` mode.
- Sets `data-theme="dark"` or `data-theme="light"` on `document.documentElement`.
- Methods: `setTheme(theme)`.

- [ ] **Step 2: Setup Bilingual Localization Manager**

Implement language toggle:
- Reads `localStorage.getItem('tpz_lang')` (defaults to `'vi'`).
- Helper function `t(obj)` to resolve `{ vi: "...", en: "..." }` according to current `lang`.
- Method `setLang(lang)`.

- [ ] **Step 3: Setup Game Filtering, Modal & Contact Actions**

Implement:
- `filteredGames` computed property based on `activeCategory`.
- `openGameModal(game)` and `closeGameModal()`.
- Pre-registration and contact submission handler with animated toast notification.
- Load `config.json` on `mounted()` lifecycle with fallback.

---

### Task 4: Main Application Markup (`index.html`)

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: `style.css`, `app.js`, `config.json`, Vue 3 CDN.
- Produces: Complete semantic page ready for production.

- [ ] **Step 1: Create HTML Shell with Anti-FOUC Script**

Create `index.html` including Google Fonts, FontAwesome/Lucide SVG icons, Vue 3 CDN, and an inline head script to initialize `data-theme` immediately before paint.

- [ ] **Step 2: Implement Navigation, Hero & Trust Metrics**

Add floating glass header with logo, navigation links, theme switcher (Light / Dark / Auto), language switcher (VI / EN), and contact CTA button. Add Hero Section and Trust Metric Cards.

- [ ] **Step 3: Implement About Us & Core Capabilities**

Add the 3-pillar Vision, Mission, and Product Philosophy cards and the 3 Services cards.

- [ ] **Step 4: Implement Upcoming Games Section & Teaser Modal**

Add category filter pills, dynamic game card grid with "Sắp ra mắt" pulsing badges, platform tags, and click-to-open modal showing full storyline, screenshots, and pre-register form.

- [ ] **Step 5: Implement Tech Stack, Contact Form & Corporate Footer**

Add partner tech badges, interactive contact form, and corporate footer with "Công ty TNHH TPZTech Studio", address at "Thành Phố Đồng Nai, Việt Nam", and legal copyright.

---

### Task 5: Visual Assets, Assets Generation & End-to-End Verification

**Files:**
- Create: `assets/logo.svg`, game cover graphics / SVGs in `assets/`.
- Test: Manual and browser-based verification.

- [ ] **Step 1: Create Brand Logo and Teaser Game Banners**

Create SVG / CSS visual assets for the studio logo and high-tech game banners for the 4 upcoming games so the page looks stunning out-of-the-box.

- [ ] **Step 2: Run End-to-End Verification in Browser**

Verify:
- Light / Dark / Auto toggle changes theme instantly and persists across refresh.
- VI / EN language switch updates all titles, menus, descriptions, badges, and footer.
- Filter buttons correctly filter games by category.
- Clicking any game card opens the glass modal with full details.
- Pre-register and contact form show confirmation toast.
- Responsive layout works flawlessly on mobile (375px) and desktop (1440px).
