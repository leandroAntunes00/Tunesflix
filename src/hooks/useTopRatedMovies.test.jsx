import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import useTopRatedMovies from './useTopRatedMovies';

vi.mock('../services/tmdb', () => ({
  fetchTopRatedMovies: vi.fn(async (page) => ({
    results: [{ id: 30, title: 'Top Rated Movie' }],
    page,
    total_pages: 516,
    total_results: 10308,
  })),
}));

function TestComp() {
  const { results, loading, fetchMovies } = useTopRatedMovies();
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

test('useTopRatedMovies carrega e popula resultados', async () => {
  const user = userEvent.setup();
  render(<TestComp />);

  expect(screen.getByTestId('loading').textContent).toBe('false');
  await user.click(screen.getByRole('button', { name: /load/i }));

  expect(await screen.findByText('Top Rated Movie')).toBeInTheDocument();
});
