import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import Button from './Button';

interface ActiveProcess {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

const ActiveProcessesNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const activeProcesses: ActiveProcess[] = [
    {
      id: '7',
      name: 'Tribunal Supremo Electoral',
      shortName: 'TSE',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      icon: <Calendar className="text-blue-600" size={20} />
    },
    {
      id: '2',
      name: 'Ministerio Público',
      shortName: 'MP',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      icon: <TrendingUp className="text-green-600" size={20} />
    },
    {
      id: '8',
      name: 'Corte de Constitucionalidad',
      shortName: 'CC',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      icon: <AlertCircle className="text-amber-600" size={20} />
    }
  ];

  useEffect(() => {
    const hasSeenNotification = sessionStorage.getItem('hasSeenActiveProcesses');

    if (!hasSeenNotification) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('hasSeenActiveProcesses', 'true');
    }, 300);
  };

  const handleViewProcess = (processId: string) => {
    sessionStorage.setItem('hasSeenActiveProcesses', 'true');
    window.location.href = `/comisiones/${processId}`;
  };

  const handleViewAll = () => {
    sessionStorage.setItem('hasSeenActiveProcesses', 'true');
    window.location.href = '/comisiones?filter=active';
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 max-w-sm transition-all duration-300 ${
      isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar notificación"
          >
            <X size={20} />
          </button>
          <div className="pr-8">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 text-xs font-bold uppercase tracking-wide">En Proceso Ahora</span>
            </div>
            <h3 className="text-white text-lg font-bold">
              Procesos de Selección Activos
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-600 font-medium mb-3">
            Sigue de cerca estos 3 procesos de postulación activos:
          </p>

          {activeProcesses.map((process) => (
            <button
              key={process.id}
              onClick={() => handleViewProcess(process.id)}
              className={`w-full flex items-center gap-3 p-3 ${process.bgColor} border-2 ${process.borderColor} rounded-xl hover:shadow-md transition-all group`}
            >
              <div className="flex-shrink-0">
                {process.icon}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className={`text-xs font-bold ${process.color} mb-0.5`}>
                  {process.shortName}
                </div>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {process.name}
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0" />
            </button>
          ))}

          <Button
            variant="primary"
            onClick={handleViewAll}
            className="w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all mt-4"
          >
            Ver Todos los Procesos
            <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Información actualizada • Justiciapedia
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveProcessesNotification;
