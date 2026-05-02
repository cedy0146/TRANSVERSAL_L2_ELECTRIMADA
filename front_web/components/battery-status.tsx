'use client';

import { Battery } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import { AlertCircle, Loader2 } from 'lucide-react'

interface BatteryStatusProps {
  language: 'fr' | 'mg' | 'en'
}

interface BatteryStats {
  capacite_actuelle: number;
  capacite_totale: number;
  niveau: number;
  seuil_critique: number;
}

export default function BatteryStatus({ language }: BatteryStatusProps) {
  const t = {
    fr: {
      title: 'État de la Batterie',
      capacity: 'Capacité',
      kWh: 'kWh',
      status: 'État',
      charging: 'Charge en cours',
      discharging: 'Décharge en cours',
      stable: 'Stable',
      health: 'Santé',
      excellent: 'Excellent',
      estimated: 'Autonomie estimée',
      hours: 'heures',
    },
    mg: {
      title: 'Toetran\'ny Bateria',
      capacity: 'Capacité',
      kWh: 'kWh',
      status: 'Toetran\'',
      charging: 'Miampasampasampasampasampasa',
      discharging: 'Mifotsitra',
      stable: 'Mitsara',
      health: 'Fahasalama',
      excellent: 'Tsara Indrindra',
      estimated: 'Fotoana Mahazo',
      hours: 'ora',
    },
    en: {
      title: 'Battery Status',
      capacity: 'Capacity',
      kWh: 'kWh',
      status: 'Status',
      charging: 'Charging',
      discharging: 'Discharging',
      stable: 'Stable',
      health: 'Health',
      excellent: 'Excellent',
      estimated: 'Estimated Autonomy',
      hours: 'hours',
    },
  }

  const labels = t[language]

  const [batteryStats, setBatteryStats] = useState<BatteryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les données de la batterie
  const fetchBatteryData = useCallback(async () => {
    try {
      const result = await api.batteries.getStats();
      if (result && result.success && result.data) {
        setBatteryStats(result.data);
        setError(null);
      } else {
        setError(result.error || "Aucune donnée de batterie disponible");
      }
    } catch (err: any) {
      console.error('Erreur API Batterie:', err);
      setError("Impossible de récupérer l'état de la batterie. Vérifiez que le backend est bien lancé sur le port 3000.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial + refresh automatique toutes les 60 secondes
  useEffect(() => {
    fetchBatteryData();
    const interval = setInterval(fetchBatteryData, 60000);
    return () => clearInterval(interval);
  }, [fetchBatteryData]);

  // Calculer l'autonomie en heures (estimation basée sur la consommation moyenne)
  const calculateAutonomy = () => {
    if (!batteryStats) return 0;
    // Estimation: consommation moyenne du village = 5 kWh
    const consumptionRate = 5; // kWh par heure en moyenne
    return (batteryStats.capacite_actuelle / consumptionRate).toFixed(1);
  }

  const getStatusColor = (niveau: number) => {
    if (niveau >= 75) return 'bg-emerald-500'
    if (niveau >= 50) return 'bg-blue-500'
    if (niveau >= 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStatusText = (niveau: number) => {
    if (niveau >= 75) return labels.charging
    if (niveau >= 25) return labels.stable
    return labels.discharging
  }

  const getHealthStatus = (niveau: number) => {
    if (niveau >= 70) return labels.excellent;
    if (niveau >= 40) return labels.stable;
    return labels.discharging;
  }
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
        <p>Récupération de l'état de la batterie...</p>
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

  // Afficher les données dynamiques de la batterie
  const niveau = batteryStats?.niveau || 0;
  const currentCapacity = batteryStats?.capacite_actuelle || 0;
  const maxCapacity = batteryStats?.capacite_totale || 100;
  const autonomy = calculateAutonomy();

  return (
    <Card className="bg-white/80 backdrop-blur border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <Battery className="w-5 h-5 text-blue-500" />
          {labels.title}
        </CardTitle>
        <CardDescription>Système de stockage d&apos;énergie</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">{labels.capacity}</span>
            <span className="text-2xl font-bold text-slate-900">{niveau}%</span>
          </div>
          <Progress value={niveau} className="h-3" />
          {/* Afficher les vraies valeurs de la DB au lieu de valeurs codées */}
          <p className="text-xs text-slate-500 mt-2">{currentCapacity} / {maxCapacity} {labels.kWh}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-600 uppercase">{labels.status}</p>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(niveau)} animate-pulse`}></div>
              <span className="text-sm font-medium text-slate-900">{getStatusText(niveau)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-600 uppercase">{labels.health}</p>
            <span className="text-sm font-medium text-emerald-600">{getHealthStatus(niveau)}</span>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <p className="text-xs font-medium text-slate-600 uppercase">{labels.estimated}</p>
          {/* Afficher l'autonomie calculée depuis les données réelles */}
          <p className="text-2xl font-bold text-slate-900">{autonomy} {labels.hours}</p>
          <p className="text-xs text-slate-500">À consommation actuelle</p>
        </div>
      </CardContent>
    </Card>
  )
}
