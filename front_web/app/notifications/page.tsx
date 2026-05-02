'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Allocation approuvée',
    message: 'Votre demande d\'allocation d\'énergie a été approuvée',
    date: '2024-05-02 14:30',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Batterie faible',
    message: 'Le niveau de batterie est inférieur à 20%',
    date: '2024-05-02 12:15',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Mise à jour du système',
    message: 'Une nouvelle version est disponible',
    date: '2024-05-01 10:00',
    read: true,
  },
];

export default function NotificationsPage() {
  const [language] = useState('fr');
  const [notifications, setNotifications] = useState(mockNotifications);

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Notifications',
      description: 'Gérez vos notifications et alertes',
      markAsRead: 'Marquer comme lue',
      delete: 'Supprimer',
      markAll: 'Marquer tout comme lu',
      deleteAll: 'Supprimer tout',
      noNotifications: 'Aucune notification',
    },
    mg: {
      title: 'Fampahafantarana',
      description: 'Fitantanany ny ianao fampahafantarana',
      markAsRead: 'Marquer isaky izy',
      delete: 'Hamafa',
      markAll: 'Marquer rehetra',
      deleteAll: 'Hamafa ny rehetra',
      noNotifications: 'Tsy nisy fampahafantarana',
    },
    en: {
      title: 'Notifications',
      description: 'Manage your notifications and alerts',
      markAsRead: 'Mark as read',
      delete: 'Delete',
      markAll: 'Mark all as read',
      deleteAll: 'Delete all',
      noNotifications: 'No notifications',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-4xl mx-auto w-full p-8">
        <Card className="p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('description')}</p>
        </Card>

        {notifications.length > 0 && (
          <div className="mb-6 flex gap-2">
            <Button variant="outline" size="sm">
              {t('markAll')}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDeleteAll}>
              {t('deleteAll')}
            </Button>
          </div>
        )}

        {notifications.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-600">{t('noNotifications')}</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`p-4 flex items-start justify-between ${!notif.read ? 'border-emerald-500 border-l-4' : ''}`}
              >
                <div className="flex items-start gap-4 flex-1">
                  {getIcon(notif.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                    <p className="text-gray-600 text-sm">{notif.message}</p>
                    <p className="text-gray-400 text-xs mt-2">{notif.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {!notif.read && <Badge className="bg-emerald-600">Nouveau</Badge>}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(notif.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer language={language} />
    </div>
  );
}
