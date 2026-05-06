'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Zap, 
  Sun, 
  Activity, 
  BatteryMedium, 
  Trophy,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { useAuth } from '@/context/AuthContext'

// Petit composant graphique pour afficher les tendances dans les cartes (sparkline)
const Sparkline = ({ data, color }: { data: number[], color: string }) => {
  if (!data || data.length < 2) return <div className="h-[30px]" />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 30;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="mt-4 opacity-50">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const loadDashboardData = async (isInitial = true) => {
      // Sécurité TypeScript : On récupère l'ID depuis la session utilisateur réelle
      const cid = (user as any)?.communauteId;
      if (!cid) return;

      try {
        if (isInitial) setLoading(true)
        
        const API_BASE = 'http://localhost:3001/api';
        // Récupération de toutes les données réelles depuis MySQL via les points d'accès API
        const [resStats, resBattery, resMembers, resCommunity, resDevices] = await Promise.all([
          fetch(`${API_BASE}/communities/${cid}/stats`).then(r => r.json()),
          fetch(`${API_BASE}/batteries/stats`).then(r => r.json()),
          fetch(`${API_BASE}/communities/${cid}/members`).then(r => r.json()),
          fetch(`${API_BASE}/communities/${cid}`).then(r => r.json()),
          fetch(`${API_BASE}/communities/${cid}/devices`).then(r => r.json())
        ]);

        const history = resStats.data || [];
        const members = resMembers.data || [];
        const community = resCommunity.data || {};
        const devices = resDevices.data || [];

        const weeklyData = history.map((d: any) => ({
          ...d,
          energyGap: d.consumption > d.production ? [d.production, d.consumption] : [d.production, d.production]
        }));

        setMetrics({
          currentConso: history[history.length - 1]?.consumption || 0,
          consoHistory: history.map((d: any) => d.consumption),
          solarForecast: community.dailyProduction || 0,
          solarHistory: history.map((d: any) => d.production),
          batteryLevel: resBattery.data?.niveau || 0,
          batteryHistory: history.map((d: any) => d.batteryEnd),
          activeDevices: devices.length,
          devicesHistory: history.map((d: any) => d.demandesTraitees),
          weeklyData: weeklyData,
          topFoyers: members.sort((a: any, b: any) => (b.conso_estimee || b.consommation) - (a.conso_estimee || a.consommation)).slice(0, 5)
        });
        
        setError(null);
      } catch (err) {
        console.error("Erreur de récupération des données:", err);
        setError("Erreur de synchronisation avec la base de données MySQL. L'API backend ne répond pas.");
        setMetrics(null); // Force la suppression de toute donnée résiduelle
      } finally {
        if (isInitial) setLoading(false)
      }
    }

    loadDashboardData(true);
    const interval = setInterval(() => loadDashboardData(false), 30000);
    return () => clearInterval(interval);
  }, [user?.communauteId]); // Se rafraîchit si l'ID de communauté change

  // On gère le cas où l'utilisateur n'est pas encore authentifié (évite user is null)
  if (!user || (loading && !metrics)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-gray-400 font-medium">Initialisation de la session...</p>
      </div>
    )
  }

  if (error && !metrics) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500 animate-pulse" />
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900">Synchronisation impossible</p>
          <p className="text-gray-500 max-w-md">{error}</p>
        </div>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
          Réessayer la connexion
        </button>
      </div>
    )
  }

  const statCards = [
    {
      title: "Consommation actuelle",
      value: `${(metrics?.currentConso || 0).toFixed(1)} kWh`,
      icon: Zap,
      bgColor: "bg-emerald-50",
      iconColor: "#059669",
      history: metrics?.consoHistory || []
    },
    {
      title: "Production prévue demain",
      value: `${(metrics?.solarForecast || 0).toFixed(1)} kWh`,
      icon: Sun,
      bgColor: "bg-amber-50",
      iconColor: "#d97706",
      history: metrics?.solarHistory || []
    },
    {
      title: "État de la batterie",
      value: `${metrics?.batteryLevel || 0}%`,
      icon: BatteryMedium,
      bgColor: "bg-blue-50",
      iconColor: "#2563eb",
      history: metrics?.batteryHistory || []
    },
    {
      title: "Appareils actifs",
      value: metrics?.activeDevices || 0,
      icon: Activity,
      bgColor: "bg-purple-50",
      iconColor: "#9333ea",
      history: metrics?.devicesHistory || []
    }
  ];

  return (
    <div className="p-2 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">Bienvenue, {user?.nom}. Voici l'état actuel de votre communauté.</p>
      </div>

      {/* Grille des cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} p-6 rounded-2xl shadow-sm border border-white/50 transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-gray-500 text-xs uppercase tracking-wider mb-2">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-black text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <div className="p-2 rounded-xl bg-white shadow-sm" style={{ color: stat.iconColor }}>
                <stat.icon size={24} />
              </div>
            </div>
            <Sparkline data={stat.history} color={stat.iconColor} />
          </div>
        ))}
      </div>

      {/* Alertes en temps réel */}
      {metrics?.batteryLevel < 20 && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm animate-pulse">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-bold text-red-800">
                Niveau de batterie critique : {metrics.batteryLevel}%
              </h3>
              <p className="text-xs text-red-700 mt-1">
                L'énergie communautaire est passée sous le seuil de 20%. Le mode ECO est activé : les consommations non-prioritaires sont restreintes.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graphique détaillé Recharts */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Analyse Hebdomadaire</h2>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div><span className="text-gray-600">Déficit</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-gray-600">Conso</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div><span className="text-gray-600">Prod</span></div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.weeklyData || []}>
                <defs>
                  <linearGradient id="colorConso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="energyGap" stroke="none" fill="#ef4444" fillOpacity={0.4} />
                <Area type="monotone" dataKey="consumption" stroke="#10b981" strokeWidth={4} fill="url(#colorConso)" />
                <Area type="monotone" dataKey="production" stroke="#f59e0b" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Foyers énergivores */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Trophy size={20} /></div>
            <h2 className="text-xl font-bold text-gray-900">Top Consommateurs</h2>
          </div>
          <div className="space-y-6">
            {metrics?.topFoyers?.map((foyer: any, index: number) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center min-w-[32px] h-8 rounded-full bg-gray-50 text-sm font-bold text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">{index + 1}</span>
                  <p className="font-bold text-gray-800 truncate">{foyer.nom_responsable || foyer.name}</p>
                </div>
                <p className="font-black text-gray-900">{foyer.conso_estimee || foyer.consommation} <span className="text-xs font-normal text-gray-500">kWh</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
