import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomeView from './HomeView';

test('HomeView renderiza SearchBar, HomeHeader e Pagination quando aplicável', async () => {
  const onToggleFavorite = vi.fn();
  const onDetails = vi.fn();

  // Mock de dados para ativar o estado "success"
  const mockResults = [
    {
      id: 1,
      title: 'Test Movie',
      poster_path: '/test.jpg',
      release_date: '2023-01-01',
      vote_average: 8.5,
    },
  ];

  render(
    <HomeView
      query={''}
      search={() => {}}
      results={mockResults}
      loading={false}
      error={null}
      page={1}
      nextPage={() => {}}
      prevPage={() => {}}
      totalPages={3}
      favorites={new Set()}
      onToggleFavorite={onToggleFavorite}
      onDetails={onDetails}
      category="popular"
      onCategoryChange={() => {}}
      onNavigate={() => {}}
    />
  );

  // SearchBar input exists
  expect(screen.getByPlaceholderText(/Buscar filmes/i)).toBeInTheDocument();
  // HomeHeader shows Populares
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Populares/i);
  // Pagination shows página
  expect(screen.getByText('1')).toBeInTheDocument(); // página atual
  expect(screen.getByText('3')).toBeInTheDocument(); // total de páginas
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Populares'); // cabeçalho específico
});

test('HomeView exibe estado vazio quando não há resultados', () => {
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
      totalPages={1}
      favorites={new Set()}
      onToggleFavorite={onToggleFavorite}
      onDetails={onDetails}
      category="popular"
      onCategoryChange={() => {}}
      onNavigate={() => {}}
    />
  );

  // Deve mostrar estado vazio
  expect(screen.getByText('Nenhum filme encontrado')).toBeInTheDocument();
  expect(
    screen.getByText('Não há filmes disponíveis na categoria "Populares" no momento.')
  ).toBeInTheDocument();

  // Não deve mostrar HomeHeader ou paginação
  expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  expect(screen.queryByText(/página/)).not.toBeInTheDocument();
});
