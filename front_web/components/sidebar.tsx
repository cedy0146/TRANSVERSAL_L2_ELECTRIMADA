'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Home, Users, BarChart3, Settings, Battery, FileText, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const translations: Record<string, Record<string, string>> = {
  fr: {
    overview: 'Aperçu',
    demandes: 'Demandes',
    allocations: 'Allocations',
    users: 'Utilisateurs',
    communities: 'Communautés',
    settings: 'Paramètres',
    reports: 'Rapports',
    monitoring: 'Surveillance',
    maintenance: 'Maintenance',
  },
  mg: {
    overview: 'Fijerena',
    demandes: 'Fangatahan',
    allocations: 'Fiparitahan',
    users: 'Mpampiasa',
    communities: 'Vondron\'izina',
    settings: 'Fametrahana',
    reports: 'Tatitry',
    monitoring: 'Fanaraha-maso',
    maintenance: 'Fitanana',
  },
  en: {
    overview: 'Overview',
    demandes: 'Requests',
    allocations: 'Allocations',
    users: 'Users',
    communities: 'Communities',
    settings: 'Settings',
    reports: 'Reports',
    monitoring: 'Monitoring',
    maintenance: 'Maintenance',
  },
};

interface SidebarProps {
  role: 'admin' | 'user' | 'technician';
  language: string;
}

export function Sidebar({ role, language }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const t = (key: string) => translations[language]?.[key] || key;

  const menuItems: Record<string, Array<{ icon: any; label: string; href: string }>> = {
    admin: [
      { icon: Home, label: t('overview'), href: '/dashboard/admin' },
      { icon: Users, label: t('users'), href: '/dashboard/admin/users' },
      { icon: Users, label: t('communities'), href: '/communities' },
      { icon: FileText, label: t('demandes'), href: '/dashboard/admin/requests' },
      { icon: BarChart3, label: t('reports'), href: '/reports' },
      { icon: Settings, label: t('settings'), href: '/dashboard/admin/settings' },
    ],
    user: [
      { icon: Home, label: t('overview'), href: '/dashboard/user' },
      { icon: FileText, label: t('demandes'), href: '/dashboard/user/requests' },
      { icon: Battery, label: t('allocations'), href: '/dashboard/user/allocations' },
      { icon: BarChart3, label: t('reports'), href: '/reports' },
      { icon: Settings, label: t('settings'), href: '/profile' },
    ],
    technician: [
      { icon: Home, label: t('overview'), href: '/dashboard/technician' },
      { icon: Battery, label: t('monitoring'), href: '/dashboard/technician/monitoring' },
      { icon: FileText, label: t('maintenance'), href: '/dashboard/technician/maintenance' },
      { icon: BarChart3, label: t('reports'), href: '/reports' },
      { icon: Settings, label: t('settings'), href: '/profile' },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col min-h-screen`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h1 className="text-lg font-bold">Menu</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
            >
              <item.icon size={20} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-red-600/20 hover:text-red-400"
        >
          <LogOut size={20} />
          {isOpen && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
