'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2 } from 'lucide-react';

const mockRequests = [
  {
    id: 'MY001',
    energy: 5.0,
    appliance: 'Réfrigérateur',
    status: 'approved',
    date: '2024-05-01',
  },
  {
    id: 'MY002',
    energy: 3.0,
    appliance: 'Climatisation',
    status: 'pending',
    date: '2024-05-02',
  },
  {
    id: 'MY003',
    energy: 2.0,
    appliance: 'Éclairage',
    status: 'approved',
    date: '2024-04-30',
  },
];

export default function UserRequestsPage() {
  const [requests, setRequests] = useState(mockRequests);
  const [language, setLanguage] = useState('fr');
  const [energy, setEnergy] = useState('');
  const [appliance, setAppliance] = useState('');

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Mes Demandes d\'Énergie',
      description: 'Soumettre et gérer vos demandes d\'allocation d\'énergie',
      newRequest: 'Nouvelle Demande',
      appliance: 'Appareil',
      energy: 'Énergie requise (kWh)',
      status: 'Statut',
      pending: 'En attente',
      approved: 'Approuvée',
      submit: 'Soumettre',
      cancel: 'Annuler',
      delete: 'Supprimer',
      date: 'Date',
    },
    mg: {
      title: 'Ny Fangatahako an\'Angovo',
      description: 'Manasumitry sy sitapehina ny fiangavanao fanositra angovo',
      newRequest: 'Fangatahan Vaovao',
      appliance: 'Fitaovana',
      energy: 'Angovo takiana (kWh)',
      status: 'Toetry',
      pending: 'Nanatanteraka',
      approved: 'Efa nankavotana',
      submit: 'Hanasumitry',
      cancel: 'Hanafoana',
      delete: 'Hamafa',
      date: 'Daty',
    },
    en: {
      title: 'My Energy Requests',
      description: 'Submit and manage your energy allocation requests',
      newRequest: 'New Request',
      appliance: 'Appliance',
      energy: 'Energy Required (kWh)',
      status: 'Status',
      pending: 'Pending',
      approved: 'Approved',
      submit: 'Submit',
      cancel: 'Cancel',
      delete: 'Delete',
      date: 'Date',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  const handleSubmit = () => {
    if (energy && appliance) {
      const newRequest = {
        id: `MY${requests.length + 1}`,
        energy: parseFloat(energy),
        appliance,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      };
      setRequests([...requests, newRequest]);
      setEnergy('');
      setAppliance('');
    }
  };

  const handleDelete = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

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
              <h3 className="text-gray-600 text-sm font-medium">{t('approved')}</h3>
              <p className="text-3xl font-bold text-green-600">10 kWh</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-gray-600 text-sm font-medium">{t('pending')}</h3>
              <p className="text-3xl font-bold text-yellow-600">3 kWh</p>
            </Card>
            <Card className="p-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('newRequest')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('newRequest')}</DialogTitle>
                    <DialogDescription>
                      Soumettre une nouvelle demande d\'allocation d\'énergie
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>{t('appliance')}</Label>
                      <Input
                        placeholder="Ex: Réfrigérateur"
                        value={appliance}
                        onChange={(e) => setAppliance(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>{t('energy')}</Label>
                      <Input
                        type="number"
                        placeholder="5.0"
                        value={energy}
                        onChange={(e) => setEnergy(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>
                        {t('submit')}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>{t('appliance')}</TableHead>
                  <TableHead>{t('energy')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.appliance}</TableCell>
                    <TableCell>{request.energy} kWh</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Badge className={request.status === 'approved' ? 'bg-green-600' : 'bg-yellow-600'}>
                        {t(request.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(request.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
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
