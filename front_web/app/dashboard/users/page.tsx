'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Edit2, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Shield,
  Zap
} from 'lucide-react'

export default function UsersPage() {
  const { user } = useAuth()
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // État du formulaire (données dynamiques uniquement)
  const [formData, setFormData] = useState({
    nom_responsable: '',
    type_priorite: 'Basse',
    conso_estimee: ''
  })

  const API_BASE = 'http://localhost:3001/api'

  // READ : Récupération dynamique des membres depuis MySQL
  const fetchMembers = async () => {
    const cid = (user as any)?.communauteId;
    if (!cid) return;

    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/communities/${cid}/members`)
        
      if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);
      
      const data = await res.json()
      if (data.success) {
        setMembers(data.data)
      }
    } catch (err) {
      console.error(err)
      setError("Impossible de charger les membres depuis la base de données.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if ((user as any)?.communauteId) {
      fetchMembers()
    }
  }, [(user as any)?.communauteId])

  // Préparer l'interface pour l'UPDATE
  const startEdit = (member: any) => {
    setEditingId(member.id_foyer || member.id)
    setFormData({
      nom_responsable: member.nom_responsable || member.name || '',
      type_priorite: member.type_priorite || member.priorite || 'Basse',
      conso_estimee: (member.conso_estimee || member.consommation || 0).toString()
    })
    setError(null)
    setSuccess(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ nom_responsable: '', type_priorite: 'Basse', conso_estimee: '' })
  }

  // DELETE : Suppression d'un enregistrement
  const handleDelete = async (id: number) => {
    if (!confirm("Confirmez-vous la suppression de ce foyer de la base de données ?")) return
    try {
      const res = await fetch(`${API_BASE}/foyers/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSuccess("Le foyer a été supprimé avec succès.")
        fetchMembers()
      }
    } catch (err) {
      setError("Erreur lors de la suppression dans MySQL.")
    }
  }

  // CREATE & UPDATE : Envoi vers le backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)

    const cid = (user as any)?.communauteId;

    try {
      const url = editingId ? `${API_BASE}/foyers/${editingId}` : `${API_BASE}/foyers`
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom_responsable: formData.nom_responsable,
          type_priorite: formData.type_priorite,
          conso_estimee: parseFloat(formData.conso_estimee),
          communauteId: cid
        })
      })

      if (!res.ok) throw new Error("Le serveur MySQL a renvoyé une erreur.");

      const data = await res.json()
      if (data.success) {
        setSuccess(editingId ? "Mise à jour réussie." : "Nouveau foyer enregistré dans la base.")
        setFormData({ nom_responsable: '', type_priorite: 'Basse', conso_estimee: '' })
        setEditingId(null)
        fetchMembers()
      } else {
        throw new Error(data.message || "Erreur lors de l'opération MySQL.")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-2 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Communauté & Foyers</h1>
        <p className="text-muted-foreground mt-2">Gérez les membres de votre réseau et leurs niveaux de priorité énergétique.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire CRUD */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            {editingId ? <Edit2 className="text-amber-500" size={20} /> : <UserPlus className="text-emerald-500" />}
            {editingId ? "Modifier le foyer" : "Ajouter un foyer"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Nom du Responsable</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.nom_responsable}
                onChange={(e) => setFormData({...formData, nom_responsable: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Type de Priorité</label>
              <select 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={formData.type_priorite}
                onChange={(e) => setFormData({...formData, type_priorite: e.target.value})}
              >
                <option value="Basse">Basse (Standard)</option>
                <option value="Moyenne">Moyenne (Commerce/Pro)</option>
                <option value="Haute">Haute (Santé/Éducation)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Conso. estimée (kWh/jour)</label>
              <input 
                type="number" 
                step="0.1"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono"
                value={formData.conso_estimee}
                onChange={(e) => setFormData({...formData, conso_estimee: e.target.value})}
              />
            </div>

            {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg flex items-center gap-2"><AlertCircle size={14} /> {error}</div>}
            {success && <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs rounded-lg flex items-center gap-2"><CheckCircle2 size={14} /> {success}</div>}

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} /> : editingId ? <CheckCircle2 size={18} /> : <UserPlus size={18} />}
              {editingId ? "Enregistrer les modifications" : "Inscrire le foyer"}
            </button>

            {editingId && (
              <button type="button" onClick={cancelEdit} className="w-full text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase">
                Annuler
              </button>
            )}
          </form>
        </div>

        {/* Liste des membres (Read & Delete actions) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Registre des Membres</h2>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500">{members.length} Foyers</span>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-emerald-500" size={32} />
              <p className="text-gray-400 text-sm">Synchronisation avec MySQL...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((m: any) => (
                <div key={m.id_foyer || m.id} className="p-4 rounded-xl border border-gray-50 bg-gray-50/30 flex items-center justify-between hover:border-emerald-100 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${m.type_priorite === 'Haute' ? 'bg-red-100 text-red-600' : m.type_priorite === 'Moyenne' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      <Shield size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{m.nom_responsable || m.name}</p>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">Priorité {m.type_priorite || m.priorite} • {m.conso_estimee || m.consommation || 0} kWh/j</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(m)} className="p-2 text-gray-400 hover:text-amber-500 transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(m.id_foyer || m.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
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