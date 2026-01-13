import React from 'react';
import { Scale, Shield, Eye, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-justice-900 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-justice-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl -ml-40 -mb-40"></div>

      <div className="relative px-6 py-16 md:px-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-justice-500/20 rounded-2xl blur-xl"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-justice-400 to-justice-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Scale className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 tracking-tight">
            ¿Qué es Justiciapedia?
          </h2>

          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-lg md:text-xl lg:text-2xl text-primary-100 leading-relaxed">
              Una <span className="font-semibold text-justice-300">plataforma ciudadana</span> que promueve la transparencia y la participación
              en los procesos de selección de autoridades del sistema de justicia en Guatemala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 bg-justice-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-justice-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Transparencia</h3>
              <p className="text-primary-200 text-sm leading-relaxed">
                Acceso libre a información pública sobre el sector justicia
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 bg-justice-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-justice-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Vigilancia Ciudadana</h3>
              <p className="text-primary-200 text-sm leading-relaxed">
                Herramientas para monitorear procesos de selección
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-primary-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Participación</h3>
              <p className="text-primary-200 text-sm leading-relaxed">
                Información para una ciudadanía informada y activa
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-justice-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-justice-400 to-primary-400 rounded-full"></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

