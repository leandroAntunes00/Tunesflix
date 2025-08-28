import React from 'react';
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
}) {
  return (
    <div className="app-container">
      <section className="tf-search-section" style={{ marginBottom: '1.25rem' }}>
        <CategorySelector value={category} onChange={(v) => onCategoryChange(v)} />
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
    </div>
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
