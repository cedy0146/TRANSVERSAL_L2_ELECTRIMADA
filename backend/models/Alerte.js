const { pool } = require('../config/db');

class Alerte {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Alertes');
        return rows;
    }

    static async getByRapport(idRapport) {
        const [rows] = await pool.query('SELECT * FROM Alertes WHERE id_rapport = ?', [idRapport]);
        return rows;
    }

    static async create(data) {
        const { id_alerte, message_alerte, id_rapport } = data;
        const [result] = await pool.query(
            'INSERT INTO Alertes (id_alerte, message_alerte, id_rapport) VALUES (?, ?, ?)',
            [id_alerte, message_alerte, id_rapport]
        );
        return { id_alerte, ...data };
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM Alertes WHERE id_alerte = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Alerte;
