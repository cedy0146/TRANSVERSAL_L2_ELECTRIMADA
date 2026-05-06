const { pool } = require('../config/db');

class DemandeEnergie {
    /**
     * Obtenir toutes les demandes
     */
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT d.*, f.nom_responsable as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            ORDER BY d.date_demande DESC
        `);
        return rows;
    }

    /**
     * Obtenir une demande par ID
     */
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT d.*, f.nom_responsable as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            WHERE d.id_demande = ?
        `, [id]);
        return rows[0] || null;
    }

    /**
     * Obtenir les demandes par foyer
     */
    static async getByFoyer(idFoyer) {
        const [rows] = await pool.query(
            'SELECT * FROM DemandeEnergie WHERE id_foyer = ? ORDER BY date_demande DESC',
            [idFoyer]
        );
        return rows;
    }

    /**
     * Obtenir les demandes en attente
     */
    static async getPending() {
        const [rows] = await pool.query(`
            SELECT d.*, f.nom_responsable as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            WHERE d.statut = 'en_attente'
            ORDER BY 
                CASE d.priorite 
                    WHEN 'Critique' THEN 1
                    WHEN 'Haute' THEN 2 
                    WHEN 'Moyenne' THEN 3 
                    WHEN 'Basse' THEN 4 
                END,
                d.date_demande ASC
        `);
        return rows;
    }

    /**
     * Obtenir les demandes acceptees
     */
    static async getAccepted() {
        const [rows] = await pool.query(`
            SELECT d.*, f.nom_responsable as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            WHERE d.statut = 'approuvee'
            ORDER BY d.date_demande DESC
        `);
        return rows;
    }

    /**
     * Obtenir les demandes rejetees
     */
    static async getRejected() {
        const [rows] = await pool.query(`
            SELECT d.*, f.nom_responsable as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            WHERE d.statut = 'rejete'
            ORDER BY d.date_demande DESC
        `);
        return rows;
    }

    /**
     * Creer une nouvelle demande
     */
    static async create(data) {
        const { id_foyer, id_appareil, quantite_kwh, priorite } = data;
        const [result] = await pool.query(
            `INSERT INTO DemandeEnergie 
            (id_foyer, id_appareil, quantite_kwh, priorite, statut) 
            VALUES (?, ?, ?, ?, 'en_attente')`,
            [id_foyer, id_appareil, quantite_kwh, priorite || 'Moyenne']
        );
        return { id_demande: result.insertId, ...data, statut: 'en_attente' };
    }

    /**
     * Mettre a jour une demande
     */
    static async update(id, data) {
        const fields = [];
        const values = [];
        
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id_demande') {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }
        values.push(id);
        
        const [result] = await pool.query(
            `UPDATE DemandeEnergie SET ${fields.join(', ')} WHERE id_demande = ?`,
            values
        );
        return result.affectedRows > 0;
    }

    /**
     * Approuver une demande
     */
    static async accepter(id) {
        const [result] = await pool.query(
            'UPDATE DemandeEnergie SET statut = \'approuvee\' WHERE id_demande = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    /**
     * Rejeter une demande
     */
    static async rejeter(id, raison_refus) {
        const [result] = await pool.query(
            'UPDATE DemandeEnergie SET statut = \'rejete\', raison_refus = ? WHERE id_demande = ?',
            [raison_refus, id]
        );
        return result.affectedRows > 0;
    }

    /**
     * Supprimer une demande
     */
    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM DemandeEnergie WHERE id_demande = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    /**
     * Obtenir les statistiques des demandes
     */
    static async getStats() {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN statut = 'en_attente' THEN 1 ELSE 0 END) as en_attente,
                SUM(CASE WHEN statut = 'approuvee' THEN 1 ELSE 0 END) as approuvees,
                SUM(CASE WHEN statut = 'rejete' THEN 1 ELSE 0 END) as rejetees,
                SUM(quantite_kwh) as energie_totale
            FROM DemandeEnergie
        `);
        return rows[0];
    }
}

module.exports = DemandeEnergie;
