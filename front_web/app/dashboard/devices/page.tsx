'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Zap, Plus, Trash2, Edit2, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react'

export default function DevicesPage() {
  const { user } = useAuth()
  const [devices, setDevices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // État du formulaire - aucune valeur par défaut statique (données de saisie utilisateur)
  const [formData, setFormData] = useState({
    nom: '',
    consommation_kwh: ''
  })

  const API_BASE = 'http://localhost:3001/api'

  // Récupération dynamique de la liste depuis MySQL
  const fetchDevices = async () => {
    const cid = (user as any)?.communauteId;
    if (!cid) return;

    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/communities/${cid}/devices`)
      const data = await res.json()
      if (data.success) {
        setDevices(data.data)
      }
    } catch (err) {
      console.error(err)
      setError("Erreur lors de la synchronisation avec MySQL.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if ((user as any)?.communauteId) {
      fetchDevices()
    }
  }, [(user as any)?.communauteId])

  // Préparer le formulaire pour la modification
  const startEdit = (dev: any) => {
    setEditingId(dev.id)
    setFormData({
      nom: dev.nom,
      consommation_kwh: dev.consommation_kwh.toString()
    })
    setError(null)
    setSuccess(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Annuler la modification
  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ nom: '', consommation_kwh: '' })
  }

  // Supprimer un appareil de MySQL
  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet appareil de la base de données ?")) return
    try {
      const res = await fetch(`${API_BASE}/appareils/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSuccess("L'appareil a été supprimé de MySQL.")
        fetchDevices()
      }
    } catch (err) {
      setError("Erreur lors de la suppression.")
    }
  }

  // Envoi des saisies (Insertion ou Mise à jour) dans MySQL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)

    const cid = (user as any)?.communauteId;
    if (!cid) {
      setError("Session invalide : ID de communauté manquant.");
      setSubmitting(false);
      return;
    }

    try {
      const url = editingId ? `${API_BASE}/appareils/${editingId}` : `${API_BASE}/appareils`
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          consommation_kwh: parseFloat(formData.consommation_kwh),
          communauteId: cid
        })
      })

      const data = await res.json()
      if (data.success) {
        setSuccess(editingId ? "L'appareil a été mis à jour dans MySQL." : "L'appareil a été correctement enregistré dans la base de données.")
        setFormData({ nom: '', consommation_kwh: '' })
        setEditingId(null)
        fetchDevices() // Rafraîchir la liste dynamique
      } else {
        throw new Error(data.message || "Erreur d'insertion MySQL.")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Équipements</h1>
        <p className="text-gray-500 mt-2">Saisie et suivi en temps réel des appareils connectés au réseau communautaire.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire de saisie - Carte blanche, arrondie */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            {editingId ? (
              <>
                <Edit2 className="text-amber-500" size={20} /> Modifier l'appareil
              </>
            ) : (
              <>
                <Plus className="text-emerald-500" /> Ajouter un appareil
              </>
            )}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Nom de l'appareil</label>
              <input 
                type="text" 
                required
                placeholder="ex: Réfrigérateur"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Consommation horaire (kWh)</label>
              <input 
                type="number" 
                step="0.001" 
                required
                placeholder="ex: 0.150"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                value={formData.consommation_kwh}
                onChange={(e) => setFormData({...formData, consommation_kwh: e.target.value})}
              />
            </div>

            {error && <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-lg border border-red-100 animate-shake"><AlertCircle size={14} /> {error}</div>}
            {success && <div className="flex items-center gap-2 text-emerald-600 text-xs bg-emerald-50 p-3 rounded-lg border border-emerald-100"><CheckCircle2 size={14} /> {success}</div>}

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} /> : editingId ? <CheckCircle2 size={18} /> : <Zap size={18} />}
              {editingId ? "Mettre à jour dans MySQL" : "Enregistrer dans MySQL"}
            </button>

            {editingId && (
              <button 
                type="button" 
                onClick={cancelEdit}
                className="w-full py-2 text-gray-500 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-all flex items-center justify-center gap-1"
              >
                <X size={14} /> Annuler la modification
              </button>
            )}
          </form>
        </div>

        {/* Liste dynamique - Carte blanche, arrondie */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Équipements détectés dans MySQL</h2>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-emerald-500" size={40} />
              <span className="text-gray-400 font-medium">Synchronisation MySQL en cours...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devices.length === 0 ? (
                <div className="col-span-2 text-center py-10 text-gray-400 italic">Aucune donnée trouvée. Utilisez le formulaire pour commencer.</div>
              ) : devices.map((dev: any) => (
                <div key={dev.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 flex items-center justify-between group hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform"><Zap size={20} className="text-emerald-500" /></div>
                    <div>
                      <p className="font-bold text-gray-800">{dev.nom}</p>
                      <p className="text-2xl font-black text-gray-900">{dev.consommation_kwh} <span className="text-xs font-normal text-gray-400">kWh/h</span></p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(dev)} className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(dev.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}