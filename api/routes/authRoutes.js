const {Router} = require('express');
const authController = require('../controller/authController')

const router = Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);

module.exports = router;