const Utilisateur = require('../models/Utilisateur');
const Batterie = require('../models/Batterie');
const Foyer = require('../models/Foyer');
const DemandeEnergie = require('../models/DemandeEnergie');

const dashboardController = {
    getStats: async (req, res) => {
        console.log("[Dashboard] Début de la récupération des statistiques...");
        try {
            console.log("  -> Récupération Utilisateur.getStats()...");
            const userStats = await Utilisateur.getStats();
            
            console.log("  -> Récupération Batterie.getStats()...");
            const batterieStats = await Batterie.getStats();
            
            console.log("  -> Récupération Foyer.count()...");
            const foyerCount = await Foyer.count();
            
            console.log("  -> Récupération DemandeEnergie.getStats()...");
            const demandeStats = await DemandeEnergie.getStats();

            console.log("✅ Statistiques récupérées avec succès.");
            res.json({
                success: true,
                data: {
                    userStats: userStats,
                    batterieStats: batterieStats,
                    foyerStats: { total: foyerCount },
                    demandeStats: demandeStats
                }
            });
        } catch (error) {
            console.error('[Dashboard] ERREUR CRITIQUE:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message || 'Erreur interne du serveur lors de la recuperation des statistiques.' 
            });
        }
    }
};

module.exports = dashboardController;