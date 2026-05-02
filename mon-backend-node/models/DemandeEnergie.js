const { pool } = require('../config/db');

class DemandeEnergie {
    /**
     * Obtenir toutes les demandes
     */
    static async getAll() {
        const [rows] = await pool.query(`
            SELECT d.*, f.nom as nom_foyer 
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
            SELECT d.*, f.nom as nom_foyer 
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
            SELECT d.*, f.nom as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            WHERE d.statut = 'pending'
            ORDER BY 
                CASE d.priorite 
                    WHEN 'high' THEN 1 
                    WHEN 'medium' THEN 2 
                    WHEN 'low' THEN 3 
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
            SELECT d.*, f.nom as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            WHERE d.statut = 'approved'
            ORDER BY d.date_demande DESC
        `);
        return rows;
    }

    /**
     * Obtenir les demandes rejetees
     */
    static async getRejected() {
        const [rows] = await pool.query(`
            SELECT d.*, f.nom as nom_foyer 
            FROM DemandeEnergie d 
            LEFT JOIN Foyer f ON d.id_foyer = f.id_foyer
            WHERE d.statut = 'rejected'
            ORDER BY d.date_demande DESC
        `);
        return rows;
    }

    /**
     * Creer une nouvelle demande
     */
    static async create(data) {
        const { id_foyer, energie_demandee, priorite, plage_horaire, type_appareil } = data;
        const [result] = await pool.query(
            `INSERT INTO DemandeEnergie 
            (id_foyer, energie_demandee, priorite, plage_horaire, type_appareil, statut) 
            VALUES (?, ?, ?, ?, ?, 'pending')`,
            [id_foyer, energie_demandee, priorite || 'medium', plage_horaire, type_appareil]
        );
        return { id_demande: result.insertId, ...data, statut: 'pending' };
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
            'UPDATE DemandeEnergie SET statut = \'approved\' WHERE id_demande = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    /**
     * Rejeter une demande
     */
    static async rejeter(id, raison_refus) {
        const [result] = await pool.query(
            'UPDATE DemandeEnergie SET statut = \'rejected\', raison_refus = ? WHERE id_demande = ?',
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
                SUM(CASE WHEN statut = 'pending' THEN 1 ELSE 0 END) as en_attente,
                SUM(CASE WHEN statut = 'approved' THEN 1 ELSE 0 END) as approuvees,
                SUM(CASE WHEN statut = 'rejected' THEN 1 ELSE 0 END) as rejetees,
                SUM(energie_demandee) as energie_totale
            FROM DemandeEnergie
        `);
        return rows[0];
    }
}

module.exports = DemandeEnergie;
