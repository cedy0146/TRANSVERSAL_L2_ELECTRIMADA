'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Zap,
  Users,
  TrendingUp,
  Shield,
  Leaf,
  ArrowRight,
} from 'lucide-react';

export default function LandingPage() {
  const [language, setLanguage] = useState('fr');

  const content = {
    fr: {
      title: 'EléctriMada',
      subtitle: 'Gestion intelligente de l\'énergie solaire communautaire',
      description: 'Optimisez la distribution d\'énergie solaire dans votre communauté avec nos algorithmes intelligents',
      cta: 'Commencer',
      features: [
        {
          icon: <Zap className="w-6 h-6" />,
          title: 'Production Solaire',
          desc: 'Suivi en temps réel de la production solaire',
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Gestion Communautaire',
          desc: 'Allocation équitable de l\'énergie',
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Optimisation Intelligente',
          desc: 'Algorithmes d\'allocation optimisée',
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: 'Sécurité',
          desc: 'Données sécurisées et protégées',
        },
      ],
      benefits: [
        'Réduction des pertes énergétiques',
        'Distribution équitable et transparente',
        'Suivi en temps réel',
        'Prévisions précises',
        'Interface multilingue',
        'Fonctionnement hors ligne',
      ],
    },
    mg: {
      title: 'EléctriMada',
      subtitle: 'Fitantanan mahire ny angovo solar amin\'ny fiaraha-monina',
      description: 'Optimizahy ny fizarana ny angovo solar amin\'ny ianao fiaraha-monina',
      cta: 'Manomboka',
      features: [
        {
          icon: <Zap className="w-6 h-6" />,
          title: 'Famokarana Solar',
          desc: 'Saintsiain\'ny toetoetra ny angovo',
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Fitantanan\'ny Fiaraha-monina',
          desc: 'Fizarana mitovitovy ny angovy',
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Optimizasyon Mahire',
          desc: 'Algorithme mampitohy ny fizarana',
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: 'Fiarovana',
          desc: 'Datas voarindra sy voaaro',
        },
      ],
      benefits: [
        'Fihenan\'ny tsy fahampiana angovy',
        'Fizarana mitovy sy mazava',
        'Saintsiain\'ny toetoetra',
        'Vinavina marina',
        'Interface amin\'ny fiteny marobe',
        'Fiasa tsy mila internet',
      ],
    },
    en: {
      title: 'EléctriMada',
      subtitle: 'Smart community solar energy management',
      description: 'Optimize solar energy distribution in your community with intelligent algorithms',
      cta: 'Get Started',
      features: [
        {
          icon: <Zap className="w-6 h-6" />,
          title: 'Solar Production',
          desc: 'Real-time solar production tracking',
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Community Management',
          desc: 'Fair energy allocation',
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Smart Optimization',
          desc: 'Optimized allocation algorithms',
        },
        {
          icon: <Shield className="w-6 h-6" />,
          title: 'Security',
          desc: 'Secure and protected data',
        },
      ],
      benefits: [
        'Reduce energy losses',
        'Fair and transparent distribution',
        'Real-time monitoring',
        'Accurate forecasting',
        'Multilingual interface',
        'Offline functionality',
      ],
    },
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white">EléctriMada</h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-800 text-white px-3 py-2 rounded border border-emerald-500/30"
              >
                <option value="fr">Français</option>
                <option value="mg">Malagasy</option>
                <option value="en">English</option>
              </select>
              <Link href="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  {language === 'fr' ? 'Connexion' : language === 'mg' ? 'Miditra' : 'Login'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t.title}
            </h2>
            <p className="text-xl text-emerald-300 mb-4 font-semibold">{t.subtitle}</p>
            <p className="text-lg text-slate-300 mb-8">{t.description}</p>
            <Link href="/login">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                {t.cta}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-emerald-500/30">
              <div className="grid grid-cols-2 gap-4">
                {t.features.map((feature, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 rounded-lg p-4 border border-emerald-500/20 hover:border-emerald-500/50 transition"
                  >
                    <div className="text-emerald-400 mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-white mb-12 text-center">
          {language === 'fr'
            ? 'Avantages de notre plateforme'
            : language === 'mg'
              ? 'Tombontsoan\'ny amin\'ny platafoma'
              : 'Platform Benefits'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.benefits.map((benefit, i) => (
            <Card
              key={i}
              className="bg-slate-800/50 border-emerald-500/30 hover:border-emerald-500/60 transition p-6"
            >
              <div className="flex items-start gap-4">
                <Leaf className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <p className="text-white">{benefit}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            {language === 'fr'
              ? 'Prêt à transformer votre communauté?'
              : language === 'mg'
                ? 'Vonona ny hamadika ny ianao fiaraha-monina?'
                : 'Ready to transform your community?'}
          </h3>
          <p className="text-white/90 mb-8">
            {language === 'fr'
              ? 'Rejoignez des centaines de communautés qui optimisent leur énergie'
              : language === 'mg'
                ? 'Miditra amin\'ny fiaraha-monina izay mampitohy ny angovo'
                : 'Join hundreds of communities optimizing their energy'}
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100">
              {t.cta}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-500/20 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-400">
            © 2024 EléctriMada. {language === 'fr' ? 'Tous droits réservés.' : language === 'mg' ? 'Ny fahefampahana rehetra voarindra.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
