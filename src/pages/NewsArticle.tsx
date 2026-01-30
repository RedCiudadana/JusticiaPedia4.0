import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, Eye, ArrowLeft, Tag, BookOpen } from 'lucide-react';
import ProfileLayout from '../components/layout/ProfileLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import SocialShare from '../components/ui/SocialShare';
import Loading from '../components/ui/Loading';
import { blogs, convertBlogsToNewsArticles } from '../data/news';

const NewsArticle: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const newsArticles = React.useMemo(() => convertBlogsToNewsArticles(blogs), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [articleId]);

  const article = articleId ? newsArticles.find(a => a.id === articleId) : undefined;

  if (isLoading) {
    return <Loading fullScreen text="Cargando artículo..." />;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="mx-auto text-justice-400 mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Artículo no encontrado</h1>
          <p className="text-neutral-600 mb-4">El artículo que buscas no existe o ha sido removido.</p>
          <Link
            to="/noticias"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Ver todas las noticias
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Related articles (same category, excluding current)
  const relatedArticles = newsArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <ProfileLayout
      title={article.title}
      imageUrl={article.imageUrl}
      headerContent={
        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-justice-50 text-justice-800`}>
            {article.category}
          </span>
          <div className="flex items-center text-white/80">
            <Calendar size={16} className="mr-2" />
            {formatDate(article.date)}
          </div>
          {article.author && (
            <div className="flex items-center text-white/80">
              <User size={16} className="mr-2" />
              {article.author}
            </div>
          )}
          {article.readTime && (
            <div className="flex items-center text-white/80">
              <Clock size={16} className="mr-2" />
              {article.readTime} min de lectura
            </div>
          )}
          {article.views && (
            <div className="flex items-center text-white/80">
              <Eye size={16} className="mr-2" />
              {article.views.toLocaleString()} vistas
            </div>
          )}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-justice-200">
                <div className="flex items-center text-justice-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{formatDate(article.date)}</span>
                </div>
                {article.author && (
                  <div className="flex items-center text-justice-600">
                    <User size={16} className="mr-2" />
                    <span>Por {article.author}</span>
                  </div>
                )}
                {article.readTime && (
                  <div className="flex items-center text-justice-600">
                    <Clock size={16} className="mr-2" />
                    <span>{article.readTime} minutos de lectura</span>
                  </div>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  <SocialShare
                    url={window.location.href}
                    title={article.title}
                    description={article.excerpt}
                  />
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-neutral-600 mb-6 font-medium leading-relaxed">
                  {article.excerpt}
                </p>
                
                {article.content ? (
                  <div className="space-y-6 text-neutral-700 leading-relaxed">
                    {article.content
                      .split(/\n{2,}/)
                      .map((paragraph, index) => {
                        const trimmed = paragraph.trim();
                        if (!trimmed) return null;
                        return <p key={index}>{trimmed}</p>;
                      })}
                  </div>
                ) : (
                  <div className="text-neutral-600">
                    Este artículo no tiene contenido disponible.
                  </div>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <h4 className="text-sm font-medium text-neutral-900 mb-3 flex items-center">
                    <Tag size={16} className="mr-2" />
                    Etiquetas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-justice-50 text-justice-700 px-3 py-1 rounded-full text-sm hover:bg-white transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share at bottom */}
              <div className="mt-8 pt-6 border-t border-justice-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-justice-900">
                    ¿Te gustó este artículo? Compártelo
                  </h4>
                  <SocialShare
                    url={window.location.href}
                    title={article.title}
                    description={article.excerpt}
                    variant="buttons"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/noticias')}
            >
              Ver más noticias
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Article Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Información del Artículo</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-justice-600">Categoría:</span>
                  <span className="font-medium">{article.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-justice-600">Fecha:</span>
                  <span className="font-medium">{formatDate(article.date)}</span>
                </div>
                {article.author && (
                  <div className="flex justify-between">
                    <span className="text-justice-600">Autor:</span>
                    <span className="font-medium">{article.author}</span>
                  </div>
                )}
                {article.readTime && (
                  <div className="flex justify-between">
                    <span className="text-justice-600">Lectura:</span>
                    <span className="font-medium">{article.readTime} min</span>
                  </div>
                )}
                {article.views && (
                  <div className="flex justify-between">
                    <span className="text-justice-600">Vistas:</span>
                    <span className="font-medium">{article.views.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Artículos Relacionados</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <div
                      key={relatedArticle.id}
                      className="group cursor-pointer"
                      onClick={() => navigate(`/noticias/${relatedArticle.id}`)}
                    >
                      <div className="flex space-x-3">
                        <img
                          src={relatedArticle.imageUrl}
                          alt={relatedArticle.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-justice-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-justice-600 mt-1">
                            {formatDate(relatedArticle.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => navigate(`/noticias?category=${article.category}`)}
                >
                  Ver más en {article.category}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Share */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Compartir Artículo</h3>
              <SocialShare
                url={window.location.href}
                title={article.title}
                description={article.excerpt}
                variant="buttons"
                className="flex flex-col gap-2"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default NewsArticle;

