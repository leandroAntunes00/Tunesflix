import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import MovieModal from './MovieModal';

const details = {
  id: 1,
  title: 'My Movie',
  release_date: '2020-01-01',
  overview: 'A movie overview',
  poster_path: null,
  credits: {
    crew: [{ job: 'Director', name: 'Dir Name' }],
    cast: [{ name: 'Actor 1' }, { name: 'Actor 2' }],
  },
};

test('MovieModal mostra detalhes e fecha', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  render(
    <MovieModal open={true} onClose={onClose} loading={false} details={details} error={null} />
  );

  expect(screen.getByText('My Movie')).toBeInTheDocument();
  expect(screen.getByText('A movie overview')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /fechar/i }));
  expect(onClose).toHaveBeenCalled();
});

test('MovieModal mostra loading e mensagem de erro', async () => {
  render(<MovieModal open={true} onClose={() => {}} loading={true} details={null} error={null} />);
  expect(screen.getByText(/Carregando/i)).toBeInTheDocument();

  render(
    <MovieModal
      open={true}
      onClose={() => {}}
      loading={false}
      details={null}
      error={new Error('falha')}
    />
  );
  expect(screen.getByText(/falha/i)).toBeInTheDocument();
});
