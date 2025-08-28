import { useState, useRef, useCallback } from 'react';
import { searchMovies, fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies } from '../services/tmdb';

// Hook para buscar filmes na nova API com paginação
export default function useTmdbSearch(initialQuery = '', initialPage = 1, initialCategory = 'popular') {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [category, setCategory] = useState(initialCategory);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // request id para evitar condições de corrida
  const requestRef = useRef(0);

  const fetchPage = useCallback(async (q, p = 1) => {
    const trimmed = (q || '').trim();
    // se query vazio, retorna undefined para indicar que o chamador pode
    // optar por carregar a lista padrão (populares)
    if (!trimmed) {
      setResults([]);
      setTotalPages(0);
      setTotalResults(0);
      setPage(1);
      setError(null);
      setLoading(false);
      return undefined;
    }

    const thisRequest = ++requestRef.current;
    setLoading(true);
    setError(null);

    try {
      const res = await searchMovies(trimmed, p);
      // ignorar respostas antigas
      if (thisRequest !== requestRef.current) return;

      setResults(res.results || []);
      setTotalPages(res.total_pages || 0);
      setTotalResults(res.total_results || 0);
      setPage(res.page || p);
    } catch (err) {
      if (thisRequest !== requestRef.current) return;
      setError(err);
    } finally {
      if (thisRequest === requestRef.current) setLoading(false);
    }
  }, []);

  const search = useCallback(
    (q) => {
      setQuery(q);
      // iniciar pela página 1
      fetchPage(q, 1);
    },
    [fetchPage]
  );

  const fetchDefault = useCallback(async (p = 1) => {
    const thisRequest = ++requestRef.current;
    setLoading(true);
    setError(null);
    try {
      let res;
      switch (category) {
        case 'top-rated':
          res = await fetchTopRatedMovies(p);
          break;
        case 'now-playing':
          res = await fetchNowPlayingMovies(p);
          break;
        case 'popular':
        default:
          res = await fetchPopularMovies(p);
          break;
      }
      if (thisRequest !== requestRef.current) return;
      setResults(res.results || []);
      setTotalPages(res.total_pages || 0);
      setTotalResults(res.total_results || 0);
      setPage(res.page || p);
    } catch (err) {
      if (thisRequest !== requestRef.current) return;
      setError(err);
    } finally {
      if (thisRequest === requestRef.current) setLoading(false);
    }
  }, [category]);

  const goToPage = useCallback(
    (p) => {
      const target = Math.max(1, Math.floor(p));
      // Se não houver query, assumimos que o usuário está vendo a lista padrão
      // (por exemplo, populares) e usamos fetchDefault para navegar.
      if (!query || !query.trim()) {
        // fetchDefault é seguro de ser chamado mesmo que já estejamos na primeira página
        fetchDefault(target);
        return;
      }

      // para buscas por query, fazemos a paginação normal
      fetchPage(query, target);
    },
    [fetchPage, fetchDefault, query]
  );

  const nextPage = useCallback(() => goToPage(page + 1), [goToPage, page]);
  const prevPage = useCallback(() => goToPage(page - 1), [goToPage, page]);

  const reset = useCallback(() => {
    requestRef.current++;
    setQuery('');
    setPage(1);
    setResults([]);
    setTotalPages(0);
    setTotalResults(0);
    setError(null);
    setLoading(false);
  }, []);

  const changeCategory = useCallback((newCategory) => {
    setCategory(newCategory);
    setQuery('');
    setPage(1);
    setResults([]);
    setTotalPages(0);
    setTotalResults(0);
    setError(null);
    // Carregar a nova categoria
    fetchDefault(1);
  }, [fetchDefault]);

  return {
    query,
    setQuery,
    search,
    page,
    setPage: goToPage,
    nextPage,
    prevPage,
    results,
    totalPages,
    totalResults,
    loading,
    error,
    reset,
    fetchPage, // exposto para casos avançados
    fetchDefault,
    category,
    setCategory: changeCategory,
  };
}
