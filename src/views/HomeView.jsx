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
  const handleCategoryChange = useCallback(
    (value) => {
      onCategoryChange(value);
    },
    [onCategoryChange]
  );

  const handleSearch = useCallback(
    (searchQuery) => {
      search(searchQuery);
    },
    [search]
  );

  const handleRetry = useCallback(() => {
    search(query);
  }, [search, query]);

  return (
    <div className="app-container">
      {/* Seção de busca e filtros */}
      <section className="tf-search-section" aria-label="Busca e filtros">
        <CategorySelector value={category} onChange={handleCategoryChange} />
        <SearchBar defaultValue={query} onSearch={handleSearch} />
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
      {viewState.shouldShowHeader && <HomeHeader query={query} category={category} />}

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
