import {
  Home,
  Bus,
  Trash2,
  BatteryCharging,
  Leaf,
  Wind,
  Route,
  User,
  Trees,
} from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Início' },
  { href: '/dashboard/buses', icon: Bus, label: 'Autocarros' },
  { href: '/dashboard/waste-bins', icon: Trash2, label: 'Lixo' },
  { href: '/dashboard/chargers', icon: BatteryCharging, label: 'Carregadores' },
  { href: '/dashboard/composting', icon: Leaf, label: 'Compostagem' },
  { href: '/dashboard/ecopark', icon: Trees, label: 'Ecoparques' },
  {
    href: '/dashboard/sustainable-routing',
    icon: Route,
    label: 'Rota Sustentável',
  },
  { href: '/dashboard/profile', icon: User, label: 'Perfil' },
];
