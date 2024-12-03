const router = require('express').Router();
const { createMovie, getMovieById } = require('../service/movieService');

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

router.get('/movie/:id', async (req, res) => {
    const movie = await getMovieById(req.params.id).lean();
    movie.stars = new Array(Number(movie.rating)).fill(true);
    res.render('details', { movie });
});

module.exports = router;