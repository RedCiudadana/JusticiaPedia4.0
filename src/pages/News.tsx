import React, { useState, useMemo } from 'react';
import { Calendar, Search, Filter, ChevronDown, Eye, Clock, User, Tag, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import HeroSlider from '../components/ui/HeroSlider';
import SocialShare from '../components/ui/SocialShare';
import { newsArticles } from '../data/news';

const News: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const slides = [
    {
      title: 'Notas de Interés',
      description: 'Mantente informado sobre las últimas noticias del sistema judicial guatemalteco.',
      imageUrl: 'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg',
    },
    {
      title: 'Análisis y Reportajes',
      description: 'Análisis profundos sobre los procesos de selección y el sistema de justicia.',
      imageUrl: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg',
    },
    {
      title: 'Transparencia Informativa',
      description: 'Información verificada y actualizada sobre el sistema judicial.',
      imageUrl: 'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg',
    },
  ];

  // Get unique categories for filtering
  const categories = useMemo(() => {
    return [...new Set(newsArticles.map(article => article.category))];
  }, []);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = newsArticles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, categoryFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const articleDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - articleDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semana${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
    return formatDate(dateString);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setSortBy('date');
    setCurrentPage(1);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Procesos de Selección': 'bg-primary-100 text-primary-800',
      'Análisis': 'bg-secondary-100 text-secondary-800',
      'Entrevistas': 'bg-accent-100 text-accent-800',
      'Noticias': 'bg-justice-100 text-justice-800',
      'Reportajes': 'bg-error-100 text-error-800',
      'Opinión': 'bg-primary-100 text-primary-800',
    };
    return colors[category as keyof typeof colors] || 'bg-neutral-100 text-neutral-800';
  };

  const ArticleCard: React.FC<{ article: typeof newsArticles[0] }> = ({ article }) => (
    <Card className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>
        {article.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
              DESTACADO
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{getTimeAgo(article.date)}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>{article.readTime} min</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="flex-1 flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{article.excerpt}</p>
        
        <div className="space-y-3">
          {article.author && (
            <div className="flex items-center text-sm text-gray-600">
              <User size={14} className="mr-2" />
              <span>Por {article.author}</span>
            </div>
          )}
          
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-gray-500 text-xs">+{article.tags.length - 3} más</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-gray-500">
              {article.views && (
                <div className="flex items-center mr-4">
                  <Eye size={14} className="mr-1" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              )}
              <SocialShare
                url={`${window.location.origin}/noticias/${article.id}`}
                title={article.title}
                description={article.excerpt}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = `/noticias/${article.id}`}
            >
              Leer más
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ArticleListItem: React.FC<{ article: typeof newsArticles[0] }> = ({ article }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-32 overflow-hidden rounded-lg flex-shrink-0 relative">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  {article.author && (
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                  )}
                  {article.readTime && (
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{article.readTime} min lectura</span>
                    </div>
                  )}
                  {article.views && (
                    <div className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      <span>{article.views.toLocaleString()} vistas</span>
                    </div>
                  )}
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.slice(0, 4).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <SocialShare
                  url={`${window.location.origin}/noticias/${article.id}`}
                  title={article.title}
                  description={article.excerpt}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.location.href = `/noticias/${article.id}`}
                >
                  Leer artículo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout
      title="Notas de Interés"
      description="Las últimas noticias, análisis y reportajes sobre el sistema judicial guatemalteco."
    >
      <HeroSlider slides={slides} />

      {/* Search and Filter Section */}
      <div className="mt-16 mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, contenido, autor o etiquetas..."
            className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
          />
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter size={16} className="mr-2" />
            Filtros avanzados
            <ChevronDown size={16} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    id="category-filter"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="date">Fecha (más reciente)</option>
                    <option value="title">Título</option>
                    <option value="category">Categoría</option>
                    <option value="views">Más vistas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vista
                  </label>
                  <div className="flex rounded-md border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cuadrícula
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Lista
                    </button>
                  </div>
                </div>

                <div className="flex items-end">
                  {(searchQuery || categoryFilter !== 'all') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <p className="text-gray-600 mb-4 md:mb-0">
          Mostrando {paginatedArticles.length} de {filteredArticles.length} artículos
          {(searchQuery || categoryFilter !== 'all') && (
            <span className="ml-1">
              {searchQuery && `para "${searchQuery}"`}
              {categoryFilter !== 'all' && ` en ${categoryFilter}`}
            </span>
          )}
        </p>
        
        {/* Quick Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 4).map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                categoryFilter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      {currentPage === 1 && categoryFilter === 'all' && !searchQuery && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp size={24} className="mr-2 text-primary-600" />
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.filter(article => article.featured).slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Articles Display */}
      <div className="mb-8">
        {currentPage === 1 && categoryFilter === 'all' && !searchQuery && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen size={24} className="mr-2 text-primary-600" />
            Todos los Artículos
          </h2>
        )}
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedArticles.map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No se encontraron artículos
          </h3>
          <p className="text-gray-600 mb-4">
            No hay artículos que coincidan con los criterios de búsqueda.
          </p>
          <Button
            variant="outline"
            onClick={clearFilters}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Categories Overview */}
      <div className="mt-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 border border-gray-200 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Artículos por Categoría
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => {
            const count = newsArticles.filter(article => article.category === category).length;
            const percentage = Math.round((count / newsArticles.length) * 100);
            return (
              <div
                key={category}
                className="bg-white p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setCategoryFilter(category)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{category}</h3>
                  <span className="text-sm text-gray-600">{percentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{count} artículo{count !== 1 ? 's' : ''}</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-20 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white rounded-2xl p-10 md:p-12 text-center shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Mantente Informado</h2>
        <p className="text-blue-50 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          Suscríbete a nuestro boletín para recibir las últimas noticias y análisis sobre el sistema judicial guatemalteco.
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
          />
          <Button
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all font-semibold px-6 py-3"
          >
            Suscribirse
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default News;