const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

// Routes pour les communautés
router.get('/', communityController.getAll);
router.get('/:id', communityController.getById);
router.get('/:id/members', communityController.getMembers);
router.get('/:id/stats', communityController.getStats);

module.exports = router;
