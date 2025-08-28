import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import useMovieSearch from './useMovieSearch';

vi.mock('../services/tmdb', () => ({
  searchMovies: vi.fn(async (q, page) => ({
    results: [{ id: 10, title: `Result for ${q}` }],
    page,
    total_pages: 5,
    total_results: 100,
  })),
}));

function TestComp() {
  const { results, loading, search } = useMovieSearch();
  return (
    <div>
      <button onClick={() => search('batman')}>search</button>
      <div data-testid="loading">{String(loading)}</div>
      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

test('useMovieSearch busca e popula resultados', async () => {
  const user = userEvent.setup();
  render(<TestComp />);

  expect(screen.getByTestId('loading').textContent).toBe('false');
  await user.click(screen.getByRole('button', { name: /search/i }));

  expect(await screen.findByText('Result for batman')).toBeInTheDocument();
});
