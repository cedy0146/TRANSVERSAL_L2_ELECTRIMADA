'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Zap, TrendingUp, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

interface Member {
  id: string;
  name: string;
  household: string;
  status: string;
  priorite?: string;
  consommation?: number;
}

interface CommunityStats {
  day: string;
  production: number;
  consumption: number;
}

export default function CommunityDetailsPage({ params }: { params: { id: string } }) {
  const [language] = useState('fr');
  const [community, setCommunity] = useState<any>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [chartData, setChartData] = useState<CommunityStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour charger toutes les donnees depuis l'API
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Charger les details de la communaute
      const communityResult = await api.community.getById(params.id);
      if (communityResult && communityResult.success) {
        setCommunity(communityResult.data);
      }
      
      // Charger les membres
      const membersResult = await api.community.getMembers(params.id);
      if (membersResult && membersResult.success) {
        setMembers(membersResult.data || []);
      }
      
      // Charger les statistiques pour le graphique
      const statsResult = await api.community.getStats(params.id);
      if (statsResult && statsResult.success) {
        setChartData(statsResult.data || []);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Erreur lors du chargement:', err);
      setError("Impossible de charger les donnees. Verifiez que le backend est bien lance.");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  // Chargement initial + auto-refresh toutes les 30 secondes
  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Details de la Commune',
      members: 'Membres',
      production: 'Production',
      efficiency: 'Efficacite',
      capacity: 'Capacite',
      location: 'Localisation',
      status: 'Statut',
      active: 'Actif',
      inactive: 'Inactif',
      membersList: 'Liste des Membres',
      household: 'Foyer',
    },
    mg: {
      title: 'Antsipiriany ny Vondronizina',
      members: 'Mpikambana',
      production: 'Famokarana',
      efficiency: 'Fahampiana',
      capacity: 'Fahampiana',
      location: 'Foibeny',
      status: 'Toetry',
      active: 'Miasa',
      inactive: 'Tsy miasa',
      membersList: 'Lisitry ny Mpikambana',
      household: 'Fiaraha-monina',
    },
    en: {
      title: 'Community Details',
      members: 'Members',
      production: 'Production',
      efficiency: 'Efficiency',
      capacity: 'Capacity',
      location: 'Location',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      membersList: 'Members List',
      household: 'Household',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  // Afficher le loading
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar role="admin" language={language} />
        <div className="flex-1">
          <Navigation />
          <div className="p-8 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-500">Chargement des donnees...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Afficher lerreur
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar role="admin" language={language} />
        <div className="flex-1">
          <Navigation />
          <div className="p-8">
            <Card className="p-6 border-red-100 bg-red-50 text-red-800">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="font-medium">{error}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Utiliser les donnees dynamiques ou des valeurs par defaut
  const communityName = community?.name || 'Communaute ElectriMada';
  const communityLocation = community?.location || 'Village Madagascar';
  const membersCount = community?.members || members.length || 0;
  const dailyProduction = community?.dailyProduction || 0;
  const efficiency = community?.efficiency || 0;
  const batteryLevel = community?.batteryLevel || 0;
  const communityStatus = community?.status || 'active';

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" language={language} />
      <div className="flex-1">
        <Navigation />
        <div className="p-8">
          <Card className="p-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">{communityName}</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {communityLocation}
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">{t('members')}</p>
                  <p className="text-2xl font-bold">{membersCount}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">{t('production')}</p>
                  <p className="text-2xl font-bold">{dailyProduction.toFixed(1)} kWh</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">{t('efficiency')}</p>
                  <p className="text-2xl font-bold">{efficiency}%</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">{t('status')}</p>
              <Badge className={communityStatus === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                {t(communityStatus)}
              </Badge>
              <p className="text-xs text-gray-500 mt-1">Batterie: {batteryLevel}%</p>
            </Card>
          </div>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Production vs Consommation</h2>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="production" stroke="#10b981" name="Production" />
                  <Line type="monotone" dataKey="consumption" stroke="#3b82f6" name="Consommation" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-8">Aucune donnee disponible</p>
            )}
          </Card>

          <Card className="overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{t('membersList')}</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>{t('members')}</TableHead>
                  <TableHead>{t('household')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <TableRow key={member.id || index}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.household}</TableCell>
                      <TableCell>
                        <Badge className={member.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                          {member.status === 'active' ? t('active') : t('inactive')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-400">
                      Aucun membre trouve
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
