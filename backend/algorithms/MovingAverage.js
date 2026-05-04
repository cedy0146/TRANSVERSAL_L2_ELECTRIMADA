/**
 * Moyenne Glissante (Moving Average)
 * Famille : Streaming / Fenetage (Maintien d'agregats)
 * 
 * Pour la prevision solaire : calcule une estimation de la production 
 * de demain en traitant le flux de donnees des jours precedents.
 * 
 * Complexite :
 * - Ajout d'un point : O(1)
 * - Calcul moyenne : O(1) (version optimisee)
 * 
 * Contrainte 2035 : Traitement en temps reel, memoire bornee (fenetre fixe).
 */
class MovingAverage {
    constructor(windowSize = 7) {
        this.windowSize = windowSize; // 7 jours par defaut
        this.buffer = [];
        this.sum = 0;
    }

    add(value) {
        this.buffer.push(value);
        this.sum += value;

        if (this.buffer.length > this.windowSize) {
            this.sum -= this.buffer.shift();
        }
    }

    getAverage() {
        if (this.buffer.length === 0) return 0;
        return this.sum / this.buffer.length;
    }

    getPrediction() {
        // Prediction = moyenne glissante + trend simple
        const avg = this.getAverage();
        if (this.buffer.length < 2) return avg;
        
        // Calcul simple de tendance (dernier - precedent)
        const trend = (this.buffer[this.buffer.length - 1] - this.buffer[0]) / this.buffer.length;
        return Math.max(0, avg + trend);
    }

    // En cas de donnees manquantes : interpolation
    addWithFallback(value) {
        if (value === null || value === undefined || isNaN(value)) {
            // Fallback : utiliser la moyenne actuelle comme estimation
            value = this.getAverage();
        }
        this.add(value);
    }

    toJSON() {
        return {
            windowSize: this.windowSize,
            values: [...this.buffer],
            average: this.getAverage(),
            prediction: this.getPrediction()
        };
    }

    static fromJSON(data) {
        const ma = new MovingAverage(data.windowSize);
        ma.buffer = [...data.values];
        ma.sum = ma.buffer.reduce((a, b) => a + b, 0);
        return ma;
    }
}

module.exports = MovingAverage;
