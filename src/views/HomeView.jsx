import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './HomeView.css';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import SearchBar from '../components/SearchBar/SearchBar';
import CategorySelector from '../components/CategorySelector/CategorySelector';
import CardList from '../components/CardList/CardList';
import Pagination from '../components/Pagination/Pagination';
import { ErrorStateView, EmptyStateView } from './StateViews';
import { useViewState } from '../hooks/useViewState';
import { getCategoryLabel } from './constants';

/**
 * MELHOR PRÁTICA MODERNA (2025):
 *
 * Para projetos modernos, considere migrar para TypeScript:
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
 * ✅ IntelliSense e autocomplete superiores
 * ✅ Refatoração segura e automática
 * ✅ Menos bugs em produção
 * ✅ Zero overhead de performance
 *
 * HomeView - View principal da aplicação
 *
 * Responsável por:
 * - Renderizar a interface principal da página inicial
 * - Organizar os componentes de busca, categoria e listagem
 * - Gerenciar a paginação e estados de carregamento
 *
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - useCallback para handlers estáveis
 * - useMemo para computações pesadas
 * - Separação clara de responsabilidades
 * - Interface declarativa e reutilizável
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
 *
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - useCallback para handlers estáveis
 * - useMemo para computações pesadas
 * - Separação clara de responsabilidades
 * - Interface declarativa e reutilizável
 */
function HomeView({
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
  // Hook para gerenciar estados da view
  const viewState = useViewState({
    items: results,
    loading,
    error,
    query,
  });

  // Memoização do rótulo da categoria para evitar recálculos
  const categoryLabel = useMemo(() => getCategoryLabel(category), [category]);

  // Callbacks memoizados para handlers estáveis
  const handleCategoryChange = useCallback((value) => {
    onCategoryChange(value);
  }, [onCategoryChange]);

  const handleSearch = useCallback((searchQuery) => {
    search(searchQuery);
  }, [search]);

  const handleRetry = useCallback(() => {
    search(query);
  }, [search, query]);

  return (
    <div className="app-container">
      {/* Seção de busca e filtros */}
      <section className="tf-search-section" aria-label="Busca e filtros">
        <CategorySelector
          value={category}
          onChange={handleCategoryChange}
        />
        <SearchBar
          defaultValue={query}
          onSearch={handleSearch}
        />
      </section>

      {/* Estados da aplicação baseados no viewState */}
      {viewState.type === 'error' && (
        <ErrorStateView
          error={viewState.error}
          onRetry={handleRetry}
          title="Erro ao carregar filmes"
        />
      )}

      {viewState.type === 'empty' && (
        <EmptyStateView
          title="Nenhum filme encontrado"
          message={
            viewState.isSearch
              ? `Não encontramos filmes para "${viewState.query}". Tente outros termos de busca.`
              : `Não há filmes disponíveis na categoria "${categoryLabel}" no momento.`
          }
          icon="🎬"
        />
      )}

      {/* Cabeçalho da seção - só mostra quando apropriado */}
      {viewState.shouldShowHeader && (
        <HomeHeader query={query} category={category} />
      )}

      {/* Lista de filmes - só mostra quando há itens */}
      {viewState.hasItems && (
        <CardList
          items={results}
          onToggleFavorite={onToggleFavorite}
          onDetails={onDetails}
          onNavigate={onNavigate}
          favorites={favorites}
          loading={loading}
        />
      )}

      {/* Paginação - só mostra quando há itens e múltiplas páginas */}
      {viewState.shouldShowPagination && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
          label={query && query.trim() ? 'Busca' : categoryLabel}
        />
      )}
    </div>
  );
}

// Validação de props com PropTypes (fallback para JavaScript)
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

// Export com memoização para otimização de performance
export default memo(HomeView);
