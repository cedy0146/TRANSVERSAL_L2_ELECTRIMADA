const express = require('express');
const router = express.Router();
const previsionController = require('../controllers/previsionController');

router.get('/solaire', previsionController.getPrevision);
router.get('/consommation-intervalle', previsionController.getConsommationIntervalle);

module.exports = router;

