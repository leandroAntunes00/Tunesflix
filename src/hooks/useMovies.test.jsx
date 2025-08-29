import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Preparar mocks dos hooks internos antes de importar useMovies
const popularMock = {
  results: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  fetchMovies: vi.fn(),
  reset: vi.fn(),
};
const topRatedMock = { ...popularMock, fetchMovies: vi.fn(), reset: vi.fn() };
const nowPlayingMock = { ...popularMock, fetchMovies: vi.fn(), reset: vi.fn() };
const searchMock = {
  results: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  search: vi.fn(),
  reset: vi.fn(),
};

vi.mock('./usePopularMovies', () => ({ __esModule: true, default: () => popularMock }));
vi.mock('./useTopRatedMovies', () => ({ __esModule: true, default: () => topRatedMock }));
vi.mock('./useNowPlayingMovies', () => ({ __esModule: true, default: () => nowPlayingMock }));
vi.mock('./useMovieSearch', () => ({ __esModule: true, default: () => searchMock }));

import useMovies from './useMovies';

describe('useMovies hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Estado inicial', () => {
    it('inicia com categoria padrão', () => {
      const { result } = renderHook(() => useMovies());

      expect(result.current.category).toBe('popular');
      expect(result.current.searchQuery).toBe('');
      expect(result.current.isSearching).toBe(false);
    });

    it('inicia com categoria personalizada', () => {
      const { result } = renderHook(() => useMovies('top-rated'));

      expect(result.current.category).toBe('top-rated');
    });

    it('inicia com estados computados corretos', () => {
      const { result } = renderHook(() => useMovies());

      expect(result.current.hasResults).toBe(false);
      expect(result.current.canLoadMore).toBe(false);
      expect(result.current.hasError).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isEmpty).toBe(true);
    });
  });

  describe('Estados computados', () => {
    it('hasResults reflete corretamente o estado', () => {
      popularMock.results = [{ id: 1, title: 'Test Movie' }];
      const { result } = renderHook(() => useMovies());

      expect(result.current.hasResults).toBe(true);
    });

    it('canLoadMore funciona corretamente', () => {
      popularMock.page = 1;
      popularMock.totalPages = 3;
      popularMock.loading = false;

      const { result } = renderHook(() => useMovies());

      expect(result.current.canLoadMore).toBe(true);
    });

    it('isSearching reflete o estado de busca', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.search('batman');
      });

      expect(result.current.isSearching).toBe(true);
      expect(result.current.searchQuery).toBe('batman');
    });
  });

  describe('Navegação por categoria', () => {
    it('changeCategory chama o hook correto e reseta a busca', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.changeCategory('top-rated');
      });

      expect(searchMock.reset).toHaveBeenCalled();
      expect(topRatedMock.fetchMovies).toHaveBeenCalledWith(1);
      expect(result.current.category).toBe('top-rated');
    });

    it('changeCategory com categoria inválida usa fallback', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.changeCategory('invalid-category');
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Categoria inválida: invalid-category. Usando 'popular' como fallback."
      );
      expect(result.current.category).toBe('popular');
      expect(popularMock.fetchMovies).toHaveBeenCalledWith(1);

      consoleSpy.mockRestore();
    });

    it('changeCategory para now-playing funciona', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.changeCategory('now-playing');
      });

      expect(nowPlayingMock.fetchMovies).toHaveBeenCalledWith(1);
      expect(result.current.category).toBe('now-playing');
    });
  });

  describe('Busca de filmes', () => {
    it('search com query chama search.search e sem query chama fetchMovies do hook ativo', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.search('hello');
      });
      expect(searchMock.search).toHaveBeenCalledWith('hello', 1);

      act(() => {
        result.current.search('');
      });
      // ao limpar search deve voltar a buscar a categoria atual (popular)
      expect(popularMock.fetchMovies).toHaveBeenCalledWith(1);
    });

    it('search com query apenas espaços volta para categoria', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.search('   ');
      });

      expect(result.current.searchQuery).toBe('');
      expect(popularMock.fetchMovies).toHaveBeenCalledWith(1);
      expect(searchMock.search).not.toHaveBeenCalled();
    });

    it('search com query válida atualiza estado', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.search('batman');
      });

      expect(result.current.searchQuery).toBe('batman');
      expect(result.current.isSearching).toBe(true);
      expect(searchMock.search).toHaveBeenCalledWith('batman', 1);
    });
  });

  describe('Carregar mais resultados', () => {
    it('loadMore não faz nada se não puder carregar mais', () => {
      // Configurar mock para não poder carregar mais
      popularMock.page = 1;
      popularMock.totalPages = 1; // Mesma página = não pode carregar mais
      popularMock.loading = false;

      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.loadMore();
      });

      expect(popularMock.fetchMovies).not.toHaveBeenCalled();
      expect(searchMock.search).not.toHaveBeenCalled();
    });

    it('loadMore chama fetchMovies para categoria', () => {
      popularMock.page = 1;
      popularMock.totalPages = 3;
      popularMock.loading = false;

      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.loadMore();
      });

      expect(popularMock.fetchMovies).toHaveBeenCalledWith(2);
    });

    it('loadMore chama search para busca ativa', () => {
      searchMock.page = 1;
      searchMock.totalPages = 3;
      searchMock.loading = false;

      const { result } = renderHook(() => useMovies());

      // Ativar busca
      act(() => {
        result.current.search('batman');
      });

      // Carregar mais
      act(() => {
        result.current.loadMore();
      });

      expect(searchMock.search).toHaveBeenCalledWith('batman', 2);
    });
  });

  describe('Reset e limpeza', () => {
    it('reset chama reset de todos os hooks e seta categoria para popular', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.reset();
      });

      expect(searchMock.reset).toHaveBeenCalled();
      expect(popularMock.reset).toHaveBeenCalled();
      expect(topRatedMock.reset).toHaveBeenCalled();
      expect(nowPlayingMock.reset).toHaveBeenCalled();
      expect(result.current.category).toBe('popular');
      expect(result.current.searchQuery).toBe('');
    });

    it('reset limpa estado de busca', () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.search('batman');
      });

      expect(result.current.isSearching).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isSearching).toBe(false);
      expect(result.current.searchQuery).toBe('');
    });
  });

  describe('Acesso aos hooks individuais', () => {
    it('hooks expõe acesso direto aos hooks internos', () => {
      const { result } = renderHook(() => useMovies());

      expect(result.current.hooks.popular).toBe(popularMock);
      expect(result.current.hooks.topRated).toBe(topRatedMock);
      expect(result.current.hooks.nowPlaying).toBe(nowPlayingMock);
      expect(result.current.hooks.search).toBe(searchMock);
    });
  });

  describe('Compatibilidade com hook ativo', () => {
    it('spread do activeHook mantém compatibilidade', () => {
      popularMock.results = [{ id: 1, title: 'Test Movie' }];
      popularMock.loading = true;
      popularMock.error = null;

      const { result } = renderHook(() => useMovies());

      // Verificar se as propriedades do hook ativo estão disponíveis
      expect(result.current.results).toEqual([{ id: 1, title: 'Test Movie' }]);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBe(null);
    });

    it('activeHook muda baseado no estado de busca', () => {
      const { result } = renderHook(() => useMovies());

      // Inicialmente deve usar popular
      expect(result.current.category).toBe('popular');

      // Após busca, deve usar search
      act(() => {
        result.current.search('batman');
      });

      expect(result.current.isSearching).toBe(true);
    });
  });
});
