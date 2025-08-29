import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Hook personalizado para gerenciar navegação da aplicação
 *
 * Centraliza a lógica de navegação e fornece handlers consistentes
 * para diferentes tipos de navegação na aplicação.
 *
 * @returns {Object} Funções de navegação
 * @returns {Function} return.navigateToHome - Navega para a página inicial
 * @returns {Function} return.navigateToMovie - Navega para detalhes de um filme
 * @returns {Function} return.navigateToFavorites - Navega para página de favoritos
 * @returns {Function} return.goBack - Volta para a página anterior
 * @returns {Function} return.handleNavigate - Handler genérico para navegação baseada em tipo
 *
 * @example
 * ```jsx
 * function MovieCard({ movie }) {
 *   const { navigateToMovie, handleNavigate } = useNavigation();
 *
 *   return (
 *     <div>
 *       <button onClick={() => navigateToMovie(movie.id, movie)}>
 *         Ver detalhes
 *       </button>
 *       <button onClick={() => handleNavigate('detail', movie)}>
 *         Ver detalhes (genérico)
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useNavigation() {
  const navigate = useNavigate();

  /**
   * Navega para a página inicial
   */
  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  /**
   * Navega para os detalhes de um filme específico
   *
   * @param {number|string} movieId - ID do filme
   * @param {Object} [movieData] - Dados opcionais do filme para passar via state
   */
  const navigateToMovie = useCallback(
    (movieId, movieData) => {
      if (!movieId) {
        console.warn('useNavigation: Tentativa de navegar para filme sem ID');
        return;
      }

      const state = movieData ? { state: { film: movieData } } : undefined;
      navigate(`/movie/${movieId}`, state);
    },
    [navigate]
  );

  /**
   * Navega para a página de favoritos
   */
  const navigateToFavorites = useCallback(() => {
    navigate('/favorites');
  }, [navigate]);

  /**
   * Volta para a página anterior no histórico
   */
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  /**
   * Handler genérico para navegação baseada em tipo
   * Útil para componentes que precisam suportar diferentes tipos de navegação
   *
   * @param {string} type - Tipo de navegação ('detail', 'modal', 'back', etc.)
   * @param {Object} [data] - Dados associados à navegação (ex: filme)
   * @param {Object} [options] - Opções adicionais para navegação
   */
  const handleNavigate = useCallback(
    (type, data, options = {}) => {
      switch (type) {
        case 'detail':
          if (data?.id) {
            navigateToMovie(data.id, data);
          } else {
            console.warn('useNavigation: Dados insuficientes para navegação de detalhes');
          }
          break;

        case 'home':
          navigateToHome();
          break;

        case 'favorites':
          navigateToFavorites();
          break;

        case 'back':
          goBack();
          break;

        case 'modal':
          // Para modais, não faz navegação, apenas log se necessário
          if (options.onModalOpen && data?.id) {
            options.onModalOpen(data);
          }
          break;

        default:
          console.warn('useNavigation: Tipo de navegação não reconhecido:', type);
      }
    },
    [navigateToMovie, navigateToHome, navigateToFavorites, goBack]
  );

  return {
    navigateToHome,
    navigateToMovie,
    navigateToFavorites,
    goBack,
    handleNavigate,
  };
}

export default useNavigation;
