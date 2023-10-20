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

module.exports =  router;