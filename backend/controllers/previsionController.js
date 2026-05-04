const Rapport = require('../models/Rapport');
const Batterie = require('../models/Batterie');
const MovingAverage = require('../algorithms/MovingAverage');
const SegmentTree = require('../algorithms/SegmentTree');

const previsionController = {
    // Prevision solaire via Moyenne Glissante
    getPrevision: async (req, res) => {
        try {
            const { fenetre = 7 } = req.query;
            
            // Recuperer l'historique des rapports (consommation = production approx)
            const rapports = await Rapport.getRecent(parseInt(fenetre));
            
            if (rapports.length < 2) {
                return res.json({ 
                    success: true, 
                    message: 'Donnees insuffisantes pour la prevision. Utilisation de la moyenne par defaut (10 kWh/jour).',
                    prevision: { moyenne: 10.0, prediction_demain: 10.0, fiable: false }
                });
            }

            // Inverser pour ordre chronologique
            rapports.reverse();

            // Instancier la moyenne glissante
            const ma = new MovingAverage(parseInt(fenetre));

            // Charger les donnees historiques
            for (const r of rapports) {
                const productionJour = r.consommation_totale || 0;
                ma.addWithFallback(productionJour);
            }

            const moyenne = ma.getAverage();
            const prediction = ma.getPrediction();
            const batterie = await Batterie.getActive();

            // Prediction de la batterie apres-demain
            let batteriePredite = 0;
            if (batterie) {
                batteriePredite = Math.min(
                    batterie.capacite_totale,
                    batterie.capacite_actuelle - prediction + moyenne * 0.8
                );
                batteriePredite = Math.max(0, batteriePredite);
            }

            // Construction d'un segment tree pour les sommes rapides
            const productions = rapports.map(r => r.consommation_totale || 0);
            const st = new SegmentTree(productions);
            const totalPeriode = st.rangeQuery(0, productions.length - 1);
            const maxSubarray = Math.max(...productions);

            res.json({
                success: true,
                historique: {
                    jours: rapports.length,
                    productions: productions,
                    total_periode: totalPeriode.toFixed(2)
                },
                prevision: {
                    moyenne_glissante: moyenne.toFixed(2),
                    prediction_demain: Math.max(0, prediction).toFixed(2),
                    max_observed: maxSubarray,
                    fiable: rapports.length >= 3,
                    methode: 'Moyenne Glissante (Streaming) + Trend'
                },
                impact_batterie: batterie ? {
                    actuelle: batterie.capacite_actuelle,
                    predite_apres_demain: batteriePredite.toFixed(2),
                    alerte: batteriePredite < batterie.seuil_critique
                } : null,
                recommandation: prediction > moyenne * 1.2 
                    ? 'Journee ensoleillee prevue - bonne pour recharger' 
                    : prediction < moyenne * 0.5 
                    ? 'Faible production prevue - economiser l\'energie' 
                    : 'Production normale prevue'
            });

        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    // Calcul rapide de sommes/consommations via Segment Tree
    getConsommationIntervalle: async (req, res) => {
        try {
            const { debut, fin } = req.query;
            const rapports = await Rapport.getRecent(30); // 30 derniers jours
            
            const consommations = rapports.map(r => r.consommation_totale || 0);
            const st = new SegmentTree(consommations);
            
            const l = parseInt(debut) || 0;
            const r = Math.min(parseInt(fin) || consommations.length - 1, consommations.length - 1);

            const somme = st.rangeQuery(l, r);
            
            res.json({
                success: true,
                periode: { debut: l, fin: r },
                consommation_totale: somme.toFixed(2),
                complexite: 'O(log n) via Arbre de Segment',
                methode: 'Segment Tree'
            });

        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = previsionController;
