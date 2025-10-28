# 🏃 IntervalRun

**Aplikasi timer interval untuk latihan treadmill yang mobile-friendly**

IntervalRun adalah aplikasi web sederhana untuk membantu Anda menjalankan latihan interval training di treadmill. Dengan tampilan yang besar dan jelas, aplikasi ini dirancang khusus untuk digunakan saat berlari di treadmill.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Fitur

- ⚡ **3 Preset Latihan Siap Pakai**
  - HIIT Pemula (20 menit)
  - Tabata (4 menit)
  - Piramida (15 menit)

- 🎨 **Buat Latihan Custom**
  - Tambah interval dengan nama dan durasi sendiri
  - Hapus interval yang tidak diperlukan
  - Simpan di memori browser

- ⏱️ **Timer Besar & Jelas**
  - Font timer sangat besar untuk mudah dibaca dari jauh
  - Warna background berubah sesuai jenis interval
  - Info interval berikutnya

- 🔊 **Audio Cues**
  - Beep countdown 3-2-1 sebelum interval dimulai
  - Beep transisi saat pergantian interval

- 📱 **Mobile-First Design**
  - Optimized untuk smartphone
  - Responsif di tablet dan desktop
  - Touch-friendly buttons

## 🚀 Quick Start

### Langsung Pakai (Online)

1. Buka browser di smartphone atau komputer
2. Akses URL aplikasi (lihat bagian Deployment)
3. Pilih preset atau buat latihan sendiri
4. Letakkan device di dekat treadmill
5. Mulai latihan! 🏃‍♂️

### Local Development

```bash
# Clone repository
git clone https://github.com/arifsetwn/intervalrun.git

# Masuk ke folder
cd intervalrun

# Buka di browser
# Opsi 1: Double-click index.html
# Opsi 2: Gunakan live server (VS Code extension)
# Opsi 3: Gunakan http-server
npx http-server -p 8080
```

Buka browser dan akses `http://localhost:8080`

## 📁 Struktur Proyek

```
intervalrun/
├── index.html          # Struktur HTML utama
├── style.css           # Styling (mobile-first)
├── style-new.css       # Styling versi terbaru
├── app.js              # Logika aplikasi
├── assets/             # Audio files
│   ├── beep-countdown.wav
│   └── beep-transition.wav
├── prd.md              # Product Requirements Document
├── todo.md             # Task breakdown
└── README.md           # Dokumentasi
```

## 🎯 Cara Penggunaan

### Menggunakan Preset Workout

1. Dari halaman utama, pilih salah satu preset:
   - **HIIT Pemula**: Interval lari dan recovery
   - **Tabata**: High-intensity interval training
   - **Piramida**: Durasi interval bertahap

2. Klik preset untuk langsung memulai timer

3. Gunakan tombol kontrol:
   - ▶️ **Mulai/Jeda**: Start atau pause timer
   - 🔄 **Reset**: Kembali ke awal interval
   - ✕ **Akhiri Latihan**: Kembali ke menu utama

### Membuat Latihan Custom

1. Klik tombol **"➕ Buat Latihan Baru"**

2. Isi form untuk setiap interval:
   - **Nama Interval**: Misal "Pemanasan", "Lari Cepat"
   - **Menit**: Durasi menit
   - **Detik**: Durasi detik

3. Klik **"➕ Tambah Interval"** untuk menambahkan ke daftar

4. Ulangi untuk semua interval yang diinginkan

5. Klik **"▶️ Mulai Latihan"** untuk memulai

6. Gunakan tombol **"🗑️ Hapus"** untuk menghapus interval

## 🎨 Kustomisasi

### Menambah Preset Workout

Edit file `app.js`, cari bagian `presetWorkouts`:

```javascript
const presetWorkouts = [
    {
        id: 'custom-workout',
        name: 'Latihan Saya',
        description: 'Deskripsi latihan',
        intervals: [
            { name: 'Pemanasan', duration: 300, type: 'warmup' },
            { name: 'Lari', duration: 120, type: 'run' },
            { name: 'Istirahat', duration: 60, type: 'recover' },
            // ... tambah lebih banyak
        ]
    }
];
```

### Mengganti Warna Background

Edit file `style.css` atau `style-new.css`:

```css
.bg-run {
    background: linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%);
}

.bg-recover {
    background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
}

.bg-warmup {
    background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
}
```

### Mengganti Audio Files

1. Siapkan file audio `.wav` atau `.mp3`
2. Ganti nama file menjadi:
   - `beep-countdown.wav` (untuk countdown 3-2-1)
   - `beep-transition.wav` (untuk pergantian interval)
3. Letakkan di folder `assets/`

## 🤝 Kontribusi

Kontribusi sangat diterima! Ikuti langkah berikut:

### Fork & Clone

```bash
# Fork repository ini di GitHub
# Clone fork Anda
git clone https://github.com/YOUR_USERNAME/intervalrun.git
cd intervalrun
```

### Buat Branch Baru

```bash
# Buat branch untuk fitur/fix Anda
git checkout -b feature/nama-fitur

# Atau untuk bug fix
git checkout -b fix/nama-bug
```

### Lakukan Perubahan

1. Edit file yang diperlukan
2. Test di browser (mobile & desktop)
3. Pastikan tidak ada console error
4. Pastikan UI tetap responsive

### Commit & Push

```bash
# Add changes
git add .

# Commit dengan pesan yang jelas
git commit -m "feat: Tambah fitur X"
# atau
git commit -m "fix: Perbaiki bug Y"

# Push ke fork Anda
git push origin feature/nama-fitur
```

### Buat Pull Request

1. Buka repository Anda di GitHub
2. Klik "Pull Request"
3. Pilih branch Anda
4. Tulis deskripsi perubahan
5. Submit PR

### Panduan Kontribusi

- ✅ **Code Style**: Gunakan indentasi 4 spaces
- ✅ **Comments**: Tulis komentar untuk logika kompleks
- ✅ **Testing**: Test di minimal 2 browser berbeda
- ✅ **Mobile-First**: Prioritaskan tampilan mobile
- ✅ **No Dependencies**: Tetap gunakan vanilla JS (no framework)
- ✅ **Clean Code**: Hapus console.log sebelum commit

### Ide Kontribusi

Beberapa fitur yang bisa ditambahkan:

- [ ] Save/Load custom workout ke LocalStorage
- [ ] Export/Import workout sebagai JSON
- [ ] Dark mode toggle
- [ ] Statistik latihan (total waktu, kalori)
- [ ] Integrasi dengan Strava/Google Fit
- [ ] Notifikasi browser untuk alert
- [ ] Voice commands
- [ ] Suara TTS untuk nama interval

## 🌐 Deployment

### GitHub Pages

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **Enable GitHub Pages**
   - Buka repository di GitHub
   - Go to **Settings** → **Pages**
   - Source: Deploy from branch `master`
   - Folder: `/ (root)`
   - Save

3. **Akses Aplikasi**
   - URL: `https://[username].github.io/intervalrun/`
   - Tunggu ~1 menit untuk deployment pertama

### Netlify (Drag & Drop)

1. **Buka [Netlify](https://www.netlify.com/)**
2. **Sign up/Login** dengan GitHub
3. **Drag & Drop** folder `intervalrun` ke Netlify
4. **Deploy!** - Otomatis dapat URL `https://random-name-123.netlify.app`
5. **Custom domain** (opsional): Settings → Domain management

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd intervalrun
   vercel
   ```

3. **Follow prompts**
   - Setup project? `Yes`
   - Which scope? `Your account`
   - Link to existing? `No`
   - Project name? `intervalrun`
   - Directory? `./`

4. **Akses URL** yang diberikan: `https://intervalrun.vercel.app`

### Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd intervalrun
netlify deploy

# Pilih opsi:
# ? Create & configure a new site
# ? Team: Your team
# ? Site name: intervalrun
# ? Deploy path: .

# Production deploy
netlify deploy --prod
```

### Custom Domain

Setelah deploy ke platform manapun:

1. **Beli domain** (Namecheap, GoDaddy, CloudFlare, dll)
2. **Set DNS Records**:
   - GitHub Pages: CNAME → `username.github.io`
   - Netlify: CNAME → `your-site.netlify.app`
   - Vercel: CNAME → `your-site.vercel.app`
3. **Update settings** di platform hosting
4. **Tunggu DNS propagation** (~24 jam)

## 📄 Lisensi

MIT License - Silakan gunakan untuk project personal atau komersial.

## 👨‍💻 Author

**Arif Setiawan** - [@arifsetwn](https://github.com/arifsetwn)

## 🙏 Acknowledgments

- Desain terinspirasi dari kebutuhan pribadi saat latihan treadmill
- Audio beep menggunakan Web Audio API
- Ikon emoji dari Unicode

## 📞 Support

Jika menemukan bug atau punya pertanyaan:

- 🐛 **Bug Report**: [Open an issue](https://github.com/arifsetwn/intervalrun/issues)
- 💡 **Feature Request**: [Open an issue](https://github.com/arifsetwn/intervalrun/issues)
- 📧 **Email**: arifsetwn@gmail.com

---

**⭐ Jika aplikasi ini berguna, berikan star di GitHub!**

**🏃‍♂️ Happy Running!**
