'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FieldGroup, FieldLabel } from '@/components/ui/field'
import { api } from '@/lib/api'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface DemandFormProps {
  language: 'fr' | 'mg' | 'en'
}

interface Household {
  id_foyer: string
  nom: string
  type_priorite: string
}

interface TypeAppareil {
  id_type_appareil: number
  nom: string
  consommation_kwh: number
}

export default function DemandForm({ language }: DemandFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [households, setHouseholds] = useState<Household[]>([])
  const [loadingHouseholds, setLoadingHouseholds] = useState(true)
  const [formData, setFormData] = useState({
    id_foyer: '',
    energie_demandee: '',
    priorite: 'medium',
    plage_horaire: 'soir',
    type_appareil: 'lumiere',
  })

  const t = {
    fr: {
      title: 'Soumettre une Demande d\'Energie',
      description: 'Declarez vos besoins energetiques pour optimisation',
      select_household: 'Selectionner le Menage',
      select_placeholder: 'Choisir un menage...',
      energie: 'Energie Demandee (kWh)',
      energie_placeholder: '0.5 - 2.0',
      priority: 'Niveau de Priorite',
      high: 'Haute',
      medium: 'Moyenne',
      low: 'Basse',
      plage_horaire: 'Plage Horaire',
      matin: 'Matin (6h-12h)',
      midi: 'Midi (12h-18h)',
      soir: 'Soir (18h-22h)',
      nuit: 'Nuit (22h-6h)',
      type_appareil: 'Type d\'Appareil',
      submit: 'Soumettre la Demande',
      submitting: 'Envoi...',
      success: 'Demande soumise avec succes',
      successMsg: 'Votre demande a ete enregistree et sera traitee par l\'algorithme d\'optimisation',
      error: 'Erreur lors de la soumission',
      errorMsg: 'Veuillez reessayer plus tard.',
    },
    mg: {
      title: 'Mandefa Fangatahana Angovo',
      description: 'Lazao ny ianao ilaina amin\'ny angovo',
      select_household: 'Selectin\'ny Toby',
      select_placeholder: 'Fidio Toby...',
      energie: 'Angovo Takiana (kWh)',
      energie_placeholder: '0.5 - 2.0',
      priority: 'Ambiny',
      high: 'Ambiny',
      medium: 'Sedria',
      low: 'Kely',
      plage_horaire: 'Tapa-kevitra',
      matin: 'Maraina (6h-12h)',
      midi: 'Tapolapoaka (12h-18h)',
      soir: 'Hariva (18h-22h)',
      nuit: 'Alina (22h-6h)',
      type_appareil: 'Karazana fitaovana',
      submit: 'Mandefa ny Fangatahana',
      submitting: 'Mipadipady...',
      success: 'Nampitaina ny Fangatahana',
      successMsg: 'Natsangan\'ny rakitra ny ianao fangatahana ary ho fajadihina ny algorithm',
      error: 'Misy olana',
      errorMsg: 'Andramo indray azafady.',
    },
    en: {
      title: 'Submit Energy Request',
      description: 'Declare your energy needs for optimization',
      select_household: 'Select Household',
      select_placeholder: 'Choose a household...',
      energie: 'Requested Energy (kWh)',
      energie_placeholder: '0.5 - 2.0',
      priority: 'Priority Level',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      plage_horaire: 'Time Slot',
      matin: 'Morning (6h-12h)',
      midi: 'Afternoon (12h-18h)',
      soir: 'Evening (18h-22h)',
      nuit: 'Night (22h-6h)',
      type_appareil: 'Appliance Type',
      submit: 'Submit Request',
      submitting: 'Sending...',
      success: 'Request Submitted',
      successMsg: 'Your request has been recorded and will be processed by the optimization algorithm',
      error: 'Submission Error',
      errorMsg: 'Please try again later.',
    },
  }

  const labels = t[language]

  // Charger les foyers depuis l'API
  const fetchHouseholds = useCallback(async () => {
    try {
      setLoadingHouseholds(true)
      const result = await api.foyers.getAll()
      
      let householdsData: Household[] = []
      if (result && result.success && Array.isArray(result.data)) {
        householdsData = result.data
      } else if (Array.isArray(result)) {
        householdsData = result
      }
      
      setHouseholds(householdsData)
    } catch (err) {
      console.error('Erreur chargement foyers:', err)
    } finally {
      setLoadingHouseholds(false)
    }
  }, [])

  useEffect(() => {
    fetchHouseholds()
  }, [fetchHouseholds])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Convertir la priorite au format backend
      const prioriteMap: Record<string, string> = {
        'high': 'high',
        'medium': 'medium', 
        'low': 'low'
      }

      await api.demandes.create({
        id_foyer: formData.id_foyer,
        energie_demandee: parseFloat(formData.energie_demandee),
        priorite: prioriteMap[formData.priorite],
        plage_horaire: formData.plage_horaire,
        type_appareil: formData.type_appareil
      })
      
      setIsSubmitted(true)
      setFormData({
        id_foyer: '',
        energie_demandee: '',
        priorite: 'medium',
        plage_horaire: 'soir',
        type_appareil: 'lumiere'
      })
      setTimeout(() => setIsSubmitted(false), 4000)
    } catch (err: any) {
      console.error('Erreur lors de la soumission de la demande:', err)
      setError(err.message || labels.errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white/80 backdrop-blur border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">{labels.title}</CardTitle>
        <CardDescription>{labels.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="space-y-4 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-emerald-900 text-lg">{labels.success}</h3>
                <p className="text-sm text-emerald-700 mt-1">{labels.successMsg}</p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="space-y-4 p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 text-lg">{labels.error}</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selection du menage */}
            <FieldGroup>
              <FieldLabel htmlFor="id_foyer">{labels.select_household}</FieldLabel>
              {loadingHouseholds ? (
                <div className="flex items-center gap-2 p-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Chargement...</span>
                </div>
              ) : (
                <Select 
                  value={formData.id_foyer} 
                  onValueChange={(value) => setFormData({ ...formData, id_foyer: value })}
                >
                  <SelectTrigger id="id_foyer">
                    <SelectValue placeholder={labels.select_placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {households.map((h) => (
                      <SelectItem key={h.id_foyer} value={h.id_foyer}>
                        {h.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FieldGroup>

            {/* Energie demandee */}
            <FieldGroup>
              <FieldLabel htmlFor="energie_demandee">{labels.energie}</FieldLabel>
              <Input
                id="energie_demandee"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder={labels.energie_placeholder}
                value={formData.energie_demandee}
                onChange={(e) => setFormData({ ...formData, energie_demandee: e.target.value })}
                required
              />
            </FieldGroup>

            {/* Priorite */}
            <FieldGroup>
              <FieldLabel htmlFor="priorite">{labels.priority}</FieldLabel>
              <Select 
                value={formData.priorite} 
                onValueChange={(value) => setFormData({ ...formData, priorite: value })}
              >
                <SelectTrigger id="priorite">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{labels.high}</SelectItem>
                  <SelectItem value="medium">{labels.medium}</SelectItem>
                  <SelectItem value="low">{labels.low}</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>

            {/* Plage horaire */}
            <FieldGroup>
              <FieldLabel htmlFor="plage_horaire">{labels.plage_horaire}</FieldLabel>
              <Select 
                value={formData.plage_horaire} 
                onValueChange={(value) => setFormData({ ...formData, plage_horaire: value })}
              >
                <SelectTrigger id="plage_horaire">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matin">{labels.matin}</SelectItem>
                  <SelectItem value="midi">{labels.midi}</SelectItem>
                  <SelectItem value="soir">{labels.soir}</SelectItem>
                  <SelectItem value="nuit">{labels.nuit}</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>

            {/* Type d'appareil */}
            <FieldGroup>
              <FieldLabel htmlFor="type_appareil">{labels.type_appareil}</FieldLabel>
              <Select 
                value={formData.type_appareil} 
                onValueChange={(value) => setFormData({ ...formData, type_appareil: value })}
              >
                <SelectTrigger id="type_appareil">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lumiere">💡 Eclairage</SelectItem>
                  <SelectItem value="telephone">📱 Telephone</SelectItem>
                  <SelectItem value="pompe_eau">💧 Pompe a eau</SelectItem>
                  <SelectItem value="commerce">🏪 Commerce</SelectItem>
                  <SelectItem value="refrigerateur">🧊 Refrigerateur</SelectItem>
                  <SelectItem value="radio_tv">📻 Radio/TV</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
              disabled={isLoading || !formData.id_foyer}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {labels.submitting}
                </>
              ) : labels.submit}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
