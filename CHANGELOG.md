# Changelog

All notable changes to the Sarika WordPress theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Contact form integration (Contact Form 7 / WPForms styling)
- Google Maps integration for location display
- Pricing tables block
- Multi-language support enhancement
- Lottie animation playback component
- Portfolio Custom Post Type
- Team Members Custom Post Type

---

## [0.1.4] - 2025-12-08

### Added

#### Hero Block Enhancement
- **Bottom Gradient Transition** - Optional gradient overlay di bagian bawah hero untuk smooth transition ke section berikutnya
  - New attribute: `ane_gradient_bottom` (boolean, default: false)
  - ToggleControl "Enable Bottom Gradient" di Background Settings panel
  - Gradient direction: bottom to top (0deg)
  - Height: 200px dengan `pointer-events: none`
  - Color variants: dark, body, primary, secondary (mengikuti `ane_color`)
  - Layer order: Background → Overlay (readability) → Gradient bottom (transition) → Content
  - CSS class: `.sarika-hero__gradient-bottom--{color}`
  - Gradient pattern: `rgba(color, 0.9) 0% → rgba(color, 0.6) 40% → transparent 100%`
  - File: `src/blocks/hero/index.js`, `edit.js`, `tp/blocks/block-hero.php`, `scss/_blocks.scss` lines 98-124

### Changed

#### Button Standards Unification
- **All blocks updated** - Standardisasi button implementation across 7 blocks
  - **URLInput instead of TextControl** - Native WordPress page/post search dengan autocomplete
  - **ToggleControl instead of SelectControl** - "Open in new tab" dengan better UX
  - **10 button styles** - Expanded from 4-7 styles ke 10 variants matching `scss/_button.scss`:
    - Primary, Primary Outline
    - Secondary, Secondary Outline
    - White, White Outline
    - Dark, Dark Outline
    - Accent, Accent Outline
  - **Blocks updated:**
    1. Video Background ✅
    2. Block Image Side Text ✅
    3. Block Post ✅
    4. Block Profile ✅ (2 buttons rendered)
    5. Block Text ✅
    6. Icon Description ✅ (item links preview added)
    7. Hero Banner ✅ (LinkControl retained, styles expanded)

#### Block Naming Enhancement
- **All block titles prefixed** - "Sarika -" prefix untuk easy search di block inserter
  - Search "sarika" langsung muncul semua 12 custom blocks
  - Blocks affected:
    - Sarika - Hero Banner
    - Sarika - Image Side Text
    - Sarika - Block Post
    - Sarika - Block Profile
    - Sarika - Block Text
    - Sarika - Client Logos
    - Sarika - FAQ
    - Sarika - Funfact
    - Sarika - Gallery
    - Sarika - Icon & Description
    - Sarika - Container
    - Sarika - Video Background
  - Files: All `src/blocks/*/index.js` title properties

### Fixed

#### Icon Description Block
- **Item link preview** - Link preview sekarang muncul di layout `icon-list`
  - Sebelumnya hanya muncul di layout `icon-description`
  - Preview link added after `</ul>` untuk consistency
  - File: `src/blocks/icon-description/edit.js` lines 898-906

#### Block Profile Button Rendering
- **2-button support** - PHP template sekarang render kedua button
  - Sebelumnya hanya render 1 button
  - React editor sudah support 2 button, PHP template ketinggalan
  - File: `tp/blocks/block-profile.php` lines 94-115

### Technical

#### SCSS Updates
- Added `.sarika-hero__gradient-bottom` styles dengan 4 color variants
- Position: `absolute`, `bottom: 0`, z-index: 2
- Gradient pattern matching Video Background overlay style
- File: `scss/_blocks.scss` lines 98-124

#### Build Output
- Hero block size: 22.5 KiB (increased from 22.1 KiB due to gradient toggle)
- Icon Description block: 31.9 KiB (increased from 31.7 KiB due to link preview)
- All other blocks: Size stable

### Documentation
- No documentation changes in this release
- All changes backwards compatible

---

## [0.1.3] - 2025-12-08

### Added

#### New Gutenberg Block
- **Block Post** - Universal post display block untuk semua post types
  - Mendukung post types: `post`, `ane-service`, `ane-testimoni`, dan custom post types lainnya
  - Layout options: Grid atau Slider (carousel dengan auto-slide 4 detik)
  - Auto-load template berdasarkan post type:
    - `ane-service` → `tp/content-service.php`
    - `ane-testimoni` → `tp/content-ane-testimoni.php`
    - `post` → `tp/content-post.php` (blog dengan overlay style)
    - Custom post types → `tp/content-{post_type}.php`
  - Query options: posts per page, order by, order (ASC/DESC)
  - Header content: Title, Tagline, Description dengan color customization
  - Optional button/link: Link text, URL, target (_blank), button styles (4 variants)
  - Section & container options: Background colors, padding, margin, border radius
  - Alignment options: left, center, right
  - Slider menggunakan existing carousel system (`data-category-carousel`)
  - 2-wrapper pattern untuk overflow control (container + track)
  - Responsive: 4 columns desktop, 2 columns tablet, 1 column mobile

#### New Template Parts
- **tp/content-post.php** - Blog post template dengan overlay style
  - Background image dengan gradient overlay (bottom to top)
  - Responsive image sizes: `sarika-news-lg` (desktop), `sarika-news-md` (mobile)
  - Displays: post title, category, post time
  - White text dengan text-shadow untuk readability
  - Min-height: 400px desktop, 320px mobile
  - Border-radius: 12px (khusus dalam slider context)

### Technical

#### SCSS Architecture
- Added complete `.post-overlay` styles dalam Block Post context (`scss/_blocks.scss` lines 2086-2183)
  - Full styling: gradient, content positioning, typography, meta, responsive breakpoints
  - Context-specific: Hanya apply dalam `.sarika-block-post__slider-track`
  - Tidak mengganggu default `.post-overlay` styles di `_post.scss`

#### Block Development
- Webpack entry: `block-post/index` added to `webpack.config.js`
- Editor styles: `@import '../src/blocks/block-post/editor.scss'` in `editor-style.scss`
- PHP render template: `tp/blocks/block-post.php` dengan WP_Query integration

---

## [0.1.2] - 2025-01-30

### Added

#### New Gutenberg Blocks
- **Gallery Block** - Lightbox photo gallery dengan grid layout
  - Responsive grid columns (2, 3, 4, 5 columns)
  - Lightbox functionality dengan keyboard navigation (← → ESC)
  - Click overlay untuk close lightbox
  - Image counter display (1/10, 2/10, etc.)
  - Smooth fade-in/out animations
  - Mobile-optimized layout
- **Funfact Block** - Animated statistics counter dengan counting animation
  - Repeater items untuk multiple stats (JSON string storage)
  - Number counter animation (counts from 0 to target)
  - Suffix support (%, K, M, X, +, etc.)
  - Intersection Observer - animation triggers on scroll into view
  - Grid layout (2, 3, 4, 5 columns responsive)
  - Customizable colors untuk numbers, labels, descriptions
  - Alignment options (left, center, right)
  - Decimal number support (21.2K works correctly)

#### JavaScript Enhancements
- **Lightbox functionality** (`js/lightbox.js`)
  - Keyboard navigation support
  - Click overlay to close
  - Smooth transitions dengan CSS animations
- **Funfact counter animation** (`js/funfact-counter.js`)
  - Intersection Observer API untuk trigger on scroll
  - Smooth counting animation (2 seconds duration, 60 steps)
  - Decimal number support dengan proper formatting
  - Each counter animates only once (observer unobserve after trigger)

### Fixed

#### Mobile Search Button
- **Search button hidden on mobile** - Fixed visibility issue di header mobile
  - Search button sekarang visible dan berfungsi di ≤782px
  - Position adjusted untuk tidak overlap dengan hamburger menu
  - Proper touch target size untuk mobile usability
  - File: `scss/_header.scss` lines 580-620

#### Block Development Standards
- **Repeater data storage** - Fixed data persistence untuk repeater fields
  - Changed from `type: 'array'` → `type: 'string'` dengan `JSON.stringify()`
  - Matching pattern dari Block Image Side Text (proven working)
  - PHP template decode JSON dengan `json_decode($json, true)`
  - React component parse JSON dengan `JSON.parse(ane_funfact_items)`
  - All update functions stringify before `setAttributes()`
  - File: `src/blocks/funfact/index.js`, `edit.js`, `tp/blocks/block-funfact.php`

#### Gallery Block Fixes
- **Image aspect ratio** - Desktop uses 4:5 portrait ratio, mobile auto height
  - Desktop: `aspect-ratio: 4 / 5` via CSS
  - Mobile: natural image height
  - Responsive `<picture>` element dengan multiple sources
  - File: `scss/_blocks.scss` lines 1477-1520

#### FAQ Block Fixes
- **Image aspect ratio** - Consistent dengan Gallery block pattern
  - Desktop: `aspect-ratio: 4 / 5` portrait
  - Mobile: natural height dengan `border-radius: 10px`
  - File: `scss/_blocks.scss` lines 1151-1163

#### Block Profile Fixes
- **Image aspect ratio** - Matching gallery/FAQ pattern
  - Desktop: `aspect-ratio: 4 / 5` untuk portrait photos
  - Mobile: auto height
  - File: `scss/_blocks.scss` lines 900-913

#### Block Image Side Text Fixes
- **Glassmorphism list items** - Enhanced visual design untuk list mode
  - Background: `rgba(var(--sarika-color-white-rgb), 0.2)`
  - Backdrop filter: `blur(5px)` dengan webkit prefix
  - Box shadow: `0 4px 30px rgba(0, 0, 0, 0.1)`
  - Border: `1px solid rgba(var(--sarika-color-white-rgb), 0.3)`
  - Hover effect: `translateX(4px)`
  - Border radius: `8px`
  - File: `scss/_blocks.scss` lines 750-769 dan 935-951

### Changed

#### Documentation Updates
- **BLOCK-DEVELOPMENT-STANDARD.md** - Added repeater field pattern
  - JSON string storage pattern documented
  - Block Image Side Text example added
  - Parse/stringify workflow explained
  - Best practices untuk data persistence

### Security
- No security changes in this release

---

## [0.1.0] - 2025-01-29

### Initial Release - Fork from Tempone v0.1.9

This is the initial release of Sarika theme, forked from Tempone v0.1.9 with 100% feature inheritance plus new company profile capabilities.

### Added

#### Gutenberg Blocks
- **Hero Block** - Fullscreen hero section dengan image background, title, description, dan CTA button
- **Video Background Block** - YouTube video sebagai fullscreen background dengan overlay gradient (bottom to top)
  - Autoplay, loop, muted video behavior
  - Alignment options (left, center, right)
  - Overlay color options (dark, body, primary, secondary)
  - Responsive: video positioning adjusted untuk mobile
  - Fullscreen 100vh dengan proper aspect ratio coverage
- **Icon & Description Block** - Services/features showcase dengan SVG icon upload support
  - Grid layout (1-4 columns)
  - Alignment options
  - Icon size customization
- **Block Text** - Flexible text content block dengan typography controls
- **Block Profile** - Team member atau testimonial profiles dengan image
- **Block Image Side Text** - Content dengan gambar di kiri/kanan
- **Client Logos Block** - Logo carousel untuk social proof
  - Responsive grid layout
  - Grayscale dengan hover effect
- **FAQ Block** - Accordion-style FAQ dengan expand/collapse functionality

#### Page Templates
- **Page Custom (Full Width)** - Template untuk landing pages dengan blocks
  - No sidebar, no container wrapper
  - Page title dan breadcrumb tersembunyi (SEO-friendly)
  - **Header Overlay Setting** - ACF toggle untuk transparent header over first section

#### Header & Navigation
- **Glassmorphism header design** - One-line layout (Logo | Menu | Search)
  - Background: `rgba(255, 255, 255, 0.85)` dengan `backdrop-filter: blur(20px)`
  - Sticky positioning at top
  - Dropdown submenu support dengan glassmorphism effect
  - **Header Overlay Mode:**
    - Position absolute over first section
    - Transparent background
    - White text color dengan 3D text-shadow effect
    - Perfect untuk hero/video background sections
- **Search functionality** - Toggle search form dengan slide-down animation
- **Mobile menu** - Hamburger toggle dengan slide-down navigation (≤1024px)

#### Media Upload Support
- **SVG Upload** - Sanitized SVG upload support
  - Security: Strips dangerous tags (script, iframe, object, embed, form)
  - Security: Removes event handlers (onclick, onload, etc.)
  - Media library: SVG thumbnails display correctly
  - Auto-detect dimensions from viewBox or width/height
- **JSON/Lottie Upload** - JSON file upload untuk Lottie animations
  - Validation: JSON syntax checking
  - Validation: Verifies Lottie format (must have 'v' version property)

#### Styling System
- **Custom utility classes** following DRY principles (~300 lines SCSS → 6KB CSS)
  - Layout utilities (flex, grid, display)
  - Spacing utilities (padding, margin dengan consistent scale)
  - Typography utilities (font-size, font-weight, text-align, line-height)
  - Color utilities (text, background dengan CSS variables)
  - Border, width/height, position, overflow utilities
  - Responsive utilities (md, lg breakpoints)
  - Transition & animation utilities
- **Monochrome color palette** dengan CSS variables (`--sarika-color-*`)
- **SCSS modular architecture** - 3 main files (sarika.scss, admin.scss, editor-style.scss)
- **Total CSS:** 75KB minified (termasuk semua utilities)

#### Admin Customization (Inherited from Tempone)
- **Custom dashboard** dengan Chart.js analytics
  - Post statistics (total, published, draft, pending)
  - Traffic overview visualization
  - Quick links untuk content management
- **Enhanced user profile page** dengan performance metrics
  - User statistics dan activity charts
  - Post count, comment count visualization
- **Glassmorphism login page** dengan Webane branding
- **Dynamic color system** via ACF fields
  - 6 customizable colors: Primary, Secondary, Dark, Body, Light, Accent
  - Real-time CSS variable injection
- **Mobile footer navigation** (5 menu items, ≤782px)
  - Dashboard, Pages, Create (center, primary), Posts, Settings
  - iPhone safe area support
- **Custom menu icon system** dengan SVG support

#### SEO & Optimization (Inherited from Tempone)
- Open Graph meta tags untuk social sharing
- Dublin Core metadata untuk better indexing
- Citation metadata (AI crawler optimization)
- Enhanced RSS feed
- Schema.org Organization/LocalBusiness markup (adjusted for company profile)

#### Developer Features
- **ACF Pro integration** untuk flexible content dan color customization
- **ACF field registration** via PHP (`inc/acf-fields.php`)
  - Page Custom Settings field group (Header Overlay toggle)
- **Webpack bundling** untuk Gutenberg blocks (multi-entry configuration)
- **SCSS preprocessing** dengan compressed output
- **Translation ready** - i18n support dengan text domain `sarika`
- **GitHub-based auto-update system** (`inc/updater.php`)
  - Checks GitHub releases every 24 hours
  - Update notifications di Appearance → Themes
  - Manual update check: `wp-admin/themes.php?sarika_force_check=1`
  - Debug mode: `wp-admin/themes.php?sarika_debug=1`

### Changed

#### From Tempone to Sarika
- **All function prefixes:** `tempone_` → `sarika_`
- **All CSS classes:** `.tempone-` → `.sarika-`
- **All CSS variables:** `--tempone-color-*` → `--sarika-color-*`
- **Text domain:** `tempone` → `sarika`
- **Constants:** `TEMPONE_*` → `SARIKA_*`
- **Theme slug:** `tempone` → `sarika`
- **Theme name:** Tempone → Sarika
- **Theme description:** News/Magazine → Company Profile
- **Theme tags:** blog, news → business, corporate, company-profile, portfolio
- **Logo files:** `logo-tempone.svg` → `logo-sarika.svg`
- **Admin CSS handle:** `tempone-admin` → `sarika-admin`
- **Main CSS file:** `tempone.min.css` → `sarika.min.css`

#### Styling Improvements
- ❌ **Removed Tailwind CSS CDN** (was 50-80KB runtime overhead)
- ✅ **Custom utility classes** (6KB, no runtime overhead)
- ✅ **SCSS modular architecture** (better maintainability)
- ✅ **All CSS compiled and minified** (development CSS files removed)

### Retained from Tempone

#### Core Systems (100% retained)
- Blog/news loop system dengan featured posts
- Archive templates (category, tag, author, date)
- Post templates dengan multiple layouts (overlay, classic, title, image-side)
- Carousel system (desktop auto-play, mobile swipe)
- Pagination system
- Widget system
- Translation system (files regenerated untuk Sarika)

#### Admin Features (100% retained)
- Custom dashboard design
- Enhanced user profile page
- Mobile footer navigation
- Custom admin menu icons
- Login page glassmorphism
- Gutenberg editor styling

### Fixed
- **Video Background fullscreen coverage** - Fixed aspect ratio calculation
  - Iframe sizing: `width: calc(100vh * (16 / 9))` dan `min-width: 100vw`
  - Parent container: `overflow: hidden` untuk crop excess
  - No black bars di kiri-kanan atau atas-bawah
- **Function redeclaration error** - Moved `sarika_get_youtube_id()` from template to `inc/blocks.php`
- **Header overlay body class** - Moved body_class filter to `inc/acf-layouts.php` (before header renders)
- **CSS compilation** - All SCSS files compiled to .min.css for production

### Security
- SVG sanitization - Strips XSS-prone tags dan event handlers
- JSON validation - Checks syntax dan Lottie format
- WordPress escaping - All output escaped (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`)

### Documentation
- **README.md** - Comprehensive theme documentation dengan installation guide
- **CHANGELOG.md** - Version history (this file)
- **CLAUDE.md** - Development guide (1,800+ lines) dengan architecture overview
- **inc/admin/README.md** - Admin customization system guide (1,045 lines)
- **BLOCK-DEVELOPMENT-STANDARD.md** - Gutenberg block development standards

### Known Issues
- Translation files empty (needs regeneration untuk Indonesian)
- Screenshot.jpg masih screenshot Tempone (needs update)
- Some admin labels masih reference "Tempone Setup" (gradual migration)

---

## Version History Format

### [Version] - YYYY-MM-DD

#### Added
- New features

#### Changed
- Changes in existing functionality

#### Deprecated
- Soon-to-be removed features

#### Removed
- Removed features

#### Fixed
- Bug fixes

#### Security
- Security fixes

---

## Upgrade Guide

### From v0.1.0 to future versions
1. Backup your site (files + database)
2. Go to **Appearance → Themes**
3. Click **Update Available** button when notification appears
4. Theme will auto-update via GitHub releases
5. Clear all caches (browser, WordPress, server)
6. Test all pages and functionality

### Manual Update (if auto-update fails)
1. Backup your site
2. Download latest release ZIP from [GitHub Releases](https://github.com/webaneid/sarika/releases)
3. Go to **Appearance → Themes → Add New → Upload Theme**
4. Choose the ZIP and click **Install Now**
5. Activate theme
6. Clear caches

---

## Contributing

Found a bug or want to suggest a feature? Please create an issue on [GitHub Issues](https://github.com/webaneid/sarika/issues).

---

**Maintained by Webane Indonesia** - https://webane.com
