const express = require('express');
const router = express.Router();

// Route untuk set cookie
router.get('/set-cookie', (req, res) => {
    res.cookie('user', 'JohnDoe', { maxAge: 3600000, httpOnly: true });  // Cookie expired dalam 1 jam
    res.send('Cookie "user" set to "JohnDoe"');
});

// Route untuk membaca cookie
router.get('/cookies', (req, res) => {
    const user = req.cookies.user;  // Akses cookie 'user'
    if (user) {
        res.send(`Cookie "user" is: ${user}`);
    } else {
        res.send('Cookie "user" is not set.');
    }
});

// Route untuk clear cookie
router.get('/clear-cookie', (req, res) => {
    res.clearCookie('user');
    res.send('Cookie "user" has been cleared');
});

module.exports = router;
