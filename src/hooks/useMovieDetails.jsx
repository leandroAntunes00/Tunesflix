import { useState, useCallback, useMemo } from 'react';
import { getMovieDetails } from '../services/tmdb';

export default function useMovieDetails() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(null);
  const [lastFetchedId, setLastFetchedId] = useState(null);

  // Estados computados memoizados
  const hasDetails = useMemo(() => details !== null, [details]);
  const hasError = useMemo(() => error !== null, [error]);

  /**
   * Busca detalhes de um filme específico
   * @param {number|string} id - ID do filme
   * @returns {Promise<void>}
   */
  const fetchDetails = useCallback(
    async (id) => {
      // Validação do ID
      if (!id || (typeof id !== 'number' && typeof id !== 'string')) {
        setDetails(null);
        setError(new Error('ID do filme inválido'));
        setLoading(false);
        return;
      }

      // Evitar requisições desnecessárias se já temos os dados
      if (lastFetchedId === id && details && !error) {
        return;
      }

      setLoading(true);
      setError(null);
      setLastFetchedId(id);

      try {
        const data = await getMovieDetails(id);

        // Validação básica dos dados recebidos
        if (!data || typeof data !== 'object') {
          throw new Error('Dados do filme inválidos');
        }

        if (!data.id) {
          throw new Error('ID do filme não encontrado na resposta');
        }

        setDetails(data);
      } catch (err) {
        const errorMessage = err?.message || 'Erro ao carregar detalhes do filme';
        setError(new Error(errorMessage));
        setDetails(null);
      } finally {
        setLoading(false);
      }
    },
    [lastFetchedId, details, error]
  );

  /**
   * Reseta o estado do hook
   */
  const reset = useCallback(() => {
    setDetails(null);
    setError(null);
    setLoading(false);
    setLastFetchedId(null);
  }, []);

  /**
   * Tenta novamente a última requisição
   */
  const retry = useCallback(() => {
    if (lastFetchedId !== null) {
      fetchDetails(lastFetchedId);
    }
  }, [lastFetchedId, fetchDetails]);

  return {
    details,
    loading,
    error,
    fetchDetails,
    reset,
    hasDetails,
    hasError,
    retry,
    // Informações adicionais para debug
    lastFetchedId,
  };
}
