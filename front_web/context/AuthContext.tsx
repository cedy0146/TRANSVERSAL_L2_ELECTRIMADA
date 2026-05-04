'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';

interface User {
  id_utilisateur: number;
  nom: string;
  role: string;
  id_foyer?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (nom: string, password: string) => Promise<boolean>;
  register: (nom: string, password: string, id_foyer?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      if (typeof window !== 'undefined') {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          setToken(savedToken);
          // TODO: Verify token with API
        }
      }
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (nom: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authAPI.login(nom, password);
      if (res.success) {
        toast.success('Connexion réussie');
        setUser(res.data!.user);
        setToken(res.data!.token);
        return true;
      } else {
        toast.error(res.error || 'Erreur de connexion');
        return false;
      }
    } catch (error) {
      toast.error('Erreur de connexion');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (nom: string, password: string, id_foyer?: string) => {
    setIsLoading(true);
    try {
      const res = await authAPI.register(nom, password, id_foyer);
      if (res.success) {
        toast.success('Inscription réussie');
        return true;
      } else {
        toast.error(res.error || 'Erreur d\'inscription');
        return false;
      }
    } catch (error) {
      toast.error('Erreur d\'inscription');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setToken(null);
    toast.success('Déconnexion');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
