import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * MELHOR PRÁTICA MODERNA (2025) - Custom Hook
 *
 * Hook customizado para gerenciar navegação da aplicação
 * Separa a lógica de navegação do componente UI
 *
 * MELHORIAS IMPLEMENTADAS:
 * - Separação clara de responsabilidades
 * - Reutilização de lógica de navegação
 * - Memoização de handlers
 * - Type safety com JSDoc
 */

/**
 * Interface para objetos de navegação
 * @typedef {Object} NavigationItem
 * @property {string|number} id - ID do item
 * @property {string} [title] - Título opcional
 */

/**
 * Hook customizado para navegação da aplicação
 *
 * Centraliza toda a lógica de navegação em um lugar,
 * facilitando manutenção e testes.
 *
 * @returns {Object} Handlers de navegação
 * @property {Function} navigateToHome - Navega para página inicial
 * @property {Function} navigateToFavorites - Navega para favoritos
 * @property {Function} navigateToMovieDetail - Navega para detalhes do filme
 * @property {Function} handleNavigate - Handler genérico para navegação
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();

  /**
   * Navega para a página inicial
   */
  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  /**
   * Navega para a página de favoritos
   */
  const navigateToFavorites = useCallback(() => {
    navigate('/favorites');
  }, [navigate]);

  /**
   * Navega para os detalhes de um filme
   * @param {string|number} movieId - ID do filme
   * @param {NavigationItem} [movie] - Objeto do filme (opcional)
   */
  const navigateToMovieDetail = useCallback((movieId, movie) => {
    if (movieId) {
      navigate(`/movie/${movieId}`, {
        state: movie ? { film: movie } : undefined
      });
    }
  }, [navigate]);

  /**
   * Handler genérico para navegação baseado no tipo
   * @param {string} type - Tipo de navegação ('detail', 'home', 'favorites')
   * @param {NavigationItem} [item] - Item relacionado à navegação
   */
  const handleNavigate = useCallback((type, item) => {
    switch (type) {
      case 'detail':
        if (item?.id) {
          navigateToMovieDetail(item.id, item);
        }
        break;
      case 'home':
        navigateToHome();
        break;
      case 'favorites':
        navigateToFavorites();
        break;
      default:
        console.warn(`Tipo de navegação não reconhecido: ${type}`);
    }
  }, [navigateToHome, navigateToFavorites, navigateToMovieDetail]);

  return {
    navigateToHome,
    navigateToFavorites,
    navigateToMovieDetail,
    handleNavigate,
  };
};
