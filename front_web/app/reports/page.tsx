'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Download,
  LogOut,
  Calendar,
  TrendingUp,
  BarChart3,
  FileText,
  Filter,
} from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState('fr');
  const [user, setUser] = useState<any>(null);
  const [period, setPeriod] = useState('monthly');

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
      reports: 'Rapports',
      energyReport: 'Rapport d\'énergie',
      consumpionTrends: 'Tendances de consommation',
      productionReport: 'Rapport de production',
      allocationReport: 'Rapport d\'allocation',
      monthly: 'Mensuel',
      yearly: 'Annuel',
      quarterly: 'Trimestriel',
      weekly: 'Hebdomadaire',
      logout: 'Déconnexion',
      download: 'Télécharger',
      period: 'Période',
      exportPDF: 'Exporter en PDF',
      exportCSV: 'Exporter en CSV',
      period_label: 'Période:',
    },
    mg: {
      reports: 'Tatanisim-pifanampiana',
      energyReport: 'Tatanisim-pifanampiana Angovy',
      consumpionTrends: 'Fiovan\'ny Konsomasion\'',
      productionReport: 'Tatanisim-pifanampiana Famokarana',
      allocationReport: 'Tatanisim-pifanampiana Fizarana',
      monthly: 'Isan\'volana',
      yearly: 'Isan\'taona',
      quarterly: 'Isan\'karapany',
      weekly: 'Isan\'herinandro',
      logout: 'Miala',
      download: 'Alefa',
      period: 'Fotoana',
      exportPDF: 'Alefa PDF',
      exportCSV: 'Alefa CSV',
      period_label: 'Fotoana:',
    },
    en: {
      reports: 'Reports',
      energyReport: 'Energy Report',
      consumpionTrends: 'Consumption Trends',
      productionReport: 'Production Report',
      allocationReport: 'Allocation Report',
      monthly: 'Monthly',
      yearly: 'Yearly',
      quarterly: 'Quarterly',
      weekly: 'Weekly',
      logout: 'Logout',
      download: 'Download',
      period: 'Period',
      exportPDF: 'Export PDF',
      exportCSV: 'Export CSV',
      period_label: 'Period:',
    },
  };

  const t = content[language as keyof typeof content];

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/landing');
  };

  const monthlyData = [
    { month: 'Jan', production: 450, consumption: 380, allocated: 420 },
    { month: 'Feb', production: 520, consumption: 410, allocated: 480 },
    { month: 'Mar', production: 580, consumption: 450, allocated: 520 },
    { month: 'Apr', production: 610, consumption: 480, allocated: 560 },
    { month: 'May', production: 650, consumption: 510, allocated: 600 },
    { month: 'Jun', production: 720, consumption: 540, allocated: 660 },
  ];

  const weeklyData = [
    { week: 'W1', value: 85 },
    { week: 'W2', value: 92 },
    { week: 'W3', value: 78 },
    { week: 'W4', value: 95 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-emerald-500/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">{t.reports}</h1>
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
        {/* Filter Section */}
        <Card className="bg-slate-800/50 border-emerald-500/30 p-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium">{t.period_label}</span>
            </div>
            <div className="flex gap-2">
              {[
                { value: 'weekly', label: t.weekly },
                { value: 'monthly', label: t.monthly },
                { value: 'quarterly', label: t.quarterly },
                { value: 'yearly', label: t.yearly },
              ].map((p) => (
                <Button
                  key={p.value}
                  onClick={() => setPeriod(p.value)}
                  className={`${
                    period === p.value
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : 'bg-slate-700 hover:bg-slate-600'
                  } text-white`}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Energy Production Chart */}
        <Card className="bg-slate-800/50 border-emerald-500/30 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              {t.productionReport}
            </h2>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm" size="sm">
                <Download className="w-4 h-4" />
                {t.exportPDF}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 text-sm" size="sm">
                <Download className="w-4 h-4" />
                {t.exportCSV}
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="production" fill="#10b981" name={language === 'fr' ? 'Production (kWh)' : language === 'mg' ? 'Famokarana (kWh)' : 'Production (kWh)'} />
              <Bar dataKey="allocated" fill="#3b82f6" name={language === 'fr' ? 'Allouée (kWh)' : language === 'mg' ? 'Alotra (kWh)' : 'Allocated (kWh)'} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Consumption Trends */}
        <Card className="bg-slate-800/50 border-emerald-500/30 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              {t.consumpionTrends}
            </h2>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-sm" size="sm">
                <Download className="w-4 h-4" />
                {t.exportPDF}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 text-sm" size="sm">
                <Download className="w-4 h-4" />
                {t.exportCSV}
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="#f59e0b"
                strokeWidth={2}
                name={language === 'fr' ? 'Consommation (kWh)' : language === 'mg' ? 'Konsomasion (kWh)' : 'Consumption (kWh)'}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Reports Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Energy Report */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-start gap-4 mb-4">
              <FileText className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{t.energyReport}</h3>
                <p className="text-slate-400 text-sm mt-1">
                  {language === 'fr'
                    ? 'Rapport complet sur la production et la consommation d\'énergie'
                    : language === 'mg'
                      ? 'Tatanisim-pifanampiana feno'
                      : 'Complete energy production and consumption report'}
                </p>
              </div>
            </div>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <Download className="w-4 h-4" />
              {t.download}
            </Button>
          </Card>

          {/* Allocation Report */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-start gap-4 mb-4">
              <Calendar className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{t.allocationReport}</h3>
                <p className="text-slate-400 text-sm mt-1">
                  {language === 'fr'
                    ? 'Rapport détaillé sur l\'allocation d\'énergie par ménage'
                    : language === 'mg'
                      ? 'Tatanisim-pifanampiana fizarana'
                      : 'Detailed energy allocation report by household'}
                </p>
              </div>
            </div>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <Download className="w-4 h-4" />
              {t.download}
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
