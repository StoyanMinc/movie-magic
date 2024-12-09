const router = require('express').Router();

const { register } = require('../service/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
   const userData = req.body;

    await register({ userData });
    
    res.redirect('/auth/login');
});

module.exports = router;