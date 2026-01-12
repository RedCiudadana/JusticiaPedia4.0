import React, { useState } from 'react';
import { MessageSquare, X, Send, AlertTriangle, Info, ThumbsUp } from 'lucide-react';
import Button from './Button';
import Card, { CardContent, CardHeader } from './Card';

interface FeedbackButtonProps {
  className?: string;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'report' | 'suggestion'>('feedback');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { feedbackType, message, email });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setMessage('');
      setEmail('');
    }, 2000);
  };

  const feedbackTypes = [
    { id: 'feedback', label: 'Comentario', icon: ThumbsUp, color: 'text-blue-600' },
    { id: 'report', label: 'Reportar Error', icon: AlertTriangle, color: 'text-red-600' },
    { id: 'suggestion', label: 'Sugerencia', icon: Info, color: 'text-green-600' },
  ];

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed right-6 bottom-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Enviar comentarios"
        >
          <MessageSquare size={24} />
        </Button>
      </div>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-row items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Enviar Comentarios</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-1"
              >
                <X size={20} />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ThumbsUp size={24} className="text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    ¡Gracias por tu comentario!
                  </h4>
                  <p className="text-gray-600">
                    Hemos recibido tu mensaje y lo revisaremos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Feedback Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de comentario
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {feedbackTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFeedbackType(type.id as any)}
                            className={`flex items-center p-3 border rounded-lg transition-colors ${
                              feedbackType === type.id
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon size={18} className={`mr-3 ${type.color}`} />
                            <span className="font-medium">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="feedback-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder={
                        feedbackType === 'feedback'
                          ? 'Comparte tu opinión sobre la plataforma...'
                          : feedbackType === 'report'
                          ? 'Describe el error que encontraste...'
                          : 'Cuéntanos tu idea para mejorar...'
                      }
                      required
                    />
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      id="feedback-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="tu@email.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Si quieres que te contactemos sobre tu comentario
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1"
                      disabled={!message.trim()}
                    >
                      <Send size={16} className="mr-2" />
                      Enviar
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;