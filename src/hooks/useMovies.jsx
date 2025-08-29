import { useState, useCallback, useEffect, useMemo } from 'react';
import usePopularMovies from './usePopularMovies';
import useTopRatedMovies from './useTopRatedMovies';
import useNowPlayingMovies from './useNowPlayingMovies';
import useMovieSearch from './useMovieSearch';

export default function useMovies(initialCategory = 'popular') {
  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks para cada categoria
  const popular = usePopularMovies();
  const topRated = useTopRatedMovies();
  const nowPlaying = useNowPlayingMovies();
  const search = useMovieSearch();

  // Estados computados memoizados
  const isSearching = useMemo(() => Boolean(searchQuery), [searchQuery]);

  // Função para obter o hook ativo baseado na categoria
  const getActiveHook = useCallback(() => {
    switch (category) {
      case 'top-rated':
        return topRated;
      case 'now-playing':
        return nowPlaying;
      case 'popular':
      default:
        return popular;
    }
  }, [category, popular, topRated, nowPlaying]);

  // Hook ativo baseado no estado de busca
  const activeHook = useMemo(() => {
    return isSearching ? search : getActiveHook();
  }, [isSearching, search, getActiveHook]);

  // Estados computados para UX
  const hasResults = useMemo(() => {
    return activeHook.results && activeHook.results.length > 0;
  }, [activeHook.results]);

  const canLoadMore = useMemo(() => {
    return activeHook.page < activeHook.totalPages && !activeHook.loading;
  }, [activeHook.page, activeHook.totalPages, activeHook.loading]);

  const hasError = useMemo(() => {
    return Boolean(activeHook.error);
  }, [activeHook.error]);

  const isLoading = useMemo(() => {
    return activeHook.loading;
  }, [activeHook.loading]);

  const isEmpty = useMemo(() => {
    return !isLoading && !hasError && !hasResults;
  }, [isLoading, hasError, hasResults]);

  // Carrega a categoria ativa na montagem inicial (evita lista vazia ao abrir a Home)
  useEffect(() => {
    try {
      const hook = getActiveHook();
      if (hook && typeof hook.fetchMovies === 'function') {
        // só buscar se ainda não houver resultados
        if (!hook.results || hook.results.length === 0) {
          hook.fetchMovies(1);
        }
      }
    } catch {
      // não bloquear em caso de erro incidental
    }
    // intencionalmente vazio: queremos executar apenas na montagem inicial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Validação de query de busca
  const isValidSearchQuery = useCallback((query) => {
    return typeof query === 'string' && query.trim().length > 0;
  }, []);

  // Função para mudar categoria
  const changeCategory = useCallback(
    (newCategory) => {
      // Validação simples de categoria
      if (!['popular', 'top-rated', 'now-playing'].includes(newCategory)) {
        console.warn(`Categoria inválida: ${newCategory}. Usando 'popular' como fallback.`);
        newCategory = 'popular';
      }

      setCategory(newCategory);
      setSearchQuery('');

      // Resetar a busca quando mudar categoria
      if (search.reset) {
        search.reset();
      }

      // Carregar a nova categoria usando a categoria passada diretamente
      const hook =
        newCategory === 'top-rated'
          ? topRated
          : newCategory === 'now-playing'
            ? nowPlaying
            : popular;

      if (hook && typeof hook.fetchMovies === 'function') {
        hook.fetchMovies(1);
      }
    },
    [search, topRated, nowPlaying, popular]
  );

  // Função para buscar
  const handleSearch = useCallback(
    (query) => {
      if (!isValidSearchQuery(query)) {
        // Se query vazia, voltar para categoria atual
        setSearchQuery('');
        const hook = getActiveHook();
        if (hook && typeof hook.fetchMovies === 'function') {
          hook.fetchMovies(1);
        }
        return;
      }

      setSearchQuery(query.trim());
      if (search.search) {
        search.search(query.trim(), 1);
      }
    },
    [search, getActiveHook, isValidSearchQuery]
  );

  // Função para carregar mais resultados
  const loadMore = useCallback(() => {
    if (!canLoadMore) return;

    const hook = activeHook;
    if (isSearching && hook.search) {
      // Se está buscando, usar search com próxima página
      hook.search(searchQuery, hook.page + 1);
    } else if (hook.fetchMovies) {
      // Se é categoria, usar fetchMovies com próxima página
      hook.fetchMovies(hook.page + 1);
    }
  }, [canLoadMore, activeHook, isSearching, searchQuery]);

  // Função para resetar tudo
  const reset = useCallback(() => {
    setSearchQuery('');
    setCategory('popular');

    // Resetar todos os hooks
    if (search.reset) search.reset();
    if (popular.reset) popular.reset();
    if (topRated.reset) topRated.reset();
    if (nowPlaying.reset) nowPlaying.reset();
  }, [search, popular, topRated, nowPlaying]);

  return {
    // Estado atual
    category,
    searchQuery,
    isSearching,

    // Estados computados para UX
    hasResults,
    canLoadMore,
    hasError,
    isLoading,
    isEmpty,

    // Dados do hook ativo (spread para manter compatibilidade)
    ...activeHook,

    // Ações
    changeCategory,
    search: handleSearch,
    loadMore,
    reset,

    // Acesso direto aos hooks (para casos especiais)
    hooks: {
      popular,
      topRated,
      nowPlaying,
      search,
    },
  };
}
