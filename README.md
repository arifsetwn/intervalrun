# 🏃 IntervalRun

**Aplikasi timer interval untuk latihan treadmill yang mobile-friendly**

IntervalRun adalah aplikasi web sederhana untuk membantu Anda menjalankan latihan interval training di treadmill. Dengan tampilan yang besar dan jelas, aplikasi ini dirancang khusus untuk digunakan saat berlari di treadmill.

Demo : (https://arifsetwn.github.io/intervalrun/)

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

Kontribusi sangat diterima! Ikuti langkah berikut:

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


## 📄 Lisensi

MIT License - Silakan gunakan untuk project personal atau komersial.

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
