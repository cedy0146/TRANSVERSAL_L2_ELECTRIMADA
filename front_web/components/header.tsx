import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  language: 'fr' | 'mg' | 'en'
  onLanguageChange: (lang: 'fr' | 'mg' | 'en') => void
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">EléctriMada</h1>
              <p className="text-xs text-slate-500">Gestion Intelligente d&apos;Énergie Solaire</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 hidden sm:inline">Langue:</span>
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLanguageChange('fr')}
                className={`text-xs ${language === 'fr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                FR
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLanguageChange('mg')}
                className={`text-xs ${language === 'mg' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                MG
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLanguageChange('en')}
                className={`text-xs ${language === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
              >
                EN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
