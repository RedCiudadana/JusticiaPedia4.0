import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FileText, Building2, GraduationCap, User, ArrowLeft, Award, BookOpen, Languages, ExternalLink, Calendar, MapPin, Star, Globe, Info, Briefcase, Mail, Phone } from 'lucide-react';
import ProfileLayout from '../components/layout/ProfileLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';
import SocialShare from '../components/ui/SocialShare';
import { candidates } from '../data/candidates';

const CandidateProfile: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [candidateId]);

  const candidate = candidates.find(c => c.id === candidateId);

  if (isLoading) {
    return <Loading fullScreen text="Cargando perfil del aspirante..." />;
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User size={64} className="mx-auto text-justice-400 mb-4" />
          <h1 className="text-2xl font-bold text-justice-900 mb-2">Aspirante no encontrado</h1>
          <p className="text-justice-600 mb-4">El aspirante que buscas no existe o ha sido removido.</p>
          <Link
            to="/candidatos"
            className="inline-flex items-center px-4 py-2 bg-justice-600 text-white rounded-md hover:bg-justice-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Ver todos los aspirantes
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: User },
    { id: 'experience', label: 'Experiencia', icon: Briefcase },
    { id: 'education', label: 'Formación Académica', icon: GraduationCap },
    { id: 'achievements', label: 'Logros', icon: Award },
    { id: 'documents', label: 'Documentos', icon: FileText },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      case 'Inactivo':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      case 'Retirado':
        return 'bg-justice-100 text-justice-800 border-justice-200';
      default:
        return 'bg-justice-100 text-justice-800 border-justice-200';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-justice-50 to-justice-100 border-justice-200">
                <CardContent className="p-6 text-center">
                  <Briefcase className="mx-auto mb-3 text-justice-600" size={32} />
                  <div className="text-2xl font-bold text-justice-700 mb-1">{candidate.yearsOfExperience}</div>
                  <div className="text-justice-600 text-sm font-medium">Años de Experiencia</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-justice-50 to-justice-100 border-justice-200">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="mx-auto mb-3 text-justice-600" size={32} />
                  <div className="text-2xl font-bold text-justice-700 mb-1">{candidate.education?.length || 0}</div>
                  <div className="text-justice-600 text-sm font-medium">Títulos Académicos</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-6 text-center">
                  <Award className="mx-auto mb-3 text-amber-600" size={32} />
                  <div className="text-2xl font-bold text-amber-700 mb-1">{candidate.specialization}</div>
                  <div className="text-amber-600 text-sm font-medium">Especialización</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold text-justice-900 flex items-center">
                  <User size={24} className="mr-3 text-justice-600" />
                  Información General
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div className="border-b border-justice-100 pb-4">
                      <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Nombre Completo</label>
                      <p className="text-justice-900 font-semibold text-lg">{candidate.name}</p>
                    </div>
                    <div className="border-b border-justice-100 pb-4">
                      <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Cargo al que Aspira</label>
                      <p className="text-justice-900 font-medium">{candidate.role}</p>
                    </div>
                    <div className="border-b border-justice-100 pb-4">
                      <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Institución</label>
                      <div className="flex items-center text-justice-900 font-medium">
                        <Building2 size={16} className="mr-2 text-justice-600" />
                        {candidate.institution}
                      </div>
                    </div>
                    {candidate.commission && (
                      <div className="border-b border-justice-100 pb-4">
                        <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Comisión</label>
                        <p className="text-justice-900 font-medium">{candidate.commission}</p>
                      </div>
                    )}
                    {candidate.profession && (
                      <div className="border-b border-justice-100 pb-4">
                        <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Profesión</label>
                        <p className="text-justice-900 font-medium">{candidate.profession}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-5">
                    <div className="border-b border-justice-100 pb-4">
                      <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Estado</label>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </div>
                    {candidate.gender && (
                      <div className="border-b border-justice-100 pb-4">
                        <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Sexo</label>
                        <p className="text-justice-900 font-medium">{candidate.gender}</p>
                      </div>
                    )}
                    {candidate.maritalStatus && (
                      <div className="border-b border-justice-100 pb-4">
                        <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Estado Civil</label>
                        <p className="text-justice-900 font-medium">{candidate.maritalStatus}</p>
                      </div>
                    )}
                    {candidate.barAssociationNumber && (
                      <div className="border-b border-justice-100 pb-4">
                        <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">No. Colegiado</label>
                        <p className="text-justice-900 font-mono font-bold text-justice-600">{candidate.barAssociationNumber}</p>
                      </div>
                    )}
                    {candidate.department && (
                      <div className="border-b border-justice-100 pb-4">
                        <label className="block text-xs font-semibold text-justice-500 uppercase tracking-wide mb-2">Departamento</label>
                        <div className="flex items-center text-justice-900 font-medium">
                          <MapPin size={16} className="mr-2 text-justice-600" />
                          {candidate.department}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {(candidate.summary || candidate.description) && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-justice-50 to-indigo-50 rounded-lg border border-justice-100">
                    <label className="block text-sm font-bold text-justice-900 mb-3">Perfil Profesional</label>
                    <p className="text-justice-800 leading-relaxed whitespace-pre-wrap">{candidate.summary || candidate.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {candidate.humanProjection && (
              <Card className="border-l-4 border-l-justice-600">
                <CardHeader>
                  <h3 className="text-xl font-bold text-justice-900 flex items-center">
                    <Star size={24} className="mr-3 text-amber-500" />
                    Proyección Humana
                  </h3>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const items = candidate.humanProjection.split(/[|\.]/).map(item => item.trim()).filter(item => item);
                    if (items.length > 1) {
                      return (
                        <ul className="list-disc list-inside text-justice-800 leading-relaxed text-lg space-y-2">
                          {items.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                      );
                    } else {
                      return <p className="text-justice-800 leading-relaxed whitespace-pre-wrap text-lg">{candidate.humanProjection}</p>;
                    }
                  })()}
                </CardContent>
              </Card>
            )}

            {candidate.certifications && candidate.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold text-justice-900 flex items-center">
                    <Award size={24} className="mr-3 text-justice-600" />
                    Certificaciones
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {candidate.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-justice-50 to-justice-50 rounded-lg border border-justice-200 hover:shadow-md transition-all">
                        <Award size={20} className="mr-3 text-justice-600 flex-shrink-0" />
                        <span className="text-justice-900 font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'experience':
        return (
          <Card className="border-l-4 border-l-justice-600">
            <CardHeader>
              <h3 className="text-xl font-bold text-justice-900 flex items-center">
                <Briefcase size={24} className="mr-3 text-justice-600" />
                Experiencia Profesional
              </h3>
            </CardHeader>
            <CardContent>
              {candidate.professionalExperience ? (
                <div className="prose max-w-none">
                  {(() => {
                    const items = candidate.professionalExperience.split(/[|\.]/).map(item => item.trim()).filter(item => item);
                    if (items.length > 1) {
                      return (
                        <ul className="list-disc list-inside text-justice-800 leading-relaxed text-lg space-y-2">
                          {items.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                      );
                    } else {
                      return <p className="text-justice-800 leading-relaxed whitespace-pre-wrap text-lg">{candidate.professionalExperience}</p>;
                    }
                  })()}
                </div>
              ) : candidate.experience && candidate.experience.length > 0 ? (
                <div className="space-y-8">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="relative pl-10 pb-8 border-l-2 border-justice-300 last:border-l-0 last:pb-0">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-justice-600 rounded-full ring-4 ring-justice-100"></div>
                      <div className="bg-gradient-to-br from-white to-justice-50 p-6 rounded-lg shadow-sm border border-justice-100 hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-justice-900 text-xl mb-2">{exp.position}</h4>
                        <p className="text-justice-600 font-semibold mb-3 flex items-center">
                          <Building2 size={16} className="mr-2" />
                          {exp.institution}
                        </p>
                        <div className="flex items-center text-sm text-justice-600 mb-4 bg-white px-3 py-2 rounded-md inline-flex">
                          <Calendar size={16} className="mr-2 text-justice-600" />
                          <span className="font-medium">{exp.period}</span>
                        </div>
                        <p className="text-justice-700 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase size={48} className="mx-auto text-justice-300 mb-4" />
                  <p className="text-justice-500 italic">No se ha proporcionado información de experiencia profesional.</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'education':
        return (
          <Card className="border-l-4 border-l-justice-600">
            <CardHeader>
              <h3 className="text-xl font-bold text-justice-900 flex items-center">
                <GraduationCap size={24} className="mr-3 text-justice-600" />
                Formación Académica
              </h3>
            </CardHeader>
            <CardContent>
              {candidate.academicExperience ? (
                <div className="prose max-w-none">
                  {(() => {
                    const items = candidate.academicExperience.split(/[|\.]/).map(item => item.trim()).filter(item => item);
                    if (items.length > 1) {
                      return (
                        <ul className="list-disc list-inside text-justice-800 leading-relaxed text-lg space-y-2">
                          {items.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                      );
                    } else {
                      return <p className="text-justice-800 leading-relaxed whitespace-pre-wrap text-lg">{candidate.academicExperience}</p>;
                    }
                  })()}
                </div>
              ) : candidate.education && candidate.education.length > 0 ? (
                <div className="space-y-8">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="relative pl-10 pb-8 border-l-2 border-justice-300 last:border-l-0 last:pb-0">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-justice-600 rounded-full ring-4 ring-justice-100"></div>
                      <div className="bg-gradient-to-br from-white to-justice-50 p-6 rounded-lg shadow-sm border border-justice-100 hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-justice-900 text-xl mb-2">{edu.degree}</h4>
                        <p className="text-justice-600 font-semibold mb-3 flex items-center">
                          <GraduationCap size={16} className="mr-2" />
                          {edu.institution}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-justice-600 bg-white px-3 py-2 rounded-md">
                            <Calendar size={16} className="mr-2 text-justice-600" />
                            <span className="font-medium">Año: {edu.year}</span>
                          </div>
                          {edu.honors && (
                            <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-bold border border-amber-200">
                              {edu.honors}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap size={48} className="mx-auto text-justice-300 mb-4" />
                  <p className="text-justice-500 italic">No se ha proporcionado información de formación académica.</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            {candidate.publications && candidate.publications.length > 0 && (
              <Card className="border-l-4 border-l-indigo-600">
                <CardHeader>
                  <h3 className="text-xl font-bold text-justice-900 flex items-center">
                    <BookOpen size={24} className="mr-3 text-indigo-600" />
                    Publicaciones
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.publications.map((pub, index) => (
                      <div key={index} className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 hover:shadow-md transition-all">
                        <h4 className="font-bold text-justice-900 mb-2 text-lg">{pub.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-justice-700 font-medium">{pub.publisher}</span>
                          <div className="flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold border border-indigo-200">{pub.type}</span>
                            <span className="bg-white text-justice-700 px-3 py-1 rounded-full font-semibold border">{pub.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {candidate.awards && candidate.awards.length > 0 && (
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <h3 className="text-xl font-bold text-justice-900 flex items-center">
                    <Star size={24} className="mr-3 text-amber-500" />
                    Reconocimientos y Premios
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.awards.map((award, index) => (
                      <div key={index} className="p-5 bg-gradient-to-r from-amber-50 to-justice-50 rounded-lg border-2 border-amber-200 hover:shadow-md transition-all">
                        <div className="flex items-start gap-3">
                          <Star size={24} className="text-amber-500 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-bold text-justice-900 mb-2 text-lg">{award.title}</h4>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-justice-700 font-medium">{award.institution}</span>
                              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold border border-amber-300">{award.year}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {(!candidate.publications || candidate.publications.length === 0) &&
             (!candidate.awards || candidate.awards.length === 0) && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Award size={48} className="mx-auto text-justice-300 mb-4" />
                    <p className="text-justice-500 italic">No se han registrado logros o reconocimientos.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            {(candidate.cvUrl || candidate.fileUrl) && (
              <Card className="border-l-4 border-l-justice-600">
                <CardHeader>
                  <h3 className="text-xl font-bold text-justice-900 flex items-center">
                    <FileText size={24} className="mr-3 text-justice-600" />
                    Documentos Oficiales
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {candidate.cvUrl && (
                      <a
                        href={candidate.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-6 bg-gradient-to-br from-justice-50 to-indigo-50 rounded-lg border-2 border-justice-200 hover:border-justice-400 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-justice-600 rounded-lg flex items-center justify-center mr-4">
                            <FileText size={24} className="text-white" />
                          </div>
                          <div>
                            <span className="font-bold text-justice-900 text-lg block">Currículum Vitae</span>
                            <span className="text-justice-600 text-sm">Ver documento</span>
                          </div>
                        </div>
                        <ExternalLink size={20} className="text-justice-600 group-hover:text-justice-700" />
                      </a>
                    )}
                    {candidate.fileUrl && (
                      <a
                        href={candidate.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-6 bg-gradient-to-br from-justice-50 to-justice-50 rounded-lg border-2 border-justice-200 hover:border-justice-400 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-justice-600 rounded-lg flex items-center justify-center mr-4">
                            <FileText size={24} className="text-white" />
                          </div>
                          <div>
                            <span className="font-bold text-justice-900 text-lg block">Expediente Completo</span>
                            <span className="text-justice-600 text-sm">Ver documento</span>
                          </div>
                        </div>
                        <ExternalLink size={20} className="text-justice-600 group-hover:text-justice-700" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {(candidate.sourceText || candidate.sourceUrl) && (
              <Card className="bg-gradient-to-r from-justice-50 to-slate-50 border-justice-200">
                <CardHeader>
                  <h3 className="text-xl font-bold text-justice-900 flex items-center">
                    <Globe size={24} className="mr-3 text-justice-600" />
                    Fuente de Información
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidate.sourceText && (
                      <div>
                        <label className="block text-sm font-semibold text-justice-600 mb-2">Fuente</label>
                        <p className="text-justice-900 font-medium">{candidate.sourceText}</p>
                      </div>
                    )}
                    {candidate.sourceUrl && (
                      <div>
                        <a
                          href={candidate.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-justice-600 text-white rounded-lg hover:bg-justice-700 font-medium transition-colors"
                        >
                          Ver fuente completa
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {!candidate.cvUrl && !candidate.fileUrl && !candidate.sourceText && !candidate.sourceUrl && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-justice-300 mb-4" />
                    <p className="text-justice-500 italic">No hay documentos disponibles.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const profileUrl = window.location.href;
  const shareTitle = `${candidate.name} - ${candidate.role}`;
  const shareDescription = `Perfil de ${candidate.name}, aspirante a ${candidate.role} en ${candidate.institution}`;

  return (
    <ProfileLayout
      title={candidate.name}
      subtitle={candidate.role}
      imageUrl={candidate.imageUrl}
      headerContent={
        <div className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Building2 size={18} className="mr-2" />
              <span className="font-medium">{candidate.institution}</span>
            </div>
            <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Award size={18} className="mr-2" />
              <span className="font-medium">{candidate.specialization}</span>
            </div>
            <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Calendar size={18} className="mr-2" />
              <span className="font-medium">{candidate.yearsOfExperience} años de experiencia</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/90 text-sm font-semibold">Compartir perfil:</span>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
              <SocialShare
                url={profileUrl}
                title={shareTitle}
                description={shareDescription}
                variant="buttons"
                className="social-share-light"
              />
            </div>
          </div>
        </div>
      }
    >
      <div className="mb-6">
        <div className="border-b-2 border-justice-200">
          <nav className="-mb-0.5 flex space-x-6 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-2 border-b-4 font-semibold text-sm transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-justice-600 text-justice-600'
                      : 'border-transparent text-justice-500 hover:text-justice-700 hover:border-justice-300'
                    }
                  `}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8">
          {renderTabContent()}
        </div>

        <div className="mt-8">
          <Card className="shadow-sm">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-justice-700 font-semibold">Compartir perfil:</span>
                  <SocialShare
                    url={profileUrl}
                    title={shareTitle}
                    description={shareDescription}
                    variant="buttons"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className='flex items-center'
                    onClick={() => navigate(-1)}
                    >
                    <ArrowLeft size={18} className="mr-2" />
                    Volver
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/comisiones/${candidate.commissionId}`)}
                  >
                    Ver comisión
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/candidatos')}
                  >
                    Ver todos los candidatos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-gradient-to-r from-justice-50 to-indigo-50 border-justice-200 shadow-sm">
            <CardContent className="py-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-justice-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-justice-900 mb-2 text-lg">Base legal de la información</h3>
                  <p className="text-justice-800 leading-relaxed">
                    La información publicada en Justiciapedia se fundamenta en los artículos 30 y 31 de la Constitución Política de la República de Guatemala, que garantizan el derecho de toda persona a acceder a la información pública y a conocer los registros estatales.
                  </p>
                  <p className="text-justice-800 leading-relaxed mt-3">
                    Justiciapedia utiliza únicamente información obtenida mediante mecanismos legales de acceso a la información pública y respeta los límites establecidos por la ley en materia de confidencialidad y protección de datos.
                  </p>
                </div>
              </div>

              <div className="border-t-2 border-justice-200 pt-6 mt-6 space-y-6">
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h4 className="font-bold text-justice-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-justice-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-justice-600 font-bold text-sm">30</span>
                    </div>
                    Artículo 30: Publicidad de los actos administrativos
                  </h4>
                  <p className="text-justice-700 leading-relaxed pl-11">
                    Todos los actos de la administración son públicos. Los interesados tienen derecho a obtener, en cualquier tiempo, informes, copias, reproducciones y certificaciones que soliciten y la exhibición de los expedientes que deseen consultar, salvo que se trate de asuntos militares o diplomáticos de seguridad nacional, o de datos suministrados por particulares bajo garantía de confidencia.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h4 className="font-bold text-justice-900 mb-3 flex items-center">
                    <div className="w-8 h-8 bg-justice-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-justice-600 font-bold text-sm">31</span>
                    </div>
                    Artículo 31: Acceso a archivos y registros estatales
                  </h4>
                  <p className="text-justice-700 leading-relaxed pl-11">
                    Toda persona tiene el derecho de conocer lo que de ella conste en archivos, fichas o cualquier otra forma de registros estatales, y la finalidad a que se dedica esta información, así como a corrección, rectificación y actualización. Quedan prohibidos los registros y archivos de filiación política, excepto los propios de las autoridades electorales y de los partidos políticos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default CandidateProfile;

