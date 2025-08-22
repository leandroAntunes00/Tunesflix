import './App.css'
import { useEffect, useState, useCallback } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import useTmdbSearch from './hooks/useTmdbSearch'
import CardList from './components/CardList/CardList'
import MovieModal from './components/MovieModal/MovieModal'
import { getMovieDetails } from './services/tmdb'

const FAVORITES_KEY = 'tunesflix:favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return new Set(arr)
  } catch {
    return new Set()
  }
}

function saveFavorites(set) {
  try {
    const arr = Array.from(set)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(arr))
  } catch {
    // ignore
  }
}

function App() {
  const { query, search, results, loading, error, page, nextPage, prevPage, totalPages } = useTmdbSearch()
  const [favorites, setFavorites] = useState(() => loadFavorites())
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalDetails, setModalDetails] = useState(null)
  const [modalError, setModalError] = useState(null)

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  // demo: se não houver query e existir chave do TMDB, executa uma busca inicial
  useEffect(() => {
    const hasKey = Boolean(import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN)
    if (!query && hasKey) {
      // busca inicial suave para ver a lista funcionando
      search('matrix')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleFavorite = useCallback((film) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(film.id)) next.delete(film.id)
      else next.add(film.id)
      return next
    })
  }, [])

  const handleDetails = useCallback(async (film) => {
    if (!film?.id) return
    setModalOpen(true)
    setModalLoading(true)
    setModalDetails(null)
    setModalError(null)
    try {
      const data = await getMovieDetails(film.id, 'credits')
      setModalDetails(data)
    } catch (err) {
      setModalError(err)
    } finally {
      setModalLoading(false)
    }
  }, [])

  return (
    <>
      <Header />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '1rem' }}>
        <section style={{ marginBottom: '1rem' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const q = e.currentTarget.q?.value || ''
              search(q)
            }}
          >
            <input name="q" placeholder="Buscar filmes (ex: Batman)" defaultValue={query} style={{ padding: '0.6rem', width: '60%', maxWidth: 520, marginRight: 8 }} />
            <button type="submit">Buscar</button>
          </form>
        </section>

        {loading && <div>Carregando...</div>}
        {error && <div style={{ color: 'salmon' }}>Erro: {error.message}</div>}

  <CardList items={results} onToggleFavorite={handleToggleFavorite} onDetails={handleDetails} favorites={favorites} />

        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
            <button onClick={prevPage} disabled={page <= 1}>Anterior</button>
            <span>{page} / {totalPages}</span>
            <button onClick={nextPage} disabled={page >= totalPages}>Próxima</button>
          </div>
        )}
      </main>

  <Footer />

  <MovieModal open={modalOpen} onClose={() => setModalOpen(false)} loading={modalLoading} details={modalDetails} error={modalError} />
    </>
  )
}

export default App
