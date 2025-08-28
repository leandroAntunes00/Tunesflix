import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import useNowPlayingMovies from './useNowPlayingMovies';

vi.mock('../services/tmdb', () => ({
  fetchNowPlayingMovies: vi.fn(async (page) => ({
    results: [{ id: 40, title: 'Now Playing Movie' }],
    page,
    total_pages: 207,
    total_results: 4128,
  })),
}));

function TestComp() {
  const { results, loading, fetchMovies } = useNowPlayingMovies();
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

test('useNowPlayingMovies carrega e popula resultados', async () => {
  const user = userEvent.setup();
  render(<TestComp />);

  expect(screen.getByTestId('loading').textContent).toBe('false');
  await user.click(screen.getByRole('button', { name: /load/i }));

  expect(await screen.findByText('Now Playing Movie')).toBeInTheDocument();
});
