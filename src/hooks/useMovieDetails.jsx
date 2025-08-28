import { useState, useCallback } from 'react';
import { getMovieDetails } from '../services/tmdb';

// Hook para buscar detalhes de um filme
export default function useMovieDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);

  const fetchDetails = useCallback(async (id) => {
    if (!id) {
      setDetails(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getMovieDetails(id);
      setDetails(data);
    } catch (err) {
      setError(err);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setDetails(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    details,
    loading,
    error,
    fetchDetails,
    reset,
  };
}
