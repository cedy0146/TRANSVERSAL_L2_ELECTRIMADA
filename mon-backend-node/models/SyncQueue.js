const { pool } = require('../config/db');

class SyncQueue {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM SyncQueue');
        return rows;
    }

    static async getPending() {
        const [rows] = await pool.query('SELECT * FROM SyncQueue WHERE statut_envoi = FALSE');
        return rows;
    }

    static async create(data) {
        const { id_sync, id_rapport, statut_envoi } = data;
        const [result] = await pool.query(
            'INSERT INTO SyncQueue (id_sync, id_rapport, statut_envoi) VALUES (?, ?, ?)',
            [id_sync, id_rapport, statut_envoi || false]
        );
        return { id_sync, ...data };
    }

    static async marquerEnvoye(id) {
        const [result] = await pool.query(
            'UPDATE SyncQueue SET statut_envoi = TRUE WHERE id_sync = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM SyncQueue WHERE id_sync = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = SyncQueue;
