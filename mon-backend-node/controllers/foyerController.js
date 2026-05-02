const Foyer = require('../models/Foyer');
const HashTable = require('../algorithms/HashTable');

// Cache local avec table de hachage pour acces rapide (offline-first)
const foyerCache = new HashTable(101);

const foyerController = {
    getAll: async (req, res) => {
        try {
            const foyers = await Foyer.getAll();
            // Mise en cache
            foyers.forEach(f => foyerCache.set(f.id_foyer, f));
            res.json({ success: true, data: foyers, count: foyers.length });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            // Essai cache d'abord
            let foyer = foyerCache.get(id);
            if (!foyer) {
                foyer = await Foyer.getById(id);
                if (foyer) foyerCache.set(id, foyer);
            }
            if (!foyer) return res.status(404).json({ success: false, error: 'Foyer non trouve' });
            res.json({ success: true, data: foyer });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const foyer = await Foyer.create(req.body);
            foyerCache.set(foyer.id_foyer, foyer);
            res.status(201).json({ success: true, data: foyer, message: 'Foyer cree avec succes' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await Foyer.update(id, req.body);
            if (!updated) return res.status(404).json({ success: false, error: 'Foyer non trouve' });
            // Rafraichir le cache
            const foyer = await Foyer.getById(id);
            foyerCache.set(id, foyer);
            res.json({ success: true, message: 'Foyer mis a jour' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Foyer.delete(id);
            if (!deleted) return res.status(404).json({ success: false, error: 'Foyer non trouve' });
            foyerCache.delete(id);
            res.json({ success: true, message: 'Foyer supprime' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = foyerController;
