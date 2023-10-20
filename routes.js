const router = require('express').Router();

const homeContoller = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController');

router.use(homeContoller);
router.use(authController);
router.use('/cryptos',cryptoController);

module.exports = router;