import React, { useState } from 'react';
import { Database, FileText, BookOpen, Download, ExternalLink, Search, Filter, Calendar, Tag } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState('datos');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const tabs = [
    { id: 'datos', label: 'Datos Abiertos', icon: Database },
    { id: 'informes', label: 'Informes', icon: FileText },
    { id: 'biblioteca', label: 'Biblioteca Legal', icon: BookOpen }
  ];

  const datasets = [
    {
      id: 1,
      title: 'Candidatos a Magistrados CSJ 2024',
      description: 'Base de datos completa de candidatos postulados para la Corte Suprema de Justicia.',
      format: 'CSV, JSON',
      size: '2.3 MB',
      updated: '2024-01-15',
      category: 'candidatos',
      downloads: 1250,
      url: '/data/candidatos-csj-2024.csv'
    },
    {
      id: 2,
      title: 'Comisiones de Postulación Históricas',
      description: 'Datos históricos de todas las comisiones de postulación desde 2010.',
      format: 'CSV, JSON, XML',
      size: '5.7 MB',
      updated: '2024-01-10',
      category: 'comisiones',
      downloads: 890,
      url: '/data/comisiones-historicas.csv'
    },
    {
      id: 3,
      title: 'Presupuestos del Organismo Judicial',
      description: 'Información presupuestaria del sistema judicial guatemalteco por año.',
      format: 'CSV, Excel',
      size: '1.8 MB',
      updated: '2024-01-05',
      category: 'presupuesto',
      downloads: 567,
      url: '/data/presupuestos-oj.csv'
    }
  ];

  const reports = [
    {
      id: 1,
      title: 'Informe Anual de Transparencia Judicial 2023',
      description: 'Análisis comprehensivo del estado de la transparencia en el sistema judicial guatemalteco.',
      date: '2024-01-20',
      pages: 85,
      category: 'anual',
      url: '/reports/transparencia-2023.pdf'
    },
    {
      id: 2,
      title: 'Evaluación de Procesos de Selección 2023',
      description: 'Estudio detallado de los procesos de selección de autoridades judiciales.',
      date: '2023-12-15',
      pages: 62,
      category: 'evaluacion',
      url: '/reports/evaluacion-seleccion-2023.pdf'
    },
    {
      id: 3,
      title: 'Mapeo de Vínculos en el Sistema Judicial',
      description: 'Análisis de redes y conexiones entre actores del sistema judicial.',
      date: '2023-11-30',
      pages: 45,
      category: 'analisis',
      url: '/reports/mapeo-vinculos-2023.pdf'
    }
  ];

  const legalDocs = [
    {
      id: 1,
      title: 'Ley del Organismo Judicial',
      description: 'Decreto Número 2-89 del Congreso de la República de Guatemala.',
      type: 'Ley',
      year: '1989',
      category: 'legislacion',
      url: '/legal/ley-organismo-judicial.pdf'
    },
    {
      id: 2,
      title: 'Ley de la Carrera Judicial',
      description: 'Decreto Número 41-99 del Congreso de la República.',
      type: 'Ley',
      year: '1999',
      category: 'legislacion',
      url: '/legal/ley-carrera-judicial.pdf'
    },
    {
      id: 3,
      title: 'Reglamento de Comisiones de Postulación',
      description: 'Normativa que regula el funcionamiento de las comisiones de postulación.',
      type: 'Reglamento',
      year: '2020',
      category: 'reglamentos',
      url: '/legal/reglamento-comisiones.pdf'
    }
  ];

  const categories = {
    datos: ['all', 'candidatos', 'comisiones', 'presupuesto', 'estadisticas'],
    informes: ['all', 'anual', 'evaluacion', 'analisis', 'especial'],
    biblioteca: ['all', 'legislacion', 'reglamentos', 'jurisprudencia', 'doctrina']
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'datos':
        return datasets;
      case 'informes':
        return reports;
      case 'biblioteca':
        return legalDocs;
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const renderDataCard = (item: any) => {
    if (activeTab === 'datos') {
      return (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Database size={14} className="mr-1" />
                    <span>{item.format}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{item.size}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>Actualizado: {item.updated}</span>
                  </div>
                  <div className="flex items-center">
                    <Download size={14} className="mr-1" />
                    <span>{item.downloads} descargas</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(item.url, '_blank')}
              >
                <Download size={16} className="mr-1" />
                Descargar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.url, '_blank')}
              >
                <ExternalLink size={16} className="mr-1" />
                Ver
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (activeTab === 'informes') {
      return (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText size={14} className="mr-1" />
                    <span>{item.pages} páginas</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(item.url, '_blank')}
              >
                <Download size={16} className="mr-1" />
                Descargar PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.url, '_blank')}
              >
                <ExternalLink size={16} className="mr-1" />
                Ver Online
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (activeTab === 'biblioteca') {
      return (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <BookOpen size={14} className="mr-1" />
                    <span>{item.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(item.url, '_blank')}
              >
                <Download size={16} className="mr-1" />
                Descargar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.url, '_blank')}
              >
                <ExternalLink size={16} className="mr-1" />
                Leer Online
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <PageLayout
      title="Recursos"
      description="Accede a datos abiertos, informes y documentación legal sobre el sistema judicial guatemalteco."
    >
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCategoryFilter('all');
                    setSearchQuery('');
                  }}
                  className={`
                    flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Buscar en ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories[activeTab as keyof typeof categories].map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map(renderDataCard)
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {activeTab === 'datos' && <Database size={48} className="mx-auto" />}
                {activeTab === 'informes' && <FileText size={48} className="mx-auto" />}
                {activeTab === 'biblioteca' && <BookOpen size={48} className="mx-auto" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron recursos
              </h3>
              <p className="text-gray-600">
                No hay recursos que coincidan con los criterios de búsqueda.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* API Information */}
      <Card className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <CardHeader>
          <h3 className="text-xl font-semibold text-primary-900">API de Datos Abiertos</h3>
        </CardHeader>
        <CardContent>
          <p className="text-primary-800 mb-4">
            Accede programáticamente a nuestros datos a través de nuestra API REST. 
            Perfecta para desarrolladores, investigadores y organizaciones que necesitan 
            integrar datos judiciales en sus aplicaciones.
          </p>
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => window.open('/api/docs', '_blank')}
            >
              Ver Documentación API
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open('/api/examples', '_blank')}
            >
              Ejemplos de Uso
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Resources;