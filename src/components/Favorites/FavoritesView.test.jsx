import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritesView from './FavoritesView';
import { MemoryRouter } from 'react-router-dom';

test('FavoritesView mostra mensagem quando vazio', () => {
  render(
    <MemoryRouter>
      <FavoritesView favorites={{}} onToggleFavorite={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getByText(/Nenhum favorito ainda/i)).toBeInTheDocument();
});

test('FavoritesView renderiza favoritos e chama handlers', async () => {
  const user = userEvent.setup();
  const favs = {
    1: { id: 1, title: 'Favorito 1', release_date: '2021-01-01' },
    2: { id: 2, title: 'Favorito 2', release_date: '2020-02-02' },
  };
  const onToggleFavorite = vi.fn();
  const onDetails = vi.fn();

  render(
    <MemoryRouter>
      <FavoritesView favorites={favs} onToggleFavorite={onToggleFavorite} onDetails={onDetails} />
    </MemoryRouter>
  );

  expect(screen.getByText('Favorito 1')).toBeInTheDocument();
  expect(screen.getByText('Favorito 2')).toBeInTheDocument();

  await user.click(screen.getAllByRole('button', { name: /detalhes/i })[0]);
  expect(onDetails).toHaveBeenCalled();

  await user.click(screen.getAllByRole('button', { name: /favoritar|favorito/i })[1]);
  expect(onToggleFavorite).toHaveBeenCalled();
});

test('FavoritesView mostra favoritos sem buscar (caso adicional)', () => {
  const favoritesMap = {
    5: { id: 5, title: 'Fav Movie 5', poster_path: null, release_date: '2019-01-01' },
    6: { id: 6, title: 'Fav Movie 6', poster_path: null, release_date: '2020-01-01' },
  };

  render(
    <MemoryRouter>
      <FavoritesView favorites={favoritesMap} onToggleFavorite={() => {}} />
    </MemoryRouter>
  );
  expect(screen.getByText('Fav Movie 5')).toBeInTheDocument();
  expect(screen.getByText('Fav Movie 6')).toBeInTheDocument();
});
