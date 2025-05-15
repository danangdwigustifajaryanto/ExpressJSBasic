const mongoose = require('mongoose');

const bukuSchema = new mongoose.Schema({
    foto: String,
    judul: String,
    pengarang: String,
    penerbit: String,
    stok: Number
});

module.exports = mongoose.model('Buku', bukuSchema, 'buku');
