import React from 'react';
import { Download, Database, FileText, BookOpen, CheckCircle, ExternalLink, FileSpreadsheet, FileJson, Table } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const OpenData: React.FC = () => {
  const datasets = [
    {
      title: 'Procesos de Elección',
      description: 'Información detallada sobre procesos históricos y actuales de elección de autoridades judiciales.',
      formats: ['CSV', 'JSON', 'Excel'],
      icon: Database,
      records: '500+',
      lastUpdate: '2024-01-15'
    },
    {
      title: 'Instituciones del Sector Justicia',
      description: 'Datos sobre instituciones, su estructura, competencias y autoridades.',
      formats: ['CSV', 'JSON', 'Excel'],
      icon: FileSpreadsheet,
      records: '50+',
      lastUpdate: '2024-01-10'
    },
    {
      title: 'Autoridades y Cargos',
      description: 'Perfiles de autoridades judiciales, comisionados y aspirantes a cargos públicos.',
      formats: ['CSV', 'JSON', 'Excel'],
      icon: Table,
      records: '1,200+',
      lastUpdate: '2024-01-20'
    },
    {
      title: 'Documentación Relevante',
      description: 'Índice de documentos oficiales, resoluciones, actas y normativa legal.',
      formats: ['CSV', 'JSON'],
      icon: FileJson,
      records: '800+',
      lastUpdate: '2024-01-18'
    }
  ];

  const documentCategories = [
    {
      title: 'Resoluciones',
      description: 'Resoluciones oficiales de comisiones y autoridades',
      count: 150,
      icon: FileText
    },
    {
      title: 'Actas',
      description: 'Actas de sesiones y reuniones públicas',
      count: 200,
      icon: FileText
    },
    {
      title: 'Leyes y Normativa',
      description: 'Marco legal y normativo del sector justicia',
      count: 50,
      icon: BookOpen
    },
    {
      title: 'Acuerdos',
      description: 'Acuerdos institucionales y gubernativos',
      count: 100,
      icon: FileText
    }
  ];

  const methodologySteps = [
    {
      title: 'Recopilación',
      description: 'Obtenemos datos de fuentes oficiales mediante solicitudes de acceso a información pública y monitoreo de publicaciones oficiales.',
      icon: Database
    },
    {
      title: 'Verificación',
      description: 'Validamos cada dato con múltiples fuentes y verificamos su autenticidad y precisión antes de publicarlo.',
      icon: CheckCircle
    },
    {
      title: 'Estructuración',
      description: 'Organizamos la información en formatos estandarizados y fáciles de procesar para análisis y reutilización.',
      icon: Table
    },
    {
      title: 'Actualización',
      description: 'Mantenemos los datos actualizados mediante revisiones periódicas y monitoreo continuo de nuevas publicaciones.',
      icon: ExternalLink
    }
  ];

  const sources = [
    'Corte Suprema de Justicia',
    'Ministerio Público',
    'Corte de Constitucionalidad',
    'Comisiones de Postulación',
    'Congreso de la República',
    'Diario Oficial',
    'Portal de Transparencia del Estado'
  ];

  return (
    <PageLayout
      title="Datos Abiertos"
      description="Accede a datos públicos del sector justicia para análisis, investigación y control ciudadano."
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-secondary-900 rounded-2xl p-8 md:p-12 lg:p-16 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-justice-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-justice-400 to-justice-600 rounded-2xl shadow-xl">
              <Database size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Datos para la transparencia
          </h1>
          <p className="text-lg md:text-xl text-primary-100 leading-relaxed mb-8">
            La transparencia se fortalece cuando la información es <strong className="text-justice-300">accesible, reutilizable y comprensible</strong>. Justiciapedia pone a disposición datos públicos del sector justicia para promover análisis, investigación y control ciudadano.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-justice-500 hover:bg-justice-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Download size={24} className="mr-2" />
            Descargar datos
          </Button>
        </div>
      </div>

      {/* Datasets Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
            <Database size={18} className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Bases de Datos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Conjuntos de datos descargables
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Accede a bases de datos organizadas y actualizadas sobre el sector justicia en Guatemala
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map((dataset, index) => {
            const Icon = dataset.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-neutral-100 hover:border-primary-300">
                <CardHeader className="bg-gradient-to-r from-primary-50 to-accent-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">{dataset.title}</h3>
                        <p className="text-neutral-600 text-sm">{dataset.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Registros:</span>
                      <span className="font-semibold text-neutral-900">{dataset.records}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Última actualización:</span>
                      <span className="font-semibold text-neutral-900">{dataset.lastUpdate}</span>
                    </div>
                    <div className="border-t border-neutral-100 pt-4">
                      <p className="text-sm text-neutral-600 mb-3">Formatos disponibles:</p>
                      <div className="flex gap-2">
                        {dataset.formats.map((format, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                          >
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full mt-4 bg-primary-600 hover:bg-primary-700"
                    >
                      <Download size={18} className="mr-2" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Documents Section */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center">
              <FileText size={32} className="text-green-600 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Documentos oficiales</h2>
                <p className="text-lg text-gray-700 mt-1">
                  Consulta resoluciones, actas, leyes, acuerdos y otros documentos públicos
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {documentCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Icon size={24} className="text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.count} documentos</span>
                      <ExternalLink size={16} className="text-green-600" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                <FileText size={20} className="mr-2" />
                Ver todos los documentos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Methodology Section */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-center">
              <BookOpen size={32} className="text-blue-600 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Metodología</h2>
                <p className="text-lg text-gray-700 mt-1">
                  Cómo recopilamos, verificamos y actualizamos la información
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              La transparencia también implica explicar cómo se construye la información. Nuestro proceso garantiza calidad, precisión y actualización constante.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {methodologySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border-2 border-blue-100 rounded-lg p-6 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {index + 1}. {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sources Section */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center">
              <CheckCircle size={32} className="text-green-600 mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Fuentes de información</h2>
                <p className="text-lg text-gray-700 mt-1">
                  Toda nuestra información proviene de fuentes oficiales y públicas
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Toda la información publicada en Justiciapedia proviene de:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 rounded-lg p-4"
                >
                  <CheckCircle size={20} className="text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{source}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">
                <strong className="text-blue-700">Ley de Acceso a la Información Pública:</strong> Todos los datos se obtienen en cumplimiento del derecho constitucional de acceso a la información pública, garantizando la legitimidad y legalidad de cada dato publicado.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-10 md:p-14 text-center shadow-2xl">
        <div className="max-w-3xl mx-auto text-white">
          <Database size={56} className="mx-auto mb-6 text-blue-100" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Accede a todos los datos
          </h2>
          <p className="text-lg md:text-xl text-blue-50 mb-10 leading-relaxed">
            Descarga conjuntos de datos completos en múltiples formatos. Úsalos para investigación, análisis, periodismo de datos o desarrollo de aplicaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-semibold px-8 py-4"
            >
              <Download size={24} className="mr-2" />
              Descargar todos los datos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all font-semibold px-8 py-4"
            >
              <BookOpen size={24} className="mr-2" />
              Ver documentación API
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OpenData;
