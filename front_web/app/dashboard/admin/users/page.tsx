'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Edit2, Plus, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

interface Utilisateur {
  id_utilisateur: string;
  nom: string;
  pin: string;
  role: string;
  id_foyer?: string;
  date_creation?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language] = useState('fr');
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les utilisateurs depuis lAPI
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      // Ici on utilise les foyers comme proxy pour les utilisateurs
      // Dans un vrai systeme, il faudrait un endpoint /api/utilisateurs
      const result = await api.foyers.getAll();
      
      let usersData: Utilisateur[] = [];
      if (result && result.success && Array.isArray(result.data)) {
        usersData = result.data.map((f: any) => ({
          id_utilisateur: f.id_foyer,
          nom: f.nom,
          pin: '',
          role: 'user',
          id_foyer: f.id_foyer,
          date_creation: f.date_creation
        }));
      } else if (Array.isArray(result)) {
        usersData = result.map((f: any) => ({
          id_utilisateur: f.id_foyer,
          nom: f.nom,
          pin: '',
          role: 'user',
          id_foyer: f.id_foyer,
          date_creation: f.date_creation
        }));
      }
      
      setUsers(usersData);
      setError(null);
    } catch (err: any) {
      console.error('Erreur API utilisateurs:', err);
      setError("Impossible de charger les utilisateurs. Verifiez le backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial
  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, [fetchUsers]);

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Gestion des Utilisateurs',
      description: 'Gerez les utilisateurs du systeme',
      addUser: 'Ajouter Utilisateur',
      name: 'Nom',
      email: 'Email',
      role: 'Role',
      status: 'Statut',
      active: 'Actif',
      inactive: 'Inactif',
      user: 'Utilisateur',
      technician: 'Technicien',
      admin: 'Admin',
      joinDate: 'Date adhesion',
      actions: 'Actions',
      edit: 'Editer',
      delete: 'Supprimer',
      search: 'Rechercher...',
    },
    mg: {
      title: 'Fitan-tana ny Mpampiasa',
      description: 'Fitan-tanany ny mpampiasa ny rafitra',
      addUser: 'Hanampy Mpampiasa',
      name: 'Anarana',
      email: 'Email',
      role: 'Andraikitra',
      status: 'Toetry',
      active: 'Miasa',
      inactive: 'Tsy miasa',
      user: 'Mpampiasa',
      technician: 'Mpanao Teknika',
      admin: 'Admin',
      joinDate: 'Daty fikambana',
      actions: 'Hetsika',
      edit: 'Hanolavolava',
      delete: 'Hamafa',
      search: 'Fitadiavana...',
    },
    en: {
      title: 'User Management',
      description: 'Manage system users',
      addUser: 'Add User',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      user: 'User',
      technician: 'Technician',
      admin: 'Admin',
      joinDate: 'Join Date',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search...',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id_utilisateur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Afficher le loader
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar role="admin" language={language} />
        <div className="flex-1">
          <Navigation />
          <div className="p-8 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-500">Chargement des utilisateurs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Afficher lerreur
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar role="admin" language={language} />
        <div className="flex-1">
          <Navigation />
          <div className="p-8">
            <Card className="p-6 border-red-100 bg-red-50 text-red-800">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="font-medium">{error}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" language={language} />
      <div className="flex-1">
        <Navigation />
        <div className="p-8">
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('description')}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('addUser')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('addUser')}</DialogTitle>
                    <DialogDescription>
                      Ajouter un nouvel utilisateur au systeme
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder={t('name')} />
                    <Input placeholder={t('email')} type="email" />
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      {t('addUser')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
          </Card>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('role')}</TableHead>
                  <TableHead>{t('joinDate')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id_utilisateur}>
                      <TableCell className="font-medium">{user.nom}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                          {t(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.date_creation 
                          ? new Date(user.date_creation).toLocaleDateString() 
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-600">
                          {t('active')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      Aucun utilisateur trouve
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
