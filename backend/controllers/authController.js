

const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/Utilisateur");
const Foyer = require("../models/Foyer");

const authController = {
  // REGISTER
  register: async (req, res) => {
    try {
      const { nom, role, password, id_foyer } = req.body;
      if (!nom || !password) {
        return res.status(400).json({ success: false, error: "Nom et mot de passe requis" });
      }

      // Vérifier si l'utilisateur existe déjà
      const existing = await Utilisateur.getByNom(nom);
      if (existing) {
        return res.status(409).json({ success: false, error: "Utilisateur déjà existant" });
      }

      // Vérifier foyer si fourni
      let sanitizedFoyerId = null;
      if (id_foyer !== undefined && id_foyer !== null && id_foyer !== "") {
        sanitizedFoyerId = parseInt(id_foyer, 10);
      }

      if (sanitizedFoyerId) {
        const foyer = await Foyer.getById(sanitizedFoyerId);
        if (!foyer) {
          return res.status(400).json({
            success: false,
            error: "Foyer introuvable. Utilisez un id_foyer valide ou laissez vide.",
          });
        }
      }

      // Stocker mot de passe en clair
      const utilisateur = await Utilisateur.create({
        nom,
        role,
        password: password,
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

      // Vérification mot de passe en clair
      if (password !== utilisateur.password) {
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

  // GET PROFILE (Vérification de session)
  getMe: async (req, res) => {
    try {
      // Note: Normalement, l'ID provient du middleware de vérification de token (JWT)
      // Pour le moment, nous récupérons le nom depuis les paramètres ou le corps pour le test
      const nom = req.query.nom || req.body.nom;
      
      if (!nom) {
        return res.status(401).json({ success: false, error: "Non autorisé" });
      }

      const utilisateur = await Utilisateur.getByNom(nom);
      if (!utilisateur) {
        return res.status(404).json({ success: false, error: "Utilisateur non trouvé" });
      }

      // Ne pas renvoyer le mot de passe
      const { password, ...userProfile } = utilisateur;
      res.json({ success: true, data: userProfile });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = authController;
