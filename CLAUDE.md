# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sarika** adalah WordPress theme premium untuk Company Profile yang dikembangkan oleh Webane Indonesia. Theme ini di-fork dari **Tempone v0.1.9** (news/magazine theme) dengan tujuan mempertahankan SEMUA fitur Tempone sambil menambahkan capabilities khusus untuk company profile.

**Filosofi Development:**
- ✅ Keep ALL Tempone features (blog system, admin customization, SEO, widgets, translation)
- ✅ Add company profile sections (portfolio, services, team, testimonials)
- ✅ Dual-purpose theme: Blog + Company Profile dalam satu package
- ✅ Mobile-first, performance-optimized, ACF-powered

## Origin & Heritage

**Forked from:** Tempone v0.1.9 (2025-01-27)
**Current version:** Sarika v0.1.0
**Parent features retained:** 100%

### What We Inherited from Tempone

**Core Systems (RETAINED):**
- Blog/news loop system dengan featured posts
- Archive templates (category, tag, author, date)
- Post templates dengan multiple layouts (overlay, classic, title, image-side)
- Carousel system (desktop auto-play, mobile swipe)
- Pagination system

**Admin Customization (RETAINED):**
- Custom dashboard dengan Chart.js analytics
- Enhanced user profile page
- Mobile footer navigation (5-item bottom nav)
- Custom admin menu icons (SVG-based)
- Login page glassmorphism design
- Gutenberg editor styling

**SEO & Optimization (PARTIALLY RETAINED):**
- ✅ Open Graph meta tags
- ✅ Dublin Core metadata
- ✅ Citation metadata (AI crawler optimization)
- ✅ Enhanced RSS feed
- ⚠️  NewsArticle schema (akan diganti Organization/LocalBusiness)
- ⚠️  Google News sitemap (akan di-disable atau adjust)

**Translation System (RETAINED):**
- Full i18n support dengan text domain `sarika`
- Indonesian translation (inherited, needs update)
- Translation-ready structure

**Styling System (IMPROVED):**
- ❌ Tailwind CSS removed (was 50-80KB runtime)
- ✅ Custom utility classes following DRY principles
- ✅ SCSS modular architecture
- ✅ Monochrome color palette with CSS variables
- ✅ Mobile-first responsive design
- Total CSS: 75KB minified (includes all utilities)

## Architecture

### File Structure (Same as Tempone)

```
sarika/
├── functions.php           # Bootstrap (SARIKA_PATH, SARIKA_URI constants)
├── style.css              # Theme header (Company Profile description)
├── /inc                   # All PHP functions
│   ├── setup.php          # Theme supports, menus, image sizes
│   ├── assets.php         # Enqueue CSS/JS
│   ├── seo.php           # SEO functions (needs adjustment for company profile)
│   ├── share.php         # Social media sharing
│   ├── widget.php        # Custom widgets
│   ├── acf-layouts.php   # ACF Flexible Content (TO BE EXPANDED)
│   ├── /admin            # Admin customization
│   │   ├── dashboard.php
│   │   ├── user.php
│   │   ├── footer-mobile-menu.php
│   │   └── ...
├── /tp                    # Template parts
├── /scss                  # SCSS source files
├── /css                   # Compiled CSS
├── /js                    # JavaScript files
└── /languages            # Translation files (empty, ready for regeneration)
```

### Constants & Naming Convention

**PHP Constants:**
- `SARIKA_PATH` - Theme directory path
- `SARIKA_URI` - Theme directory URI
- `SARIKA_VERSION` - Theme version from style.css

**Function Prefix:** `sarika_` (all functions)
**Text Domain:** `sarika`
**CSS Prefix:** `.sarika-` (all custom classes)
**JS Objects:** `sarikaObject` (localized data)

**IMPORTANT:** Never use `tempone_` prefix, always `sarika_`.

## Development Roadmap

### Phase 1: Foundation (Current - v0.1.0)
**Status:** ✅ Complete

- [x] Fork dari Tempone v0.1.9
- [x] Find & replace semua `tempone` → `sarika`
- [x] Update style.css header dengan company profile description
- [x] Clean up git files, backup files
- [x] Create CLAUDE.md (this file)

### Phase 2: SEO Adjustment (Planned - v0.2.0)
**Status:** ⏳ Pending

**Tasks:**
- [ ] Replace NewsArticle schema dengan Organization schema
- [ ] Add LocalBusiness schema untuk company with physical location
- [ ] Disable/remove Google News sitemap
- [ ] Keep general SEO (Open Graph, Dublin Core, AI crawler optimization)
- [ ] Update admin panel "SEO & News" menjadi "SEO & Schema"

**Files to modify:**
- `inc/seo.php` - Schema adjustments
- `inc/admin.php` - Admin panel labels

### Phase 3: Company Profile Sections (In Progress - v0.1.2+)
**Status:** ✅ Partially Complete

**Implemented (Custom Post Types Approach):**
- ✅ **Services CPT** - `inc/cpt-service.php`
  - Post type slug: `ane-service`
  - Taxonomy: `service-category` (hierarchical)
  - Archive template: `archive-ane-service.php`
  - Category template: `taxonomy-service-category.php`
  - Single template: `tp/content-service.php`
  - Supports: title, editor, thumbnail, excerpt
  - REST API enabled for Gutenberg

- ✅ **Testimonials CPT** - `inc/cpt-testimoni.php`
  - Post type slug: `ane-testimoni`
  - Archive template: `archive-ane-testimoni.php`
  - Single template: `tp/content-ane-testimoni.php`
  - Supports: title, editor, thumbnail
  - REST API enabled

**Still To Decide:**
- Portfolio implementation (CPT recommended following service pattern)
- Team members (CPT vs ACF flexible?)

**Implementation Pattern (PROVEN):**

**Custom Post Types (CHOSEN APPROACH)**
```php
// Pattern: See inc/cpt-service.php and inc/cpt-testimoni.php
register_post_type('ane-service', [
    'label' => 'Service',
    'public' => true,
    'has_archive' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'rewrite' => ['slug' => 'service', 'with_front' => false],
    'show_in_rest' => true, // Gutenberg support
]);
```
**Why CPT was chosen:**
- ✅ Native WordPress, SEO-friendly URLs
- ✅ Archive pages automatic (service/*, testimonial/*)
- ✅ Taxonomies support (service-category)
- ✅ REST API integration for Gutenberg blocks
- ✅ Flexible template system (archive, taxonomy, single)

**Alternative Options (Not Chosen):**

**Option B: ACF Flexible Content**
- Available via: `inc/acf-layouts.php`
- Good for: One-off page sections
- Not chosen for: Services/Testimonials (need archives)

**Option C: Gutenberg Blocks Only**
- Available via: `src/blocks/*`
- Good for: Content blocks (Hero, FAQ, Gallery)
- Not chosen for: Services/Testimonials (need data management)

**RECOMMENDATION:** Use CPT for data-driven content (services, testimonials, portfolio, team), use Gutenberg blocks for layout sections (hero, FAQ, funfact).

### Phase 4: Homepage Template (Planned - v0.4.0)
**Status:** 📋 Planning

**Current state:** Theme has `page-landingpage.php` template (inherited from Tempone)

**Options:**
1. Extend `page-landingpage.php` untuk company profile use case
2. Create new `page-company.php` template
3. Create `front-page.php` untuk static homepage

**To include:**
- Hero section (full-width banner with CTA)
- Services overview
- Portfolio highlights
- Team section
- Testimonials
- Contact CTA

### Phase 5: Media Upload Support (Complete - v0.1.0)
**Status:** ✅ Complete

**SVG Upload Support:**
- Enabled SVG and SVGZ file uploads
- Security: Strips dangerous tags (script, iframe, object, embed, form)
- Security: Removes event handlers (onclick, onload, etc.)
- Media library: SVG thumbnails display correctly
- Dimensions: Auto-detected from viewBox or width/height attributes
- File: `inc/setup.php` lines 107-245

**JSON (Lottie) Upload Support:**
- Enabled JSON file uploads for Lottie animations
- Validation: Checks JSON syntax validity
- Validation: Verifies Lottie format (must have 'v' version property)
- Media library: JSON files display with document icon
- File: `inc/setup.php` lines 107-245

**Security Features:**
- SVG sanitization blocks XSS attacks
- JSON validation prevents malformed files
- All uploads filtered through `wp_handle_upload_prefilter` hook

**Usage:**
1. Upload SVG icons for Icon & Description block
2. Upload Lottie JSON for future animation features
3. All file types work with MediaUpload component

### Phase 6: Additional Features (Future)
**Status:** 💡 Ideas

- [ ] Contact form integration (Contact Form 7 / WPForms styling)
- [ ] Google Maps integration
- [ ] Social proof (client logos, stats counter)
- [ ] FAQ section (accordion style)
- [ ] Pricing tables
- [ ] Multi-language support enhancement
- [ ] Lottie animation playback component

## Key Differences from Tempone

| Feature | Tempone | Sarika | Status |
|---------|---------|--------|--------|
| **Primary Use** | News/Magazine | Company Profile + Blog | ✅ Defined |
| **Schema Type** | NewsArticle | Organization/LocalBusiness | ⏳ Pending |
| **Google News** | Yes (sitemap, optimization) | No | ⏳ To remove |
| **Custom Blocks** | No | 11 blocks (Hero, Video BG, Icon, FAQ, Gallery, Funfact, etc.) | ✅ Complete |
| **SVG Upload** | No | Yes (sanitized) | ✅ Complete |
| **JSON/Lottie Upload** | No | Yes (validated) | ✅ Complete |
| **Services CPT** | No | Yes (with categories) | ✅ Complete |
| **Testimonials CPT** | No | Yes | ✅ Complete |
| **Portfolio** | No | Yes | 📋 Planning |
| **Team** | No | Yes | 📋 Planning |
| **Blog System** | Full featured | Same (inherited) | ✅ Complete |
| **Admin Custom** | Full featured | Same (inherited) | ✅ Complete |
| **Translation** | Indonesian ready | Needs regeneration | ⏳ Pending |
| **Build System** | No npm | Webpack for blocks only | ✅ Complete |

## Common Development Commands

### SCSS Compilation (CRITICAL - Must run after CSS changes!)

```bash
# Frontend Theme Styles
npx sass scss/sarika.scss css/sarika.min.css --style=compressed

# Admin Styles
npx sass scss/admin.scss css/admin.min.css --style=compressed

# Gutenberg Editor Styles
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed

# Watch Mode (auto-compile on save) - Recommended during development
npx sass scss/sarika.scss css/sarika.min.css --style=compressed --watch
npx sass scss/admin.scss css/admin.min.css --style=compressed --watch
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed --watch
```

### Gutenberg Block Development

```bash
# Install dependencies (first time only)
npm install

# Development mode with watch (auto-rebuild blocks on save)
npm run start

# Production build (minified, optimized)
npm run build

# Lint JavaScript
npm run lint:js

# Format code
npm run format
```

### Translation Generation

```bash
# Generate POT template
wp i18n make-pot . languages/sarika.pot --domain=sarika

# Compile PO to MO files
wp i18n make-mo languages/
```

### Testing & Debugging

```bash
# Check WordPress coding standards (requires PHP CodeSniffer)
phpcs --standard=WordPress inc/ functions.php

# Auto-fix coding standards
phpcbf --standard=WordPress inc/ functions.php
```

## Development Environment

### Prerequisites
- **PHP:** 7.4+ (specified in style.css)
- **WordPress:** 6.0+ (tested up to 6.4)
- **Node.js:** 16+ (for Gutenberg block development)
- **npx:** Bundled with Node.js (for SCSS compilation)
- **ACF Pro:** Required for ACF Flexible Content layouts and color customization
- **Local Server:** MAMP, XAMPP, Local by Flywheel, or similar

### Quick Start
```bash
# 1. Clone/copy theme to WordPress themes directory
cd /path/to/wordpress/wp-content/themes/sarika

# 2. Install SASS if not already installed (no package.json, using npx)
# npx will auto-download sass on first use

# 3. Compile all SCSS files
npx sass scss/sarika.scss css/sarika.min.css --style=compressed
npx sass scss/admin.scss css/admin.min.css --style=compressed
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed

# 4. Activate theme in WordPress admin
# Dashboard → Appearance → Themes → Activate Sarika

# 5. Install ACF Pro plugin (required)
# Dashboard → Plugins → Add New → Upload ACF Pro

# 6. Import ACF field groups (if provided)
# Dashboard → Custom Fields → Tools → Import
```

### Development Workflow
1. Make changes to `.php` or `.scss` files
2. If SCSS changed: Compile to CSS immediately
3. Refresh browser to see changes
4. Test on mobile (≤782px) and desktop
5. Check browser console for errors
6. Test with ACF Pro activated

### Build System

**SCSS Compilation (No npm required):**
- Direct SCSS compilation with `npx sass`
- No build process for theme CSS
- Vanilla JS loaded directly for theme scripts

**Gutenberg Blocks (Webpack required):**
- Theme HAS package.json for block development
- Uses `@wordpress/scripts` for block bundling
- Multi-entry webpack config for multiple blocks
- Build commands:
  ```bash
  npm run build    # Production build (minified)
  npm run start    # Development build with watch mode
  ```

**Key Files:**
- `package.json` - Block development dependencies
- `webpack.config.js` - Multi-entry block compilation
- `src/blocks/*/index.js` - Block source files (React/JSX)
- `build/*/index.js` - Compiled block output

## Coding Standards

### WordPress Coding Standards (Same as Tempone)
- PHP 7.4+ type hints
- Docblocks dengan `@package sarika`
- Escaping: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`
- i18n: `__()`, `_e()` dengan text domain `sarika`
- Tabs untuk indentation
- No trailing whitespace

### SCSS Compilation

**CRITICAL:** All SCSS files MUST be compiled to CSS after ANY changes!

```bash
# Main Theme Styles (Frontend)
npx sass scss/sarika.scss css/sarika.min.css --style=compressed

# Admin Styles (Backend)
npx sass scss/admin.scss css/admin.min.css --style=compressed

# Editor Styles (Gutenberg)
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed

# Watch Mode (auto-compile on save)
npx sass scss/sarika.scss css/sarika.min.css --style=compressed --watch
npx sass scss/admin.scss css/admin.min.css --style=compressed --watch
```

**IMPORTANT:**
- Theme now uses ONLY minified CSS files (.min.css) for production
- Always use `--style=compressed` flag for optimization
- Test after compilation to ensure no SCSS syntax errors

### File Naming Conventions
- Template parts: `tp/section-*.php` (company profile sections)
- ACF layouts: Named as `flexi_*` in `inc/acf-layouts.php`
- SCSS partials: `scss/_component-name.scss`
- Admin files: `inc/admin/*.php`
- JavaScript files: `js/feature-name.js`

### Gutenberg Blocks Implemented

**Location:** `src/blocks/*/` (React/JSX source) → `build/*/` (compiled output)

**All Custom Blocks (11 total):**

1. **Hero Block** (`src/blocks/hero/`)
   - Fullscreen hero with image background, title, description, CTA button
   - Supports alignment options

2. **Video Background Block** (`src/blocks/video-background/`)
   - YouTube video as fullscreen background
   - Overlay gradient (bottom to top), autoplay, loop, muted
   - Alignment options (left, center, right)
   - Overlay color options (dark, body, primary, secondary)

3. **Icon & Description Block** (`src/blocks/icon-description/`)
   - Services/features showcase with SVG icon upload
   - Grid layout (1-4 columns), alignment options
   - Icon size customization

4. **Block Text** (`src/blocks/block-text/`)
   - Flexible text content block with typography controls

5. **Block Profile** (`src/blocks/block-profile/`)
   - Team member or testimonial profiles with image (4:5 portrait aspect ratio)

6. **Block Image Side Text** (`src/blocks/block-image-side-text/`)
   - Content with image left/right, glassmorphism list items

7. **Client Logos Block** (`src/blocks/client-logos/`)
   - Logo carousel, responsive grid, grayscale with hover effect

8. **FAQ Block** (`src/blocks/faq/`)
   - Accordion-style FAQ with expand/collapse, repeater items (JSON storage)

9. **Gallery Block** (`src/blocks/gallery/`)
   - Lightbox photo gallery, responsive grid (2-5 columns)
   - Keyboard navigation (← → ESC), image counter

10. **Funfact Block** (`src/blocks/funfact/`)
    - Animated statistics counter, Intersection Observer trigger
    - Number counter animation, suffix support (%, K, M, +)
    - Grid layout (2-5 columns), repeater items (JSON storage)

11. **Video Background Block** (duplicate entry removed)

**Block Development Pattern:**
- All blocks use React/JSX
- Compiled via `@wordpress/scripts` (webpack)
- Editor styles in `scss/editor-style.scss` (NOT individual CSS files)
- Frontend styles in `scss/_blocks.scss`
- PHP render templates in `tp/blocks/block-{name}.php`
- Repeater fields stored as JSON strings (see BLOCK-DEVELOPMENT-STANDARD.md)

**CRITICAL:** See [BLOCK-DEVELOPMENT-STANDARD.md](BLOCK-DEVELOPMENT-STANDARD.md) for complete development guidelines.

### SCSS Architecture

**Main Files (entry points):**
- `scss/sarika.scss` - Frontend theme styles (imports: tokens, utilities, setup, header, footer, post, landingpage, contact, wordpress)
- `scss/admin.scss` - Backend admin styles (imports 13 partials)
- `scss/editor-style.scss` - Gutenberg editor styles (imports ALL block editor styles)

**Import Order in sarika.scss:**
```scss
@use 'tokens';        // MUST be first - CSS variables
@use 'utilities';     // DRY utility classes (layout, spacing, typography, etc.)
@use 'setup';         // Base setup (reset, typography, base elements)
@use 'header';        // Site header
@use 'footer';        // Site footer
@use 'post';          // Post/blog templates
@use 'landingpage';   // Landing page template
@use 'contact';       // Contact page
@use 'wordpress';     // WordPress core overrides
```

**Import Order in admin.scss:**
```scss
@use 'tokens';                      // MUST be first - CSS variables
@use 'admin-general';               // General admin styles
@use 'admin-style';                 // Hero, cards, shared components
@use 'admin-dashboard';             // Custom dashboard page
@use 'admin-user';                  // User profile page
@use 'admin-login';                 // Glassmorphism login page
@use 'admin-content';               // Content editor area
@use 'admin-menu-icon';             // SVG menu icons
@use 'admin-menu';                  // Sidebar menu styling
@use 'admin-header';                // Top admin bar
@use 'admin-navigation';            // Navigation elements
@use 'admin-animations';            // Animation utilities
@use 'admin-footer-mobile-menu';    // Mobile bottom nav (≤782px)
```

**JavaScript Files:**
- `js/admin-dashboard.js` - Chart.js for dashboard analytics
- `js/admin-user.js` - Chart.js for user profile analytics
- `js/admin-header.js` - Admin header interactions
- `js/admin-menu.js` - Admin menu interactions
- `js/admin-animations.js` - Animation utilities
- `js/main.js` - Frontend main scripts
- `js/menu-drag-scroll.js` - Horizontal menu scroll
- `js/search-expand.js` - Search expand animation
- `js/submenu-toggle.js` - Mobile submenu toggle
- `js/lightbox.js` - Image lightbox functionality

### Utility Classes System (DRY Principle)

**Philosophy:** Write once, use everywhere. No repeating CSS.

**File:** `scss/_utilities.scss` (~300 lines, adds only 6KB to final CSS)

**Why No Tailwind:**
- ❌ Tailwind CDN: 50-80KB runtime overhead
- ✅ Custom utilities: Lightweight, specific to our needs
- ✅ Full control over class names and values
- ✅ Integrates with CSS variables (--sarika-color-*)

**Available Utility Categories:**

1. **Layout Utilities**
   - Containers: `.container`, `.container-narrow`, `.container-wide`
   - Display: `.block`, `.flex`, `.grid`, `.hidden`
   - Flex: `.flex-row`, `.flex-col`, `.items-center`, `.justify-between`, `.gap-4`
   - Grid: `.grid-cols-2`, `.md:grid-cols-3`, `.lg:grid-cols-4`

2. **Spacing Utilities**
   - Padding: `.p-4`, `.px-6`, `.py-8`
   - Margin: `.m-auto`, `.mx-auto`, `.mt-4`, `.mb-6`
   - Scale: 0, 1 (0.25rem), 2 (0.5rem), 3 (0.75rem), 4 (1rem), 5 (1.25rem), 6 (1.5rem), 8 (2rem), 12 (3rem), 16 (4rem)

3. **Typography Utilities**
   - Font sizes: `.text-xs` to `.text-4xl` (with responsive variants)
   - Font weight: `.font-light`, `.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`
   - Text align: `.text-left`, `.text-center`, `.text-right`
   - Text transform: `.uppercase`, `.lowercase`, `.capitalize`
   - Line height: `.leading-none`, `.leading-tight`, `.leading-normal`, `.leading-relaxed`

4. **Color Utilities (CSS Variables)**
   - Text: `.text-primary`, `.text-secondary`, `.text-body`, `.text-light`, `.text-dark`, `.text-accent`, `.text-white`, `.text-black`
   - Background: `.bg-primary`, `.bg-secondary`, `.bg-light`, `.bg-dark`, `.bg-accent`, `.bg-white`, `.bg-black`, `.bg-transparent`
   - All colors use CSS variables: `var(--sarika-color-*)`

5. **Border Utilities**
   - `.border`, `.border-0`, `.border-t`, `.border-b`
   - Uses alpha transparency: `rgba(var(--sarika-color-dark-rgb), 0.1)`

6. **Width & Height**
   - Width: `.w-full`, `.w-auto`, `.w-fit`
   - Height: `.h-full`, `.h-auto`, `.min-h-screen`

7. **Position**
   - `.relative`, `.absolute`, `.fixed`, `.sticky`

8. **Overflow**
   - `.overflow-hidden`, `.overflow-auto`, `.overflow-x-auto`, `.overflow-y-auto`

9. **Opacity & Visibility**
   - Opacity: `.opacity-0`, `.opacity-50`, `.opacity-75`, `.opacity-100`
   - Visibility: `.visible`, `.invisible`
   - Screen reader only: `.sr-only`

10. **Responsive Utilities**
    - Breakpoints: 768px (md), 1024px (lg)
    - Display: `.md:block`, `.md:flex`, `.lg:hidden`
    - Typography: `.md:text-lg`, `.lg:text-2xl`
    - Grid: `.md:grid-cols-2`, `.lg:grid-cols-4`
    - Mobile-first: `.sm:hidden` (hides on mobile <768px)

11. **Interactive**
    - Pointer events: `.pointer-events-none`, `.pointer-events-auto`
    - Cursor: `.cursor-pointer`, `.cursor-not-allowed`

12. **Transitions**
    - `.transition` (all properties, 150ms)
    - `.transition-colors` (color, background, border)
    - Duration: `.duration-150`, `.duration-300`, `.duration-500`
    - Timing: cubic-bezier(0.4, 0, 0.2, 1)

13. **Object Fit & Aspect Ratio**
    - Object fit: `.object-contain`, `.object-cover`, `.object-fill`
    - Aspect ratio: `.aspect-square`, `.aspect-video`, `.aspect-4-3`

**Usage Examples:**

```html
<!-- Container with padding -->
<div class="container py-8">

<!-- Flex layout with gap and alignment -->
<div class="flex items-center justify-between gap-4">

<!-- Grid with responsive columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Card with colors and spacing -->
<div class="bg-white p-6 border">
  <h2 class="text-2xl font-bold text-primary mb-4">Title</h2>
  <p class="text-base text-body leading-relaxed">Content</p>
</div>

<!-- Responsive typography -->
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">Hero Title</h1>
```

**IMPORTANT Rules:**

1. **Always use utilities first** before writing custom CSS
2. **Never repeat CSS** - if you need the same styling, create a utility
3. **Mobile-first** - base classes are mobile, use `md:` and `lg:` prefixes for larger screens
4. **Semantic colors** - use `.text-primary`, `.bg-white`, not hardcoded hex values
5. **Consistent spacing** - use the scale (1-8, 12, 16), don't use arbitrary values
6. **Composability** - combine multiple utilities instead of creating one-off classes

**Performance:**
- Total utilities: ~300 lines SCSS → ~6KB minified CSS
- Zero runtime overhead (compiled to static CSS)
- No JavaScript required
- Full browser support (modern CSS only)

## Translation System

**Current state:** Translation files removed (clean slate)

**To regenerate:**
```bash
# Generate POT template
wp i18n make-pot . languages/sarika.pot --domain=sarika

# Create Indonesian translation
# Use Loco Translate plugin or Poedit

# Compile PO to MO
wp i18n make-mo languages
```

**Text domain:** `sarika` (already replaced throughout codebase)

## Admin Panel Structure

**Inherited from Tempone:**
- Main menu: "Sarika Setup" (was "Tempone Setup")
- Sub-menus: General Setting, Customer Care, SEO & News
- Custom dashboard page
- Mobile footer navigation (5 items)

**To adjust:**
- [ ] Rename "Tempone Setup" labels → "Sarika Setup"
- [ ] Update admin page slugs: `sarika-setup`, `sarika-general-setting`, etc.
- [ ] Adjust footer mobile menu icons/labels if needed

**Current admin slugs (inherited, NEED UPDATE):**
```php
// inc/admin.php - Change these:
'page=tempone-setup'           → 'page=sarika-setup'
'page=tempone-general-setting' → 'page=sarika-general-setting'
'page=tempone-seo-news'        → 'page=sarika-seo-news'
```

## Mobile Footer Navigation

**5 Menu Items (inherited from Tempone):**
1. Dashboard → `admin.php?page=sarika-dashboard`
2. Pages → `edit.php?post_type=page`
3. Create (center, primary) → `post-new.php`
4. Posts → `edit.php`
5. Settings → `admin.php?page=sarika-setup`

**File:** `inc/admin/footer-mobile-menu.php`
**Breakpoint:** ≤782px
**Safe area:** iPhone notch support

## Important Notes for Claude Code

### Admin Customization System

**CRITICAL:** This theme has an extensive custom admin system inherited from Tempone. Before modifying admin features:

1. **Read the Admin README first:** `inc/admin/README.md` (1,045 lines of comprehensive documentation)
   - Complete integration guide for all admin customization features
   - Chart.js implementation patterns (dashboard + user profile analytics)
   - ACF color system integration (dynamic CSS variables)
   - SCSS compilation workflow and file structure
   - Mobile footer navigation system (5-item bottom nav at ≤782px)
   - Design tokens and CSS variable patterns
   - Troubleshooting guide for common issues

2. **Admin System Files:**
   - `inc/admin.php` - ACF Options Pages registration ("Sarika Setup" menu)
   - `inc/admin/*.php` - 10 modular admin customization files
   - `inc/acf-layouts.php` - Lines 138-180: Dynamic color injection system
   - `scss/_admin-*.scss` - 13 SCSS partials for admin styling
   - `js/admin-*.js` - 5 JavaScript files for admin interactions

3. **Key Features to Preserve:**
   - Custom dashboard with Chart.js analytics (replaces wp-admin/index.php)
   - Enhanced user profile page with performance stats
   - Glassmorphism login page with Webane branding
   - Dynamic color system via ACF fields (6 color variables)
   - Mobile footer navigation (5 menu items, iPhone safe area support)
   - Custom menu icon system with SVG support

4. **Admin Naming Conventions:**
   - Function prefix: `sarika_` (many still use `tempone_` - gradual migration)
   - CSS classes: `sarika-*` (renamed from `tempone-*`)
   - CSS variables: `--sarika-color-*` (renamed from `--tempone-color-*`)
   - Admin page slugs: `sarika-*` (some still `tempone-*` - needs update)
   - ACF field names: `ane-warna-*` (unchanged from Tempone)

### When Working on Sarika

**DO:**
- ✅ Maintain ALL inherited Tempone features
- ✅ Use `sarika_` prefix for functions
- ✅ Use `sarika` text domain
- ✅ Compile SCSS after CSS changes (CRITICAL!)
- ✅ Run `npm run build` after editing block JavaScript
- ✅ Test on mobile (≤782px) and desktop
- ✅ Keep monochrome design aesthetic
- ✅ Preserve admin customization
- ✅ Follow block development standards (see BLOCK-DEVELOPMENT-STANDARD.md)
- ✅ Ask before removing inherited features

**DO NOT:**
- ❌ Remove blog/news features
- ❌ Remove admin dashboard/user profile
- ❌ Remove translation system
- ❌ Use `tempone_` prefix anywhere
- ❌ Create new files without user approval
- ❌ Add border-radius (sharp vertical design)
- ❌ Skip SCSS compilation
- ❌ Create individual CSS files per block (use editor-style.scss)
- ❌ Hardcode colors (always use CSS variables)

### Custom Post Types Pattern

When creating new CPTs, follow the established pattern:

**File Location:** `inc/cpt-{name}.php`

**Post Type Slug Convention:** `ane-{name}` (e.g., `ane-service`, `ane-testimoni`)

**Required Steps:**
1. Create CPT registration file in `inc/cpt-{name}.php`
2. Include in `functions.php`: `require_once SARIKA_PATH . '/inc/cpt-{name}.php';`
3. Create archive template: `archive-ane-{name}.php`
4. Create single template: `tp/content-{name}.php`
5. Create taxonomy if needed: `register_taxonomy('service-category', ['ane-service'])`
6. Create taxonomy template if needed: `taxonomy-{tax-name}.php`
7. Always set `'show_in_rest' => true` for Gutenberg support
8. Add flush rewrite hook: `add_action('after_switch_theme', 'sarika_flush_{name}_rewrites')`

**Reference Implementations:**
- Services: `inc/cpt-service.php` (with taxonomy)
- Testimonials: `inc/cpt-testimoni.php` (simple)

### Decision Points (Ask User)

When user requests company profile features, ask:

1. **Implementation method:**
   - CPT (recommended for: services, testimonials, portfolio, team)
   - Gutenberg blocks (recommended for: layout sections, one-off content)
   - ACF Flexible (recommended for: page builder sections)
2. **Layout preference:** Grid, masonry, slider, or custom?
3. **Data source:** Manual input, ACF fields, or custom fields?
4. **Archive needed:** Separate archive pages or just homepage sections?

### Current Limitations

**Known issues inherited from Tempone:**
- Admin panel still references "Tempone Setup" in some places
- Footer mobile menu links still point to `tempone-*` admin pages

**To be fixed in v0.1.1:**
- ✅ Rename `scss/tempone.scss` → `scss/sarika.scss` (DONE)
- ✅ Update `inc/assets.php` CSS enqueue to `sarika.min.css` (DONE)
- ✅ Update logo references from `logo-tempone.svg` → `logo-sarika.svg` (DONE)
  - Updated: `tp/header-site.php` line 29
  - Updated: `inc/admin.php` line 672 (admin bar logo)
- ✅ Fix admin CSS enqueue to use `admin.min.css` (DONE)
  - Updated: `inc/admin/dashboard.php` line 62
  - Updated: `inc/admin/user.php` line 21
  - Changed handle: `tempone-admin` → `sarika-admin`
  - Cleaned up: Removed development CSS files (admin.css, editor-style.css)
- ✅ Rename all CSS classes from `tempone-` → `sarika-` (DONE)
  - Updated: All 10 PHP files in `inc/admin/*.php` (318 occurrences)
  - Updated: All SCSS files in `scss/*.scss`
  - Updated: CSS variables `--tempone-color-*` → `--sarika-color-*`
  - Updated: `inc/acf-layouts.php` dynamic color injection
  - Recompiled: All CSS files (admin.min.css, sarika.min.css, editor-style.min.css)
- Update all admin references from Tempone → Sarika
- Update `inc/admin/README.md` (1,045 lines still reference Tempone)
- Update all JavaScript files text domain and function prefixes
- Update screenshot.jpg

## Testing Checklist

**Before any release:**
- [ ] Activate theme on fresh WordPress install
- [ ] Test blog post creation and display
- [ ] Test page creation with Gutenberg
- [ ] Test admin dashboard analytics
- [ ] Test user profile page
- [ ] Test mobile footer navigation (all 5 items work)
- [ ] Test mobile responsive (≤782px)
- [ ] Test admin menu icons (desktop + mobile drawer)
- [ ] Test translation loading (if translations exist)
- [ ] Check browser console for JS errors
- [ ] Validate HTML/CSS
- [ ] Test with ACF Pro activated

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

### v0.1.2 (2025-01-30) - Current
**Company Profile Features**

- Added Gallery Block with lightbox functionality
- Added Funfact Block with counter animation
- Added Services Custom Post Type with categories
- Added Testimonials Custom Post Type
- Fixed mobile search button visibility
- Fixed block image aspect ratios (4:5 portrait)
- Added glassmorphism effects to Block Image Side Text
- Updated BLOCK-DEVELOPMENT-STANDARD.md with repeater patterns

### v0.1.0 (2025-01-29)
**Initial Release - Fork from Tempone**

- Forked from Tempone v0.1.9
- All `tempone` strings replaced with `sarika`
- 11 custom Gutenberg blocks
- SVG and JSON upload support
- Header overlay mode for glassmorphism effect
- Custom utility classes (no Tailwind runtime)
- All Tempone features retained (100% inheritance)

**See CHANGELOG.md for complete details.**

## Additional Documentation

**Internal Docs:**
- `CLAUDE.md` (this file) - Main theme documentation
- `README.md` - User-facing documentation (installation, features, troubleshooting)
- `CHANGELOG.md` - Complete version history with detailed changes
- `BLOCK-DEVELOPMENT-STANDARD.md` - Gutenberg block development standards
  - CSS architecture (editor-style.scss pattern)
  - File structure for new blocks
  - Repeater field data persistence patterns
  - Visual parity guidelines
- `inc/admin/README.md` - Complete admin customization system guide (1,045 lines)
  - Chart.js integration patterns
  - ACF color system integration
  - SCSS compilation workflow
  - Mobile footer navigation (5-item bottom nav)
  - Design tokens and CSS variables
  - Duplication guide for other themes

**External Resources:**
- WordPress Codex: https://codex.wordpress.org/
- ACF Documentation: https://www.advancedcustomfields.com/resources/
- Chart.js v4.4.0: https://www.chartjs.org/docs/latest/
- SASS/SCSS: https://sass-lang.com/documentation/
- @wordpress/scripts: https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/

**Webane:**
- Company: https://webane.com
- Theme URI: https://webane.com/sarika
- GitHub: https://github.com/webaneid/sarika
- Support: support@webane.com

## Contact

**Developer:** Webane Indonesia
**Theme Repo:** (to be created)
**Issue Tracker:** (to be created)

---

**Last Updated:** 2025-01-29
**Maintained By:** Claude Code + Webane Developer
