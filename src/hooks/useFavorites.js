import { useContext, useMemo } from 'react';
import { FavoritesContext } from '../contexts/favoritesCore';

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
