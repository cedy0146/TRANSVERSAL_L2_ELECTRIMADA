/**
 * Algorithme de Dijkstra
 * Famille : Graphes / Reseaux
 * 
 * Pour modeliser le reseau electrique du village sous forme de graphe
 * et calculer le chemin le plus efficace avec le moins de perte d'energie
 * entre les panneaux solaires et les foyers eloignes.
 * 
 * Complexite : O((V + E) log V) avec un tas binaire
 */
const BinaryHeap = require('./BinaryHeap');

class Graph {
    constructor() {
        this.vertices = new Map();
    }

    addVertex(id, data = {}) {
        if (!this.vertices.has(id)) {
            this.vertices.set(id, { edges: [], data });
        }
    }

    addEdge(from, to, weight, data = {}) {
        if (!this.vertices.has(from)) this.addVertex(from);
        if (!this.vertices.has(to)) this.addVertex(to);
        this.vertices.get(from).edges.push({ to, weight, data });
    }

    dijkstra(startId) {
        const distances = new Map();
        const previous = new Map();
        const visited = new Set();

        // Initialisation
        for (const [id] of this.vertices) {
            distances.set(id, Infinity);
            previous.set(id, null);
        }
        distances.set(startId, 0);

        // Tas binaire comme file de priorite
        const pq = new BinaryHeap((a, b) => a.priority - b.priority);
        pq.insert({ id: startId, priority: 0 });

        while (!pq.isEmpty()) {
            const current = pq.extractMax();
            if (!current) break;
            
            const { id: currentId } = current;
            if (visited.has(currentId)) continue;
            visited.add(currentId);

            const vertex = this.vertices.get(currentId);
            if (!vertex) continue;

            for (const edge of vertex.edges) {
                if (visited.has(edge.to)) continue;

                const newDist = distances.get(currentId) + edge.weight;
                if (newDist < distances.get(edge.to)) {
                    distances.set(edge.to, newDist);
                    previous.set(edge.to, currentId);
                    pq.insert({ id: edge.to, priority: -newDist }); // Negatif car MaxHeap
                }
            }
        }

        return { distances, previous };
    }

    getShortestPath(startId, endId) {
        const { distances, previous } = this.dijkstra(startId);
        
        if (distances.get(endId) === Infinity) {
            return { path: [], distance: Infinity, exists: false };
        }

        const path = [];
        let current = endId;
        while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
        }

        return {
            path,
            distance: distances.get(endId),
            exists: true,
            vertices: path.map(id => ({ id, ...this.vertices.get(id).data }))
        };
    }
}

module.exports = Graph;
