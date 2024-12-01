const router = require('express').Router();
const { createMovie } = require('../service/movieCreater');

router.get('/movie/create', (req, res) => {
    res.render('create');
});

router.post('/movie/create', (req, res) => {
    const formData = req.body;
    createMovie(formData)

    res.redirect('/');
})

module.exports = router;