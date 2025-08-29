import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

test('Header renderiza corretamente com navegação', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>
  );

  // Verifica se o logo e nome estão presentes
  expect(screen.getByAltText('Tunesflix')).toBeInTheDocument();
  expect(screen.getByText('Tunesflix')).toBeInTheDocument();

  // Verifica se os links de navegação estão presentes
  expect(screen.getByRole('link', { name: /Início/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Favoritos/i })).toBeInTheDocument();
});

test('Header links têm href corretos', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>
  );

  // Verifica se os links têm os hrefs corretos
  expect(screen.getByRole('link', { name: /Ir para página inicial/i })).toHaveAttribute(
    'href',
    '/'
  );
  expect(screen.getByRole('link', { name: /Início/i })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: /Favoritos/i })).toHaveAttribute('href', '/favorites');
});
