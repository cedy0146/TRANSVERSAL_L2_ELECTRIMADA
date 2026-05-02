'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle } from 'lucide-react';
import { api } from '@/lib/api';

const faqItems = [
  {
    question: 'Comment fonctionne le système d\'allocation d\'énergie?',
    answer: 'Notre système utilise un algorithme d\'optimisation Knapsack pour allouer équitablement l\'énergie disponible entre les ménages selon leurs priorités et besoins.',
  },
  {
    question: 'Qu\'est-ce qu\'une demande d\'allocation d\'énergie?',
    answer: 'Une demande d\'allocation est une requête que vous soumettez pour signaler votre besoin en énergie. Notre système évalue puis alloue la quantité appropriée.',
  },
  {
    question: 'Comment puis-je suivre ma consommation énergétique?',
    answer: 'Vous pouvez suivre votre consommation en temps réel dans votre tableau de bord personnel, avec des graphiques détaillés par appareil.',
  },
  {
    question: 'Que faire si je ne reçois pas mon allocation?',
    answer: 'Vérifiez d\'abord votre demande dans l\'application. Si elle est en attente, attendez l\'approbation. Sinon, contactez l\'administrateur de votre communauté.',
  },
  {
    question: 'Comment puis-je modifier mon mot de passe?',
    answer: 'Allez dans "Profil" > "Paramètres" > "Sécurité" pour modifier votre mot de passe en toute sécurité.',
  },
  {
    question: 'Quel est le délai de réponse du support?',
    answer: 'Notre équipe support répond généralement dans les 24 heures. Vous pouvez nous contacter via l\'email ou le formulaire de contact.',
  },
];

export default function HelpPage() {
  const [language] = useState('fr');
  const [searchTerm, setSearchTerm] = useState('');
  const [backendStatus, setBackendStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    api.batteries.getActive()
      .then(() => setBackendStatus('online'))
      .catch((err) => {
        console.error('Erreur de connexion au backend:', err);
        setBackendStatus('offline');
      });
  }, []);

  const translations: Record<string, Record<string, string>> = {
    fr: {
      title: 'Centre d\'Aide',
      description: 'Trouvez les réponses à vos questions',
      search: 'Rechercher dans les FAQ...',
      faq: 'Questions Fréquemment Posées',
      contact: 'Besoin d\'aide supplémentaire?',
      contactDesc: 'Contactez notre équipe support à support@electrimada.mg',
    },
    mg: {},
    en: {
      title: 'Help Center',
      description: 'Find answers to your questions',
      search: 'Search FAQs...',
      faq: 'Frequently Asked Questions',
      contact: 'Need more help?',
      contactDesc: 'Contact our support team at support@electrimada.mg',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  const filteredItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      <div className="flex-1 max-w-4xl mx-auto w-full p-8">
        <Card className="p-8 text-center mb-8">
          <HelpCircle className="w-12 h-12 mx-auto text-emerald-600 mb-4" />
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('description')}</p>
          <div className="mt-4 flex justify-center items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              backendStatus === 'online' ? 'bg-emerald-500' : 
              backendStatus === 'offline' ? 'bg-red-500' : 'bg-gray-400 animate-pulse'
            }`} />
            <span className="text-sm font-medium text-gray-500">
              {backendStatus === 'online' ? 'Système en ligne' : 
               backendStatus === 'offline' ? 'Mode hors-ligne' : 'Vérification du système...'}
            </span>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">{t('faq')}</h2>
          <Accordion type="single" collapsible>
            {filteredItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="hover:text-emerald-600">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <Card className="p-8 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-center">
          <h3 className="text-xl font-bold mb-2">{t('contact')}</h3>
          <p>{t('contactDesc')}</p>
        </Card>
      </div>
      <Footer language={language} />
    </div>
  );
}
