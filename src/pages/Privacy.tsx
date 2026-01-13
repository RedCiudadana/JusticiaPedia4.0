import React from 'react';
import { Shield, Eye, Lock, Users, Database, Globe } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';

const Privacy: React.FC = () => {
  return (
    <PageLayout
      title="Política de Privacidad"
      description="Conoce cómo JusticiapedIA protege y maneja tu información personal."
    >
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Shield size={32} className="text-primary-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-primary-900">Tu Privacidad es Importante</h2>
                <p className="text-primary-700">Última actualización: Enero 2024</p>
              </div>
            </div>
            <p className="text-primary-800 leading-relaxed">
              En JusticiapedIA, nos comprometemos a proteger tu privacidad y manejar tus datos 
              personales de manera responsable y transparente. Esta política explica cómo 
              recopilamos, usamos y protegemos tu información.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Database size={24} className="mr-3 text-justice-600" />
                Información que Recopilamos
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Información Personal</h4>
                  <ul className="list-disc list-inside text-justice-700 space-y-1">
                    <li>Nombre y dirección de correo electrónico (cuando te contactas con nosotros)</li>
                    <li>Información de contacto voluntaria en formularios</li>
                    <li>Comentarios y contribuciones que envíes a la plataforma</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Información Técnica</h4>
                  <ul className="list-disc list-inside text-justice-700 space-y-1">
                    <li>Dirección IP y ubicación geográfica aproximada</li>
                    <li>Tipo de navegador y sistema operativo</li>
                    <li>Páginas visitadas y tiempo de permanencia</li>
                    <li>Cookies y tecnologías similares</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Eye size={24} className="mr-3 text-justice-600" />
                Cómo Usamos tu Información
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Propósitos Principales</h4>
                  <ul className="list-disc list-inside text-justice-700 space-y-1">
                    <li>Proporcionar y mejorar nuestros servicios</li>
                    <li>Responder a tus consultas y solicitudes</li>
                    <li>Enviar actualizaciones importantes sobre la plataforma</li>
                    <li>Analizar el uso del sitio para mejoras</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Base Legal</h4>
                  <p className="text-justice-700">
                    Procesamos tu información basándonos en tu consentimiento, nuestros intereses 
                    legítimos en proporcionar servicios de transparencia judicial, y el cumplimiento 
                    de obligaciones legales.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Lock size={24} className="mr-3 text-purple-600" />
                Protección de Datos
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Medidas de Seguridad</h4>
                  <ul className="list-disc list-inside text-justice-700 space-y-1">
                    <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                    <li>Acceso restringido a datos personales</li>
                    <li>Monitoreo regular de seguridad</li>
                    <li>Copias de seguridad seguras y regulares</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Retención de Datos</h4>
                  <p className="text-justice-700">
                    Conservamos tu información personal solo durante el tiempo necesario para 
                    cumplir con los propósitos descritos en esta política, a menos que la ley 
                    requiera un período de retención más largo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Users size={24} className="mr-3 text-justice-600" />
                Tus Derechos
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-justice-700">
                  Tienes los siguientes derechos respecto a tu información personal:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Acceso</h4>
                    <p className="text-justice-700 text-sm">
                      Solicitar una copia de la información personal que tenemos sobre ti.
                    </p>
                  </div>
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Rectificación</h4>
                    <p className="text-justice-700 text-sm">
                      Solicitar la corrección de información inexacta o incompleta.
                    </p>
                  </div>
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Eliminación</h4>
                    <p className="text-justice-700 text-sm">
                      Solicitar la eliminación de tu información personal.
                    </p>
                  </div>
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Portabilidad</h4>
                    <p className="text-justice-700 text-sm">
                      Recibir tus datos en un formato estructurado y legible.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Globe size={24} className="mr-3 text-justice-600" />
                Compartir Información
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-justice-700">
                  No vendemos, alquilamos ni compartimos tu información personal con terceros, 
                  excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc list-inside text-justice-700 space-y-1">
                  <li>Con tu consentimiento explícito</li>
                  <li>Para cumplir con obligaciones legales</li>
                  <li>Para proteger nuestros derechos legales</li>
                  <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Cookies y Tecnologías Similares</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-justice-700">
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia en 
                  nuestro sitio web. Puedes controlar el uso de cookies a través de la 
                  configuración de tu navegador.
                </p>
                <div className="bg-justice-50 p-4 rounded-lg border border-justice-200">
                  <p className="text-justice-800 text-sm">
                    Para más información sobre nuestro uso de cookies, consulta nuestra{' '}
                    <a href="/legal/cookies" className="underline hover:text-justice-900">
                      Política de Cookies
                    </a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Cambios a esta Política</h3>
            </CardHeader>
            <CardContent>
              <p className="text-justice-700">
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
                sobre cambios significativos publicando la nueva política en nuestro sitio web 
                y actualizando la fecha de "última actualización".
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">¿Tienes Preguntas?</h3>
              <p className="text-primary-100 mb-4">
                Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos 
                tu información personal, no dudes en contactarnos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:privacidad@justiciapedia.org.gt"
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

export default Privacy;

