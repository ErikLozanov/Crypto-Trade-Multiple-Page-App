const router = require('express').Router();

const homeContoller = require('./controllers/homeController');
const authController = require('./controllers/authController');

router.use(homeContoller);
router.use(authController);

module.exports = router;