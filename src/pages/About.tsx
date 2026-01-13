import React from 'react';
import { Users, Target, Eye, Heart, Award, Globe, Mail, Linkedin } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'María González',
      role: 'Directora Ejecutiva',
      bio: 'Abogada especializada en transparencia judicial con más de 15 años de experiencia.',
      imageUrl: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg',
      linkedin: '#'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Director de Investigación',
      bio: 'Doctor en Derecho Constitucional, experto en análisis de sistemas judiciales.',
      imageUrl: 'https://images.pexels.com/photos/8422403/pexels-photo-8422403.jpeg',
      linkedin: '#'
    },
    {
      name: 'Ana Rodríguez',
      role: 'Coordinadora de Tecnología',
      bio: 'Ingeniera en sistemas con especialización en plataformas de transparencia.',
      imageUrl: 'https://images.pexels.com/photos/6866174/pexels-photo-6866174.jpeg',
      linkedin: '#'
    },
    {
      name: 'Luis Hernández',
      role: 'Analista de Datos',
      bio: 'Especialista en análisis de datos judiciales y visualización de información.',
      imageUrl: 'https://images.pexels.com/photos/8422230/pexels-photo-8422230.jpeg',
      linkedin: '#'
    }
  ];

  const partners = [
    {
      name: 'Fundación Myrna Mack',
      description: 'Organización dedicada a la promoción de los derechos humanos y la justicia.',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      name: 'Instituto de Estudios Estratégicos',
      description: 'Centro de investigación en políticas públicas y gobernanza.',
      logo: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg'
    },
    {
      name: 'Red Ciudadana',
      description: 'Organización que promueve la participación ciudadana y la transparencia.',
      logo: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg'
    }
  ];

  return (
    <PageLayout
      title="Acerca de JusticiapedIA"
      description="Conoce nuestra misión, visión y el equipo detrás de la plataforma de transparencia judicial."
    >
      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <CardHeader>
            <h2 className="text-2xl font-bold text-primary-900 flex items-center">
              <Target size={24} className="mr-3" />
              Nuestra Misión
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-primary-800 leading-relaxed">
              Promover la transparencia y la rendición de cuentas en el sistema judicial guatemalteco 
              mediante el acceso a información verificada sobre los procesos de designación de autoridades 
              judiciales, fortaleciendo así la confianza ciudadana en las instituciones de justicia.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-justice-50 to-justice-100 border-justice-200">
          <CardHeader>
            <h2 className="text-2xl font-bold text-justice-900 flex items-center">
              <Eye size={24} className="mr-3" />
              Nuestra Visión
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-justice-800 leading-relaxed">
              Ser la plataforma de referencia en transparencia judicial en Guatemala, contribuyendo 
              a la construcción de un sistema de justicia independiente, íntegro y accesible para 
              todos los ciudadanos, donde la información sea un derecho ejercido plenamente.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <Card className="mb-12">
        <CardHeader>
          <h2 className="text-2xl font-bold text-justice-900 flex items-center">
            <Heart size={24} className="mr-3 text-justice-500" />
            Nuestros Valores
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-justice-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={24} className="text-justice-600" />
              </div>
              <h3 className="font-semibold text-justice-900 mb-2">Transparencia</h3>
              <p className="text-justice-600 text-sm">
                Creemos en el acceso libre y abierto a la información pública.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-justice-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-justice-600" />
              </div>
              <h3 className="font-semibold text-justice-900 mb-2">Integridad</h3>
              <p className="text-justice-600 text-sm">
                Mantenemos los más altos estándares éticos en nuestro trabajo.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-justice-900 mb-2">Participación</h3>
              <p className="text-justice-600 text-sm">
                Fomentamos la participación ciudadana activa e informada.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-justice-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={24} className="text-justice-600" />
              </div>
              <h3 className="font-semibold text-justice-900 mb-2">Excelencia</h3>
              <p className="text-justice-600 text-sm">
                Nos comprometemos con la calidad y precisión en toda nuestra información.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="mb-12">
        <CardHeader>
          <h2 className="text-2xl font-bold text-justice-900 flex items-center">
            <Users size={24} className="mr-3 text-primary-600" />
            Nuestro Equipo
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-justice-200"
                />
                <h3 className="font-semibold text-justice-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-justice-600 text-sm mb-3">{member.bio}</p>
                <a
                  href={member.linkedin}
                  className="inline-flex items-center text-justice-600 hover:text-justice-700 text-sm"
                >
                  <Linkedin size={16} className="mr-1" />
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Partners */}
      <Card className="mb-12">
        <CardHeader>
          <h2 className="text-2xl font-bold text-justice-900">Nuestros Aliados</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="text-center p-6 border border-justice-200 rounded-lg hover:shadow-md transition-shadow">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-justice-900 mb-2">{partner.name}</h3>
                <p className="text-justice-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-primary-600 text-white">
        <CardContent className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">¿Quieres colaborar con nosotros?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Si compartes nuestra visión de un sistema judicial más transparente y quieres 
            contribuir a nuestro trabajo, nos encantaría conocerte.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 hover:bg-justice-100"
            onClick={() => window.location.href = '/contacto'}
          >
            <Mail size={20} className="mr-2" />
            Contáctanos
          </Button>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default About;


