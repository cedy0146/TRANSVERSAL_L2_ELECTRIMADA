const { pool } = require('../config/db');

/**
 * Modèle Foyer pour les interactions directes avec MySQL
 * Gère le mapping entre les colonnes SQL et les objets JavaScript
 */
const Foyer = {
    // READ : Récupérer tous les foyers
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM Foyer');
        return rows;
    },

    // READ : Récupérer par ID
    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM Foyer WHERE id_foyer = ?', [id]);
        return rows[0];
    },

    // CREATE : Insérer dans la base
    create: async (data) => {
        const { nom_responsable, type_priorite, conso_estimee, communauteId } = data;
        const sql = `
            INSERT INTO Foyer (nom_responsable, type_priorite, conso_estimee, id_communaute) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await pool.query(sql, [nom_responsable, type_priorite, conso_estimee, communauteId]);
        
        return { 
            id_foyer: result.insertId, 
            nom_responsable, 
            type_priorite, 
            conso_estimee,
            id_communaute: communauteId
        };
    },

    // UPDATE : Mettre à jour MySQL
    update: async (id, data) => {
        const { nom_responsable, type_priorite, conso_estimee, id_communaute } = data;
        const sql = `
            UPDATE Foyer 
            SET nom_responsable = ?, type_priorite = ?, conso_estimee = ?, id_communaute = ?
            WHERE id_foyer = ?
        `;
        const [result] = await pool.query(sql, [nom_responsable, type_priorite, conso_estimee, id_communaute, id]);
        return result.affectedRows > 0;
    },

    // DELETE : Supprimer de la base
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM Foyer WHERE id_foyer = ?', [id]);
        return result.affectedRows > 0;
    },

    // COUNT : Nombre total (utilisé par le dashboard)
    count: async () => {
        const [rows] = await pool.query('SELECT COUNT(*) as total FROM Foyer');
        return rows[0].total;
    }
};

module.exports = Foyer;