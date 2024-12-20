const router = require('express').Router();

const { createMovie, getMovieById, attach, editMovie, deleteMovie } = require('../service/movieService');
const castService = require('../service/castService');
const { isAuth } = require('../middlewares/authMiddleware');
const getErrorMessage = require('../utils/getError');

router.get('/create', isAuth, (req, res) => {
    res.render('movies/create');
});

router.post('/create', async (req, res) => {
    const newMovie = {
        ...req.body,
        owner: req.user._id
    };

    try {
        await createMovie(newMovie)
        res.redirect('/');

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('movies/create', {...newMovie, error: errorMessage});

    }
});

router.get('/:id', async (req, res) => {
    // const isAuthenticated = !!req.user;
    const movie = await getMovieById(req.params.id).lean();
    movie.stars = new Array(Number(movie.rating)).fill(true);
    const isOwner = req.user?._id == movie.owner;
    res.render('movies/details', { movie, isOwner });
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

router.get('/:movieId/delete', isAuth, async (req, res) => {
    await deleteMovie(req.params.movieId);
    res.redirect('/');
});


module.exports = router;