const Utilisateur = require('../models/Utilisateur');
const Foyer = require('../models/Foyer');
const { comparePin } = require('../utils/pinUtils');

const authController = {
    register: async (req, res) => {
        try {
            const { nom, role, pin, id_foyer } = req.body;
            if (!nom || !pin) {
                return res.status(400).json({ success: false, error: 'Nom et PIN requis' });
            }

            const existing = await Utilisateur.getByNom(nom);
            if (existing) {
                return res.status(409).json({ success: false, error: 'Utilisateur deja existant' });
            }

            const foyerId = typeof id_foyer === 'string' ? id_foyer.trim() : id_foyer;
            const sanitizedFoyerId = foyerId ? foyerId : null;

            if (sanitizedFoyerId) {
                const foyer = await Foyer.getById(sanitizedFoyerId);
                if (!foyer) {
                    return res.status(400).json({ success: false, error: 'Foyer introuvable. Utilisez un id_foyer valide ou laissez vide.' });
                }
            }

            const utilisateur = await Utilisateur.create({ nom, role, pin, id_foyer: sanitizedFoyerId });
            res.status(201).json({ success: true, data: utilisateur, message: 'Compte cree avec succes' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { nom, pin } = req.body;
            if (!nom || !pin) {
                return res.status(400).json({ success: false, error: 'Nom et PIN requis' });
            }

            const utilisateur = await Utilisateur.getByNom(nom);
            if (!utilisateur) {
                return res.status(404).json({ success: false, error: 'Utilisateur non trouve' });
            }

            if (!comparePin(pin, utilisateur.pin_hash)) {
                return res.status(401).json({ success: false, error: 'PIN incorrect' });
            }

            const { id_utilisateur, id_foyer, nom: nomUtilisateur, role, created_at } = utilisateur;
            res.json({
                success: true,
                data: { id_utilisateur, id_foyer, nom: nomUtilisateur, role, created_at }
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = authController;