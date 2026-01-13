import React, { useState, useMemo } from 'react';
import { Search, Filter, X, FileText, Users, Building2, UserCircle } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { candidates } from '../data/candidates';
import { institutions } from '../data/institutions';
import { commissions } from '../data/commissions';
import { newsArticles } from '../data/news';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'candidate' | 'institution' | 'commission' | 'news';
  url: string;
  imageUrl?: string;
  metadata?: string;
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  // Get search query from URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  // Combine all searchable content
  const allResults: SearchResult[] = useMemo(() => {
    const results: SearchResult[] = [];

    // Add candidates
    candidates.forEach(candidate => {
      results.push({
        id: candidate.id,
        title: candidate.name,
        description: `${candidate.role} - ${candidate.description}`,
        type: 'candidate',
        url: `/candidatos/${candidate.id}`,
        imageUrl: candidate.imageUrl,
        metadata: `${candidate.institution} • ${candidate.specialization}`,
      });
    });

    // Add institutions
    institutions.forEach(institution => {
      results.push({
        id: institution.id,
        title: institution.name,
        description: institution.description,
        type: 'institution',
        url: `/instituciones/${institution.id}`,
        imageUrl: institution.imageUrl,
        metadata: institution.type,
      });
    });

    // Add commissions
    commissions.forEach(commission => {
      results.push({
        id: commission.id,
        title: commission.name,
        description: commission.description,
        type: 'commission',
        url: `/comisiones/${commission.id}`,
        metadata: `${commission.type} • ${commission.status}`,
      });
    });

    // Add news articles
    newsArticles.forEach(article => {
      results.push({
        id: article.id,
        title: article.title,
        description: article.excerpt,
        type: 'news',
        url: `/noticias/${article.id}`,
        imageUrl: article.imageUrl,
        metadata: `${article.category} • ${new Date(article.date).toLocaleDateString('es-ES')}`,
      });
    });

    return results;
  }, []);

  // Filter and search results
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    
    return allResults.filter(result => {
      const matchesQuery = 
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query) ||
        (result.metadata && result.metadata.toLowerCase().includes(query));
      
      const matchesType = selectedType === 'all' || result.type === selectedType;
      
      return matchesQuery && matchesType;
    });
  }, [searchQuery, selectedType, allResults]);

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'candidate':
        return <UserCircle size={16} className="text-justice-600" />;
      case 'institution':
        return <Building2 size={16} className="text-justice-600" />;
      case 'commission':
        return <Users size={16} className="text-purple-600" />;
      case 'news':
        return <FileText size={16} className="text-justice-600" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'candidate':
        return 'Aspirante';
      case 'institution':
        return 'Institución';
      case 'commission':
        return 'Comisión';
      case 'news':
        return 'Noticia';
      default:
        return '';
    }
  };

  const typeFilters = [
    { value: 'all', label: 'Todo', count: filteredResults.length },
    { value: 'candidate', label: 'Aspirantes', count: filteredResults.filter(r => r.type === 'candidate').length },
    { value: 'institution', label: 'Instituciones', count: filteredResults.filter(r => r.type === 'institution').length },
    { value: 'commission', label: 'Comisiones', count: filteredResults.filter(r => r.type === 'commission').length },
    { value: 'news', label: 'Noticias', count: filteredResults.filter(r => r.type === 'news').length },
  ];

  return (
    <PageLayout
      title="Resultados de Búsqueda"
      description={searchQuery ? `Resultados para "${searchQuery}"` : 'Buscar en JusticiapedIA'}
    >
      {/* Search Header */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar aspirantes, instituciones, noticias..."
            className="w-full px-4 py-3 pl-12 pr-12 border border-justice-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
          />
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-justice-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-justice-400 hover:text-justice-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setSelectedType(filter.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === filter.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-justice-100 text-justice-700 hover:bg-justice-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {searchQuery ? (
        <div>
          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-justice-600">
              {filteredResults.length > 0 ? (
                <>
                  Mostrando {paginatedResults.length} de {filteredResults.length} resultados para 
                  <span className="font-semibold"> "{searchQuery}"</span>
                  {selectedType !== 'all' && (
                    <span> en {typeFilters.find(f => f.value === selectedType)?.label}</span>
                  )}
                </>
              ) : (
                <>No se encontraron resultados para <span className="font-semibold">"{searchQuery}"</span></>
              )}
            </p>
          </div>

          {/* Results List */}
          {paginatedResults.length > 0 ? (
            <div className="space-y-6">
              {paginatedResults.map((result) => (
                <Card key={`${result.type}-${result.id}`} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {result.imageUrl && (
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={result.imageUrl}
                            alt={result.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(result.type)}
                          <span className="text-sm font-medium text-justice-600">
                            {getTypeLabel(result.type)}
                          </span>
                          {result.metadata && (
                            <>
                              <span className="text-justice-400">•</span>
                              <span className="text-sm text-justice-600">{result.metadata}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-justice-900 mb-2 hover:text-primary-600 transition-colors">
                          <a href={result.url}>{result.title}</a>
                        </h3>
                        <p className="text-justice-600 mb-3 line-clamp-2">{result.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = result.url}
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-justice-50 rounded-lg">
              <Search size={48} className="mx-auto text-justice-400 mb-4" />
              <h3 className="text-lg font-semibold text-justice-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-justice-600 mb-4">
                Intenta con otros términos de búsqueda o revisa la ortografía.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-justice-500">Sugerencias:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setSearchQuery('magistrado')}
                    className="px-3 py-1 bg-justice-100 text-justice-700 rounded-full text-sm hover:bg-justice-200 transition-colors"
                  >
                    magistrado
                  </button>
                  <button
                    onClick={() => setSearchQuery('corte suprema')}
                    className="px-3 py-1 bg-justice-100 text-justice-700 rounded-full text-sm hover:bg-justice-200 transition-colors"
                  >
                    corte suprema
                  </button>
                  <button
                    onClick={() => setSearchQuery('comisión')}
                    className="px-3 py-1 bg-justice-100 text-justice-700 rounded-full text-sm hover:bg-justice-200 transition-colors"
                  >
                    comisión
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
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
                          : 'bg-justice-100 text-justice-700 hover:bg-justice-200'
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
        </div>
      ) : (
        <div className="text-center py-12 bg-justice-50 rounded-lg">
          <Search size={48} className="mx-auto text-justice-400 mb-4" />
          <h3 className="text-lg font-semibold text-justice-900 mb-2">
            Buscar en JusticiapedIA
          </h3>
          <p className="text-justice-600 mb-6">
            Encuentra aspirantes, instituciones, comisiones y noticias del sistema judicial.
          </p>
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <h4 className="font-medium text-justice-900 mb-2">Ejemplos de búsqueda:</h4>
                <ul className="space-y-1 text-justice-600">
                  <li>• "María Morales"</li>
                  <li>• "Corte Suprema"</li>
                  <li>• "magistrado"</li>
                  <li>• "derecho constitucional"</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-medium text-justice-900 mb-2">Puedes buscar:</h4>
                <ul className="space-y-1 text-justice-600">
                  <li>• Nombres de aspirantes</li>
                  <li>• Instituciones</li>
                  <li>• Especializaciones</li>
                  <li>• Noticias y análisis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default SearchPage;

