import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomeHeader from './HomeHeader';

test('mostra "Populares" quando não há query', () => {
  render(<HomeHeader query={''} />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Populares/i);
  expect(screen.getByText(/Filmes populares no momento/i)).toBeInTheDocument();
});

test('mostra resultado para query quando fornecida', () => {
  render(<HomeHeader query={'batman'} />);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Resultados para "batman"/i);
});
