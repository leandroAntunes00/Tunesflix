import { useState, useCallback } from 'react';
import { getMovieDetails, withTimeout } from '../services/tmdb';

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
