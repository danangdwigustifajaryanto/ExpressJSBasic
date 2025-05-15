const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const figchalk = require('figchalk');

exports.loginPage = (req, res) => res.render('auth/login');
exports.registerPage = (req, res) => res.render('auth/register');

exports.registerUser = async (req, res) => {
    const { nama, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ nama, email, password: hashed });
    res.redirect('/login');
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;  // Menyimpan user di session
    
    // Set cookie dengan nama user (jika login berhasil)
    res.cookie('userName', user.nama, { httpOnly: true, maxAge: 3600000 });  // Cookie akan bertahan 1 jam
    // Flash message untuk login berhasil
    req.flash('success_msg', `Selamat datang, ${user.nama}!`);
    // Log aktivitas login menggunakan figchalk
    const currentTime = new Date().toLocaleString();
    console.log(figchalk.mix(`[${currentTime}] ✓ Login berhasil`, "blueBright"));
    console.log(figchalk.chalk(`[${currentTime}] Session diset: ${user.nama}`, "yellowBright"));
    console.log(figchalk.chalk(`[${currentTime}] Cookies diset: ${user.nama}`, "cyan"));

    res.redirect('/buku/dashboard');  // Redirect ke dashboard setelah login
  } else {
    const currentTime = new Date().toLocaleString();
    console.log(figchalk.mix(`[${currentTime}] ❌ Login gagal untuk email: ${email}`, "redBright"));
    req.flash('error_msg', 'Login gagal! Email atau password salah.');
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
    if (req.session.user) {
        // Log aktivitas logout menggunakan figchalk
        const currentTime = new Date().toLocaleString();
        console.log(figchalk.mix(`[${currentTime}] Logout: Session ${req.session.user.nama} dihapus`, "yellowBright", "Graffiti"));
        res.clearCookie('userName');
    }
    req.session.destroy(() => {
        const currentTime = new Date().toLocaleString();
        console.log(figchalk.chalk(`[${currentTime}] Session dihancurkan.`, "green", "bgWhiteBright"));
        res.redirect('/login');
    });
};
