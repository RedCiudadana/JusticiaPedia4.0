import React from 'react';
import { Calendar, ArrowRight, Clock, Newspaper } from 'lucide-react';
import Container from '../ui/Container';
import Card, { CardContent } from '../ui/Card';
import { newsArticles } from '../../data/news';

const NewsSection: React.FC = () => {
  const recentArticles = newsArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Procesos de Selección': 'bg-primary-100 text-primary-800 border-primary-200',
      'Análisis': 'bg-secondary-100 text-secondary-800 border-secondary-200',
      'Entrevistas': 'bg-accent-100 text-accent-800 border-accent-200',
      'Noticias': 'bg-justice-100 text-justice-800 border-justice-200',
      'Reportajes': 'bg-error-100 text-error-800 border-error-200',
      'Opinión': 'bg-primary-100 text-primary-800 border-primary-200',
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800 border-neutral-200';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
              <Newspaper size={18} className="text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Actualidad</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              Notas de Interés
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl">
              Las últimas noticias y análisis sobre el sistema judicial guatemalteco
            </p>
          </div>
          <a
            href="/noticias"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Ver todas las notas
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentArticles.map((article) => (
            <Card
              key={article.id}
              className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-neutral-100 hover:border-primary-200 overflow-hidden"
              onClick={() => window.location.href = `/noticias/${article.id}`}
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
              </div>
              <CardContent className="flex-1 flex flex-col p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  {article.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime} min</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-neutral-600 mb-4 flex-1 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  {article.author && (
                    <span className="text-sm text-neutral-500 font-medium">
                      Por {article.author}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-primary-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Leer más</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewsSection;
