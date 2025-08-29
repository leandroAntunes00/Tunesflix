import { useState, useRef, useCallback, useMemo } from 'react';
import { fetchTopRatedMovies } from '../services/tmdb';

export default function useTopRatedMovies(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Request ID para evitar condições de corrida
  const requestRef = useRef(0);

  // Estados computados memoizados
  const hasResults = useMemo(() => {
    return results && results.length > 0;
  }, [results]);

  const canGoNext = useMemo(() => {
    return page < totalPages && !loading;
  }, [page, totalPages, loading]);

  const canGoPrev = useMemo(() => {
    return page > 1 && !loading;
  }, [page, loading]);

  const hasError = useMemo(() => {
    return Boolean(error);
  }, [error]);

  const isEmpty = useMemo(() => {
    return !loading && !hasError && !hasResults;
  }, [loading, hasError, hasResults]);

  // Validação de página
  const validatePage = useCallback((targetPage) => {
    if (typeof targetPage !== 'number' || isNaN(targetPage)) {
      return 1; // fallback para página 1
    }
    return Math.max(1, Math.floor(targetPage));
  }, []);

  // Validação de resposta da API
  const validateResponse = useCallback((response) => {
    if (!response || typeof response !== 'object') {
      throw new Error('Resposta inválida do servidor');
    }

    return {
      results: Array.isArray(response.results) ? response.results : [],
      page: typeof response.page === 'number' ? response.page : 1,
      totalPages: typeof response.total_pages === 'number' ? response.total_pages : 0,
      totalResults: typeof response.total_results === 'number' ? response.total_results : 0,
    };
  }, []);

  const fetchMovies = useCallback(
    async (p = 1) => {
      const targetPage = validatePage(p);
      const thisRequest = ++requestRef.current;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchTopRatedMovies(targetPage);

        // Ignorar respostas antigas (condições de corrida)
        if (thisRequest !== requestRef.current) return;

        const validatedData = validateResponse(response);

        setResults(validatedData.results);
        setTotalPages(validatedData.totalPages);
        setTotalResults(validatedData.totalResults);
        setPage(targetPage); // Usar a página solicitada, não a retornada pela API
      } catch (err) {
        // Ignorar erros de requests antigos
        if (thisRequest !== requestRef.current) return;

        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido ao carregar filmes';
        setError(new Error(errorMessage));
      } finally {
        // Só atualizar loading se for o request atual
        if (thisRequest === requestRef.current) {
          setLoading(false);
        }
      }
    },
    [validatePage, validateResponse]
  );

  const goToPage = useCallback(
    (targetPage) => {
      const validatedPage = validatePage(targetPage);
      if (validatedPage !== page) {
        fetchMovies(validatedPage);
      }
    },
    [fetchMovies, validatePage, page]
  );

  const nextPage = useCallback(() => {
    if (canGoNext) {
      goToPage(page + 1);
    }
  }, [goToPage, page, canGoNext]);

  const prevPage = useCallback(() => {
    if (canGoPrev) {
      goToPage(page - 1);
    }
  }, [goToPage, page, canGoPrev]);

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
    results,
    totalPages,
    totalResults,
    loading,
    error,
    reset,
    fetchMovies,
    goToPage,
    nextPage,
    prevPage,

    // Estados computados para UX
    hasResults,
    canGoNext,
    canGoPrev,
    hasError,
    isEmpty,

    // Alias para compatibilidade
    setPage: goToPage,
  };
}
