import React, { useState } from 'react';
import { Book, Search, Users, Network, HandHelping, Building2, FileText, ChevronDown } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

const Documentation: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sections: Section[] = [
    {
      id: 'overview',
      title: 'Visión General',
      icon: Book,
      content: 'JusticiapedIA es una plataforma de transparencia judicial que proporciona información sobre el sistema de justicia en Guatemala.',
      subsections: [
        {
          title: '¿Qué es JusticiapedIA?',
          content: 'Una plataforma cívica diseñada para promover la transparencia en los procesos de designación de autoridades judiciales en Guatemala, facilitando el acceso a información crucial sobre candidatos, instituciones y procesos de selección.'
        },
        {
          title: 'Objetivos',
          content: 'Promover la transparencia judicial, facilitar el acceso a información pública, y fomentar la participación ciudadana en los procesos de selección de autoridades judiciales.'
        }
      ]
    },
    {
      id: 'search',
      title: 'Búsqueda y Filtros',
      icon: Search,
      content: 'Aprende a utilizar las herramientas de búsqueda y filtrado para encontrar información específica.',
      subsections: [
        {
          title: 'Búsqueda Avanzada',
          content: 'Utiliza la barra de búsqueda para encontrar candidatos, instituciones o procesos específicos. Puedes buscar por nombre, cargo, institución o palabras clave.'
        },
        {
          title: 'Filtros',
          content: 'Refina tus resultados utilizando los filtros disponibles por institución, tipo de cargo, estado del proceso, entre otros.'
        }
      ]
    },
    {
      id: 'profiles',
      title: 'Perfiles y Datos',
      icon: Users,
      content: 'Explora perfiles detallados de candidatos e instituciones del sistema judicial.',
      subsections: [
        {
          title: 'Perfiles de Candidatos',
          content: 'Accede a información detallada sobre la formación académica, experiencia profesional, declaraciones patrimoniales y conexiones de los candidatos.'
        },
        {
          title: 'Perfiles Institucionales',
          content: 'Consulta información sobre la estructura, funciones, presupuesto y autoridades de las instituciones del sistema judicial.'
        }
      ]
    },
    {
      id: 'network',
      title: 'Mapas de Poder',
      icon: Network,
      content: 'Visualiza y analiza las conexiones entre actores del sistema judicial.',
      subsections: [
        {
          title: 'Visualización de Redes',
          content: 'Explora las relaciones entre candidatos, instituciones y otros actores relevantes mediante gráficos interactivos.'
        },
        {
          title: 'Análisis de Conexiones',
          content: 'Identifica patrones y relaciones significativas en el sistema judicial mediante herramientas de análisis de redes.'
        }
      ]
    },
    {
      id: 'participate',
      title: 'Cómo Participar',
      icon: HandHelping,
      content: 'Descubre las diferentes formas de contribuir a la transparencia judicial.',
      subsections: [
        {
          title: 'Aportar Información',
          content: 'Contribuye con documentos, datos o información relevante sobre candidatos o procesos de selección.'
        },
        {
          title: 'Verificación Ciudadana',
          content: 'Participa en la verificación y validación de información publicada en la plataforma.'
        }
      ]
    }
  ];

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.subsections?.some(sub =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <PageLayout
      title="Documentación"
      description="Guía completa sobre cómo utilizar la plataforma JusticiapedIA"
    >
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en la documentación..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
          />
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary-50 hover:bg-primary-100 transition-colors">
          <CardContent className="flex items-center p-6">
            <Building2 size={24} className="text-primary-600 mr-3" />
            <div>
              <h3 className="font-semibold text-primary-900">Guía de Inicio</h3>
              <p className="text-primary-700 text-sm">Primeros pasos en la plataforma</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary-50 hover:bg-primary-100 transition-colors">
          <CardContent className="flex items-center p-6">
            <FileText size={24} className="text-primary-600 mr-3" />
            <div>
              <h3 className="font-semibold text-primary-900">Tutoriales</h3>
              <p className="text-primary-700 text-sm">Videos y guías paso a paso</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-primary-50 hover:bg-primary-100 transition-colors">
          <CardContent className="flex items-center p-6">
            <HandHelping size={24} className="text-primary-600 mr-3" />
            <div>
              <h3 className="font-semibold text-primary-900">Soporte</h3>
              <p className="text-primary-700 text-sm">Centro de ayuda y contacto</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documentation Sections */}
      <div className="space-y-6">
        {filteredSections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <section.icon size={24} className="text-primary-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-gray-600">{section.content}</p>
                  </div>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 transition-transform ${
                    expandedSection === section.id ? 'transform rotate-180' : ''
                  }`}
                />
              </Button>
              
              {expandedSection === section.id && section.subsections && (
                <div className="border-t">
                  {section.subsections.map((subsection, index) => (
                    <div
                      key={index}
                      className="p-6 border-b last:border-b-0 bg-gray-50"
                    >
                      <h4 className="text-md font-semibold text-gray-900 mb-2">
                        {subsection.title}
                      </h4>
                      <p className="text-gray-600">{subsection.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredSections.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Book size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 mb-4">
            No se encontraron resultados para tu búsqueda.
          </p>
          <Button
            variant="outline"
            onClick={() => setSearchQuery('')}
          >
            Limpiar búsqueda
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default Documentation;