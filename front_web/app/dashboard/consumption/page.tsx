'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, Download, Filter } from 'lucide-react'

export default function ConsumptionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Consommation d&apos;électricité</h1>
        <p className="text-muted-foreground mt-2">Analysez votre consommation détaillée</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date de début</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
                <Input type="date" className="pl-10 h-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date de fin</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
                <Input type="date" className="pl-10 h-10" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Button className="flex-1 h-10">
                <Filter className="w-4 h-4 mr-2" />
                Appliquer
              </Button>
              <Button variant="outline" className="h-10">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consommation quotidienne</CardTitle>
            <CardDescription>Les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              <p>Graphique en barres de consommation</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendance mensuelle</CardTitle>
            <CardDescription>Évolution ce mois-ci</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              <p>Graphique de tendance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Détails horaires</CardTitle>
          <CardDescription>Consommation par heure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Heure</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Puissance (W)</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Énergie (Wh)</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Coût (Ar)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '00:00 - 01:00', power: '1200', energy: '1200', cost: '1 440' },
                  { time: '01:00 - 02:00', power: '950', energy: '950', cost: '1 140' },
                  { time: '02:00 - 03:00', power: '850', energy: '850', cost: '1 020' },
                  { time: '03:00 - 04:00', power: '1500', energy: '1500', cost: '1 800' },
                  { time: '04:00 - 05:00', power: '2100', energy: '2100', cost: '2 520' },
                  { time: '05:00 - 06:00', power: '2800', energy: '2800', cost: '3 360' },
                ].map((row) => (
                  <tr key={row.time} className="border-b border-border hover:bg-muted">
                    <td className="py-3 px-4 text-foreground">{row.time}</td>
                    <td className="py-3 px-4 text-foreground">{row.power}</td>
                    <td className="py-3 px-4 text-foreground">{row.energy}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
