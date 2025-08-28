import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import usePopularMovies from './usePopularMovies';

vi.mock('../services/tmdb', () => ({
  fetchPopularMovies: vi.fn(async (page) => ({
    results: [{ id: 20, title: 'Popular Movie' }],
    page,
    total_pages: 10,
    total_results: 200,
  })),
}));

function TestComp() {
  const { results, loading, fetchMovies } = usePopularMovies();
  return (
    <div>
      <button onClick={() => fetchMovies(1)}>load</button>
      <div data-testid="loading">{String(loading)}</div>
      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

test('usePopularMovies carrega e popula resultados', async () => {
  const user = userEvent.setup();
  render(<TestComp />);

  expect(screen.getByTestId('loading').textContent).toBe('false');
  await user.click(screen.getByRole('button', { name: /load/i }));

  expect(await screen.findByText('Popular Movie')).toBeInTheDocument();
});
