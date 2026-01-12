import React, { useState, useEffect } from 'react';
import { Search, Home, ArrowLeft, FileQuestion, RefreshCw, Mail, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';

const NotFound: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const suggestedPages = [
    {
      title: 'Perfiles de Candidatos',
      description: 'Explora los candidatos a puestos judiciales',
      href: '/candidatos',
      icon: '👥'
    },
    {
      title: 'Instituciones de Justicia',
      description: 'Conoce las instituciones del sistema judicial',
      href: '/instituciones',
      icon: '🏛️'
    },
    {
      title: 'Comisiones de Postulación',
      description: 'Información sobre procesos de selección',
      href: '/comisiones',
      icon: '📋'
    },
    {
      title: 'Notas de Interés',
      description: 'Últimas noticias y análisis',
      href: '/noticias',
      icon: '📰'
    }
  ];

  const quickActions = [
    {
      title: 'Ir al Inicio',
      description: 'Volver a la página principal',
      action: () => window.location.href = '/',
      icon: Home,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Buscar',
      description: 'Buscar en todo el sitio',
      action: () => document.getElementById('search-input')?.focus(),
      icon: Search,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Recargar',
      description: 'Intentar recargar la página',
      action: () => window.location.reload(),
      icon: RefreshCw,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Reportar',
      description: 'Reportar enlace roto',
      action: () => window.location.href = '/contacto',
      icon: Mail,
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  const getErrorMessage = () => {
    if (currentPath.includes('/candidatos/')) {
      return 'El candidato que buscas no existe o ha sido removido.';
    }
    if (currentPath.includes('/instituciones/')) {
      return 'La institución que buscas no existe o ha sido removida.';
    }
    if (currentPath.includes('/comisiones/')) {
      return 'La comisión que buscas no existe o ha sido removida.';
    }
    if (currentPath.includes('/noticias/')) {
      return 'El artículo que buscas no existe o ha sido removido.';
    }
    return 'La página que buscas no existe o ha sido movida.';
  };

  return (
    <Layout 
      title="Página no encontrada - JusticiapedIA"
      description="La página que buscas no existe. Explora nuestro contenido sobre el sistema judicial guatemalteco."
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Main Error Section */}
            <div className="text-center mb-12">
              <div className="relative mb-8">
                {/* Animated 404 */}
                <div className="text-8xl md:text-9xl font-bold text-gray-200 select-none">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileQuestion size={80} className="text-primary-600 animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¡Oops! Página no encontrada
              </h1>
              
              <p className="text-xl text-gray-600 mb-2">
                {getErrorMessage()}
              </p>
              
              <p className="text-gray-500 mb-8">
                URL solicitada: <code className="bg-gray-200 px-2 py-1 rounded text-sm">{currentPath}</code>
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`${action.color} text-white p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                    >
                      <Icon size={24} className="mx-auto mb-2" />
                      <div className="text-sm font-medium">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Section */}
            <Card className="mb-8 bg-white shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  ¿Qué estabas buscando?
                </h2>
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                  <div className="relative">
                    <input
                      id="search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar candidatos, instituciones, noticias..."
                      className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                    />
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      size="sm"
                    >
                      Buscar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Suggested Pages */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Páginas que podrían interesarte
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestedPages.map((page, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <a href={page.href} className="block">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{page.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                              {page.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{page.description}</p>
                            <div className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
                              Explorar
                              <ExternalLink size={16} className="ml-1" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <Card className="bg-primary-50 border-primary-200">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold text-primary-900 mb-4">
                  ¿Necesitas ayuda?
                </h2>
                <p className="text-primary-700 mb-6">
                  Si crees que esto es un error o necesitas asistencia, no dudes en contactarnos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    onClick={() => window.location.href = '/contacto'}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    <Mail size={16} className="mr-2" />
                    Contactar Soporte
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/documentacion'}
                    className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
                  >
                    Ver Documentación
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="flex items-center"
              >
                <ArrowLeft size={16} className="mr-2" />
                Volver atrás
              </Button>
              <Button
                variant="primary"
                onClick={() => window.location.href = '/'}
                className="flex items-center"
              >
                <Home size={16} className="mr-2" />
                Ir al inicio
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center text-sm text-gray-500">
              <p>
                Si continúas experimentando problemas, puedes reportar este enlace roto a{' '}
                <a 
                  href="mailto:soporte@justiciapedia.org.gt" 
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  soporte@justiciapedia.org.gt
                </a>
              </p>
              <p className="mt-2">
                Código de error: 404 | Timestamp: {new Date().toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default NotFound;