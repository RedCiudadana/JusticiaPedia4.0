import React, { useState, useMemo } from 'react';
import { Building2, Search, MapPin, Phone, Mail, Globe, Users, Clock, ChevronDown, X, Grid, List, SlidersHorizontal, TrendingUp, ExternalLink, Eye } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import HeroSlider from '../components/ui/HeroSlider';
import { institutions } from '../data/institutions';

const Institutions: React.FC = () => {
  const slides = [
    {
      title: 'Sistema Judicial de Guatemala',
      description: 'Conoce las instituciones que conforman el sistema de justicia y su rol en la sociedad.',
      backgroundColor: '#0d9488',
    },
    {
      title: 'Transparencia y Acceso',
      description: 'Información actualizada sobre el funcionamiento de las instituciones judiciales.',
      backgroundColor: '#0891b2',
    },
    {
      title: 'Participación Ciudadana',
      description: 'Descubre cómo puedes involucrarte en el fortalecimiento del sistema judicial.',
      backgroundColor: '#0369a1',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const institutionTypes = useMemo(() => {
    return [...new Set(institutions.map(inst => inst.type))].filter(Boolean);
  }, []);

  const filteredInstitutions = useMemo(() => {
    let filtered = institutions.filter(institution => {
      const matchesSearch =
        institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (institution.address && institution.address.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = typeFilter === 'all' || institution.type === typeFilter;

      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, typeFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
  };

  const activeFiltersCount = [
    typeFilter !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length;

  const InstitutionCard: React.FC<{ institution: typeof institutions[0] }> = ({ institution }) => (
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
      <div className="h-56 overflow-hidden relative">
        <img
          src={institution.imageUrl}
          alt={institution.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/8111849/pexels-photo-8111849.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-teal-600/90 text-white border border-teal-400/50 backdrop-blur-sm shadow-lg">
            {institution.type}
          </span>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-2 min-h-[3.5rem]">
          {institution.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3 leading-relaxed">{institution.description}</p>

        <div className="space-y-2.5 mb-5 pb-5 border-b border-gray-100">
          {institution.schedule && (
            <div className="flex items-center text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3 flex-shrink-0">
                <Clock size={14} className="text-blue-600" />
              </div>
              <span className="text-xs font-medium truncate">{institution.schedule}</span>
            </div>
          )}
          {institution.phone && (
            <div className="flex items-center text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 flex-shrink-0">
                <Phone size={14} className="text-green-600" />
              </div>
              <span className="text-xs font-medium truncate">{institution.phone}</span>
            </div>
          )}
          {institution.website && (
            <div className="flex items-center text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3 flex-shrink-0">
                <Globe size={14} className="text-purple-600" />
              </div>
              <span className="text-xs font-medium truncate">{institution.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        <Button
          variant="primary"
          onClick={() => window.location.href = `/instituciones/${institution.id}`}
          className="w-full group-hover:bg-teal-700 group-hover:shadow-lg transition-all duration-300"
        >
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );

  const InstitutionListItem: React.FC<{ institution: typeof institutions[0] }> = ({ institution }) => (
    <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-40 h-32 overflow-hidden rounded-xl flex-shrink-0 relative">
            <img
              src={institution.imageUrl}
              alt={institution.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/8111849/pexels-photo-8111849.jpeg';
              }}
            />
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-teal-600/90 text-white border border-teal-400/50 backdrop-blur-sm">
                {institution.type}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">{institution.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{institution.description}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = `/instituciones/${institution.id}`}
                className="flex-shrink-0 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-700"
              >
                <Eye size={14} className="mr-1.5" />
                Ver detalles
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              {institution.schedule && (
                <div className="flex items-center text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center mr-2">
                    <Clock size={12} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">{institution.schedule}</span>
                </div>
              )}
              {institution.phone && (
                <div className="flex items-center text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center mr-2">
                    <Phone size={12} className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium">{institution.phone}</span>
                </div>
              )}
              {institution.email && (
                <div className="flex items-center text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center mr-2">
                    <Mail size={12} className="text-amber-600" />
                  </div>
                  <span className="text-sm font-medium truncate">{institution.email}</span>
                </div>
              )}
              {institution.address && (
                <div className="flex items-center text-gray-700">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center mr-2">
                    <MapPin size={12} className="text-rose-600" />
                  </div>
                  <span className="text-sm font-medium truncate">{institution.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="w-full">
        <HeroSlider slides={slides} />
      </div>

      <PageLayout title="" description="">
        <div className="py-8 space-y-8">
          {/* Search and Quick Filters */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, tipo, descripción o ubicación..."
                  className="w-full px-5 py-4 pl-14 pr-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm transition-all"
                />
                <Search size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant={showFilters ? "primary" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-6 whitespace-nowrap"
                >
                  <SlidersHorizontal size={18} />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-white text-teal-700 rounded-full text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title="Vista de cuadrícula"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 transition-all ${
                      viewMode === 'list'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title="Vista de lista"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Filtros activos:</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors"
                  >
                    Búsqueda: "{searchQuery}"
                    <X size={14} />
                  </button>
                )}
                {typeFilter !== 'all' && (
                  <button
                    onClick={() => setTypeFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Tipo: {typeFilter}
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
                >
                  Limpiar todos
                </button>
              </div>
            )}

            {/* Advanced Filters Panel */}
            {showFilters && (
              <Card className="border-2 border-teal-100 shadow-lg animate-in slide-in-from-top duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="type-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Institución
                      </label>
                      <select
                        id="type-filter"
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      >
                        <option value="all">Todos los tipos</option>
                        {institutionTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="sort-by" className="block text-sm font-semibold text-gray-700 mb-2">
                        Ordenar por
                      </label>
                      <select
                        id="sort-by"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      >
                        <option value="name">Nombre</option>
                        <option value="type">Tipo</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-teal-50 to-blue-50 px-6 py-4 rounded-xl border border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {filteredInstitutions.length} institución{filteredInstitutions.length !== 1 ? 'es' : ''} encontrada{filteredInstitutions.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-600">de {institutions.length} totales</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm font-medium transition-all"
              >
                <option value="name">Nombre</option>
                <option value="type">Tipo</option>
              </select>
            </div>
          </div>

          {/* Institutions Display */}
          {filteredInstitutions.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInstitutions.map((institution) => (
                  <InstitutionCard key={institution.id} institution={institution} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredInstitutions.map((institution) => (
                  <InstitutionListItem key={institution.id} institution={institution} />
                ))}
              </div>
            )
          ) : (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Building2 size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No se encontraron instituciones
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No hay instituciones que coincidan con los criterios de búsqueda. Intenta ajustar los filtros.
                </p>
                <Button
                  variant="primary"
                  onClick={clearFilters}
                  className="mx-auto"
                >
                  Limpiar todos los filtros
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Statistics Section */}
          <div className="mt-16 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white rounded-2xl p-10 md:p-12 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <TrendingUp size={32} className="text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Estadísticas del Sistema Judicial
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {institutions.length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Total de Instituciones</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {institutionTypes.length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Tipos de Instituciones</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {institutions.filter(i => i.website).length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Con Sitio Web</div>
              </div>
            </div>
          </div>

          {/* Institution Types Overview */}
          {institutionTypes.length > 0 && (
            <div className="mt-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 border-2 border-gray-200 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Instituciones por Tipo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {institutionTypes.map(type => {
                  const count = institutions.filter(inst => inst.type === type).length;
                  const percentage = Math.round((count / institutions.length) * 100);
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setTypeFilter(type);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 border-2 border-gray-200 hover:border-teal-500 text-left group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors mb-2 line-clamp-2">{type}</h3>
                          <span className="text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full inline-block">{percentage}%</span>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors ml-2 flex-shrink-0">
                          <Building2 size={18} className="text-teal-600" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500 group-hover:from-teal-600 group-hover:to-cyan-600"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        {count} institución{count !== 1 ? 'es' : ''}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default Institutions;
