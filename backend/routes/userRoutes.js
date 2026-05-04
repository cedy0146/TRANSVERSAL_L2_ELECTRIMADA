const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
const { authMiddleware } = require('../middleware/auth');
router.get('/stats', authMiddleware, userController.getStats);

module.exports = router;