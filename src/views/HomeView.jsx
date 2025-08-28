import React from 'react';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import SearchBar from '../components/SearchBar/SearchBar';
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
}) {
  return (
    <>
      <section className="tf-search-section">
        <div className="tf-category-selector">
          <label htmlFor="category-select">Categoria:</label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="popular">Populares</option>
            <option value="top-rated">Mais Avaliados</option>
            <option value="now-playing">Em Cartaz</option>
          </select>
        </div>
        <SearchBar defaultValue={query} onSearch={(q) => search(q)} />
      </section>

      {error && <div style={{ color: 'salmon' }}>Erro: {error.message}</div>}

      <HomeHeader query={query} category={category} />

      <CardList
        items={results}
        onToggleFavorite={onToggleFavorite}
        onDetails={onDetails}
        favorites={favorites}
        loading={loading}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
        label={query && query.trim() ? 'Busca' : getCategoryLabel(category)}
      />
    </>
  );
}

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
