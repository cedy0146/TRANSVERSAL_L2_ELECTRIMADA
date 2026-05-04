'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Zap, TrendingDown, AlertCircle, Clock } from 'lucide-react'
import { dashboardAPI } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

interface Stats {
  conso_actuelle: string;
  conso_mensuelle: string;
  cout_estime: string;
  appareils_actifs: number;
  batteries_ok: number;
  alertes: any[];
  appareils: any[];
  demandes_total: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const res = await dashboardAPI.stats()
      if (res.success && res.data) {
        setStats(res.data)
      } else {
        setStats(null)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">Bienvenue {user?.nom}</p>
      </div>

      {/* Exemple simple d’utilisation de l’icône */}
      <Card>
        <CardHeader>
          <CardTitle>Exemple de graphique</CardTitle>
          <CardDescription>Icône SVG corrigée</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart3Icon className="w-8 h-8 text-primary" />
        </CardContent>
      </Card>
    </div>
  )
}

function BarChart3Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="5" y1="12" x2="5" y2="22" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  )
}
