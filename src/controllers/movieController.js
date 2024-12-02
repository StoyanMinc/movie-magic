const router = require('express').Router();
const { createMovie, getAllMovies, getMovieById } = require('../service/movieCreater');

router.get('/movie/create', (req, res) => {

    res.render('create');
});

router.post('/movie/create', async (req, res) => {
    const formData = req.body;
    try {
        await createMovie(formData)
        res.redirect('/');
        
    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
});

router.get('/movie/:id', (req, res) => {
    const movie = getMovieById(req.params.id)
    movie.stars = new Array(Number(movie.rating)).fill(true);
    res.render('details', { movie });
});

module.exports = router;