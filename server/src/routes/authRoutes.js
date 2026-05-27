const express = require('express');
const router = express.Router();
// Controllers will be imported here

router.post('/signup', (req, res) => {
    res.json({ message: 'Signup route working' });
});

router.post('/login', (req, res) => {
    res.json({ message: 'Login route working' });
});

module.exports = router;
