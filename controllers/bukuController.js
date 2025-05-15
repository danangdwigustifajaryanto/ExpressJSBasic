const Buku = require("../models/bukuModel");
const fs = require('fs');
const path = require('path');

const bukuController = {
getDaftarBuku: async (req, res) => {
    try {
      const bukuList = await Buku.find();
      const cookieName = req.cookies.userName || 'Guest';  // Nama dari cookie, jika tidak ada, default ke 'Guest'
      const sessionName = req.session.user ? req.session.user.nama : 'Guest';  // Nama dari session, jika tidak ada, default ke 'Guest'

          res.render('daftarBuku', {
      bukuList,
      cookieName,      // nama dari cookie
      sessionName     // nama dari session
    });
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getTambahBuku: (req, res) => {
    try {
      res.render('formTambahBuku');
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  tambahBuku: async (req, res) => {
    try {
      const { judul, pengarang, penerbit, stok } = req.body;
      const fotoPath = req.file ? req.file.filename : null;

      const buku = new Buku({
        foto: fotoPath,
        judul: judul,
        pengarang: pengarang,
        penerbit: penerbit,
        stok: stok,
      });
      await buku.save();
      req.flash('success_msg', 'Buku berhasil ditambahkan.');
      res.redirect('/buku/dashboard');
    } catch (error) {
      console.error("Error menambah buku:", error);
      res.status(500).send("Gagal menambah buku");
    }
  },

  getEditBuku: async (req, res) => {
  try {
    const buku = await Buku.findById(req.params.id);
    if (!buku) return res.status(404).send("Buku tidak ditemukan");
    res.render('formUpdateBuku', { buku });
  } catch (error) {
    console.error("Error get buku for edit:", error);
    res.status(500).send("Internal Server Error");
  }
},

updateBuku: async (req, res) => {
  try {
    const { judul, pengarang, penerbit, stok } = req.body;
    let updateData = { judul, pengarang, penerbit, stok };

    // Kalau ada file baru diupload
    if (req.file) {
      updateData.foto = req.file.filename;
    }

    await Buku.findByIdAndUpdate(req.params.id, updateData);
    req.flash('success_msg', 'Buku berhasil diperbarui.');
    res.redirect('/buku/dashboard');
  } catch (error) {
    console.error("Error update buku:", error);
    res.status(500).send("Gagal update buku");
  }
},


deleteBuku: async (req, res) => {
    try {
      const buku = await Buku.findById(req.params.id);
      if (buku) {
        // Jika buku memiliki foto (gambar)
        if (buku.foto) {
          const filePath = path.join(__dirname, '../public/image', buku.foto);
          
          // Cek jika file ada dan hapus file gambar
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Menghapus file gambar
            console.log(`File ${buku.foto} telah dihapus.`);
          }
        }
        
        // Hapus data buku dari database
        await Buku.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Buku berhasil dihapus.');
        res.redirect('/buku/dashboard');
      } else {
        res.status(404).send("Buku tidak ditemukan");
      }
    } catch (error) {
      req.flash('error_msg', 'Buku tidak ditemukan.');
      res.redirect('/buku/dashboard');
    }
  },
    cariBuku: async (req, res) => {
    try {
      const query = req.query.q?.toLowerCase() || '';
      const bukuList = await Buku.find();

      const hasil = bukuList.filter(b =>
        b.judul.toLowerCase().includes(query) ||
        b.pengarang.toLowerCase().includes(query) ||
        b.penerbit.toLowerCase().includes(query)
      );

      res.render('daftarBuku', {
        bukuList: hasil,
        success_msg: hasil.length ? `Ditemukan ${hasil.length} buku.` : 'Tidak ditemukan hasil.',
        cookieName: req.cookies.userName || 'Guest',
        sessionName: req.session.user ? req.session.user.nama : 'Guest'
      });
    } catch (err) {
      console.error("Error search:", err);
      res.status(500).send('Terjadi kesalahan saat mencari buku.');
    }
  },
  
};

module.exports = bukuController;
