# Funfact Block - Debugging Guide

## Masalah yang Ditemukan

User melaporkan: "tidak tersimpan dan terlihat di front-end, block-funfact.php tidak memanggil datanya"

## Fix yang Sudah Dilakukan

### 1. ✅ Perbaikan PHP Template Data Handling

**File:** `tp/blocks/block-funfact.php`

**Masalah:** Array item tidak di-validasi dengan benar sebelum diakses
**Solusi:** Tambahkan validasi dan fallback untuk setiap array key

```php
// SEBELUM (SALAH):
<?php foreach ( $funfact_items as $item ) : ?>
    data-target="<?php echo esc_attr( $item['number'] ); ?>"
<?php endforeach; ?>

// SESUDAH (BENAR):
<?php foreach ( $funfact_items as $item ) : ?>
    <?php
    if ( ! is_array( $item ) ) {
        continue;
    }
    $item_number = isset( $item['number'] ) ? $item['number'] : '0';
    $item_suffix = isset( $item['suffix'] ) ? $item['suffix'] : '';
    $item_label = isset( $item['label'] ) ? $item['label'] : '';
    $item_desc = isset( $item['description'] ) ? $item['description'] : '';
    ?>
    data-target="<?php echo esc_attr( $item_number ); ?>"
<?php endforeach; ?>
```

### 2. ✅ JavaScript Counter Animation (External File)

**File:** `js/funfact-counter.js` (NEW)

**Masalah:** Inline script di PHP template bisa tidak ter-load dengan benar
**Solusi:** Pindahkan ke file terpisah dan enqueue dengan benar

**File Modified:** `inc/assets.php`
- Added: `wp_enqueue_script('sarika-funfact-counter', ...)`

### 3. ✅ Debug Helper

**File:** `tp/blocks/block-funfact.php` line 9

Tambahkan debug line (commented by default):
```php
// error_log( 'Funfact Block Args: ' . print_r( $args, true ) );
```

**Cara pakai:**
1. Uncomment line 9
2. Simpan block di editor
3. Refresh frontend
4. Cek `wp-content/debug.log` untuk melihat data yang diterima

## Cara Testing Block

### Step 1: Clear Cache
```bash
# Refresh browser dengan hard reload
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

### Step 2: Tambah Block di Editor

1. Buka halaman atau buat baru
2. Klik (+) Add Block
3. Cari "Funfact" di kategori "Sarika Sections"
4. Block akan muncul dengan 4 default items:
   - 420%
   - 21.2K
   - 110X
   - 16M

### Step 3: Customize Content

**Inspector Controls (Sidebar Kanan):**

1. **Header Content**
   - Title: "OUR ACHIEVEMENTS"
   - Tagline: "Trusted by Thousands"
   - Description: "We deliver excellence..."

2. **Section Options**
   - Section Background: Primary
   - Padding Top: Large
   - Padding Bottom: Large
   - Margin Bottom: Large

3. **Container Settings**
   - Container Background: White
   - Border Radius: 20px
   - Padding: 40px

4. **Layout Options**
   - Alignment: Center
   - Columns: 4

5. **Number & Label Colors**
   - Number Color: Primary
   - Label Color: Default (inherit)
   - Description Color: Default (inherit)

6. **Funfact Items** (Repeater)
   - Klik "Add New Stat" untuk tambah item
   - Klik "Remove Stat" untuk hapus item
   - Edit number, suffix, label, description

### Step 4: Publish & Test Frontend

1. Klik "Update" atau "Publish"
2. Klik "View Page"
3. **Expected Result:**
   - Section dengan background sesuai settings
   - Grid 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile)
   - Numbers mulai dari 0 dan counting up ke target
   - Animation trigger saat scroll ke viewport (50% visible)
   - Duration: 2 detik

### Step 5: Test Animation

1. Scroll ke bawah melewati block
2. Scroll ke atas lagi
3. **Expected:** Animation hanya jalan 1x (Intersection Observer unobserve setelah trigger)

## Troubleshooting

### ❌ Block Tidak Muncul di Editor

**Check:**
1. Webpack build berhasil?
   ```bash
   ls -la build/funfact/
   # Harus ada: index.js, index.asset.php
   ```

2. JavaScript error di console?
   ```
   F12 → Console tab
   # Cek error merah
   ```

3. Block registered?
   ```php
   // inc/blocks.php
   sarika_register_funfact_block()
   ```

### ❌ Block Muncul Tapi Tidak Menyimpan Data

**Check:**
1. Attributes definition di `index.js`
   ```javascript
   ane_funfact_items: {
       type: 'array',
       default: [...]
   }
   ```

2. setAttributes di `edit.js`
   ```javascript
   setAttributes({ ane_funfact_items: newItems })
   ```

3. Browser console error saat save?

### ❌ Data Tersimpan Tapi Tidak Muncul di Frontend

**Enable Debug:**
```php
// tp/blocks/block-funfact.php line 9
error_log( 'Funfact Block Args: ' . print_r( $args, true ) );
```

**Check:**
1. `wp-content/debug.log` - apa isi `$args`?
2. Apakah `ane_funfact_items` ada dan array?
3. Apakah setiap item punya keys: number, suffix, label, description?

**HTML Output:**
```bash
# View page source (Cmd+U)
# Search for: sarika-funfact-number
# Check data-target dan data-suffix attributes
```

### ❌ Animation Tidak Jalan

**Check:**
1. JavaScript loaded?
   ```
   View Page Source → Search: funfact-counter.js
   ```

2. Console errors?
   ```
   F12 → Console
   # Check for errors
   ```

3. Data attributes correct?
   ```html
   <div class="sarika-funfact-number"
        data-target="420"
        data-suffix="%">
       0%
   </div>
   ```

4. Intersection Observer supported?
   ```
   # Test in modern browser (Chrome, Firefox, Safari)
   # NOT IE11
   ```

### ❌ CSS Styling Tidak Muncul

**Check:**
1. SCSS compiled?
   ```bash
   npx sass scss/sarika.scss css/sarika.min.css --style=compressed
   ```

2. CSS classes correct?
   ```
   F12 → Elements → Inspect block
   # Check classes: sarika-funfact, padding-top-large, bg-primary
   ```

3. Cache issue?
   ```
   Hard reload: Cmd+Shift+R
   ```

## Expected Data Structure

### Block Attributes (Saved to Database)
```json
{
  "ane_title": "OUR ACHIEVEMENTS",
  "ane_tagline": "Trusted by Thousands",
  "ane_description": "We deliver excellence...",
  "ane_section_background": "primary",
  "ane_padding_top": "large",
  "ane_padding_bottom": "large",
  "ane_margin_bottom": "large",
  "ane_container_background": "white",
  "ane_container_border_radius": 20,
  "ane_container_padding": 40,
  "ane_title_size": "small",
  "ane_title_color": "",
  "ane_tagline_size": "hero",
  "ane_tagline_color": "primary",
  "ane_description_color": "",
  "ane_alignment": "center",
  "ane_columns": "4",
  "ane_funfact_items": [
    {
      "number": "420",
      "suffix": "%",
      "label": "More Speed",
      "description": "Ut porttitor leo a diam sollicitudin."
    },
    {
      "number": "21.2",
      "suffix": "K",
      "label": "Total Ratings",
      "description": "Maecenas pharetra convallis posuere morbi."
    }
  ],
  "ane_number_color": "primary",
  "ane_label_color": "",
  "ane_fact_description_color": ""
}
```

### HTML Output (Frontend)
```html
<section class="sarika-funfact padding-top-large padding-bottom-large margin-bottom-large bg-primary">
    <div class="container bg-white" style="border-radius: 20px; padding: 40px;">
        <!-- Header -->
        <div class="sarika-funfact-header text-center">
            <p class="title-small">OUR ACHIEVEMENTS</p>
            <h2 class="title-hero title-tagline text-primary">Trusted by Thousands</h2>
            <p class="desc">We deliver excellence...</p>
        </div>

        <!-- Grid -->
        <div class="sarika-funfact-grid" data-columns="4">
            <div class="sarika-funfact-item text-center">
                <div class="sarika-funfact-number text-primary"
                     data-target="420"
                     data-suffix="%">0%</div>
                <h3 class="sarika-funfact-label">More Speed</h3>
                <p class="sarika-funfact-description">Ut porttitor leo a diam sollicitudin.</p>
            </div>
            <!-- ... more items ... -->
        </div>
    </div>
</section>
```

## Files to Check

1. **Block Registration:**
   - `src/blocks/funfact/index.js` - Attributes definition
   - `inc/blocks.php` - Register block & render callback

2. **Editor Component:**
   - `src/blocks/funfact/edit.js` - React component
   - `build/funfact/index.js` - Compiled JS

3. **Frontend Template:**
   - `tp/blocks/block-funfact.php` - PHP render

4. **Styling:**
   - `scss/_blocks.scss` - Lines 1722-1833
   - `css/sarika.min.css` - Compiled CSS

5. **JavaScript:**
   - `js/funfact-counter.js` - Animation
   - `inc/assets.php` - Enqueue script

## Common Mistakes to Avoid

1. ❌ Lupa compile webpack setelah edit JS
   ```bash
   npx webpack --mode production
   ```

2. ❌ Lupa compile SCSS setelah edit CSS
   ```bash
   npx sass scss/sarika.scss css/sarika.min.css --style=compressed
   ```

3. ❌ Mengakses array key tanpa isset()
   ```php
   // WRONG:
   $item['number']

   // RIGHT:
   isset($item['number']) ? $item['number'] : '0'
   ```

4. ❌ Inline script di PHP template
   ```php
   // WRONG: <script> di PHP file
   // RIGHT: Separate JS file + enqueue
   ```

5. ❌ Tidak clear cache
   ```
   Hard reload: Cmd+Shift+R
   ```

## Success Checklist

- [ ] Block muncul di editor (category: Sarika Sections)
- [ ] Default data ter-load (420%, 21.2K, 110X, 16M)
- [ ] Bisa edit di Inspector Controls
- [ ] Bisa add/remove items di repeater
- [ ] Data tersimpan saat klik Update/Publish
- [ ] Frontend menampilkan semua items
- [ ] Counter animation jalan saat scroll
- [ ] Grid responsive (4→2→1 cols)
- [ ] Styling sesuai Section/Container options
- [ ] Colors apply correctly

## Next Steps Jika Masih Error

1. **Enable WP_DEBUG:**
   ```php
   // wp-config.php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```

2. **Check debug.log:**
   ```bash
   tail -f wp-content/debug.log
   ```

3. **Enable block debug di template:**
   ```php
   // tp/blocks/block-funfact.php line 9
   error_log( 'Funfact Block Args: ' . print_r( $args, true ) );
   ```

4. **Browser console:**
   ```
   F12 → Console tab
   # Cek errors
   ```

5. **Network tab:**
   ```
   F12 → Network tab
   # Cek apakah funfact-counter.js loaded
   ```

---

**Last Updated:** 2025-12-04
**Status:** Fixed & Ready for Testing
