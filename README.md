# 📚 Aplikasi Manajemen Buku - Express.js + MongoDB

Ini adalah aplikasi web berbasis **Node.js** dan **Express.js** untuk manajemen data buku. Project ini dibangun dengan arsitektur **MVC**, menggunakan **MongoDB** sebagai database, serta dilengkapi berbagai fitur modern seperti **middleware**, **cookies & session**, **search**, **pagination**, dan **EJS templating**.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?logo=mongodb)
![Status](https://img.shields.io/badge/Status-Development-yellow)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## ✨ Fitur Utama

* ✅ **CRUD Data Buku** (Tambah, Lihat, Edit, Hapus)
* 🔍 **Search** berdasarkan judul
* 📄 **Pagination** otomatis
* 🧾 **Form Data Handling** dengan validasi
* 🗂 **MVC Architecture**
* 🌐 **EJS Templating** dan layouting
* 🧱 **Load Static File** (CSS & Gambar)
* 🔐 **Login & Register** dengan **bcrypt**
* 🍪 **Cookies & Session** untuk autentikasi
* 🔁 **Middleware** (checkSession, uploadImage)
* 📜 **Logging** menggunakan **morgan**
* 🎨 **Chalk & Figlet** untuk CLI styling
* 📂 **FS Module** untuk file handling (jika digunakan)
* 📦 **Modular Routing**
* 🌙 **Dark Mode** — Tampilan gelap yang nyaman untuk mata, bisa diaktifkan secara otomatis atau manual

---
![screely-1747283299717](https://github.com/user-attachments/assets/d414fa8a-e6fa-40b7-8e8d-e2584729bde1)
![screely-1747283785010](https://github.com/user-attachments/assets/26735213-8211-42b2-841a-7b8c94839c1e)


## 🗂️ Struktur Folder

```plaintext
.
├── config/              # Koneksi database (MongoDB)
├── controllers/         # Logika bisnis
├── middleware/          # Custom middleware (session, upload)
├── models/              # Schema Mongoose
├── public/              # Static file (CSS, gambar)
├── routes/              # Routing modular
├── views/               # Templating EJS
│   ├── auth/            # Halaman login/register
│   ├── layout/          # Layout utama
│   ├── formTambahBuku.ejs
│   ├── formUpdateBuku.ejs
│   └── daftarBuku.ejs
├── .env                 # Konfigurasi environment
├── index.js             # Entry point aplikasi
```

---

## 🚀 Cara Menjalankan Project

1. **Clone Repository**

   ```bash
   git clone https://github.com/username/bookexpress.git
   cd bookexpress
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Atur File .env**

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/bookdb
   SESSION_SECRET=rahasia
   ```

4. **Jalankan Aplikasi**

   ```bash
   nodemon index.js
   ```

---

## 🔐 Fitur Autentikasi

* **Login/Register** menggunakan EJS dan bcrypt
* **bcrypt** mengenkripsi password saat register dan memvalidasi saat login
* **Session** menyimpan status login user
* **Cookies** digunakan untuk menyimpan nama pengguna/logged state

---

## ⚙️ Penjelasan Fitur Teknis

| Fitur              | Penjelasan                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **MVC**            | Struktur kode dibagi jadi Model, View, dan Controller                                            |
| **Middleware**     | `checkSession.js` mengecek apakah user sudah login, `uploadImage.js` untuk menangani upload file |
| **Morgan**         | Logger middleware untuk mencatat request ke terminal                                             |
| **Chalk & Figlet** | Menampilkan teks dengan gaya di terminal saat server dijalankan                                  |
| **Cookies**        | Menyimpan data non-sensitif untuk identifikasi user                                              |
| **Session**        | Menyimpan status login user di server side                                                       |
| **Search**         | Mencari buku berdasarkan judul dengan query parameter                                            |
| **Pagination**     | Menampilkan daftar buku per halaman agar tidak terlalu panjang                                   |
| **FS Module**      | Jika digunakan, bisa untuk menyimpan gambar/upload file ke server                                |
| **EJS**            | Template engine untuk merender HTML dinamis                                                      |
| **Static File**    | CSS dan gambar di-load dari folder `/public`                                                     |

---

## 🧠 Routing Utama

| URL                 | Method | Fungsi                        |
| ------------------- | ------ | ----------------------------- |
| `/login`            | GET    | Tampilkan halaman login       |
| `/register`         | GET    | Tampilkan halaman register    |
| `/books`            | GET    | Daftar semua buku + search    |
| `/books/add`        | GET    | Form tambah buku              |
| `/books/add`        | POST   | Simpan data buku baru         |
| `/books/edit/:id`   | GET    | Form edit buku                |
| `/books/edit/:id`   | POST   | Simpan perubahan data buku    |
| `/books/delete/:id` | GET    | Hapus buku                    |
| `/logout`           | GET    | Logout user dan hapus session |

---

## 📚 Tujuan Pembelajaran

* Membuat aplikasi CRUD berbasis web dengan Express.js
* Menghubungkan Express dengan MongoDB menggunakan Mongoose
* Memahami alur cookies dan session di Node.js
* Membangun arsitektur MVC di backend
* Implementasi fitur seperti autentikasi, search, pagination, dan templating

---

## 📄 Lisensi

Project ini open-source dan tersedia di bawah lisensi [MIT](https://opensource.org/licenses/MIT).

---

## 🙌 Terima Kasih!

Kalau kamu merasa project ini bermanfaat, silakan di-fork, clone, atau kasih bintang ⭐ di repository kamu.
Happy coding! 🚀

---
