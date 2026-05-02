'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download, CheckCircle2 } from 'lucide-react';

const mockBillings = [
  {
    id: 'INV001',
    date: '2024-05-01',
    amount: 50000,
    status: 'paid',
    description: 'Service mensuel - Mai 2024',
  },
  {
    id: 'INV002',
    date: '2024-04-01',
    amount: 50000,
    status: 'paid',
    description: 'Service mensuel - Avril 2024',
  },
  {
    id: 'INV003',
    date: '2024-03-01',
    amount: 50000,
    status: 'paid',
    description: 'Service mensuel - Mars 2024',
  },
];

export default function BillingPage() {
  const [language] = useState('fr');

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Facturation & Paiements',
      description: 'Gérez vos factures et votre compte de paiement',
      balance: 'Solde Actuel',
      paid: 'Payée',
      pending: 'En attente',
      invoice: 'Facture',
      date: 'Date',
      amount: 'Montant',
      status: 'Statut',
      actions: 'Actions',
      download: 'Télécharger',
      totalPaid: 'Total Payé',
      paymentMethod: 'Méthode de Paiement',
      addMethod: 'Ajouter une méthode',
    },
    mg: {
      title: 'Faosim-bola sy Fandoa',
      description: 'Fitantanany ny ianao faosim-bola',
      balance: 'Saldo Ankehitriny',
      paid: 'Voafindra',
      pending: 'Nanatanteraka',
      invoice: 'Faosim-bola',
      date: 'Daty',
      amount: 'Isan\'ny dola',
      status: 'Toetry',
      actions: 'Hetsika',
      download: 'Alefaso',
      totalPaid: 'Total Voafindra',
      paymentMethod: 'Fomban\'ny Fandoa',
      addMethod: 'Hanampy fombam-pifanam-boaboana',
    },
    en: {
      title: 'Billing & Payments',
      description: 'Manage your invoices and payment account',
      balance: 'Current Balance',
      paid: 'Paid',
      pending: 'Pending',
      invoice: 'Invoice',
      date: 'Date',
      amount: 'Amount',
      status: 'Status',
      actions: 'Actions',
      download: 'Download',
      totalPaid: 'Total Paid',
      paymentMethod: 'Payment Method',
      addMethod: 'Add payment method',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{t('balance')}</h3>
            <p className="text-3xl font-bold text-emerald-600">0 Ar</p>
            <p className="text-sm text-gray-600 mt-2">Aucune dette</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{t('totalPaid')}</h3>
            <p className="text-3xl font-bold text-blue-600">150 000 Ar</p>
            <p className="text-sm text-gray-600 mt-2">3 paiements</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{t('paymentMethod')}</h3>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-medium">MVOLA</p>
            </div>
            <Button size="sm" variant="outline" className="mt-4 w-full">
              {t('addMethod')}
            </Button>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>{t('invoice')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('description')}</TableHead>
                <TableHead>{t('amount')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBillings.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>{bill.amount.toLocaleString()} Ar</TableCell>
                  <TableCell>
                    <Badge className="bg-green-600 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      {t('paid')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4 mr-2" />
                      {t('download')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      <Footer language={language} />
    </div>
  );
}
