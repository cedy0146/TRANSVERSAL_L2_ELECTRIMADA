'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { AlertCircle, Loader2, Users, Trash2 } from 'lucide-react';

/**
 * Interface correspondant aux données du backend ElectriMada
 */
interface Household {
  id_foyer: string;
  nom: string;
  type_priorite: string;
  consommation_moyenne: number;
}

export function HouseholdTable() {
  const [households, setHouseholds] = useState<Household[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoyers = async () => {
    try {
      setLoading(true);
      const result = await api.foyers.getAll();
      
      // Le backend renvoie souvent { success: true, data: [...] }
      if (result && Array.isArray(result.data)) {
        setHouseholds(result.data);
      } else if (Array.isArray(result)) {
        setHouseholds(result);
      } else {
        setHouseholds([]);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Erreur API Foyers:', err);
      setError("Impossible de récupérer la liste des foyers. Vérifiez que le backend est bien lancé sur le port 3000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoyers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce foyer ?')) return;
    
    try {
      await api.foyers.delete(id);
      // Mise à jour locale de la liste pour un feedback immédiat
      setHouseholds(households.filter(h => h.id_foyer !== id));
    } catch (err: any) {
      console.error('Erreur lors de la suppression:', err);
      alert("Erreur lors de la suppression du foyer.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
        <p>Récupération des profils des foyers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-100 bg-red-50 text-red-800">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="font-medium">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-900">Ménages du Village</h2>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
          {households.length} foyer(s) actif(s)
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-3 border-b border-gray-100">ID</th>
              <th className="px-6 py-3 border-b border-gray-100">Désignation</th>
              <th className="px-6 py-3 border-b border-gray-100">Priorité</th>
              <th className="px-6 py-3 border-b border-gray-100 text-right">Consommation</th>
              <th className="px-6 py-3 border-b border-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm bg-white">
            {households.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                  Aucun foyer n'est actuellement enregistré.
                </td>
              </tr>
            ) : (
              households.map((foyer) => (
                <tr key={foyer.id_foyer} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{foyer.id_foyer}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{foyer.nom}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      foyer.type_priorite.toLowerCase() === 'critique' || foyer.type_priorite.toLowerCase() === 'urgent'
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {foyer.type_priorite}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-gray-900">{foyer.consommation_moyenne}</span>
                    <span className="ml-1 text-xs text-gray-400">kWh</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(foyer.id_foyer)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}