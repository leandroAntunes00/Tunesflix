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
}) {
  return (
    <>
      <section className="tf-search-section">
        <SearchBar defaultValue={query} onSearch={(q) => search(q)} />
      </section>

      {error && <div style={{ color: 'salmon' }}>Erro: {error.message}</div>}

      <HomeHeader query={query} />

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
        label={query && query.trim() ? 'Busca' : 'Populares'}
      />
    </>
  );
}
