const express = require('express');
const router = express.Router();
const TypeAppareil = require('../models/TypeAppareil');

// Recuperer tous les types d'appareils
router.get('/', async (req, res) => {
  try {
    const types = await TypeAppareil.getAll();
    res.json(types);
  } catch (error) {
    console.error('Erreur routes type_appareil:', error);
    res.status(500).json({ error: error.message });
  }
});

// Recuperer un type par ID
router.get('/:id', async (req, res) => {
  try {
    const type = await TypeAppareil.getById(req.params.id);
    if (!type) {
      return res.status(404).json({ error: 'Type non trouve' });
    }
    res.json(type);
  } catch (error) {
    console.error('Erreur route type_appareil:', error);
    res.status(500).json({ error: error.message });
  }
});

// Creer un nouveau type
router.post('/', async (req, res) => {
  try {
    const type = await TypeAppareil.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    console.error('Erreur creation type_appareil:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mettre a jour un type
router.put('/:id', async (req, res) => {
  try {
    const type = await TypeAppareil.update(req.params.id, req.body);
    if (!type) {
      return res.status(404).json({ error: 'Type non trouve' });
    }
    res.json(type);
  } catch (error) {
    console.error('Erreur mise a jour type_appareil:', error);
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un type
router.delete('/:id', async (req, res) => {
  try {
    const type = await TypeAppareil.delete(req.params.id);
    if (!type) {
      return res.status(404).json({ error: 'Type non trouve' });
    }
    res.json(type);
  } catch (error) {
    console.error('Erreur suppression type_appareil:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
