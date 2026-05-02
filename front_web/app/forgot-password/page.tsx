'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  fr: {
    title: 'Réinitialiser votre mot de passe',
    description: 'Entrez votre adresse e-mail pour réinitialiser votre mot de passe',
    email: 'Adresse e-mail',
    submit: 'Envoyer le lien de réinitialisation',
    backLogin: 'Retour à la connexion',
    success: 'Un lien de réinitialisation a été envoyé à votre e-mail',
  },
  mg: {
    title: 'Furustra ny tontolo fahasalamanao',
    description: 'Solovao ny fanampinao email hanodinkodinana ny tontolo fahasalamanao',
    email: 'Fanampina email',
    submit: 'Alefaso ny loharano furustra',
    backLogin: 'Miverina amin\'ny fidirana',
    success: 'Alefasona ny loharano furustra amin\'ny ianao email',
  },
  en: {
    title: 'Reset your password',
    description: 'Enter your email address to reset your password',
    email: 'Email address',
    submit: 'Send reset link',
    backLogin: 'Back to login',
    success: 'A reset link has been sent to your email',
  },
};

export default function ForgotPasswordPage() {
  const [language, setLanguage] = useState('fr');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = (key: string) => translations[language][key] || key;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-emerald-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-emerald-500/30">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{t('title')}</h1>
            <p className="text-slate-400">{t('description')}</p>
          </div>

          {submitted ? (
            <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4 text-center">
              <p className="text-green-400 font-medium">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  {t('email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t('submit')}
              </Button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-700">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backLogin')}
            </Link>
          </div>

          <div className="mt-4 text-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-700 text-white text-sm px-3 py-2 rounded border border-slate-600"
            >
              <option value="fr">Français</option>
              <option value="mg">Malagasy</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );
}
