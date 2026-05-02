'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, X, LogOut, Home, BarChart3, Users, Settings } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

const translations: Record<string, Record<string, string>> = {
  fr: {
    dashboard: 'Tableau de Bord',
    profile: 'Profil',
    communities: 'Communautés',
    reports: 'Rapports',
    admin: 'Administration',
    logout: 'Déconnexion',
    login: 'Connexion',
    signup: 'Inscription',
    home: 'Accueil',
  },
  mg: {
    dashboard: 'Taratasy Fehy',
    profile: 'Profila',
    communities: 'Vondron\'izina',
    reports: 'Tatitry',
    admin: 'Fitantanana',
    logout: 'Hiala',
    login: 'Hiditra',
    signup: 'Moantenana',
    home: 'Tahivohivavy',
  },
  en: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    communities: 'Communities',
    reports: 'Reports',
    admin: 'Admin',
    logout: 'Logout',
    login: 'Login',
    signup: 'Sign Up',
    home: 'Home',
  },
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'technician' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('userRole');
    const storedLang = localStorage.getItem('language') || 'fr';
    setLanguage(storedLang);
    if (stored && stored !== 'guest') {
      setIsLoggedIn(true);
      setUserRole(stored as any);
    }
  }, []);

  const t = (key: string) => translations[language][key] || key;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    router.push('/landing');
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/landing" className="flex items-center space-x-2 font-bold text-xl">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-bold">E</span>
            </div>
            <span>EléctriMada</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {isLoggedIn && userRole && (
              <>
                <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                  <Link href={`/dashboard/${userRole}`}>{t('dashboard')}</Link>
                </Button>
                {userRole === 'admin' && (
                  <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                    <Link href="/communities">{t('communities')}</Link>
                  </Button>
                )}
                <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                  <Link href="/reports">{t('reports')}</Link>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                  <Link href="/profile">{t('profile')}</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher language={language} onLanguageChange={setLanguage} />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">
                    {userRole?.toUpperCase()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t('profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex space-x-2">
                <Button variant="ghost" asChild className="text-white hover:bg-white/20">
                  <Link href="/login">{t('login')}</Link>
                </Button>
                <Button asChild className="bg-white text-emerald-600 hover:bg-gray-100">
                  <Link href="/signup">{t('signup')}</Link>
                </Button>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-white/20 rounded"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {isLoggedIn && userRole && (
              <>
                <Button variant="ghost" asChild className="w-full justify-start text-white hover:bg-white/20">
                  <Link href={`/dashboard/${userRole}`}>{t('dashboard')}</Link>
                </Button>
                <Button variant="ghost" asChild className="w-full justify-start text-white hover:bg-white/20">
                  <Link href="/profile">{t('profile')}</Link>
                </Button>
                <Button variant="ghost" asChild className="w-full justify-start text-white hover:bg-white/20">
                  <Link href="/reports">{t('reports')}</Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout')}
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Button variant="ghost" asChild className="w-full justify-start text-white hover:bg-white/20">
                  <Link href="/login">{t('login')}</Link>
                </Button>
                <Button asChild className="w-full justify-start bg-white text-emerald-600 hover:bg-gray-100">
                  <Link href="/signup">{t('signup')}</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
