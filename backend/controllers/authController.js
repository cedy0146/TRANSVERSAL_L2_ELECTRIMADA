const Utilisateur = require('../models/Utilisateur');
const Foyer = require('../models/Foyer');
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const { nom, role, password, id_foyer } = req.body;
            if (!nom || !password) {
                return res.status(400).json({ success: false, error: 'Nom et mot de passe requis' });
            }

            const validation = validatePassword(password);
            if (!validation.isValid) {
                return res.status(400).json({ success: false, error: validation.error });
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

            const utilisateur = await Utilisateur.create({ nom, role, password, id_foyer: sanitizedFoyerId });
            const token = jwt.sign({ id: utilisateur.id_utilisateur }, process.env.JWT_SECRET || 'electrimada_secret', { expiresIn: '7d' });
            res.status(201).json({ success: true, token, data: utilisateur, message: 'Compte cree avec succes' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { nom, password } = req.body;
            if (!nom || !password) {
                return res.status(400).json({ success: false, error: 'Nom et mot de passe requis' });
            }

            const utilisateur = await Utilisateur.getByNom(nom);
            if (!utilisateur) {
                return res.status(404).json({ success: false, error: 'Utilisateur non trouve' });
            }

            if (!(await comparePassword(password, utilisateur.password)) ) {
                return res.status(401).json({ success: false, error: 'Mot de passe incorrect' });
            }

            const { id_utilisateur, id_foyer, nom: nomUtilisateur, role, created_at } = utilisateur;
            const token = jwt.sign({ id: id_utilisateur }, process.env.JWT_SECRET || 'electrimada_secret', { expiresIn: '7d' });
            res.json({
                success: true,
                token,
                data: { id_utilisateur, id_foyer, nom: nomUtilisateur, role, created_at }
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = authController;