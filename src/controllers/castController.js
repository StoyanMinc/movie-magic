const router = require('express').Router();

const { createCast } = require('../service/castService');

router.get('/create', (req, res) => {
    res.render('cast-create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;
    await createCast(castData);

    res.redirect('/');
});


module.exports = router;