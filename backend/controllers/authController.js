const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/Utilisateur");
const Foyer = require("../models/Foyer");
const { validatePassword } = require("../utils/passwordUtils");

const authController = {
  // REGISTER
  register: async (req, res) => {
    try {
      const { nom, role, password, id_foyer } = req.body;
      if (!nom || !password) {
        return res.status(400).json({ success: false, error: "Nom et mot de passe requis" });
      }

      // Validation du mot de passe
      const validation = validatePassword(password);
      if (!validation.isValid) {
        return res.status(400).json({ success: false, error: validation.error });
      }

      // Vérifier si l'utilisateur existe déjà
      const existing = await Utilisateur.getByNom(nom);
      if (existing) {
        return res.status(409).json({ success: false, error: "Utilisateur déjà existant" });
      }

      // Vérifier foyer si fourni
      const foyerId = typeof id_foyer === "string" ? id_foyer.trim() : id_foyer;
      const sanitizedFoyerId = foyerId ? foyerId : null;

      if (sanitizedFoyerId) {
        const foyer = await Foyer.getById(sanitizedFoyerId);
        if (!foyer) {
          return res.status(400).json({
            success: false,
            error: "Foyer introuvable. Utilisez un id_foyer valide ou laissez vide.",
          });
        }
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer l'utilisateur
      const utilisateur = await Utilisateur.create({
        nom,
        role,
        password: hashedPassword,
        id_foyer: sanitizedFoyerId,
      });

      // Générer un token
      const token = jwt.sign(
        { id: utilisateur.id_utilisateur },
        process.env.JWT_SECRET || "electrimada_secret",
        { expiresIn: "7d" }
      );

      res.status(201).json({
        success: true,
        data: { user: utilisateur, token },
        message: "Compte créé avec succès",
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const { nom, password } = req.body;
      if (!nom || !password) {
        return res.status(400).json({ success: false, error: "Nom et mot de passe requis" });
      }

      const utilisateur = await Utilisateur.getByNom(nom);
      if (!utilisateur) {
        return res.status(404).json({ success: false, error: "Utilisateur non trouvé" });
      }

      // Vérification du mot de passe hashé
      const isValid = await bcrypt.compare(password, utilisateur.password);
      if (!isValid) {
        return res.status(401).json({ success: false, error: "Mot de passe incorrect" });
      }

      const { id_utilisateur, id_foyer, nom: nomUtilisateur, role, created_at } = utilisateur;
      const token = jwt.sign(
        { id: id_utilisateur },
        process.env.JWT_SECRET || "electrimada_secret",
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        data: {
          user: { id_utilisateur, id_foyer, nom: nomUtilisateur, role, created_at },
          token,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

module.exports = authController;
