import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  FavoritesContext,
  loadFavorites,
  saveFavorites,
  validateFilm,
  normalizeFavoriteFilm,
} from './favoritesCore';

/**
 * Provider para gerenciamento de filmes favoritos
 *
 * Fornece funcionalidades completas para adicionar, remover e gerenciar
 * filmes favoritos com persistência no localStorage, validação de dados
 * e estados computados para melhor experiência do usuário.
 *
 * @param {Object} props - Props do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 * @returns {JSX.Element} Provider com contexto de favoritos
 *
 * @example
 * ```jsx
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 * ```
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Carrega favoritos apenas no cliente
    if (typeof window === 'undefined') return {};
    return loadFavorites();
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Ref para controlar operações assíncronas
  const operationRef = useRef(0);

  // Estados computados memoizados
  const count = useMemo(() => {
    return Object.keys(favorites || {}).length;
  }, [favorites]);

  const isEmpty = useMemo(() => {
    return count === 0;
  }, [count]);

  const favoriteIds = useMemo(() => {
    return Object.keys(favorites || {});
  }, [favorites]);

  const favoriteFilms = useMemo(() => {
    return Object.values(favorites || {});
  }, [favorites]);

  // Ref para controlar primeira renderização
  const isFirstRender = useRef(true);

  // Persistir no localStorage quando favorites mudam
  useEffect(() => {
    // Pular primeira renderização
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const operationId = ++operationRef.current;

    const saveAsync = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Pequeno delay para evitar saves excessivos
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Verificar se ainda é a operação mais recente
        if (operationId !== operationRef.current) return;

        saveFavorites(favorites);
      } catch (err) {
        // Verificar se ainda é a operação mais recente
        if (operationId !== operationRef.current) return;

        const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar favoritos';
        setError(new Error(errorMessage));
        console.error('Erro ao salvar favoritos:', err);
      } finally {
        if (operationId === operationRef.current) {
          setIsLoading(false);
        }
      }
    };

    saveAsync();
  }, [favorites]);

  /**
   * Adiciona ou remove um filme dos favoritos
   *
   * @param {Object} film - Objeto do filme
   * @param {number} film.id - ID único do filme
   * @param {string} film.title - Título do filme
   */
  const toggleFavorite = useCallback((film) => {
    try {
      setError(null);

      if (!validateFilm(film)) {
        throw new Error('Filme inválido para adicionar aos favoritos');
      }

      setFavorites((prev) => {
        const next = { ...(prev || {}) };
        const key = String(film.id);

        if (next[key]) {
          // Remove dos favoritos
          delete next[key];
        } else {
          // Adiciona aos favoritos
          next[key] = normalizeFavoriteFilm(film);
        }

        return next;
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao alterar favorito';
      setError(new Error(errorMessage));
      console.error('Erro ao alterar favorito:', err);
    }
  }, []);

  /**
   * Verifica se um filme está nos favoritos
   *
   * @param {number|string} filmId - ID do filme
   * @returns {boolean} True se está nos favoritos
   */
  const isFavorite = useCallback(
    (filmId) => {
      if (!filmId) return false;
      const key = String(filmId);
      return Boolean(favorites?.[key]);
    },
    [favorites]
  );

  /**
   * Obtém um filme favorito pelo ID
   *
   * @param {number|string} filmId - ID do filme
   * @returns {Object|null} Filme favorito ou null se não encontrado
   */
  const getFavorite = useCallback(
    (filmId) => {
      if (!filmId) return null;
      const key = String(filmId);
      return favorites?.[key] || null;
    },
    [favorites]
  );

  /**
   * Limpa todos os favoritos
   */
  const clearFavorites = useCallback(() => {
    try {
      setError(null);
      setFavorites({});
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao limpar favoritos';
      setError(new Error(errorMessage));
      console.error('Erro ao limpar favoritos:', err);
    }
  }, []);

  /**
   * Adiciona múltiplos filmes aos favoritos
   *
   * @param {Array} films - Array de filmes
   */
  const addMultipleFavorites = useCallback((films) => {
    if (!Array.isArray(films)) {
      console.warn('addMultipleFavorites: parâmetro deve ser um array');
      return;
    }

    try {
      setError(null);

      setFavorites((prev) => {
        const next = { ...(prev || {}) };

        films.forEach((film) => {
          if (validateFilm(film)) {
            const key = String(film.id);
            next[key] = normalizeFavoriteFilm(film);
          }
        });

        return next;
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao adicionar múltiplos favoritos';
      setError(new Error(errorMessage));
      console.error('Erro ao adicionar múltiplos favoritos:', err);
    }
  }, []);

  // Valor do contexto com todas as funcionalidades
  const value = useMemo(
    () => ({
      // Estado
      favorites,
      count,
      isEmpty,
      favoriteIds,
      favoriteFilms,
      error,
      isLoading,

      // Ações
      toggleFavorite,
      clearFavorites,
      isFavorite,
      getFavorite,
      addMultipleFavorites,

      // Estados computados para UX
      hasFavorites: !isEmpty,
      canClear: !isEmpty,
      hasError: Boolean(error),
    }),
    [
      favorites,
      count,
      isEmpty,
      favoriteIds,
      favoriteFilms,
      error,
      isLoading,
      toggleFavorite,
      clearFavorites,
      isFavorite,
      getFavorite,
      addMultipleFavorites,
    ]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
