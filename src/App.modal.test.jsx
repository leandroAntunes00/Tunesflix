import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';

// Mocks
vi.mock('./hooks/useMovies', () => ({
  __esModule: true,
  default: () => ({
    category: 'popular',
    searchQuery: '',
    isSearching: false,
    results: [{ id: 99, title: 'App Test Movie', release_date: '2020-01-01', poster_path: null }],
    loading: false,
    error: null,
    page: 1,
    nextPage: () => {},
    prevPage: () => {},
    totalPages: 1,
    changeCategory: () => {},
    search: () => {},
    reset: () => {},
  }),
}));

vi.mock('./services/tmdb', async () => {
  return {
    __esModule: true,
    getMovieDetails: vi
      .fn()
      .mockResolvedValue({ id: 99, title: 'App Test Movie', overview: 'Details' }),
    // withTimeout is used by HomePage; provide a simple passthrough for tests
    withTimeout: (p) => p,
  };
});

import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App modal flow', () => {
  beforeEach(() => {});
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('abre modal ao clicar em Detalhes e mostra conteudo', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // encontrar botão Detalhes do card
    const btn = await screen.findByRole('button', { name: /detalhes/i });
    await user.click(btn);

    // modal deve abrir e chamar a api mock
    expect(await screen.findByText(/loading|carregando|detalhes/i)).toBeTruthy();

    await waitFor(() => expect(screen.getByText('Details')).toBeInTheDocument());
  });
});
