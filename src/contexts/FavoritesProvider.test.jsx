import React from 'react';
import { test, expect, beforeEach, afterEach, describe, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { FavoritesProvider } from './FavoritesContext';
import { useFavorites } from '../hooks/useFavorites';

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Helper para renderizar hook dentro do provider
function renderFavoritesHook() {
  return renderHook(() => useFavorites(), { wrapper: FavoritesProvider });
}

describe('FavoritesProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Estado inicial', () => {
    test('inicia com valores padrão', () => {
      localStorageMock.getItem.mockReturnValue(null);
      const { result } = renderFavoritesHook();

      expect(result.current.favorites).toEqual({});
      expect(result.current.count).toBe(0);
      expect(result.current.isEmpty).toBe(true);
      expect(result.current.hasFavorites).toBe(false);
      expect(result.current.canClear).toBe(false);
      expect(result.current.hasError).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    test('carrega favoritos do localStorage', () => {
      const mockFavorites = {
        1: { id: 1, title: 'Movie 1' },
        2: { id: 2, title: 'Movie 2' },
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));

      const { result } = renderFavoritesHook();

      expect(result.current.favorites).toEqual(mockFavorites);
      expect(result.current.count).toBe(2);
      expect(result.current.isEmpty).toBe(false);
    });

    test('lida com localStorage corrompido', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const { result } = renderFavoritesHook();

      expect(result.current.favorites).toEqual({});
      expect(result.current.count).toBe(0);
    });
  });

  describe('Estados computados', () => {
    test('favoriteIds reflete corretamente os IDs', () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
        result.current.toggleFavorite({ id: 20, title: 'Movie 2' });
      });

      expect(result.current.favoriteIds).toEqual(['10', '20']);
    });

    test('favoriteFilms retorna array de filmes', () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
      });

      expect(result.current.favoriteFilms).toHaveLength(1);
      expect(result.current.favoriteFilms[0].title).toBe('Movie 1');
    });

    test('hasFavorites e canClear funcionam corretamente', () => {
      const { result } = renderFavoritesHook();

      expect(result.current.hasFavorites).toBe(false);
      expect(result.current.canClear).toBe(false);

      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
      });

      expect(result.current.hasFavorites).toBe(true);
      expect(result.current.canClear).toBe(true);
    });
  });

  describe('Toggle Favorite', () => {
    test('adiciona e remove favorito', () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
      });

      expect(result.current.favorites['10']).toBeDefined();
      expect(result.current.count).toBe(1);

      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
      });

      expect(result.current.favorites['10']).toBeUndefined();
      expect(result.current.count).toBe(0);
    });

    test('normaliza dados do filme corretamente', () => {
      const { result } = renderFavoritesHook();

      const film = {
        id: 10,
        title: 'Test Movie',
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
        overview: 'Test overview',
        vote_average: 8.5,
        genre_ids: [1, 2, 3],
      };

      act(() => {
        result.current.toggleFavorite(film);
      });

      const favorite = result.current.favorites['10'];
      expect(favorite).toEqual({
        id: 10,
        title: 'Test Movie',
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
        overview: 'Test overview',
        vote_average: 8.5,
        genre_ids: [1, 2, 3],
        backdrop_path: null,
      });
    });

    test('lida com dados incompletos do filme', () => {
      const { result } = renderFavoritesHook();

      const incompleteFilm = {
        id: 10,
        name: 'TV Show', // usa name em vez de title
        poster: '/poster.jpg', // usa poster em vez de poster_path
        first_air_date: '2023-01-01', // usa first_air_date em vez de release_date
      };

      act(() => {
        result.current.toggleFavorite(incompleteFilm);
      });

      const favorite = result.current.favorites['10'];
      expect(favorite.title).toBe('TV Show');
      expect(favorite.poster_path).toBe('/poster.jpg');
      expect(favorite.release_date).toBe('2023-01-01');
    });

    test('rejeita filme inválido', () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({}); // filme sem id
      });

      expect(result.current.count).toBe(0);
      expect(result.current.hasError).toBe(true);
    });
  });

  describe('Persistência no localStorage', () => {
    test('salva automaticamente no localStorage', async () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({ id: 20, title: 'Persist Movie' });
      });

      // Aguardar o save assíncrono
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'tunesflix:favorites-v2',
          expect.any(String)
        );
      });

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData['20']).toBeDefined();
    });

    test('lida com erro no localStorage', async () => {
      // Mock para capturar console.warn
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({ id: 20, title: 'Error Movie' });
      });

      // Aguardar o save assíncrono
      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith('Erro ao salvar favoritos:', expect.any(Error));
      });

      // A aplicação não deve quebrar - o favorito deve estar presente
      expect(result.current.favorites['20']).toBeDefined();
      // Não deve definir erro no estado (comportamento atual)
      expect(result.current.hasError).toBe(false);

      // Limpar mock
      consoleWarnSpy.mockRestore();
    });
  });

  describe('Utilitários', () => {
    test('isFavorite verifica corretamente', () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
      });

      expect(result.current.isFavorite(10)).toBe(true);
      expect(result.current.isFavorite(20)).toBe(false);
      expect(result.current.isFavorite('10')).toBe(true); // string também funciona
    });

    test('getFavorite retorna filme correto', () => {
      const { result } = renderFavoritesHook();

      const film = { id: 10, title: 'Movie 1' };
      act(() => {
        result.current.toggleFavorite(film);
      });

      const favorite = result.current.getFavorite(10);
      expect(favorite).toEqual({
        id: 10,
        title: 'Movie 1',
        poster_path: null,
        release_date: null,
        overview: null,
        vote_average: null,
        genre_ids: [],
        backdrop_path: null,
      });
    });

    test('clearFavorites remove todos os favoritos', () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
        result.current.toggleFavorite({ id: 20, title: 'Movie 2' });
      });

      expect(result.current.count).toBe(2);

      act(() => {
        result.current.clearFavorites();
      });

      expect(result.current.count).toBe(0);
      expect(result.current.isEmpty).toBe(true);
    });

    test('addMultipleFavorites adiciona vários filmes', () => {
      const { result } = renderFavoritesHook();

      const films = [
        { id: 10, title: 'Movie 1' },
        { id: 20, title: 'Movie 2' },
        { id: 30, title: 'Movie 3' },
      ];

      act(() => {
        result.current.addMultipleFavorites(films);
      });

      expect(result.current.count).toBe(3);
      expect(result.current.favoriteIds).toEqual(['10', '20', '30']);
    });

    test('addMultipleFavorites filtra filmes inválidos', () => {
      const { result } = renderFavoritesHook();

      const films = [
        { id: 10, title: 'Valid Movie' },
        { title: 'Invalid Movie' }, // sem id
        { id: 20 }, // sem title
      ];

      act(() => {
        result.current.addMultipleFavorites(films);
      });

      expect(result.current.count).toBe(2); // o primeiro e o terceiro (sem title mas com id)
      expect(result.current.favorites['10']).toBeDefined();
      expect(result.current.favorites['20']).toBeDefined();
    });
  });

  describe('Tratamento de erros', () => {
    test('toggleFavorite com filme inválido define erro', () => {
      const { result } = renderFavoritesHook();

      act(() => {
        result.current.toggleFavorite(null);
      });

      expect(result.current.hasError).toBe(true);
      expect(result.current.error).toBeInstanceOf(Error);
    });

    test('clearFavorites funciona corretamente', () => {
      const { result } = renderFavoritesHook();

      // Adicionar alguns favoritos
      act(() => {
        result.current.toggleFavorite({ id: 1, title: 'Movie 1' });
        result.current.toggleFavorite({ id: 2, title: 'Movie 2' });
      });

      expect(result.current.count).toBe(2);

      // Limpar favoritos
      act(() => {
        result.current.clearFavorites();
      });

      expect(result.current.count).toBe(0);
      expect(result.current.isEmpty).toBe(true);
      expect(result.current.hasError).toBe(false);
    });
  });

  describe('Condições de corrida', () => {
    test('múltiplas operações são tratadas corretamente', async () => {
      const { result } = renderFavoritesHook();

      // Simular múltiplas operações rápidas
      act(() => {
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' });
        result.current.toggleFavorite({ id: 20, title: 'Movie 2' });
        result.current.toggleFavorite({ id: 10, title: 'Movie 1' }); // remove
      });

      // Estado final deve estar consistente
      expect(result.current.count).toBe(1);
      expect(result.current.favorites['20']).toBeDefined();
      expect(result.current.favorites['10']).toBeUndefined();
    });
  });
});
