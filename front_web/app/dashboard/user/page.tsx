'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LogOut, Zap, Calendar, TrendingUp, Home, AlertCircle, Settings } from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const [language, setLanguage] = useState('fr');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const content = {
    fr: {
      dashboard: 'Mon Tableau de Bord',
      myConsumption: 'Ma consommation',
      batteryStatus: 'État de la batterie',
      allocation: 'Allocation d\'énergie',
      requests: 'Mes demandes',
      dailyUsage: 'Utilisation quotidienne',
      logout: 'Déconnexion',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      submitRequest: 'Soumettre une demande',
      viewHistory: 'Voir l\'historique',
      settings: 'Paramètres',
      batteryLevel: 'Niveau de batterie',
      availableEnergy: 'Énergie disponible',
      myAllocated: 'Ma part allouée',
      surplus: 'Énergie excédentaire',
      currentUsage: 'Consommation actuelle',
    },
    mg: {
      dashboard: 'Ny Latabatra Ko',
      myConsumption: 'Ny konsomasionko',
      batteryStatus: 'Toetran\'ny bateria',
      allocation: 'Fizaran\'angovy',
      requests: 'Ny fangatahako',
      dailyUsage: 'Fampiasana isan\'andro',
      logout: 'Miala',
      thisWeek: 'Izahebanin\'ito',
      thisMonth: 'Izahebamina',
      submitRequest: 'Ampidiro ny fangatahana',
      viewHistory: 'Jereo ny varotra',
      settings: 'Rindrambaiko',
      batteryLevel: 'Haavon\'ny bateria',
      availableEnergy: 'Angovy aotra',
      myAllocated: 'Ny fizaran\'ahy',
      surplus: 'Angovy ho an\'ny hafa',
      currentUsage: 'Konsomasion\'ankehitriny',
    },
    en: {
      dashboard: 'My Dashboard',
      myConsumption: 'My Consumption',
      batteryStatus: 'Battery Status',
      allocation: 'Energy Allocation',
      requests: 'My Requests',
      dailyUsage: 'Daily Usage',
      logout: 'Logout',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      submitRequest: 'Submit Request',
      viewHistory: 'View History',
      settings: 'Settings',
      batteryLevel: 'Battery Level',
      availableEnergy: 'Available Energy',
      myAllocated: 'My Allocation',
      surplus: 'Surplus Energy',
      currentUsage: 'Current Usage',
    },
  };

  const t = content[language as keyof typeof content];

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/landing');
  };

  const consumptionData = [
    { day: 'Mon', usage: 45 },
    { day: 'Tue', usage: 52 },
    { day: 'Wed', usage: 48 },
    { day: 'Thu', usage: 61 },
    { day: 'Fri', usage: 55 },
    { day: 'Sat', usage: 67 },
    { day: 'Sun', usage: 58 },
  ];

  const batteryData = [
    { time: '00:00', charge: 100 },
    { time: '06:00', charge: 85 },
    { time: '12:00', charge: 60 },
    { time: '18:00', charge: 75 },
    { time: '24:00', charge: 90 },
  ];

  const stats = [
    { label: t.batteryLevel, value: '75%', icon: <Zap /> },
    { label: t.availableEnergy, value: '2.4 kWh', icon: <TrendingUp /> },
    { label: t.myAllocated, value: '3.5 kWh', icon: <Home /> },
    { label: t.currentUsage, value: '1.2 kW', icon: <AlertCircle /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-emerald-500/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">{t.dashboard}</h1>
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded border border-emerald-500/30"
              >
                <option value="fr">Français</option>
                <option value="mg">Malagasy</option>
                <option value="en">English</option>
              </select>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="bg-slate-800/50 border-emerald-500/30 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="text-emerald-500 opacity-20">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Consumption */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t.dailyUsage}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="usage" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Battery Status */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t.batteryStatus}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={batteryData}>
                <defs>
                  <linearGradient id="colorCharge" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="charge"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorCharge)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Submit Request */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">{t.requests}</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {language === 'fr'
                ? 'Soumettez une demande d\'énergie'
                : language === 'mg'
                  ? 'Ampidiro ny fangatahana'
                  : 'Submit an energy request'}
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              {t.submitRequest}
            </Button>
          </Card>

          {/* History */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">{t.allocation}</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {language === 'fr'
                ? 'Consultez votre historique d\'allocation'
                : language === 'mg'
                  ? 'Jereo ny fizaran\'ankehitriny'
                  : 'View your allocation history'}
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              {t.viewHistory}
            </Button>
          </Card>

          {/* Settings */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">{t.settings}</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {language === 'fr'
                ? 'Configurez vos préférences'
                : language === 'mg'
                  ? 'Rindrambaiko ny ianao resindao'
                  : 'Configure your preferences'}
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              {t.settings}
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
