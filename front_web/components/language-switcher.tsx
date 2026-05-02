'use client';

import { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'en', name: 'English' },
  ];

  const handleLanguageChange = (lang: string) => {
    onLanguageChange(lang);
    localStorage.setItem('language', lang);
  };

  const currentLang = languages.find(l => l.code === language)?.name || 'Français';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <Globe className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? 'bg-emerald-100' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
