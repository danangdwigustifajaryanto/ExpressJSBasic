const express = require('express');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const bukuRoutes = require('./routes/bukuRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieRoutes = require('./routes/cookieRoutes');

dotenv.config();
require('./config/db');

// Setup morgan logging
app.use(morgan('dev'));

// Setup Cookie parser
app.use(cookieParser());

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//File Statics
app.use(express.static(path.join(__dirname, 'public')));

// Setup static files
app.use(express.static('public'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 menit
}));

// ✅ Flash middleware HARUS setelah session
app.use(flash());

// Middleware untuk set flash message ke res.locals (agar bisa diakses di EJS)
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes handling
app.use(cookieRoutes);  // Routes untuk cookie
app.use(authRoutes);    // Routes untuk auth
app.use('/buku', bukuRoutes); // Routes untuk buku

// Route utama redirect ke login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
