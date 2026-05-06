'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Sun, 
  Activity, 
  BatteryMedium,
  Trophy
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Petit composant graphique pour afficher les tendances (sparkline)
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

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      // Récupération dynamique depuis le backend EléctriMada
      const [resStats, resBattery, resMembers] = await Promise.all([
        fetch('http://localhost:3000/api/communities/com1/stats').then(r => r.json()),
        fetch('http://localhost:3000/api/batteries/stats').then(r => r.json()),
        fetch('http://localhost:3000/api/communities/com1/members').then(r => r.json())
      ]);

      const history = resStats.data || [];
      const members = resMembers.data || [];

      setMetrics({
        currentConso: history[history.length - 1]?.consumption || 9.0,
        consoHistory: history.map((d: any) => d.consumption),
        solarForecast: resStats.stats.totalProduction / 7,
        solarHistory: history.map((d: any) => d.production),
        batteryLevel: resBattery.data.niveau,
        batteryHistory: history.map((d: any) => d.batteryEnd),
        activeDevices: 24, // Valeur exemple (pouvant être liée à une table Equipement)
        devicesHistory: [20, 22, 24, 21, 25, 23, 24],
        weeklyData: history,
        topFoyers: [...members]
          .sort((a: any, b: any) => b.consommation - a.consommation)
          .slice(0, 5)
      });
    } catch (err) {
      console.error("Échec du chargement backend:", err);
      // Fallback sur des données de démonstration cohérentes avec seed.json
      const dummyDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      setMetrics({
        currentConso: 9.0,
        consoHistory: [10.5, 9.2, 7.5, 11.0, 8.8, 6.5, 9.0],
        solarForecast: 14.2,
        solarHistory: [15.0, 14.5, 12.0, 16.2, 13.8, 11.5, 14.0],
        batteryLevel: 75,
        batteryHistory: [80, 75, 70, 85, 90, 80, 75],
        activeDevices: 24,
        devicesHistory: [18, 20, 24, 22, 25, 23, 24],
        weeklyData: dummyDays.map((day, i) => ({
          day,
          consumption: [10.5, 9.2, 7.5, 11.0, 8.8, 6.5, 9.0][i],
          production: [15.0, 14.5, 12.0, 16.2, 13.8, 11.5, 14.0][i]
        })),
        topFoyers: [
          { name: "Hôpital de Village", consommation: 45.5, priorite: "Critique" },
          { name: "École Publique", consommation: 28.2, priorite: "Haute" },
          { name: "Foyer Rakoto", consommation: 15.4, priorite: "Normale" },
          { name: "Foyer Randrian", consommation: 12.8, priorite: "Normale" },
          { name: "Foyer Marie", consommation: 10.5, priorite: "Basse" }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 60000);
    return () => clearInterval(timer);
  }, []);

  const statCards = [
    {
      title: "Consommation actuelle",
      value: `${metrics?.currentConso?.toFixed(1) || '0.0'} kWh`,
      icon: Zap,
      bgColor: "bg-emerald-50",
      iconColor: "#059669",
      history: metrics?.consoHistory || []
    },
    {
      title: "Production prévue demain",
      value: `${metrics?.solarForecast?.toFixed(1) || '0.0'} kWh`,
      icon: Sun,
      bgColor: "bg-amber-50",
      iconColor: "#d97706",
      history: metrics?.solarHistory || []
    },
    {
      title: "État de la batterie",
      value: `${metrics?.batteryLevel || '0'}%`,
      icon: BatteryMedium,
      bgColor: "bg-blue-50",
      iconColor: "#2563eb",
      history: metrics?.batteryHistory || []
    },
    {
      title: "Appareils actifs",
      value: metrics?.activeDevices || '0',
      icon: Activity,
      bgColor: "bg-purple-50",
      iconColor: "#9333ea",
      history: metrics?.devicesHistory || []
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Vue d'ensemble Admin</h1>
        <p className="text-gray-500 mt-2">
          Suivi dynamique de l'énergie communautaire EléctriMada.
          {loading && <span className="ml-3 text-xs italic animate-pulse text-blue-600">Synchronisation...</span>}
        </p>
      </header>

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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graphique détaillé Recharts */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Analyse Hebdomadaire</h2>
              <p className="text-sm text-gray-500">Flux énergétique de la communauté</p>
            </div>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-gray-600">Conso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <span className="text-gray-600">Prod</span>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.weeklyData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorConso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorConso)" 
                  animationDuration={1500}
                />
                <Area type="monotone" dataKey="production" stroke="#f59e0b" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Foyers énergivores */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <Trophy size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Top Consommateurs</h2>
              <p className="text-sm text-gray-500">Moyenne quotidienne</p>
            </div>
          </div>

          <div className="space-y-6">
            {metrics?.topFoyers?.map((foyer: any, index: number) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center min-w-[32px] h-8 rounded-full bg-gray-50 text-sm font-bold text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    {index + 1}
                  </span>
                  <div className="max-w-[120px] sm:max-w-none">
                    <p className="font-bold text-gray-800 truncate">{foyer.name}</p>
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold ${
                      foyer.priorite === 'Critique' || foyer.priorite === 'Haute' 
                        ? 'text-red-500' 
                        : 'text-gray-400'
                    }`}>
                      {foyer.priorite}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900">{foyer.consommation} <span className="text-xs font-normal text-gray-500">kWh</span></p>
                  <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden ml-auto">
                    <div 
                      className="h-full bg-emerald-500" 
                      style={{ width: `${(foyer.consommation / (metrics.topFoyers[0].consommation || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}