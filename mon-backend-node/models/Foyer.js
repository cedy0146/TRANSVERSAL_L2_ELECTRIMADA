const { pool } = require('../config/db');

class Foyer {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Foyer');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Foyer WHERE id_foyer = ?', [id]);
        return rows[0] || null;
    }

    static async create(data) {
        const { id_foyer, nom, type_priorite, consommation_moyenne, jours_sans_electricite } = data;
        const [result] = await pool.query(
            'INSERT INTO Foyer (id_foyer, nom, type_priorite, consommation_moyenne, jours_sans_electricite) VALUES (?, ?, ?, ?, ?)',
            [id_foyer, nom, type_priorite, consommation_moyenne, jours_sans_electricite || 0]
        );
        return { id_foyer, ...data };
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
            `UPDATE Foyer SET ${fields.join(', ')} WHERE id_foyer = ?`,
            values
        );
        return result.affectedRows > 0;
    }

static async delete(id) {
        const [result] = await pool.query('DELETE FROM Foyer WHERE id_foyer = ?', [id]);
        return result.affectedRows > 0;
    }

    static async count() {
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM Foyer');
        return rows[0].count;
    }
}

module.exports = Foyer;
