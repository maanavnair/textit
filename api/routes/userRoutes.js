const { Router } = require('express');
const userController = require('../controller/userController');
const protectRoute = require('../middleware/protectRoute');

const router = Router();

router.get('/', protectRoute, userController.getUsersForSidebar);

module.exports = router;