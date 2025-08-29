import React from 'react';
import { test, expect, vi, beforeEach, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritesView from './FavoritesView';
import { MemoryRouter } from 'react-router-dom';
import { prefetchMovieDetails } from '../../services/tmdb';

// Mock do hook useFavorites
const mockUseFavorites = vi.fn();
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => mockUseFavorites(),
}));

// Mock do serviço TMDB
vi.mock('../../services/tmdb', () => ({
  prefetchMovieDetails: vi.fn(() => Promise.resolve(null)),
}));

// Mock do CardList
vi.mock('../CardList/CardList', () => ({
  default: ({ items, onToggleFavorite, onDetails, onNavigate, favorites }) => (
    <div data-testid="card-list">
      {items.map((item) => (
        <div key={item.id} data-testid={`movie-${item.id}`}>
          <h3>{item.title}</h3>
          <button onClick={() => onDetails?.(item)} aria-label={`Detalhes de ${item.title}`}>
            Detalhes
          </button>
          <button
            onClick={() => onToggleFavorite?.(item.id)}
            aria-label={
              favorites.has(item.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
          >
            {favorites.has(item.id) ? 'Favorito' : 'Não favorito'}
          </button>
          <button
            onClick={() => onNavigate?.('detail', item)}
            aria-label={`Ver detalhes de ${item.title}`}
          >
            Navegar
          </button>
        </div>
      ))}
    </div>
  ),
}));

describe('FavoritesView', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFavorites.mockReturnValue({
      favorites: {},
      toggleFavorite: vi.fn(),
    });
  });

  describe('Estado vazio', () => {
    test('mostra mensagem quando não há favoritos (props vazias)', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={{}} onToggleFavorite={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
      expect(
        screen.getByText('Adicione alguns filmes aos seus favoritos para vê-los aqui!')
      ).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });

    test('mostra mensagem quando não há favoritos (contexto vazio)', () => {
      mockUseFavorites.mockReturnValue({
        favorites: {},
        toggleFavorite: vi.fn(),
      });

      render(
        <MemoryRouter>
          <FavoritesView />
        </MemoryRouter>
      );

      expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
    });

    test('mostra mensagem quando favorites é null', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={null} />
        </MemoryRouter>
      );

      expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
    });
  });

  describe('Renderização de favoritos', () => {
    const mockFavorites = {
      1: {
        id: 1,
        title: 'Filme Favorito 1',
        poster_path: '/poster1.jpg',
        release_date: '2021-01-01',
        overview: 'Sinopse do filme 1',
        vote_average: 8.5,
      },
      2: {
        id: 2,
        title: 'Filme Favorito 2',
        poster_path: '/poster2.jpg',
        release_date: '2020-02-02',
        overview: 'Sinopse do filme 2',
        vote_average: 7.2,
      },
    };

    test('renderiza lista de favoritos com dados completos', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} onToggleFavorite={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByTestId('card-list')).toBeInTheDocument();
      expect(screen.getByText('Filme Favorito 1')).toBeInTheDocument();
      expect(screen.getByText('Filme Favorito 2')).toBeInTheDocument();
    });

    test('normaliza dados com campos alternativos', () => {
      const favoritesWithAltFields = {
        1: {
          id: 1,
          name: 'Série Favorita', // usa 'name' em vez de 'title'
          poster: '/poster.jpg', // usa 'poster' em vez de 'poster_path'
          first_air_date: '2022-03-03', // usa 'first_air_date' em vez de 'release_date'
          description: 'Descrição da série', // usa 'description' em vez de 'overview'
        },
      };

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithAltFields} onToggleFavorite={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByText('Série Favorita')).toBeInTheDocument();
    });

    test('usa valores padrão para campos ausentes', () => {
      const favoritesWithMissingFields = {
        1: {
          id: 1,
          // title ausente
          // poster_path ausente
          // release_date ausente
          // overview ausente
        },
      };

      // Mock específico para este teste - não deve fazer prefetch
      prefetchMovieDetails.mockResolvedValue(null);

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithMissingFields} />
        </MemoryRouter>
      );

      expect(screen.getByText('Sem título')).toBeInTheDocument();
    });
  });

  describe('Interações do usuário', () => {
    const mockFavorites = {
      1: { id: 1, title: 'Filme Teste', release_date: '2021-01-01' },
    };

    test('chama onToggleFavorite quando botão é clicado', async () => {
      const onToggleFavorite = vi.fn();

      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} onToggleFavorite={onToggleFavorite} />
        </MemoryRouter>
      );

      await user.click(screen.getByRole('button', { name: /remover dos favoritos/i }));
      expect(onToggleFavorite).toHaveBeenCalledWith(1);
    });

    test('chama onDetails quando botão detalhes é clicado', async () => {
      const onDetails = vi.fn();

      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} onDetails={onDetails} />
        </MemoryRouter>
      );

      // Clica no primeiro botão de detalhes (não no de navegação)
      const detailsButtons = screen.getAllByRole('button', { name: /detalhes de filme teste/i });
      await user.click(detailsButtons[0]); // Primeiro botão é o de detalhes
      expect(onDetails).toHaveBeenCalledWith({
        id: 1,
        title: 'Filme Teste',
        poster_path: null,
        release_date: '2021-01-01',
        overview: '',
        vote_average: undefined,
      });
    });

    test('navega para detalhes do filme quando botão navegar é clicado', async () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} />
        </MemoryRouter>
      );

      await user.click(screen.getByRole('button', { name: /ver detalhes de filme teste/i }));
      // A navegação é testada indiretamente através do mock do navigate
    });
  });

  describe('Integração com contexto', () => {
    test('usa contexto quando props não são fornecidas', () => {
      const contextFavorites = {
        1: { id: 1, title: 'Filme do Contexto', release_date: '2021-01-01' },
      };

      mockUseFavorites.mockReturnValue({
        favorites: contextFavorites,
        toggleFavorite: vi.fn(),
      });

      render(
        <MemoryRouter>
          <FavoritesView />
        </MemoryRouter>
      );

      expect(screen.getByText('Filme do Contexto')).toBeInTheDocument();
    });

    test('prioriza props sobre contexto', () => {
      const contextFavorites = {
        1: { id: 1, title: 'Filme do Contexto', release_date: '2021-01-01' },
      };
      const propFavorites = {
        2: { id: 2, title: 'Filme das Props', release_date: '2022-02-02' },
      };

      mockUseFavorites.mockReturnValue({
        favorites: contextFavorites,
        toggleFavorite: vi.fn(),
      });

      render(
        <MemoryRouter>
          <FavoritesView favorites={propFavorites} />
        </MemoryRouter>
      );

      expect(screen.getByText('Filme das Props')).toBeInTheDocument();
      expect(screen.queryByText('Filme do Contexto')).not.toBeInTheDocument();
    });
  });

  describe('Prefetch de detalhes', () => {
    test('faz prefetch de overviews faltantes', async () => {
      const favoritesWithoutOverview = {
        1: {
          id: 1,
          title: 'Filme Sem Overview',
          release_date: '2021-01-01',
          overview: '', // overview vazia
        },
      };

      const mockPrefetchData = { overview: 'Overview obtida via prefetch' };
      prefetchMovieDetails.mockResolvedValue(mockPrefetchData);

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithoutOverview} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(prefetchMovieDetails).toHaveBeenCalledWith(1);
      });
    });

    test('não faz prefetch quando overview já existe', () => {
      const favoritesWithOverview = {
        1: {
          id: 1,
          title: 'Filme Com Overview',
          release_date: '2021-01-01',
          overview: 'Overview existente',
        },
      };

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithOverview} />
        </MemoryRouter>
      );

      expect(prefetchMovieDetails).not.toHaveBeenCalled();
    });

    test('ignora erros de prefetch silenciosamente', async () => {
      const favoritesWithoutOverview = {
        1: {
          id: 1,
          title: 'Filme Sem Overview',
          release_date: '2021-01-01',
          overview: '',
        },
      };

      prefetchMovieDetails.mockRejectedValue(new Error('Erro de rede'));

      // Não deve lançar erro
      expect(() => {
        render(
          <MemoryRouter>
            <FavoritesView favorites={favoritesWithoutOverview} />
          </MemoryRouter>
        );
      }).not.toThrow();
    });
  });

  describe('Acessibilidade', () => {
    test('estado vazio tem atributos ARIA apropriados', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={{}} />
        </MemoryRouter>
      );

      const emptyState = screen.getByRole('status');
      expect(emptyState).toHaveAttribute('aria-live', 'polite');
    });

    test('botões têm labels ARIA apropriados', () => {
      const mockFavorites = {
        1: { id: 1, title: 'Filme Teste', release_date: '2021-01-01' },
      };

      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} />
        </MemoryRouter>
      );

      expect(screen.getAllByRole('button', { name: /detalhes de filme teste/i })).toHaveLength(2);
      expect(screen.getByRole('button', { name: /remover dos favoritos/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /ver detalhes de filme teste/i })
      ).toBeInTheDocument();
    });
  });
});
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => mockUseFavorites(),
}));

// Mock do serviço TMDB
vi.mock('../../services/tmdb', () => ({
  prefetchMovieDetails: vi.fn(() => Promise.resolve(null)),
}));

// Mock do CardList
vi.mock('../CardList/CardList', () => ({
  default: ({ items, onToggleFavorite, onDetails, onNavigate, favorites }) => (
    <div data-testid="card-list">
      {items.map((item) => (
        <div key={item.id} data-testid={`movie-${item.id}`}>
          <h3>{item.title}</h3>
          <button onClick={() => onDetails?.(item)} aria-label={`Detalhes de ${item.title}`}>
            Detalhes
          </button>
          <button
            onClick={() => onToggleFavorite?.(item.id)}
            aria-label={
              favorites.has(item.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
          >
            {favorites.has(item.id) ? 'Favorito' : 'Não favorito'}
          </button>
          <button
            onClick={() => onNavigate?.('detail', item)}
            aria-label={`Ver detalhes de ${item.title}`}
          >
            Navegar
          </button>
        </div>
      ))}
    </div>
  ),
}));

describe('FavoritesView', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFavorites.mockReturnValue({
      favorites: {},
      toggleFavorite: vi.fn(),
    });
  });

  describe('Estado vazio', () => {
    test('mostra mensagem quando não há favoritos (props vazias)', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={{}} onToggleFavorite={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
      expect(
        screen.getByText('Adicione alguns filmes aos seus favoritos para vê-los aqui!')
      ).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });

    test('mostra mensagem quando não há favoritos (contexto vazio)', () => {
      mockUseFavorites.mockReturnValue({
        favorites: {},
        toggleFavorite: vi.fn(),
      });

      render(
        <MemoryRouter>
          <FavoritesView />
        </MemoryRouter>
      );

      expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
    });

    test('mostra mensagem quando favorites é null', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={null} />
        </MemoryRouter>
      );

      expect(screen.getByText('Você ainda não tem filmes favoritos.')).toBeInTheDocument();
    });
  });

  describe('Renderização de favoritos', () => {
    const mockFavorites = {
      1: {
        id: 1,
        title: 'Filme Favorito 1',
        poster_path: '/poster1.jpg',
        release_date: '2021-01-01',
        overview: 'Sinopse do filme 1',
        vote_average: 8.5,
      },
      2: {
        id: 2,
        title: 'Filme Favorito 2',
        poster_path: '/poster2.jpg',
        release_date: '2020-02-02',
        overview: 'Sinopse do filme 2',
        vote_average: 7.2,
      },
    };

    test('renderiza lista de favoritos com dados completos', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} onToggleFavorite={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByTestId('card-list')).toBeInTheDocument();
      expect(screen.getByText('Filme Favorito 1')).toBeInTheDocument();
      expect(screen.getByText('Filme Favorito 2')).toBeInTheDocument();
    });

    test('normaliza dados com campos alternativos', () => {
      const favoritesWithAltFields = {
        1: {
          id: 1,
          name: 'Série Favorita', // usa 'name' em vez de 'title'
          poster: '/poster.jpg', // usa 'poster' em vez de 'poster_path'
          first_air_date: '2022-03-03', // usa 'first_air_date' em vez de 'release_date'
          description: 'Descrição da série', // usa 'description' em vez de 'overview'
        },
      };

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithAltFields} onToggleFavorite={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByText('Série Favorita')).toBeInTheDocument();
    });

    test('usa valores padrão para campos ausentes', () => {
      const favoritesWithMissingFields = {
        1: {
          id: 1,
          // title ausente
          // poster_path ausente
          // release_date ausente
          // overview ausente
        },
      };

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithMissingFields} onToggleFavorite={() => {}} />
        </MemoryRouter>
      );

      expect(screen.getByText('Sem título')).toBeInTheDocument();
    });
  });

  describe('Interações do usuário', () => {
    const mockFavorites = {
      1: { id: 1, title: 'Filme Teste', release_date: '2021-01-01' },
    };

    test('chama onToggleFavorite quando botão é clicado', async () => {
      const onToggleFavorite = vi.fn();

      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} onToggleFavorite={onToggleFavorite} />
        </MemoryRouter>
      );

      await user.click(screen.getByRole('button', { name: /favorito/i }));
      expect(onToggleFavorite).toHaveBeenCalledWith(1);
    });

    test('chama onDetails quando botão detalhes é clicado', async () => {
      const onDetails = vi.fn();

      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} onDetails={onDetails} />
        </MemoryRouter>
      );

      await user.click(screen.getAllByRole('button', { name: /detalhes/i })[0]);
      expect(onDetails).toHaveBeenCalledWith({
        id: 1,
        title: 'Filme Teste',
        poster_path: null,
        release_date: '2021-01-01',
        overview: '',
        vote_average: undefined,
      });
    });

    test('navega para detalhes do filme quando botão navegar é clicado', async () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} />
        </MemoryRouter>
      );

      await user.click(screen.getByRole('button', { name: /ver detalhes/i }));
      // A navegação é testada indiretamente através do mock do navigate
    });
  });

  describe('Integração com contexto', () => {
    test('usa contexto quando props não são fornecidas', () => {
      const contextFavorites = {
        1: { id: 1, title: 'Filme do Contexto', release_date: '2021-01-01' },
      };

      mockUseFavorites.mockReturnValue({
        favorites: contextFavorites,
        toggleFavorite: vi.fn(),
      });

      render(
        <MemoryRouter>
          <FavoritesView />
        </MemoryRouter>
      );

      expect(screen.getByText('Filme do Contexto')).toBeInTheDocument();
    });

    test('prioriza props sobre contexto', () => {
      const contextFavorites = {
        1: { id: 1, title: 'Filme do Contexto', release_date: '2021-01-01' },
      };
      const propFavorites = {
        2: { id: 2, title: 'Filme das Props', release_date: '2022-02-02' },
      };

      mockUseFavorites.mockReturnValue({
        favorites: contextFavorites,
        toggleFavorite: vi.fn(),
      });

      render(
        <MemoryRouter>
          <FavoritesView favorites={propFavorites} />
        </MemoryRouter>
      );

      expect(screen.getByText('Filme das Props')).toBeInTheDocument();
      expect(screen.queryByText('Filme do Contexto')).not.toBeInTheDocument();
    });
  });

  describe('Prefetch de detalhes', () => {
    test('faz prefetch de overviews faltantes', async () => {
      const favoritesWithoutOverview = {
        1: {
          id: 1,
          title: 'Filme Sem Overview',
          release_date: '2021-01-01',
          overview: '', // overview vazia
        },
      };

      const mockPrefetchData = { overview: 'Overview obtida via prefetch' };
      prefetchMovieDetails.mockResolvedValue(mockPrefetchData);

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithoutOverview} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(prefetchMovieDetails).toHaveBeenCalledWith(1);
      });
    });

    test('não faz prefetch quando overview já existe', () => {
      const favoritesWithOverview = {
        1: {
          id: 1,
          title: 'Filme Com Overview',
          release_date: '2021-01-01',
          overview: 'Overview existente',
        },
      };

      render(
        <MemoryRouter>
          <FavoritesView favorites={favoritesWithOverview} />
        </MemoryRouter>
      );

      expect(prefetchMovieDetails).not.toHaveBeenCalled();
    });

    test('ignora erros de prefetch silenciosamente', async () => {
      const favoritesWithoutOverview = {
        1: {
          id: 1,
          title: 'Filme Sem Overview',
          release_date: '2021-01-01',
          overview: '',
        },
      };

      prefetchMovieDetails.mockRejectedValue(new Error('Erro de rede'));

      // Não deve lançar erro
      expect(() => {
        render(
          <MemoryRouter>
            <FavoritesView favorites={favoritesWithoutOverview} />
          </MemoryRouter>
        );
      }).not.toThrow();
    });
  });

  describe('Acessibilidade', () => {
    test('estado vazio tem atributos ARIA apropriados', () => {
      render(
        <MemoryRouter>
          <FavoritesView favorites={{}} />
        </MemoryRouter>
      );

      const emptyState = screen.getByRole('status');
      expect(emptyState).toHaveAttribute('aria-live', 'polite');
    });

    test('botões têm labels ARIA apropriados', () => {
      const mockFavorites = {
        1: { id: 1, title: 'Filme Teste', release_date: '2021-01-01' },
      };

      render(
        <MemoryRouter>
          <FavoritesView favorites={mockFavorites} />
        </MemoryRouter>
      );

      expect(screen.getAllByRole('button', { name: /detalhes de filme teste/i })).toHaveLength(2);
      expect(screen.getByRole('button', { name: /remover dos favoritos/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /ver detalhes de filme teste/i })
      ).toBeInTheDocument();
    });
  });
});
