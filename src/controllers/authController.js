const router = require('express').Router();

const { register, login } = require('../service/authService');
const getErrorMessage = require('../utils/getError');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await register(userData);
        res.redirect('/auth/login');

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('auth/register', { ...userData, error: errorMessage });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await login(email, password);
        res.cookie('auth', token)
        res.redirect('/');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('auth/login', { email, password, error: errorMessage });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;