const router = require('express').Router();
const { createMovie, getMovieById, attach } = require('../service/movieService');
const castService = require('../service/castService');

router.get('/create', (req, res) => {
    res.render('movies/create');
});

router.post('/create', async (req, res) => {
    const formData = req.body;
    try {
        await createMovie(formData)
        res.redirect('/');

    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
});

router.get('/:id', async (req, res) => {
    const movie = await getMovieById(req.params.id).lean();
    movie.stars = new Array(Number(movie.rating)).fill(true);
    // const casts = await castService.getByIds(movie.casts).lean();
    res.render('movies/details', { movie });
});

router.get('/:id/attach', async (req, res) => {
    const movie = await getMovieById(req.params.id).lean();
    const casts = await castService.getCasts().lean();
    res.render('cast/cast-attach', { ...movie, casts });
});

router.post('/:id/attach', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.id
    
    try {
        await attach(movieId, castId);
        res.redirect(`/movies/${movieId}/attach`);
    } catch (error) {
        console.log(error.message)
        res.redirect(`/movies/${movieId}/attach`);
    }

});

module.exports = router;