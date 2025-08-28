import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import useMovieDetails from './useMovieDetails';

vi.mock('../services/tmdb', () => ({
  getMovieDetails: vi.fn(async (id) => ({
    id,
    title: 'Movie Details',
    overview: 'Movie description',
    runtime: 120,
  })),
}));

function TestComp() {
  const { details, loading, fetchDetails } = useMovieDetails();
  return (
    <div>
      <button onClick={() => fetchDetails(123)}>load details</button>
      <div data-testid="loading">{String(loading)}</div>
      {details && <div data-testid="title">{details.title}</div>}
    </div>
  );
}

test('useMovieDetails carrega detalhes do filme', async () => {
  const user = userEvent.setup();
  render(<TestComp />);

  expect(screen.getByTestId('loading').textContent).toBe('false');
  await user.click(screen.getByRole('button', { name: /load details/i }));

  expect(await screen.findByTestId('title')).toHaveTextContent('Movie Details');
});
