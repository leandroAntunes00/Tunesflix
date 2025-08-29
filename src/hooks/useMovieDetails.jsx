import { useState, useCallback, useMemo } from 'react';
import { getMovieDetails } from '../services/tmdb';

/**
 * Hook personalizado para buscar e gerenciar detalhes de filmes
 *
 * Fornece funcionalidades completas para:
 * - Buscar detalhes de um filme específico
 * - Gerenciar estados de loading e erro
 * - Reset dos dados
 * - Cache básico para evitar requisições desnecessárias
 * - Validação de dados
 *
 * @returns {Object} Objeto com estado e funções para detalhes do filme
 * @returns {Object|null} return.details - Detalhes do filme carregado ou null
 * @returns {boolean} return.loading - Indica se está carregando dados
 * @returns {Error|null} return.error - Erro ocorrido durante o carregamento ou null
 * @returns {Function} return.fetchDetails - Função para buscar detalhes de um filme
 * @returns {Function} return.reset - Função para resetar o estado
 * @returns {boolean} return.hasDetails - Indica se há detalhes carregados
 * @returns {boolean} return.hasError - Indica se há erro
 * @returns {Function} return.retry - Função para tentar novamente a última requisição
 *
 * @example
 * ```jsx
 * import { useMovieDetails } from '../hooks/useMovieDetails';
 *
 * function MovieDetailsPage({ movieId }) {
 *   const {
 *     details,
 *     loading,
 *     error,
 *     fetchDetails,
 *     hasDetails,
 *     retry
 *   } = useMovieDetails();
 *
 *   React.useEffect(() => {
 *     if (movieId) {
 *       fetchDetails(movieId);
 *     }
 *   }, [movieId, fetchDetails]);
 *
 *   if (loading) return <div>Carregando...</div>;
 *   if (error) return <div>Erro: {error.message} <button onClick={retry}>Tentar novamente</button></div>;
 *   if (!hasDetails) return <div>Selecione um filme</div>;
 *
 *   return (
 *     <div>
 *       <h1>{details.title}</h1>
 *       <p>{details.overview}</p>
 *     </div>
 *   );
 * }
 * ```
 */
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
