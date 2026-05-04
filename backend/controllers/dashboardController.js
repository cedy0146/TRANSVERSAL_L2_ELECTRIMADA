const Foyer = require('../models/Foyer');
const Batterie = require('../models/Batterie');
const Alerte = require('../models/Alerte');
const TypeAppareil = require('../models/TypeAppareil');
const DemandeEnergie = require('../models/DemandeEnergie');

// Cache pour stats
const statsCache = new Map();

const dashboardController = {
  getStats: async (req, res) => {
    try {
      const cacheKey = 'dashboard_stats';
      const cached = statsCache.get(cacheKey);
      const now = Date.now();

      // Vérifie le cache (5 min)
      if (cached && (now - cached.timestamp) < 5 * 60 * 1000) {
        return res.json({ success: true, data: cached.data });
      }

      // Récupération des données en parallèle
      const [foyers, batteries, alertes, appareils, demandes] = await Promise.all([
        Foyer.getAll(),
        Batterie.getAll(),
        Alerte.getAll(),
        TypeAppareil.getAll(),
        DemandeEnergie.getAll()
      ]);

      // Calcul consommation totale
      const totalConso = foyers.reduce((sum, f) => sum + parseFloat(f.consommation_moyenne || 0), 0);

      // Construction des stats
      const stats = {
        conso_actuelle: totalConso.toFixed(1) + ' kW',
        conso_mensuelle: (totalConso * 24 * 30).toFixed(1) + ' kWh',
        cout_estime: parseInt(totalConso * 24 * 30 * 180).toLocaleString() + ' Ar',
        appareils_actifs: appareils.length,
        batteries_ok: batteries.filter(b => (b.niveau || 0) > 20).length,
        alertes: alertes.slice(0, 5),
        appareils: appareils.slice(0, 4),
        demandes_total: demandes.length
      };

      // Mise en cache
      statsCache.set(cacheKey, { data: stats, timestamp: now });

      // Réponse JSON
      res.json({ success: true, data: stats });
    } catch (err) {
      console.error('Dashboard stats error:', err);
      res.status(500).json({ success: false, error: 'Erreur stats' });
    }
  }
};

module.exports = dashboardController;
