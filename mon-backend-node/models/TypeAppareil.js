const { pool } = require('../config/db');

// Modele TypeAppareil - types d'appareils pour les demandes
const TypeAppareil = {
  // Recuperer tous les types d'appareils
  getAll: async () => {
    const query = 'SELECT * FROM TypeAppareil ORDER BY id';
    try {
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.error('Erreur getAll TypeAppareil:', error);
      throw error;
    }
  },

  // Recuperer un type par ID
  getById: async (id) => {
    const query = 'SELECT * FROM TypeAppareil WHERE id = ?';
    try {
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error('Erreur getById TypeAppareil:', error);
      throw error;
    }
  },

  // Creer un nouveau type
  create: async (data) => {
    const query = `
      INSERT INTO TypeAppareil (nom, icon, description, consommation_watts)
      VALUES (?, ?, ?, ?)
    `;
    const values = [data.nom, data.icon, data.description, data.consommation_watts];
    try {
      const [result] = await pool.query(query, values);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error('Erreur create TypeAppareil:', error);
      throw error;
    }
  },

  // Mettre a jour un type
  update: async (id, data) => {
    const query = `
      UPDATE TypeAppareil 
      SET nom = COALESCE(?, nom),
          icon = COALESCE(?, icon),
          description = COALESCE(?, description),
          consommation_watts = COALESCE(?, consommation_watts)
      WHERE id = ?
    `;
    const values = [data.nom, data.icon, data.description, data.consommation_watts, id];
    try {
      const [result] = await pool.query(query, values);
      if (result.affectedRows === 0) return null;
      return TypeAppareil.getById(id);
    } catch (error) {
      console.error('Erreur update TypeAppareil:', error);
      throw error;
    }
  },

  // Supprimer un type
  delete: async (id) => {
    // Recuperer avant suppression
    const type = await TypeAppareil.getById(id);
    if (!type) return null;
    
    const query = 'DELETE FROM TypeAppareil WHERE id = ?';
    try {
      await pool.query(query, [id]);
      return type;
    } catch (error) {
      console.error('Erreur delete TypeAppareil:', error);
      throw error;
    }
  }
};

module.exports = TypeAppareil;
