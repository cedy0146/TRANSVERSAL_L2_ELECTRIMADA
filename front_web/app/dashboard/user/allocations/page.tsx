'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockAllocations = [
  {
    id: 'ALLOC001',
    appliance: 'Réfrigérateur',
    allocated: 5.0,
    consumed: 4.8,
    date: '2024-05-01',
  },
  {
    id: 'ALLOC002',
    appliance: 'Climatisation',
    allocated: 3.0,
    consumed: 2.9,
    date: '2024-05-01',
  },
  {
    id: 'ALLOC003',
    appliance: 'Éclairage',
    allocated: 2.0,
    consumed: 1.5,
    date: '2024-05-01',
  },
];

const chartData = [
  { name: 'Réfrigérateur', allocated: 5, consumed: 4.8 },
  { name: 'Climatisation', allocated: 3, consumed: 2.9 },
  { name: 'Éclairage', allocated: 2, consumed: 1.5 },
];

export default function AllocationsPage() {
  const [language] = useState('fr');

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Mes Allocations d\'Énergie',
      description: 'Visualisez vos allocations d\'énergie et votre consommation',
      allocated: 'Alloué',
      consumed: 'Consommé',
      appliance: 'Appareil',
      date: 'Date',
      efficiency: 'Efficacité',
      chart: 'Allocation vs Consommation',
    },
    mg: {
      title: 'Ny Fiparitahako an\'Angovo',
      description: 'Jereo ny fiparitahako angovo sy ny forotanao',
      allocated: 'Nifanapariahan',
      consumed: 'Nororesina',
      appliance: 'Fitaovana',
      date: 'Daty',
      efficiency: 'Fahampiana',
      chart: 'Fiparitahan versus Forota',
    },
    en: {
      title: 'My Energy Allocations',
      description: 'View your energy allocations and consumption',
      allocated: 'Allocated',
      consumed: 'Consumed',
      appliance: 'Appliance',
      date: 'Date',
      efficiency: 'Efficiency',
      chart: 'Allocation vs Consumption',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="user" language={language} />
      <div className="flex-1">
        <Navigation />
        <div className="p-8">
          <Card className="p-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-gray-600">{t('description')}</p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="text-gray-600 text-sm font-medium">Total Alloué</h3>
              <p className="text-3xl font-bold text-emerald-600">10 kWh</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-gray-600 text-sm font-medium">Total Consommé</h3>
              <p className="text-3xl font-bold text-blue-600">9.2 kWh</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-gray-600 text-sm font-medium">Efficacité</h3>
              <p className="text-3xl font-bold text-purple-600">92%</p>
            </Card>
          </div>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{t('chart')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="allocated" fill="#10b981" />
                <Bar dataKey="consumed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>{t('appliance')}</TableHead>
                  <TableHead>{t('allocated')}</TableHead>
                  <TableHead>{t('consumed')}</TableHead>
                  <TableHead>{t('efficiency')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAllocations.map((alloc) => {
                  const efficiency = ((alloc.consumed / alloc.allocated) * 100).toFixed(1);
                  return (
                    <TableRow key={alloc.id}>
                      <TableCell className="font-medium">{alloc.appliance}</TableCell>
                      <TableCell>{alloc.allocated} kWh</TableCell>
                      <TableCell>{alloc.consumed} kWh</TableCell>
                      <TableCell>
                        <Badge className={parseInt(efficiency) > 95 ? 'bg-red-600' : 'bg-green-600'}>
                          {efficiency}%
                        </Badge>
                      </TableCell>
                      <TableCell>{alloc.date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
