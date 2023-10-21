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

        async function buyCrypto() {
            const crypto = await cryptoService.getOne(cryptoId).lean();

            crypto['buyCrypto'].push(req.user._id);
            await cryptoService.buyCrypto(cryptoId, crypto);
        }

        const crypto = await cryptoService.getOne(cryptoId).lean();
        const isOwner = req.user?._id == crypto.owner._id;
        const isBought = crypto.buyCrypto.some((cryptoId) => cryptoId === req.user?._id);
        res.render('crypto/details', {crypto, isOwner, isLogged, buyCrypto, isBought});
    } catch (err) {
        res.render("crypto/details", {error: getErrorMessage(err)});
    }

});

router.get('/:cryptoId/details/edit', async (req, res) => {
    let cryptoId = req.params.cryptoId;

    let crypto = await cryptoService.getOne(cryptoId).lean();
    res.render('crypto/edit', {crypto});
})
router.post('/:cryptoId/details/edit', async (req, res) => {
    let cryptoId = req.params.cryptoId;
    let crypto = req.body;

    await cryptoService.update(cryptoId, crypto);

    res.redirect(`/cryptos/${cryptoId}/details`);
})

router.get('/:cryptoId/details/delete', async (req, res) => {
    let cryptoId = req.params.cryptoId;

    await cryptoService.delete(cryptoId);

    res.redirect('/cryptos')
})

module.exports =  router;