'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, Zap, ThermometerIcon, Wifi } from 'lucide-react';

const chartData = [
  { time: '00:00', production: 0, consumption: 2 },
  { time: '04:00', production: 0, consumption: 1.5 },
  { time: '08:00', production: 2.5, consumption: 3 },
  { time: '12:00', production: 4.2, consumption: 5 },
  { time: '16:00', production: 3.8, consumption: 4 },
  { time: '20:00', production: 0, consumption: 3 },
];

const inverterData = [
  { id: 'INV001', status: 'healthy', efficiency: 98, temperature: 45 },
  { id: 'INV002', status: 'healthy', efficiency: 97, temperature: 48 },
  { id: 'INV003', status: 'warning', efficiency: 92, temperature: 62 },
];

export default function MonitoringPage() {
  const [language] = useState('fr');

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Surveillance du Système',
      description: 'Suivi en temps réel de l\'état du système',
      panels: 'Panneaux Solaires',
      inverters: 'Onduleurs',
      battery: 'Batterie',
      healthy: 'Sain',
      warning: 'Attention',
      error: 'Erreur',
      efficiency: 'Efficacité',
      temperature: 'Température',
      production: 'Production',
      consumption: 'Consommation',
    },
    mg: {
      title: 'Fanaraha-maso ny Rafitra',
      description: 'Anaratra ela-ara-niseiko ny toetry ny rafitra',
      panels: 'Panelan\'amorona',
      inverters: 'Raisindrantoha',
      battery: 'Bateria',
      healthy: 'Salama',
      warning: 'Fampahitana',
      error: 'Hadisoana',
      efficiency: 'Fahampiana',
      temperature: 'Hafanana',
      production: 'Famokarana',
      consumption: 'Forota',
    },
    en: {
      title: 'System Monitoring',
      description: 'Real-time system status tracking',
      panels: 'Solar Panels',
      inverters: 'Inverters',
      battery: 'Battery',
      healthy: 'Healthy',
      warning: 'Warning',
      error: 'Error',
      efficiency: 'Efficiency',
      temperature: 'Temperature',
      production: 'Production',
      consumption: 'Consumption',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="technician" language={language} />
      <div className="flex-1">
        <Navigation />
        <div className="p-8">
          <Card className="p-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-gray-600">{t('description')}</p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Production</p>
                  <p className="text-2xl font-bold">4.2 kW</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Consommation</p>
                  <p className="text-2xl font-bold">3.8 kW</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <ThermometerIcon className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Température Max</p>
                  <p className="text-2xl font-bold">62°C</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Wifi className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Statut Système</p>
                  <Badge className="bg-green-600">Actif</Badge>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Production vs Consommation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="production" stroke="#10b981" />
                <Line type="monotone" dataKey="consumption" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                État des Onduleurs
              </h2>
              <div className="space-y-3">
                {inverterData.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{inv.id}</p>
                      <p className="text-sm text-gray-600">Efficacité: {inv.efficiency}% | Temp: {inv.temperature}°C</p>
                    </div>
                    <Badge className={inv.status === 'healthy' ? 'bg-green-600' : 'bg-yellow-600'}>
                      {t(inv.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
