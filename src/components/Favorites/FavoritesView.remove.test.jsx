import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import FavoritesView from './FavoritesView';
import { MemoryRouter } from 'react-router-dom';

test('FavoritesView permite remover favorito via contexto', async () => {
  const key = 'tunesflix:favorites-v2';
  const stored = {
    20: { id: 20, title: 'Removable Movie', poster_path: null, release_date: '2018-01-01' },
  };
  localStorage.setItem(key, JSON.stringify(stored));

  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <FavoritesProvider>
        <FavoritesView />
      </FavoritesProvider>
    </MemoryRouter>
  );

  expect(screen.getByText('Removable Movie')).toBeInTheDocument();

  const btn = screen.getByRole('button', { name: /Remover Removable Movie/i });
  await user.click(btn);

  // após remover, a view deve exibir a mensagem de vazio
  expect(await screen.findByText(/Nenhum favorito ainda/i)).toBeInTheDocument();

  const after = JSON.parse(localStorage.getItem(key) || '{}');
  expect(after['20']).toBeUndefined();
});
