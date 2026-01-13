import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, FileText, Clock, CheckCircle, AlertCircle, XCircle, ArrowLeft, Download, Eye, MapPin, Phone, Mail, Globe, Award, Target, BookOpen, TrendingUp, Info } from 'lucide-react';
import ProfileLayout from '../components/layout/ProfileLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';
import SocialShare from '../components/ui/SocialShare';
import { commissions } from '../data/commissions';
import { candidates } from '../data/candidates';

const CommissionProfile: React.FC = () => {
  const { commissionId } = useParams<{ commissionId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [commissionId]);

  const commission = commissions.find(c => c.id === commissionId);

  if (isLoading) {
    return <Loading fullScreen text="Cargando información de la comisión..." />;
  }

  if (!commission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users size={64} className="mx-auto text-justice-400 mb-4" />
          <h1 className="text-2xl font-bold text-justice-900 mb-2">Comisión no encontrada</h1>
          <p className="text-justice-600 mb-4">La comisión que buscas no existe o ha sido removida.</p>
          <Link
            to="/comisiones"
            className="inline-flex items-center px-4 py-2 bg-justice-600 text-white rounded-md hover:bg-justice-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Ver todas las comisiones
          </Link>
        </div>
      </div>
    );
  }

  const commissionCandidates = candidates.filter(c => c.commissionId === commission.id);

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
        return <CheckCircle size={16} className="text-justice-600" />;
      case 'En proceso':
        return <AlertCircle size={16} className="text-justice-600" />;
      case 'Pendiente':
        return <Clock size={16} className="text-justice-600" />;
      case 'Finalizada':
        return <CheckCircle size={16} className="text-justice-600" />;
      default:
        return <XCircle size={16} className="text-justice-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completada':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      case 'En proceso':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      case 'Pendiente':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      case 'Finalizada':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      default:
        return 'bg-justice-100 text-justice-800 border-justice-200';
    }
  };

  const getPhaseProgress = () => {
    const completedPhases = commission.phases.filter(p => p.status === 'Completada').length;
    return Math.round((completedPhases / commission.phases.length) * 100);
  };

  const getCurrentPhase = () => {
    return commission.phases.find(p => p.status === 'En proceso') ||
           commission.phases.find(p => p.status === 'Pendiente');
  };

  const getNextMilestone = () => {
    const currentDate = new Date();
    const upcomingPhases = commission.phases.filter(p => {
      const phaseDate = new Date(p.startDate);
      return phaseDate > currentDate && p.status === 'Pendiente';
    });
    return upcomingPhases.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
  };

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: Target },
    { id: 'timeline', label: 'Cronograma', icon: Calendar },
    { id: 'members', label: 'Integrantes', icon: Users },
    { id: 'candidates', label: 'Candidatos', icon: Award },
    { id: 'documents', label: 'Documentos', icon: FileText },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-justice-50 to-justice-100 border-justice-200">
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-3 text-justice-600" size={32} />
                  <div className="text-2xl font-bold text-justice-700 mb-1">{commission.candidatesCount}</div>
                  <div className="text-justice-600 text-sm font-medium">Candidatos</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-justice-50 to-justice-100 border-justice-200">
                <CardContent className="p-6 text-center">
                  <Award className="mx-auto mb-3 text-justice-600" size={32} />
                  <div className="text-2xl font-bold text-justice-700 mb-1">{commission.positionsAvailable}</div>
                  <div className="text-justice-600 text-sm font-medium">Plazas</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                <CardContent className="p-6 text-center">
                  <Calendar className="mx-auto mb-3 text-indigo-600" size={32} />
                  <div className="text-2xl font-bold text-indigo-700 mb-1">{commission.phases.length}</div>
                  <div className="text-indigo-600 text-sm font-medium">Fases</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="mx-auto mb-3 text-amber-600" size={32} />
                  <div className="text-2xl font-bold text-amber-700 mb-1">{getPhaseProgress()}%</div>
                  <div className="text-amber-600 text-sm font-medium">Progreso</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-l-4 border-l-justice-600">
              <CardHeader>
                <h3 className="text-xl font-bold text-justice-900 flex items-center">
                  <TrendingUp size={24} className="mr-3 text-justice-600" />
                  Estado Actual del Proceso
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-justice-50 to-slate-50 rounded-lg border">
                    <div>
                      <h4 className="font-bold text-justice-900 mb-1">Estado General</h4>
                      <p className="text-justice-600 text-sm">{commission.description}</p>
                    </div>
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(commission.status)}`}>
                      {getStatusIcon(commission.status)}
                      <span className="ml-2">{commission.status}</span>
                    </span>
                  </div>

                  {getCurrentPhase() && (
                    <div className="p-5 bg-gradient-to-r from-justice-50 to-indigo-50 rounded-lg border-2 border-justice-200">
                      <h4 className="font-bold text-justice-900 mb-2 flex items-center">
                        <Clock size={20} className="mr-2" />
                        Fase Actual
                      </h4>
                      <p className="text-justice-800 font-semibold text-lg">{getCurrentPhase()!.name}</p>
                      <p className="text-justice-700 mt-1">{getCurrentPhase()!.description}</p>
                      <div className="mt-3 flex items-center text-sm text-justice-600 bg-white px-3 py-2 rounded-md inline-flex">
                        <Calendar size={16} className="mr-2" />
                        {formatDate(getCurrentPhase()!.startDate)} - {formatDate(getCurrentPhase()!.endDate)}
                      </div>
                    </div>
                  )}

                  {getNextMilestone() && (
                    <div className="p-5 bg-gradient-to-r from-amber-50 to-justice-50 rounded-lg border-2 border-amber-200">
                      <h4 className="font-bold text-amber-900 mb-2 flex items-center">
                        <AlertCircle size={20} className="mr-2" />
                        Próximo Hito
                      </h4>
                      <p className="text-amber-800 font-semibold text-lg">{getNextMilestone()!.name}</p>
                      <p className="text-amber-700 mt-1">{getNextMilestone()!.description}</p>
                      <div className="mt-3 flex items-center text-sm text-amber-600 bg-white px-3 py-2 rounded-md inline-flex">
                        <Calendar size={16} className="mr-2" />
                        Inicia: {formatDate(getNextMilestone()!.startDate)}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold text-justice-900">Propósito y Descripción</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-5 bg-gradient-to-r from-justice-50 to-indigo-50 rounded-lg border border-justice-100">
                    <h4 className="font-bold text-justice-900 mb-3 flex items-center">
                      <Target size={20} className="mr-2 text-justice-600" />
                      Propósito
                    </h4>
                    <p className="text-justice-800 leading-relaxed">{commission.purpose}</p>
                  </div>
                  <div className="p-5 bg-gradient-to-r from-justice-50 to-slate-50 rounded-lg border border-justice-200">
                    <h4 className="font-bold text-justice-900 mb-3 flex items-center">
                      <FileText size={20} className="mr-2 text-justice-600" />
                      Descripción Detallada
                    </h4>
                    <p className="text-justice-800 leading-relaxed">{commission.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-justice-600">
              <CardHeader>
                <h3 className="text-xl font-bold text-justice-900 flex items-center">
                  <TrendingUp size={24} className="mr-3 text-justice-600" />
                  Progreso del Proceso
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-justice-700">Progreso General</span>
                    <span className="text-lg font-bold text-justice-900">{getPhaseProgress()}%</span>
                  </div>
                  <div className="w-full bg-justice-200 rounded-full h-4 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-justice-600 to-indigo-600 h-4 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${getPhaseProgress()}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {commission.phases.map((phase, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-justice-50 to-slate-50 rounded-lg border">
                        {getStatusIcon(phase.status)}
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-justice-900">{phase.name}</div>
                          <div className="text-xs text-justice-600">{formatDate(phase.startDate)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'timeline':
        return (
          <Card className="border-l-4 border-l-justice-600">
            <CardHeader>
              <h3 className="text-xl font-bold text-justice-900 flex items-center">
                <Calendar size={24} className="mr-3 text-justice-600" />
                Cronograma Detallado
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-justice-50 to-indigo-50 p-6 rounded-lg border border-justice-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Fecha de Inicio</span>
                      <span className="text-justice-900 font-bold text-lg">{formatDate(commission.startDate)}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Fecha de Finalización</span>
                      <span className="text-justice-900 font-bold text-lg">{formatDate(commission.endDate)}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Duración Total</span>
                      <span className="text-justice-900 font-bold text-lg">
                        {Math.ceil((new Date(commission.endDate).getTime() - new Date(commission.startDate).getTime()) / (1000 * 60 * 60 * 24))} días
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Progreso</span>
                      <span className="text-justice-900 font-bold text-lg">{getPhaseProgress()}% completado</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {commission.phases.map((phase, index) => {
                    const isLast = index === commission.phases.length - 1;
                    const duration = Math.ceil((new Date(phase.endDate).getTime() - new Date(phase.startDate).getTime()) / (1000 * 60 * 60 * 24));

                    return (
                      <div key={index} className="relative flex items-start space-x-6 pb-10">
                        {!isLast && (
                          <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-justice-300 to-justice-300"></div>
                        )}

                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 shadow-md ${
                          phase.status === 'Completada'
                            ? 'bg-justice-100 border-justice-500'
                            : phase.status === 'En proceso'
                            ? 'bg-justice-100 border-justice-500'
                            : 'bg-justice-100 border-justice-300'
                        }`}>
                          {getStatusIcon(phase.status)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className={`p-6 rounded-lg shadow-sm border-2 ${
                            phase.status === 'En proceso'
                              ? 'border-justice-300 bg-gradient-to-br from-justice-50 to-amber-50'
                              : phase.status === 'Completada'
                              ? 'border-justice-300 bg-gradient-to-br from-justice-50 to-justice-50'
                              : 'border-justice-200 bg-white'
                          }`}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-xl font-bold text-justice-900">{phase.name}</h4>
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(phase.status)}`}>
                                {phase.status}
                              </span>
                            </div>
                            <p className="text-justice-700 mb-4 leading-relaxed">{phase.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white p-3 rounded-md border">
                                <span className="block text-xs font-semibold text-justice-500 uppercase mb-1">Inicio</span>
                                <div className="text-justice-900 font-semibold">{formatDate(phase.startDate)}</div>
                              </div>
                              <div className="bg-white p-3 rounded-md border">
                                <span className="block text-xs font-semibold text-justice-500 uppercase mb-1">Finalización</span>
                                <div className="text-justice-900 font-semibold">{formatDate(phase.endDate)}</div>
                              </div>
                              <div className="bg-white p-3 rounded-md border">
                                <span className="block text-xs font-semibold text-justice-500 uppercase mb-1">Duración</span>
                                <div className="text-justice-900 font-semibold">{duration} días</div>
                              </div>
                            </div>

                            {phase.status === 'En proceso' && (
                              <div className="mt-4 p-4 bg-justice-100 rounded-lg border border-justice-200">
                                <div className="flex items-center text-justice-800 font-bold mb-1">
                                  <Clock size={18} className="mr-2" />
                                  Fase en curso
                                </div>
                                <p className="text-justice-700 text-sm">
                                  Esta fase está actualmente en desarrollo. Consulta regularmente para actualizaciones.
                                </p>
                              </div>
                            )}

                            {phase.status === 'Completada' && (
                              <div className="mt-4 p-4 bg-justice-100 rounded-lg border border-justice-200">
                                <div className="flex items-center text-justice-800 font-bold mb-1">
                                  <CheckCircle size={18} className="mr-2" />
                                  Fase completada
                                </div>
                                <p className="text-justice-700 text-sm">
                                  Esta fase ha sido finalizada exitosamente según el cronograma establecido.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'members':
        return (
          <div className="space-y-6">
            <Card className="border-l-4 border-l-justice-600">
              <CardHeader>
                <h3 className="text-xl font-bold text-justice-900 flex items-center">
                  <Users size={24} className="mr-3 text-justice-600" />
                  Integrantes de la Comisión
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {commission.members.map((member, index) => (
                    <div key={index} className="p-6 bg-gradient-to-br from-white to-justice-50 rounded-lg border-2 border-justice-200 hover:border-justice-300 hover:shadow-lg transition-all">
                      <div className="flex items-start space-x-4">
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-justice-100 shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-justice-100 to-indigo-100 flex items-center justify-center border-4 border-justice-200">
                            <Users size={28} className="text-justice-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold text-justice-900 text-lg mb-1">{member.name}</h4>
                          <p className="text-justice-600 font-semibold mb-2">{member.role}</p>
                          <p className="text-justice-600 text-sm">{member.institution}</p>

                          <div className="mt-3">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${
                              member.role === 'Presidente'
                                ? 'bg-justice-100 text-justice-800 border-justice-200'
                                : member.role === 'Secretaria' || member.role === 'Secretario'
                                ? 'bg-justice-100 text-justice-800 border-justice-200'
                                : 'bg-justice-100 text-justice-800 border-justice-200'
                            }`}>
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-justice-50 to-indigo-50 border-justice-200">
              <CardHeader>
                <h4 className="font-bold text-justice-900">Estructura de la Comisión</h4>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-justice-200 shadow-sm">
                    <span className="font-bold text-justice-900">Total de Integrantes</span>
                    <span className="text-justice-600 font-bold text-2xl">{commission.members.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-justice-200 shadow-sm">
                    <span className="font-bold text-justice-900">Instituciones</span>
                    <span className="text-justice-600 font-bold text-2xl">
                      {new Set(commission.members.map(m => m.institution)).size}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'candidates':
        return (
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <h3 className="text-xl font-bold text-justice-900 flex items-center">
                <Award size={24} className="mr-3 text-amber-600" />
                Candidatos Postulados
              </h3>
            </CardHeader>
            <CardContent>
              {commissionCandidates.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-justice-50 to-justice-100 p-6 rounded-lg text-center border border-justice-200">
                      <div className="text-3xl font-bold text-justice-700">{commissionCandidates.length}</div>
                      <div className="text-justice-600 text-sm font-medium mt-1">Candidatos Totales</div>
                    </div>
                    <div className="bg-gradient-to-br from-justice-50 to-justice-100 p-6 rounded-lg text-center border border-justice-200">
                      <div className="text-3xl font-bold text-justice-700">
                        {commissionCandidates.filter(c => c.status === 'Activo').length}
                      </div>
                      <div className="text-justice-600 text-sm font-medium mt-1">Candidatos Activos</div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg text-center border border-indigo-200">
                      <div className="text-3xl font-bold text-indigo-700">
                        {new Set(commissionCandidates.map(c => c.specialization)).size}
                      </div>
                      <div className="text-indigo-600 text-sm font-medium mt-1">Especializaciones</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {commissionCandidates.map((candidate) => (
                      <div key={candidate.id}
                           className="bg-white rounded-lg border-2 border-justice-200 hover:border-justice-400 hover:shadow-xl transition-all cursor-pointer"
                           onClick={() => window.location.href = `/candidatos/${candidate.id}`}>
                        <div className="p-5">
                          <div className="flex items-center space-x-3 mb-4">
                            <img
                              src={candidate.imageUrl}
                              alt={candidate.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-justice-200"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-justice-900 leading-tight">{candidate.name}</h4>
                              <p className="text-sm text-justice-600 font-medium">{candidate.role}</p>
                            </div>
                          </div>
                          <p className="text-sm text-justice-700 mb-4 line-clamp-2 leading-relaxed">{candidate.description}</p>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center text-justice-600">
                              <Award size={14} className="mr-2 text-amber-500" />
                              <span className="font-medium">{candidate.specialization}</span>
                            </div>
                            <div className="flex items-center text-justice-600">
                              <Clock size={14} className="mr-2 text-justice-500" />
                              <span className="font-medium">{candidate.yearsOfExperience} años exp.</span>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${
                              candidate.status === 'Activo'
                                ? 'bg-justice-100 text-justice-800 border-justice-200'
                                : 'bg-justice-100 text-justice-800 border-justice-200'
                            }`}>
                              {candidate.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      variant="primary"
                      onClick={() => window.location.href = `/candidatos?commission=${commission.id}`}
                    >
                      Ver todos los candidatos
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award size={64} className="mx-auto text-justice-300 mb-4" />
                  <h4 className="text-lg font-bold text-justice-900 mb-2">
                    No hay candidatos registrados
                  </h4>
                  <p className="text-justice-600">
                    Los candidatos aparecerán aquí una vez que se abra el proceso de postulación.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'documents':
        return (
          <Card className="border-l-4 border-l-justice-600">
            <CardHeader>
              <h3 className="text-xl font-bold text-justice-900 flex items-center">
                <FileText size={24} className="mr-3 text-justice-600" />
                Documentos del Proceso
              </h3>
            </CardHeader>
            <CardContent>
              {commission.documents.length > 0 ? (
                <div className="space-y-4">
                  {commission.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-5 border-2 border-justice-200 rounded-lg hover:border-justice-400 hover:shadow-lg transition-all bg-gradient-to-r from-white to-justice-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-justice-500 to-justice-600 rounded-lg flex items-center justify-center shadow-md">
                          <FileText size={28} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-justice-900 text-lg">{doc.title}</h4>
                          <p className="text-sm text-justice-600">Tipo: <span className="font-semibold">{doc.type}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          <Eye size={18} className="mr-2" />
                          Ver
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          <Download size={18} className="mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText size={64} className="mx-auto text-justice-300 mb-4" />
                  <h4 className="text-lg font-bold text-justice-900 mb-2">
                    No hay documentos disponibles
                  </h4>
                  <p className="text-justice-600">
                    Los documentos del proceso se publicarán aquí cuando estén disponibles.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const profileUrl = window.location.href;
  const shareTitle = `${commission.name} - ${commission.type}`;
  const shareDescription = `Información sobre ${commission.name}`;

  return (
    <ProfileLayout
      title={commission.name}
      subtitle={commission.type}
      headerContent={
        <div className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold border bg-white/10 backdrop-blur-sm text-white/90 ${getStatusColor(commission.status).replace('bg-', 'border-')}`}>
              {getStatusIcon(commission.status)}
              <span className="ml-2">{commission.status}</span>
            </span>
            <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Calendar size={18} className="mr-2" />
              <span className="font-medium">{formatDate(commission.startDate)} - {formatDate(commission.endDate)}</span>
            </div>
            <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Users size={18} className="mr-2" />
              <span className="font-medium">{commission.candidatesCount} candidatos</span>
            </div>
            <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Award size={18} className="mr-2" />
              <span className="font-medium">{commission.positionsAvailable} plazas</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/90 text-sm font-semibold">Compartir perfil:</span>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <SocialShare
                url={profileUrl}
                title={shareTitle}
                description={shareDescription}
                variant="buttons"
                className="social-share-light"
              />
            </div>
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <div className="border-b-2 border-justice-200">
          <nav className="-mb-0.5 flex space-x-6 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-2 border-b-4 font-semibold text-sm transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-justice-600 text-justice-600'
                      : 'border-transparent text-justice-500 hover:text-justice-700 hover:border-justice-300'
                    }
                  `}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8">
          {renderTabContent()}
        </div>

        <div className="mt-8">
          <Card className="shadow-sm">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-justice-700 font-semibold">Compartir perfil:</span>
                  <SocialShare
                    url={profileUrl}
                    title={shareTitle}
                    description={shareDescription}
                    variant="buttons"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Volver
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/candidatos'}
                  >
                    Ver candidatos
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => window.location.href = '/comisiones'}
                  >
                    Ver todas las comisiones
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-gradient-to-r from-justice-50 to-indigo-50 border-justice-200 shadow-sm">
            <CardContent className="py-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-justice-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-justice-900 mb-2 text-lg">Base legal de la información</h3>
                  <p className="text-justice-800 leading-relaxed">
                    La información publicada en Justiciapedia se fundamenta en los artículos 30 y 31 de la Constitución Política de la República de Guatemala, que garantizan el derecho de toda persona a acceder a la información pública y a conocer los registros estatales.
                  </p>
                  <p className="text-justice-800 leading-relaxed mt-3">
                    Justiciapedia utiliza únicamente información obtenida mediante mecanismos legales de acceso a la información pública y respeta los límites establecidos por la ley en materia de confidencialidad y protección de datos.
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-justice-200 pt-6 mt-6 space-y-6">
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h4 className="font-bold text-justice-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-justice-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-justice-600 font-bold text-sm">30</span>
                    </div>
                    Artículo 30: Publicidad de los actos administrativos
                  </h4>
                  <p className="text-justice-700 leading-relaxed pl-11">
                    Todos los actos de la administración son públicos. Los interesados tienen derecho a obtener, en cualquier tiempo, informes, copias, reproducciones y certificaciones que soliciten y la exhibición de los expedientes que deseen consultar, salvo que se trate de asuntos militares o diplomáticos de seguridad nacional, o de datos suministrados por particulares bajo garantía de confidencia.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h4 className="font-bold text-justice-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-justice-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-justice-600 font-bold text-sm">31</span>
                    </div>
                    Artículo 31: Acceso a archivos y registros estatales
                  </h4>
                  <p className="text-justice-700 leading-relaxed pl-11">
                    Toda persona tiene el derecho de conocer lo que de ella conste en archivos, fichas o cualquier otra forma de registros estatales, y la finalidad a que se dedica esta información, así como a corrección, rectificación y actualización. Quedan prohibidos los registros y archivos de filiación política, excepto los propios de las autoridades electorales y de los partidos políticos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default CommissionProfile;

