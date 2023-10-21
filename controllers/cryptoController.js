const router = require('express').Router();

const cryptoService = require('../services/cryptoService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/', async (req,res) => {
    
    try {
        const cryptos = await cryptoService.getAll().lean();
        res.render("crypto", {cryptos});
    } catch (err) {
        res.render("crypto", {error: getErrorMessage(err)});
    }
});

router.get('/create', async (req, res) => {
    res.render("crypto/create");
})
router.post('/create', async (req, res) => {
    const cryptoData = {...req.body,
    owner: req.user._id,
    };
    try {
        console.log('hi!');
        await cryptoService.create(cryptoData)
        res.redirect('/cryptos')
    } catch (err) {
        res.render("crypto/create", {error: getErrorMessage(err)});
    }
})

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const isLogged = req.user?._id;

    try {

        const crypto = await cryptoService.getOne(cryptoId).lean();
        const isOwner = req.user?._id == crypto.owner._id;
        console.log(isOwner);
        res.render('crypto/details', {crypto, isOwner, isLogged});
    } catch (err) {
        res.render("crypto/details", {error: getErrorMessage(err)});
    }

});

module.exports =  router;