# GitHub Release Guide untuk Sarika Theme

Panduan lengkap cara membuat GitHub Release agar sistem auto-update theme WordPress berfungsi.

---

## 📋 Prerequisites

1. ✅ Repository sudah di-push ke GitHub: `https://github.com/webaneid/sarika`
2. ✅ File `README.md` dan `CHANGELOG.md` sudah ada
3. ✅ Version di `style.css` sudah di-update
4. ✅ Semua perubahan sudah di-commit dan di-push

---

## 🚀 Step-by-Step: Membuat GitHub Release

### Step 1: Buat ZIP File Theme

Sebelum create release, kita perlu buat ZIP file dari theme:

```bash
# Pastikan kamu ada di folder theme
cd /Applications/MAMP/htdocs/sarika/wp-content/themes/sarika

# Buat ZIP file (exclude files yang tidak perlu)
zip -r sarika-0.1.0.zip . \
  -x "*.git*" \
  -x "node_modules/*" \
  -x "*.DS_Store" \
  -x "package-lock.json"
```

**Penting:** 
- Nama file harus format: `sarika-VERSION.zip` (contoh: `sarika-0.1.0.zip`)
- ZIP harus berisi folder theme dengan nama `sarika/`
- Jangan ZIP dari parent folder (jangan ada double folder)

**Cara cek struktur ZIP yang benar:**
```bash
unzip -l sarika-0.1.0.zip | head -20
```
Output harus menunjukkan:
```
Archive:  sarika-0.1.0.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
        0  01-29-2025 12:00   sarika/
      123  01-29-2025 12:00   sarika/functions.php
      456  01-29-2025 12:00   sarika/style.css
    ...
```

---

### Step 2: Buat Git Tag

```bash
# Buat tag untuk version 0.1.0
git tag -a v0.1.0 -m "Release version 0.1.0 - Initial release"

# Push tag ke GitHub
git push origin v0.1.0
```

**Catatan:**
- Tag harus dengan prefix `v` (contoh: `v0.1.0`, `v0.2.0`)
- Ini penting karena `inc/updater.php` menggunakan `tag_name` untuk version checking

---

### Step 3: Buat Release di GitHub

#### Option A: Via GitHub Web Interface (Recommended)

1. **Buka repository di browser:**
   ```
   https://github.com/webaneid/sarika
   ```

2. **Klik "Releases" di sidebar kanan** (atau goto: `/releases`)

3. **Klik "Draft a new release"**

4. **Choose a tag:**
   - Select tag: `v0.1.0` (yang baru kamu push)
   - Atau ketik `v0.1.0` untuk create new tag

5. **Release title:**
   ```
   Sarika v0.1.0 - Initial Release
   ```

6. **Release notes:**
   Copy dari `CHANGELOG.md` section untuk v0.1.0, atau tulis:
   ```markdown
   ## 🎉 Sarika v0.1.0 - Initial Release
   
   First release of Sarika WordPress theme - Premium Company Profile theme forked from Tempone v0.1.9.
   
   ### ✨ Highlights
   - 🎨 Glassmorphism header with overlay mode
   - 📦 8 custom Gutenberg blocks (Hero, Video Background, FAQ, etc.)
   - ⚙️ Advanced admin customization with Chart.js analytics
   - 🚀 GitHub-based auto-update system
   - 📱 Mobile-first responsive design
   - 🔒 SVG & JSON/Lottie upload support with sanitization
   
   ### 📋 Requirements
   - WordPress 6.0+
   - PHP 7.4+
   - ACF Pro (required)
   
   ### 📦 Installation
   1. Download `sarika-0.1.0.zip` below
   2. Go to **Appearance → Themes → Add New → Upload Theme**
   3. Install and activate
   4. Install ACF Pro plugin
   
   ### 📚 Documentation
   - [README.md](https://github.com/webaneid/sarika/blob/main/README.md)
   - [CHANGELOG.md](https://github.com/webaneid/sarika/blob/main/CHANGELOG.md)
   - [CLAUDE.md](https://github.com/webaneid/sarika/blob/main/CLAUDE.md)
   
   See full changelog in [CHANGELOG.md](https://github.com/webaneid/sarika/blob/main/CHANGELOG.md#010---2025-01-29)
   ```

7. **Attach binaries:**
   - Klik **"Attach binaries by dropping them here or selecting them"**
   - Upload file `sarika-0.1.0.zip` yang sudah kamu buat di Step 1

8. **Set as latest release:**
   - ✅ Centang "Set as the latest release"

9. **Publish release:**
   - Klik **"Publish release"** (hijau button)

---

#### Option B: Via GitHub CLI (gh)

Jika kamu punya GitHub CLI installed:

```bash
# Install gh (jika belum ada)
brew install gh

# Login (jika belum)
gh auth login

# Create release dengan ZIP attachment
gh release create v0.1.0 \
  --title "Sarika v0.1.0 - Initial Release" \
  --notes "First release of Sarika WordPress theme. See CHANGELOG.md for details." \
  sarika-0.1.0.zip
```

---

### Step 4: Verifikasi Release

1. **Cek Release Page:**
   ```
   https://github.com/webaneid/sarika/releases
   ```

2. **Pastikan:**
   - ✅ Tag: `v0.1.0` muncul
   - ✅ ZIP file: `sarika-0.1.0.zip` terattach
   - ✅ Badge "Latest" muncul
   - ✅ Release notes terbaca dengan baik

3. **Test API Response:**
   ```bash
   curl -s https://api.github.com/repos/webaneid/sarika/releases/latest | jq
   ```
   
   Output harus menunjukkan:
   ```json
   {
     "tag_name": "v0.1.0",
     "name": "Sarika v0.1.0 - Initial Release",
     "assets": [
       {
         "name": "sarika-0.1.0.zip",
         "browser_download_url": "https://github.com/webaneid/sarika/releases/download/v0.1.0/sarika-0.1.0.zip"
       }
     ]
   }
   ```

---

## 🧪 Step 5: Test Auto-Update System

Sekarang test apakah theme bisa detect update:

### 1. Install Theme di WordPress Test Site

```bash
# Download ZIP dari release
wget https://github.com/webaneid/sarika/releases/download/v0.1.0/sarika-0.1.0.zip

# Extract ke themes folder
unzip sarika-0.1.0.zip -d /path/to/wordpress/wp-content/themes/

# Activate theme via wp-cli
wp theme activate sarika
```

### 2. Force Update Check

Buka di browser:
```
http://your-site.com/wp-admin/themes.php?sarika_force_check=1
```

Seharusnya muncul notice: **"Update check completed!"**

### 3. Debug Update Info

Buka:
```
http://your-site.com/wp-admin/themes.php?sarika_debug=1
```

Seharusnya menampilkan:
```
Current version: 0.1.0
Update data: Array or "No update data"
```

### 4. Test Update (untuk future releases)

Ketika kamu sudah buat release baru (misal v0.2.0):

1. Pastikan theme masih versi 0.1.0
2. Buka **Appearance → Themes**
3. Seharusnya muncul notification: **"Update Available - Version 0.2.0"**
4. Klik **"Update Available"**
5. Theme akan auto-download dan install dari GitHub

---

## 🔄 Workflow untuk Future Releases

### Setiap kali mau release version baru:

```bash
# 1. Update version di style.css
# Line 7: Version: 0.2.0

# 2. Update CHANGELOG.md
# Tambahkan section baru untuk v0.2.0

# 3. Commit changes
git add style.css CHANGELOG.md
git commit -m "chore: bump version to 0.2.0"
git push

# 4. Buat ZIP file
zip -r sarika-0.2.0.zip . \
  -x "*.git*" \
  -x "node_modules/*" \
  -x "*.DS_Store" \
  -x "package-lock.json"

# 5. Create tag
git tag -a v0.2.0 -m "Release version 0.2.0"
git push origin v0.2.0

# 6. Create GitHub Release (via web atau gh CLI)
gh release create v0.2.0 \
  --title "Sarika v0.2.0" \
  --notes-file RELEASE_NOTES.md \
  sarika-0.2.0.zip

# 7. Test update system
# Buka: http://site.com/wp-admin/themes.php?sarika_force_check=1
```

---

## ⚠️ Important Notes

### ZIP File Requirements
1. **Nama file MUST follow pattern:** `sarika-VERSION.zip`
   - ✅ Good: `sarika-0.1.0.zip`, `sarika-1.2.3.zip`
   - ❌ Bad: `sarika.zip`, `theme.zip`, `sarika-main.zip`

2. **Struktur folder di dalam ZIP:**
   ```
   sarika-0.1.0.zip
   └── sarika/           ← Folder name MUST be "sarika"
       ├── functions.php
       ├── style.css
       ├── inc/
       └── ...
   ```

3. **Updater akan cari file dengan pattern:** `sarika-*.zip` di GitHub assets

### Tag Requirements
- Tag MUST start with `v` (e.g., `v0.1.0`)
- Use semantic versioning: `vMAJOR.MINOR.PATCH`
- Updater strips `v` prefix saat compare version

### Release Notes Best Practices
- Highlight major features di top
- Link ke CHANGELOG.md untuk full details
- Include installation instructions
- Mention breaking changes (jika ada)
- Add upgrade guide (jika ada migration steps)

---

## 🐛 Troubleshooting

### "No update data" di debug mode?
1. Cek GitHub API: `curl https://api.github.com/repos/webaneid/sarika/releases/latest`
2. Pastikan release published (bukan draft)
3. Pastikan ZIP file ter-upload dengan benar
4. Clear transient: `wp transient delete sarika_update_check`

### Update button tidak muncul?
1. Pastikan version di `style.css` lebih kecil dari release version
2. Force check: `?sarika_force_check=1`
3. Cek PHP error log

### Download gagal saat update?
1. Pastikan ZIP file accessible: test download manual
2. Cek server bisa akses GitHub (firewall/proxy issue?)
3. Increase PHP `max_execution_time` dan `memory_limit`

### Folder name salah setelah update?
- Ini handled by `fix_source_folder()` di updater
- Pastikan function tidak di-disable oleh plugin lain

---

## 📚 References

- **GitHub Releases Documentation:** https://docs.github.com/en/repositories/releasing-projects-on-github
- **WordPress Update API:** https://developer.wordpress.org/apis/handbook/update-api/
- **Semantic Versioning:** https://semver.org/

---

**Developed by Webane Indonesia** - https://webane.com
