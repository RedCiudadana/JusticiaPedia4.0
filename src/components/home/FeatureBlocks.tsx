import React from 'react';
import { Users, Search, FileText, ArrowRight, Scale, Building2 } from 'lucide-react';
import Container from '../ui/Container';

const FeatureBlocks: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Explora Perfiles',
      description: 'Conoce a los aspirantes a puestos clave en el sistema judicial guatemalteco. Accede a información verificada sobre su trayectoria.',
      link: '/candidatos',
      color: 'primary',
    },
    {
      icon: Users,
      title: 'Sigue las Comisiones',
      description: 'Mantente informado sobre los procesos de postulación y selección de magistrados y funcionarios judiciales.',
      link: '/comisiones',
      color: 'accent',
    },
    {
      icon: Building2,
      title: 'Instituciones',
      description: 'Descubre las instituciones que conforman el sistema de justicia y su rol en la democracia guatemalteca.',
      link: '/instituciones',
      color: 'justice',
    },
    {
      icon: FileText,
      title: 'Notas de Interés',
      description: 'Lee las últimas noticias, análisis y reportajes sobre el sistema judicial y los procesos de selección.',
      link: '/noticias',
      color: 'secondary',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; hover: string; border: string }> = {
      primary: {
        bg: 'from-justice-50 to-justice-100',
        icon: 'text-justice-600',
        hover: 'group-hover:text-justice-700',
        border: 'hover:border-justice-300',
      },
      accent: {
        bg: 'from-justice-50 to-justice-100',
        icon: 'text-justice-600',
        hover: 'group-hover:text-justice-700',
        border: 'hover:border-justice-300',
      },
      justice: {
        bg: 'from-justice-50 to-justice-100',
        icon: 'text-justice-700',
        hover: 'group-hover:text-justice-700',
        border: 'hover:border-justice-300',
      },
      secondary: {
        bg: 'from-justice-50 to-justice-100',
        icon: 'text-justice-700',
        hover: 'group-hover:text-justice-700',
        border: 'hover:border-justice-300',
      },
    };
    return colors[color] || colors.primary;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
            <Scale size={18} className="text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Explora la Plataforma</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Accede a información clave del sector justicia
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Herramientas diseñadas para facilitar el acceso ciudadano a la información pública
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = getColorClasses(feature.color);
            return (
              <a
                key={index}
                href={feature.link}
                className={`group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-neutral-100 ${colorClasses.border}`}
              >
                <div className={`h-14 w-14 bg-gradient-to-br ${colorClasses.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className={colorClasses.icon} />
                </div>
                <h3 className={`text-xl font-bold mb-3 text-neutral-900 ${colorClasses.hover} transition-colors`}>
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4 text-sm">
                  {feature.description}
                </p>
                <div className={`flex items-center gap-2 ${colorClasses.icon} font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span>Explorar</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeatureBlocks;
