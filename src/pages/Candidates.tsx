import React, { useState, useMemo } from 'react';
import { UserCircle, Building2, Filter, Search, Award, BookOpen, ChevronDown, Eye, Star, Calendar, X, Grid, List, SlidersHorizontal, TrendingUp, Users } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import HeroSlider from '../components/ui/HeroSlider';
import { candidates } from '../data/candidates';

const Candidates: React.FC = () => {
  const slides = [
    {
      title: 'Aspirantes al Proceso de Formación',
      description: 'Conoce los perfiles de los candidatos que participan en los procesos de selección judicial en Guatemala.',
      imageUrl: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
    },
    {
      title: 'Transparencia en la Selección',
      description: 'Información completa sobre la trayectoria académica y profesional de cada aspirante.',
      imageUrl: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg',
    },
    {
      title: 'Participación Ciudadana',
      description: 'Accede a datos verificados para una toma de decisiones informada sobre el sistema judicial.',
      imageUrl: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [institutionFilter, setInstitutionFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const institutions = useMemo(() => {
    return [...new Set(candidates.map(candidate => candidate.institution))].filter(Boolean);
  }, []);

  const specializations = useMemo(() => {
    return [...new Set(candidates.map(candidate => candidate.specialization))].filter(Boolean);
  }, []);

  const statuses = useMemo(() => {
    return [...new Set(candidates.map(candidate => candidate.status))];
  }, []);

  const filteredCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.specialization.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesInstitution = institutionFilter === 'all' || candidate.institution === institutionFilter;
      const matchesSpecialization = specializationFilter === 'all' || candidate.specialization === specializationFilter;
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;

      let matchesExperience = true;
      if (experienceFilter !== 'all') {
        const years = candidate.yearsOfExperience;
        switch (experienceFilter) {
          case '0-5':
            matchesExperience = years <= 5;
            break;
          case '6-15':
            matchesExperience = years >= 6 && years <= 15;
            break;
          case '16-25':
            matchesExperience = years >= 16 && years <= 25;
            break;
          case '25+':
            matchesExperience = years > 25;
            break;
        }
      }

      return matchesSearch && matchesInstitution && matchesSpecialization && matchesStatus && matchesExperience;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return b.yearsOfExperience - a.yearsOfExperience;
        case 'institution':
          return a.institution.localeCompare(b.institution);
        case 'specialization':
          return a.specialization.localeCompare(b.specialization);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, institutionFilter, specializationFilter, statusFilter, experienceFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setInstitutionFilter('all');
    setSpecializationFilter('all');
    setStatusFilter('all');
    setExperienceFilter('all');
  };

  const activeFiltersCount = [
    institutionFilter !== 'all',
    specializationFilter !== 'all',
    statusFilter !== 'all',
    experienceFilter !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      case 'Inactivo':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      case 'Retirado':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-justice-100 text-justice-800 border-justice-200';
    }
  };

  const getContextInfo = (candidate: typeof candidates[0]) => {
    if (candidate.election) return candidate.election;
    if (candidate.commission) return candidate.commission;
    if (candidate.institution) return candidate.institution;
    return 'Sin información';
  };

  const CandidateCard: React.FC<{ candidate: typeof candidates[0] }> = ({ candidate }) => (
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-justice-200 hover:border-primary-400">
      <div className="h-80 overflow-hidden relative bg-justice-100">
        <img
          src={candidate.imageUrl}
          alt={candidate.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 leading-tight">
            {candidate.name}
          </h3>
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col p-6 bg-white">
        <div className="space-y-4 flex-1">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-justice-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <Building2 size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-justice-500 uppercase tracking-wide mb-1">
                {candidate.election ? 'Elección' : candidate.commission ? 'Comisión' : 'Institución'}
              </p>
              <p className="text-sm font-bold text-justice-900 line-clamp-2 leading-snug">
                {getContextInfo(candidate)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-justice-500 to-neutral-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <Award size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-justice-500 uppercase tracking-wide mb-1">Puesto</p>
              <p className="text-sm font-bold text-justice-900 line-clamp-2 leading-snug">
                {candidate.role}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => window.location.href = `/candidatos/${candidate.id}`}
          className="w-full mt-6 bg-gradient-to-r from-primary-600 to-justice-600 hover:from-primary-700 hover:to-justice-700 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Ver perfil completo
        </Button>
      </CardContent>
    </Card>
  );

  const CandidateListItem: React.FC<{ candidate: typeof candidates[0] }> = ({ candidate }) => (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-justice-200 hover:border-primary-400 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-48 md:h-64 overflow-hidden rounded-2xl flex-shrink-0 relative bg-justice-100 shadow-lg">
            <img
              src={candidate.imageUrl}
              alt={candidate.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg';
              }}
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-3xl font-bold text-justice-900 mb-3 group-hover:text-primary-700 transition-colors leading-tight">
                  {candidate.name}
                </h3>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = `/candidatos/${candidate.id}`}
                className="flex-shrink-0 bg-gradient-to-r from-primary-600 to-justice-600 hover:from-primary-700 hover:to-justice-700 text-white font-bold shadow-lg hover:shadow-xl"
              >
                Ver perfil completo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-primary-50 to-justice-50 rounded-xl border-2 border-primary-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-justice-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Building2 size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-primary-700 uppercase tracking-wide mb-1">
                    {candidate.election ? 'Elección' : candidate.commission ? 'Comisión' : 'Institución'}
                  </p>
                  <p className="text-sm font-bold text-justice-900 line-clamp-2 leading-snug">
                    {getContextInfo(candidate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-justice-50 to-indigo-50 rounded-xl border-2 border-justice-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-justice-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-justice-700 uppercase tracking-wide mb-1">Puesto</p>
                  <p className="text-sm font-bold text-justice-900 line-clamp-2 leading-snug">
                    {candidate.role}
                  </p>
                </div>
              </div>
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
                  placeholder="Buscar por nombre, cargo, institución o especialización..."
                  className="w-full px-5 py-4 pl-14 pr-4 border-2 border-justice-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition-all"
                />
                <Search size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-justice-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-justice-400 hover:text-justice-600 transition-colors"
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
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-white text-primary-700 rounded-full text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                <div className="flex border-2 border-justice-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-justice-600 hover:bg-justice-50'
                    }`}
                    title="Vista de cuadrícula"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 transition-all ${
                      viewMode === 'list'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-justice-600 hover:bg-justice-50'
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
                <span className="text-sm font-medium text-justice-600">Filtros activos:</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                  >
                    Búsqueda: "{searchQuery}"
                    <X size={14} />
                  </button>
                )}
                {institutionFilter !== 'all' && (
                  <button
                    onClick={() => setInstitutionFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-justice-50 text-justice-700 rounded-lg text-sm font-medium hover:bg-justice-100 transition-colors"
                  >
                    {institutionFilter}
                    <X size={14} />
                  </button>
                )}
                {specializationFilter !== 'all' && (
                  <button
                    onClick={() => setSpecializationFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    {specializationFilter}
                    <X size={14} />
                  </button>
                )}
                {statusFilter !== 'all' && (
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-justice-50 text-justice-700 rounded-lg text-sm font-medium hover:bg-justice-100 transition-colors"
                  >
                    Estado: {statusFilter}
                    <X size={14} />
                  </button>
                )}
                {experienceFilter !== 'all' && (
                  <button
                    onClick={() => setExperienceFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors"
                  >
                    Experiencia: {experienceFilter} años
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-justice-600 hover:text-justice-900 underline"
                >
                  Limpiar todos
                </button>
              </div>
            )}

            {/* Advanced Filters Panel */}
            {showFilters && (
              <Card className="border-2 border-primary-100 shadow-lg animate-in slide-in-from-top duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label htmlFor="institution-filter" className="block text-sm font-semibold text-justice-700 mb-2">
                        Institución
                      </label>
                      <select
                        id="institution-filter"
                        value={institutionFilter}
                        onChange={e => setInstitutionFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-justice-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="all">Todas las instituciones</option>
                        {institutions.map(institution => (
                          <option key={institution} value={institution}>{institution}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="specialization-filter" className="block text-sm font-semibold text-justice-700 mb-2">
                        Especialización
                      </label>
                      <select
                        id="specialization-filter"
                        value={specializationFilter}
                        onChange={e => setSpecializationFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-justice-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="all">Todas las especializaciones</option>
                        {specializations.map(spec => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="status-filter" className="block text-sm font-semibold text-justice-700 mb-2">
                        Estado
                      </label>
                      <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-justice-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="all">Todos los estados</option>
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experience-filter" className="block text-sm font-semibold text-justice-700 mb-2">
                        Años de experiencia
                      </label>
                      <select
                        id="experience-filter"
                        value={experienceFilter}
                        onChange={e => setExperienceFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-justice-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="all">Cualquier experiencia</option>
                        <option value="0-5">0-5 años</option>
                        <option value="6-15">6-15 años</option>
                        <option value="16-25">16-25 años</option>
                        <option value="25+">Más de 25 años</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary-50 to-justice-50 px-6 py-4 rounded-xl border border-primary-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-justice-900">
                  {filteredCandidates.length} aspirante{filteredCandidates.length !== 1 ? 's' : ''} encontrado{filteredCandidates.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-justice-600">de {candidates.length} totales</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort-by" className="text-sm font-medium text-justice-700">
                Ordenar por:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-justice-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-medium transition-all"
              >
                <option value="name">Nombre</option>
                <option value="experience">Experiencia</option>
                <option value="institution">Institución</option>
                <option value="specialization">Especialización</option>
              </select>
            </div>
          </div>

          {/* Candidates Display */}
          {filteredCandidates.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateListItem key={candidate.id} candidate={candidate} />
                ))}
              </div>
            )
          ) : (
            <Card className="border-2 border-dashed border-justice-300">
              <CardContent className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-justice-100 flex items-center justify-center">
                  <UserCircle size={40} className="text-justice-400" />
                </div>
                <h3 className="text-xl font-bold text-justice-900 mb-2">
                  No se encontraron aspirantes
                </h3>
                <p className="text-justice-600 mb-6 max-w-md mx-auto">
                  No hay aspirantes que coincidan con los criterios de búsqueda. Intenta ajustar los filtros.
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
          <div className="mt-16 bg-gradient-to-br from-primary-600 via-justice-600 to-justice-600 text-white rounded-2xl p-10 md:p-12 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <TrendingUp size={32} className="text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Estadísticas de Aspirantes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {candidates.length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Total de Aspirantes</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {candidates.filter(c => c.status === 'Activo').length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Aspirantes Activos</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {Math.round(candidates.reduce((sum, c) => sum + c.yearsOfExperience, 0) / candidates.length) || 0}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Años Promedio de Experiencia</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {specializations.length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Especializaciones</div>
              </div>
            </div>
          </div>

          {/* Specializations Overview */}
          {specializations.length > 0 && (
            <div className="mt-16 bg-gradient-to-br from-white to-justice-50 rounded-2xl p-10 border-2 border-justice-200 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-justice-900 mb-8 text-center">
                Aspirantes por Especialización
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {specializations.map(spec => {
                  const count = candidates.filter(c => c.specialization === spec).length;
                  const percentage = Math.round((count / candidates.length) * 100);
                  return (
                    <button
                      key={spec}
                      onClick={() => {
                        setSpecializationFilter(spec);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 border-2 border-justice-200 hover:border-primary-500 text-left group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-justice-900 group-hover:text-primary-700 transition-colors">{spec}</h3>
                        <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{percentage}%</span>
                      </div>
                      <div className="mb-3">
                        <div className="w-full bg-justice-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-justice-500 h-3 rounded-full transition-all duration-500 group-hover:from-primary-600 group-hover:to-justice-600"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-sm text-justice-600 font-medium">
                        {count} aspirante{count !== 1 ? 's' : ''}
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

export default Candidates;


