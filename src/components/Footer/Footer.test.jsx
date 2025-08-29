import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer exibe copyright e ano corretamente', () => {
  render(<Footer />);

  // Verifica se o texto do copyright está presente
  expect(screen.getByText(/© Tunesflix —/i)).toBeInTheDocument();

  // Verifica se o ano atual está presente
  const currentYear = new Date().getFullYear().toString();
  expect(screen.getByText(currentYear)).toBeInTheDocument();

  // Verifica se o elemento time tem o dateTime correto
  const timeElement = screen.getByRole('time');
  expect(timeElement).toHaveAttribute('datetime', currentYear);
});

test('Footer tem estrutura de acessibilidade correta', () => {
  render(<Footer />);

  // Verifica se o footer tem o role correto
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();

  // Verifica se o copyright está dentro de um parágrafo
  const copyright = screen.getByText(/© Tunesflix —/i);
  expect(copyright.tagName).toBe('P');
});
