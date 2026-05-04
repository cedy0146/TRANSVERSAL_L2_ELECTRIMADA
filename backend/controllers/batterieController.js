const Batterie = require('../models/Batterie');

const batterieController = {
    getAll: async (req, res) => {
        try {
            const batteries = await Batterie.getAll();
            res.json({ success: true, data: batteries });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const batterie = await Batterie.getById(req.params.id);
            if (!batterie) return res.status(404).json({ success: false, error: 'Batterie non trouvee' });
            res.json({ success: true, data: batterie });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getActive: async (req, res) => {
        try {
            const batterie = await Batterie.getActive();
            if (!batterie) return res.status(404).json({ success: false, error: 'Aucune batterie configuree' });
            
            const pourcentage = (batterie.capacite_actuelle / batterie.capacite_totale) * 100;
            const critique = pourcentage <= batterie.seuil_critique;
            
            res.json({ 
                success: true, 
                data: { ...batterie, pourcentage: pourcentage.toFixed(2), est_critique: critique } 
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const batterie = await Batterie.create(req.body);
            res.status(201).json({ success: true, data: batterie, message: 'Batterie creee' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await Batterie.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ success: false, error: 'Batterie non trouvee' });
            res.json({ success: true, message: 'Batterie mise a jour' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    updateNiveau: async (req, res) => {
        try {
            const { id } = req.params;
            const { nouvelleCapacite } = req.body;
            const updated = await Batterie.updateNiveau(id, nouvelleCapacite);
            if (!updated) return res.status(404).json({ success: false, error: 'Batterie non trouvee' });
            res.json({ success: true, message: 'Niveau batterie mis a jour' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

delete: async (req, res) => {
        try {
            const deleted = await Batterie.delete(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, error: 'Batterie non trouvee' });
            res.json({ success: true, message: 'Batterie supprimee' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getStats: async (req, res) => {
        try {
            const stats = await Batterie.getStats();
            if (!stats) return res.status(404).json({ success: false, error: 'Aucune batterie configuree' });
            res.json({ success: true, data: stats });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = batterieController;
