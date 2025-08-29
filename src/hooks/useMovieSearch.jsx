import { useState, useRef, useCallback, useMemo } from 'react';
import { searchMovies } from '../services/tmdb';

export default function useMovieSearch(initialQuery = '', initialPage = 1) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Request ID para evitar condições de corrida
  const requestRef = useRef(0);

  // Estados computados memoizados
  const hasResults = useMemo(() => results.length > 0, [results.length]);
  const hasError = useMemo(() => error !== null, [error]);
  const canGoNext = useMemo(() => page < totalPages, [page, totalPages]);
  const canGoPrev = useMemo(() => page > 1, [page]);
  const isEmptyQuery = useMemo(() => !query.trim(), [query]);

  /**
   * Executa busca de filmes
   * @param {string} q - Query de busca
   * @param {number} p - Página (padrão: 1)
   */
  const search = useCallback(async (q, p = 1) => {
    const trimmedQuery = (q || '').trim();

    // Validação da query
    if (!trimmedQuery) {
      setResults([]);
      setTotalPages(0);
      setTotalResults(0);
      setPage(1);
      setError(null);
      setLoading(false);
      return;
    }

    // Validação da página
    const targetPage = Math.max(1, Math.floor(p) || 1);

    const thisRequest = ++requestRef.current;
    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(trimmedQuery, targetPage);

      // Verificar se esta é a resposta mais recente (evitar condições de corrida)
      if (thisRequest !== requestRef.current) return;

      // Validação da resposta
      if (!response || typeof response !== 'object') {
        throw new Error('Resposta inválida do servidor');
      }

      const {
        results: searchResults = [],
        total_pages = 0,
        total_results = 0,
        page: responsePage = targetPage,
      } = response;

      // Validação dos dados
      if (!Array.isArray(searchResults)) {
        throw new Error('Formato de resultados inválido');
      }

      setResults(searchResults);
      setTotalPages(Math.max(0, total_pages));
      setTotalResults(Math.max(0, total_results));
      setPage(responsePage);
      setQuery(trimmedQuery);
    } catch (err) {
      // Verificar se esta é a resposta mais recente
      if (thisRequest !== requestRef.current) return;

      const errorMessage = err?.message || 'Erro ao buscar filmes';
      setError(new Error(errorMessage));
      setResults([]);
      setTotalPages(0);
      setTotalResults(0);
    } finally {
      // Só atualizar loading se esta for a resposta mais recente
      if (thisRequest === requestRef.current) {
        setLoading(false);
      }
    }
  }, []);

  /**
   * Vai para página específica
   * @param {number} p - Página alvo
   */
  const goToPage = useCallback(
    (p) => {
      const targetPage = Math.max(1, Math.floor(p));
      if (targetPage !== page && query.trim()) {
        search(query, targetPage);
      }
    },
    [search, query, page]
  );

  /**
   * Vai para próxima página
   */
  const nextPage = useCallback(() => {
    if (canGoNext) {
      goToPage(page + 1);
    }
  }, [goToPage, page, canGoNext]);

  /**
   * Vai para página anterior
   */
  const prevPage = useCallback(() => {
    if (canGoPrev) {
      goToPage(page - 1);
    }
  }, [goToPage, page, canGoPrev]);

  /**
   * Reseta completamente o estado da busca
   */
  const reset = useCallback(() => {
    requestRef.current++; // Cancela requisições pendentes
    setQuery('');
    setPage(1);
    setResults([]);
    setTotalPages(0);
    setTotalResults(0);
    setError(null);
    setLoading(false);
  }, []);

  return {
    // Estado
    query,
    page,
    results,
    totalPages,
    totalResults,
    loading,
    error,

    // Funções
    setQuery,
    search,
    setPage: goToPage,
    nextPage,
    prevPage,
    reset,

    // Estados computados
    hasResults,
    hasError,
    canGoNext,
    canGoPrev,
    isEmptyQuery,
  };
}
