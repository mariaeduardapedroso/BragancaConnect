import {
  Home,
  Bus,
  Trash2,
  BatteryCharging,
  Leaf,
  Trees,
  Route,
  User,
} from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Início' },
  { href: '/dashboard/buses', icon: Bus, label: 'Autocarros' },
  { href: '/dashboard/waste-bins', icon: Trash2, label: 'Contentores' },
  { href: '/dashboard/chargers', icon: BatteryCharging, label: 'Carregadores' },
  { href: '/dashboard/composting', icon: Leaf, label: 'Compostagem' },
  { href: '/dashboard/ecopark', icon: Trees, label: 'Ecoparques' },
  {
    href: '/dashboard/sustainable-routing',
    icon: Route,
    label: 'Rotas',
  },
  { href: '/dashboard/profile', icon: User, label: 'Perfil' },
];
