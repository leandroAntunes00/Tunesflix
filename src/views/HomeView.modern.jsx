import React from 'react';
import PropTypes from 'prop-types';
import './HomeView.css';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import SearchBar from '../components/SearchBar/SearchBar';
import CategorySelector from '../components/CategorySelector/CategorySelector';
import CardList from '../components/CardList/CardList';
import Pagination from '../components/Pagination/Pagination';

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
        <CategorySelector value={category} onChange={(value) => onCategoryChange(value)} />
        <SearchBar defaultValue={query} onSearch={(searchQuery) => search(searchQuery)} />
      </section>

      {/* Exibição de erros - MELHORIA: role="alert" para acessibilidade */}
      {error && (
        <div className="tf-error" role="alert" aria-live="polite">
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
