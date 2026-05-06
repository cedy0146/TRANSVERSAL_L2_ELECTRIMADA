const { pool } = require('../config/db');

class Rapport {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Rapport');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Rapport WHERE id_rapport = ?', [id]);
        return rows[0] || null;
    }

    static async getRecent(limit = 7) {
        const [rows] = await pool.query(
            'SELECT * FROM Rapport ORDER BY date_rapport DESC LIMIT ?',
            [limit]
        );
        return rows;
    }

    static async create(data) {
        const { id_communaute, jour_semaine, consommation_totale, production_solaire, batterie_debut, batterie_fin, nb_demandes_traitees, nb_demandes_refusees, date_rapport } = data;
        const [result] = await pool.query(
            'INSERT INTO Rapport (id_communaute, jour_semaine, consommation_totale, production_solaire, batterie_debut, batterie_fin, nb_demandes_traitees, nb_demandes_refusees, date_rapport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_communaute, jour_semaine, consommation_totale, production_solaire, batterie_debut, batterie_fin, nb_demandes_traitees || 0, nb_demandes_refusees || 0, date_rapport]
        );
        return { id_rapport: result.insertId, ...data };
    }

    static async update(id, data) {
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        values.push(id);
        const [result] = await pool.query(
            `UPDATE Rapport SET ${fields.join(', ')} WHERE id_rapport = ?`,
            values
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Rapport WHERE id_rapport = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Rapport;
