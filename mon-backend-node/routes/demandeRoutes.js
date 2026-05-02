const express = require('express');
const router = express.Router();
const demandeController = require('../controllers/demandeController');

router.get('/', demandeController.getAll);
router.get('/pending', demandeController.getPending);
router.get('/priorisees', demandeController.getPriorisees);
router.get('/foyer/:idFoyer', demandeController.getByFoyer);
router.get('/:id', demandeController.getById);
router.post('/', demandeController.create);
router.put('/:id', demandeController.update);
router.put('/:id/accepter', demandeController.accepter);
router.delete('/:id', demandeController.delete);

module.exports = router;
