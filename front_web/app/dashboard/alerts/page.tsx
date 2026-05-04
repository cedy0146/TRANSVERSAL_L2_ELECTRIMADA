'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Check, Trash2, Bell } from 'lucide-react'

export default function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: 'Consommation élevée',
      message: 'Votre consommation a dépassé 3.5 kW',
      severity: 'warning',
      time: 'Il y a 2 heures',
      read: false
    },
    {
      id: 2,
      type: 'Pic de consommation',
      message: 'Pic détecté entre 14h00 et 14h30',
      severity: 'info',
      time: 'Il y a 4 heures',
      read: false
    },
    {
      id: 3,
      type: 'Maintenance programmée',
      message: 'Maintenance système le 15 mai à 14h00',
      severity: 'info',
      time: 'Il y a 1 jour',
      read: true
    },
    {
      id: 4,
      type: 'Appareil défaillant',
      message: 'Le compteur intelligent semble défaillant',
      severity: 'error',
      time: 'Il y a 2 jours',
      read: true
    },
    {
      id: 5,
      type: 'Économies détectées',
      message: 'Vous avez réduit votre consommation de 15%',
      severity: 'success',
      time: 'Il y a 3 jours',
      read: true
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800'
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'error':
      case 'warning':
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />
      default:
        return <Bell className="w-5 h-5 flex-shrink-0" />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alertes</h1>
        <p className="text-muted-foreground mt-2">Recevez des notifications importantes</p>
      </div>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Paramètres des alertes</CardTitle>
          <CardDescription>Configurez les types d&apos;alertes que vous souhaitez recevoir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Consommation élevée', enabled: true },
              { label: 'Pics de consommation', enabled: true },
              { label: 'Appareils défaillants', enabled: true },
              { label: 'Maintenance', enabled: false },
              { label: 'Rapports mensuels', enabled: true },
            ].map((alert) => (
              <div key={alert.label} className="flex items-center justify-between">
                <label className="font-medium text-foreground">{alert.label}</label>
                <div className="relative w-12 h-6 bg-gray-200 rounded-full cursor-pointer" style={{
                  backgroundColor: alert.enabled ? '#10b981' : '#d1d5db'
                }}>
                  <div
                    className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"
                    style={{ transform: alert.enabled ? 'translateX(24px)' : 'translateX(0)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Alertes récentes</h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 flex items-start gap-4 ${getSeverityColor(alert.severity)}`}>
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <h3 className="font-semibold">{alert.type}</h3>
                <p className="text-sm opacity-90 mt-1">{alert.message}</p>
                <p className="text-xs opacity-75 mt-2">{alert.time}</p>
              </div>
              {!alert.read && (
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <Check className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
