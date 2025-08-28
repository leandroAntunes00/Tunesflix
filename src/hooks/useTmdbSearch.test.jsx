import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import useTmdbSearch from './useTmdbSearch';

vi.mock('../services/tmdb', () => ({
  searchMovies: vi.fn(async (q, page) => ({
    results: [{ id: 10, title: `Result for ${q}` }],
    page,
    total_pages: 1,
    total_results: 1,
  })),
  fetchPopularMovies: vi.fn(async (page) => ({
    results: [{ id: 20, title: 'Popular Movie' }],
    page,
    total_pages: 1,
    total_results: 1,
  })),
  fetchTopRatedMovies: vi.fn(async (page) => ({
    results: [{ id: 30, title: 'Top Rated Movie' }],
    page,
    total_pages: 1,
    total_results: 1,
  })),
  fetchNowPlayingMovies: vi.fn(async (page) => ({
    results: [{ id: 40, title: 'Now Playing Movie' }],
    page,
    total_pages: 1,
    total_results: 1,
  })),
}));

function TestComp() {
  const { results, loading, search } = useTmdbSearch();
  return (
    <div>
      <button onClick={() => search('abc')}>go</button>
      <div data-testid="loading">{String(loading)}</div>
      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

test('useTmdbSearch busca e popula resultados', async () => {
  const user = userEvent.setup();
  render(<TestComp />);

  expect(screen.getByTestId('loading').textContent).toBe('false');
  await user.click(screen.getByRole('button', { name: /go/i }));

  // aguardar renderização do resultado
  expect(await screen.findByText('Result for abc')).toBeInTheDocument();
});
