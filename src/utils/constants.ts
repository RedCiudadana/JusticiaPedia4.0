import { NavItem, FooterSection, SocialLink } from '../types';
import { Building2, Users, UserCircle, FileText, InfoIcon, Home, Book } from 'lucide-react';

export const SITE_NAME = 'JusticiapedIA';
export const SITE_DESCRIPTION = 'Transparencia en los procesos de designación de autoridades judiciales en Guatemala';

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Instituciones de Justicia',
    href: '/instituciones',
  },
  {
    title: 'Comisiones de Postulación',
    href: '/comisiones',
  },
  {
    title: 'Perfiles de Candidatos',
    href: '/candidatos',
  },
  {
    title: 'Notas de Interés',
    href: '/noticias',
  },
  {
    title: 'Documentación',
    href: '/documentacion',
  },
  {
    title: 'Acerca de',
    href: '/acerca',
  },
];

export const NAV_ICONS = {
  'Inicio': Home,
  'Instituciones de Justicia': Building2,
  'Comisiones de Postulación': Users,
  'Perfiles de Candidatos': UserCircle,
  'Notas de Interés': FileText,
  'Documentación': Book,
  'Acerca de': InfoIcon,
};

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Sobre JusticiapedIA',
    links: [
      { title: '¿Qué es Justiciapedia?', href: '/que-es-justiciapedia' },
      { title: 'Comisiones', href: '/comisiones' },
      { title: 'Aspirantes', href: '/candidatos' },
      { title: 'Noticias', href: '/noticias' },
      { title: 'Aprende', href: '/aprende' },
      { title: 'Datos Abiertos', href: '/recursos/datos' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', href: 'https://www.instagram.com/redxguate/', icon: 'instagram' },
  { platform: 'TikTok', href: 'https://www.tiktok.com/@redxguate', icon: 'tiktok' },
  { platform: 'Twitter', href: 'https://twitter.com/redxguate', icon: 'twitter' },
  { platform: 'YouTube', href: 'https://www.youtube.com/channel/UCQwc62j7beStZYFzwPxBEQg', icon: 'youtube' },
];

export const COLORS = {
  primary: '#2563eb', // Institutional blue
  secondary: '#1e40af',
  accent: '#3b82f6',
  dark: '#1f2937',
  light: '#f9fafb',
  gray: '#6b7280',
};