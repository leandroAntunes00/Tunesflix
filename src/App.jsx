import { useEffect, useState, useCallback } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import useMovies from './hooks/useMovies';
import './App.css';
import FavoritesView from './components/Favorites/FavoritesView';
import MovieModal from './components/MovieModal/MovieModal';
import { getMovieDetails } from './services/tmdb';
import HomeView from './views/HomeView';

// Removed internal favorites logic
import { useFavorites } from './hooks/useFavorites';

function App() {
  const {
    category,
    searchQuery,
    isSearching,
    results,
    loading,
    error,
    page,
    nextPage,
    prevPage,
    totalPages,
    changeCategory,
    search,
    reset,
  } = useMovies();

  // favorites moved to FavoritesContext
  const { favorites, toggleFavorite } = useFavorites();
  const [view, setView] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const [modalError, setModalError] = useState(null);

  // Inicialização: carrega a categoria padrão quando o app inicia
  useEffect(() => {
    if (results.length === 0 && !isSearching) {
      // Carrega a categoria padrão (popular)
      changeCategory('popular');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const data = await getMovieDetails(film.id);
      setModalDetails(data);
    } catch (err) {
      setModalError(err);
    } finally {
      setModalLoading(false);
    }
  }, []);

  return (
    <>
      <Header
        onNavigate={(v) => {
          setView(v);
          if (v === 'home') {
            // limpar query e carregar lista padrão (populares)
            reset();
            changeCategory('popular');
          }
        }}
        active={view}
      />

      <main className="tf-main">
        {view === 'home' && (
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
          />
        )}

        {view === 'favorites' && (
          <section>
            <h2>Favoritos</h2>
            <FavoritesView
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onDetails={handleDetails}
            />
          </section>
        )}
      </main>

      <Footer />

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


export default App;
