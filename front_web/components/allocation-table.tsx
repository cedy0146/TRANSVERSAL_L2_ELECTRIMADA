'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, AlertCircle, Loader2, RefreshCw } from 'lucide-react'
import { api } from '@/lib/api'

interface Demand {
  id_demande: number
  id_foyer: string
  nom_foyer?: string
  energie_demandee: number
  priorite: string
  statut: 'pending' | 'approved' | 'rejected'
  type_appareil?: string
  date_demande: string
}

interface AllocationTableProps {
  language: 'fr' | 'mg' | 'en'
}

export default function AllocationTable({ language }: AllocationTableProps) {
  const [demands, setDemands] = useState<Demand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const t = {
    fr: {
      title: 'Allocations d\'Energie',
      description: 'Liste des demandes d\'energie en cours de traitement',
      household: 'Menage',
      demand: 'Energie (kWh)',
      priority: 'Priorite',
      status: 'Statut',
      approve: 'Approuvee',
      pending: 'En Attente',
      rejected: 'Rejetee',
      high: 'Haute',
      medium: 'Moyenne',
      low: 'Basse',
      noData: 'Aucune demande',
      refresh: 'Actualiser',
    },
    mg: {
      title: 'Fifanomezana Angovo',
      description: 'Lisitra ny fangatahana angovo',
      household: 'Toby',
      demand: 'Angovo (kWh)',
      priority: 'Ambiny',
      status: 'Toetra',
      approve: 'Nomena',
      pending: 'Miandry',
      rejected: 'Resena',
      high: 'Ambiny',
      medium: 'Sedria',
      low: 'Kely',
      noData: 'Tsy misy fangatahana',
      refresh: 'Hanavao',
    },
    en: {
      title: 'Energy Allocations',
      description: 'List of energy requests being processed',
      household: 'Household',
      demand: 'Energy (kWh)',
      priority: 'Priority',
      status: 'Status',
      approve: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      noData: 'No requests',
      refresh: 'Refresh',
    },
  }

  const labels = t[language]

  // Charger les demandes depuis l'API
  const fetchDemands = useCallback(async () => {
    try {
      setLoading(true)
      const result = await api.demandes.getAll()
      
      let demandsData: Demand[] = []
      if (result && result.success && Array.isArray(result.data)) {
        demandsData = result.data
      } else if (Array.isArray(result)) {
        demandsData = result
      }
      
      setDemands(demandsData)
      setError(null)
    } catch (err: any) {
      console.error('Erreur API Demandes:', err)
      setError("Impossible de recuperer la liste des demandes.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Chargement initial et auto-refresh
  useEffect(() => {
    fetchDemands()
    const interval = setInterval(fetchDemands, 30000) // Rafraichir toutes les 30 secondes
    return () => clearInterval(interval)
  }, [fetchDemands])

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'destructive'
    if (priority === 'medium') return 'secondary'
    return 'outline'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-emerald-600" />
      case 'pending': return <Clock className="w-4 h-4 text-blue-600" />
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'pending': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return labels.approve
      case 'pending': return labels.pending
      case 'rejected': return labels.rejected
      default: return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return labels.high
      case 'medium': return labels.medium
      case 'low': return labels.low
      default: return priority
    }
  }

  if (loading && demands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
        <p>Recuperation des demandes d'energie...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6 border-red-100 bg-red-50 text-red-800">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="font-medium">{error}</p>
          <button 
            onClick={fetchDemands}
            className="ml-auto text-sm hover:underline"
          >
            {labels.refresh}
          </button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-white/80 backdrop-blur border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800">{labels.title}</CardTitle>
          <CardDescription>{labels.description}</CardDescription>
        </div>
        <button 
          onClick={fetchDemands}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          title={labels.refresh}
        >
          <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">{labels.household}</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">{labels.demand}</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">{labels.priority}</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">{labels.status}</th>
              </tr>
            </thead>
            <tbody>
              {demands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-500">
                    {labels.noData}
                  </td>
                </tr>
              ) : (
                demands.map((demand) => (
                  <tr key={demand.id_demande} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {demand.nom_foyer || demand.id_foyer}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {demand.energie_demandee.toFixed(1)} kWh
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getPriorityColor(demand.priorite)}>
                        {getPriorityLabel(demand.priorite)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusBgColor(demand.statut)} w-fit`}>
                        {getStatusIcon(demand.statut)}
                        <span className="text-xs font-medium">{getStatusLabel(demand.statut)}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
