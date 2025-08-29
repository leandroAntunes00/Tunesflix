import { useState, useCallback } from 'react';
import { getMovieDetails, withTimeout } from '../services/tmdb';

/**
 * Hook personalizado para gerenciar o modal de detalhes do filme
 *
 * Centraliza toda a lógica relacionada ao modal de detalhes em um lugar reutilizável.
 * Fornece estado consistente e tratamento robusto de erros para carregamento de detalhes.
 *
 * @returns {Object} Estado e funções do modal
 * @returns {boolean} return.open - Se o modal está aberto
 * @returns {boolean} return.loading - Se está carregando dados
 * @returns {Object|null} return.details - Detalhes do filme carregado
 * @returns {Error|null} return.error - Erro ocorrido durante o carregamento
 * @returns {Function} return.openModal - Função para abrir o modal e carregar detalhes
 * @returns {Function} return.closeModal - Função para fechar o modal e limpar estado
 *
 * @example
 * ```jsx
 * function MovieCard({ movie }) {
 *   const { open, loading, details, error, openModal, closeModal } = useMovieDetailsModal();
 *
 *   return (
 *     <>
 *       <button onClick={() => openModal(movie)}>Ver detalhes</button>
 *       <MovieModal
 *         open={open}
 *         onClose={closeModal}
 *         loading={loading}
 *         details={details}
 *         error={error}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function useMovieDetailsModal() {
  const [modalState, setModalState] = useState({
    open: false,
    loading: false,
    details: null,
    error: null,
  });

  /**
   * Abre o modal e carrega os detalhes do filme
   *
   * @param {Object} film - Objeto do filme com pelo menos a propriedade id
   * @param {number|string} film.id - ID único do filme
   */
  const openModal = useCallback(async (film) => {
    if (!film?.id) {
      console.warn('useMovieDetailsModal: Tentativa de abrir modal sem ID do filme');
      return;
    }

    // Reset do estado para nova abertura
    setModalState({
      open: true,
      loading: true,
      details: null,
      error: null,
    });

    try {
      // Timeout para proteger contra chamadas que nunca retornam
      const data = await withTimeout(getMovieDetails(film.id), 8000);

      // Validação robusta da resposta da API
      if (!data || typeof data !== 'object') {
        throw new Error('Resposta de detalhes inválida - dados não encontrados');
      }

      // Verificar se tem pelo menos um identificador e título
      if (!data.id && !data.title && !data.name) {
        throw new Error('Resposta de detalhes inválida - campos obrigatórios ausentes');
      }

      // Atualizar estado com dados carregados
      setModalState((prev) => ({
        ...prev,
        loading: false,
        details: data,
      }));
    } catch (err) {
      console.error('useMovieDetailsModal: Erro ao carregar detalhes do filme:', err);

      // Determinar mensagem de erro apropriada
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido ao carregar detalhes';

      // Atualizar estado com erro
      setModalState((prev) => ({
        ...prev,
        loading: false,
        error: new Error(errorMessage),
      }));
    }
  }, []);

  /**
   * Fecha o modal e limpa todo o estado
   */
  const closeModal = useCallback(() => {
    setModalState({
      open: false,
      loading: false,
      details: null,
      error: null,
    });
  }, []);

  return {
    // Estado atual
    open: modalState.open,
    loading: modalState.loading,
    details: modalState.details,
    error: modalState.error,

    // Ações
    openModal,
    closeModal,
  };
}

export default useMovieDetailsModal;
