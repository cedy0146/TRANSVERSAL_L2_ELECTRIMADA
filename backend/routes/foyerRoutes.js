const express = require('express');
const router = express.Router();
const foyerController = require('../controllers/foyerController');

// READ : Récupérer la liste de tous les foyers
router.get('/', foyerController.getAll);

// READ : Récupérer un foyer spécifique par son ID
router.get('/:id', foyerController.getById);

// CREATE : Insérer un nouveau foyer dans MySQL
router.post('/', foyerController.create);

// UPDATE : Mettre à jour les informations d'un foyer (nom_responsable, conso_estimee, etc.)
router.put('/:id', foyerController.update);

// DELETE : Supprimer un enregistrement de la base de données
router.delete('/:id', foyerController.delete);

module.exports = router;