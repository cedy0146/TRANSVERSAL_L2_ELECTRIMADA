'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Clock, AlertCircle, Plus } from 'lucide-react';

const mockMaintenance = [
  {
    id: 'M001',
    component: 'Panneaux Solaires',
    type: 'Nettoyage',
    status: 'completed',
    date: '2024-04-28',
    nextDate: '2024-07-28',
  },
  {
    id: 'M002',
    component: 'Onduleur 1',
    type: 'Inspection',
    status: 'scheduled',
    date: '2024-05-05',
    nextDate: '2024-08-05',
  },
  {
    id: 'M003',
    component: 'Batterie',
    type: 'Test Calibration',
    status: 'pending',
    date: '2024-05-10',
    nextDate: '2024-06-10',
  },
];

export default function MaintenancePage() {
  const [language] = useState('fr');
  const [maintenance, setMaintenance] = useState(mockMaintenance);

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Maintenance du Système',
      description: 'Planifiez et suivez la maintenance des composants',
      addMaint: 'Planifier Maintenance',
      component: 'Composant',
      type: 'Type',
      status: 'Statut',
      completed: 'Complétée',
      scheduled: 'Planifiée',
      pending: 'En Attente',
      date: 'Date',
      nextDate: 'Prochaine Date',
      notes: 'Notes',
      schedule: 'Planifier',
    },
    mg: {
      title: 'Fitantanana ny Rafitra',
      description: 'Planifia sy anaratra ny fitanana ny sombim-pifanarahana',
      addMaint: 'Planifia Fitanana',
      component: 'Sombim-pifanarahana',
      type: 'Karazana',
      status: 'Toetry',
      completed: 'Vitsy avela',
      scheduled: 'Planifiée',
      pending: 'Nanatanteraka',
      date: 'Daty',
      nextDate: 'Daty Manaraka',
      notes: 'Marara',
      schedule: 'Planifia',
    },
    en: {
      title: 'System Maintenance',
      description: 'Plan and track component maintenance',
      addMaint: 'Schedule Maintenance',
      component: 'Component',
      type: 'Type',
      status: 'Status',
      completed: 'Completed',
      scheduled: 'Scheduled',
      pending: 'Pending',
      date: 'Date',
      nextDate: 'Next Date',
      notes: 'Notes',
      schedule: 'Schedule',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'scheduled':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="technician" language={language} />
      <div className="flex-1">
        <Navigation />
        <div className="p-8">
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('description')}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('addMaint')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('addMaint')}</DialogTitle>
                    <DialogDescription>
                      Ajouter une nouvelle tâche de maintenance
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>{t('component')}</Label>
                      <Input placeholder="Ex: Panneaux Solaires" />
                    </div>
                    <div>
                      <Label>{t('type')}</Label>
                      <Input placeholder="Ex: Nettoyage" />
                    </div>
                    <div>
                      <Label>{t('date')}</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>{t('notes')}</Label>
                      <Textarea placeholder="Ajouter des notes..." />
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      {t('schedule')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>{t('component')}</TableHead>
                  <TableHead>{t('type')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('nextDate')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenance.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.component}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.nextDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <Badge
                          className={
                            item.status === 'completed'
                              ? 'bg-green-600'
                              : item.status === 'scheduled'
                              ? 'bg-blue-600'
                              : 'bg-yellow-600'
                          }
                        >
                          {t(item.status)}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
