import React, { useState } from 'react';
import { BookOpen, FileText, Image, Video, HelpCircle, GraduationCap, Lightbulb, ChevronDown, ChevronUp, Play, Download, ExternalLink } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Learn: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const guides = [
    {
      title: '¿Qué es la independencia judicial?',
      description: 'Descubre por qué la independencia judicial es fundamental para el Estado de Derecho y la democracia.',
      duration: '5 min',
      level: 'Básico',
      icon: BookOpen,
      topics: ['Independencia judicial', 'Estado de Derecho', 'Democracia']
    },
    {
      title: '¿Cómo funcionan las Comisiones de Postulación?',
      description: 'Entiende el proceso de selección de jueces y magistrados en Guatemala.',
      duration: '8 min',
      level: 'Intermedio',
      icon: FileText,
      topics: ['Comisiones', 'Proceso de selección', 'Transparencia']
    },
    {
      title: '¿Por qué es importante la transparencia judicial?',
      description: 'Conoce cómo la transparencia fortalece la confianza en el sistema de justicia.',
      duration: '6 min',
      level: 'Básico',
      icon: Lightbulb,
      topics: ['Transparencia', 'Rendición de cuentas', 'Participación ciudadana']
    },
    {
      title: 'El sistema de justicia en Guatemala',
      description: 'Una introducción completa a las instituciones y su funcionamiento.',
      duration: '12 min',
      level: 'Básico',
      icon: GraduationCap,
      topics: ['Sistema judicial', 'Instituciones', 'Organización']
    },
    {
      title: 'Derechos ciudadanos ante la justicia',
      description: 'Conoce tus derechos y cómo ejercerlos en procesos judiciales.',
      duration: '7 min',
      level: 'Básico',
      icon: BookOpen,
      topics: ['Derechos', 'Ciudadanía', 'Acceso a la justicia']
    },
    {
      title: 'La importancia del control ciudadano',
      description: 'Aprende cómo la participación ciudadana fortalece la democracia.',
      duration: '5 min',
      level: 'Básico',
      icon: Lightbulb,
      topics: ['Control ciudadano', 'Democracia', 'Participación']
    }
  ];

  const infographics = [
    {
      title: 'Proceso de elección de magistrados',
      description: 'Visualiza paso a paso cómo se eligen los magistrados de las altas cortes.',
      views: '2.5k',
      image: 'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Estructura del sistema de justicia',
      description: 'Un diagrama claro de las instituciones y sus relaciones.',
      views: '3.1k',
      image: 'https://images.pexels.com/photos/8111850/pexels-photo-8111850.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Línea de tiempo: Reformas judiciales',
      description: 'Historia de las principales reformas al sistema de justicia.',
      views: '1.8k',
      image: 'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Cómo denunciar irregularidades',
      description: 'Pasos claros para reportar problemas en el sistema judicial.',
      views: '4.2k',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const videos = [
    {
      title: 'Independencia judicial en 3 minutos',
      duration: '3:15',
      views: '5.2k',
      thumbnail: 'https://images.pexels.com/photos/7092397/pexels-photo-7092397.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: '¿Qué hacen las Comisiones de Postulación?',
      duration: '4:30',
      views: '3.8k',
      thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Transparencia: El derecho a saber',
      duration: '2:45',
      views: '4.5k',
      thumbnail: 'https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Tus derechos ante un tribunal',
      duration: '5:00',
      views: '6.1k',
      thumbnail: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const faqs = [
    {
      question: '¿Por qué es importante la independencia judicial?',
      answer: 'Porque garantiza que las decisiones se tomen con base en la ley y no en intereses políticos, económicos o personales. Una justicia independiente es esencial para proteger los derechos de todas las personas por igual y mantener el equilibrio entre los poderes del Estado.',
      featured: true
    },
    {
      question: '¿Qué son las Comisiones de Postulación?',
      answer: 'Son órganos colegiados encargados de evaluar y proponer candidatos para cargos de magistrados y jueces. Su función es garantizar que se seleccionen personas idóneas, con base en méritos profesionales y éticos, sin injerencias políticas.',
      featured: false
    },
    {
      question: '¿Cómo puedo acceder a información pública sobre justicia?',
      answer: 'Puedes solicitar información a través de la Ley de Acceso a la Información Pública. Las instituciones del sector justicia están obligadas a responder en un plazo de 10 días hábiles. También puedes consultar portales de transparencia y plataformas como Justiciapedia.',
      featured: false
    },
    {
      question: '¿Qué es la carrera judicial?',
      answer: 'Es el sistema que regula el ingreso, permanencia, promoción y retiro de jueces y magistrados. Busca garantizar que los operadores de justicia sean seleccionados por mérito y capacidad, y que permanezcan en sus cargos mientras cumplan con sus obligaciones.',
      featured: false
    },
    {
      question: '¿Cómo puedo participar en el control ciudadano de la justicia?',
      answer: 'Puedes informarte sobre procesos judiciales, monitorear el desempeño de instituciones, presentar denuncias cuando detectes irregularidades, y participar en espacios de diálogo y auditoría social. Plataformas como Justiciapedia facilitan este control ciudadano.',
      featured: false
    },
    {
      question: '¿Qué significa "transparencia judicial"?',
      answer: 'Es el principio que obliga a las instituciones de justicia a hacer pública la información sobre sus procesos, decisiones y funcionamiento. Permite que la ciudadanía conozca cómo se administra la justicia y pueda ejercer control democrático.',
      featured: false
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <PageLayout
      title="Aprende"
      description="Contenidos educativos sobre justicia, democracia y transparencia para todo público."
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-justice-900 rounded-2xl p-8 md:p-12 lg:p-16 mb-16 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-justice-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-justice-400 to-justice-600 rounded-2xl shadow-xl">
              <GraduationCap size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Aprender para participar
          </h1>
          <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
            Entender cómo funciona la justicia es el primer paso para defenderla. La sección <strong className="text-justice-300">Aprende</strong> ofrece contenidos educativos pensados para todo público, sin necesidad de conocimientos jurídicos previos.
          </p>
        </div>
      </div>

      {/* Guides Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-justice-50 rounded-full mb-3">
              <BookOpen size={18} className="text-justice-600" />
              <span className="text-sm font-semibold text-justice-700">Recursos Educativos</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Guías explicativas
            </h2>
            <p className="text-lg text-neutral-600">
              Materiales sencillos que explican conceptos clave del sector justicia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-neutral-100 hover:border-justice-300">
                <CardHeader className="bg-gradient-to-br from-justice-50 to-primary-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-justice-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={24} className="text-justice-600" />
                    </div>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-neutral-700 border border-neutral-200">
                      {guide.level}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-justice-700 transition-colors">{guide.title}</h3>
                  <p className="text-neutral-600 text-sm">{guide.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                    <span className="flex items-center">
                      <BookOpen size={16} className="mr-1" />
                      {guide.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-justice-100 text-justice-700 rounded-lg text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full border-justice-600 text-justice-600 hover:bg-justice-50">
                    Leer guía
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Infographics Section */}
      <div className="mb-16">
        <Card className="overflow-hidden border-2 border-neutral-100">
          <CardHeader className="bg-gradient-to-r from-primary-50 to-justice-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-3">
                  <Image size={18} className="text-primary-600" />
                  <span className="text-sm font-semibold text-primary-700">Contenido Visual</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Infografías</h2>
                <p className="text-lg text-neutral-700">
                  Contenidos visuales para comprender procesos complejos de forma rápida y clara
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infographics.map((infographic, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden bg-justice-100">
                    <img
                      src={infographic.image}
                      alt={infographic.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{infographic.views} vistas</span>
                        <Download size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-neutral-900 mb-2">{infographic.title}</h3>
                    <p className="text-neutral-600 text-sm mb-3">{infographic.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-justice-500">{infographic.views} vistas</span>
                      <Button variant="link" className="text-neutral-600">
                        Ver infografía
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Videos Section */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-justice-50 to-justice-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Videos cortos</h2>
                <p className="text-lg text-neutral-700">
                  Explicaciones breves y dinámicas sobre temas clave del sistema de justicia
                </p>
              </div>
              <Video size={40} className="text-justice-600 hidden md:block" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg shadow-md mb-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={28} className="text-justice-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-semibold text-justice-900 mb-1 group-hover:text-justice-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-justice-500">{video.views} reproducciones</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" className="border-justice-600 text-justice-600 hover:bg-justice-50">
                <Video size={20} className="mr-2" />
                Ver todos los videos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQs Section */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-justice-50 to-justice-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Preguntas frecuentes</h2>
                <p className="text-lg text-neutral-700">
                  Respuestas claras a dudas comunes de la ciudadanía
                </p>
              </div>
              <HelpCircle size={40} className="text-justice-600 hidden md:block" />
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                    faq.featured
                      ? 'border-justice-300 bg-gradient-to-r from-justice-50 to-justice-50'
                      : 'border-justice-200 bg-white hover:border-justice-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-start flex-1">
                      <HelpCircle
                        size={24}
                        className={`mr-4 flex-shrink-0 mt-1 ${
                          faq.featured ? 'text-justice-600' : 'text-justice-400'
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${
                          faq.featured ? 'text-justice-900' : 'text-justice-800'
                        }`}>
                          {faq.question}
                        </h3>
                        {faq.featured && (
                          <span className="inline-block mt-2 px-3 py-1 bg-justice-600 text-white text-xs font-medium rounded-full">
                            Destacada
                          </span>
                        )}
                      </div>
                    </div>
                    {openFaq === index ? (
                      <ChevronUp size={24} className="text-justice-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown size={24} className="text-justice-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className={`px-6 pb-6 pl-16 ${
                      faq.featured ? 'text-justice-800' : 'text-justice-700'
                    }`}>
                      <p className="leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inspirational CTA Section */}
      <div className="bg-gradient-to-br from-neutral-600 via-justice-700 to-justice-600 rounded-2xl p-10 md:p-14 text-center shadow-2xl">
        <div className="max-w-3xl mx-auto text-white">
          <Lightbulb size={56} className="mx-auto mb-6 text-neutral-100" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            El poder del conocimiento
          </h2>
          <p className="text-xl md:text-2xl text-justice-50 mb-10 leading-relaxed font-medium">
            Una ciudadanía informada es una ciudadanía con más poder para exigir justicia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-neutral-600 hover:bg-neutral-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-semibold px-8 py-4"
            >
              <GraduationCap size={24} className="mr-2" />
              Explorar contenidos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-neutral-600 transition-all font-semibold px-8 py-4"
            >
              <ExternalLink size={24} className="mr-2" />
              Compartir recursos
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Learn;


