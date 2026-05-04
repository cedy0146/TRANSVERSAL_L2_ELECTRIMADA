/**
 * Sac a Dos (Knapsack) - Programmation Dynamique
 * Algorithme d'optimisation pour repartir l'energie.
 * 
 * Complexite :
 * - Temps : O(n * W)
 * - Memoire : O(W) optimise
 * 
 * Chaque demande i a une utilite v_i et un cout energetique w_i.
 * Objectif : maximiser la satisfaction des besoins critiques
 * sous contrainte de capacite W.
 */
function knapsack(demandes, capacite) {
    // demandes: [{id, priorite, quantite_kwh, ...}, ...]
    // capacite: nombre entier (Wh ou kWh * 10)
    
    const n = demandes.length;
    const W = Math.floor(capacite);
    
    if (W <= 0 || n === 0) return { selected: [], totalValue: 0, totalWeight: 0 };

    // DP optimise en espace : O(W) au lieu de O(n*W)
    const dp = new Array(W + 1).fill(0);
    const keep = new Array(n + 1).fill(null).map(() => new Array(W + 1).fill(false));

    demandes.forEach((demande, i) => {
        const weight = Math.ceil(demande.poids || demande.quantite_kwh * 10);
        const value = demande.valeur || demande.priorite * 10;
        const idx = i + 1;
        
        // Parcours a l'envers pour l'optimisation d'espace
        for (let w = W; w >= weight; w--) {
            if (dp[w - weight] + value > dp[w]) {
                dp[w] = dp[w - weight] + value;
                keep[idx][w] = true;
            }
        }
    });

    // Reconstruction de la solution
    const selected = [];
    let w = W;
    for (let i = n; i >= 1; i--) {
        const weight = Math.ceil(demandes[i - 1].poids || demandes[i - 1].quantite_kwh * 10);
        if (keep[i][w]) {
            selected.push(demandes[i - 1]);
            w -= weight;
        }
    }

    const totalWeight = selected.reduce((sum, d) => sum + (d.poids || d.quantite_kwh * 10), 0);
    
    return {
        selected,
        totalValue: dp[W],
        totalWeight,
        reste: capacite - totalWeight / 10
    };
}

/**
 * Baseline naive : FIFO (First-In First-Out)
 * Premiere strategie de comparaison pour mesurer l'optimisation.
 */
function baselineFIFO(demandes, capacite) {
    let reste = Math.floor(capacite);
    const selected = [];
    
    for (const d of demandes) {
        const weight = Math.ceil(d.poids || d.quantite_kwh * 10);
        if (weight <= reste) {
            selected.push(d);
            reste -= weight;
        }
    }
    
    const totalWeight = selected.reduce((s, d) => s + (d.poids || d.quantite_kwh * 10), 0);
    const totalValue = selected.reduce((s, d) => s + (d.valeur || d.priorite * 10), 0);
    
    return {
        selected,
        totalValue,
        totalWeight,
        reste: reste / 10
    };
}

/**
 * Baseline egalitaire : partage egal
 */
function baselineEgalitaire(demandes, capacite) {
    if (demandes.length === 0) return { selected: [], totalValue: 0, totalWeight: 0, reste: capacite };
    
    const part = Math.floor(capacite) / demandes.length;
    const selected = [];
    
    for (const d of demandes) {
        const weight = Math.ceil(d.poids || d.quantite_kwh * 10);
        const minWeight = Math.min(weight, part);
        if (minWeight > 0) {
            selected.push({ ...d, quantiteAllouee: minWeight / 10 });
        }
    }
    
    const totalWeight = selected.reduce((s, d) => s + (d.poids || d.quantite_kwh * 10), 0);
    return { selected, totalValue: 0, totalWeight, reste: capacite - totalWeight / 10 };
}

module.exports = { knapsack, baselineFIFO, baselineEgalitaire };
