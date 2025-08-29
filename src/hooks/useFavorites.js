import { useContext, useMemo } from 'react';
import { FavoritesContext } from '../contexts/favoritesCore';

/**
 * Hook personalizado para gerenciamento de favoritos
 *
 * Fornece acesso ao contexto de favoritos com funcionalidades para:
 * - Adicionar/remover filmes dos favoritos
 * - Limpar todos os favoritos
 * - Obter contagem de favoritos
 * - Verificar se um filme está favoritado
 *
 * @returns {Object} Objeto com estado e funções dos favoritos
 * @returns {Object} return.favorites - Objeto com todos os filmes favoritados (chave: id do filme)
 * @returns {Function} return.toggleFavorite - Função para adicionar/remover filme dos favoritos
 * @returns {Function} return.clearFavorites - Função para limpar todos os favoritos
 * @returns {number} return.count - Número total de filmes favoritados
 * @returns {Function} return.isFavorite - Função para verificar se um filme está favoritado
 * @returns {boolean} return.hasFavorites - Booleano indicando se há favoritos
 *
 * @example
 * ```jsx
 * import { useFavorites } from '../hooks/useFavorites';
 *
 * function MovieCard({ movie }) {
 *   const { toggleFavorite, isFavorite, count } = useFavorites();
 *
 *   return (
 *     <div>
 *       <button onClick={() => toggleFavorite(movie)}>
 *         {isFavorite(movie.id) ? '❤️' : '🤍'}
 *       </button>
 *       <span>Favoritos: {count}</span>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFavorites() {
  const ctx = useContext(FavoritesContext);

  // Funções memoizadas para performance - sempre chamadas antes de qualquer return
  const isFavorite = useMemo(
    () => (movieId) => {
      if (!ctx || !movieId) return false;
      return Boolean(ctx.favorites[String(movieId)]);
    },
    [ctx]
  );

  const hasFavorites = useMemo(() => {
    if (!ctx) return false;
    return Object.keys(ctx.favorites || {}).length > 0;
  }, [ctx]);

  // Retorna valores padrão se contexto não estiver disponível
  if (!ctx) {
    console.warn('useFavorites deve ser usado dentro de um FavoritesProvider');

    return {
      favorites: {},
      toggleFavorite: () => {
        console.warn('FavoritesProvider não encontrado - toggleFavorite não funcionará');
      },
      clearFavorites: () => {
        console.warn('FavoritesProvider não encontrado - clearFavorites não funcionará');
      },
      count: 0,
      isFavorite,
      hasFavorites,
    };
  }

  return {
    ...ctx,
    isFavorite,
    hasFavorites,
  };
}

export { FavoritesProvider } from '../contexts/FavoritesContext';
