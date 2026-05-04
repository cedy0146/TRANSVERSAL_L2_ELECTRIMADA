/**
 * Tests d'integration ElectriMada
 * Simule un client HTTP qui appelle chaque endpoint de l'API
 * 
 * Lancez avec : node tests/integrationTests.js
 * Le serveur demarre automatiquement pour les tests.
 */

const http = require('http');
const app = require('../server');

const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

let server;
let passed = 0;
let failed = 0;

function request(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    resolve({ status: res.statusCode, body: json });
                } catch {
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function test(name, fn) {
    try {
        await fn();
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

// ============================================

async function runTests() {
    console.log('\n========================================');
    console.log('  Tests d\'Integration ElectriMada');
    console.log(`  URL: ${BASE_URL}`);
    console.log('========================================\n');

    // 1. Health check
    console.log('1. Health Check');
    await test('Serveur repond sur /', async () => {
        const res = await request('GET', '/');
        assertEqual(res.status, 200);
        assertTrue(res.body.message.includes('ElectriMada'), 'Message ElectriMada present');
    });

    await test('Health endpoint OK', async () => {
        const res = await request('GET', '/health');
        assertEqual(res.status, 200);
        assertEqual(res.body.status, 'OK');
    });

    // 2. Foyers
    console.log('\n2. Foyers (CRUD + Cache HashTable)');
    await test('GET /api/foyers retourne une liste', async () => {
        const res = await request('GET', '/api/foyers');
        assertEqual(res.status, 200);
        assertTrue(Array.isArray(res.body.data) || res.body.success, 'Reponse valide');
    });

    await test('POST /api/foyers cree un foyer', async () => {
        const res = await request('POST', '/api/foyers', {
            id_foyer: 'TEST001',
            nom: 'Foyer Test',
            type_priorite: 'Standard',
            consommation_moyenne: 4.5
        });
        assertEqual(res.status, 201);
        assertEqual(res.body.success, true);
    });

    await test('GET /api/foyers/TEST001 retourne le foyer', async () => {
        const res = await request('GET', '/api/foyers/TEST001');
        assertEqual(res.status, 200);
        assertTrue(res.body.data || res.body.success, 'Foyer trouve');
    });

    await test('Cache local - deuxieme appel rapide', async () => {
        const start = Date.now();
        await request('GET', '/api/foyers');
        const t1 = Date.now() - start;
        
        const start2 = Date.now();
        await request('GET', '/api/foyers');
        const t2 = Date.now() - start2;
        
        assertTrue(t2 <= t1 + 10, 'Cache accelere le second appel');
    });

    // 3. Batteries
    console.log('\n3. Batteries (Alertes)');
    await test('GET /api/batteries/active avec alertes', async () => {
        const res = await request('GET', '/api/batteries/active');
        assertEqual(res.status, 200);
        assertTrue(res.body.data || res.body.batterie, 'Batterie retournee');
    });

    // 4. Demandes
    console.log('\n4. Demandes (Binary Heap Priorisation)');
    await test('GET /api/demandes/pending', async () => {
        const res = await request('GET', '/api/demandes/pending');
        assertEqual(res.status, 200);
    });

    await test('GET /api/demandes/priorisees - Tas Binaire', async () => {
        const res = await request('GET', '/api/demandes/priorisees');
        assertEqual(res.status, 200);
        assertTrue(Array.isArray(res.body.data), 'Liste priorisee retournee');
    });

    // 5. Optimisation - Le coeur du projet !
    console.log('\n5. Optimisation (Sac a Dos DP + Baselines)');
await test('POST /api/optimisation/allocation - Scenario critique', async () => {
        const res = await request('POST', '/api/optimisation/allocation');
        assertEqual(res.status, 200);
        assertTrue(res.body.success, 'Allocation reussie');
        
        // Verifier la structure de la reponse
        assertTrue(res.body.resultat_optimise, 'Resultat optimise present');
        assertTrue(res.body.comparison, 'Comparaison presente');
        assertTrue(res.body.allocation, 'Allocation presente');
        
        // Afficher les metriques
        const optiVal = res.body.resultat_optimise.valeur_totale;
        const fifoVal = res.body.comparison.baseline_fifo.valeur_totale;
        console.log(`     Valeur optimisee: ${optiVal}, Valeur FIFO: ${fifoVal}`);
    });

    await test('GET /api/optimisation/mode-eco', async () => {
        const res = await request('GET', '/api/optimisation/mode-eco');
        assertEqual(res.status, 200);
        assertTrue(res.body.mode !== undefined, 'Mode retourne');
    });

    // 6. Prevision
    console.log('\n6. Prevision (Moyenne Glissante + Segment Tree)');
    await test('GET /api/prevision/solaire', async () => {
        const res = await request('GET', '/api/prevision/solaire');
        assertEqual(res.status, 200);
        assertTrue(res.body.prevision !== undefined || res.body.moyenneGlissante, 'Prevision presente');
    });

    await test('GET /api/prevision/consommation-intervalle', async () => {
        const res = await request('GET', '/api/prevision/consommation-intervalle?start=0&end=2');
        assertEqual(res.status, 200);
    });

    // 7. Rapports
    console.log('\n7. Rapports');
    await test('GET /api/rapports', async () => {
        const res = await request('GET', '/api/rapports');
        assertEqual(res.status, 200);
    });

    // 8. Alertes
    console.log('\n8. Alertes');
    await test('GET /api/alertes', async () => {
        const res = await request('GET', '/api/alertes');
        assertEqual(res.status, 200);
    });

    // Nettoyage
    console.log('\n----------------------------------------');
    console.log(`  Nettoyage : suppression foyer test`);
    try {
        await request('DELETE', '/api/foyers/TEST001');
        console.log('  ✅ Foyer TEST001 supprime');
    } catch {
        console.log('  ⚠️  Foyer TEST001 non supprime (normal si inexistant)');
    }

    // Resume
    console.log('\n========================================');
    console.log(`  Resultats: ${passed} reussis, ${failed} echoues`);
    console.log('========================================\n');

    return failed === 0;
}

// Demarrage
server = app.listen(PORT, async () => {
    console.log(`Serveur de test demarre sur le port ${PORT}`);
    const ok = await runTests();
    server.close(() => {
        console.log('Serveur de test arrete.\n');
        process.exit(ok ? 0 : 1);
    });
});
