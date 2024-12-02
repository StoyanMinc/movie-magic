const router = require('express').Router();
const { createMovie, getAllMovies, getMovieById } = require('../service/movieCreater');

router.get('/movie/create', (req, res) => {

    res.render('create');
});

router.post('/movie/create', (req, res) => {
    const movies = getAllMovies();
    const formData = req.body;
    formData._id = movies[movies.length - 1]._id + 1;
    createMovie(formData)
    res.redirect('/');
});

router.get('/movie/:id', (req, res) => {
    const movie = getMovieById(req.params.id)
    movie.stars = new Array(Number(movie.rating)).fill(true);
    res.render('details', { movie });
});

module.exports = router;