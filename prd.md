# Product Requirement Document: Treadmill Interval Timer Web App

**Produk:** "IntervalRun" (Nama kode/Nama produk)
**Tanggal:** 28 Oktober 2025
**Penulis:** (Nama Anda)
**Versi:** 1.0

---

### 1. Pendahuluan

Dokumen ini menguraikan persyaratan untuk "IntervalRun," sebuah aplikasi web *client-side* (berbasis browser) yang dirancang untuk memandu pengguna melalui *treadmill interval workouts*.

Inti dari aplikasi ini adalah *timer* hitung mundur yang dapat dikonfigurasi sepenuhnya, yang secara otomatis beralih antar segmen latihan (misalnya, pemanasan, lari cepat, pemulihan) sambil memberikan isyarat visual dan audio yang jelas.

### 2. Latar Belakang & Masalah

* **Masalah:** Melakukan *interval workout* di *treadmill* mengharuskan pengguna untuk terus-menerus memantau jam. Hal ini mengganggu fokus, canggung (harus menekan tombol di *treadmill* atau *stopwatch*), dan rentan terhadap kesalahan.
* **Solusi:** Sebuah aplikasi web sederhana yang dapat diakses dari *smartphone/tablet* yang diletakkan di *treadmill*. Pengguna mengatur sesi mereka satu kali, menekan "Start", dan aplikasi akan memandu mereka melalui seluruh latihan secara *hands-free* dengan isyarat yang jelas.

### 3. Target Audiens

1.  **Pelari Pemula (Persona: "Siti"):** Baru mengenal HIIT atau lari interval. Dia membutuhkan panduan yang sudah jadi. Dia menginginkan preset sederhana (misalnya, "Pemanasan 5 menit, 1 menit lari, 2 menit jalan, ulangi 5x") tanpa perlu banyak konfigurasi.
2.  **Pelari Berpengalaman (Persona: "Budi"):** Tahu persis program latihannya. Dia perlu kemampuan untuk membuat rutinitas yang sangat spesifik dan *custom* (misalnya, 8x 45 detik *sprint* dengan 90 detik pemulihan) dan tidak ingin dibatasi oleh *preset*.

### 4. Tujuan Produk (Goals)

* **Tujuan Pengguna:** Memungkinkan pengguna untuk menyelesaikan sesi *treadmill interval* secara penuh dari awal hingga akhir tanpa intervensi manual pada *timer*.
* **Tujuan Produk (v1.0):** Meluncurkan MVP fungsional yang memvalidasi dua kasus penggunaan inti: (1) Menjalankan latihan *preset*, dan (2) Membuat dan menjalankan latihan *custom*.

### 5. Fitur Inti & User Stories

#### Epik 1: Eksekusi Latihan (Timer)

Inti dari aplikasi.

* **FS-1.1:** *Sebagai pengguna,* saya ingin melihat *timer* hitung mundur yang **besar dan jelas** untuk interval saya saat ini, sehingga saya dapat membacanya dengan mudah sambil berlari.
* **FS-1.2:** *Sebagai pengguna,* saya ingin melihat **nama** dari interval saat ini (misalnya, "LARI CEPAT" atau "JALAN KAKI"), sehingga saya tahu apa yang harus saya lakukan.
* **FS-1.3:** *Sebagai pengguna,* saya ingin melihat **nama dan durasi** dari interval **berikutnya**, sehingga saya bisa bersiap untuk transisi.
* **FS-1.4:** *Sebagai pengguna,* saya ingin bisa **Memulai (Start)**, **Menjeda (Pause)**, dan **Mengatur Ulang (Reset)** seluruh sesi latihan saya.

#### Epik 2: Isyarat (Cues)

* **FS-2.1:** *Sebagai pengguna,* saya ingin mendengar **isyarat audio** (misalnya, "Bip") 3 detik before interval berakhir, sehingga saya tahu transisi akan datang tanpa harus melihat layar.
* **FS-2.2:** *Sebagai pengguna,* saya ingin mendengar **isyarat audio yang berbeda** (misalnya, "Bip Ganda") tepat saat interval baru dimulai.
* **FS-2.3:** *Sebagai pengguna,* saya ingin layar **mengubah warna** berdasarkan intensitas interval (misalnya, Merah untuk "Lari Cepat", Hijau untuk "Pemulihan"), sehingga saya mendapatkan umpan balik visual instan.

#### Epik 3: Konfigurasi Latihan

* **FS-3.1:** *Sebagai pengguna (Siti),* saya ingin dapat memilih dari daftar **3-5 latihan preset** (misalnya, "HIIT Pemula", "Tabata 4 Menit", "Piragacha"), sehingga saya bisa langsung mulai.
* **FS-3.2:** *Sebagai pengguna (Budi),* saya ingin mengakses halaman "Pembuat Latihan" di mana saya dapat **membuat latihan kustom** dari awal.
* **FS-3.3:** Saat membuat latihan, saya ingin dapat **menambahkan segmen interval** satu per satu.
* **FS-3.4:** Untuk setiap segmen, saya ingin dapat **menentukan Nama** (teks) dan **Durasi** (dalam menit dan detik).
* **FS-3.5:** Saat membuat latihan, saya ingin dapat **menghapus** segmen yang tidak saya inginkan.

### 6. Persyaratan Fungsional (Functional Requirements)

#### FR 1: Halaman Pemilihan Latihan (Halaman Utama)

1.1. Halaman harus menampilkan daftar *preset* latihan yang dapat diklik.
1.2. Halaman harus memiliki tombol/tautan yang jelas: "Buat Latihan Baru".
1.3. Mengklik *preset* atau "Mulai" pada latihan kustom akan mengarahkan pengguna ke Halaman Timer (FR 3).

#### FR 2: Halaman Pembuat Latihan Kustom

2.1. Halaman ini harus berisi formulir untuk menambahkan interval baru.
2.2. Formulir harus memiliki input:
    * `intervalName` (Tipe: Teks, misal: "Pemanasan")
    * `intervalMinutes` (Tipe: Angka, min: 0)
    * `intervalSeconds` (Tipe: Angka, min: 0, maks: 59)
2.3. Harus ada tombol "Tambah Interval".
2.4. Di bawah formulir, harus ada daftar *live-update* dari segmen-segmen yang telah ditambahkan.
2.5. Setiap item dalam daftar harus menampilkan Nama, Durasi (format MM:SS), dan tombol "Hapus".
2.6. Harus ada tombol "Simpan & Mulai" (atau "Mulai") untuk memulai latihan ini.

#### FR 3: Halaman Timer (Layar Eksekusi)

3.1. **Tampilan:**
    * `currentIntervalName`: Ditampilkan dengan font besar (misal: "SPRINT").
    * `currentTimer`: Ditampilkan dengan font *sangat besar* (misal: "00:29").
    * `nextIntervalName`: Ditampilkan dengan font kecil (misal: "Berikutnya: Pemulihan").
3.2. **Logika Timer:**
    * Timer harus menggunakan *engine* JavaScript yang akurat (misalnya, `setInterval` yang dikalibrasi) untuk menghitung mundur setiap detik.
    * Ketika `currentTimer` mencapai "00:00", mesin harus:
        a. Memainkan suara transisi (FR 4.2).
        b. Memuat interval berikutnya dari antrian latihan.
        c. Mengatur ulang `currentTimer` ke durasi interval baru.
        d. Memperbarui `currentIntervalName` dan `nextIntervalName`.
        e. Mengubah warna latar belakang (FR 4.3).
    * Jika itu adalah interval terakhir, timer harus berhenti dan menampilkan "Latihan Selesai!".
3.3. **Kontrol:**
    * Tombol "Start" memulai timer. Tombol ini berubah menjadi "Pause".
    * Tombol "Pause" menghentikan timer. Tombol ini berubah menjadi "Lanjutkan" (Resume).
    * Tombol "Reset" menghentikan timer dan mengembalikannya ke awal interval pertama.

#### FR 4: Isyarat Audio-Visual

4.1. Aplikasi harus memuat file audio (misal: `beep.mp3`, `transition.mp3`) saat dimuat.
4.2. Logika timer (FR 3.2) harus memicu `beep.mp3` pada 3s, 2s, dan 1s.
4.3. Logika timer (FR 3.2) harus memicu `transition.mp3` pada 0s.
4.4. Warna latar belakang CSS untuk Halaman Timer harus berubah.
    * *Contoh Aturan:* Jika `intervalName` mengandung "Lari" atau "Sprint" -> `background-color: #FF6B6B;` (Merah).
    * *Contoh Aturan:* Jika `intervalName` mengandung "Jalan" atau "Pulih" -> `background-color: #4ECDC4;` (Hijau/Biru).
    * *Default:* `background-color: #F7FFF7;` (Putih).

### 7. Persyaratan Non-Fungsional

* **NF-1 (Responsif):** Desain harus *mobile-first*. Tampilan harus optimal pada layar *smartphone* dalam mode potret. Teks timer harus dapat dibaca dari jarak 1-2 meter.
* **NF-2 (Teknologi):** Harus berupa aplikasi web statis (HTML, CSS, Vanilla JavaScript). Tidak memerlukan *backend* atau *database* untuk v1.0.
* **NF-3 (Performa):** Aplikasi harus dimuat dengan cepat. *Timer* harus tetap akurat dan tidak "melayang" (*drift*) secara signifikan selama sesi 30 menit.
* **NF-4 (Aksesibilitas):** Kontras warna harus tinggi (misalnya, teks putih besar di latar belakang berwarna). Tombol kontrol harus besar dan mudah diketuk.

### 8. Di Luar Cakupan (Out of Scope untuk v1.0)

Fitur-fitur berikut **TIDAK AKAN** disertakan dalam rilis pertama untuk menjaga fokus:

* Akun pengguna dan penyimpanan latihan di *database*.
* Menyimpan latihan kustom ke `localStorage` *browser* (Ini adalah kandidat utama untuk v1.1).
* Fungsi "Pengulangan" (misalnya, ulangi [1 menit lari, 2 menit jalan] 8 kali). (Untuk v1, pengguna harus menambahkannya 8 kali secara manual).
* Mengedit atau menyusun ulang interval (hanya "Tambah" dan "Hapus").
* Integrasi musik (Spotify, dll.).
* Pelacakan riwayat atau statistik latihan.