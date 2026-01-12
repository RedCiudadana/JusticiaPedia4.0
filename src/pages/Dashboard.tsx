import React, { useState } from 'react';
import { BarChart3, Users, Building2, FileText, TrendingUp, Calendar, Award, AlertCircle, Eye, Download, Filter } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { candidates } from '../data/candidates';
import { institutions } from '../data/institutions';
import { commissions } from '../data/commissions';
import { newsArticles } from '../data/news';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Calculate statistics
  const stats = {
    totalCandidates: candidates.length,
    activeCandidates: candidates.filter(c => c.status === 'Activo').length,
    totalInstitutions: institutions.length,
    activeCommissions: commissions.filter(c => c.status === 'En proceso').length,
    totalArticles: newsArticles.length,
    avgExperience: Math.round(candidates.reduce((sum, c) => sum + c.yearsOfExperience, 0) / candidates.length),
  };

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'candidate',
      title: 'Nuevo candidato registrado',
      description: 'María Eugenia Morales se postuló para la CSJ',
      timestamp: '2024-01-15T10:30:00',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'commission',
      title: 'Fase completada',
      description: 'Comisión CSJ completó evaluación documental',
      timestamp: '2024-01-14T15:45:00',
      icon: Award,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'news',
      title: 'Artículo publicado',
      description: 'Nuevo análisis sobre transparencia judicial',
      timestamp: '2024-01-13T09:15:00',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Proceso próximo a vencer',
      description: 'Comisión CA tiene fecha límite en 5 días',
      timestamp: '2024-01-12T14:20:00',
      icon: AlertCircle,
      color: 'text-orange-600'
    }
  ];

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickActions = [
    {
      title: 'Exportar Datos',
      description: 'Descargar datos en formato CSV',
      icon: Download,
      action: () => console.log('Export data'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Generar Reporte',
      description: 'Crear reporte personalizado',
      icon: FileText,
      action: () => console.log('Generate report'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Configurar Alertas',
      description: 'Personalizar notificaciones',
      icon: AlertCircle,
      action: () => console.log('Configure alerts'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <PageLayout
      title="Dashboard"
      description="Aquí tienes un resumen de la actividad del sistema judicial."
    >
      {/* Welcome Section */}
      <Card className="mb-8 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary-900 mb-2">
                Panel de Control
              </h2>
              <p className="text-primary-700">
                Resumen de la actividad del sistema judicial
              </p>
            </div>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="week">Esta semana</option>
                  <option value="month">Este mes</option>
                  <option value="quarter">Este trimestre</option>
                  <option value="year">Este año</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Candidatos</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.totalCandidates}</p>
                  <p className="text-blue-700 text-sm">{stats.activeCandidates} activos</p>
                </div>
                <Users size={32} className="text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Instituciones</p>
                  <p className="text-3xl font-bold text-green-900">{stats.totalInstitutions}</p>
                  <p className="text-green-700 text-sm">Sistema judicial</p>
                </div>
                <Building2 size={32} className="text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Comisiones Activas</p>
                  <p className="text-3xl font-bold text-purple-900">{stats.activeCommissions}</p>
                  <p className="text-purple-700 text-sm">En proceso</p>
                </div>
                <Award size={32} className="text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Experiencia Promedio</p>
                  <p className="text-3xl font-bold text-orange-900">{stats.avgExperience}</p>
                  <p className="text-orange-700 text-sm">años</p>
                </div>
                <TrendingUp size={32} className="text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center">
                  <BarChart3 size={24} className="mr-3 text-primary-600" />
                  Actividad Reciente
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${activity.color}`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-gray-600 text-sm">{activity.description}</p>
                          <p className="text-gray-500 text-xs mt-1">{formatTimestamp(activity.timestamp)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    Ver toda la actividad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Acciones Rápidas</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className={`${action.color} text-white p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center`}
                      >
                        <Icon size={24} className="mx-auto mb-2" />
                        <div className="text-sm font-medium">{action.title}</div>
                        <div className="text-xs opacity-90 mt-1">{action.description}</div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Estado del Sistema</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Base de datos</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-green-600">Operativo</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-green-600">Operativo</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Última actualización</span>
                    <span className="text-sm font-medium text-gray-900">Hace 2 horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <h3 className="text-lg font-semibold text-orange-900 flex items-center">
                  <AlertCircle size={20} className="mr-2" />
                  Alertas
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border border-orange-200">
                    <p className="text-sm font-medium text-orange-900">Proceso próximo a vencer</p>
                    <p className="text-xs text-orange-700">Comisión CA - 5 días restantes</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">Nueva documentación</p>
                    <p className="text-xs text-blue-700">3 documentos pendientes de revisión</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Candidatos por Especialización</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...new Set(candidates.map(c => c.specialization))].map(spec => {
                  const count = candidates.filter(c => c.specialization === spec).length;
                  const percentage = Math.round((count / candidates.length) * 100);
                  return (
                    <div key={spec} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{spec}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Progreso de Comisiones</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissions.slice(0, 4).map(commission => {
                  const completedPhases = commission.phases.filter(p => p.status === 'Completada').length;
                  const progress = Math.round((completedPhases / commission.phases.length) * 100);
                  return (
                    <div key={commission.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 truncate">{commission.name}</span>
                        <span className="text-sm text-gray-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
  );
};

export default Dashboard;