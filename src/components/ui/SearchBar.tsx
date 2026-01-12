import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
  showFilters?: boolean;
  onFilterClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
  onSearch,
  className = '',
  autoFocus = false,
  showFilters = false,
  onFilterClick,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center ${className}`}
    >
      <div className={`relative w-full transition-all duration-200 ${
        isFocused ? 'transform scale-[1.01]' : ''
      }`}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full h-12 pl-12 pr-12 text-sm bg-white border-2 rounded-xl transition-all duration-200 ${
            isFocused
              ? 'border-slate-500 ring-4 ring-slate-100 shadow-lg'
              : 'border-slate-300 hover:border-slate-400 shadow-md'
          } focus:outline-none placeholder-slate-500 font-medium`}
        />
        
        {/* Search Icon */}
        <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
          isFocused ? 'text-slate-600' : 'text-slate-400'
        }`}>
          <Search size={18} />
        </div>

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors duration-200 rounded-full hover:bg-slate-100"
            aria-label="Limpiar búsqueda"
          >
            <X size={16} />
          </button>
        )}

        {/* Filter Button */}
        {showFilters && (
          <button
            type="button"
            onClick={onFilterClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors duration-200 rounded-full hover:bg-slate-100"
            aria-label="Filtros"
          >
            <Filter size={16} />
          </button>
        )}

        {/* Submit Button (hidden but functional) */}
        <button
          type="submit"
          className="sr-only"
          aria-label="Buscar"
        >
          Buscar
        </button>
      </div>

      {/* Search Suggestions (placeholder for future implementation) */}
      {isFocused && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto animate-slideDown">
          <div className="p-4 text-sm text-slate-500 text-center font-medium">
            Presiona Enter para buscar "{query}"
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;