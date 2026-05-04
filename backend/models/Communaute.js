const db = require('../config/db');

const Communaute = {
  create: async (name, location, members = 0, production = 0, efficiency = 0) => {
    const query = `
      INSERT INTO communities (name, location, members, production, efficiency, created_at) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const result = await db.query(query, [name, location, members, production, efficiency]);
    return { id: result.insertId, name, location, members, production, efficiency };
  },

  getAll: async () => {
    const query = 'SELECT * FROM communities ORDER BY created_at DESC';
    return await db.query(query);
  },

  getById: async (id) => {
    const query = 'SELECT * FROM communities WHERE id = ?';
    const [rows] = await db.query(query, [id]);
    return rows[0];
  },

  update: async (id, updates) => {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    const query = `UPDATE communities SET ${fields} WHERE id = ?`;
    const result = await db.query(query, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const query = 'DELETE FROM communities WHERE id = ?';
    const result = await db.query(query, [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Communaute;
