const mysql = require('mysql2/promise');

/**
 * Configuration du pool de connexion MySQL
 * Utilise mysql2/promise pour supporter async/await utilisé dans les modèles
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'electrimada',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Teste la connexion au pool MySQL
 */
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connexion à la base de données MySQL réussie.');
        connection.release();
    } catch (err) {
        console.error('❌ Erreur de connexion à MySQL:', err.message);
    }
};

/**
 * Initialisation de la base de données (si nécessaire)
 */
const initDatabase = async () => {
    // Les schémas et la création des tables sont désormais gérés par 
    // les modèles ou des scripts SQL externes.
    console.log('📡 Pool de connexion MySQL configuré et prêt.');
};

module.exports = { pool, testConnection, initDatabase };