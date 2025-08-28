import { useState, useCallback } from 'react';
import usePopularMovies from './usePopularMovies';
import useTopRatedMovies from './useTopRatedMovies';
import useNowPlayingMovies from './useNowPlayingMovies';
import useMovieSearch from './useMovieSearch';

// Hook principal que gerencia todas as categorias e buscas
export default function useMovies(initialCategory = 'popular') {
  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks para cada categoria
  const popular = usePopularMovies();
  const topRated = useTopRatedMovies();
  const nowPlaying = useNowPlayingMovies();
  const search = useMovieSearch();

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

  // Quando há busca ativa, usar o hook de busca
  const activeHook = searchQuery ? search : getActiveHook();

  // Função para mudar categoria
  const changeCategory = useCallback((newCategory) => {
    setCategory(newCategory);
    setSearchQuery('');
    // Resetar a busca quando mudar categoria
    search.reset();
    // Carregar a nova categoria
    const hook = newCategory === 'top-rated' ? topRated :
                 newCategory === 'now-playing' ? nowPlaying : popular;
    hook.fetchMovies(1);
  }, [search, topRated, nowPlaying, popular]);

  // Função para buscar
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query && query.trim()) {
      search.search(query, 1);
    } else {
      setSearchQuery('');
      // Voltar para a categoria atual
      getActiveHook().fetchMovies(1);
    }
  }, [search, getActiveHook]);

  // Função para resetar tudo
  const reset = useCallback(() => {
    setSearchQuery('');
    setCategory('popular');
    search.reset();
    popular.reset();
    topRated.reset();
    nowPlaying.reset();
  }, [search, popular, topRated, nowPlaying]);

  return {
    // Estado atual
    category,
    searchQuery,
    isSearching: Boolean(searchQuery),

    // Dados do hook ativo
    ...activeHook,

    // Ações
    changeCategory,
    search: handleSearch,
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
