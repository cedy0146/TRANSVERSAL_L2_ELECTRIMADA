const express = require('express');
const router = express.Router();
const batterieController = require('../controllers/batterieController');

router.get('/', batterieController.getAll);
router.get('/active', batterieController.getActive);
router.get('/stats', batterieController.getStats);
router.get('/:id', batterieController.getById);
router.post('/', batterieController.create);
router.put('/:id', batterieController.update);
router.put('/:id/niveau', batterieController.updateNiveau);
router.delete('/:id', batterieController.delete);

module.exports = router;
