'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Calendar } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      title: 'Rapport mensuel - Avril 2024',
      date: '30 avril 2024',
      consumption: '245.8 kWh',
      cost: '45,230 Ar',
      type: 'PDF'
    },
    {
      title: 'Rapport mensuel - Mars 2024',
      date: '31 mars 2024',
      consumption: '198.5 kWh',
      cost: '36,410 Ar',
      type: 'PDF'
    },
    {
      title: 'Rapport mensuel - Février 2024',
      date: '29 février 2024',
      consumption: '212.3 kWh',
      cost: '38,980 Ar',
      type: 'PDF'
    },
    {
      title: 'Rapport mensuel - Janvier 2024',
      date: '31 janvier 2024',
      consumption: '267.4 kWh',
      cost: '49,090 Ar',
      type: 'PDF'
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rapports</h1>
        <p className="text-muted-foreground mt-2">Téléchargez vos rapports de consommation</p>
      </div>

      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle>Générer un rapport personnalisé</CardTitle>
          <CardDescription>Créez un rapport sur la période de votre choix</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Du</label>
              <input type="date" className="w-full h-10 px-3 border border-input rounded-md bg-background text-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Au</label>
              <input type="date" className="w-full h-10 px-3 border border-input rounded-md bg-background text-foreground" />
            </div>
            <div className="flex items-end">
              <Button className="w-full h-10">Générer</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Rapports disponibles</h2>
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.title}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{report.title}</h3>
                      <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {report.date}
                        </div>
                        <div>Consommation: {report.consumption}</div>
                        <div>Coût: {report.cost}</div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Download className="w-4 h-4 mr-2" />
                    {report.type}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
