'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', production: 75, consumption: 68, saved: 7 },
  { month: 'Fev', production: 82, consumption: 72, saved: 10 },
  { month: 'Mar', production: 88, consumption: 78, saved: 10 },
  { month: 'Avr', production: 85, consumption: 80, saved: 5 },
  { month: 'Mai', production: 90, consumption: 82, saved: 8 },
];

const consumptionData = [
  { name: 'Réfrigération', value: 35 },
  { name: 'Climatisation', value: 30 },
  { name: 'Éclairage', value: 20 },
  { name: 'Autres', value: 15 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function DetailedReportsPage() {
  const [language] = useState('fr');

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Rapports Détaillés',
      description: 'Analyse complète de vos données énergétiques',
      monthly: 'Production Mensuelle',
      consumption: 'Consommation par Appareil',
      export: 'Exporter PDF',
      filter: 'Filtrer',
      from: 'De',
      to: 'À',
    },
    mg: {},
    en: {
      title: 'Detailed Reports',
      description: 'Complete analysis of your energy data',
      monthly: 'Monthly Production',
      consumption: 'Consumption by Device',
      export: 'Export PDF',
      filter: 'Filter',
      from: 'From',
      to: 'To',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-6xl mx-auto w-full p-8">
        <Card className="p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('description')}</p>
        </Card>

        <Card className="p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <Input type="date" placeholder={t('from')} className="flex-1" />
            <Input type="date" placeholder={t('to')} className="flex-1" />
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Filter className="w-4 h-4 mr-2" />
              {t('filter')}
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t('export')}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{t('monthly')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="production" fill="#10b981" />
                <Bar dataKey="consumption" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">{t('consumption')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={consumptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {consumptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Statistiques Clés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Production Totale</p>
              <p className="text-2xl font-bold text-emerald-600">420 kWh</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Consommation</p>
              <p className="text-2xl font-bold text-blue-600">380 kWh</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Surplus</p>
              <p className="text-2xl font-bold text-green-600">40 kWh</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Efficacité</p>
              <p className="text-2xl font-bold text-purple-600">95%</p>
            </div>
          </div>
        </Card>
      </div>
      <Footer language={language} />
    </div>
  );
}
