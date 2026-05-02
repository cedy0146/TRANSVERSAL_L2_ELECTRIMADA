'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-20 h-20 text-amber-400" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-300 mb-6">
          Page Not Found
        </h2>
        <p className="text-slate-400 mb-8 max-w-md">
          La page que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/landing">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-slate-800">
              Aller à la connexion
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
