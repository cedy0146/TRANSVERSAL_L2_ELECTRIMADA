'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, Power, Trash2, Plus } from 'lucide-react'

export default function DevicesPage() {
  const devices = [
    {
      id: 1,
      name: 'Climatiseur salon',
      type: 'Climatiseur',
      power: '2000W',
      status: 'Actif',
      daily: '12.5 kWh',
      monthly: '375 kWh'
    },
    {
      id: 2,
      name: 'Réfrigérateur cuisine',
      type: 'Réfrigérateur',
      power: '150W',
      status: 'Actif',
      daily: '3.6 kWh',
      monthly: '108 kWh'
    },
    {
      id: 3,
      name: 'Chauffeur d\'eau',
      type: 'Chauffe-eau',
      power: '3000W',
      status: 'Inactif',
      daily: '6.0 kWh',
      monthly: '180 kWh'
    },
    {
      id: 4,
      name: 'Lave-linge',
      type: 'Machine à laver',
      power: '1500W',
      status: 'Inactif',
      daily: '1.5 kWh',
      monthly: '45 kWh'
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Appareils électriques</h1>
          <p className="text-muted-foreground mt-2">Gérez vos appareils et leur consommation</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un appareil
        </Button>
      </div>

      {/* Devices Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {devices.map((device) => (
          <Card key={device.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>{device.name}</CardTitle>
                <CardDescription>{device.type}</CardDescription>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                device.status === 'Actif'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {device.status === 'Actif' ? (
                  <div className="flex items-center gap-1">
                    <Power className="w-3 h-3" />
                    {device.status}
                  </div>
                ) : (
                  device.status
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Puissance</p>
                    <p className="font-semibold text-foreground">{device.power}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Consommation jour</p>
                    <p className="font-semibold text-foreground">{device.daily}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Consommation mois</p>
                    <p className="font-semibold text-foreground">{device.monthly}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé des appareils</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Appareils total</p>
              <p className="text-3xl font-bold text-foreground">{devices.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Actuellement actifs</p>
              <p className="text-3xl font-bold text-primary">{devices.filter(d => d.status === 'Actif').length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Consommation totale</p>
              <p className="text-3xl font-bold text-foreground">45.6 kWh/jour</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
