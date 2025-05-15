const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');
const checkSession = require('../middleware/checkSession');
const uploadImage = require("../middleware/uploadImage");

// Route ke dashboard (menampilkan semua buku)
router.get('/dashboard', bukuController.getDaftarBuku);

// 🔍 Tambahkan ini:
router.get('/cari', checkSession, bukuController.cariBuku);

// Form tambah buku
router.get('/tambah', checkSession, bukuController.getTambahBuku);

// Tambah buku ke database (dengan upload gambar)
router.post('/tambah', checkSession, uploadImage.single("foto"), bukuController.tambahBuku);

//update buku
router.get('/edit/:id', checkSession, bukuController.getEditBuku);
// Proses update
router.post('/edit/:id', checkSession, uploadImage.single('foto'), bukuController.updateBuku);

// Hapus buku
router.get('/delete/:id', checkSession, bukuController.deleteBuku);

module.exports = router;
