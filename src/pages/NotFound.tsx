import React, { useState, useEffect } from 'react';
import { Search, Home, ArrowLeft, FileQuestion, RefreshCw, Mail, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import notFoundImage from '../assets/404.png';

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
              <img src={notFoundImage} alt="404 Not Found" className="mx-auto mb-6 w-100 h-auto" />
              
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
              <div className="flex justify-center mb-8">
                <a href="/" className='inline-flex items-center gap-2 px-6 py-3 bg-justice-500 hover:bg-justice-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5'>
                Ir al inicio
                </a>
              </div>

            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default NotFound;