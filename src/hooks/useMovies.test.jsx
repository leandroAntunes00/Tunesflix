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

  it('changeCategory chama o hook correto e reseta a busca', () => {
    const { result } = renderHook(() => useMovies());

    act(() => {
      result.current.changeCategory('top-rated');
    });

    expect(searchMock.reset).toHaveBeenCalled();
    expect(topRatedMock.fetchMovies).toHaveBeenCalledWith(1);
  });

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
  });
});
