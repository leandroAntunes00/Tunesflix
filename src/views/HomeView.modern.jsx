import React from 'react';
import PropTypes from 'prop-types';
import './HomeView.css';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import SearchBar from '../components/SearchBar/SearchBar';
import CategorySelector from '../components/CategorySelector/CategorySelector';
import CardList from '../components/CardList/CardList';
import Pagination from '../components/Pagination/Pagination';

/**
 * MELHOR PRÁTICA MODERNA - TypeScript Interface (para referência)
 *
 * interface HomeViewProps {
 *   query: string;
 *   search: (query: string) => void;
 *   results: Movie[];
 *   loading: boolean;
 *   error?: Error | null;
 *   page: number;
 *   nextPage: () => void;
 *   prevPage: () => void;
 *   totalPages: number;
 *   favorites: Record<string, Movie>;
 *   onToggleFavorite: (movie: Movie) => void;
 *   onDetails: (movie: Movie) => void;
 *   category: string;
 *   onCategoryChange: (category: string) => void;
 *   onNavigate: (type: string, film: Movie) => void;
 * }
 *
 * VANTAGENS DO TYPESCRIPT:
 * ✅ Validação em tempo de compilação (não runtime)
 * ✅ IntelliSense e autocomplete melhores
 * ✅ Refatoração segura
 * ✅ Menos bugs em produção
 * ✅ Documentação inline com tipos
 */

/**
 * HomeView - View principal da aplicação
 *
 * MELHORIAS IMPLEMENTADAS (2025):
 * - PropTypes para validação runtime (fallback para JS)
 * - Acessibilidade aprimorada (ARIA labels)
 * - Separação clara de responsabilidades
 * - Componentes menores e mais focados
 * - Documentação JSDoc completa
 *
 * @param {Object} props
 * @param {string} props.query - Query de busca atual
 * @param {Function} props.search - Função para executar busca
 * @param {Array} props.results - Resultados da busca/listagem
 * @param {boolean} props.loading - Estado de carregamento
 * @param {Error} [props.error] - Erro ocorrido
 * @param {number} props.page - Página atual
 * @param {Function} props.nextPage - Função para próxima página
 * @param {Function} props.prevPage - Função para página anterior
 * @param {number} props.totalPages - Total de páginas
 * @param {Object} props.favorites - Objeto com filmes favoritos
 * @param {Function} props.onToggleFavorite - Handler para alternar favorito
 * @param {Function} props.onDetails - Handler para abrir detalhes
 * @param {string} props.category - Categoria selecionada
 * @param {Function} props.onCategoryChange - Handler para mudança de categoria
 * @param {Function} props.onNavigate - Handler para navegação
 */
export default function HomeView({
  query,
  search,
  results,
  loading,
  error,
  page,
  nextPage,
  prevPage,
  totalPages,
  favorites,
  onToggleFavorite,
  onDetails,
  category,
  onCategoryChange,
  onNavigate,
}) {
  return (
    <div className="app-container">
      {/* Seção de busca e filtros - MELHORIA: aria-label para acessibilidade */}
      <section className="tf-search-section" aria-label="Busca e filtros">
        <CategorySelector
          value={category}
          onChange={(value) => onCategoryChange(value)}
        />
        <SearchBar
          defaultValue={query}
          onSearch={(searchQuery) => search(searchQuery)}
        />
      </section>

      {/* Exibição de erros - MELHORIA: role="alert" para acessibilidade */}
      {error && (
        <div
          className="tf-error"
          role="alert"
          aria-live="polite"
        >
          Erro: {error.message}
        </div>
      )}

      {/* Cabeçalho da seção */}
      <HomeHeader query={query} category={category} />

      {/* Lista de filmes */}
      <CardList
        items={results}
        onToggleFavorite={onToggleFavorite}
        onDetails={onDetails}
        onNavigate={onNavigate}
        favorites={favorites}
        loading={loading}
      />

      {/* Paginação */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
        label={query && query.trim() ? 'Busca' : getCategoryLabel(category)}
      />
    </div>
  );
}

// Função utilitária para obter rótulo da categoria
function getCategoryLabel(category) {
  switch (category) {
    case 'top-rated':
      return 'Mais Avaliados';
    case 'now-playing':
      return 'Em Cartaz';
    case 'popular':
    default:
      return 'Populares';
  }
}

// Validação de props com PropTypes
// NOTA: Em projetos TypeScript modernos, isso seria substituído por interfaces
HomeView.propTypes = {
  query: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  page: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  favorites: PropTypes.object.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

HomeView.defaultProps = {
  error: null,
};
