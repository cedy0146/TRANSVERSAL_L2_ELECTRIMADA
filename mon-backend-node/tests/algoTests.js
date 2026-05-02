/**
 * Tests unitaires pour les algorithmes ElectriMada
 * >= 5 tests requis sur les parties algorithmiques
 */

const BinaryHeap = require('../algorithms/BinaryHeap');
const HashTable = require('../algorithms/HashTable');
const SegmentTree = require('../algorithms/SegmentTree');
const { knapsack, baselineFIFO } = require('../algorithms/Knapsack');
const MovingAverage = require('../algorithms/MovingAverage');
const Graph = require('../algorithms/Dijkstra');

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`  ✅ ${name}`);
        passed++;
    } catch (err) {
        console.log(`  ❌ ${name}: ${err.message}`);
        failed++;
    }
}

function assertEqual(actual, expected, msg) {
    if (actual !== expected) throw new Error(`${msg || 'Assertion'}: attendu ${expected}, obtenu ${actual}`);
}

function assertTrue(condition, msg) {
    if (!condition) throw new Error(msg || 'Assertion echouee');
}

console.log('\n========================================');
console.log('  Tests Algorithmiques ElectriMada');
console.log('========================================\n');

// TEST 1: Binary Heap - insertion et extraction
console.log('1. Tas Binaire (Binary Heap)');
test('Insertion et getMax fonctionnent', () => {
    const heap = new BinaryHeap((a, b) => a - b);
    heap.insert(10);
    heap.insert(50);
    heap.insert(30);
    assertEqual(heap.getMax(), 50, 'Le max doit etre 50');
});

test('ExtractMax retourne les elements dans l\'ordre', () => {
    const heap = new BinaryHeap((a, b) => a - b);
    [10, 50, 30, 5, 100].forEach(x => heap.insert(x));
    assertEqual(heap.extractMax(), 100);
    assertEqual(heap.extractMax(), 50);
    assertEqual(heap.extractMax(), 30);
    assertEqual(heap.size(), 2);
});

// TEST 2: Hash Table - O(1) amorti
console.log('\n2. Table de Hachage (Hash Table)');
test('Set et Get fonctionnent', () => {
    const ht = new HashTable(10);
    ht.set('F001', { nom: 'Razafy', priorite: 'Haute' });
    assertEqual(ht.get('F001').nom, 'Razafy');
});

test('Collision et update geres', () => {
    const ht = new HashTable(1); // Force les collisions
    ht.set('A', 1);
    ht.set('B', 2);
    assertEqual(ht.get('A'), 1);
    assertEqual(ht.get('B'), 2);
    ht.set('A', 3);
    assertEqual(ht.get('A'), 3);
});

// TEST 3: Segment Tree - requetes en O(log n)
console.log('\n3. Arbre de Segment (Segment Tree)');
test('Somme sur intervalle correcte', () => {
    const st = new SegmentTree([1, 3, 5, 7, 9, 11]);
    assertEqual(st.rangeQuery(0, 2), 9, 'Somme [0,2] = 1+3+5');
    assertEqual(st.rangeQuery(1, 4), 24, 'Somme [1,4] = 3+5+7+9');
    assertEqual(st.rangeQuery(0, 5), 36, 'Somme totale');
});

test('Mise a jour point et requete', () => {
    const st = new SegmentTree([1, 2, 3, 4, 5]);
    st.pointUpdate(2, 10);
    assertEqual(st.rangeQuery(0, 4), 22, 'Apres update index 2 -> 10');
});

// TEST 4: Knapsack - allocation optimale
console.log('\n4. Sac a Dos (Knapsack DP)');
test('Allocation optimisee vs baseline FIFO - scenario critique', () => {
    const demandes = [
        { id: 'D1', priorite: 'Basse',  quantite_kwh: 2, valeur: 25,  poids: 20 },
        { id: 'D2', priorite: 'Basse',  quantite_kwh: 1, valeur: 25,  poids: 10 },
        { id: 'D3', priorite: 'Haute',  quantite_kwh: 3, valeur: 75,  poids: 30 },
        { id: 'D4', priorite: 'Critique', quantite_kwh: 4, valeur: 100, poids: 40 },
    ];
    const capacite = 50; // 5.0 kWh en precision x10
    
    const opti = knapsack(demandes, capacite);
    const fifo = baselineFIFO(demandes, capacite);
    
    // Le knapsack doit choisir D4 (critique, 4kWh) car meilleure valeur
    assertTrue(opti.totalValue > fifo.totalValue, 'Knapsack doit etre meilleur que FIFO');
    assertTrue(opti.selected.some(d => d.id === 'D4'), 'La demande critique doit etre selectionnee');
});

test('Sac a dos vide si capacite nulle', () => {
    const result = knapsack([{ id: 'D1', priorite: 'Haute', quantite_kwh: 2, valeur: 75, poids: 20 }], 0);
    assertEqual(result.selected.length, 0, 'Aucune selection si W=0');
});

// TEST 5: Moving Average - prediction
console.log('\n5. Moyenne Glissante (Moving Average)');
test('Prediction avec tendance', () => {
    const ma = new MovingAverage(5);
    [10, 12, 14, 16, 18].forEach(v => ma.add(v));
    assertEqual(ma.getAverage(), 14, 'Moyenne correcte');
    const pred = ma.getPrediction();
    assertTrue(pred > 14, 'Prediction doit suivre la tendance croissante');
});

test('Fallback sur donnees manquantes', () => {
    const ma = new MovingAverage(5);
    ma.add(10);
    ma.addWithFallback(null); // donnee manquante
    assertEqual(ma.buffer.length, 2, 'Fallback ajoute une valeur');
});

// TEST 6: Dijkstra - chemin optimal
console.log('\n6. Dijkstra (Graphes)');
test('Chemin le plus court trouve', () => {
    const g = new Graph();
    // Panneau -> Foyer1 -> Foyer2
    g.addEdge('Panneau', 'Foyer1', 2, { perte: 0.1 });
    g.addEdge('Panneau', 'Foyer2', 10, { perte: 0.5 });
    g.addEdge('Foyer1', 'Foyer2', 3, { perte: 0.2 });
    
    const result = g.getShortestPath('Panneau', 'Foyer2');
    assertTrue(result.exists, 'Chemin doit exister');
    assertEqual(result.distance, 5, 'Chemin optimal: P->F1->F2 = 2+3');
    assertEqual(result.path.length, 3, '3 noeuds dans le chemin');
});

// Resume
console.log('\n========================================');
console.log(`  Resultats: ${passed} reussis, ${failed} echoues`);
console.log('========================================\n');

if (failed > 0) process.exit(1);

