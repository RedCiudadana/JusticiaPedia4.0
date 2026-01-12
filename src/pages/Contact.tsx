import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Correo Electrónico',
      details: 'contacto@justiciapedia.org.gt',
      action: 'mailto:contacto@justiciapedia.org.gt'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      details: '+502 2233-4455',
      action: 'tel:+50222334455'
    },
    {
      icon: MapPin,
      title: 'Dirección',
      details: 'Ciudad de Guatemala, Guatemala',
      action: null
    },
    {
      icon: Clock,
      title: 'Horario de Atención',
      details: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
      action: null
    }
  ];

  const contactTypes = [
    { value: 'general', label: 'Consulta General' },
    { value: 'press', label: 'Prensa y Medios' },
    { value: 'partnership', label: 'Alianzas y Colaboraciones' },
    { value: 'technical', label: 'Soporte Técnico' },
    { value: 'data', label: 'Solicitud de Datos' },
    { value: 'report', label: 'Reportar Error' }
  ];

  return (
    <PageLayout
      title="Contacto"
      description="Ponte en contacto con el equipo de JusticiapedIA para consultas, colaboraciones o soporte."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageSquare size={24} className="mr-3 text-primary-600" />
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-600">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-gray-600">
                    Gracias por contactarnos. Te responderemos dentro de las próximas 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Consulta
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {contactTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Breve descripción del tema"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Describe tu consulta o mensaje en detalle..."
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start">
                      <AlertCircle size={20} className="text-blue-600 mr-3 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Política de Privacidad</p>
                        <p>
                          Al enviar este formulario, aceptas que procesemos tus datos personales 
                          de acuerdo con nuestra{' '}
                          <a href="/legal/privacidad" className="underline hover:text-blue-900">
                            política de privacidad
                          </a>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                  >
                    <Send size={20} className="mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Información de Contacto</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{info.title}</h4>
                        {info.action ? (
                          <a
                            href={info.action}
                            className="text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.details}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Respuesta Rápida</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Consultas Generales</h4>
                  <p className="text-gray-600">Respuesta en 24-48 horas</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Soporte Técnico</h4>
                  <p className="text-gray-600">Respuesta en 2-4 horas</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Prensa y Medios</h4>
                  <p className="text-gray-600">Respuesta en 1-2 horas</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Emergencias</h4>
                  <p className="text-gray-600">Contacto inmediato por teléfono</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                ¿Necesitas ayuda inmediata?
              </h3>
              <p className="text-primary-800 text-sm mb-4">
                Si tienes una consulta urgente o necesitas asistencia inmediata, 
                no dudes en llamarnos directamente.
              </p>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => window.open('tel:+50222334455')}
              >
                <Phone size={16} className="mr-2" />
                Llamar Ahora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;