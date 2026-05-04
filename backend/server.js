require('dotenv').config();
const express = require('express');
const { testConnection, initDatabase } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS simple pour le frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/foyers', require('./routes/foyerRoutes'));
app.use('/api/batteries', require('./routes/batterieRoutes'));
app.use('/api/demandes', require('./routes/demandeRoutes'));
app.use('/api/rapports', require('./routes/rapportRoutes'));
app.use('/api/alertes', require('./routes/alerteRoutes'));
app.use('/api/optimisation', require('./routes/optimisationRoutes'));
app.use('/api/prevision', require('./routes/previsionRoutes'));
app.use('/api/appareils', require('./routes/typeAppareilRoutes'));
app.use('/api/communities', require('./routes/communitiesRoutes'));

// Route racine
app.get('/', (req, res) => {
    res.json({
        message: 'ElectriMada API - Gestion intelligente de l\'energie solaire communautaire',
        version: '1.0.0',
        status: 'online',
        endpoints: {
            foyers: '/api/foyers',
            batteries: '/api/batteries',
            demandes: '/api/demandes',
            rapports: '/api/rapports',
            alertes: '/api/alertes',
            optimisation: '/api/optimisation',
            prevision: '/api/prevision'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route non trouvee' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error('Erreur:', err);
    res.status(500).json({ success: false, error: 'Erreur interne du serveur' });
});

// Demarrage du serveur uniquement si ce fichier est execute directement
if (require.main === module) {
    app.listen(PORT, async () => {
        console.log('\n========================================');
        console.log('  ElectriMada Backend');
        console.log(`  Port: ${PORT}`);
        console.log('========================================\n');
// Initialiser la base de donnees au demarrage
        await initDatabase();
        
        // Tester la connexion
        await testConnection();
    });
}

module.exports = app;
