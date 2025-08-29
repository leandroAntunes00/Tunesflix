import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect } from 'vitest';
import SearchBar from './SearchBar';

test('SearchBar renderiza com valor padrão e chama onSearch ao submeter', async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();

  render(<SearchBar defaultValue="hello" onSearch={onSearch} />);

  const input = screen.getByPlaceholderText(/buscar filmes/i);
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('hello');

  await user.clear(input);
  await user.type(input, 'batman');
  await user.keyboard('{Enter}');

  expect(onSearch).toHaveBeenCalledWith('batman');
});

test('SearchBar chama onSearch ao clicar no botão', async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();

  render(<SearchBar defaultValue="" onSearch={onSearch} />);
  const input = screen.getByPlaceholderText(/buscar filmes/i);
  const btn = screen.getByRole('button', { name: /buscar/i });

  await user.type(input, 'matrix');
  await user.click(btn);

  expect(onSearch).toHaveBeenCalledWith('matrix');
});

test('SearchBar limpa campo com botão de limpar', async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();

  render(<SearchBar defaultValue="teste" onSearch={onSearch} />);

  const input = screen.getByPlaceholderText(/buscar filmes/i);
  expect(input).toHaveValue('teste');

  // Botão de limpar deve aparecer quando há valor
  const clearButton = screen.getByRole('button', { name: /limpar pesquisa/i });
  await user.click(clearButton);

  expect(input).toHaveValue('');
  expect(input).toHaveFocus();
});

test('SearchBar limpa campo com tecla Escape', async () => {
  const user = userEvent.setup();

  render(<SearchBar defaultValue="teste" onSearch={() => {}} />);

  const input = screen.getByPlaceholderText(/buscar filmes/i);
  expect(input).toHaveValue('teste');

  await user.click(input);
  await user.keyboard('{Escape}');

  expect(input).toHaveValue('');
  expect(input).toHaveFocus();
});

test('SearchBar tem acessibilidade correta', () => {
  render(<SearchBar />);

  // Verifica se o form tem role correto
  const form = screen.getByRole('search');
  expect(form).toBeInTheDocument();

  // Verifica se o input tem label associada
  const input = screen.getByLabelText('Buscar filmes');
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('type', 'search');

  // Verifica se o botão de buscar tem aria-label
  const searchButton = screen.getByRole('button', { name: /buscar/i });
  expect(searchButton).toBeInTheDocument();
});

test('SearchBar não mostra botão de limpar quando campo está vazio', () => {
  render(<SearchBar defaultValue="" />);

  const input = screen.getByPlaceholderText(/buscar filmes/i);
  expect(input).toHaveValue('');

  // Botão de limpar não deve existir quando campo está vazio
  const clearButton = screen.queryByRole('button', { name: /limpar pesquisa/i });
  expect(clearButton).not.toBeInTheDocument();
});

test('SearchBar submete valor vazio corretamente', async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();

  render(<SearchBar onSearch={onSearch} />);

  const searchButton = screen.getByRole('button', { name: /buscar/i });
  await user.click(searchButton);

  expect(onSearch).toHaveBeenCalledWith('');
});
