import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomeView from './HomeView';

test('HomeView renderiza SearchBar, HomeHeader e Pagination quando aplicável', async () => {
  const onToggleFavorite = vi.fn();
  const onDetails = vi.fn();

  render(
    <HomeView
      query={''}
      search={() => {}}
      results={[]}
      loading={false}
      error={null}
      page={1}
      nextPage={() => {}}
      prevPage={() => {}}
      totalPages={3}
      favorites={new Set()}
      onToggleFavorite={onToggleFavorite}
      onDetails={onDetails}
    />
  );

  // SearchBar input exists
  expect(screen.getByPlaceholderText(/Buscar filmes/i)).toBeInTheDocument();
  // HomeHeader shows Populares
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Populares/i);
  // Pagination shows página
  expect(screen.getByText(/página 1 \/ 3/i)).toBeInTheDocument();
});
