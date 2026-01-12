import React, { useState, useMemo } from 'react';
import { Users, Calendar, Search, Filter, FileText, Clock, CheckCircle, AlertCircle, XCircle, ChevronDown, Download, Eye, TrendingUp, Award, Target, X, SlidersHorizontal, BarChart3, PlayCircle, Activity } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import HeroSlider from '../components/ui/HeroSlider';
import SocialShare from '../components/ui/SocialShare';
import { commissions } from '../data/commissions';

const Commissions: React.FC = () => {
  const slides = [
    {
      title: 'Comisiones de Postulación',
      description: 'Seguimiento transparente de los procesos de selección de magistrados y funcionarios judiciales en Guatemala.',
      imageUrl: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg',
    },
    {
      title: 'Procesos de Selección',
      description: 'Información actualizada sobre candidatos, fases y cronogramas de las comisiones activas.',
      imageUrl: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
    },
    {
      title: 'Transparencia en Acción',
      description: 'Accede a documentos, requisitos y resultados de cada proceso de postulación.',
      imageUrl: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg',
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCommission, setExpandedCommission] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const commissionTypes = useMemo(() => {
    return [...new Set(commissions.map(comm => comm.type))].filter(Boolean);
  }, []);

  const commissionStatuses = useMemo(() => {
    return [...new Set(commissions.map(comm => comm.status))].filter(Boolean);
  }, []);

  const filteredCommissions = useMemo(() => {
    let filtered = commissions.filter(commission => {
      const matchesSearch =
        commission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commission.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commission.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || commission.status === statusFilter;
      const matchesType = typeFilter === 'all' || commission.type === typeFilter;

      const isActive = commission.status === 'En proceso' || commission.status === 'Pendiente';
      const matchesActiveFilter =
        activeFilter === 'all' ||
        (activeFilter === 'active' && isActive) ||
        (activeFilter === 'inactive' && !isActive);

      return matchesSearch && matchesStatus && matchesType && matchesActiveFilter;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, typeFilter, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completada':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'En proceso':
        return <AlertCircle size={16} className="text-yellow-600" />;
      case 'Pendiente':
        return <Clock size={16} className="text-gray-600" />;
      case 'Finalizada':
        return <CheckCircle size={16} className="text-blue-600" />;
      default:
        return <XCircle size={16} className="text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En proceso':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Pendiente':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Finalizada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getPhaseProgress = (commission: typeof commissions[0]) => {
    const completedPhases = commission.phases.filter(p => p.status === 'Completada').length;
    return Math.round((completedPhases / commission.phases.length) * 100);
  };

  const getCurrentPhase = (commission: typeof commissions[0]) => {
    return commission.phases.find(p => p.status === 'En proceso') ||
      commission.phases.find(p => p.status === 'Pendiente');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setActiveFilter('all');
  };

  const toggleCommissionDetails = (commissionId: string) => {
    setExpandedCommission(expandedCommission === commissionId ? null : commissionId);
  };

  const activeFiltersCount = [
    statusFilter !== 'all',
    typeFilter !== 'all',
    searchQuery !== '',
    activeFilter !== 'all'
  ].filter(Boolean).length;

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
                  placeholder="Buscar por nombre, propósito, tipo o descripción..."
                  className="w-full px-5 py-4 pl-14 pr-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm transition-all"
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

              <Button
                variant={showFilters ? "primary" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 whitespace-nowrap"
              >
                <SlidersHorizontal size={18} />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-white text-primary-700 rounded-full text-xs font-bold">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Quick Filter Toggle - Active/Inactive */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Estado del Proceso:</span>
              <div className="inline-flex rounded-lg border-2 border-gray-200 p-1 bg-white shadow-sm">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    activeFilter === 'all'
                      ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    activeFilter === 'active'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Activity size={16} className="inline mr-1.5" />
                  Activos
                </button>
                <button
                  onClick={() => setActiveFilter('inactive')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    activeFilter === 'inactive'
                      ? 'bg-gradient-to-r from-gray-600 to-slate-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Clock size={16} className="inline mr-1.5" />
                  Finalizados
                </button>
              </div>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Filtros activos:</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                  >
                    Búsqueda: "{searchQuery}"
                    <X size={14} />
                  </button>
                )}
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                  >
                    {activeFilter === 'active' ? 'Activos' : 'Finalizados'}
                    <X size={14} />
                  </button>
                )}
                {statusFilter !== 'all' && (
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Estado: {statusFilter}
                    <X size={14} />
                  </button>
                )}
                {typeFilter !== 'all' && (
                  <button
                    onClick={() => setTypeFilter('all')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors"
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
              <Card className="border-2 border-primary-100 shadow-lg animate-in slide-in-from-top duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="status-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado
                      </label>
                      <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="all">Todos los estados</option>
                        {commissionStatuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="type-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo
                      </label>
                      <select
                        id="type-filter"
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="all">Todos los tipos</option>
                        {commissionTypes.map(type => (
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
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="date">Fecha</option>
                        <option value="name">Nombre</option>
                        <option value="status">Estado</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary-50 to-blue-50 px-6 py-4 rounded-xl border border-primary-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {filteredCommissions.length} comisión{filteredCommissions.length !== 1 ? 'es' : ''} encontrada{filteredCommissions.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-600">de {commissions.length} totales</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-medium transition-all"
              >
                <option value="date">Fecha</option>
                <option value="name">Nombre</option>
                <option value="status">Estado</option>
              </select>
            </div>
          </div>

          {/* Commissions List */}
          {filteredCommissions.length > 0 ? (
            <div className="space-y-4">
              {filteredCommissions.map((commission) => {
                const progress = getPhaseProgress(commission);
                const currentPhase = getCurrentPhase(commission);
                const isExpanded = expandedCommission === commission.id;
                const isActive = commission.status === 'En proceso' || commission.status === 'Pendiente';

                return (
                  <Card key={commission.id} className={`overflow-hidden transition-all duration-300 border-2 ${isExpanded ? 'shadow-2xl border-primary-400' : 'shadow-md border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}>
                    {/* Compact Preview */}
                    <div
                      className="cursor-pointer"
                      onClick={() => !isExpanded && toggleCommissionDetails(commission.id)}
                    >
                      <div className="flex flex-col md:flex-row gap-6 p-6">
                        {/* Image Section */}
                        {commission.fotoURL && (
                          <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden relative group/img">
                            <img
                              src={commission.fotoURL}
                              alt={commission.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute top-3 left-3">
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${getStatusColor(commission.status)}`}>
                                {getStatusIcon(commission.status)}
                                <span className="ml-1.5">{commission.status}</span>
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                {!commission.fotoURL && (
                                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(commission.status)}`}>
                                    {getStatusIcon(commission.status)}
                                    <span className="ml-1.5">{commission.status}</span>
                                  </span>
                                )}
                                {commission.institution && (
                                  <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200">
                                    {commission.institution}
                                  </span>
                                )}
                                {isActive && (
                                  <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold border border-green-200 animate-pulse">
                                    <Activity size={12} className="mr-1" />
                                    Activo
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 hover:text-primary-700 transition-colors">
                                {commission.name}
                              </h3>
                              {commission.description && !isExpanded && (
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{commission.description}</p>
                              )}
                            </div>
                          </div>

                          {/* Info Grid - Compact */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                              <div className="flex items-center gap-2 mb-1">
                                <Users size={14} className="text-blue-600" />
                                <span className="text-xs font-bold text-blue-600 uppercase">Candidatos</span>
                              </div>
                              <div className="text-2xl font-bold text-blue-700">{commission.candidatesCount}</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                              <div className="flex items-center gap-2 mb-1">
                                <Target size={14} className="text-green-600" />
                                <span className="text-xs font-bold text-green-600 uppercase">Plazas</span>
                              </div>
                              <div className="text-2xl font-bold text-green-700">{commission.positionsAvailable}</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
                              <div className="flex items-center gap-2 mb-1">
                                <Activity size={14} className="text-orange-600" />
                                <span className="text-xs font-bold text-orange-600 uppercase">Fases</span>
                              </div>
                              <div className="text-2xl font-bold text-orange-700">{commission.phases.length}</div>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-3 border border-cyan-200">
                              <div className="flex items-center gap-2 mb-1">
                                <Award size={14} className="text-cyan-600" />
                                <span className="text-xs font-bold text-cyan-600 uppercase">Miembros</span>
                              </div>
                              <div className="text-2xl font-bold text-cyan-700">{commission.members.length}</div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {isActive && currentPhase && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <PlayCircle size={14} className="text-amber-600" />
                                  <span className="text-xs font-bold text-gray-700">Fase actual: {currentPhase.name}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-900">{progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-primary-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCommissionDetails(commission.id);
                              }}
                              className="flex-1 min-w-[120px]"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronDown size={16} className="mr-1.5 rotate-180 transition-transform" />
                                  Ocultar Detalles
                                </>
                              ) : (
                                <>
                                  <Eye size={16} className="mr-1.5" />
                                  Ver Detalles
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/comisiones/${commission.id}`;
                              }}
                              className="flex-1 min-w-[120px]"
                            >
                              <FileText size={16} className="mr-1.5" />
                              Perfil Completo
                            </Button>
                            <div onClick={(e) => e.stopPropagation()}>
                              <SocialShare
                                url={`${window.location.origin}/comisiones/${commission.id}`}
                                title={`${commission.name} - Justiciapedia`}
                                description={commission.description}
                                variant="dropdown"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details Section */}
                    {isExpanded && (
                      <div className="border-t-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                        <div className="p-6 space-y-6">
                          {/* Description - Full */}
                          {commission.description && (
                            <div className="bg-gradient-to-r from-primary-50 via-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-primary-200">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                                  <FileText size={16} className="text-white" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">Descripción</h4>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{commission.description}</p>
                            </div>
                          )}

                          {/* Dates Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {commission.startDate && (
                              <div className="flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-primary-500 flex items-center justify-center flex-shrink-0">
                                  <Calendar size={24} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Fecha de Elección</p>
                                  <p className="text-base font-bold text-gray-900">{formatDate(commission.startDate)}</p>
                                </div>
                              </div>
                            )}
                            {commission.endDate && (
                              <div className="flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                  <Calendar size={24} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Fecha Proyectada</p>
                                  <p className="text-base font-bold text-gray-900">{formatDate(commission.endDate)}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Complete Timeline */}
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center">
                                <Calendar size={20} className="text-white" />
                              </div>
                              <h4 className="font-bold text-gray-900 text-lg">Cronograma Completo del Proceso</h4>
                            </div>
                            <div className="space-y-3">
                              {commission.phases.map((phase, index) => (
                                <div key={index} className="relative pl-8 pb-6 last:pb-0">
                                  <div className="absolute left-0 top-0 flex flex-col items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                                      phase.status === 'Completada' ? 'bg-green-500 border-green-600' :
                                      phase.status === 'En proceso' ? 'bg-yellow-500 border-yellow-600' :
                                      'bg-gray-300 border-gray-400'
                                    }`}>
                                      {getStatusIcon(phase.status)}
                                    </div>
                                    {index < commission.phases.length - 1 && (
                                      <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                                    )}
                                  </div>
                                  <div className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                      <div className="flex-1">
                                        <h5 className="font-bold text-gray-900">{phase.name}</h5>
                                        {phase.description && (
                                          <p className="text-sm text-gray-600 mt-1">{phase.description}</p>
                                        )}
                                      </div>
                                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(phase.status)}`}>
                                        {phase.status}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span className="font-medium">{formatDate(phase.startDate)}</span>
                                      </div>
                                      {phase.endDate && (
                                        <>
                                          <span>→</span>
                                          <div className="flex items-center gap-1">
                                            <CheckCircle size={14} />
                                            <span className="font-medium">{formatDate(phase.endDate)}</span>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Requirements - Complete */}
                          {commission.requirements && commission.requirements.length > 0 && (
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center">
                                  <CheckCircle size={20} className="text-white" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">Requisitos del Proceso</h4>
                              </div>
                              <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                                <ul className="space-y-3">
                                  {commission.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <CheckCircle size={14} className="text-white" />
                                      </div>
                                      <span className="text-sm text-gray-700 font-medium flex-1 leading-relaxed">{requirement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Documents */}
                          {commission.documents && commission.documents.length > 0 && (
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                                  <FileText size={20} className="text-white" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">Documentos Disponibles</h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {commission.documents.map((doc, index) => (
                                  <a
                                    key={index}
                                    href={doc.url}
                                    className="group flex items-center gap-4 p-5 bg-white border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:border-blue-400 hover:shadow-lg transition-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-cyan-200 transition-all">
                                      <FileText size={24} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">{doc.title}</div>
                                      <div className="text-xs text-gray-600 font-medium">{doc.type}</div>
                                    </div>
                                    <Download size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Members */}
                          {commission.members && commission.members.length > 0 && (
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                                  <Users size={20} className="text-white" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">Integrantes de la Comisión</h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {commission.members.map((member, index) => (
                                  <div key={index} className="flex items-center gap-4 p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group">
                                    {member.imageUrl ? (
                                      <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-orange-200 group-hover:border-orange-400 transition-colors"
                                      />
                                    ) : (
                                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center border-2 border-orange-200 group-hover:border-orange-400 transition-colors">
                                        <Users size={24} className="text-orange-600" />
                                      </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <h5 className="font-bold text-gray-900 text-base mb-1">{member.name}</h5>
                                      <p className="text-sm text-orange-700 font-bold mb-0.5">{member.role}</p>
                                      <p className="text-xs text-gray-600 font-medium">{member.institution}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons in Expanded View */}
                          <div className="space-y-3 pt-6 border-t-2 border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                variant="primary"
                                onClick={() => window.location.href = `/comisiones/${commission.id}`}
                                className="flex-1 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                              >
                                <Target size={18} className="mr-2" />
                                Ver Perfil Completo
                              </Button>
                              {commission.candidatesCount > 0 && (
                                <Button
                                  variant="outline"
                                  onClick={() => window.location.href = `/candidatos?commission=${commission.id}`}
                                  className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 transition-all"
                                >
                                  <Award size={18} className="mr-2" />
                                  Ver Candidatos ({commission.candidatesCount})
                                </Button>
                              )}
                            </div>
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border-2 border-gray-200">
                              <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex-1 min-w-[200px]">
                                  <p className="text-sm font-bold text-gray-900 mb-1">Compartir este proceso</p>
                                  <p className="text-xs text-gray-600">Comparte este proceso en redes sociales o copia el enlace directo</p>
                                </div>
                                <SocialShare
                                  url={`${window.location.origin}/comisiones/${commission.id}`}
                                  title={`${commission.name} - Justiciapedia`}
                                  description={commission.description}
                                  variant="buttons"
                                  className="flex-shrink-0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No se encontraron comisiones
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No hay comisiones que coincidan con los criterios de búsqueda. Intenta ajustar los filtros.
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

          {/* Commission Statistics */}
          <div className="mt-16 bg-gradient-to-br from-primary-800 via-primary-900 to-secondary-900 text-white rounded-2xl p-10 md:p-12 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <BarChart3 size={32} className="text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Estadísticas del Sistema de Comisiones
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/25 hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {commissions.length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Total</div>
              </div>
              <div className="bg-green-500/20 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-green-500/30 hover:scale-105 transition-all duration-300 border border-green-400/30">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {commissions.filter(c => c.status === 'En proceso' || c.status === 'Pendiente').length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Activos</div>
              </div>
              <div className="bg-blue-500/20 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 border border-blue-400/30">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {commissions.filter(c => c.status === 'Completada' || c.status === 'Finalizada').length}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Finalizados</div>
              </div>
              <div className="bg-orange-500/20 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-orange-500/30 hover:scale-105 transition-all duration-300 border border-orange-400/30">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {commissions.reduce((sum, c) => sum + c.candidatesCount, 0)}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Candidatos</div>
              </div>
              <div className="bg-cyan-500/20 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-cyan-500/30 hover:scale-105 transition-all duration-300 border border-cyan-400/30">
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  {commissions.reduce((sum, c) => sum + c.positionsAvailable, 0)}
                </div>
                <div className="text-white/90 text-sm md:text-base font-semibold">Plazas</div>
              </div>
            </div>
          </div>

          {/* Active Processes Timeline */}
          {commissions.filter(c => c.status === 'En proceso' || c.status === 'Pendiente').length > 0 && (
            <div className="mt-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 border-2 border-gray-200 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Procesos Activos y Próximos
              </h2>
              <div className="space-y-4">
                {commissions
                  .filter(c => c.status === 'En proceso' || c.status === 'Pendiente')
                  .slice(0, 3)
                  .map((commission) => {
                    const currentPhase = getCurrentPhase(commission);
                    const progress = getPhaseProgress(commission);
                    return (
                      <div key={commission.id} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-gray-900 text-lg flex-1">{commission.name}</h3>
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(commission.status)}`}>
                            {commission.status}
                          </span>
                        </div>
                        {currentPhase && (
                          <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                              <PlayCircle size={16} className="text-amber-600" />
                              <span className="font-bold">Fase actual:</span>
                              <span className="text-amber-700">{currentPhase.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                              <Calendar size={14} className="text-gray-500" />
                              <span>{formatDate(currentPhase.startDate)} - {formatDate(currentPhase.endDate)}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                              <div
                                className="bg-gradient-to-r from-primary-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 min-w-[60px] text-right">
                            {progress}%
                          </span>
                        </div>
                      </div>
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

export default Commissions;
