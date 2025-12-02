# Sarika WordPress Theme

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![WordPress](https://img.shields.io/badge/wordpress-6.0%2B-blue.svg)
![PHP](https://img.shields.io/badge/php-7.4%2B-purple.svg)
![License](https://img.shields.io/badge/license-GPL--2.0%2B-green.svg)

**Sarika** adalah tema WordPress premium untuk Company Profile yang dikembangkan oleh **Webane Indonesia**. Theme ini memberikan citra profesional, modern, dan berkelas untuk bisnis Anda.

## ✨ Features

### 🎨 Design & Layout
- **Glassmorphism header** dengan transparansi dan blur effect
- **Header overlay mode** untuk hero/video background sections
- **Mobile-first responsive design** (optimized untuk semua device)
- **Custom utility classes** following DRY principles
- **Monochrome color palette** dengan CSS variables

### 📦 Gutenberg Blocks
- **Hero Block** - Fullscreen hero section dengan gambar/video background
- **Video Background Block** - YouTube video sebagai fullscreen background
- **Icon & Description Block** - Services/features showcase dengan icon
- **Block Text** - Flexible text block dengan alignment options
- **Block Profile** - Team member atau testimonial profiles
- **Block Image Side Text** - Content dengan gambar di samping
- **Client Logos** - Logo carousel untuk social proof
- **FAQ Block** - Accordion-style frequently asked questions

### ⚙️ Admin Customization
- **Custom dashboard** dengan Chart.js analytics
- **Enhanced user profile** page dengan performance stats
- **Glassmorphism login page** dengan Webane branding
- **Dynamic color system** via ACF fields (6 color variables)
- **Mobile footer navigation** (5 menu items, iPhone safe area support)
- **Custom menu icon system** dengan SVG support

### 🚀 Performance & SEO
- **Lightweight CSS** (~75KB minified, no Tailwind runtime overhead)
- **Optimized SCSS architecture** dengan modular structure
- **Open Graph meta tags** untuk social sharing
- **Dublin Core metadata** untuk better indexing
- **Citation metadata** (AI crawler optimization)
- **Enhanced RSS feed**
- **Schema.org markup** (Organization/LocalBusiness)

### 🛠️ Developer Features
- **ACF Pro integration** untuk flexible content
- **Webpack bundling** untuk Gutenberg blocks
- **SCSS preprocessing** dengan compressed output
- **Translation ready** (i18n support)
- **GitHub-based auto-update system**
- **WordPress Coding Standards** compliant

## 📋 Requirements

- **WordPress:** 6.0 or higher
- **PHP:** 7.4 or higher
- **ACF Pro:** Required for full functionality
- **Node.js:** For block development (optional)

## 📦 Installation

### Method 1: WordPress Admin Upload
1. Download the latest release ZIP from [GitHub Releases](https://github.com/webaneid/sarika/releases)
2. Go to **Appearance → Themes → Add New → Upload Theme**
3. Choose the ZIP file and click **Install Now**
4. Activate the theme

### Method 2: Manual Installation
1. Download and extract the ZIP file
2. Upload the `sarika` folder to `/wp-content/themes/`
3. Go to **Appearance → Themes** and activate **Sarika**

### Method 3: Git Clone (for developers)
```bash
cd wp-content/themes/
git clone https://github.com/webaneid/sarika.git
cd sarika
npm install  # if you want to develop blocks
```

## 🔧 Setup

### 1. Install ACF Pro Plugin
Download and install [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/) - required for color customization and flexible content.

### 2. Import ACF Field Groups (if provided)
Go to **Custom Fields → Tools → Import** and import ACF JSON files if included.

### 3. Configure Theme Settings
Go to **Sarika Setup** in WordPress admin to configure:
- General settings
- Customer care information
- SEO & Schema settings
- Color customization (6 dynamic colors)

### 4. Create Menus
1. Go to **Appearance → Menus**
2. Create a menu and assign to **Primary Menu** location
3. Add menu items (supports sub-menus)

### 5. Build Blocks (for development)
```bash
npm install
npm run build
```

## 🎨 Using Gutenberg Blocks

All custom blocks are available in the **Sarika Sections** category in the Block Editor.

### Video Background Block Example:
1. Add **Video Background** block
2. Enter YouTube URL
3. Add title, description, and button text
4. Choose overlay color (dark, body, primary, secondary)
5. Set alignment (left, center, right)

### Header Overlay Feature:
1. Create/edit page with **Page Custom (Full Width)** template
2. In sidebar, toggle **Header Overlay** ON
3. Header will become transparent and overlay first section
4. Perfect for hero/video backgrounds!

## 🔄 Auto-Update System

Sarika includes a **GitHub-based auto-update system**:

### How It Works:
1. Theme checks GitHub releases every 24 hours
2. If new version available, notification appears in **Appearance → Themes**
3. Click **Update Available** to install the latest version
4. Theme updates automatically like WordPress.org themes

### Manual Update Check:
Visit: `wp-admin/themes.php?sarika_force_check=1`

### Debug Update Info:
Visit: `wp-admin/themes.php?sarika_debug=1`

### Requirements for Updates:
- Theme must be activated
- Server must have internet access to GitHub API
- GitHub repository must have **Releases** with ZIP assets

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## 🏗️ Development

### File Structure
```
sarika/
├── functions.php           # Bootstrap
├── style.css              # Theme header
├── /inc                   # PHP functions
│   ├── setup.php          # Theme supports
│   ├── assets.php         # Enqueue CSS/JS
│   ├── blocks.php         # Gutenberg blocks
│   ├── acf-layouts.php    # ACF helpers
│   ├── acf-fields.php     # ACF field registration
│   ├── updater.php        # Auto-update system
│   └── /admin            # Admin customization
├── /tp                    # Template parts
├── /scss                  # SCSS source files
├── /css                   # Compiled CSS
├── /js                    # JavaScript files
├── /src/blocks           # Gutenberg blocks source
├── /build                # Compiled blocks
└── /languages            # Translation files
```

### Compile SCSS
```bash
# Main theme styles
npx sass scss/sarika.scss css/sarika.min.css --style=compressed

# Admin styles
npx sass scss/admin.scss css/admin.min.css --style=compressed

# Editor styles
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed

# Watch mode (auto-compile on save)
npx sass scss/sarika.scss css/sarika.min.css --style=compressed --watch
```

### Build Gutenberg Blocks
```bash
# Development build with watch
npm start

# Production build (minified)
npm run build
```

### Coding Standards
```bash
# PHP CodeSniffer (WordPress standards)
phpcs --standard=WordPress inc/ functions.php

# Auto-fix issues
phpcbf --standard=WordPress inc/ functions.php
```

## 🌐 Translation

Sarika is translation-ready. To translate:

### Using Loco Translate Plugin:
1. Install **Loco Translate** plugin
2. Go to **Loco Translate → Themes → Sarika**
3. Create new language (e.g., Indonesian - id_ID)
4. Translate strings
5. Save and activate

### Manual Translation:
```bash
# Generate POT template
wp i18n make-pot . languages/sarika.pot --domain=sarika

# Create PO file for your language
# Use Poedit to translate

# Compile MO file
wp i18n make-mo languages/
```

## 📚 Documentation

For detailed documentation, visit:
- **Theme Documentation:** [CLAUDE.md](CLAUDE.md) (comprehensive development guide)
- **Admin System:** `inc/admin/README.md` (1,045 lines admin customization guide)
- **Block Development:** [BLOCK-DEVELOPMENT-STANDARD.md](BLOCK-DEVELOPMENT-STANDARD.md)

## 🐛 Troubleshooting

### Theme not updating?
1. Check GitHub releases: https://github.com/webaneid/sarika/releases
2. Force update check: `wp-admin/themes.php?sarika_force_check=1`
3. Debug update info: `wp-admin/themes.php?sarika_debug=1`

### Blocks not appearing?
1. Ensure ACF Pro is installed and activated
2. Run `npm run build` to compile blocks
3. Clear browser cache and WordPress cache

### Styles not applying?
1. Compile SCSS: `npx sass scss/sarika.scss css/sarika.min.css --style=compressed`
2. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Clear WordPress cache

### Header overlay not working?
1. Check ACF Pro is activated
2. Ensure page uses **Page Custom (Full Width)** template
3. Toggle **Header Overlay** in page editor sidebar

## 🤝 Support

For support, bug reports, or feature requests:
- **GitHub Issues:** https://github.com/webaneid/sarika/issues
- **Email:** support@webane.com
- **Website:** https://webane.com

## 📄 License

This theme is licensed under the **GNU General Public License v2 or later**.

```
Copyright (C) 2025 Webane Indonesia

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

## 👨‍💻 Credits

**Developed by:**
- **Webane Indonesia** - https://webane.com
- **Theme Repository:** https://github.com/webaneid/sarika

**Special Thanks:**
- Forked from **Tempone v0.1.9** (news/magazine theme)
- Maintained 100% Tempone features + added company profile capabilities

## 🔗 Links

- **Theme URI:** https://webane.com/sarika
- **GitHub:** https://github.com/webaneid/sarika
- **Demo:** (coming soon)
- **Documentation:** [CLAUDE.md](CLAUDE.md)

---

**Made with ❤️ by Webane Indonesia**
