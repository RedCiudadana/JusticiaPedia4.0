import React from 'react';
import Container from '../ui/Container';
import { candidates } from '../../data/candidates';
import { commissions } from '../../data/commissions';
import { institutions } from '../../data/institutions';
import { Users, Scale, Building2, Network, TrendingUp } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const StatsSection: React.FC = () => {
  const stats: Stat[] = [
    {
      value: `${candidates.length}`,
      label: 'Perfiles de Aspirantes',
      icon: Users,
      description: 'Candidatos documentados'
    },
    {
      value: `${commissions.length}`,
      label: 'Comisiones',
      icon: Scale,
      description: 'Procesos de postulación'
    },
    {
      value: `${institutions.length}`,
      label: 'Instituciones',
      icon: Building2,
      description: 'Del sector justicia'
    },
    {
      value: '120+',
      label: 'Mapas de Poder',
      icon: Network,
      description: 'Relaciones documentadas'
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-justice-950"></div>

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-justice-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl"></div>

      <Container className="relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/10">
            <TrendingUp size={18} className="text-justice-400" />
            <span className="text-sm font-semibold text-white/90">Datos de Transparencia</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Información al alcance de todos
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto leading-relaxed">
            Justiciapedia recopila y organiza datos sobre el sistema judicial guatemalteco
            para promover la transparencia y la rendición de cuentas
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-justice-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-justice-400/20 to-primary-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-justice-400" />
                  </div>

                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>

                  <div className="text-white font-semibold mb-1">
                    {stat.label}
                  </div>

                  <div className="text-primary-300 text-sm">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href="/datos-abiertos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-justice-500 hover:bg-justice-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explorar Datos Abiertos</span>
            <TrendingUp size={18} />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;

