import React, { useState, useCallback } from 'react';
import useMovies from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import HomeView from '../views/HomeView';
import MovieModal from '../components/MovieModal/MovieModal';
import { getMovieDetails, withTimeout } from '../services/tmdb';

export default function HomePage({ onNavigate }) {
  const {
    category,
    searchQuery,
    results,
    loading,
    error,
    page,
    nextPage,
    prevPage,
    totalPages,
    changeCategory,
    search,
  } = useMovies();

  const { favorites, toggleFavorite } = useFavorites();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const [modalError, setModalError] = useState(null);

  const handleToggleFavorite = useCallback(
    (film) => {
      toggleFavorite(film);
    },
    [toggleFavorite]
  );

  const handleDetails = useCallback(async (film) => {
    if (!film?.id) return;
    setModalOpen(true);
    setModalLoading(true);
    setModalDetails(null);
    setModalError(null);
    try {
      // Protege contra chamadas que nunca retornam com um timeout
      const data = await withTimeout(getMovieDetails(film.id), 8000);

      // Validar formato esperado
      if (!data || typeof data !== 'object' || (!data.id && !data.title && !data.name)) {
        throw new Error('Resposta de detalhes inválida');
      }

      setModalDetails(data);
    } catch (err) {
      console.error('Erro ao carregar detalhes do filme:', err);
      setModalError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setModalLoading(false);
    }
  }, []);

  return (
    <>
      <HomeView
        query={searchQuery}
        search={search}
        results={results}
        loading={loading}
        error={error}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onDetails={handleDetails}
        category={category}
        onCategoryChange={changeCategory}
        onNavigate={onNavigate}
      />

      <MovieModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        loading={modalLoading}
        details={modalDetails}
        error={modalError}
      />
    </>
  );
}
