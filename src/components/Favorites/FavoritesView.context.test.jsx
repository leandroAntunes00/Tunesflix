import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import FavoritesView from './FavoritesView';
import { MemoryRouter } from 'react-router-dom';

test('FavoritesView consome o contexto quando props nao fornecidas', () => {
  // preparar localStorage com alguns favoritos
  const key = 'tunesflix:favorites-v2';
  const stored = {
    10: { id: 10, title: 'Context Fav 10', poster_path: null, release_date: '2018-01-01' },
    11: { id: 11, title: 'Context Fav 11', poster_path: null, release_date: '2017-01-01' },
  };
  localStorage.setItem(key, JSON.stringify(stored));

  render(
    <MemoryRouter>
      <FavoritesProvider>
        <FavoritesView />
      </FavoritesProvider>
    </MemoryRouter>
  );

  expect(screen.getByText('Context Fav 10')).toBeInTheDocument();
  expect(screen.getByText('Context Fav 11')).toBeInTheDocument();
});
