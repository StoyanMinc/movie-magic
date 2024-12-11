const router = require('express').Router();

const { createCast } = require('../service/castService');
const getErrorMessage = require('../utils/getError');

router.get('/create', (req, res) => {
    res.render('cast/cast-create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;

    try {
        await createCast(castData);
        res.redirect('/');

    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('cast/cast-create', { ...castData, error: errorMessage });
    }
});

module.exports = router;