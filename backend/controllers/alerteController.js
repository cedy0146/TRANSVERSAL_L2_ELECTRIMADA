const Alerte = require('../models/Alerte');

const alerteController = {
    getAll: async (req, res) => {
        try {
            const alertes = await Alerte.getAll();
            res.json({ success: true, data: alertes, count: alertes.length });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getByRapport: async (req, res) => {
        try {
            const alertes = await Alerte.getByRapport(req.params.idRapport);
            res.json({ success: true, data: alertes });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const alerte = await Alerte.create(req.body);
            res.status(201).json({ success: true, data: alerte, message: 'Alerte creee' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deleted = await Alerte.delete(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, error: 'Alerte non trouvee' });
            res.json({ success: true, message: 'Alerte supprimee' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = alerteController;
