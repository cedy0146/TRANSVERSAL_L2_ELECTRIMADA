'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navigation } from '@/components/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Clock, Eye, Loader2, AlertCircle, Search, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';

interface Demande {
  id_demande: number;
  id_foyer: string;
  nom_foyer?: string;
  energie_demandee: number;
  priorite: 'high' | 'medium' | 'low';
  statut: 'pending' | 'approved' | 'rejected';
  date_demande: string;
  type_appareil?: string;
  plage_horaire?: string;
  raison_refus?: string;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState('fr');
  const [selectedRequest, setSelectedRequest] = useState<Demande | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Traductions
  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Gestion des Demandes',
      description: 'Visualisez et gerez toutes les demandes energie',
      search: 'Rechercher une demande...',
      filter: 'Filtrer',
      status: 'Statut',
      pending: 'En attente',
      approved: 'Approuvee',
      rejected: 'Rejetee',
      approve: 'Approuver',
      reject: 'Rejeter',
      details: 'Details de la demande',
      house: 'Menage',
      energy: 'Energie (kWh)',
      date: 'Date',
      priority: 'Priorite',
      high: 'Haute',
      medium: 'Moyenne',
      low: 'Basse',
      noRequests: 'Aucune demande trouvee',
      confirmApprove: 'Voulez-vous vraiment approuver cette demande?',
      confirmReject: 'Voulez-vous vraiment rejeter cette demande?',
      refresh: 'Actualiser',
    },
    mg: {
      title: 'Fitantanana ny Fangatahan',
      description: 'Jereo sy fitantanany ireo fangatahan angovo',
      search: 'Fitadiavana fangatahana...',
      filter: 'Sivana',
      status: 'Toetry',
      pending: 'Miandry',
      approved: 'Nomena',
      rejected: 'Resena',
      approve: 'Ankavotana',
      reject: 'Hasosoana',
      details: 'Antsipiriany',
      house: 'Trano',
      energy: 'Angovo (kWh)',
      date: 'Daty',
      priority: 'Hajasika',
      high: 'Avo',
      medium: 'Antonony',
      low: 'Kely',
      noRequests: 'Tsy misy fangatahana',
      confirmApprove: 'Tehinao ve ny mandany ity fangatahana ity?',
      confirmReject: 'Tehinao ve ny hasosorana ity fangatahana ity?',
      refresh: 'Hanavao',
    },
    en: {
      title: 'Manage Requests',
      description: 'View and manage all energy requests',
      search: 'Search requests...',
      filter: 'Filter',
      status: 'Status',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      approve: 'Approve',
      reject: 'Reject',
      details: 'Request Details',
      house: 'Household',
      energy: 'Energy (kWh)',
      date: 'Date',
      priority: 'Priority',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      noRequests: 'No requests found',
      confirmApprove: 'Do you want to approve this request?',
      confirmReject: 'Do you want to reject this request?',
      refresh: 'Refresh',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  // Charger les donnees depuis lAPI
  const fetchDemandes = useCallback(async () => {
    try {
      setLoading(true);
      const result = await api.demandes.getAll();
      
      // Transformer les donnees pour l'affichage
      let demandesData: Demande[] = [];
      if (result && result.success && Array.isArray(result.data)) {
        demandesData = result.data.map((d: any) => ({
          id_demande: d.id_demande || d.id_demande,
          id_foyer: d.id_foyer,
          nom_foyer: d.nom_foyer || d.id_foyer,
          energie_demandee: parseFloat(d.energie_demandee) || 0,
          priorite: d.priorite || 'medium',
          statut: d.statut || 'pending',
          date_demande: d.date_demande || new Date().toISOString(),
          type_appareil: d.type_appareil,
          plage_horaire: d.plage_horaire,
          raison_refus: d.raison_refus
        }));
      } else if (Array.isArray(result)) {
        demandesData = result.map((d: any) => ({
          id_demande: d.id_demande || d.id_demande,
          id_foyer: d.id_foyer,
          nom_foyer: d.nom_foyer || d.id_foyer,
          energie_demandee: parseFloat(d.energie_demandee) || 0,
          priorite: d.priorite || 'medium',
          statut: d.statut || 'pending',
          date_demande: d.date_demande || new Date().toISOString(),
          type_appareil: d.type_appareil,
          plage_horaire: d.plage_horaire,
          raison_refus: d.raison_refus
        }));
      }
      
      setRequests(demandesData);
      setError(null);
    } catch (err: any) {
      console.error('Erreur API demandes:', err);
      setError("Impossible de recuperer les demandes. Verifiez le backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial + auto-refresh toutes les 30 secondes
  useEffect(() => {
    fetchDemandes();
    const interval = setInterval(fetchDemandes, 30000);
    return () => clearInterval(interval);
  }, [fetchDemandes]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">{t('approved')}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600">{t('rejected')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600">{t('pending')}</Badge>;
      default:
        return <Badge className="bg-gray-600">{status}</Badge>;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return t('high');
      case 'medium': return t('medium');
      case 'low': return t('low');
      default: return priority;
    }
  };

  // Gerer lapprobation dune demande
  const handleApprove = async (id: number) => {
    if (!confirm(t('confirmApprove'))) return;
    try {
      // appel API pour approuver
      await api.demandes.accept(id);
      // Rafraichir les donnees
      fetchDemandes();
    } catch (err) {
      console.error('Erreur approbation:', err);
    }
  };

  // Gerer le rejet dune demande
  const handleReject = async (id: number) => {
    if (!confirm(t('confirmReject'))) return;
    try {
      // Pour le moment on affiche juste un log
      console.log('Rejet demande:', id);
      // Ici on pourrait appeler une endpoint de rejet
      fetchDemandes();
    } catch (err) {
      console.error('Erreur rejet:', err);
    }
  };

  // Filtrer les demandes
  const filteredRequests = requests.filter(req => 
    req.id_foyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (req.nom_foyer && req.nom_foyer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Afficher le loader
  if (loading && requests.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar role="admin" language={language} />
        <div className="flex-1">
          <Navigation />
          <div className="p-8 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-500">Chargement des demandes...</p>
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
                <Button onClick={fetchDemandes} className="ml-auto bg-emerald-600">
                  {t('refresh')}
                </Button>
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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
                <p className="text-gray-600">{t('description')}</p>
              </div>
              <Button 
                onClick={fetchDemandes} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {t('refresh')}
              </Button>
            </div>
          </Card>

          {/* Barre de recherche */}
          <Card className="p-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>{t('house')}</TableHead>
                  <TableHead>{t('energy')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('priority')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id_demande}>
                      <TableCell className="font-medium">{request.nom_foyer || request.id_foyer}</TableCell>
                      <TableCell>{request.energie_demandee.toFixed(1)} kWh</TableCell>
                      <TableCell>{new Date(request.date_demande).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.priorite === 'high'
                              ? 'destructive'
                              : request.priorite === 'medium'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {getPriorityLabel(request.priorite)}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.statut)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedRequest(request)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t('details')}</DialogTitle>
                                <DialogDescription>
                                  {selectedRequest?.nom_foyer || selectedRequest?.id_foyer}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedRequest && (
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-gray-600">{t('energy')}</p>
                                    <p className="text-lg font-semibold">{selectedRequest.energie_demandee} kWh</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">{t('priority')}</p>
                                    <p className="text-lg font-semibold">{getPriorityLabel(selectedRequest.priorite)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">{t('date')}</p>
                                    <p className="text-lg font-semibold">{new Date(selectedRequest.date_demande).toLocaleString()}</p>
                                  </div>
                                  {selectedRequest.statut === 'pending' && (
                                    <div className="flex space-x-2 pt-4">
                                      <Button 
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApprove(selectedRequest.id_demande)}
                                        disabled={loading}
                                      >
                                        {t('approve')}
                                      </Button>
                                      <Button 
                                        className="flex-1 bg-red-600 hover:bg-red-700"
                                        onClick={() => handleReject(selectedRequest.id_demande)}
                                        disabled={loading}
                                      >
                                        {t('reject')}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          {request.statut === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApprove(request.id_demande)}
                                disabled={loading}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => handleReject(request.id_demande)}
                                disabled={loading}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      {t('noRequests')}
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
