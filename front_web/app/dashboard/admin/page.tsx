'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  LogOut,
  Users,
  Zap,
  TrendingUp,
  AlertCircle,
  Settings,
  FileText,
  PlusCircle,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboard() {
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
      dashboard: 'Tableau de Bord Admin',
      overview: 'Aperçu du système',
      communities: 'Communautés',
      users: 'Utilisateurs',
      energy: 'Énergie produite',
      requests: 'Demandes en attente',
      activeUsers: 'Utilisateurs actifs',
      systemHealth: 'Santé du système',
      logout: 'Déconnexion',
      reportsManagement: 'Gestion des rapports',
      usersManagement: 'Gestion des utilisateurs',
      systemSettings: 'Paramètres système',
      communityManagement: 'Gestion des communautés',
      viewReports: 'Voir les rapports',
      manageUsers: 'Gérer les utilisateurs',
      systemConfig: 'Configuration',
      communities_unit: 'communautés',
      users_unit: 'utilisateurs',
      kwh_unit: 'kWh',
      requests_unit: 'demandes',
      users_active_unit: 'actifs',
      health_unit: '%',
    },
    mg: {
      dashboard: 'Latabatra Admin',
      overview: 'Fampahalalana ny rafitra',
      communities: 'Fiaraha-monina',
      users: 'Mpampiasa',
      energy: 'Angovy noforoina',
      requests: 'Fangatahana miandry',
      activeUsers: 'Mpampiasa mavitrika',
      systemHealth: 'Fahasalaman\'ny rafitra',
      logout: 'Miala',
      reportsManagement: 'Fitantanan\'ny tatanisim-pifanampiana',
      usersManagement: 'Fitantanan\'ny mpampiasa',
      systemSettings: 'Rindrambaiko rafitra',
      communityManagement: 'Fitantanan\'ny fiaraha-monina',
      viewReports: 'Jereo ny tatanisim-pifanampiana',
      manageUsers: 'Fampiasana ny mpampiasa',
      systemConfig: 'Configurin\'ny rafitra',
      communities_unit: 'fiaraha-monina',
      users_unit: 'mpampiasa',
      kwh_unit: 'kWh',
      requests_unit: 'fangatahana',
      users_active_unit: 'mavitrika',
      health_unit: '%',
    },
    en: {
      dashboard: 'Admin Dashboard',
      overview: 'System Overview',
      communities: 'Communities',
      users: 'Users',
      energy: 'Energy Produced',
      requests: 'Pending Requests',
      activeUsers: 'Active Users',
      systemHealth: 'System Health',
      logout: 'Logout',
      reportsManagement: 'Reports Management',
      usersManagement: 'Users Management',
      systemSettings: 'System Settings',
      communityManagement: 'Communities Management',
      viewReports: 'View Reports',
      manageUsers: 'Manage Users',
      systemConfig: 'Configuration',
      communities_unit: 'communities',
      users_unit: 'users',
      kwh_unit: 'kWh',
      requests_unit: 'requests',
      users_active_unit: 'active',
      health_unit: '%',
    },
  };

  const t = content[language as keyof typeof content];

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/landing');
  };

  const energyData = [
    { month: 'Jan', production: 4000, consumed: 2400, surplus: 1600 },
    { month: 'Feb', production: 3000, consumed: 1398, surplus: 1602 },
    { month: 'Mar', production: 2000, consumed: 9800, surplus: -7800 },
    { month: 'Apr', production: 2780, consumed: 3908, surplus: -1128 },
    { month: 'May', production: 1890, consumed: 4800, surplus: -2910 },
    { month: 'Jun', production: 2390, consumed: 3800, surplus: -1410 },
  ];

  const communityDistribution = [
    { name: language === 'fr' ? 'Village A' : language === 'mg' ? 'Tanàna A' : 'Village A', value: 35 },
    { name: language === 'fr' ? 'Village B' : language === 'mg' ? 'Tanàna B' : 'Village B', value: 25 },
    { name: language === 'fr' ? 'Village C' : language === 'mg' ? 'Tanàna C' : 'Village C', value: 20 },
    { name: language === 'fr' ? 'Village D' : language === 'mg' ? 'Tanàna D' : 'Village D', value: 20 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const stats = [
    { label: t.communities, value: '12', unit: t.communities_unit, icon: <Users /> },
    { label: t.users, value: '324', unit: t.users_unit, icon: <Users /> },
    { label: t.energy, value: '2.4K', unit: t.kwh_unit, icon: <Zap /> },
    { label: t.requests, value: '18', unit: t.requests_unit, icon: <AlertCircle /> },
    { label: t.activeUsers, value: '287', unit: t.users_active_unit, icon: <TrendingUp /> },
    { label: t.systemHealth, value: '98.5', unit: t.health_unit, icon: <BarChart3 /> },
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="bg-slate-800/50 border-emerald-500/30 p-6 flex items-start justify-between"
            >
              <div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-emerald-400 text-xs mt-1">{stat.unit}</p>
              </div>
              <div className="text-emerald-500 opacity-20">{stat.icon}</div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Energy Chart */}
          <Card className="lg:col-span-2 bg-slate-800/50 border-emerald-500/30 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t.overview}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="production" fill="#10b981" />
                <Bar dataKey="consumed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Community Distribution */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">{t.communities}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={communityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {communityDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Reports */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">{t.reportsManagement}</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {language === 'fr'
                ? 'Générez et téléchargez les rapports mensuels et annuels'
                : language === 'mg'
                  ? 'Manorina sy avelao ny tatanisim-pifanampiana'
                  : 'Generate and download monthly and annual reports'}
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <FileText className="w-4 h-4" />
              {t.viewReports}
            </Button>
          </Card>

          {/* Users Management */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">{t.usersManagement}</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {language === 'fr'
                ? 'Gérez les utilisateurs et les permissions'
                : language === 'mg'
                  ? 'Fitantanan\'ny mpampiasa'
                  : 'Manage users and permissions'}
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <Users className="w-4 h-4" />
              {t.manageUsers}
            </Button>
          </Card>

          {/* Communities Management */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <PlusCircle className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">{t.communityManagement}</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {language === 'fr'
                ? 'Créez et gérez les communautés'
                : language === 'mg'
                  ? 'Manorina sy mitantana ny fiaraha-monina'
                  : 'Create and manage communities'}
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <PlusCircle className="w-4 h-4" />
              {language === 'fr' ? 'Ajouter une communauté' : language === 'mg' ? 'Ampidiro fiaraha-monina' : 'Add Community'}
            </Button>
          </Card>

          {/* System Settings */}
          <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">{t.systemSettings}</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {language === 'fr'
                ? 'Configurez les paramètres du système'
                : language === 'mg'
                  ? 'Configurin\'ny rafitra'
                  : 'Configure system parameters'}
            </p>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <Settings className="w-4 h-4" />
              {t.systemConfig}
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
