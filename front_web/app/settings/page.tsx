'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Save, Trash2, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [language, setLanguage] = useState('fr');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    darkMode: false,
    twoFactor: false,
  });
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('');

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Paramètres',
      description: 'Gérez vos préférences et votre compte',
      account: 'Paramètres du Compte',
      email: 'Adresse e-mail',
      notifications: 'Notifications',
      emailNotif: 'Notifications par e-mail',
      smsNotif: 'Notifications par SMS',
      weeklyReport: 'Rapport Hebdomadaire',
      privacy: 'Confidentialité',
      darkMode: 'Mode Sombre',
      twoFactor: 'Authentification à Deux Facteurs',
      security: 'Sécurité',
      password: 'Mot de passe',
      changePassword: 'Changer le mot de passe',
      newPassword: 'Nouveau mot de passe',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      danger: 'Zone Dangereuse',
      deleteAccount: 'Supprimer le compte',
      deleteDesc: 'Cette action est permanente et irréversible',
    },
    mg: {},
    en: {
      title: 'Settings',
      description: 'Manage your preferences and account',
      account: 'Account Settings',
      email: 'Email address',
      notifications: 'Notifications',
      emailNotif: 'Email notifications',
      smsNotif: 'SMS notifications',
      weeklyReport: 'Weekly report',
      privacy: 'Privacy',
      darkMode: 'Dark mode',
      twoFactor: 'Two-factor authentication',
      security: 'Security',
      password: 'Password',
      changePassword: 'Change password',
      newPassword: 'New password',
      confirm: 'Confirm',
      save: 'Save changes',
      danger: 'Danger Zone',
      deleteAccount: 'Delete account',
      deleteDesc: 'This action is permanent and irreversible',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-4xl mx-auto w-full p-8">
        <Card className="p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('description')}</p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">{t('account')}</h2>
              <div className="space-y-4">
                <div>
                  <Label>{t('email')}</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Save className="w-4 h-4 mr-2" />
                  {t('save')}
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">{t('notifications')}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t('emailNotif')}</Label>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label>{t('smsNotif')}</Label>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, smsNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label>{t('weeklyReport')}</Label>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, weeklyReports: checked })
                    }
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">{t('security')}</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="w-4 h-4 mr-2" />
                  {t('changePassword')}
                </Button>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label>{t('twoFactor')}</Label>
                  <Switch
                    checked={settings.twoFactor}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, twoFactor: checked })
                    }
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-red-200">
              <h2 className="text-xl font-bold mb-6 text-red-600">{t('danger')}</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t('deleteAccount')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('deleteDesc')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-2">
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Supprimer
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          </div>

          <Card className="p-6 h-fit">
            <h3 className="font-bold mb-4">Langue</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </Card>
        </div>
      </div>
      <Footer language={language} />
    </div>
  );
}
