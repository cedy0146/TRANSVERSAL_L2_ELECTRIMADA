'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Save, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [language] = useState('fr');
  const [settings, setSettings] = useState({
    batteryCapacity: 100,
    maxAllocation: 10,
    maintenanceMode: false,
    notificationsEnabled: true,
    backupEnabled: true,
  });

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Paramètres du Système',
      description: 'Configurez les paramètres globaux du système',
      battery: 'Capacité de Batterie (kWh)',
      maxAlloc: 'Allocation Maximale (kWh)',
      maintenance: 'Mode Maintenance',
      notifications: 'Notifications Activées',
      backup: 'Sauvegarde Automatique',
      save: 'Enregistrer',
      danger: 'Zone Dangereuse',
      resetDb: 'Réinitialiser la Base de Données',
      resetDesc: 'Attention: Cette action ne peut pas être annulée',
      backup: 'Sauvegarder les Données',
    },
    mg: {
      title: 'Fametrahana ny Rafitra',
      description: 'Konfigiure ny fametrahana marobe ny rafitra',
      battery: 'Fahampiana an\'ny Bateria (kWh)',
      maxAlloc: 'Fiparitahan Avo Indrindra (kWh)',
      maintenance: 'Fametrahana Fitanana',
      notifications: 'Fampahafantarana Efa Nakatikla',
      backup: 'Savisavina Mandeha ho Eo',
      save: 'Hitahiry',
      danger: 'Faritry Mampahatahotra',
      resetDb: 'Furustra ny Tontolo Angona',
      resetDesc: 'Tampoka: Ity hetsika ity dia tsy azo averina',
    },
    en: {
      title: 'System Settings',
      description: 'Configure global system parameters',
      battery: 'Battery Capacity (kWh)',
      maxAlloc: 'Maximum Allocation (kWh)',
      maintenance: 'Maintenance Mode',
      notifications: 'Notifications Enabled',
      backup: 'Automatic Backup',
      save: 'Save Changes',
      danger: 'Danger Zone',
      resetDb: 'Reset Database',
      resetDesc: 'Warning: This action cannot be undone',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  const handleSave = () => {
    console.log('Settings saved:', settings);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" language={language} />
      <div className="flex-1">
        <Navigation />
        <div className="p-8">
          <Card className="p-6 mb-6">
            <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-gray-600">{t('description')}</p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Paramètres du Système</h2>

              <div className="space-y-6">
                <div>
                  <Label>{t('battery')}</Label>
                  <Input
                    type="number"
                    value={settings.batteryCapacity}
                    onChange={(e) => setSettings({ ...settings, batteryCapacity: parseFloat(e.target.value) })}
                  />
                </div>

                <div>
                  <Label>{t('maxAlloc')}</Label>
                  <Input
                    type="number"
                    value={settings.maxAllocation}
                    onChange={(e) => setSettings({ ...settings, maxAllocation: parseFloat(e.target.value) })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <Label>{t('maintenance')}</Label>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>{t('notifications')}</Label>
                  <Switch
                    checked={settings.notificationsEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, notificationsEnabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>{t('backup')}</Label>
                  <Switch
                    checked={settings.backupEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, backupEnabled: checked })}
                  />
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  {t('save')}
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-red-200">
              <h2 className="text-xl font-bold mb-6 text-red-600">{t('danger')}</h2>

              <div className="space-y-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t('resetDb')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('resetDesc')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex space-x-2">
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Réinitialiser
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>

                <Button className="w-full bg-blue-600 hover:bg-blue-700" variant="default">
                  Télécharger Sauvegarde
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
