const router = require('express').Router();
const { createMovie, getMovieById } = require('../service/movieService');
const { getCasts } = require('../service/castService');

router.get('/create', (req, res) => {

    res.render('create');
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
    res.render('details', { movie });
});

router.get('/:id/attach', async (req, res) => {
    const movie = await getMovieById(req.params.id).lean();
    const casts = await getCasts().lean();
    console.log(casts);

    res.render('cast-attach', { ...movie, casts });
});

router.post('/:id/attach', async (req, res) => {
    
});

module.exports = router;