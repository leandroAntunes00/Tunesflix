import React from 'react';
import { test, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardFilm from './CardFilm';
import { MemoryRouter } from 'react-router-dom';

const mockFilm = {
  id: 1,
  title: 'Test Movie',
  release_date: '2020-01-01',
  poster_path: '/test-poster.jpg',
  vote_average: 8.5,
  overview: 'This is a test movie overview',
};

const mockFilmWithoutData = {
  id: 2,
  name: 'Test Series',
  first_air_date: '2021-06-15',
  poster: null,
  vote_average: null,
  overview: '',
};

test('renderiza corretamente com dados completos', () => {
  const onDetails = vi.fn();
  const onToggleFavorite = vi.fn();

  render(
    <MemoryRouter>
      <CardFilm
        film={mockFilm}
        onDetails={onDetails}
        onToggleFavorite={onToggleFavorite}
        isFavorite={false}
      />
    </MemoryRouter>
  );

  // Verifica se o título está presente
  expect(screen.getByText('Test Movie')).toBeInTheDocument();

  // Verifica se o ano está presente (pode variar devido a timezone)
  expect(screen.getByText(/2020|2019/)).toBeInTheDocument();

  // Verifica se a avaliação está presente
  expect(screen.getByText('8.5')).toBeInTheDocument();

  // Verifica se a descrição está presente
  expect(screen.getByText('This is a test movie overview')).toBeInTheDocument();

  // Verifica se os botões estão presentes
  expect(screen.getByRole('button', { name: /detalhes/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /adicionar.*favoritos/i })).toBeInTheDocument();
});

test('renderiza corretamente com dados mínimos', () => {
  render(
    <MemoryRouter>
      <CardFilm film={mockFilmWithoutData} />
    </MemoryRouter>
  );

  // Verifica se usa o campo 'name' quando 'title' não existe
  expect(screen.getByText('Test Series')).toBeInTheDocument();

  // Verifica se usa 'first_air_date' quando 'release_date' não existe
  expect(screen.getByText('2021')).toBeInTheDocument();

  // Verifica se mostra placeholder quando não há poster
  expect(screen.getByText('Sem imagem')).toBeInTheDocument();
});

test('chama handlers corretamente', async () => {
  const user = userEvent.setup();
  const onDetails = vi.fn();
  const onToggleFavorite = vi.fn();

  render(
    <MemoryRouter>
      <CardFilm film={mockFilm} onDetails={onDetails} onToggleFavorite={onToggleFavorite} />
    </MemoryRouter>
  );

  // Testa clique no botão de detalhes
  await user.click(screen.getByRole('button', { name: /detalhes/i }));
  expect(onDetails).toHaveBeenCalledWith(mockFilm);

  // Testa clique no botão de favorito
  await user.click(screen.getByRole('button', { name: /adicionar.*favoritos/i }));
  expect(onToggleFavorite).toHaveBeenCalledWith(mockFilm);
});

test('acessibilidade e estrutura', () => {
  render(
    <MemoryRouter>
      <CardFilm film={mockFilm} isFavorite={true} />
    </MemoryRouter>
  );

  // Verifica se o article tem aria-labelledby correto
  const article = screen.getByRole('article');
  expect(article).toHaveAttribute('aria-labelledby', 'title-1');

  // Verifica se o título tem id correto
  const title = screen.getByRole('heading', { name: 'Test Movie' });
  expect(title).toHaveAttribute('id', 'title-1');

  // Verifica se o botão de favorito tem aria-pressed correto
  const favoriteButton = screen.getByRole('button', { name: /remover.*favoritos/i });
  expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');

  // Verifica se o card é focável
  expect(article).toHaveAttribute('tabindex', '0');
});
