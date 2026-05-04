const express = require('express');
const router = express.Router();
const alerteController = require('../controllers/alerteController');

router.get('/', alerteController.getAll);
router.get('/rapport/:idRapport', alerteController.getByRapport);
router.post('/', alerteController.create);
router.delete('/:id', alerteController.delete);

module.exports = router;

