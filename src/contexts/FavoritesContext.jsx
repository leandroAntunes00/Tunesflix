import React, { useEffect, useState, useCallback } from 'react';
import { FavoritesContext, loadFavorites, saveFavorites } from './favoritesCore';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    if (typeof window === 'undefined') return {};
    return loadFavorites();
  });

  useEffect(() => {
    try {
      saveFavorites(favorites);
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = useCallback((film) => {
    setFavorites((prev) => {
      const next = { ...(prev || {}) };
      const key = String(film.id);
      if (next[key]) delete next[key];
      else
        next[key] = {
          id: film.id,
          title: film.title || film.name,
          poster_path: film.poster_path || film.poster,
          release_date: film.release_date || film.first_air_date,
        };
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => setFavorites({}), []);

  const value = {
    favorites,
    toggleFavorite,
    clearFavorites,
    count: Object.keys(favorites || {}).length,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
