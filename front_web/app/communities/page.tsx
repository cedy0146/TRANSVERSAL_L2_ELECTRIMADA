'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Users,
  Zap,
  TrendingUp,
  LogOut,
  PlusCircle,
  MapPin,
  Home,
  AlertCircle,
} from 'lucide-react';

export default function CommunitiesPage() {
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
      communities: 'Gestion des Communautés',
      allCommunities: 'Toutes les communautés',
      addCommunity: 'Ajouter une communauté',
      activeCommunities: 'Communautés actives',
      totalMembers: 'Membres totaux',
      energyProduction: 'Production énergétique',
      systemHealth: 'Santé du système',
      logout: 'Déconnexion',
      members: 'Membres',
      production: 'Production',
      status: 'État',
      active: 'Actif',
      viewDetails: 'Voir les détails',
      solar: 'Panneaux solaires',
      capacity: 'Capacité',
      efficiency: 'Efficacité',
    },
    mg: {
      communities: 'Fitantanan\'ny Fiaraha-monina',
      allCommunities: 'Fiaraha-monina rehetra',
      addCommunity: 'Ampidiro ny fiaraha-monina',
      activeCommunities: 'Fiaraha-monina mavitrika',
      totalMembers: 'Mpikambana rehetra',
      energyProduction: 'Famokarana angovy',
      systemHealth: 'Fahasalaman\'ny rafitra',
      logout: 'Miala',
      members: 'Mpikambana',
      production: 'Famokarana',
      status: 'Toetran\'ny',
      active: 'Mavitrika',
      viewDetails: 'Jereo ny tsinjara',
      solar: 'Panela solar',
      capacity: 'Fahefana',
      efficiency: 'Fampitsarana',
    },
    en: {
      communities: 'Communities Management',
      allCommunities: 'All Communities',
      addCommunity: 'Add Community',
      activeCommunities: 'Active Communities',
      totalMembers: 'Total Members',
      energyProduction: 'Energy Production',
      systemHealth: 'System Health',
      logout: 'Logout',
      members: 'Members',
      production: 'Production',
      status: 'Status',
      active: 'Active',
      viewDetails: 'View Details',
      solar: 'Solar Panels',
      capacity: 'Capacity',
      efficiency: 'Efficiency',
    },
  };

  const t = content[language as keyof typeof content];

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/landing');
  };

  const communities = [
    {
      id: 1,
      name: language === 'fr' ? 'Village A' : language === 'mg' ? 'Tanàna A' : 'Village A',
      members: 45,
      production: 4.5,
      status: 'active',
      location: 'Antananarivo',
      capacity: 12,
      efficiency: 95.5,
    },
    {
      id: 2,
      name: language === 'fr' ? 'Village B' : language === 'mg' ? 'Tanàna B' : 'Village B',
      members: 32,
      production: 3.2,
      status: 'active',
      location: 'Fianarantsoa',
      capacity: 8,
      efficiency: 92.3,
    },
    {
      id: 3,
      name: language === 'fr' ? 'Village C' : language === 'mg' ? 'Tanàna C' : 'Village C',
      members: 28,
      production: 2.8,
      status: 'active',
      location: 'Toliara',
      capacity: 6,
      efficiency: 88.1,
    },
    {
      id: 4,
      name: language === 'fr' ? 'Village D' : language === 'mg' ? 'Tanàna D' : 'Village D',
      members: 38,
      production: 3.8,
      status: 'active',
      location: 'Antsirabe',
      capacity: 10,
      efficiency: 93.8,
    },
  ];

  const stats = [
    {
      label: t.activeCommunities,
      value: communities.length.toString(),
      unit: language === 'fr' ? 'communautés' : language === 'mg' ? 'fiaraha-monina' : 'communities',
      icon: <Home />,
    },
    {
      label: t.totalMembers,
      value: communities.reduce((sum, c) => sum + c.members, 0).toString(),
      unit: t.members,
      icon: <Users />,
    },
    {
      label: t.energyProduction,
      value: (communities.reduce((sum, c) => sum + c.production, 0).toFixed(1)).toString(),
      unit: 'kW',
      icon: <Zap />,
    },
    {
      label: t.systemHealth,
      value: '94.2',
      unit: '%',
      icon: <TrendingUp />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-emerald-500/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">{t.communities}</h1>
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
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="bg-slate-800/50 border-emerald-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <div className="text-emerald-500 opacity-50">{stat.icon}</div>
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-emerald-400 text-xs mt-1">{stat.unit}</p>
            </Card>
          ))}
        </div>

        {/* Add Community Button */}
        <div className="mb-8">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
            <PlusCircle className="w-4 h-4" />
            {t.addCommunity}
          </Button>
        </div>

        {/* Communities List */}
        <div className="space-y-4">
          {communities.map((community) => (
            <Card
              key={community.id}
              className="bg-slate-800/50 border-emerald-500/30 p-6 hover:border-emerald-500/60 transition"
            >
              <div className="grid lg:grid-cols-5 gap-6 items-center">
                {/* Name and Location */}
                <div>
                  <h3 className="text-lg font-semibold text-white">{community.name}</h3>
                  <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    {community.location}
                  </div>
                </div>

                {/* Members */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">{t.members}</p>
                  <p className="text-2xl font-bold text-white">{community.members}</p>
                </div>

                {/* Production */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">{t.production}</p>
                  <p className="text-2xl font-bold text-emerald-400">{community.production}</p>
                  <p className="text-slate-500 text-xs">kW</p>
                </div>

                {/* Efficiency */}
                <div>
                  <p className="text-slate-400 text-sm mb-1">{t.efficiency}</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-white">{community.efficiency}</p>
                    <p className="text-slate-400">%</p>
                  </div>
                </div>

                {/* Action */}
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                  {t.viewDetails}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
