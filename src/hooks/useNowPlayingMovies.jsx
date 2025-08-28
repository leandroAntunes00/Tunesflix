import { useState, useRef, useCallback } from 'react';
import { fetchNowPlayingMovies } from '../services/tmdb';

// Hook para buscar filmes em cartaz
export default function useNowPlayingMovies(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // request id para evitar condições de corrida
  const requestRef = useRef(0);

  const fetchMovies = useCallback(async (p = 1) => {
    const thisRequest = ++requestRef.current;
    setLoading(true);
    setError(null);

    try {
      const res = await fetchNowPlayingMovies(p);
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

  const goToPage = useCallback(
    (p) => {
      const target = Math.max(1, Math.floor(p));
      fetchMovies(target);
    },
    [fetchMovies]
  );

  const nextPage = useCallback(() => goToPage(page + 1), [goToPage, page]);
  const prevPage = useCallback(() => goToPage(page - 1), [goToPage, page]);

  const reset = useCallback(() => {
    requestRef.current++;
    setPage(1);
    setResults([]);
    setTotalPages(0);
    setTotalResults(0);
    setError(null);
    setLoading(false);
  }, []);

  return {
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
    fetchMovies,
  };
}
