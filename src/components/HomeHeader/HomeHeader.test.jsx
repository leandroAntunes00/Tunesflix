import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomeHeader from './HomeHeader';

test('mostra "Populares" quando não há query', () => {
  render(<HomeHeader query={''} />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Populares/i);
  expect(screen.getByText(/Filmes populares no momento/i)).toBeInTheDocument();
});

test('mostra "Mais Avaliados" para categoria top-rated', () => {
  render(<HomeHeader query={''} category="top-rated" />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Mais Avaliados/i);
  expect(screen.getByText(/Filmes com as melhores avaliações/i)).toBeInTheDocument();
});

test('mostra "Em Cartaz" para categoria now-playing', () => {
  render(<HomeHeader query={''} category="now-playing" />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Em Cartaz/i);
  expect(screen.getByText(/Filmes em exibição nos cinemas/i)).toBeInTheDocument();
});

test('mostra resultado para query quando fornecida', () => {
  render(<HomeHeader query={'batman'} />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Resultados para "batman"/i);
});
