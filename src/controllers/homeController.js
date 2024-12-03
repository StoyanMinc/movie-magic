const router = require('express').Router();
const { getAllMovies, searchMovies } = require('../service/movieService');

router.get('/', async (req, res) => {
    const movies = await getAllMovies().lean();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/search', (req, res) => {
    const { title, genre, year } = req.query
    const movies = searchMovies(title, genre, year)
    res.render('search', { movies, title, genre, year });
});

module.exports = router;