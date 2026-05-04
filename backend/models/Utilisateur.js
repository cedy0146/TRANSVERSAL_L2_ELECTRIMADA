const { pool } = require('../config/db');


class Utilisateur {
    /**
     * Obtenir un utilisateur par ID
     */
    static async getById(id) {
        const [rows] = await pool.query(
            'SELECT id_utilisateur, id_foyer, nom, role, est_actif, created_at FROM Utilisateur WHERE id_utilisateur = ?', 
            [id]
        );
        return rows[0] || null;
    }

    /**
     * Obtenir un utilisateur par nom
     */
    static async getByNom(nom) {
        const [rows] = await pool.query(
            'SELECT * FROM Utilisateur WHERE nom = ?', 
            [nom]
        );
        return rows[0] || null;
    }

    /**
     * Obtenir tous les utilisateurs
     */
    static async getAll() {
        const [rows] = await pool.query(
            'SELECT id_utilisateur, id_foyer, nom, role, est_actif, created_at FROM Utilisateur ORDER BY nom'
        );
        return rows;
    }

    /**
     * Obtenir les utilisateurs par role
     */
    static async getByRole(role) {
        const [rows] = await pool.query(
            'SELECT * FROM Utilisateur WHERE role = ? ORDER BY nom',
            [role]
        );
        return rows;
    }

    /**
     * Obtenir les utilisateurs par foyer
     */
    static async getByFoyer(idFoyer) {
        const [rows] = await pool.query(
            'SELECT * FROM Utilisateur WHERE id_foyer = ?',
            [idFoyer]
        );
        return rows;
    }

     /**
      * Créer un nouvel utilisateur (avec hash du mot de passe)
      */
    static async create(data) {
        const { nom, role, password, id_foyer } = data;
        const hashedPassword = await hashPassword(password); // Hacher le mot de passe avec bcrypt
        const foyerValue = id_foyer || null;
        
        const [result] = await pool.query(
'INSERT INTO Utilisateur (nom, role, password, id_foyer) VALUES (?, ?, ?, ?)',
[nom, role || 'chef_foyer', hashedPassword, foyerValue]
        );

        return {
            id_utilisateur: result.insertId,
            nom,
            role: role || 'chef_foyer',
            id_foyer: foyerValue
        };
    }

    /**
     * Mettre a jour un utilisateur
     */
    static async update(id, data) {
        const fields = [];
        const values = [];
        
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id_utilisateur') {
                // Si c'est un nouveau PIN, le hasher
                if (key === 'password') {
                    fields.push('password = ?');
                    values.push(await hashPassword(value));
                } else {
                    fields.push(`${key} = ?`);
                    values.push(value);
                }
            }
        }
        values.push(id);
        
        const [result] = await pool.query(
            `UPDATE Utilisateur SET ${fields.join(', ')} WHERE id_utilisateur = ?`,
            values
        );
        return result.affectedRows > 0;
    }

    /**
     * Supprimer un utilisateur (desactivation)
     */
    static async delete(id) {
        const [result] = await pool.query(
            'UPDATE Utilisateur SET est_actif = FALSE WHERE id_utilisateur = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    /**
     * Vérifier le mot de passe d'un utilisateur
     */
    static async verifyPassword(nom, password) {
        const utilisateur = await Utilisateur.getByNom(nom);
        if (!utilisateur) {
            return null;
        }
        // Vérifier le mot de passe avec bcrypt
        if (await comparePassword(password, utilisateur.password)) {
            return utilisateur;
        }
        return null;
    }

    /**
     * Obtenir les statistiques des utilisateurs
     */
    static async getStats() {
        const [rows] = await pool.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN est_actif = TRUE THEN 1 ELSE 0 END) as actifs,
                SUM(CASE WHEN role = 'chef_foyer' THEN 1 ELSE 0 END) as chefs_foyer,
                SUM(CASE WHEN role = 'responsable_technique' THEN 1 ELSE 0 END) as responsables,
                SUM(CASE WHEN role = 'delegate_quartier' THEN 1 ELSE 0 END) as delegues
            FROM Utilisateur
        `);
        return rows[0];
    }
}

module.exports = Utilisateur;
