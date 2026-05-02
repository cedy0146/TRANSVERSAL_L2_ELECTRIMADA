'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  fr: {
    about: 'À Propos',
    contact: 'Contact',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    features: 'Fonctionnalités',
    pricing: 'Tarification',
    blog: 'Blog',
    support: 'Support',
    copyright: '© 2024 EléctriMada. Tous droits réservés.',
    followUs: 'Suivez-nous',
    address: 'Antananarivo, Madagascar',
    email: 'contact@electrimada.mg',
    phone: '+261 20 XX XX XX',
  },
  mg: {
    about: 'Momba Anay',
    contact: 'Fifandraisana',
    privacy: 'Fitsaboana Finoana',
    terms: 'Fepetra',
    features: 'Endri-javatra',
    pricing: 'Vidin\'anjara',
    blog: 'Blog',
    support: 'Fanohanana',
    copyright: '© 2024 EléctriMada. Ny andian\'ajaka rehetra dia tanaka.',
    followUs: 'Araho anay',
    address: 'Antananarivo, Madagasikara',
    email: 'contact@electrimada.mg',
    phone: '+261 20 XX XX XX',
  },
  en: {
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    features: 'Features',
    pricing: 'Pricing',
    blog: 'Blog',
    support: 'Support',
    copyright: '© 2024 EléctriMada. All rights reserved.',
    followUs: 'Follow Us',
    address: 'Antananarivo, Madagascar',
    email: 'contact@electrimada.mg',
    phone: '+261 20 XX XX XX',
  },
};

export function Footer({ language = 'fr' }: { language?: string }) {
  const t = (key: string) => translations[language]?.[key] || key;

  return (
    <footer className="bg-slate-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">E</span>
              </div>
              <span>EléctriMada</span>
            </h3>
            <p className="text-sm text-gray-400">
              Gestion intelligente d\'énergie solaire communautaire
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('about')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-emerald-400">{t('features')}</Link></li>
              <li><Link href="#" className="hover:text-emerald-400">{t('pricing')}</Link></li>
              <li><Link href="#" className="hover:text-emerald-400">{t('blog')}</Link></li>
              <li><Link href="#" className="hover:text-emerald-400">{t('support')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:contact@electrimada.mg" className="hover:text-emerald-400">{t('email')}</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>{t('phone')}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded hover:bg-emerald-600 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded hover:bg-emerald-600 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded hover:bg-emerald-600 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>{t('copyright')}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-emerald-400">{t('privacy')}</Link>
              <Link href="#" className="hover:text-emerald-400">{t('terms')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
