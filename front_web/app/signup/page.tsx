'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Leaf, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [language, setLanguage] = useState('fr');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    community: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const content = {
    fr: {
      title: 'Créer un Compte EléctriMada',
      fullName: 'Nom complet',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      community: 'Sélectionner une communauté',
      selectCommunity: 'Sélectionner...',
      signup: 'Créer un compte',
      haveAccount: 'Déjà un compte?',
      login: 'Se connecter',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      accountCreated: 'Compte créé avec succès! Redirection...',
      passwordStrength: 'Le mot de passe doit contenir au moins 8 caractères',
      terms: 'J\'accepte les conditions d\'utilisation',
      backHome: '← Retour à l\'accueil',
    },
    mg: {
      title: 'Hamorona Kaonty EléctriMada',
      fullName: 'Anarana Feno',
      email: 'Email',
      password: 'Tenimiafina',
      confirmPassword: 'Hamaritra ny tenimiafina',
      community: 'Pisafidiana ny fiaraha-monina',
      selectCommunity: 'Pisafidiana...',
      signup: 'Hamorona kaonty',
      haveAccount: 'Manana kaonty?',
      login: 'Miditra',
      passwordMismatch: 'Tsy mitovy ny tenimiafina',
      accountCreated: 'Vita ny famoronana kaonty! Fanondroana...',
      passwordStrength: 'Tsy karatra kely 8 karakatra ny tenimiafina',
      terms: 'Manaiky ny fepetra',
      backHome: '← Buvy ho amin\'ny pejy homana',
    },
    en: {
      title: 'Create EléctriMada Account',
      fullName: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      community: 'Select Community',
      selectCommunity: 'Select...',
      signup: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Sign In',
      passwordMismatch: 'Passwords do not match',
      accountCreated: 'Account created successfully! Redirecting...',
      passwordStrength: 'Password must be at least 8 characters',
      terms: 'I agree to the terms and conditions',
      backHome: '← Back to home',
    },
  };

  const t = content[language as keyof typeof content];

  const communities = [
    { id: 1, name: language === 'fr' ? 'Village A' : language === 'mg' ? 'Tanàna A' : 'Village A' },
    { id: 2, name: language === 'fr' ? 'Village B' : language === 'mg' ? 'Tanàna B' : 'Village B' },
    { id: 3, name: language === 'fr' ? 'Village C' : language === 'mg' ? 'Tanàna C' : 'Village C' },
    { id: 4, name: language === 'fr' ? 'Village D' : language === 'mg' ? 'Tanàna D' : 'Village D' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password || !formData.community) {
        setError(language === 'fr' ? 'Tous les champs sont requis' : language === 'mg' ? 'Lahatsoratra rehetra ilaina' : 'All fields are required');
        setLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        setError(t.passwordStrength);
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError(t.passwordMismatch);
        setLoading(false);
        return;
      }

      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setFormData({ name: '', email: '', password: '', confirmPassword: '', community: '' });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(language === 'fr' ? 'Erreur lors de la création du compte' : language === 'mg' ? 'Baraka ny famoronana kaonty' : 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-4">
      {/* Language Selector */}
      <div className="absolute top-4 right-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-800 text-white px-3 py-2 rounded border border-emerald-500/30"
        >
          <option value="fr">Français</option>
          <option value="mg">Malagasy</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-white">
            <Leaf className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold">EléctriMada</span>
          </div>
        </div>

        {/* Signup Card */}
        <Card className="bg-slate-800/50 border-emerald-500/30 p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">{t.title}</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-200 text-sm">{t.accountCreated}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.fullName}</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className="bg-slate-700 border-slate-600 text-white pl-10 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  className="bg-slate-700 border-slate-600 text-white pl-10 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Community */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.community}</label>
              <select
                name="community"
                value={formData.community}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded placeholder-slate-500"
                required
              >
                <option value="">{t.selectCommunity}</option>
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-slate-700 border-slate-600 text-white pl-10 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.confirmPassword}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-slate-700 border-slate-600 text-white pl-10 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                required
              />
              <span className="text-sm">{t.terms}</span>
            </label>

            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2"
            >
              {loading ? (language === 'fr' ? 'Création en cours...' : language === 'mg' ? 'Famoronana...' : 'Creating...') : t.signup}
            </Button>
          </form>

          <div className="text-center text-sm text-slate-300">
            {t.haveAccount}{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              {t.login}
            </Link>
          </div>
        </Card>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/landing" className="text-slate-400 hover:text-slate-300 text-sm">
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
