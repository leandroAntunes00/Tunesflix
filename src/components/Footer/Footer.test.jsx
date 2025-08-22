import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer exibe copyright e ano', () => {
  render(<Footer />);
  expect(screen.getByText(/Tunesflix/i)).toBeInTheDocument();
  const year = new Date().getFullYear().toString();
  expect(screen.getByText(year)).toBeInTheDocument();
});
