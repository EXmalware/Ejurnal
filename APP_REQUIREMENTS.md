# Analisis dan Kebutuhan Aplikasi E-Jurnal

## 1. Ringkasan aplikasi
Aplikasi ini merupakan sistem jurnal digital berbasis web untuk kebutuhan pembelajaran dan monitoring siswa di sekolah. Fokus utama aplikasi mencakup:
- input jurnal harian guru
- pencatatan kehadiran siswa
- pengelolaan data siswa dan kelas
- role-based access untuk guru, BK, wali kelas, dan admin
- rekap kehadiran serta laporan siswa
- ekspor data ke PDF dan integrasi dengan spreadsheet data sekolah

## 2. User yang terlibat
### 2.1 Guru Mata Pelajaran
- Mengisi jurnal harian
- Memilih kelas, jam pelajaran, materi, dan ruang
- Menilai kehadiran siswa per sesi
- Menyimpan dokumentasi jika diperlukan

### 2.2 Guru BK
- Mengelola status siswa, termasuk siswa aktif dan keluar
- Melihat daftar siswa per kelas
- Mengelola izin siswa
- Menyediakan rekap kehadiran BK dan evaluasi siswa

### 2.3 Wali Kelas
- Melihat rekap kelas
- Menggunakan data siswa yang terhubung ke kelasnya

### 2.4 Admin / Operator
- Mengelola data master seperti siswa, ruang, guru, dan mapel
- Menjaga kualitas data dan sinkronisasi

## 3. Kebutuhan fungsional yang sudah ada
### 3.1 Autentikasi dan sesi
- Login menggunakan akun user
- Session diingat dan otomatis dipertahankan sesuai pengaturan remember me
- Data user disimpan di localStorage dan sinkron ke server

### 3.2 Dashboard
- Tampilkan statistik harian dan ringkasan jurnal
- Menampilkan agenda dan informasi penting
- Menampilkan menu yang disesuaikan berdasarkan role

### 3.3 Data siswa
- Data siswa dibaca dari sheet data siswa
- Daftar kelas dibuat dari data siswa
- Pencarian kelas berdasarkan nama kelas, wali kelas, dan BK
- Detail siswa per kelas
- Status siswa aktif / keluar

### 3.4 Jurnal harian
- Input jurnal dengan tanggal, jam, kelas, ruang, materi, mapel
- Pilihan status kehadiran siswa: hadir, alpha, izin, sakit
- Simpan jurnal ke data utama
- Validasi data agar tidak ada input yang kosong

### 3.5 Izin siswa
- Input siswa yang izin pada hari tertentu
- Menyimpan keterangan izin
- Menampilkan daftar siswa izin hari ini

### 3.6 Rekap dan laporan
- Rekap jurnal per kelas
- Evaluasi kehadiran siswa
- Tampilan laporan untuk guru BK dan guru mapel

### 3.7 Ekspor / PDF
- Export laporan ke PDF
- Menyertakan ringkasan dan tabel hasil kehadiran

## 4. Kebutuhan baru yang perlu ditambahkan
### 4.1 Kebutuhan utama yang harus segera ditambahkan
#### a. Validasi akses role yang lebih ketat
- Setiap menu harus dicek berdasarkan role secara konsisten
- Hindari akses manual ke route atau fungsi dengan URL langsung
- Jika user bukan BK, menu siswa / izin siswa tidak bisa diakses

#### b. Penanganan data kosong dan cache yang lebih aman
- Jika sheet data siswa gagal dimuat, aplikasi harus tetap menampilkan data dari cache localStorage
- Jika cache kosong, tampilkan pesan “data belum tersedia” yang jelas
- Data harus dipastikan tersimpan ulang secara otomatis saat sinkron berhasil

#### c. Perbaikan UI untuk layar mobile
- Ruang agar item terakhir tidak tertutup oleh bottom navigation
- Tinggi konten harus responsif terhadap safe-area mobile
- Scroll pada daftar harus nyaman dan tidak terpotong

#### d. Pencarian dan filter siswa yang lebih lengkap
- Cari siswa berdasarkan nama, NIS, kelas, atau status
- Filter siswa aktif, keluar, izin, sakit, alpha
- Tombol reset filter

#### e. Konfirmasi dan log perubahan status siswa
- Saat status siswa diubah, tampilkan log waktu dan user yang mengubah
- Simpan riwayat perubahan untuk audit

### 4.2 Kebutuhan operasional untuk BK
#### a. Daftar siswa masuk / keluar secara jelas
- Label status harus tampil lebih eksplisit
- Siswa keluar tidak muncul otomatis di kehadiran jurnal
- Daftar siswa keluar harus bisa dilihat kembali untuk alasan audit

#### b. Filter kelas dan tanggal untuk rekap BK
- BK perlu melihat rekap per kelas dan per tanggal tertentu
- Memberikan kemampuan untuk pilih rentang tanggal

#### c. Notifikasi status siswa
- Notifikasi saat siswa berubah status menjadi keluar atau aktif
- Ringkasan perubahan harian untuk BK

### 4.3 Kebutuhan data dan integrasi
#### a. Sinkronisasi data yang kuat
- Data siswa, jurnal, izin, guru BK, dan data master harus disinkronisasi secara berkala
- Jika internet terputus, aplikasi harus tetap bekerja dengan cache lokal
- Saat jaringan kembali aktif, data lokal harus sync kembali ke server

#### b. Backup data lokal
- Simpan salinan data penting di localStorage dan kemungkinan penyimpanan browser lain
- Sediakan tombol export data CSV / JSON untuk admin

### 4.4 Kebutuhan UX yang perlu ditambahkan
- Animasi transisi antar layar lebih halus
- Indikator loading saat data sedang dimuat
- Pesan error yang jelas untuk gagal memuat data atau gagal menyimpan
- Tombol refresh yang konsisten di semua bagian

## 5. Kebutuhan non-fungsional
### 5.1 Kinerja
- Waktu loading daftar siswa dan daftar kelas cepat
- Render halaman tetap responsif ketika data besar
- Hindari proses duplikat saat refresh data berulang

### 5.2 Keandalan
- Aplikasi harus tetap berjalan saat koneksi offline
- Data tidak boleh hilang begitu saja saat refresh browser
- Sinkronisasi harus idempotent dan aman

### 5.3 Keamanan
- Data sensitif siswa tidak boleh tampil sembarangan di layar publik
- Hanya role tertentu yang dapat mengubah status siswa
- Validasi server-side tetap diperlukan meski client sudah valid

### 5.4 Kemudahan penggunaan
- UI mobile-first
- Navigasi simple dan konsisten
- Label bahasa jelas untuk pengguna sekolah

## 6. User stories prioritas
### Prioritas tinggi
1. Sebagai BK, saya ingin melihat daftar siswa per kelas agar saya bisa memantau status siswa.
2. Sebagai BK, saya ingin mengubah status siswa ke aktif atau keluar agar data kehadiran konsisten.
3. Sebagai guru, saya ingin melihat daftar siswa kelas saat mengisi jurnal agar proses absen cepat.
4. Sebagai user, saya ingin aplikasi tetap menampilkan data saat internet sedang offline.

### Prioritas menengah
1. Sebagai BK, saya ingin melihat riwayat perubahan status siswa agar audit rapi.
2. Sebagai wali kelas, saya ingin melihat rekap kelas yang lebih terstruktur.
3. Sebagai admin, saya ingin backup data supaya tidak kehilangan informasi penting.

### Prioritas rendah
1. Sebagai user, saya ingin notifikasi status siswa otomatis.
2. Sebagai admin, saya ingin export data ke CSV untuk kebutuhan arsip.

## 7. Acceptance criteria umum
- Daftar siswa muncul di tab Siswa meskipun network tertunda atau cache aktif
- Navbar tidak menutupi item paling bawah saat scrolling
- User role BK mendapat akses yang sesuai
- Data status siswa dapat diubah dan langsung terlihat di daftar serta rekap kehadiran
- Aplikasi tetap dapat digunakan dalam kondisi offline dengan data cache

## 8. Rekomendasi pengembangan berikutnya
1. Prioritaskan bug UI mobile dan overlap navbar
2. Tambahkan manajemen status siswa dengan log audit
3. Perkuat validasi role dan fitur cache
4. Tambahkan filter dan pencarian lanjutan
5. Siapkan fitur export dan backup data

## 9. Kesimpulan
Aplikasi E-Jurnal sudah memiliki fondasi yang kuat untuk jurnal, attendance, dan rekap siswa. Kebutuhan utama yang perlu disempurnakan adalah kontrol role yang lebih ketat, ketahanan cache, keselamatan UI mobile, serta pengelolaan status siswa dan audit data untuk kebutuhan BK.
