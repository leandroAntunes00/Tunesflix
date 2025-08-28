import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { useFavorites } from './useFavorites';

describe('useFavorites hook', () => {
  it('toggleFavorite adiciona e remove favorito via provider', () => {
    const wrapper = ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>;

    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite({ id: 42, title: 'Test' });
    });

    expect(result.current.favorites['42']).toBeTruthy();
    expect(result.current.count).toBeGreaterThanOrEqual(1);

    act(() => {
      result.current.toggleFavorite({ id: 42, title: 'Test' });
    });

    expect(result.current.favorites['42']).toBeUndefined();
  });
});
