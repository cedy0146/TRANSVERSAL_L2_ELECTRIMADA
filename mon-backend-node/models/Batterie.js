const { pool } = require('../config/db');

class Batterie {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Batterie');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Batterie WHERE id_batterie = ?', [id]);
        return rows[0] || null;
    }

    static async getActive() {
        const [rows] = await pool.query('SELECT * FROM Batterie LIMIT 1');
        return rows[0] || null;
    }

    static async create(data) {
        const { id_batterie, capacite_totale, capacite_actuelle, seuil_critique } = data;
        const [result] = await pool.query(
            'INSERT INTO Batterie (id_batterie, capacite_totale, capacite_actuelle, seuil_critique) VALUES (?, ?, ?, ?)',
            [id_batterie, capacite_totale, capacite_actuelle, seuil_critique]
        );
        return { id_batterie, ...data };
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
            `UPDATE Batterie SET ${fields.join(', ')} WHERE id_batterie = ?`,
            values
        );
        return result.affectedRows > 0;
    }

    static async updateNiveau(id, nouvelleCapacite) {
        const [result] = await pool.query(
            'UPDATE Batterie SET capacite_actuelle = ? WHERE id_batterie = ?',
            [nouvelleCapacite, id]
        );
        return result.affectedRows > 0;
    }

static async delete(id) {
        const [result] = await pool.query('DELETE FROM Batterie WHERE id_batterie = ?', [id]);
        return result.affectedRows > 0;
    }

    static async getStats() {
        const batterie = await Batterie.getActive();
        if (!batterie) return null;
        return {
            capacite_actuelle: batterie.capacite_actuelle,
            capacite_totale: batterie.capacite_totale,
            niveau: Math.round((batterie.capacite_actuelle / batterie.capacite_totale) * 100),
            seuil_critique: batterie.seuil_critique
        };
    }
}

module.exports = Batterie;
