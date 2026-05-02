const express = require('express');
const router = express.Router();
const rapportController = require('../controllers/rapportController');

router.get('/', rapportController.getAll);
router.get('/recent', rapportController.getRecent);
router.get('/:id', rapportController.getById);
router.post('/', rapportController.create);
router.put('/:id', rapportController.update);
router.delete('/:id', rapportController.delete);

module.exports = router;

