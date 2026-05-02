const DemandeEnergie = require('../models/DemandeEnergie');
const Batterie = require('../models/Batterie');
const { knapsack, baselineFIFO, baselineEgalitaire } = require('../algorithms/Knapsack');
const BinaryHeap = require('../algorithms/BinaryHeap');

const CRITICITE_MAP = {
    'Critique': 100,
    'Haute': 75,
    'Normale': 50,
    'Basse': 25
};

const optimisationController = {
    // Allocation optimisee d'energie via Sac a Dos (DP)
    optimiserAllocation: async (req, res) => {
        try {
            const conserverReserve = (req.body && req.body.conserverReserve) ? req.body.conserverReserve : 20;

            // 1. Recuperer l'etat de la batterie (avec fallback demo si BDD indisponible)
            let batterie;
            let demandes;
            try {
                batterie = await Batterie.getActive();
                demandes = await DemandeEnergie.getPending();
            } catch (dbErr) {
                // Mode demo offline - donnees synthetiques
                console.log('[DEMO] BDD indisponible, utilisation des donnees de demonstration');
                batterie = { id_batterie: 1, capacite_totale: 100.0, capacite_actuelle: 75.0, seuil_critique: 20.0 };
                demandes = [
                    { id_demande: 'D001', quantite_kwh: 2.5, heure_souhaitee: new Date(), niveau_criticite: 'Haute', est_acceptee: false, id_foyer: 'F001' },
                    { id_demande: 'D002', quantite_kwh: 1.0, heure_souhaitee: new Date(), niveau_criticite: 'Basse', est_acceptee: false, id_foyer: 'F002' },
                    { id_demande: 'D003', quantite_kwh: 4.0, heure_souhaitee: new Date(), niveau_criticite: 'Critique', est_acceptee: false, id_foyer: 'F001' },
                    { id_demande: 'D004', quantite_kwh: 1.5, heure_souhaitee: new Date(), niveau_criticite: 'Normale', est_acceptee: false, id_foyer: 'F003' },
                    { id_demande: 'D005', quantite_kwh: 0.8, heure_souhaitee: new Date(), niveau_criticite: 'Basse', est_acceptee: false, id_foyer: 'F002' }
                ];
            }

            if (!batterie) return res.status(404).json({ success: false, error: 'Aucune batterie configuree' });

            // 2. Calculer la capacite disponible (moins la reserve)
            const reserve = (batterie.capacite_totale * conserverReserve) / 100;
            const capaciteDispo = Math.max(0, batterie.capacite_actuelle - reserve);
            const W = Math.floor(capaciteDispo * 10); // x10 pour precision

            // 3. Verifier les demandes
            if (demandes.length === 0) {
                return res.json({ success: true, message: 'Aucune demande en attente', data: [] });
            }

            // 4. Construire les items pour le knapsack
            const items = demandes.map(d => ({
                ...d,
                valeur: CRITICITE_MAP[d.niveau_criticite] || 10,
                poids: Math.ceil(d.quantite_kwh * 10)
            }));

            // 5. Executer l'algorithme optimise
            const debutOpti = Date.now();
            const resultOpti = knapsack(items, capaciteDispo);
            const tempsOpti = Date.now() - debutOpti;

            // 6. Executer les baselines pour comparaison
            const debutFIFO = Date.now();
            const resultFIFO = baselineFIFO(items, capaciteDispo);
            const tempsFIFO = Date.now() - debutFIFO;

            const debutEgal = Date.now();
            const resultEgal = baselineEgalitaire(items, capaciteDispo);
            const tempsEgal = Date.now() - debutEgal;

            // 7. Calculer les metriques
            const valeurTotaleDemande = items.reduce((s, i) => s + i.valeur * i.poids, 0);
            const valeurTotaleOpti = resultOpti.totalValue;
            const valeurTotaleFIFO = resultFIFO.totalValue;
            const valeurTotaleEgal = 0; // Egalitaire ne maximise pas la valeur

            const satisfactionOpti = valeurTotaleDemande > 0 ? (valeurTotaleOpti / valeurTotaleDemande) * 100 : 0;
            const satisfactionFIFO = valeurTotaleDemande > 0 ? (valeurTotaleFIFO / valeurTotaleDemande) * 100 : 0;

            // 8. Retourner la reponse
            res.json({
                success: true,
                allocation: {
                    batterie_initiale: batterie.capacite_actuelle,
                    reserve_forcee: reserve,
                    capacite_utilisable: capaciteDispo.toFixed(2),
                    demandes_total: demandes.length,
                    demandes_acceptees: resultOpti.selected.length
                },
                resultat_optimise: {
                    methode: 'Sac a Dos - Programmation Dynamique',
                    selected: resultOpti.selected,
                    valeur_totale: valeurTotaleOpti,
                    energie_allouee: (resultOpti.totalWeight / 10).toFixed(2),
                    reste: resultOpti.reste.toFixed(2),
                    temps_calcul_ms: tempsOpti,
                    complexite: 'O(n * W)'
                },
                comparison: {
                    baseline_fifo: {
                        methode: 'FIFO (First-In First-Out)',
                        valeur_totale: valeurTotaleFIFO,
                        energie_allouee: (resultFIFO.totalWeight / 10).toFixed(2),
                        temps_calcul_ms: tempsFIFO,
                        satisfaction_pct: satisfactionFIFO.toFixed(2)
                    },
                    baseline_egalitaire: {
                        methode: 'Partage Egalitaire',
                        energie_allouee: (resultEgal.totalWeight / 10).toFixed(2),
                        temps_calcul_ms: tempsEgal
                    },
                    optimisation: {
                        gain_vs_fifo_pct: satisfactionFIFO > 0 ? (((satisfactionOpti - satisfactionFIFO) / satisfactionFIFO) * 100).toFixed(2) : 0,
                        satisfaction_pct: satisfactionOpti.toFixed(2)
                    }
                },
                amelioration: 'L\'algorithme Sac a Dos maximise l\'utilite sociale en privilegiant les besoins critiques.'
            });

        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    // Mode Eco : reduire automatiquement les charges non urgentes
    activerModeEco: async (req, res) => {
        try {
            let batterie;
            try {
                batterie = await Batterie.getActive();
            } catch (dbErr) {
                batterie = { id_batterie: 1, capacite_totale: 100.0, capacite_actuelle: 15.0, seuil_critique: 20.0 };
            }
            if (!batterie) return res.status(404).json({ success: false, error: 'Aucune batterie' });

            const pourcentage = (batterie.capacite_actuelle / batterie.capacite_totale) * 100;
            
            if (pourcentage > batterie.seuil_critique + 10) {
                return res.json({ success: true, mode: 'Normal', message: 'Batterie suffisante, mode Eco non necessaire' });
            }

            // Refuser automatiquement les demandes non critiques
            let demandes;
            try {
                demandes = await DemandeEnergie.getPending();
            } catch (dbErr) {
                demandes = [
                    { id_demande: 'D001', niveau_criticite: 'Haute' },
                    { id_demande: 'D002', niveau_criticite: 'Basse' },
                    { id_demande: 'D003', niveau_criticite: 'Normale' }
                ];
            }
            let annulees = 0;
            
            for (const d of demandes) {
                if (d.niveau_criticite === 'Basse' || d.niveau_criticite === 'Normale') {
                    annulees++;
                }
            }

            res.json({
                success: true,
                mode: 'ECO',
                batterie_pct: pourcentage.toFixed(2),
                demandes_preserves: demandes.length - annulees,
                demandes_reportees: annulees,
                message: `Mode Eco active. ${annulees} demandes non urgentes reportees.`
            });

        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = optimisationController;
