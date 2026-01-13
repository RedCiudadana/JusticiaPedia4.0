import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affair: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSe2DNIWZVQugZ_G-rQCzO9EKpWr66ZXe8rbBBHtKYduKIeXyQ/formResponse';

    const formBody = new URLSearchParams();
    formBody.append('entry.1064235632', formData.name);
    formBody.append('entry.1330832081', formData.email);
    formBody.append('entry.1233483376', formData.affair);
    formBody.append('entry.608682247', formData.message);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Correo Electronico',
      details: 'contacto@justiciapedia.org.gt',
      action: 'mailto:contacto@justiciapedia.org.gt'
    },
    {
      icon: Phone,
      title: 'Telefono',
      details: '+502 2233-4455',
      action: 'tel:+50222334455'
    },
    {
      icon: MapPin,
      title: 'Direccion',
      details: 'Ciudad de Guatemala, Guatemala',
      action: null
    },
    {
      icon: Clock,
      title: 'Horario de Atencion',
      details: 'Lunes a Viernes, 8:00 AM - 5:00 PM',
      action: null
    }
  ];

  return (
    <PageLayout
      title="Contáctanos"
      description="Para más información de eventos, dudas o de nuestro trabajo llena el siguiente formulario y nuestro equipo te estará contactando."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-justice-900 flex items-center">
                <MessageSquare size={24} className="mr-3 text-primary-600" />
                Envianos un Mensaje
              </h2>
              <p className="text-justice-600">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-justice-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-justice-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-justice-900 mb-2">
                    Mensaje enviado
                  </h3>
                  <p className="text-justice-600">
                    Gracias por contactarnos. Tu mensaje ha sido enviado.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-justice-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-justice-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-justice-700 mb-2">
                        Correo Electronico *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-justice-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="affair" className="block text-sm font-medium text-justice-700 mb-2">
                      Asunto / Motivo de Contacto
                    </label>
                    <input
                      type="text"
                      id="affair"
                      name="affair"
                      value={formData.affair}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-justice-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Asunto / Motivo de Contacto"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-justice-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-justice-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Describe tu consulta o mensaje en detalle..."
                    />
                  </div>

                  <div className="bg-justice-50 p-4 rounded-lg border border-justice-200">
                    <div className="flex items-start">
                      <AlertCircle size={20} className="text-justice-600 mr-3 mt-0.5" />
                      <div className="text-sm text-justice-800">
                        <p className="font-medium mb-1">Politica de Privacidad</p>
                        <p>
                          Al enviar este formulario, aceptas que procesemos tus datos personales
                          de acuerdo con nuestra{' '}
                          <a href="/legal/privacidad" className="underline hover:text-justice-900">
                            politica de privacidad
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
                    disabled={!formData.name || !formData.email || !formData.affair || !formData.message}
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-justice-900">Informacion de Contacto</h3>
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
                        <h4 className="font-medium text-justice-900">{info.title}</h4>
                        {info.action ? (
                          <a
                            href={info.action}
                            className="text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-justice-600">{info.details}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;

