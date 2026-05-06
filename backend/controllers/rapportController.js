const Rapport = require('../models/Rapport');

const rapportController = {
    getAll: async (req, res) => {
        try {
            console.log("[Rapports] Récupération de la liste complète...");
            const rapports = await Rapport.getAll();
            res.json({ success: true, data: rapports, count: rapports.length });
        } catch (err) {
            console.error("[Rapports] Erreur lors du getAll:", err);
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const rapport = await Rapport.getById(req.params.id);
            if (!rapport) return res.status(404).json({ success: false, error: 'Rapport non trouve' });
            res.json({ success: true, data: rapport });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getRecent: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 7;
            const rapports = await Rapport.getRecent(limit);
            res.json({ success: true, data: rapports, periode_jours: limit });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const rapport = await Rapport.create(req.body);
            res.status(201).json({ success: true, data: rapport, message: 'Rapport cree' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await Rapport.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ success: false, error: 'Rapport non trouve' });
            res.json({ success: true, message: 'Rapport mis a jour' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deleted = await Rapport.delete(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, error: 'Rapport non trouve' });
            res.json({ success: true, message: 'Rapport supprime' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = rapportController;
