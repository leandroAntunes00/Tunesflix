import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

test('Header navegação chama onNavigate', async () => {
  const user = userEvent.setup();
  const onNavigate = vi.fn();
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Header onNavigate={onNavigate} active="home" />
    </MemoryRouter>
  );

  await user.click(screen.getByRole('link', { name: /Favoritos/i }));
  expect(onNavigate).toHaveBeenCalledWith('favorites');
});
