const { Router } = require('express');
const messageController = require('../controller/messageController');

const router = Router();

router.post('/send/:id', messageController.sendMessage);

module.exports = router;