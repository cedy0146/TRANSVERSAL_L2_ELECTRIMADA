'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, User, Bell, Eye } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground mt-2">Gérez vos préférences et votre compte</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profil
          </CardTitle>
          <CardDescription>Modifiez vos informations personnelles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Prénom</label>
              <Input defaultValue="Jean" className="h-10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nom</label>
              <Input defaultValue="Dupont" className="h-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input defaultValue="jean@example.com" type="email" className="h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Téléphone</label>
            <Input defaultValue="+261 32 12 34 56" type="tel" className="h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Adresse</label>
            <Input defaultValue="Antananarivo, Madagascar" className="h-10" />
          </div>
          <Button>Enregistrer les modifications</Button>
        </CardContent>
      </Card>

      {/* Address Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Adresse du compteur</CardTitle>
          <CardDescription>Localisation de votre compteur électrique</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Numéro de compteur</label>
            <Input defaultValue="MG-2024-001234" className="h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Adresse</label>
            <Input defaultValue="123 Rue de la Paix, Antananarivo" className="h-10" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Ville</label>
              <Input defaultValue="Antananarivo" className="h-10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Code postal</label>
              <Input defaultValue="101" className="h-10" />
            </div>
          </div>
          <Button>Mettre à jour</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Sécurité
          </CardTitle>
          <CardDescription>Protégez votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Ancien mot de passe</label>
            <Input type="password" placeholder="••••••••" className="h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nouveau mot de passe</label>
            <Input type="password" placeholder="••••••••" className="h-10" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirmer le mot de passe</label>
            <Input type="password" placeholder="••••••••" className="h-10" />
          </div>
          <Button>Changer le mot de passe</Button>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold text-foreground mb-4">Authentification à deux facteurs</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Ajoutez une couche de sécurité supplémentaire à votre compte
            </p>
            <Button variant="outline">Activer 2FA</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Gérez vos préférences de notification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Alertes de consommation élevée', enabled: true },
            { label: 'Rapports mensuels', enabled: true },
            { label: 'Notifications de maintenance', enabled: true },
            { label: 'Offres et promotions', enabled: false },
            { label: 'Mises à jour produit', enabled: true },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between">
              <label className="font-medium text-foreground">{notif.label}</label>
              <div className="relative w-12 h-6 bg-gray-200 rounded-full cursor-pointer" style={{
                backgroundColor: notif.enabled ? '#10b981' : '#d1d5db'
              }}>
                <div
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"
                  style={{ transform: notif.enabled ? 'translateX(24px)' : 'translateX(0)' }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Données et confidentialité
          </CardTitle>
          <CardDescription>Gérez vos données</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Télécharger mes données
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Exporter mes rapports
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
