import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { useFavorites } from './useFavorites';

// Mock do console.warn para testes
const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('useFavorites hook', () => {
  beforeEach(() => {
    consoleWarnSpy.mockClear();
    // Limpar localStorage antes de cada teste
    localStorage.clear();
  });

  describe('Com FavoritesProvider', () => {
    const wrapper = ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>;

    it('toggleFavorite adiciona e remove favorito via provider', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      const movie = { id: 42, title: 'Test Movie', poster_path: '/test.jpg' };

      act(() => {
        result.current.toggleFavorite(movie);
      });

      expect(result.current.favorites['42']).toBeTruthy();
      expect(result.current.favorites['42'].title).toBe('Test Movie');
      expect(result.current.count).toBe(1);
      expect(result.current.hasFavorites).toBe(true);

      act(() => {
        result.current.toggleFavorite(movie);
      });

      expect(result.current.favorites['42']).toBeUndefined();
      expect(result.current.count).toBe(0);
      expect(result.current.hasFavorites).toBe(false);
    });

    it('isFavorite verifica corretamente se filme está favoritado', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      const movie = { id: 123, title: 'Test Movie' };

      expect(result.current.isFavorite(123)).toBe(false);

      act(() => {
        result.current.toggleFavorite(movie);
      });

      expect(result.current.isFavorite(123)).toBe(true);
      expect(result.current.isFavorite('123')).toBe(true); // string também funciona
      expect(result.current.isFavorite(999)).toBe(false);
    });

    it('clearFavorites remove todos os favoritos', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      const movies = [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
        { id: 3, title: 'Movie 3' },
      ];

      // Adicionar múltiplos favoritos
      act(() => {
        movies.forEach((movie) => result.current.toggleFavorite(movie));
      });

      expect(result.current.count).toBe(3);
      expect(result.current.hasFavorites).toBe(true);

      act(() => {
        result.current.clearFavorites();
      });

      expect(result.current.count).toBe(0);
      expect(result.current.hasFavorites).toBe(false);
      expect(Object.keys(result.current.favorites)).toHaveLength(0);
    });

    it('persiste favoritos no localStorage', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      const movie = { id: 456, title: 'Persistent Movie' };

      act(() => {
        result.current.toggleFavorite(movie);
      });

      expect(result.current.count).toBe(1);

      // Simular recarregamento da página (novo hook)
      const { result: newResult } = renderHook(() => useFavorites(), { wrapper });

      expect(newResult.current.count).toBe(1);
      expect(newResult.current.favorites['456']).toBeTruthy();
    });

    it('lida com dados de filme incompletos', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      const incompleteMovie = { id: 789 }; // sem title

      act(() => {
        result.current.toggleFavorite(incompleteMovie);
      });

      expect(result.current.favorites['789']).toBeTruthy();
      expect(result.current.favorites['789'].id).toBe(789);
    });

    it('isFavorite retorna false para valores inválidos', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper });

      expect(result.current.isFavorite(null)).toBe(false);
      expect(result.current.isFavorite(undefined)).toBe(false);
      expect(result.current.isFavorite('')).toBe(false);
      expect(result.current.isFavorite(0)).toBe(false);
    });
  });

  describe('Sem FavoritesProvider', () => {
    it('retorna valores padrão quando contexto não está disponível', () => {
      const { result } = renderHook(() => useFavorites());

      expect(result.current.favorites).toEqual({});
      expect(result.current.count).toBe(0);
      expect(result.current.hasFavorites).toBe(false);
      expect(result.current.isFavorite(123)).toBe(false);
    });

    it('funções padrão não quebram quando chamadas sem contexto', () => {
      const { result } = renderHook(() => useFavorites());

      expect(() => {
        result.current.toggleFavorite({ id: 1 });
        result.current.clearFavorites();
      }).not.toThrow();
    });

    it('mostra warning no console quando usado sem provider', () => {
      renderHook(() => useFavorites());

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'useFavorites deve ser usado dentro de um FavoritesProvider'
      );
    });
  });

  describe('Performance e memoização', () => {
    it('hasFavorites é atualizado corretamente', () => {
      const { result } = renderHook(() => useFavorites(), {
        wrapper: ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>,
      });

      expect(result.current.hasFavorites).toBe(false);

      act(() => {
        result.current.toggleFavorite({ id: 1, title: 'Test' });
      });

      expect(result.current.hasFavorites).toBe(true);

      act(() => {
        result.current.clearFavorites();
      });

      expect(result.current.hasFavorites).toBe(false);
    });
  });
});
