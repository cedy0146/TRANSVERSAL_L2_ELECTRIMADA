const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ElectriMadaDB',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Fonction pour creer la base de donnees si elle n'existe pas
async function initDatabase() {
    let connection;
    try {
        // Connexion sans base de donnees
        connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });
        
        // Creer la base si elle n'existe pas
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        console.log('✅ Base de donnees ' + dbConfig.database + ' creee ou existante');
        
        // Utiliser la base
        await connection.query(`USE ${dbConfig.database}`);
        
        // Lire et executer le script init.sql
        const fs = require('fs');
        const path = require('path');
        const initSqlPath = path.join(__dirname, '../../data/init.sql');
        
        if (fs.existsSync(initSqlPath)) {
            const sql = fs.readFileSync(initSqlPath, 'utf8');
            // Separer les instructions par point-virgule
            const statements = sql.split(';').filter(stmt => stmt.trim());
            
            for (const statement of statements) {
                if (statement.trim()) {
                    try {
                        await connection.query(statement);
                    } catch (err) {
                        // Ignorer les erreurs de tables existantes (IF NOT EXISTS)
                        if (!err.message.includes('already exists')) {
                            console.log('  Note:', err.message);
                        }
                    }
                }
            }
            console.log('✅ Tables initialisees avec succes');
        } else {
            console.log('⚠ Fichier init.sql non trouve:', initSqlPath);
        }
        
        await connection.end();
        return true;
    } catch (err) {
        console.error('❌ Erreur lors de l\'initialisation:', err.message);
        if (connection) await connection.end();
        return false;
    }
}

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connexion MySQL reussie !');
        connection.release();
        return true;
    } catch (err) {
        console.error('❌ Erreur connexion MySQL:', err.message);
        return false;
    }
}

module.exports = { pool, testConnection, initDatabase };
