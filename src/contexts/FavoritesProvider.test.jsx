import React from 'react';
import { test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider } from './FavoritesContext';
import { useFavorites } from '../hooks/useFavorites';

// helper to render hook within provider
function renderFavoritesHook() {
  return renderHook(() => useFavorites(), { wrapper: FavoritesProvider });
}

test('FavoritesProvider toggleFavorite adiciona e remove', () => {
  const { result } = renderFavoritesHook();

  act(() => {
    result.current.toggleFavorite({ id: 10, title: 'X' });
  });

  expect(result.current.favorites['10']).toBeDefined();
  expect(result.current.count).toBe(1);

  act(() => {
    result.current.toggleFavorite({ id: 10, title: 'X' });
  });

  expect(result.current.favorites['10']).toBeUndefined();
  expect(result.current.count).toBe(0);
});

test('FavoritesProvider persiste em localStorage', () => {
  localStorage.clear();
  const { result } = renderFavoritesHook();

  act(() => {
    result.current.toggleFavorite({ id: 20, title: 'Persist' });
  });

  const raw = localStorage.getItem('tunesflix:favorites-v2');
  expect(raw).toBeTruthy();
  const parsed = JSON.parse(raw);
  expect(parsed['20']).toBeDefined();
});
