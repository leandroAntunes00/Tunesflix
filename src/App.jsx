import { useEffect, useState, useCallback } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import useTmdbSearch from './hooks/useTmdbSearch';
import CardList from './components/CardList/CardList';
import FavoritesView from './components/Favorites/FavoritesView';
import MovieModal from './components/MovieModal/MovieModal';
import { getMovieDetails } from './services/tmdb';
import SearchBar from './components/SearchBar/SearchBar';

// Removed internal favorites logic
import { useFavorites } from './hooks/useFavorites';

function App() {
  const { query, search, results, loading, error, page, nextPage, prevPage, totalPages, reset, fetchDefault } =
    useTmdbSearch();
  // favorites moved to FavoritesContext
  const { favorites, toggleFavorite } = useFavorites();
  const [view, setView] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const [modalError, setModalError] = useState(null);

  // Removed saving favorites to local storage

  // demo: se não houver query e existir chave do TMDB, executa uma busca inicial
  useEffect(() => {
    const hasKey = Boolean(
      import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
    );
    if (!query && hasKey) {
      // busca inicial suave para ver a lista funcionando
      search('matrix');
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
      const data = await getMovieDetails(film.id, 'credits');
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
            fetchDefault();
          }
        }}
        active={view}
      />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '1rem' }}>
        <section style={{ marginBottom: '1rem' }}>
          <SearchBar defaultValue={query} onSearch={(q) => search(q)} />
        </section>

        {view === 'home' && (
          <>
            {error && <div style={{ color: 'salmon' }}>Erro: {error.message}</div>}

            <CardList
              items={results}
              onToggleFavorite={handleToggleFavorite}
              onDetails={handleDetails}
              favorites={favorites}
              loading={loading}
            />

            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12,
                }}
              >
                <button onClick={prevPage} disabled={page <= 1}>
                  Anterior
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button onClick={nextPage} disabled={page >= totalPages}>
                  Próxima
                </button>
              </div>
            )}
          </>
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
