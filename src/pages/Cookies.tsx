import React, { useState } from 'react';
import { Cookie, Settings, Shield, BarChart3, Target, Globe } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Cookies: React.FC = () => {
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: true,
    functional: true,
    marketing: false
  });

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    // Here you would typically save preferences to localStorage or send to backend
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('Preferencias de cookies guardadas exitosamente');
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: 'Cookies Necesarias',
      description: 'Estas cookies son esenciales para el funcionamiento básico del sitio web.',
      icon: Shield,
      color: 'text-justice-600',
      bgColor: 'bg-justice-50',
      borderColor: 'border-justice-200',
      examples: ['Sesión de usuario', 'Preferencias de idioma', 'Seguridad del sitio'],
      canDisable: false
    },
    {
      id: 'functional',
      title: 'Cookies Funcionales',
      description: 'Mejoran la funcionalidad del sitio recordando tus preferencias.',
      icon: Settings,
      color: 'text-justice-600',
      bgColor: 'bg-justice-50',
      borderColor: 'border-justice-200',
      examples: ['Preferencias de búsqueda', 'Configuración de vista', 'Filtros guardados'],
      canDisable: true
    },
    {
      id: 'analytics',
      title: 'Cookies de Análisis',
      description: 'Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio.',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      examples: ['Google Analytics', 'Estadísticas de uso', 'Rendimiento del sitio'],
      canDisable: true
    },
    {
      id: 'marketing',
      title: 'Cookies de Marketing',
      description: 'Se utilizan para mostrar contenido relevante y personalizado.',
      icon: Target,
      color: 'text-justice-600',
      bgColor: 'bg-justice-50',
      borderColor: 'border-justice-200',
      examples: ['Publicidad personalizada', 'Seguimiento de conversiones', 'Redes sociales'],
      canDisable: true
    }
  ];

  return (
    <PageLayout
      title="Política de Cookies"
      description="Información sobre cómo JusticiapedIA utiliza cookies y tecnologías similares."
    >
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Cookie size={32} className="text-primary-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-primary-900">Política de Cookies</h2>
                <p className="text-primary-700">Última actualización: Enero 2024</p>
              </div>
            </div>
            <p className="text-primary-800 leading-relaxed">
              Esta política explica qué son las cookies, cómo las utilizamos en JusticiapedIA, 
              y cómo puedes controlar su uso para mejorar tu experiencia en nuestro sitio web.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Globe size={24} className="mr-3 text-justice-600" />
                ¿Qué son las Cookies?
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-justice-700">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
                  cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar 
                  tu experiencia de navegación.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Cookies de Primera Parte</h4>
                    <p className="text-justice-700 text-sm">
                      Establecidas directamente por JusticiapedIA para el funcionamiento del sitio.
                    </p>
                  </div>
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Cookies de Terceros</h4>
                    <p className="text-justice-700 text-sm">
                      Establecidas por servicios externos como Google Analytics.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Types and Preferences */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Tipos de Cookies y Preferencias</h3>
              <p className="text-justice-600">
                Puedes controlar qué tipos de cookies aceptas. Las cookies necesarias no se pueden desactivar.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cookieTypes.map((type) => {
                  const Icon = type.icon;
                  const isEnabled = preferences[type.id as keyof typeof preferences];
                  
                  return (
                    <div key={type.id} className={`p-6 rounded-lg border-2 ${type.bgColor} ${type.borderColor}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Icon size={24} className={`mr-3 ${type.color}`} />
                          <div>
                            <h4 className="text-lg font-semibold text-justice-900">{type.title}</h4>
                            <p className="text-justice-700 text-sm mt-1">{type.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={() => handlePreferenceChange(type.id as keyof typeof preferences)}
                              disabled={!type.canDisable}
                              className="sr-only peer"
                            />
                            <div className={`relative w-11 h-6 rounded-full peer ${
                              !type.canDisable 
                                ? 'bg-justice-400 cursor-not-allowed' 
                                : isEnabled 
                                  ? 'bg-justice-600' 
                                  : 'bg-justice-200'
                            } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-justice-300 transition-colors`}>
                              <div className={`absolute top-[2px] left-[2px] bg-white border border-justice-300 rounded-full h-5 w-5 transition-transform ${
                                isEnabled ? 'translate-x-full' : ''
                              }`}></div>
                            </div>
                          </label>
                          {!type.canDisable && (
                            <span className="ml-2 text-xs text-justice-500">Requeridas</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-justice-900 mb-2">Ejemplos de uso:</h5>
                        <ul className="list-disc list-inside text-justice-700 text-sm space-y-1">
                          {type.examples.map((example, index) => (
                            <li key={index}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-6 border-t border-justice-200">
                <Button
                  onClick={savePreferences}
                  variant="primary"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Guardar Preferencias
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Cookies Específicas que Utilizamos</h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-justice-200">
                  <thead className="bg-justice-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-justice-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-justice-500 uppercase tracking-wider">
                        Propósito
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-justice-500 uppercase tracking-wider">
                        Duración
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-justice-500 uppercase tracking-wider">
                        Tipo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-justice-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-justice-900">
                        _session
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        Mantener la sesión del usuario
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        Sesión
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-justice-100 text-justice-800">
                          Necesaria
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-justice-900">
                        cookiePreferences
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        Recordar preferencias de cookies
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        1 año
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-justice-100 text-justice-800">
                          Necesaria
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-justice-900">
                        _ga
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        Google Analytics - Identificar usuarios únicos
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        2 años
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Análisis
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-justice-900">
                        searchPrefs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        Recordar preferencias de búsqueda
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-500">
                        30 días
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-justice-100 text-justice-800">
                          Funcional
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Cómo Controlar las Cookies</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Configuración del Navegador</h4>
                  <p className="text-justice-700 mb-3">
                    Puedes controlar y eliminar cookies a través de la configuración de tu navegador:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-justice-50 rounded-lg">
                      <h5 className="font-medium text-justice-900 mb-1">Chrome</h5>
                      <p className="text-justice-700 text-sm">
                        Configuración → Privacidad y seguridad → Cookies
                      </p>
                    </div>
                    <div className="p-4 bg-justice-50 rounded-lg">
                      <h5 className="font-medium text-justice-900 mb-1">Firefox</h5>
                      <p className="text-justice-700 text-sm">
                        Opciones → Privacidad y seguridad → Cookies
                      </p>
                    </div>
                    <div className="p-4 bg-justice-50 rounded-lg">
                      <h5 className="font-medium text-justice-900 mb-1">Safari</h5>
                      <p className="text-justice-700 text-sm">
                        Preferencias → Privacidad → Cookies
                      </p>
                    </div>
                    <div className="p-4 bg-justice-50 rounded-lg">
                      <h5 className="font-medium text-justice-900 mb-1">Edge</h5>
                      <p className="text-justice-700 text-sm">
                        Configuración → Privacidad → Cookies
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-justice-50 p-4 rounded-lg border border-justice-200">
                  <p className="text-justice-800 text-sm">
                    <strong>Nota:</strong> Deshabilitar ciertas cookies puede afectar 
                    la funcionalidad del sitio web y tu experiencia de usuario.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Actualizaciones de esta Política</h3>
            </CardHeader>
            <CardContent>
              <p className="text-justice-700">
                Podemos actualizar esta política de cookies ocasionalmente para reflejar 
                cambios en nuestras prácticas o por razones operativas, legales o regulatorias. 
                Te recomendamos revisar esta página periódicamente.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">¿Tienes Preguntas sobre Cookies?</h3>
              <p className="text-primary-100 mb-4">
                Si tienes preguntas sobre nuestra política de cookies o necesitas más información, 
                no dudes en contactarnos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:cookies@justiciapedia.org.gt"
                  className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-justice-100 transition-colors"
                >
                  Contactar por Email
                </a>
                <a
                  href="/contacto"
                  className="inline-flex items-center px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
                >
                  Formulario de Contacto
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cookies;

