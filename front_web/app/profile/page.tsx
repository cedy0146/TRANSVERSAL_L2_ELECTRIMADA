'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, Zap, LogOut, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [language, setLanguage] = useState('fr');
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: 'Jean Dupont',
    email: 'user@electrimada.mg',
    phone: '+261 32 123 4567',
    community: 'Village A',
    address: 'Antananarivo, Madagascar',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const content = {
    fr: {
      profile: 'Mon Profil',
      personalInfo: 'Informations Personnelles',
      editProfile: 'Modifier le profil',
      saveChanges: 'Enregistrer les modifications',
      cancel: 'Annuler',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      community: 'Communauté',
      address: 'Adresse',
      accountSettings: 'Paramètres du Compte',
      changePassword: 'Changer le mot de passe',
      activityHistory: 'Historique d\'Activité',
      energyConsumption: 'Consommation d\'énergie',
      viewMore: 'Voir plus',
      logout: 'Déconnexion',
      saved: 'Profil mis à jour avec succès',
      memberSince: 'Membre depuis',
      energy_unit: 'kWh',
      thisMonth: 'Ce mois',
      lastUpdated: 'Dernière mise à jour',
    },
    mg: {
      profile: 'Ny Profil Ko',
      personalInfo: 'Fampahalàna Amin\'ny Ianao',
      editProfile: 'Hanova ny profil',
      saveChanges: 'Voatsiroka ny fiovana',
      cancel: 'Foanana',
      name: 'Anarana',
      email: 'Email',
      phone: 'Telefônina',
      community: 'Fiaraha-monina',
      address: 'Fotonampoinpoin\'ny',
      accountSettings: 'Rindrambaiko Kaonty',
      changePassword: 'Hanova ny tenimiafina',
      activityHistory: 'Soratra Fampiasana',
      energyConsumption: 'Konsomasion\'angovy',
      viewMore: 'Jereo bebe',
      logout: 'Miala',
      saved: 'Vita ny fiovana profil',
      memberSince: 'Mpikambana hatramin\'ny',
      energy_unit: 'kWh',
      thisMonth: 'Izahebamina',
      lastUpdated: 'Fiovana farany',
    },
    en: {
      profile: 'My Profile',
      personalInfo: 'Personal Information',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      community: 'Community',
      address: 'Address',
      accountSettings: 'Account Settings',
      changePassword: 'Change Password',
      activityHistory: 'Activity History',
      energyConsumption: 'Energy Consumption',
      viewMore: 'View More',
      logout: 'Logout',
      saved: 'Profile updated successfully',
      memberSince: 'Member since',
      energy_unit: 'kWh',
      thisMonth: 'This Month',
      lastUpdated: 'Last Updated',
    },
  };

  const t = content[language as keyof typeof content];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditing(false);
    // Show success message
    setTimeout(() => {
      // Could show a toast notification here
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/landing');
  };

  const activities = [
    {
      type: 'request',
      title: language === 'fr' ? 'Demande d\'énergie soumise' : language === 'mg' ? 'Fangatahana alotra' : 'Energy request submitted',
      time: '2 hours ago',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      type: 'allocation',
      title: language === 'fr' ? 'Énergie allouée' : language === 'mg' ? 'Angovy alotra' : 'Energy allocated',
      time: '5 hours ago',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      type: 'consumption',
      title: language === 'fr' ? 'Consommation mise à jour' : language === 'mg' ? 'Konsomasion update' : 'Consumption updated',
      time: '1 day ago',
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-emerald-500/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">{t.profile}</h1>
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded border border-emerald-500/30"
              >
                <option value="fr">Français</option>
                <option value="mg">Malagasy</option>
                <option value="en">English</option>
              </select>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t.logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="bg-slate-800/50 border-emerald-500/30 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{formData.name}</h2>
                <p className="text-slate-400 mt-1">{formData.email}</p>
                <p className="text-emerald-400 text-sm mt-2">
                  {t.memberSince} 15 Jan 2024
                </p>
              </div>
            </div>
            <Button
              onClick={() => setEditing(!editing)}
              className={`gap-2 ${editing ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-500 hover:bg-emerald-600'} text-white`}
            >
              {editing ? (
                <>
                  <X className="w-4 h-4" />
                  {t.cancel}
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" />
                  {t.editProfile}
                </>
              )}
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" />
                {t.personalInfo}
              </h3>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.name}</label>
                  {editing ? (
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white">{formData.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.email}</label>
                  {editing ? (
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white">{formData.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.phone}</label>
                  {editing ? (
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white">{formData.phone}</p>
                  )}
                </div>

                {/* Community */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.community}</label>
                  {editing ? (
                    <Input
                      type="text"
                      name="community"
                      value={formData.community}
                      onChange={handleChange}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white">{formData.community}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t.address}</label>
                  {editing ? (
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  ) : (
                    <p className="text-white">{formData.address}</p>
                  )}
                </div>

                {editing && (
                  <Button
                    onClick={handleSave}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2 mt-6"
                  >
                    <Save className="w-4 h-4" />
                    {t.saveChanges}
                  </Button>
                )}
              </div>
            </Card>

            {/* Account Settings */}
            <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t.accountSettings}</h3>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {t.changePassword}
              </Button>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Energy Stats */}
            <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t.energyConsumption}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">{t.thisMonth}</p>
                  <p className="text-3xl font-bold text-emerald-400">125.5</p>
                  <p className="text-slate-500 text-xs">{t.energy_unit}</p>
                </div>
              </div>
            </Card>

            {/* Activity History */}
            <Card className="bg-slate-800/50 border-emerald-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t.activityHistory}</h3>
              <div className="space-y-3">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-700 last:border-0">
                    <div className="text-emerald-400">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 text-emerald-400 border-emerald-500/30 hover:bg-slate-700">
                {t.viewMore}
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
