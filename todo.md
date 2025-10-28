# Proyek: "IntervalRun" - Daftar Tugas

Dokumen ini adalah breakdown tugas untuk membangun MVP aplikasi "IntervalRun" v1.0 berdasarkan `prd.md`.

## Fase 0: Penyiapan Proyek (Setup)

- [x] Buat struktur *repository* proyek.
- [x] Buat file dasar: `index.html`, `style.css`, `app.js`.
- [x] Inisialisasi Git (`git init`).
- [x] Buat *commit* awal.
- [x] Tautkan file `style.css` dan `app.js` ke `index.html`.
- [x] Cari dan siapkan aset audio (isyarat):
    - [x] `beep-countdown.mp3` (untuk 3, 2, 1...)
    - [x] `beep-transition.mp3` (untuk pergantian interval)
- [x] Simpan aset audio di folder `/assets`.

## Fase 1: Struktur HTML (Skeleton)

- [ ] Siapkan *meta tag viewport* di `<head>` untuk desain *mobile-first* (NF-1).
- [ ] Buat struktur HTML untuk **3 Tampilan Utama** (bisa berupa `div` yang di-show/hide oleh JS):
    - [ ] **Tampilan 1: Pemilihan Latihan (`#selection-view`)**
        - [ ] Judul ("Pilih Latihan").
        - [ ] Daftar untuk *preset* (`#preset-list`) (FR 1.1).
        - [ ] Tombol "Buat Latihan Baru" (`#show-builder-btn`) (FR 1.2).
    - [ ] **Tampilan 2: Pembuat Latihan (`#builder-view`)**
        - [ ] Judul ("Buat Latihan Kustom").
        - [ ] Form (`#builder-form`) (FR 2.1).
        - [ ] Input: Nama Interval (`#interval-name`) (FR 2.2).
        - [ ] Input: Menit (`#interval-minutes`) (FR 2.2).
        - [ ] Input: Detik (`#interval-seconds`) (FR 2.2).
        - [ ] Tombol "Tambah Interval" (`#add-interval-btn`) (FR 2.3).
        - [ ] Daftar/area untuk menampilkan interval yang ditambahkan (`#custom-workout-list`) (FR 2.4).
        - [ ] Tombol "Mulai Latihan" (`#start-custom-btn`) (FR 2.6).
        - [ ] Tombol "Kembali" (untuk kembali ke Tampilan 1).
    - [ ] **Tampilan 3: Timer (`#timer-view`)**
        - [ ] Area teks untuk Nama Interval Saat Ini (`#current-interval-name`) (FR 3.1).
        - [ ] Area teks untuk Timer Hitung Mundur (`#current-timer`) (FR 3.1).
        - [ ] Area teks untuk Interval Berikutnya (`#next-interval-info`) (FR 1.3).
        - [ ] Area kontrol (`<div class="controls">`).
        - [ ] Tombol Start/Pause (`#start-pause-btn`) (FR 1.4).
        - [ ] Tombol Reset (`#reset-btn`) (FR 1.4).
        - [ ] Tombol "Akhiri Latihan" (untuk kembali ke Tampilan 1).

## Fase 2: Styling CSS (Mobile-First)

- [ ] Implementasikan *reset* CSS dasar.
- [ ] Terapkan `box-sizing: border-box;`.
- [ ] Atur *font* dasar (pilih font yang tebal dan jelas, misal: Roboto, Montserrat).
- [ ] **Style Tampilan Timer (`#timer-view`)**:
    - [ ] Prioritaskan ini. Buat agar *full-screen* di *mobile*.
    - [ ] Buat font `#current-timer` **SANGAT BESAR** (FR 1.1, NF-4).
    - [ ] Buat font `#current-interval-name` besar dan jelas.
    - [ ] Buat tombol kontrol besar dan mudah diketuk (NF-4).
    - [ ] Siapkan *utility classes* untuk warna latar (FR 4.4):
        - [ ] `.bg-run` (misal: merah/oranye).
        - [ ] `.bg-recover` (misal: hijau/biru).
        - [ ] `.bg-warmup` (misal: kuning).
- [ ] **Style Tampilan Pemilihan (`#selection-view`)**:
    - [ ] Buat daftar *preset* terlihat seperti tombol yang jelas.
- [ ] **Style Tampilan Pembuat (`#builder-view`)**:
    - [ ] Buat form mudah digunakan di *mobile*.
    - [ ] Style daftar interval kustom (`#custom-workout-list`) agar rapi.
    - [ ] Pastikan tombol "Hapus" di daftar mudah diketuk.
- [ ] Tambahkan media queries dasar untuk memastikan tampilan tidak "pecah" di tablet/desktop (meskipun bukan prioritas).

## Fase 3: Logika JavaScript (Core Timer Engine)

- [ ] Inisialisasi elemen DOM (querySelectorAll/getElementById).
- [ ] Buat variabel *state* (status) global:
    - [ ] `let currentWorkout = [];` (Array berisi objek latihan).
    - [ ] `let currentIntervalIndex = 0;`
    - [ ] `let timeLeftInInterval = 0;`
    - [ ] `let timerId = null;` (Untuk menyimpan `setInterval`).
    - [ ] `let isPaused = true;`
- [ ] Buat data **Preset Latihan** (FR 3.1) dalam bentuk *array of objects*.
- [ ] Buat fungsi `formatTime(seconds)` (mengubah detik ke "MM:SS").
- [ ] Buat fungsi `updateTimerDisplay()` (memperbarui UI timer).
- [ ] Buat fungsi `updateIntervalInfo()` (memperbarui UI nama interval & interval berikutnya).
- [ ] Buat fungsi `loadAudio()` dan siapkan objek `Audio` (FR 4.1).
- [ ] Buat fungsi `playBeep()` dan `playTransition()` (FR 4.2, 4.3).
- [ ] **Buat fungsi inti `tick()`** (FR 3.2):
    - [ ] `timeLeftInInterval--`.
    - [ ] Panggil `updateTimerDisplay()`.
    - [ ] Cek isyarat audio (jika `timeLeft <= 3`).
    - [ ] Cek akhir interval (jika `timeLeft < 0`):
        - [ ] Panggil `playTransition()`.
        - [ ] `currentIntervalIndex++`.
        - [ ] Cek akhir latihan (jika `index >= currentWorkout.length`).
        - [ ] Jika belum, panggil `loadInterval(currentIntervalIndex)`.
- [ ] Buat fungsi `loadInterval(index)`:
    - [ ] Ambil data dari `currentWorkout[index]`.
    - [ ] Atur `timeLeftInInterval`.
    - [ ] Panggil `updateIntervalInfo()`.
    - [ ] Terapkan kelas CSS warna yang sesuai (FR 4.4).
- [ ] Buat fungsi kontrol (FR 3.3):
    - [ ] `startTimer()` (mengatur `isPaused = false`, memulai `setInterval(tick, 1000)`).
    - [ ] `pauseTimer()` (mengatur `isPaused = true`, `clearInterval(timerId)`).
    - [ ] `resetTimer()` (panggil `pauseTimer()`, `loadInterval(0)`, `updateTimerDisplay()`).
- [ ] Pasang *event listener* untuk tombol `#start-pause-btn` dan `#reset-btn`.

## Fase 4: Logika JavaScript (Manajemen Tampilan & Builder)

- [ ] Buat fungsi `showView(viewId)` (menyembunyikan semua tampilan, lalu menampilkan yang dipilih).
- [ ] **Logika Tampilan Pemilihan (FR 1)**:
    - [ ] Tampilkan `#selection-view` saat *load*.
    - [ ] Buat fungsi `populatePresetList()` untuk mengisi `#preset-list` dari data *preset*.
    - [ ] Tambahkan *event listener* ke daftar *preset*. Saat diklik:
        - [ ] Set `currentWorkout` ke *preset* yang dipilih.
        - [ ] Panggil `loadInterval(0)`.
        - [ ] Panggil `showView('#timer-view')`.
    - [ ] Tambahkan *event listener* ke `#show-builder-btn` -> `showView('#builder-view')`.
- [ ] **Logika Tampilan Pembuat (FR 2)**:
    - [ ] Buat `let customWorkout = [];`.
    - [ ] Buat fungsi `updateCustomWorkoutList()` untuk me-render `customWorkout` ke `#custom-workout-list` (FR 2.4).
        - [ ] Setiap item harus punya tombol "Hapus" (FR 2.5).
    - [ ] Tambahkan *event listener* ke `#builder-form` (`event.preventDefault()`).
    - [ ] Saat form disubmit (atau `#add-interval-btn` diklik):
        - [ ] Baca nilai dari input (FR 2.2).
        - [ ] Validasi (pastikan durasi > 0).
        - [ ] Tambahkan objek interval baru ke `customWorkout` (FR 3.3).
        - [ ] Panggil `updateCustomWorkoutList()`.
        - [ ] Kosongkan input form.
    - [ ] Tambahkan *event listener* ke `#custom-workout-list` untuk *event delegation* tombol "Hapus" (FR 3.5).
    - [ ] Tambahkan *event listener* ke `#start-custom-btn` (FR 2.6):
        - [ ] Set `currentWorkout = [...customWorkout]`.
        - [ ] Panggil `loadInterval(0)`.
        - [ ] Panggil `showView('#timer-view')`.

## Fase 5: Pengujian & Perbaikan

- [ ] **Pengujian Fungsional:**
    - [ ] Tes alur *preset*: Pilih -> Mulai -> Jeda -> Lanjutkan -> Reset.
    - [ ] Tes alur *custom*: Buat -> Tambah 5 interval -> Hapus 1 interval -> Mulai -> Selesaikan latihan.
    - [ ] Tes transisi interval: Pastikan nama, timer, dan warna berubah dengan benar.
    - [ ] Tes akhir latihan: Pastikan timer berhenti dan menampilkan pesan "Selesai" (FR 3.2).
    - [ ] Tes audio: Pastikan *beep* 3-2-1 dan transisi berfungsi.
- [ ] **Pengujian Non-Fungsional:**
    - [ ] Tes di *browser mobile* (Chrome/Safari di HP) (NF-1).
    - [ ] Cek *layout*: Apakah tombol terlalu kecil? Apakah timer bisa dibaca dari jauh? (NF-4).
    - [ ] Tes akurasi timer: Jalankan sesi 10 menit, bandingkan dengan *stopwatch* eksternal (NF-3).
    - [ ] Tes *edge case*:
        - [ ] Apa yang terjadi jika interval 0 detik ditambahkan?
        - [ ] Apa yang terjadi jika latihan kosong di-"Mulai"?
- [ ] Perbaiki *bug* yang ditemukan.

## Fase 6: Deployment (v1.0 Launch)

- [ ] Bersihkan `console.log` dan kode *debug*.
- [ ] Buat *build* produksi (jika menggunakan *bundler*, jika tidak lewati).
- [ ] Deploy ke *static host* (GitHub Pages, Netlify, Vercel) (NF-2).
- [ ] Tes aplikasi di URL publik.