const express = require('express');
const router = express.Router();
const foyerController = require('../controllers/foyerController');

router.get('/', foyerController.getAll);
router.get('/:id', foyerController.getById);
router.post('/', foyerController.create);
router.put('/:id', foyerController.update);
router.delete('/:id', foyerController.delete);

module.exports = router;
