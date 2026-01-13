import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, Clock, Mail, Phone, Globe, Users, Landmark } from 'lucide-react';
import ProfileLayout from '../components/layout/ProfileLayout';
import Card, { CardContent } from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import { institutions } from '../data/institutions';

const InstitutionProfile: React.FC = () => {
  const { institutionId } = useParams<{ institutionId: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [institutionId]);

  const institution = institutions.find(inst => inst.id === institutionId);

  if (isLoading) {
    return <Loading fullScreen text="Cargando información de la institución..." />;
  }

  if (!institution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 size={64} className="mx-auto text-justice-400 mb-4" />
          <h1 className="text-2xl font-bold text-justice-900 mb-2">Institución no encontrada</h1>
          <p className="text-justice-600 mb-4">La institución que buscas no existe o ha sido removida.</p>
          <Link
            to="/instituciones"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Ver todas las instituciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProfileLayout
      title={institution.name}
      subtitle={institution.type}
      imageUrl={institution.imageUrl}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Descripción */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Descripción</h2>
              <p className="text-justice-600 leading-relaxed">{institution.description}</p>
            </CardContent>
          </Card>

          {/* Misión y Visión */}
          {(institution.mission || institution.vision) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {institution.mission && (
                <Card>
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Landmark size={20} className="mr-2 text-primary-600" />
                      Misión
                    </h2>
                    <p className="text-justice-600 leading-relaxed">{institution.mission}</p>
                  </CardContent>
                </Card>
              )}
              {institution.vision && (
                <Card>
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Landmark size={20} className="mr-2 text-primary-600" />
                      Visión
                    </h2>
                    <p className="text-justice-600 leading-relaxed">{institution.vision}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Autoridades */}
          {institution.authorities && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Users size={20} className="mr-2 text-primary-600" />
                  Autoridades
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {institution.authorities.map((authority, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-justice-50 rounded-lg">
                      {authority.imageUrl ? (
                        <img
                          src={authority.imageUrl}
                          alt={authority.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-justice-200 flex items-center justify-center">
                          <Users size={24} className="text-justice-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-justice-900">{authority.name}</h3>
                        <p className="text-sm text-justice-600">{authority.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Presupuesto */}
          {institution.budget && (
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Presupuesto</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-justice-200">
                    <thead className="bg-justice-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-justice-500 uppercase tracking-wider">
                          Año
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-justice-500 uppercase tracking-wider">
                          Monto
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-justice-200">
                      {institution.budget.map((item, index) => (
                        <tr key={index} className="hover:bg-justice-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-justice-900">
                            {item.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-justice-900">
                            {new Intl.NumberFormat('es-GT', {
                              style: 'currency',
                              currency: item.currency,
                            }).format(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Información de Contacto */}
        <div className="space-y-6">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
              <div className="space-y-4">
                {institution.schedule && (
                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-primary-600 mt-1" />
                    <div>
                      <p className="font-medium text-justice-900">Horario de Atención</p>
                      <p className="text-justice-600">{institution.schedule}</p>
                      <p className="text-justice-600">{institution.workDays}</p>
                    </div>
                  </div>
                )}
                {institution.website && (
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-primary-600" />
                    <a
                      href={`https://${institution.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {institution.website}
                    </a>
                  </div>
                )}
                {institution.email && (
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-primary-600" />
                    <a
                      href={`mailto:${institution.email}`}
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {institution.email}
                    </a>
                  </div>
                )}
                {institution.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-primary-600" />
                    <a
                      href={`tel:${institution.phone}`}
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {institution.phone}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Enlaces Relacionados</h2>
              <div className="space-y-3">
                <Link
                  to="/leyes-aplicables"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 hover:underline p-2 rounded-md hover:bg-primary-50 transition-colors"
                >
                  <Landmark size={16} />
                  <span>Leyes Aplicables</span>
                </Link>
                <Link
                  to="/transparencia"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 hover:underline p-2 rounded-md hover:bg-primary-50 transition-colors"
                >
                  <Building2 size={16} />
                  <span>Portal de Transparencia</span>
                </Link>
                <Link
                  to="/instituciones"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 hover:underline p-2 rounded-md hover:bg-primary-50 transition-colors"
                >
                  <Building2 size={16} />
                  <span>Todas las Instituciones</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default InstitutionProfile;
