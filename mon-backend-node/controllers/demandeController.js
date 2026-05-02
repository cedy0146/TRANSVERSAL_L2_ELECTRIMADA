const DemandeEnergie = require('../models/DemandeEnergie');
const BinaryHeap = require('../algorithms/BinaryHeap');

// Mapping criticite -> priorite numerique
const CRITICITE_MAP = {
    'Critique': 100,
    'Haute': 75,
    'Normale': 50,
    'Basse': 25
};

const demandeController = {
    getAll: async (req, res) => {
        try {
            const demandes = await DemandeEnergie.getAll();
            res.json({ success: true, data: demandes, count: demandes.length });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getById: async (req, res) => {
        try {
            const demande = await DemandeEnergie.getById(req.params.id);
            if (!demande) return res.status(404).json({ success: false, error: 'Demande non trouvee' });
            res.json({ success: true, data: demande });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getByFoyer: async (req, res) => {
        try {
            const demandes = await DemandeEnergie.getByFoyer(req.params.idFoyer);
            res.json({ success: true, data: demandes });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getPending: async (req, res) => {
        try {
            const demandes = await DemandeEnergie.getPending();
            res.json({ success: true, data: demandes, count: demandes.length });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const demande = await DemandeEnergie.create(req.body);
            res.status(201).json({ success: true, data: demande, message: 'Demande creee' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await DemandeEnergie.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ success: false, error: 'Demande non trouvee' });
            res.json({ success: true, message: 'Demande mise a jour' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    accepter: async (req, res) => {
        try {
            const updated = await DemandeEnergie.accepter(req.params.id);
            if (!updated) return res.status(404).json({ success: false, error: 'Demande non trouvee' });
            res.json({ success: true, message: 'Demande acceptee' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deleted = await DemandeEnergie.delete(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, error: 'Demande non trouvee' });
            res.json({ success: true, message: 'Demande supprimee' });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    // Endpoint special : prioriser les demandes avec le Tas Binaire
    getPriorisees: async (req, res) => {
        try {
            const demandes = await DemandeEnergie.getPending();
            
            // Construction du tas binaire pour priorisation
            const heap = new BinaryHeap((a, b) => {
                const pa = CRITICITE_MAP[a.niveau_criticite] || 0;
                const pb = CRITICITE_MAP[b.niveau_criticite] || 0;
                return pa - pb;
            });

            demandes.forEach(d => heap.insert(d));

            // Extraction par ordre de priorite
            const priorisees = [];
            while (!heap.isEmpty()) {
                priorisees.push(heap.extractMax());
            }

            res.json({ 
                success: true, 
                data: priorisees, 
                message: 'Demandes priorisees par criticite (Tas Binaire O(n log n))' 
            });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = demandeController;
