import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import CategorySelector from './CategorySelector';

test('CategorySelector renderiza com valor padrão', () => {
  const onChange = vi.fn();

  render(<CategorySelector onChange={onChange} />);

  const select = screen.getByRole('combobox', { name: /categoria/i });
  expect(select).toBeInTheDocument();
  expect(select).toHaveValue('popular');
});

test('CategorySelector renderiza com valor personalizado', () => {
  const onChange = vi.fn();

  render(<CategorySelector value="top-rated" onChange={onChange} />);

  const select = screen.getByRole('combobox', { name: /categoria/i });
  expect(select).toHaveValue('top-rated');
});

test('CategorySelector mostra todas as opções disponíveis', () => {
  const onChange = vi.fn();

  render(<CategorySelector onChange={onChange} />);

  // Verifica se todas as opções estão presentes
  expect(screen.getByRole('option', { name: 'Populares' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Mais Avaliados' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Em Cartaz' })).toBeInTheDocument();

  // Verifica os valores das opções
  const options = screen.getAllByRole('option');
  expect(options).toHaveLength(3);
  expect(options[0]).toHaveValue('popular');
  expect(options[1]).toHaveValue('top-rated');
  expect(options[2]).toHaveValue('now-playing');
});

test('CategorySelector chama onChange ao mudar seleção', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(<CategorySelector onChange={onChange} />);

  const select = screen.getByRole('combobox', { name: /categoria/i });

  await user.selectOptions(select, 'top-rated');

  expect(onChange).toHaveBeenCalledWith('top-rated');
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('CategorySelector tem acessibilidade correta', () => {
  const onChange = vi.fn();

  render(<CategorySelector onChange={onChange} />);

  // Verifica se o select tem label associada
  const select = screen.getByLabelText('Categoria');
  expect(select).toBeInTheDocument();

  // Verifica se o select tem aria-label
  expect(select).toHaveAttribute('aria-label', 'Selecionar categoria de filmes');

  // Verifica se o ícone está oculto para leitores de tela
  const iconContainer = document.querySelector('.tf-category-selector__icon');
  expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
});

test('CategorySelector mantém valor selecionado', () => {
  const onChange = vi.fn();

  const { rerender } = render(<CategorySelector value="popular" onChange={onChange} />);

  const select = screen.getByRole('combobox', { name: /categoria/i });
  expect(select).toHaveValue('popular');

  // Simula mudança externa do valor (por exemplo, via props)
  rerender(<CategorySelector value="now-playing" onChange={onChange} />);

  expect(select).toHaveValue('now-playing');
});

test('CategorySelector funciona sem onChange definido', () => {
  // Não deve quebrar se onChange não for fornecido
  render(<CategorySelector />);

  const select = screen.getByRole('combobox', { name: /categoria/i });
  expect(select).toHaveValue('popular');
});
