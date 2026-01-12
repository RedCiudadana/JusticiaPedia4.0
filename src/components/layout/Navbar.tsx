import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown, Home, Building2, Users, UserCircle, FileText, Book, InfoIcon, Scale, HandHelping, Database, GraduationCap } from 'lucide-react';
import { NAV_ITEMS, SITE_NAME } from '../../utils/constants';
import Container from '../ui/Container';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';
import Logo from '../../assets/logorednegro.png';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  children?: NavItem[];
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleDropdownToggle = (itemTitle: string) => {
    setActiveDropdown(activeDropdown === itemTitle ? null : itemTitle);
  };

  const getIcon = (title: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      'Inicio': Home,
      'Instituciones de Justicia': Building2,
      'Comisiones de Postulación': Users,
      'Perfiles de Candidatos': UserCircle,
      'Notas de Interés': FileText,
      'Participa': HandHelping,
      'Documentación': Book,
      'Acerca de': InfoIcon,
    };
    return iconMap[title];
  };

  // Enhanced navigation structure with submenus
  const getNavItems = (): NavItem[] => [
    {
      title: 'Inicio',
      href: '/',
      icon: Home,
    },
    {
      title: 'Comisiones',
      href: '/comisiones',
      icon: Users,
    },
    {
      title: 'Aspirantes',
      href: '/candidatos',
      icon: UserCircle,
    },
    {
      title: 'Noticias',
      href: '/noticias',
      icon: FileText,
    },
    {
      title: 'Aprende',
      href: '/aprende',
      icon: GraduationCap,
    },
    {
      title: 'Datos Abiertos',
      href: '/recursos/datos',
      icon: Database,
    },
    {
      title: 'Qué es Justiciapedia',
      href: '/que-es-justiciapedia',
      icon: InfoIcon,
    },
  ];

  const enhancedNavItems = getNavItems();

  const currentPath = window.location.pathname;

  const isActiveLink = (href: string, children?: NavItem[]) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && href !== '#' && currentPath.startsWith(href)) return true;
    if (children) {
      return children.some(child => currentPath.startsWith(child.href));
    }
    return false;
  };

  return (
    <header
      className={`fixed top-[44px] left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2 border-b border-slate-200'
          : 'bg-white shadow-md py-3 border-b border-slate-100'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img src={Logo} alt={SITE_NAME} className="h-8 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {enhancedNavItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const isActive = isActiveLink(item.href, item.children);

              return (
                <div key={item.title} className="relative">
                  {hasChildren ? (
                    <button
                      onClick={() => handleDropdownToggle(item.title)}
                      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive || activeDropdown === item.title
                          ? 'bg-slate-100 text-slate-800 shadow-md border border-slate-200'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-800 hover:shadow-sm'
                      }`}
                    >
                      {Icon && <Icon size={16} className="mr-2" />}
                      {item.title}
                      <ChevronDown 
                        size={18} 
                        className={`ml-1 transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-slate-100 text-slate-800 shadow-md border border-slate-200'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-800 hover:shadow-sm'
                      }`}
                    >
                      {Icon && <Icon size={16} className="mr-2" />}
                      {item.title}
                    </a>
                  )}

                  {/* Dropdown Menu */}
                  {hasChildren && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 z-50 animate-slideDown">
                      {item.children!.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className={`flex items-center px-5 py-3 text-sm font-medium transition-colors ${
                            currentPath.startsWith(child.href)
                              ? 'bg-slate-50 text-slate-800 border-r-4 border-slate-600 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-800'
                          }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="w-2.5 h-2.5 bg-slate-400 rounded-full mr-3 flex-shrink-0"></div>
                          <div>
                            <div className="font-semibold text-slate-800">{child.title}</div>
                            <div className="text-xs text-slate-500 mt-1">
                              {child.title === 'Instituciones de Justicia' && 'Explora las instituciones del sistema'}
                              {child.title === 'Comisiones de Postulación' && 'Procesos de selección activos'}
                              {child.title === 'Perfiles de Candidatos' && 'Candidatos a puestos judiciales'}
                              {child.title === 'Documentación' && 'Guías y recursos'}
                              {child.title === 'Acerca de' && 'Conoce más sobre nosotros'}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <button
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isSearchOpen
                  ? 'bg-slate-100 text-slate-700 shadow-md border border-slate-200'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm'
              }`}
              onClick={toggleSearch}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            <button
              className={`p-2.5 rounded-xl transition-all duration-200 lg:hidden ${
                isMobileMenuOpen
                  ? 'bg-slate-100 text-slate-700 shadow-md border border-slate-200'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-800 hover:shadow-sm'
              }`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-5 pb-5 animate-slideDown border-t border-slate-100 pt-4">
            <SearchBar
              placeholder="Buscar aspirantes, comisiones, noticias..."
              onSearch={(query) => {
                console.log('Searching for:', query);
                if (query.trim()) {
                  window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
                }
              }}
              className="w-full"
            />
          </div>
        )}
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[129px] bg-white z-40 overflow-y-auto animate-slideDown shadow-2xl">
          <Container>
            <div className="py-6 space-y-1">
              {enhancedNavItems.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children && item.children.length > 0;
                const isActive = isActiveLink(item.href, item.children);

                return (
                  <div key={item.title}>
                    {hasChildren ? (
                      <button
                        onClick={() => handleDropdownToggle(item.title)}
                        className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive || activeDropdown === item.title
                            ? 'bg-slate-100 text-slate-800 shadow-md border border-slate-200'
                            : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center">
                          {Icon && <Icon size={20} className="mr-3" />}
                          {item.title}
                        </div>
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.title ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className={`flex items-center py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-slate-100 text-slate-800 shadow-md border border-slate-200'
                            : 'text-slate-800 hover:bg-slate-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {Icon && <Icon size={20} className="mr-3" />}
                        {item.title}
                      </a>
                    )}

                    {/* Mobile Submenu */}
                    {hasChildren && activeDropdown === item.title && (
                      <div className="ml-4 mt-2 space-y-1 animate-slideDown">
                        {item.children!.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className={`flex items-center py-2.5 px-4 rounded-lg text-sm transition-colors ${
                              currentPath.startsWith(child.href)
                                ? 'bg-slate-50 text-slate-800 font-semibold border-l-4 border-slate-600'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="w-2 h-2 bg-slate-400 rounded-full mr-3 flex-shrink-0"></div>
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Search */}
              <div className="pt-6 border-t border-slate-200 mt-6">
                <SearchBar
                  placeholder="Buscar en JusticiapedIA..."
                  onSearch={(query) => {
                    console.log('Mobile search:', query);
                    if (query.trim()) {
                      window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                />
              </div>

              {/* Quick Actions */}
              <div className="pt-6 border-t border-slate-200 mt-6">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4 px-5">
                  Acciones Rápidas
                </h3>
                <div className="space-y-1">
                  <a
                    href="/aprende"
                    className="flex items-center py-3 px-5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <GraduationCap size={16} className="mr-3" />
                    Aprende
                  </a>
                  <a
                    href="/recursos/datos"
                    className="flex items-center py-3 px-5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Database size={16} className="mr-3" />
                    Datos Abiertos
                  </a>
                  <a
                    href="/que-es-justiciapedia"
                    className="flex items-center py-3 px-5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <InfoIcon size={16} className="mr-3" />
                    Qué es Justiciapedia
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;