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

---

## 🎯 Standard Block Options (MUST FOLLOW!)

### 1. Container Options - STANDARDIZED PATTERN

**ALL blocks MUST include these container options:**

#### Attributes (index.js)

```javascript
attributes: {
  // Container Options (REQUIRED for all blocks)
  ane_container_background: { type: 'string', default: '' },
  ane_container_border_radius: { type: 'number', default: 0 },
  ane_container_padding: { type: 'number', default: 0 },
}
```

#### React Component Pattern (edit.js)

```javascript
import { useState } from '@wordpress/element';
import { RangeControl, SelectControl, Button, ColorPicker } from '@wordpress/components';

const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);

const predefinedColors = [
  { label: __('Transparent', 'sarika'), value: '' },
  { label: __('White', 'sarika'), value: 'white' },
  { label: __('Black', 'sarika'), value: 'black' },
  { label: __('Primary', 'sarika'), value: 'primary' },
  { label: __('Secondary', 'sarika'), value: 'secondary' },
  { label: __('Light', 'sarika'), value: 'light' },
  { label: __('Dark', 'sarika'), value: 'dark' },
  { label: __('Accent', 'sarika'), value: 'accent' },
  { label: __('Gradient Primary', 'sarika'), value: 'gradient-primary' },
  { label: __('Gradient Dark', 'sarika'), value: 'gradient-dark' },
];

// In InspectorControls:
<PanelBody title={__('Container Settings', 'sarika')} initialOpen={false}>
  <SelectControl
    label={__('Container Background', 'sarika')}
    value={ane_container_background}
    options={predefinedColors}
    onChange={(value) => setAttributes({ ane_container_background: value })}
  />

  {ane_container_background && (
    <div style={{ marginTop: '12px' }}>
      <Button
        variant="secondary"
        onClick={() => setShowContainerColorPicker(!showContainerColorPicker)}
      >
        {__('Custom Color Picker', 'sarika')}
      </Button>

      {showContainerColorPicker && (
        <ColorPicker
          color={ane_container_background}
          onChangeComplete={(color) => {
            setAttributes({
              ane_container_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
            });
          }}
          disableAlpha={false}
        />
      )}
    </div>
  )}

  <RangeControl
    label={__('Border Radius (px)', 'sarika')}
    value={ane_container_border_radius}
    onChange={(value) => setAttributes({ ane_container_border_radius: value })}
    min={0}
    max={50}
    step={1}
  />

  <RangeControl
    label={__('Container Padding (px)', 'sarika')}
    value={ane_container_padding}
    onChange={(value) => setAttributes({ ane_container_padding: value })}
    min={0}
    max={100}
    step={5}
  />
</PanelBody>
```

#### PHP Template Pattern

```php
<?php
// Container options
$container_bg     = $attrs['ane_container_background'] ?? '';
$container_radius = $attrs['ane_container_border_radius'] ?? 0;
$container_padding = $attrs['ane_container_padding'] ?? 0;

// Build container classes
$container_classes = [];
if ( $container_bg && ! str_starts_with( $container_bg, '#' ) && ! str_starts_with( $container_bg, 'rgb' ) ) {
  $container_classes[] = 'bg-' . esc_attr( $container_bg );
}

// Build container inline styles
$container_styles = [];

// Custom background color (hex/rgba)
if ( $container_bg ) {
  if ( str_starts_with( $container_bg, '#' ) || str_starts_with( $container_bg, 'rgb' ) ) {
    $container_styles[] = 'background-color: ' . esc_attr( $container_bg );
  } elseif ( $container_bg === 'gradient-primary' ) {
    $container_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
  } elseif ( $container_bg === 'gradient-dark' ) {
    $container_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
  }
}

// Border radius (always inline style with px)
if ( $container_radius > 0 ) {
  $container_styles[] = 'border-radius: ' . esc_attr( $container_radius ) . 'px';
}

// Container padding (inline style with px)
if ( $container_padding > 0 ) {
  $container_styles[] = 'padding: ' . esc_attr( $container_padding ) . 'px';
}

// Convert to strings
$container_class_str = implode( ' ', $container_classes );
$container_style_str = implode( '; ', $container_styles );
?>

<div class="block-name__container <?php echo esc_attr( $container_class_str ); ?>"
     <?php echo $container_style_str ? 'style="' . esc_attr( $container_style_str ) . '"' : ''; ?>>
  <!-- Content -->
</div>
```

---

### 2. Image Responsive Pattern - STANDARDIZED

**ALL blocks with images MUST use `<picture>` element:**

#### Available Image Sizes

| Size Name | Dimensions | Aspect | Usage |
|-----------|------------|--------|-------|
| `sarika-potret` | 600x750 | 4:5 Portrait | Desktop/Tablet portraits |
| `sarika-news-sm` | 480x270 | 16:9 Landscape | Mobile (lightweight) |
| `medium` | 640x360 | 16:9 Landscape | Desktop landscape |
| `sarika-square` | 300x300 | 1:1 Square | Thumbnails |

#### PHP Template Pattern

```php
<?php
$image_id = $attrs['ane_image_id'] ?? 0;
$image_url = $attrs['ane_image'] ?? '';

if ( $image_id ) {
  // Get responsive image URLs
  $desktop_url = wp_get_attachment_image_url( $image_id, 'sarika-potret' ); // 600x750 portrait
  $mobile_url  = wp_get_attachment_image_url( $image_id, 'sarika-news-sm' ); // 480x270 landscape
  $image_alt   = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
  $image_title = get_the_title( $image_id );

  if ( $desktop_url && $mobile_url ) {
    ?>
    <picture>
      <source media="(min-width: 768px)" srcset="<?php echo esc_url( $desktop_url ); ?>">
      <source media="(max-width: 767px)" srcset="<?php echo esc_url( $mobile_url ); ?>">
      <img
        src="<?php echo esc_url( $desktop_url ); ?>"
        alt="<?php echo esc_attr( $image_alt ?: $image_title ); ?>"
        class="block-name__image"
        loading="lazy"
      >
    </picture>
    <?php
  }
}
?>
```

#### SCSS Pattern

```scss
&__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  border-radius: 10px;

  // Desktop: Portrait aspect ratio (OPTIONAL)
  @media (min-width: 768px) {
    aspect-ratio: 4 / 5; // Remove if landscape desired
  }
  // Mobile: Natural aspect ratio (16:9 from news-sm)
  // No aspect-ratio = uses natural dimensions
}
```

---

### 3. Complete Utility Classes

#### Spacing (from _utilities.scss)

```scss
/* Padding Top/Bottom */
.padding-top-none, .padding-bottom-none           // 0
.padding-top-small, .padding-bottom-small         // 2rem (1rem mobile)
.padding-top-medium, .padding-bottom-medium       // 3rem (1rem mobile)
.padding-top-large, .padding-bottom-large         // 5rem (1rem mobile)
.padding-top-xlarge, .padding-bottom-xlarge       // 7rem (2rem mobile)

/* Margin Bottom */
.margin-bottom-none                               // 0
.margin-bottom-small                              // 2rem (1rem mobile)
.margin-bottom-medium                             // 3rem (1rem mobile)
.margin-bottom-large                              // 5rem (1rem mobile)
.margin-bottom-xlarge                             // 7rem (2rem mobile)
```

#### Background Colors (from _utilities.scss)

```scss
/* Solid Colors */
.bg-primary, .bg-secondary, .bg-light, .bg-dark, .bg-accent
.bg-white, .bg-black, .bg-transparent

/* Gradients */
.gradient-primary     // Primary → Secondary (135deg)
.gradient-dark        // Dark → Primary (135deg)
```

#### Text Colors (from _utilities.scss)

```scss
.text-primary, .text-secondary, .text-body, .text-light, .text-dark
.text-accent, .text-white, .text-black
```

---

### 4. Typography Scale (from _typography.scss)

```scss
/* Title Classes */
.title-hero      // 32px → 40px → 56px (mobile → tablet → desktop)
.title-body      // 28px → 32px → 40px
.title-desc      // 18px → 20px → 24px
.title-small     // 16px → 18px → 20px

/* Description */
.desc            // 16px → 18px

/* Font Families */
.title-tagline   // Poppins font family
                 // Default: Inter
```

**SelectControl Options:**

```javascript
<SelectControl
  label={__('Title Size', 'sarika')}
  value={ane_title_size}
  options={[
    { label: __('Small (16-20px)', 'sarika'), value: 'small' },
    { label: __('Description (18-24px)', 'sarika'), value: 'desc' },
    { label: __('Body (28-40px)', 'sarika'), value: 'body' },
    { label: __('Hero (32-56px)', 'sarika'), value: 'hero' },
  ]}
  onChange={(value) => setAttributes({ ane_title_size: value })}
/>
```

---

### 5. Standard SelectControl Options

#### Spacing Options

```javascript
<SelectControl
  label={__('Padding Top', 'sarika')}
  value={ane_padding_top}
  options={[
    { label: __('None', 'sarika'), value: 'none' },
    { label: __('Small', 'sarika'), value: 'small' },
    { label: __('Medium', 'sarika'), value: 'medium' },
    { label: __('Large', 'sarika'), value: 'large' },
    { label: __('Extra Large', 'sarika'), value: 'xlarge' },
  ]}
  onChange={(value) => setAttributes({ ane_padding_top: value })}
/>
```

#### Alignment Options

```javascript
<SelectControl
  label={__('Alignment', 'sarika')}
  value={ane_alignment}
  options={[
    { label: __('Left', 'sarika'), value: 'left' },
    { label: __('Center', 'sarika'), value: 'center' },
    { label: __('Right', 'sarika'), value: 'right' },
  ]}
  onChange={(value) => setAttributes({ ane_alignment: value })}
/>
```

#### Grid Columns

```javascript
<SelectControl
  label={__('Columns', 'sarika')}
  value={ane_columns}
  options={[
    { label: __('1 Column', 'sarika'), value: '1' },
    { label: __('2 Columns', 'sarika'), value: '2' },
    { label: __('3 Columns', 'sarika'), value: '3' },
    { label: __('4 Columns', 'sarika'), value: '4' },
  ]}
  onChange={(value) => setAttributes({ ane_columns: value })}
/>
```

---

### 6. RangeControl Pattern

```javascript
// Border Radius (0-50px, step 1)
<RangeControl
  label={__('Border Radius (px)', 'sarika')}
  value={ane_border_radius}
  onChange={(value) => setAttributes({ ane_border_radius: value })}
  min={0}
  max={50}
  step={1}
/>

// Padding (0-100px, step 5)
<RangeControl
  label={__('Padding (px)', 'sarika')}
  value={ane_padding}
  onChange={(value) => setAttributes({ ane_padding: value })}
  min={0}
  max={100}
  step={5}
/>

// Opacity (0-100%, step 5)
<RangeControl
  label={__('Opacity (%)', 'sarika')}
  value={ane_opacity}
  onChange={(value) => setAttributes({ ane_opacity: value })}
  min={0}
  max={100}
  step={5}
/>
```

**Attributes:**

```javascript
ane_border_radius: { type: 'number', default: 0 },
ane_padding: { type: 'number', default: 0 },
ane_opacity: { type: 'number', default: 50 },
```

**PHP Usage:**

```php
<?php
$border_radius = $attrs['ane_border_radius'] ?? 0;

if ( $border_radius > 0 ) {
  echo 'style="border-radius: ' . esc_attr( $border_radius ) . 'px"';
}
?>
```

---

## 🎯 COMPLETE WORKING EXAMPLE

**Copy-paste ready code that matches _utilities.scss and _typography.scss exactly.**

This is your **single source of truth** - copy this pattern for every new block.

### Attributes Definition (index.js)

```javascript
attributes: {
  // Header Content
  ane_title: { type: 'string', default: '' },
  ane_tagline: { type: 'string', default: '' },
  ane_description: { type: 'string', default: '' },

  // Section Options (STANDARD - matching _utilities.scss)
  ane_section_background: { type: 'string', default: '' },
  ane_padding_top: { type: 'string', default: 'large' },       // none, small, medium, large, xlarge
  ane_padding_bottom: { type: 'string', default: 'large' },
  ane_margin_bottom: { type: 'string', default: 'large' },

  // Container Options (STANDARD)
  ane_container_background: { type: 'string', default: '' },
  ane_container_border_radius: { type: 'number', default: 0 },  // 0-50px
  ane_container_padding: { type: 'number', default: 0 },        // 0-100px

  // Title Options (matching _typography.scss)
  ane_title_size: { type: 'string', default: 'small' },        // small, desc, body, hero
  ane_title_color: { type: 'string', default: '' },

  // Tagline Options (matching _typography.scss)
  ane_tagline_size: { type: 'string', default: 'hero' },
  ane_tagline_color: { type: 'string', default: 'primary' },

  // Description Options
  ane_description_color: { type: 'string', default: '' },

  // Layout Options
  ane_alignment: { type: 'string', default: 'center' },        // left, center, right
}
```

### Complete Editor Component (edit.js) - 600 lines

```javascript
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  RangeControl,
  Button,
  ColorPicker,
  TextControl,
  TextareaControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    ane_title,
    ane_tagline,
    ane_description,
    ane_section_background,
    ane_padding_top,
    ane_padding_bottom,
    ane_margin_bottom,
    ane_container_background,
    ane_container_border_radius,
    ane_container_padding,
    ane_title_size,
    ane_title_color,
    ane_tagline_size,
    ane_tagline_color,
    ane_description_color,
    ane_alignment,
  } = attributes;

  // State for color pickers
  const [showSectionColorPicker, setShowSectionColorPicker] = useState(false);
  const [showContainerColorPicker, setShowContainerColorPicker] = useState(false);
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
  const [showTaglineColorPicker, setShowTaglineColorPicker] = useState(false);
  const [showDescColorPicker, setShowDescColorPicker] = useState(false);

  // Predefined colors (matching _utilities.scss exactly)
  const predefinedColors = [
    { label: __('Default', 'sarika'), value: '' },
    { label: __('Primary', 'sarika'), value: 'primary' },
    { label: __('Secondary', 'sarika'), value: 'secondary' },
    { label: __('Light', 'sarika'), value: 'light' },
    { label: __('Dark', 'sarika'), value: 'dark' },
    { label: __('Accent', 'sarika'), value: 'accent' },
    { label: __('White', 'sarika'), value: 'white' },
    { label: __('Black', 'sarika'), value: 'black' },
    { label: __('Gradient Primary', 'sarika'), value: 'gradient-primary' },
    { label: __('Gradient Dark', 'sarika'), value: 'gradient-dark' },
  ];

  // BUILD SECTION CLASSES (matching _utilities.scss)
  let sectionClasses = 'sarika-block-name';
  sectionClasses += ` padding-top-${ane_padding_top}`;        // .padding-top-large
  sectionClasses += ` padding-bottom-${ane_padding_bottom}`;  // .padding-bottom-large
  sectionClasses += ` margin-bottom-${ane_margin_bottom}`;    // .margin-bottom-large

  // Section background class (if predefined)
  if (ane_section_background && !ane_section_background.startsWith('#') && !ane_section_background.startsWith('rgb')) {
    sectionClasses += ` bg-${ane_section_background}`;  // .bg-primary, .bg-white, etc
  }

  // BUILD SECTION INLINE STYLES
  const sectionStyle = { padding: '20px' };
  if (ane_section_background) {
    if (ane_section_background.startsWith('#') || ane_section_background.startsWith('rgb')) {
      sectionStyle.backgroundColor = ane_section_background;
    } else if (ane_section_background === 'gradient-primary') {
      sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
    } else if (ane_section_background === 'gradient-dark') {
      sectionStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
    }
  }

  // BUILD CONTAINER CLASSES
  let containerClasses = 'container';  // .container from _utilities.scss
  if (ane_container_background && !ane_container_background.startsWith('#') && !ane_container_background.startsWith('rgb')) {
    containerClasses += ` bg-${ane_container_background}`;
  }

  // BUILD CONTAINER INLINE STYLES
  const containerStyle = {};
  if (ane_container_background) {
    if (ane_container_background.startsWith('#') || ane_container_background.startsWith('rgb')) {
      containerStyle.backgroundColor = ane_container_background;
    } else if (ane_container_background === 'gradient-primary') {
      containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
    } else if (ane_container_background === 'gradient-dark') {
      containerStyle.background = 'linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
    }
  }
  if (ane_container_border_radius > 0) {
    containerStyle.borderRadius = `${ane_container_border_radius}px`;
  }
  if (ane_container_padding > 0) {
    containerStyle.padding = `${ane_container_padding}px`;
  }

  // BUILD CONTENT CLASSES (matching _typography.scss)
  let contentClasses = `text-${ane_alignment}`;  // .text-left, .text-center, .text-right

  // TITLE CLASSES (matching _typography.scss)
  let titleClasses = `title-${ane_title_size}`;  // .title-small, .title-desc, .title-body, .title-hero
  if (ane_title_color && !ane_title_color.startsWith('#') && !ane_title_color.startsWith('rgb')) {
    titleClasses += ` text-${ane_title_color}`;  // .text-primary, .text-dark, etc
  }
  const titleStyle = {};
  if (ane_title_color && (ane_title_color.startsWith('#') || ane_title_color.startsWith('rgb'))) {
    titleStyle.color = ane_title_color;
  }

  // TAGLINE CLASSES (matching _typography.scss)
  let taglineClasses = `title-${ane_tagline_size} title-tagline`;  // .title-hero.title-tagline (Poppins font)
  if (ane_tagline_color && !ane_tagline_color.startsWith('#') && !ane_tagline_color.startsWith('rgb')) {
    taglineClasses += ` text-${ane_tagline_color}`;
  }
  const taglineStyle = {};
  if (ane_tagline_color && (ane_tagline_color.startsWith('#') || ane_tagline_color.startsWith('rgb'))) {
    taglineStyle.color = ane_tagline_color;
  }

  // DESCRIPTION CLASSES (matching _typography.scss)
  let descClasses = 'desc';  // .desc (16-18px)
  if (ane_description_color && !ane_description_color.startsWith('#') && !ane_description_color.startsWith('rgb')) {
    descClasses += ` text-${ane_description_color}`;
  }
  const descStyle = {};
  if (ane_description_color && (ane_description_color.startsWith('#') || ane_description_color.startsWith('rgb'))) {
    descStyle.color = ane_description_color;
  }

  const blockProps = useBlockProps({ className: sectionClasses, style: sectionStyle });

  return (
    <>
      <InspectorControls>
        {/* Header Content */}
        <PanelBody title={__('Header Content', 'sarika')} initialOpen={true}>
          <TextControl
            label={__('Title (Small Text)', 'sarika')}
            value={ane_title}
            onChange={(value) => setAttributes({ ane_title: value })}
          />
          <TextControl
            label={__('Tagline (Large Text)', 'sarika')}
            value={ane_tagline}
            onChange={(value) => setAttributes({ ane_tagline: value })}
          />
          <TextareaControl
            label={__('Description', 'sarika')}
            value={ane_description}
            onChange={(value) => setAttributes({ ane_description: value })}
            rows={4}
          />
        </PanelBody>

        {/* Section Options - matching _utilities.scss */}
        <PanelBody title={__('Section Options', 'sarika')} initialOpen={false}>
          <SelectControl
            label={__('Section Background', 'sarika')}
            value={ane_section_background}
            options={predefinedColors}
            onChange={(value) => setAttributes({ ane_section_background: value })}
          />

          {ane_section_background && (
            <div style={{ marginTop: '12px' }}>
              <Button
                variant="secondary"
                onClick={() => setShowSectionColorPicker(!showSectionColorPicker)}
              >
                {__('Custom Color Picker', 'sarika')}
              </Button>

              {showSectionColorPicker && (
                <ColorPicker
                  color={ane_section_background}
                  onChangeComplete={(color) => {
                    setAttributes({
                      ane_section_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    });
                  }}
                  disableAlpha={false}
                />
              )}
            </div>
          )}

          <SelectControl
            label={__('Padding Top', 'sarika')}
            value={ane_padding_top}
            options={[
              { label: __('None (0)', 'sarika'), value: 'none' },
              { label: __('Small (2rem / 1rem mobile)', 'sarika'), value: 'small' },
              { label: __('Medium (3rem / 1rem mobile)', 'sarika'), value: 'medium' },
              { label: __('Large (5rem / 1rem mobile)', 'sarika'), value: 'large' },
              { label: __('Extra Large (7rem / 2rem mobile)', 'sarika'), value: 'xlarge' },
            ]}
            onChange={(value) => setAttributes({ ane_padding_top: value })}
          />

          <SelectControl
            label={__('Padding Bottom', 'sarika')}
            value={ane_padding_bottom}
            options={[
              { label: __('None (0)', 'sarika'), value: 'none' },
              { label: __('Small (2rem / 1rem mobile)', 'sarika'), value: 'small' },
              { label: __('Medium (3rem / 1rem mobile)', 'sarika'), value: 'medium' },
              { label: __('Large (5rem / 1rem mobile)', 'sarika'), value: 'large' },
              { label: __('Extra Large (7rem / 2rem mobile)', 'sarika'), value: 'xlarge' },
            ]}
            onChange={(value) => setAttributes({ ane_padding_bottom: value })}
          />

          <SelectControl
            label={__('Margin Bottom', 'sarika')}
            value={ane_margin_bottom}
            options={[
              { label: __('None (0)', 'sarika'), value: 'none' },
              { label: __('Small (2rem / 1rem mobile)', 'sarika'), value: 'small' },
              { label: __('Medium (3rem / 1rem mobile)', 'sarika'), value: 'medium' },
              { label: __('Large (5rem / 1rem mobile)', 'sarika'), value: 'large' },
              { label: __('Extra Large (7rem / 2rem mobile)', 'sarika'), value: 'xlarge' },
            ]}
            onChange={(value) => setAttributes({ ane_margin_bottom: value })}
          />
        </PanelBody>

        {/* Container Options */}
        <PanelBody title={__('Container Settings', 'sarika')} initialOpen={false}>
          <SelectControl
            label={__('Container Background', 'sarika')}
            value={ane_container_background}
            options={predefinedColors}
            onChange={(value) => setAttributes({ ane_container_background: value })}
          />

          {ane_container_background && (
            <div style={{ marginTop: '12px' }}>
              <Button
                variant="secondary"
                onClick={() => setShowContainerColorPicker(!showContainerColorPicker)}
              >
                {__('Custom Color Picker', 'sarika')}
              </Button>

              {showContainerColorPicker && (
                <ColorPicker
                  color={ane_container_background}
                  onChangeComplete={(color) => {
                    setAttributes({
                      ane_container_background: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    });
                  }}
                  disableAlpha={false}
                />
              )}
            </div>
          )}

          <RangeControl
            label={__('Border Radius (px)', 'sarika')}
            value={ane_container_border_radius}
            onChange={(value) => setAttributes({ ane_container_border_radius: value })}
            min={0}
            max={50}
            step={1}
          />

          <RangeControl
            label={__('Container Padding (px)', 'sarika')}
            value={ane_container_padding}
            onChange={(value) => setAttributes({ ane_container_padding: value })}
            min={0}
            max={100}
            step={5}
          />
        </PanelBody>

        {/* Title Options - matching _typography.scss */}
        <PanelBody title={__('Title Options', 'sarika')} initialOpen={false}>
          <SelectControl
            label={__('Title Size', 'sarika')}
            value={ane_title_size}
            options={[
              { label: __('Small (16-20px)', 'sarika'), value: 'small' },
              { label: __('Description (18-24px)', 'sarika'), value: 'desc' },
              { label: __('Body (28-40px)', 'sarika'), value: 'body' },
              { label: __('Hero (32-56px)', 'sarika'), value: 'hero' },
            ]}
            onChange={(value) => setAttributes({ ane_title_size: value })}
          />

          <SelectControl
            label={__('Title Color', 'sarika')}
            value={ane_title_color}
            options={predefinedColors}
            onChange={(value) => setAttributes({ ane_title_color: value })}
          />

          {ane_title_color && (
            <div style={{ marginTop: '12px' }}>
              <Button
                variant="secondary"
                onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
              >
                {__('Custom Color Picker', 'sarika')}
              </Button>

              {showTitleColorPicker && (
                <ColorPicker
                  color={ane_title_color}
                  onChangeComplete={(color) => {
                    setAttributes({
                      ane_title_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    });
                  }}
                  disableAlpha={false}
                />
              )}
            </div>
          )}
        </PanelBody>

        {/* Tagline Options - matching _typography.scss */}
        <PanelBody title={__('Tagline Options', 'sarika')} initialOpen={false}>
          <SelectControl
            label={__('Tagline Size', 'sarika')}
            value={ane_tagline_size}
            options={[
              { label: __('Small (16-20px)', 'sarika'), value: 'small' },
              { label: __('Description (18-24px)', 'sarika'), value: 'desc' },
              { label: __('Body (28-40px)', 'sarika'), value: 'body' },
              { label: __('Hero (32-56px)', 'sarika'), value: 'hero' },
            ]}
            onChange={(value) => setAttributes({ ane_tagline_size: value })}
          />

          <SelectControl
            label={__('Tagline Color', 'sarika')}
            value={ane_tagline_color}
            options={predefinedColors}
            onChange={(value) => setAttributes({ ane_tagline_color: value })}
          />

          {ane_tagline_color && (
            <div style={{ marginTop: '12px' }}>
              <Button
                variant="secondary"
                onClick={() => setShowTaglineColorPicker(!showTaglineColorPicker)}
              >
                {__('Custom Color Picker', 'sarika')}
              </Button>

              {showTaglineColorPicker && (
                <ColorPicker
                  color={ane_tagline_color}
                  onChangeComplete={(color) => {
                    setAttributes({
                      ane_tagline_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    });
                  }}
                  disableAlpha={false}
                />
              )}
            </div>
          )}
        </PanelBody>

        {/* Description Options */}
        <PanelBody title={__('Description Options', 'sarika')} initialOpen={false}>
          <SelectControl
            label={__('Description Color', 'sarika')}
            value={ane_description_color}
            options={predefinedColors}
            onChange={(value) => setAttributes({ ane_description_color: value })}
          />

          {ane_description_color && (
            <div style={{ marginTop: '12px' }}>
              <Button
                variant="secondary"
                onClick={() => setShowDescColorPicker(!showDescColorPicker)}
              >
                {__('Custom Color Picker', 'sarika')}
              </Button>

              {showDescColorPicker && (
                <ColorPicker
                  color={ane_description_color}
                  onChangeComplete={(color) => {
                    setAttributes({
                      ane_description_color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                    });
                  }}
                  disableAlpha={false}
                />
              )}
            </div>
          )}
        </PanelBody>

        {/* Layout Options - matching _typography.scss */}
        <PanelBody title={__('Layout Options', 'sarika')} initialOpen={false}>
          <SelectControl
            label={__('Content Alignment', 'sarika')}
            value={ane_alignment}
            options={[
              { label: __('Left', 'sarika'), value: 'left' },
              { label: __('Center', 'sarika'), value: 'center' },
              { label: __('Right', 'sarika'), value: 'right' },
            ]}
            onChange={(value) => setAttributes({ ane_alignment: value })}
          />
        </PanelBody>
      </InspectorControls>

      {/* EDITOR PREVIEW */}
      <div {...blockProps}>
        <div className={containerClasses} style={containerStyle}>
          <div className={contentClasses}>
            {ane_title && (
              <p className={titleClasses} style={titleStyle}>
                {ane_title}
              </p>
            )}
            {ane_tagline && (
              <h2 className={taglineClasses} style={taglineStyle}>
                {ane_tagline}
              </h2>
            )}
            {ane_description && (
              <p className={descClasses} style={descStyle}>
                {ane_description}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
```

### Complete PHP Template (block-name.php) - Copy-Paste Ready

```php
<?php
/**
 * Block: Block Name
 *
 * @package sarika
 */

// Header content
$title       = $attrs['ane_title'] ?? '';
$tagline     = $attrs['ane_tagline'] ?? '';
$description = $attrs['ane_description'] ?? '';

// Section options
$section_bg     = $attrs['ane_section_background'] ?? '';
$padding_top    = $attrs['ane_padding_top'] ?? 'large';
$padding_bottom = $attrs['ane_padding_bottom'] ?? 'large';
$margin_bottom  = $attrs['ane_margin_bottom'] ?? 'large';

// Container options
$container_bg      = $attrs['ane_container_background'] ?? '';
$container_radius  = $attrs['ane_container_border_radius'] ?? 0;
$container_padding = $attrs['ane_container_padding'] ?? 0;

// Title options
$title_size  = $attrs['ane_title_size'] ?? 'small';
$title_color = $attrs['ane_title_color'] ?? '';

// Tagline options
$tagline_size  = $attrs['ane_tagline_size'] ?? 'hero';
$tagline_color = $attrs['ane_tagline_color'] ?? 'primary';

// Description options
$description_color = $attrs['ane_description_color'] ?? '';

// Layout options
$alignment = $attrs['ane_alignment'] ?? 'center';

// =========================================
// BUILD SECTION CLASSES (matching _utilities.scss)
// =========================================
$section_classes = [];
$section_classes[] = 'sarika-block-name';
$section_classes[] = 'padding-top-' . esc_attr( $padding_top );       // .padding-top-large
$section_classes[] = 'padding-bottom-' . esc_attr( $padding_bottom ); // .padding-bottom-large
$section_classes[] = 'margin-bottom-' . esc_attr( $margin_bottom );   // .margin-bottom-large

// Section background (predefined color class)
if ( $section_bg && ! str_starts_with( $section_bg, '#' ) && ! str_starts_with( $section_bg, 'rgb' ) ) {
	$section_classes[] = 'bg-' . esc_attr( $section_bg );  // .bg-primary, .bg-dark, etc
}

// BUILD SECTION INLINE STYLES
$section_styles = [];

// Section custom background (hex/rgba or gradient)
if ( $section_bg ) {
	if ( str_starts_with( $section_bg, '#' ) || str_starts_with( $section_bg, 'rgb' ) ) {
		$section_styles[] = 'background-color: ' . esc_attr( $section_bg );
	} elseif ( $section_bg === 'gradient-primary' ) {
		$section_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
	} elseif ( $section_bg === 'gradient-dark' ) {
		$section_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
	}
}

// =========================================
// BUILD CONTAINER CLASSES
// =========================================
$container_classes = [];
$container_classes[] = 'container';  // .container from _utilities.scss (max-width: 1200px)

// Container background (predefined color class)
if ( $container_bg && ! str_starts_with( $container_bg, '#' ) && ! str_starts_with( $container_bg, 'rgb' ) ) {
	$container_classes[] = 'bg-' . esc_attr( $container_bg );
}

// BUILD CONTAINER INLINE STYLES
$container_styles = [];

// Container custom background (hex/rgba or gradient)
if ( $container_bg ) {
	if ( str_starts_with( $container_bg, '#' ) || str_starts_with( $container_bg, 'rgb' ) ) {
		$container_styles[] = 'background-color: ' . esc_attr( $container_bg );
	} elseif ( $container_bg === 'gradient-primary' ) {
		$container_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-primary) 0%, var(--sarika-color-secondary) 100%)';
	} elseif ( $container_bg === 'gradient-dark' ) {
		$container_styles[] = 'background: linear-gradient(135deg, var(--sarika-color-dark) 0%, var(--sarika-color-primary) 100%)';
	}
}

// Container border radius
if ( $container_radius > 0 ) {
	$container_styles[] = 'border-radius: ' . esc_attr( $container_radius ) . 'px';
}

// Container padding
if ( $container_padding > 0 ) {
	$container_styles[] = 'padding: ' . esc_attr( $container_padding ) . 'px';
}

// =========================================
// BUILD CONTENT CLASSES (matching _typography.scss)
// =========================================
$content_classes = [];
$content_classes[] = 'text-' . esc_attr( $alignment );  // .text-left, .text-center, .text-right

// TITLE CLASSES (matching _typography.scss)
$title_class = 'title-' . esc_attr( $title_size );  // .title-small, .title-desc, .title-body, .title-hero
if ( $title_color && ! str_starts_with( $title_color, '#' ) && ! str_starts_with( $title_color, 'rgb' ) ) {
	$title_class .= ' text-' . esc_attr( $title_color );  // .text-primary, .text-dark, etc
}
$title_style = '';
if ( $title_color && ( str_starts_with( $title_color, '#' ) || str_starts_with( $title_color, 'rgb' ) ) ) {
	$title_style = 'color: ' . esc_attr( $title_color );
}

// TAGLINE CLASSES (matching _typography.scss)
$tagline_class = 'title-' . esc_attr( $tagline_size ) . ' title-tagline';  // .title-hero.title-tagline (Poppins font)
if ( $tagline_color && ! str_starts_with( $tagline_color, '#' ) && ! str_starts_with( $tagline_color, 'rgb' ) ) {
	$tagline_class .= ' text-' . esc_attr( $tagline_color );
}
$tagline_style = '';
if ( $tagline_color && ( str_starts_with( $tagline_color, '#' ) || str_starts_with( $tagline_color, 'rgb' ) ) ) {
	$tagline_style = 'color: ' . esc_attr( $tagline_color );
}

// DESCRIPTION CLASSES (matching _typography.scss)
$desc_class = 'desc';  // .desc (16-18px)
if ( $description_color && ! str_starts_with( $description_color, '#' ) && ! str_starts_with( $description_color, 'rgb' ) ) {
	$desc_class .= ' text-' . esc_attr( $description_color );
}
$desc_style = '';
if ( $description_color && ( str_starts_with( $description_color, '#' ) || str_starts_with( $description_color, 'rgb' ) ) ) {
	$desc_style = 'color: ' . esc_attr( $description_color );
}

// Convert arrays to strings
$section_class_str   = implode( ' ', $section_classes );
$section_style_str   = implode( '; ', $section_styles );
$container_class_str = implode( ' ', $container_classes );
$container_style_str = implode( '; ', $container_styles );
$content_class_str   = implode( ' ', $content_classes );
?>

<section class="<?php echo esc_attr( $section_class_str ); ?>"
		 <?php echo $section_style_str ? 'style="' . esc_attr( $section_style_str ) . '"' : ''; ?>>
	<div class="<?php echo esc_attr( $container_class_str ); ?>"
		 <?php echo $container_style_str ? 'style="' . esc_attr( $container_style_str ) . '"' : ''; ?>>
		<div class="<?php echo esc_attr( $content_class_str ); ?>">

			<?php if ( $title ) : ?>
				<p class="<?php echo esc_attr( $title_class ); ?>"
				   <?php echo $title_style ? 'style="' . esc_attr( $title_style ) . '"' : ''; ?>>
					<?php echo esc_html( $title ); ?>
				</p>
			<?php endif; ?>

			<?php if ( $tagline ) : ?>
				<h2 class="<?php echo esc_attr( $tagline_class ); ?>"
					<?php echo $tagline_style ? 'style="' . esc_attr( $tagline_style ) . '"' : ''; ?>>
					<?php echo esc_html( $tagline ); ?>
				</h2>
			<?php endif; ?>

			<?php if ( $description ) : ?>
				<p class="<?php echo esc_attr( $desc_class ); ?>"
				   <?php echo $desc_style ? 'style="' . esc_attr( $desc_style ) . '"' : ''; ?>>
					<?php echo esc_html( $description ); ?>
				</p>
			<?php endif; ?>

		</div>
	</div>
</section>
```

**✅ This example is 100% matching:**
- `_utilities.scss` - padding-top/bottom-none/small/medium/large/xlarge, margin-bottom-*, bg-*, gradient-*
- `_typography.scss` - title-small/desc/body/hero, title-tagline, desc, text-left/center/right, text-primary/secondary/etc

**Copy this exact pattern for every new block!**

---

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
