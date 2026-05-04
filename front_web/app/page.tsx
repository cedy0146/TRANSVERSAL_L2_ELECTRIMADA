'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, TrendingDown, BarChart3, Users, Shield, Clock } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">EléctriMada</span>
          </div>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button>S&apos;inscrire</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Maîtrisez votre consommation d&apos;électricité
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            EléctriMada vous aide à surveiller, analyser et réduire votre consommation d&apos;électricité en temps réel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                S&apos;inscrire
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Nos fonctionnalités</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <TrendingDown className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Réduction d&apos;énergie</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Identifiez les appareils énergivores et réduisez votre consommation jusqu&apos;à 30%
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Analyses détaillées</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualisez vos données de consommation avec des graphiques et rapports détaillés
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Suivi en temps réel</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Surveillez votre consommation 24/7 et recevez des alertes instantanées
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Vos données sont protégées avec les standards de sécurité les plus élevés
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Support local</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Équipe de support disponible pour vous aider à Madagascar
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Intégrations faciles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Compatible avec tous les compteurs électriques standards
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">EléctriMada</h3>
              <p className="text-sm text-muted-foreground">
                Solutions d&apos;énergie pour Madagascar
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Fonctionnalités</Link></li>
                <li><Link href="#" className="hover:text-primary">Tarification</Link></li>
                <li><Link href="#" className="hover:text-primary">Sécurité</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">À propos</Link></li>
                <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Confidentialité</Link></li>
                <li><Link href="#" className="hover:text-primary">Conditions</Link></li>
                <li><Link href="#" className="hover:text-primary">CGU</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EléctriMada. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
