'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  LogOut,
  AlertTriangle,
  Zap,
  Wrench,
  BarChart3,
  CheckCircle,
  XCircle,
  Lightbulb,
} from 'lucide-react';

export default function TechnicianDashboard() {
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
      dashboard: 'Tableau de Bord Technicien',
      systemMonitoring: 'Suivi du système',
      maintenance: 'Maintenance',
      alerts: 'Alertes système',
      inverters: 'Onduleurs',
      panels: 'Panneaux solaires',
      batteries: 'Batteries',
      logout: 'Déconnexion',
      status: 'État',
      healthy: 'Bon',
      warning: 'Attention',
      critical: 'Critique',
      viewDetails: 'Voir les détails',
      performanceMetrics: 'Métriques de performance',
      efficiency: 'Efficacité',
      temperature: 'Température',
      voltage: 'Tension',
    },
    mg: {
      dashboard: 'Latabatra Teknisiana',
      systemMonitoring: 'Saintsiain\'ng rafitra',
      maintenance: 'Fitantanan\'ny fampitaovana',
      alerts: 'Fampitandremana',
      inverters: 'Onduleurs',
      panels: 'Panela',
      batteries: 'Bateria',
      logout: 'Miala',
      status: 'Toetran\'ny',
      healthy: 'Tsara',
      warning: 'Fetsy',
      critical: 'Matoko',
      viewDetails: 'Jereo ny tsinjara',
      performanceMetrics: 'Metrika performance',
      efficiency: 'Fampitsarana',
      temperature: 'Hafana',
      voltage: 'Herinaratra',
    },
    en: {
      dashboard: 'Technician Dashboard',
      systemMonitoring: 'System Monitoring',
      maintenance: 'Maintenance',
      alerts: 'System Alerts',
      inverters: 'Inverters',
      panels: 'Solar Panels',
      batteries: 'Batteries',
      logout: 'Logout',
      status: 'Status',
      healthy: 'Healthy',
      warning: 'Warning',
      critical: 'Critical',
      viewDetails: 'View Details',
      performanceMetrics: 'Performance Metrics',
      efficiency: 'Efficiency',
      temperature: 'Temperature',
      voltage: 'Voltage',
    },
  };

  const t = content[language as keyof typeof content];

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/landing');
  };

  const performanceData = [
    { time: '00:00', efficiency: 85 },
    { time: '06:00', efficiency: 92 },
    { time: '12:00', efficiency: 98 },
    { time: '18:00', efficiency: 88 },
    { time: '24:00', efficiency: 80 },
  ];

  const systemComponents = [
    { name: t.inverters, status: 'healthy', value: 98.5, unit: '%' },
    { name: t.panels, status: 'healthy', value: 42, unit: '°C' },
    { name: t.batteries, status: 'warning', value: 75, unit: '%' },
  ];

  const alerts = [
    {
      level: 'warning',
      title: language === 'fr' ? 'Température batterie élevée' : language === 'mg' ? 'Hafanan\'bateria avo' : 'High Battery Temperature',
      time: '2 hours ago',
    },
    {
      level: 'info',
      title: language === 'fr' ? 'Maintenance planifiée' : language === 'mg' ? 'Fitantanan\'planified' : 'Scheduled Maintenance',
      time: '1 day ago',
    },
    {
      level: 'success',
      title: language === 'fr' ? 'Système optimisé' : language === 'mg' ? 'Rafitra optimized' : 'System Optimized',
      time: '3 days ago',
    },
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
        {/* System Status */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {systemComponents.map((component, i) => (
            <Card
              key={i}
              className="bg-slate-800/50 border-emerald-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-white">{component.name}</h3>
                {component.status === 'healthy' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{component.value}</span>
                <span className="text-slate-400">{component.unit}</span>
              </div>
              <p className={`text-xs mt-2 ${component.status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`}>
                {component.status === 'healthy' ? t.healthy : t.warning}
              </p>
            </Card>
          ))}
        </div>

        {/* Performance Chart */}
        <Card className="bg-slate-800/50 border-emerald-500/30 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">{t.performanceMetrics}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Alerts & Maintenance */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Alerts */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">{t.alerts}</h3>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-slate-700/50 border border-slate-600"
                >
                  <div className="flex items-start gap-3">
                    {alert.level === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    )}
                    {alert.level === 'info' && (
                      <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    )}
                    {alert.level === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-white">{alert.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Maintenance */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">{t.maintenance}</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <h4 className="font-medium text-white mb-2">
                  {language === 'fr' ? 'Nettoyage des panneaux' : language === 'mg' ? 'Fandiodinana panela' : 'Panel Cleaning'}
                </h4>
                <p className="text-sm text-slate-400 mb-3">
                  {language === 'fr'
                    ? 'Prévu pour le 15 mai'
                    : language === 'mg'
                      ? 'Planified ho an\'ny 15 Meï'
                      : 'Scheduled for May 15'}
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  {t.viewDetails}
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                <h4 className="font-medium text-white mb-2">
                  {language === 'fr' ? 'Révision batterie' : language === 'mg' ? 'Fandaharana bateria' : 'Battery Inspection'}
                </h4>
                <p className="text-sm text-slate-400 mb-3">
                  {language === 'fr'
                    ? 'Prévu pour le 22 mai'
                    : language === 'mg'
                      ? 'Planified ho an\'ny 22 Meï'
                      : 'Scheduled for May 22'}
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                  {t.viewDetails}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
