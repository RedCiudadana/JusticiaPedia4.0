import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  fullScreen?: boolean;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Algo salió mal',
  message = 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
  fullScreen = false,
  showHomeButton = true,
  showRetryButton = false,
  onRetry,
  className = ''
}) => {
  const navigate = useNavigate();

  const content = (
    <div className={`flex flex-col items-center justify-center text-center space-y-4 p-8 ${className}`}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <AlertCircle size={32} className="text-red-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
      <div className="flex gap-3">
        {showRetryButton && onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <RefreshCw size={16} className="mr-2" />
            Reintentar
          </Button>
        )}
        {showHomeButton && (
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home size={16} className="mr-2" />
            Volver al inicio
          </Button>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return content;
};

export default ErrorMessage;
