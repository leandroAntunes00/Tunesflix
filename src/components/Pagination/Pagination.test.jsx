import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

test('não renderiza quando totalPages <= 1', () => {
  const { container } = render(
    <Pagination page={1} totalPages={1} onPrev={() => {}} onNext={() => {}} />
  );
  expect(container).toBeEmptyDOMElement();
});

test('botoes chamam callbacks e desabilitados conforme pagina', async () => {
  const user = userEvent.setup();
  const onPrev = vi.fn();
  const onNext = vi.fn();
  render(
    <Pagination page={2} totalPages={5} onPrev={onPrev} onNext={onNext} label={'Populares'} />
  );

  expect(screen.getByText(/Populares/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Anterior/i }));
  await user.click(screen.getByRole('button', { name: /Próxima/i }));
  expect(onPrev).toHaveBeenCalled();
  expect(onNext).toHaveBeenCalled();
});
