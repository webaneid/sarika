# Block Development Standard - Sarika Theme

**Version:** 1.0
**Last Updated:** 2025-12-01
**Status:** ✅ PRODUCTION READY

This document defines the **standard operating procedure** for developing custom Gutenberg blocks in Sarika theme. Follow this religiously to ensure consistency, performance, and maintainability.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [CSS Strategy](#css-strategy)
4. [Development Workflow](#development-workflow)
5. [Code Standards](#code-standards)
6. [Testing Checklist](#testing-checklist)
7. [Common Pitfalls](#common-pitfalls)

---

## 🏗️ Architecture Overview

### The Golden Rules

1. **✅ Single Source of Truth** - All editor styles di `scss/editor-style.scss`
2. **✅ Global Utilities** - Defined once, used everywhere
3. **✅ No Duplication** - Block CSS hanya untuk unique styles
4. **✅ Proper Scoping** - `.editor-styles-wrapper` untuk editor
5. **✅ Visual Parity** - Editor harus match dengan frontend

### CSS Loading Flow

```
EDITOR (WordPress Gutenberg):
├── inc/editor.php (enqueue)
├── css/editor-style.min.css (24KB)
│   ├── Button styles (@use 'button')
│   ├── Hero block (imported)
│   ├── Icon Description block (imported)
│   ├── Global utilities (colors, typography, spacing)
│   └── WordPress defaults (headings, paragraphs, etc.)
└── CSS Variables from ACF (injected by inc/acf-layouts.php)

FRONTEND (Public website):
├── inc/assets.php (enqueue)
├── css/sarika.min.css (94KB)
│   ├── Tokens (@use 'tokens')
│   ├── Utilities (@use 'utilities')
│   ├── Typography (@use 'typography')
│   ├── Blocks (@use 'blocks')
│   │   ├── .sarika-hero
│   │   └── .sarika-icon-description
│   └── WordPress overrides
└── CSS Variables from ACF (injected by inc/acf-layouts.php)
```

### Why This Architecture?

**Before (WRONG):**
```
❌ Each block has own CSS file (hero/index.css, icon-description/index.css)
❌ Utilities duplicated in every block
❌ CSS variables hardcoded in block files
❌ Total: 8.87KB per block (bloated!)
❌ Editor conflicts and style bleed
```

**After (CORRECT):**
```
✅ All blocks import to editor-style.scss
✅ Utilities defined once in global section
✅ CSS variables from ACF (dynamic)
✅ Total: 4.16KB per block (52% smaller!)
✅ Zero conflicts, perfect visual parity
```

---

## 📁 File Structure

### For Each New Block

```
src/blocks/[block-name]/
├── index.js          # Block registration
├── edit.js           # Editor component (React)
├── editor.scss       # Editor-specific styles (MINIMAL!)
└── block.json        # Block metadata (optional)

scss/
├── editor-style.scss # ADD IMPORT HERE
└── _blocks.scss      # ADD FRONTEND STYLES HERE

tp/blocks/
└── block-[name].php  # PHP render template

inc/
└── blocks.php        # Register block + enqueue JS
```

### Required Files for New Block

| File | Purpose | Size Guide |
|------|---------|------------|
| `src/blocks/[name]/index.js` | Register block, define attributes | ~100 lines |
| `src/blocks/[name]/edit.js` | React editor component | ~300-500 lines |
| `src/blocks/[name]/editor.scss` | **ONLY unique block styles** | <50 lines |
| `scss/_blocks.scss` | Frontend block styles | ~200-300 lines |
| `tp/blocks/block-[name].php` | PHP render template | ~150-250 lines |

---

## 🎨 CSS Strategy

### 1. Editor CSS (src/blocks/[name]/editor.scss)

**❌ WRONG - Don't do this:**
```scss
// DON'T DEFINE UTILITIES IN BLOCK FILE!
.wp-block-sarika-[name] {
  --sarika-color-primary: #2d232e;  // ❌ NO!

  .text-primary { ... }              // ❌ NO!
  .bg-primary { ... }                // ❌ NO!
  .padding-top-large { ... }         // ❌ NO!
  .title-hero { ... }                // ❌ NO!
}
```

**✅ CORRECT - Only unique block styles:**
```scss
/**
 * [Block Name] - Editor Styles
 *
 * NOTE: Global utilities are loaded from editor-style.scss.
 * This file only contains block-specific styles.
 *
 * @package sarika
 */

.sarika-[block-name] {
  // Only unique block structure
  display: grid;
  gap: 2rem;

  &__header {
    max-width: 800px;
    margin: 0 auto;
  }

  &__item {
    padding: 2rem;
    background: rgba(var(--sarika-color-white-rgb), 0.7);
    backdrop-filter: blur(10px);

    &:hover {
      transform: translateY(-8px);
    }
  }
}
```

### 2. Global Utilities (scss/editor-style.scss)

**ADD YOUR BLOCK IMPORT:**
```scss
/* Import custom blocks */
@import '../src/blocks/hero/editor.scss';
@import '../src/blocks/icon-description/editor.scss';
@import '../src/blocks/[NEW-BLOCK]/editor.scss';  // ✅ ADD HERE
```

**AVAILABLE UTILITIES (already defined, just use!):**
```scss
/* Text Colors */
.text-primary, .text-secondary, .text-body, .text-light, .text-dark,
.text-accent, .text-white, .text-black

/* Background Colors */
.bg-primary, .bg-secondary, .bg-light, .bg-dark, .bg-accent,
.bg-white, .bg-black, .bg-transparent

/* Typography */
.title-hero       // 2rem → 3.5rem (responsive)
.title-body       // 1.75rem → 2.5rem
.title-desc       // 1.125rem → 1.5rem
.title-small      // 1rem → 1.25rem
.title-tagline    // Poppins font family
.desc             // 1rem → 1.125rem

/* Spacing */
.padding-top-medium       // 3rem (1rem mobile)
.padding-top-large        // 5rem (1rem mobile)
.padding-bottom-medium    // 3rem (1rem mobile)
.padding-bottom-large     // 5rem (1rem mobile)
.margin-bottom-zero       // 0
.margin-bottom-medium     // 3rem (1rem mobile)
.margin-bottom-large      // 5rem (1rem mobile)

/* Special */
.text-gradient    // Primary → Secondary gradient
```

### 3. Frontend CSS (scss/_blocks.scss)

**ADD FRONTEND STYLES:**
```scss
// File: scss/_blocks.scss (line ~500+)

/**
 * [Block Name] Block
 * Matches editor styles for visual parity
 */
.sarika-[block-name] {
  padding: 4rem 0;
  margin-bottom: 4rem;

  // Same structure as editor.scss
  &__header {
    max-width: 800px;
    margin: 0 auto 3rem;
  }

  &__item {
    padding: 2.5rem 2rem;
    background: rgba(var(--sarika-color-white-rgb), 0.7);
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 32px rgba(var(--sarika-color-dark-rgb), 0.12);
    }

    @media (max-width: 768px) {
      padding: 2rem 1.5rem;
    }
  }
}
```

**IMPORTANT:** Frontend dan editor HARUS identik untuk visual parity!

---

## 🔧 Development Workflow

### Step 1: Create Block Files

```bash
# 1. Create block directory
mkdir -p src/blocks/[block-name]

# 2. Create required files
touch src/blocks/[block-name]/index.js
touch src/blocks/[block-name]/edit.js
touch src/blocks/[block-name]/editor.scss

# 3. Create PHP template
touch tp/blocks/block-[block-name].php
```

### Step 2: Define Block (index.js)

```javascript
import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import Edit from './edit';

registerBlockType('sarika/[block-name]', {
  title: '[Block Title]',
  category: 'sarika-sections',
  icon: 'grid-view',
  description: 'Block description - Standard template for all sections.',
  supports: {
    align: ['full', 'wide'],
    anchor: true,
  },
  attributes: {
    // Header fields
    ane_title: { type: 'string', default: '' },
    ane_tagline: { type: 'string', default: '' },
    ane_description: { type: 'string', default: '' },

    // Block Options
    ane_background_color: { type: 'string', default: '' },
    ane_padding_top: { type: 'string', default: 'large' },
    ane_padding_bottom: { type: 'string', default: 'large' },
    ane_margin_bottom: { type: 'string', default: 'large' },

    // Title Options
    ane_title_size: { type: 'string', default: 'small' },
    ane_title_color: { type: 'string', default: '' },

    // Tagline Options
    ane_tagline_size: { type: 'string', default: 'hero' },
    ane_tagline_color: { type: 'string', default: 'primary' },

    // Description Options
    ane_description_color: { type: 'string', default: '' },

    // Layout Options
    ane_alignment: { type: 'string', default: 'center' },
    ane_button_style: { type: 'string', default: 'primary' },

    // Custom attributes...
  },
  edit: Edit,
  save: () => null,  // Dynamic render via PHP
});
```

### Step 3: Build Editor Component (edit.js)

```javascript
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPicker } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    ane_background_color,
    ane_padding_top,
    ane_title_size,
    ane_title_color,
    // ... destructure all attributes
  } = attributes;

  // Build block classes
  let blockClasses = `sarika-[block-name]`;
  blockClasses += ` padding-top-${ane_padding_top}`;
  blockClasses += ` padding-bottom-${ane_padding_bottom}`;
  blockClasses += ` margin-bottom-${ane_margin_bottom}`;

  if (ane_background_color && !ane_background_color.startsWith('#')) {
    blockClasses += ` bg-${ane_background_color}`;
  }

  const blockProps = useBlockProps({ className: blockClasses });

  // Build inline styles for custom colors
  const blockStyle = {};
  if (ane_background_color?.startsWith('#')) {
    blockStyle.backgroundColor = ane_background_color;
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Block Options', 'sarika')} initialOpen={true}>
          <SelectControl
            label={__('Background Color', 'sarika')}
            value={ane_background_color}
            options={[
              { label: __('None', 'sarika'), value: '' },
              { label: __('Primary', 'sarika'), value: 'primary' },
              { label: __('Secondary', 'sarika'), value: 'secondary' },
              { label: __('Light', 'sarika'), value: 'light' },
              { label: __('Dark', 'sarika'), value: 'dark' },
              { label: __('Accent', 'sarika'), value: 'accent' },
              { label: __('Custom Color', 'sarika'), value: 'custom' },
            ]}
            onChange={(value) => setAttributes({
              ane_background_color: value === 'custom' ? '#ffffff' : value
            })}
          />

          {ane_background_color?.startsWith('#') && (
            <ColorPicker
              color={ane_background_color}
              onChangeComplete={(color) => setAttributes({
                ane_background_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
              })}
              disableAlpha={false}
            />
          )}

          {/* More controls... */}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps} style={blockStyle}>
        {/* Block preview markup */}
      </div>
    </>
  );
}
```

### Step 4: Minimal Editor SCSS

```scss
/**
 * [Block Name] - Editor Styles
 *
 * NOTE: Global utilities loaded from editor-style.scss.
 * Only block-specific styles here.
 */

.sarika-[block-name] {
  display: grid;
  gap: 2rem;

  &__header {
    max-width: 800px;
    margin: 0 auto 3rem;
  }

  &__item {
    padding: 2rem;
    background: rgba(var(--sarika-color-white-rgb), 0.7);
    backdrop-filter: blur(10px);
  }
}
```

### Step 5: Add to Editor Style

```scss
// File: scss/editor-style.scss (line ~18)

/* Import custom blocks */
@import '../src/blocks/hero/editor.scss';
@import '../src/blocks/icon-description/editor.scss';
@import '../src/blocks/[NEW-BLOCK]/editor.scss';  // ✅ ADD THIS
```

### Step 6: Add Frontend Styles

```scss
// File: scss/_blocks.scss (end of file)

/**
 * [Block Name] Block - Frontend
 * Matches editor for visual parity
 */
.sarika-[block-name] {
  // Same styles as editor.scss
  // Add responsive breakpoints

  @media (max-width: 1024px) {
    // Tablet adjustments
  }

  @media (max-width: 768px) {
    // Mobile adjustments
  }
}
```

### Step 7: Create PHP Template

```php
<?php
/**
 * Block: [Block Name]
 *
 * @package sarika
 */

// Get attributes
$background_color = $attributes['ane_background_color'] ?? '';
$padding_top = $attributes['ane_padding_top'] ?? 'large';
$padding_bottom = $attributes['ane_padding_bottom'] ?? 'large';
$margin_bottom = $attributes['ane_margin_bottom'] ?? 'large';

// Build classes
$classes = 'sarika-[block-name]';
$classes .= ' padding-top-' . esc_attr( $padding_top );
$classes .= ' padding-bottom-' . esc_attr( $padding_bottom );
$classes .= ' margin-bottom-' . esc_attr( $margin_bottom );

// Handle background color
$inline_style = '';
if ( $background_color ) {
  if ( strpos( $background_color, '#' ) === 0 || strpos( $background_color, 'rgb' ) === 0 ) {
    $inline_style = 'background-color: ' . esc_attr( $background_color ) . ';';
  } else {
    $classes .= ' bg-' . esc_attr( $background_color );
  }
}
?>

<section class="<?php echo esc_attr( $classes ); ?>" <?php echo $inline_style ? 'style="' . esc_attr( $inline_style ) . '"' : ''; ?>>
  <div class="container">
    <!-- Block markup -->
  </div>
</section>
```

### Step 8: Register Block

```php
// File: inc/blocks.php (add to sarika_register_blocks function)

register_block_type( SARIKA_PATH . '/src/blocks/[block-name]', [
  'render_callback' => 'sarika_render_[block_name]_block',
] );

function sarika_render_[block_name]_block( $attributes ) {
  ob_start();
  include SARIKA_PATH . '/tp/blocks/block-[block-name].php';
  return ob_get_clean();
}
```

### Step 9: Enqueue JS

```php
// File: inc/blocks.php (add to sarika_enqueue_block_editor_assets function)

// [Block Name] block.
$[block_name]_asset_file = SARIKA_PATH . '/build/[block-name]/index.asset.php';

if ( file_exists( $[block_name]_asset_file ) ) {
  $asset = require $[block_name]_asset_file;

  wp_enqueue_script(
    'sarika-[block-name]-block-editor',
    SARIKA_URI . '/build/[block-name]/index.js',
    $asset['dependencies'],
    $asset['version'],
    true
  );
}
```

### Step 10: Compile & Test

```bash
# 1. Build React blocks
npm run build

# 2. Compile SCSS
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed
npx sass scss/sarika.scss css/sarika.min.css --style=compressed

# 3. Test in WordPress
# - Refresh editor
# - Add block
# - Test all options
# - Check frontend
```

---

## 📏 Code Standards

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Block slug | `sarika/[name]` | `sarika/icon-description` |
| Attribute | `ane_[name]` | `ane_background_color` |
| CSS class | `.sarika-[block]__[element]` | `.sarika-hero__title` |
| PHP function | `sarika_[block]_[action]` | `sarika_render_hero_block` |
| JS handle | `sarika-[block]-block-editor` | `sarika-hero-block-editor` |

### Attribute Naming Standard

```javascript
// ALWAYS use ane_ prefix for ALL attributes
attributes: {
  // Header (common to all blocks)
  ane_title: { type: 'string', default: '' },
  ane_tagline: { type: 'string', default: '' },
  ane_description: { type: 'string', default: '' },
  ane_button_link: { type: 'object', default: { title: '', url: '', target: '' } },
  ane_button2_link: { type: 'object', default: { title: '', url: '', target: '' } },

  // Block Options (standardized)
  ane_background_color: { type: 'string', default: '' },
  ane_padding_top: { type: 'string', default: 'large' },
  ane_padding_bottom: { type: 'string', default: 'large' },
  ane_margin_bottom: { type: 'string', default: 'large' },

  // Title Options (standardized)
  ane_title_size: { type: 'string', default: 'small' },
  ane_title_color: { type: 'string', default: '' },

  // Tagline Options (standardized)
  ane_tagline_size: { type: 'string', default: 'hero' },
  ane_tagline_color: { type: 'string', default: 'primary' },

  // Description Options (standardized)
  ane_description_color: { type: 'string', default: '' },

  // Layout (common)
  ane_alignment: { type: 'string', default: 'center' },
  ane_columns: { type: 'string', default: '3' },
  ane_button_style: { type: 'string', default: 'primary' },

  // Block-specific attributes
  ane_[custom_field]: { type: 'string', default: '' },
}
```

### Color Picker Pattern

**ALWAYS use this pattern for color selection:**

```javascript
<SelectControl
  label={__('Color', 'sarika')}
  value={ane_color}
  options={[
    { label: __('Default', 'sarika'), value: '' },
    { label: __('Primary (Branding)', 'sarika'), value: 'primary' },
    { label: __('Secondary', 'sarika'), value: 'secondary' },
    { label: __('Body Text', 'sarika'), value: 'body' },
    { label: __('Light', 'sarika'), value: 'light' },
    { label: __('Dark', 'sarika'), value: 'dark' },
    { label: __('Accent', 'sarika'), value: 'accent' },
    { label: __('White', 'sarika'), value: 'white' },
    { label: __('Black', 'sarika'), value: 'black' },
    { label: __('Gradient (Primary → Secondary)', 'sarika'), value: 'gradient' },
    { label: __('Custom Color', 'sarika'), value: 'custom' },
  ]}
  onChange={(value) => setAttributes({
    ane_color: value === 'custom' ? '#000000' : value
  })}
/>

{/* Show ColorPicker only for custom colors */}
{ane_color && (ane_color.startsWith('#') || ane_color.startsWith('rgb')) && (
  <div style={{ marginTop: '12px', padding: '12px', border: '1px solid #ddd' }}>
    <ColorPicker
      color={ane_color}
      onChangeComplete={(color) => setAttributes({
        ane_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      })}
      disableAlpha={false}
    />
  </div>
)}
```

### PHP Color Handling Pattern

```php
// Helper function to get color class or inline style
function get_color_class_and_style( $color ) {
  $class = '';
  $style = '';

  if ( $color ) {
    if ( strpos( $color, '#' ) === 0 || strpos( $color, 'rgb' ) === 0 ) {
      // Custom color - use inline style
      $style = 'color: ' . esc_attr( $color ) . ';';
    } elseif ( $color === 'gradient' ) {
      // Gradient class
      $class = 'text-gradient';
    } else {
      // Predefined color class
      $class = 'text-' . esc_attr( $color );
    }
  }

  return [ $class, $style ];
}

// Usage
list( $title_class, $title_style ) = get_color_class_and_style( $title_color );
echo '<h2 class="' . esc_attr( $title_class ) . '" style="' . esc_attr( $title_style ) . '">';
```

---

## ✅ Testing Checklist

### Before Committing Code

- [ ] **Build Success** - `npm run build` completes without errors
- [ ] **SCSS Compile** - Both editor-style and sarika compile successfully
- [ ] **Editor Load** - Block appears in inserter
- [ ] **Editor Preview** - All options display correctly in editor
- [ ] **Color Utilities** - Predefined colors (primary, secondary, etc.) work
- [ ] **Custom Colors** - ColorPicker works and applies correctly
- [ ] **Gradient** - Gradient option works if implemented
- [ ] **Spacing** - Padding/margin options work
- [ ] **Frontend Render** - PHP template renders correctly
- [ ] **Visual Parity** - Editor and frontend look identical
- [ ] **Responsive** - Mobile (≤768px) and desktop work
- [ ] **No Console Errors** - Browser console clean
- [ ] **No PHP Errors** - WordPress debug.log clean
- [ ] **Other Blocks** - Hero and Icon Description still work (no conflicts)

### Cross-Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

### Performance Check

```bash
# Check file sizes
ls -lh css/*.min.css
ls -lh build/*/*.css
ls -lh build/*/*.js

# Expected sizes:
# - editor-style.min.css: ~24-30KB (grows with each block)
# - sarika.min.css: ~90-100KB (grows with each block)
# - block index.css: ~4-6KB (should be SMALL!)
# - block index.js: ~8-20KB (depends on complexity)
```

---

## ⚠️ Common Pitfalls

### 1. ❌ DON'T Define Utilities in Block CSS

**WRONG:**
```scss
// src/blocks/myblock/editor.scss
.wp-block-sarika-myblock {
  .text-primary { color: var(--sarika-color-primary); }  // ❌ NO!
  .bg-white { background: white; }                        // ❌ NO!
}
```

**CORRECT:**
```scss
// src/blocks/myblock/editor.scss
.sarika-myblock {
  // Only unique block styles
  display: grid;
  gap: 2rem;
}
```

### 2. ❌ DON'T Forget to Import Block to editor-style.scss

```scss
// scss/editor-style.scss
@import '../src/blocks/hero/editor.scss';
@import '../src/blocks/icon-description/editor.scss';
// ❌ FORGOT TO ADD NEW BLOCK - STYLES WON'T LOAD!
```

### 3. ❌ DON'T Use Different Class Names in Editor vs Frontend

**WRONG:**
```javascript
// edit.js
className="my-custom-block"  // ❌ Different!
```

```php
// PHP template
class="sarika-myblock"  // ❌ Different!
```

**CORRECT:**
```javascript
// edit.js
className="sarika-myblock"  // ✅ Same!
```

```php
// PHP template
class="sarika-myblock"  // ✅ Same!
```

### 4. ❌ DON'T Enqueue Block CSS Files

```php
// inc/blocks.php
wp_enqueue_style(
  'sarika-myblock',
  SARIKA_URI . '/build/myblock/index.css'  // ❌ NO! Causes conflicts!
);
```

**CORRECT:**
```php
// inc/blocks.php
// NOTE: Block editor styles DISABLED - using editor-style.scss instead.
// Only enqueue JavaScript, NOT CSS!
```

### 5. ❌ DON'T Use Hardcoded Colors

**WRONG:**
```scss
.sarika-myblock__title {
  color: #2d232e;  // ❌ Hardcoded!
}
```

**CORRECT:**
```scss
.sarika-myblock__title {
  color: var(--sarika-color-primary);  // ✅ Use CSS variable!
}
```

### 6. ❌ DON'T Forget Mobile Responsive

**WRONG:**
```scss
.sarika-myblock {
  padding: 5rem 0;  // ❌ Same on mobile!
}
```

**CORRECT:**
```scss
.sarika-myblock {
  padding: 5rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;  // ✅ Smaller on mobile
  }
}
```

### 7. ❌ DON'T Skip Compilation

```bash
# After editing SCSS, ALWAYS compile:
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed
npx sass scss/sarika.scss css/sarika.min.css --style=compressed

# After editing React files, ALWAYS build:
npm run build
```

---

## 🎯 Success Metrics

A well-built block should achieve:

- ✅ **Editor CSS Size:** <6KB (block-specific only, no utilities)
- ✅ **Zero Console Errors:** Clean browser console
- ✅ **Visual Parity:** Editor = Frontend (pixel perfect)
- ✅ **No Conflicts:** Other blocks unaffected
- ✅ **Fast Load:** <100ms render time
- ✅ **Mobile-First:** Works perfectly ≤768px

---

## 📚 Reference Blocks

### Perfect Examples to Study

1. **Hero Block** - Complex with image upload, overlay, alignment
2. **Icon Description Block** - Repeater, color options, spacing

**Study these files:**
```
src/blocks/hero/edit.js              # React patterns
src/blocks/hero/editor.scss          # Minimal CSS
src/blocks/icon-description/edit.js  # Color picker, spacing
scss/editor-style.scss               # Global utilities
scss/_blocks.scss                    # Frontend styles
tp/blocks/block-hero.php             # PHP rendering
tp/blocks/block-icon-description.php # PHP with loops
```

---

## 🚀 Quick Start Template

Copy this to start a new block:

```bash
# 1. Copy template
cp -r src/blocks/icon-description src/blocks/my-new-block

# 2. Find and replace
# "icon-description" → "my-new-block"
# "Icon & Description" → "My New Block"
# "Icon grid section" → "My block description"

# 3. Update editor-style.scss
# Add: @import '../src/blocks/my-new-block/editor.scss';

# 4. Add to _blocks.scss
# Add frontend styles at end of file

# 5. Register in inc/blocks.php

# 6. Build and compile
npm run build
npx sass scss/editor-style.scss css/editor-style.min.css --style=compressed
npx sass scss/sarika.scss css/sarika.min.css --style=compressed

# 7. Test in WordPress
```

---

## 📞 Troubleshooting

### Block Not Showing in Editor

1. Check `npm run build` success
2. Check `inc/blocks.php` registration
3. Check JavaScript console for errors
4. Check block category exists

### Styles Not Applying in Editor

1. Check `editor-style.scss` import added
2. Check `npx sass` compilation success
3. Check CSS file size increased
4. Check browser cache (hard refresh)
5. Check CSS selector specificity

### Utilities Not Working

1. Check using `.editor-styles-wrapper` prefix
2. Check color variables injected from ACF
3. Check `!important` flag on utilities
4. Check class name spelling

### Frontend Different from Editor

1. Check same class names used
2. Check `_blocks.scss` has same styles
3. Check frontend CSS compiled
4. Check PHP template uses correct classes
5. Check responsive breakpoints match

---

## 🎓 Training Resources

- **WordPress Block Editor Handbook:** https://developer.wordpress.org/block-editor/
- **React Documentation:** https://react.dev/
- **SCSS Guide:** https://sass-lang.com/guide
- **Sarika CLAUDE.md:** Complete theme documentation

---

**Version History:**
- v1.0 (2025-12-01) - Initial standard based on Hero + Icon Description blocks

**Maintained by:** Webane Indonesia
**Questions?** Refer to `/Applications/MAMP/htdocs/sarika/wp-content/themes/sarika/CLAUDE.md`
