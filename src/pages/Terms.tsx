import React from 'react';
import { FileText, AlertTriangle, Scale, Users, Shield, Globe } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';

const Terms: React.FC = () => {
  return (
    <PageLayout
      title="Términos y Condiciones"
      description="Términos de uso y condiciones para el uso de la plataforma JusticiapedIA."
    >
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Scale size={32} className="text-primary-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-primary-900">Términos y Condiciones de Uso</h2>
                <p className="text-primary-700">Última actualización: Enero 2024</p>
              </div>
            </div>
            <p className="text-primary-800 leading-relaxed">
              Estos términos y condiciones rigen el uso de la plataforma JusticiapedIA. 
              Al acceder y utilizar nuestros servicios, aceptas cumplir con estos términos.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <FileText size={24} className="mr-3 text-justice-600" />
                Aceptación de los Términos
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-justice-700">
                  Al acceder y utilizar JusticiapedIA, confirmas que:
                </p>
                <ul className="list-disc list-inside text-justice-700 space-y-2">
                  <li>Tienes al menos 18 años de edad o cuentas con el consentimiento de tus padres/tutores</li>
                  <li>Tienes la capacidad legal para celebrar estos términos</li>
                  <li>Utilizarás la plataforma de manera responsable y legal</li>
                  <li>Proporcionarás información veraz y actualizada cuando sea requerida</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Globe size={24} className="mr-3 text-justice-600" />
                Descripción del Servicio
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-justice-700">
                  JusticiapedIA es una plataforma de transparencia judicial que proporciona:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Información Pública</h4>
                    <p className="text-justice-700 text-sm">
                      Acceso a datos sobre procesos de selección judicial y candidatos.
                    </p>
                  </div>
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Análisis y Reportes</h4>
                    <p className="text-justice-700 text-sm">
                      Estudios y análisis sobre el sistema judicial guatemalteco.
                    </p>
                  </div>
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Herramientas de Búsqueda</h4>
                    <p className="text-justice-700 text-sm">
                      Funcionalidades para encontrar información específica.
                    </p>
                  </div>
                  <div className="p-4 bg-justice-50 rounded-lg">
                    <h4 className="font-semibold text-justice-900 mb-2">Participación Ciudadana</h4>
                    <p className="text-justice-700 text-sm">
                      Canales para contribuir con información y retroalimentación.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Users size={24} className="mr-3 text-purple-600" />
                Uso Aceptable
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Usos Permitidos</h4>
                  <ul className="list-disc list-inside text-justice-700 space-y-1">
                    <li>Consultar información pública sobre el sistema judicial</li>
                    <li>Realizar investigaciones académicas o periodísticas</li>
                    <li>Contribuir con información verificable y relevante</li>
                    <li>Compartir contenido de la plataforma con atribución adecuada</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Usos Prohibidos</h4>
                  <ul className="list-disc list-inside text-justice-700 space-y-1">
                    <li>Publicar información falsa, difamatoria o maliciosa</li>
                    <li>Intentar acceder a sistemas o datos no autorizados</li>
                    <li>Usar la plataforma para actividades ilegales</li>
                    <li>Interferir con el funcionamiento normal del servicio</li>
                    <li>Violar derechos de propiedad intelectual</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <Shield size={24} className="mr-3 text-justice-600" />
                Propiedad Intelectual
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Contenido de JusticiapedIA</h4>
                  <p className="text-justice-700">
                    El diseño, estructura, selección, coordinación, expresión, "aspecto y sensación" 
                    y disposición de todo el contenido incluido en la plataforma está protegido por 
                    derechos de autor y otras leyes de propiedad intelectual.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Contenido del Usuario</h4>
                  <p className="text-justice-700">
                    Al enviar contenido a JusticiapedIA, otorgas una licencia no exclusiva, 
                    libre de regalías, perpetua e irrevocable para usar, reproducir, modificar, 
                    adaptar, publicar, traducir y distribuir dicho contenido.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Datos Públicos</h4>
                  <p className="text-justice-700">
                    La información pública gubernamental presentada en la plataforma está 
                    disponible bajo los términos de acceso a la información pública de Guatemala.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center">
                <AlertTriangle size={24} className="mr-3 text-justice-600" />
                Limitación de Responsabilidad
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-justice-50 p-4 rounded-lg border border-justice-200">
                  <div className="flex items-start">
                    <AlertTriangle size={20} className="text-justice-600 mr-3 mt-0.5" />
                    <div className="text-sm text-justice-800">
                      <p className="font-medium mb-1">Aviso Importante</p>
                      <p>
                        La información en JusticiapedIA se proporciona "tal como está" y 
                        "según disponibilidad", sin garantías de ningún tipo.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Exención de Garantías</h4>
                  <p className="text-justice-700">
                    No garantizamos que la información sea completamente precisa, actualizada 
                    o libre de errores. Los usuarios deben verificar independientemente 
                    cualquier información antes de tomar decisiones basadas en ella.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Limitación de Daños</h4>
                  <p className="text-justice-700">
                    En ningún caso JusticiapedIA será responsable por daños directos, 
                    indirectos, incidentales, especiales o consecuentes que resulten 
                    del uso o la imposibilidad de usar la plataforma.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Modificaciones y Terminación</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Modificaciones del Servicio</h4>
                  <p className="text-justice-700">
                    Nos reservamos el derecho de modificar, suspender o discontinuar 
                    cualquier aspecto de la plataforma en cualquier momento, con o sin previo aviso.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Modificaciones de los Términos</h4>
                  <p className="text-justice-700">
                    Podemos actualizar estos términos ocasionalmente. Los cambios significativos 
                    serán notificados a través de la plataforma o por correo electrónico.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-justice-900 mb-2">Terminación</h4>
                  <p className="text-justice-700">
                    Podemos terminar o suspender tu acceso a la plataforma inmediatamente, 
                    sin previo aviso, por cualquier motivo, incluyendo el incumplimiento 
                    de estos términos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Ley Aplicable y Jurisdicción</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-justice-700">
                  Estos términos se rigen por las leyes de Guatemala. Cualquier disputa 
                  relacionada con estos términos o el uso de la plataforma será resuelta 
                  en los tribunales competentes de Guatemala.
                </p>
                <div className="bg-justice-50 p-4 rounded-lg border border-justice-200">
                  <p className="text-justice-800 text-sm">
                    <strong>Resolución de Disputas:</strong> Antes de iniciar cualquier 
                    procedimiento legal, las partes intentarán resolver las disputas 
                    mediante negociación directa y mediación.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Contacto</h3>
              <p className="text-primary-100 mb-4">
                Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos:
              </p>
              <div className="space-y-2 text-primary-100">
                <p>Email: legal@justiciapedia.org.gt</p>
                <p>Teléfono: +502 2233-4455</p>
                <p>Dirección: Ciudad de Guatemala, Guatemala</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;

