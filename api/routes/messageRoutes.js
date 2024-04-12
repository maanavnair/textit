const { Router } = require('express');
const messageController = require('../controller/messageController');
const protectRoute = require('../middleware/protectRoute');

const router = Router();

router.get('/:id', protectRoute, messageController.getMessages);
router.post('/send/:id', protectRoute, messageController.sendMessage);

module.exports = router;