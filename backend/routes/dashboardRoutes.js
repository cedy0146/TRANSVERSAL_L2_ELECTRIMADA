const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route pour les statistiques generales du tableau de bord
router.get('/stats', dashboardController.getStats);

module.exports = router;