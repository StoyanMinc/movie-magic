const router = require('express').Router();

const { createMovie, getMovieById, attach, editMovie } = require('../service/movieService');
const castService = require('../service/castService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', (req, res) => {
    res.render('movies/create');
});

router.post('/create', isAuth, async (req, res) => {
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
    res.render('movies/details', { movie });
});

router.get('/:id/attach', isAuth, async (req, res) => {
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

router.get('/:movieId/edit', isAuth, async (req, res) => {
    const movie = await getMovieById(req.params.movieId).lean();
    res.render('movies/edit', { ...movie });
});

router.post('/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;
    await editMovie(movieId, movieData);

    res.redirect(`/movies/${movieId}`);
});


module.exports = router;