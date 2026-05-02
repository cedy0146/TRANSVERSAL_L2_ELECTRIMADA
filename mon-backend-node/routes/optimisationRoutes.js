const express = require('express');
const router = express.Router();
const optimisationController = require('../controllers/optimisationController');

router.post('/allocation', optimisationController.optimiserAllocation);
router.get('/mode-eco', optimisationController.activerModeEco);

module.exports = router;

