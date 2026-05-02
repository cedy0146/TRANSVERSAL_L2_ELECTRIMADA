'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Leaf, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [language, setLanguage] = useState('fr');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const content = {
    fr: {
      title: 'Connexion EléctriMada',
      email: 'Email',
      password: 'Mot de passe',
      login: 'Se connecter',
      signup: 'Créer un compte',
      forgotPassword: 'Mot de passe oublié?',
      demoAccounts: 'Comptes de démonstration:',
      admin: 'Admin',
      user: 'Utilisateur',
      technician: 'Technicien',
      noAccount: 'Pas encore de compte?',
      errorInvalid: 'Email ou mot de passe invalide',
    },
    mg: {
      title: 'Miditra EléctriMada',
      email: 'Email',
      password: 'Tenimiafina',
      login: 'Miditra',
      signup: 'Hamorona kaonty',
      forgotPassword: 'Tenimiafina adala?',
      demoAccounts: 'Kaonty fampisehoana:',
      admin: 'Admin',
      user: 'Mpampiasa',
      technician: 'Teknisiana',
      noAccount: 'Tsy manana kaonty akory?',
      errorInvalid: 'Email na tenimiafina diso',
    },
    en: {
      title: 'EléctriMada Login',
      email: 'Email',
      password: 'Password',
      login: 'Sign In',
      signup: 'Create Account',
      forgotPassword: 'Forgot password?',
      demoAccounts: 'Demo Accounts:',
      admin: 'Admin',
      user: 'User',
      technician: 'Technician',
      noAccount: 'Don\'t have an account?',
      errorInvalid: 'Invalid email or password',
    },
  };

  const t = content[language as keyof typeof content];

  const demoAccounts = [
    { email: 'admin@electrimada.mg', password: 'admin123', role: 'admin' },
    { email: 'user@electrimada.mg', password: 'user123', role: 'user' },
    { email: 'tech@electrimada.mg', password: 'tech123', role: 'technician' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulation d'authentification
      const account = demoAccounts.find((acc) => acc.email === email && acc.password === password);
      
      if (account) {
        // Stocker les informations de session
        localStorage.setItem('user', JSON.stringify({ email, role: account.role }));
        
        // Redirection selon le rôle
        if (account.role === 'admin') {
          router.push('/dashboard/admin');
        } else if (account.role === 'technician') {
          router.push('/dashboard/technician');
        } else {
          router.push('/dashboard/user');
        }
      } else {
        setError(t.errorInvalid);
      }
    } catch (err) {
      setError(t.errorInvalid);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
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

        {/* Login Card */}
        <Card className="bg-slate-800/50 border-emerald-500/30 p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">{t.title}</h1>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="bg-slate-700 border-slate-600 text-white pl-10 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-700 border-slate-600 text-white pl-10 placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                />
                {language === 'fr' ? 'Se souvenir de moi' : language === 'mg' ? 'Tsarovy ahy' : 'Remember me'}
              </label>
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                {t.forgotPassword}
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2"
            >
              {loading ? (language === 'fr' ? 'Connexion...' : language === 'mg' ? 'Miditra...' : 'Signing in...') : t.login}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="border-t border-slate-600 pt-6">
            <p className="text-sm text-slate-300 mb-4 font-semibold">{t.demoAccounts}</p>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => {
                const roleNames = {
                  admin: t.admin,
                  user: t.user,
                  technician: t.technician,
                };
                return (
                  <button
                    key={index}
                    onClick={() => fillDemoAccount(account)}
                    className="w-full text-left p-3 rounded bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-emerald-500/50 transition text-sm text-slate-200"
                  >
                    <div className="font-medium text-emerald-400">{roleNames[account.role as keyof typeof roleNames]}</div>
                    <div className="text-xs text-slate-400">{account.email}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-slate-300">
            {t.noAccount}{' '}
            <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
              {t.signup}
            </Link>
          </div>
        </Card>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link href="/landing" className="text-slate-400 hover:text-slate-300 text-sm">
            ← {language === 'fr' ? 'Retour à l\'accueil' : language === 'mg' ? 'Buvy ho amin\'ny pejy homana' : 'Back to home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
