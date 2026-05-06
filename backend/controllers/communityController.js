/**
 * Community Controller
 * Gestion des communautés et leurs statistiques
 * Route: /api/communities
 */

const Foyer = require('../models/Foyer');
const Batterie = require('../models/Batterie');
const Rapport = require('../models/Rapport');
const DemandeEnergie = require('../models/DemandeEnergie');

const communityController = {
    /**
     * GET /api/communities/:id
     * Récupérer les détails d'une communauté
     */
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            
            // Ici on simule une communauté basée sur le village
            // Dans un vrai système, il y aurait une table 'Communauté'
            const foyerCount = await Foyer.count();
            const batterie = await Batterie.getActive();
            const demandes = await DemandeEnergie.getAll();
            
            const communauté = {
                id: id,
                name: 'Communauté ElectriMada',
                location: 'Village Madagascar',
                members: foyerCount,
                totalCapacity: batterie ? batterie.capacite_totale : 100,
                dailyProduction: await getAverageProduction(),
                efficiency: await calculateEfficiency(),
                status: 'active',
                batteryLevel: batterie ? Math.round((batterie.capacite_actuelle / batterie.capacite_totale) * 100) : 0
            };
            
            res.json({ success: true, data: communauté });
        } catch (err) {
            console.error('Erreur getById:', err);
            res.status(500).json({ success: false, error: err.message });
        }
    },

    /**
     * GET /api/communities/:id/members
     * Récupérer les membres (foyers) de la communauté
     */
    getMembers: async (req, res) => {
        try {
            const { id } = req.params;
            const foyers = await Foyer.getAll();
            
            // Transformer en format membre
            const members = foyers.map(f => ({
                id: f.id_foyer,
                name: f.nom_responsable, // Correction du nom
                household: f.id_foyer,
                status: 'active',
                priorite: f.type_priorite,
                consommation: f.conso_estimee // Correction du nom
            }));
            
            // Pour une communauté unique, on retourne tous les foyers
            res.json({ success: true, data: members, count: members.length });
        } catch (err) {
            console.error('Erreur getMembers:', err);
            res.status(500).json({ success: false, error: err.message });
        }
    },

    /**
     * GET /api/communities/:id/stats
     * Récupérer les statistiques pour les graphiques
     */
    getStats: async (req, res) => {
        try {
            const { id } = req.params;
            const jours = parseInt(req.query.jours) || 7;
            
            // Récupérer les rapports des derniers jours
            const rapports = await Rapport.getRecent(jours);
            
            // Transformer en données graphiques
            const chartData = rapports.map(r => {
                const date = new Date(r.date_rapport);
                const joursSimplifiés = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
                return {
                    day: joursSimplifiés[date.getDay()],
                    production: r.production_solaire,
                    consumption: r.consommation_totale,
                    batteryStart: r.batterie_debut,
                    batteryEnd: r.batterie_fin,
                    demandesTraitees: r.nb_demandes_traitees,
                    demandesRefusees: r.nb_demandes_refusees
                };
            });
            
            // Calculer les totaux
            const stats = {
                totalProduction: rapports.reduce((sum, r) => sum + r.production_solaire, 0),
                totalConsumption: rapports.reduce((sum, r) => sum + r.consommation_totale, 0),
                avgEfficiency: rapports.length > 0 
                    ? Math.round((rapports.reduce((sum, r) => sum + r.consommation_totale, 0) / 
                             rapports.reduce((sum, r) => sum + r.production_solaire, 0)) * 100)
                    : 0,
                totalDemandesTraitees: rapports.reduce((sum, r) => sum + r.nb_demandes_traitees, 0),
                totalDemandesRefusees: rapports.reduce((sum, r) => sum + r.nb_demandes_refusees, 0)
            };
            
            res.json({ success: true, data: chartData, stats: stats });
        } catch (err) {
            console.error('Erreur getStats:', err);
            res.status(500).json({ success: false, error: err.message });
        }
    },

    /**
     * GET /api/communities
     * Liste des communautés (pour le moment une seule)
     */
    getAll: async (req, res) => {
        try {
            const foyers = await Foyer.getAll();
            const batterie = await Batterie.getActive();
            
            const communautés = [{
                id: 'com1',
                name: 'Communauté ElectriMada',
                location: 'Village Madagascar',
                members: foyers.length,
                totalCapacity: batterie ? batterie.capacite_totale : 100,
                status: 'active'
            }];
            
            res.json({ success: true, data: communautés, count: communautés.length });
        } catch (err) {
            console.error('Erreur getAll:', err);
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

/**
 * Fonctions helper pour les statistiques
 */
async function getAverageProduction() {
    try {
        const rapports = await Rapport.getRecent(7);
        if (rapports.length === 0) return 0;
        const total = rapports.reduce((sum, r) => sum + r.production_solaire, 0);
        return Math.round(total / rapports.length * 10) / 10;
    } catch (err) {
        return 0;
    }
}

async function calculateEfficiency() {
    try {
        const rapports = await Rapport.getRecent(7);
        if (rapports.length === 0) return 0;
        const totalProd = rapports.reduce((sum, r) => sum + r.production_solaire, 0);
        const totalCons = rapports.reduce((sum, r) => sum + r.consommation_totale, 0);
        if (totalProd === 0) return 0;
        return Math.round((totalCons / totalProd) * 100);
    } catch (err) {
        return 0;
    }
}

module.exports = communityController;
