const Utilisateur = require('../models/Utilisateur');

const userController = {
    getAll: async (req, res) => {
        try {
            const users = await Utilisateur.getAll();
            res.json({ success: true, data: users, count: users.length });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getStats: async (req, res) => {
        try {
            const stats = await Utilisateur.getStats();
            res.json({ success: true, data: stats });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = userController;