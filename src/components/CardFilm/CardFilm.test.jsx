import React from 'react';
import { test, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardFilm from './CardFilm';

const film = { id: 1, title: 'Teste', release_date: '2020-01-01', poster_path: null };

test('renderiza título, ano e botões e chama handlers', async () => {
  const user = userEvent.setup();
  const onDetails = vi.fn();
  const onToggleFavorite = vi.fn();

  render(<CardFilm film={film} onDetails={onDetails} onToggleFavorite={onToggleFavorite} />);

  expect(screen.getByText('Teste')).toBeInTheDocument();
  expect(screen.getByText('2020')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /detalhes/i }));
  expect(onDetails).toHaveBeenCalledWith(film);

  await user.click(screen.getByRole('button', { name: /favoritar|favorito/i }));
  expect(onToggleFavorite).toHaveBeenCalledWith(film);
});
