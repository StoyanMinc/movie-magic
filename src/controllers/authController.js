const router = require('express').Router();
const { register, login } = require('../service/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    console.log(userData);
    await register(userData);

    res.redirect('/auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);

    console.log(token);
    res.redirect('/auth/login');
});

module.exports = router;