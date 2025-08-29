import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi, describe, beforeEach, afterEach } from 'vitest';
import MovieModal from './MovieModal';

// Mock do serviço TMDB
vi.mock('../../services/tmdb', () => ({
  posterImage: vi.fn((path) => `https://image.tmdb.org/t/p/w500${path}`),
}));

describe('MovieModal', () => {
  const user = userEvent.setup();
  let onClose;

  // Mock de dados de filme
  const mockMovieDetails = {
    id: 1,
    title: 'Filme de Teste',
    name: 'Nome Alternativo',
    release_date: '2023-01-15',
    runtime: 120,
    overview: 'Uma descrição detalhada do filme para teste.',
    tagline: 'Um filme incrível',
    poster_path: '/poster123.jpg',
    genres: [
      { id: 1, name: 'Ação' },
      { id: 2, name: 'Aventura' },
    ],
    production_companies: [
      { id: 1, name: 'Studio A' },
      { id: 2, name: 'Studio B' },
    ],
    vote_average: 8.5,
  };

  beforeEach(() => {
    onClose = vi.fn();
    // Limpa o DOM antes de cada teste
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Cleanup após cada teste
    vi.clearAllTimers();
  });

  describe('Renderização básica', () => {
    test('não renderiza quando open=false', () => {
      render(<MovieModal open={false} onClose={onClose} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('renderiza quando open=true', () => {
      render(<MovieModal open={true} onClose={onClose} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('aplica atributos ARIA corretos', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'movie-modal-title');
      expect(dialog).toHaveAttribute('aria-describedby', 'movie-modal-content');
    });
  });

  describe('Estados de loading e erro', () => {
    test('mostra estado de loading', () => {
      render(<MovieModal open={true} onClose={onClose} loading={true} />);

      const loadingElement = screen.getByRole('status');
      expect(loadingElement).toHaveTextContent('Carregando...');
      expect(loadingElement).toHaveAttribute('aria-live', 'polite');
    });

    test('mostra mensagem de erro', () => {
      const error = new Error('Falha ao carregar');
      render(<MovieModal open={true} onClose={onClose} error={error} />);

      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent('Erro: Falha ao carregar');
      expect(errorElement).toHaveAttribute('aria-live', 'assertive');
    });

    test('mostra loading e erro simultaneamente', () => {
      const error = new Error('Erro de rede');
      render(<MovieModal open={true} onClose={onClose} loading={true} error={error} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Conteúdo do filme', () => {
    test('renderiza título corretamente', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      expect(screen.getByText('Filme de Teste')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Filme de Teste');
    });

    test('usa nome alternativo quando título não disponível', () => {
      const detailsWithoutTitle = { ...mockMovieDetails, title: null };
      render(<MovieModal open={true} onClose={onClose} details={detailsWithoutTitle} />);

      expect(screen.getByText('Nome Alternativo')).toBeInTheDocument();
    });

    test('mostra tagline quando disponível', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      expect(screen.getByText('"Um filme incrível"')).toBeInTheDocument();
    });

    test('oculta tagline quando não disponível', () => {
      const detailsWithoutTagline = { ...mockMovieDetails, tagline: null };
      render(<MovieModal open={true} onClose={onClose} details={detailsWithoutTagline} />);

      expect(screen.queryByText('"Um filme incrível"')).not.toBeInTheDocument();
    });

    test('mostra metadados corretamente', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('120 min')).toBeInTheDocument();
    });

    test('mostra metadados parciais', () => {
      const partialDetails = {
        ...mockMovieDetails,
        release_date: null,
        runtime: 90,
      };
      render(<MovieModal open={true} onClose={onClose} details={partialDetails} />);

      expect(screen.getByText('90 min')).toBeInTheDocument();
      expect(screen.queryByText('2023')).not.toBeInTheDocument();
    });

    test('mostra poster quando disponível', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      const img = screen.getByAltText('Poster do filme Filme de Teste');
      expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/poster123.jpg');
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    test('mostra placeholder quando poster não disponível', () => {
      const detailsWithoutPoster = { ...mockMovieDetails, poster_path: null };
      render(<MovieModal open={true} onClose={onClose} details={detailsWithoutPoster} />);

      const placeholder = screen.getByRole('img', { hidden: true });
      expect(placeholder).toHaveTextContent('Sem imagem');
      expect(placeholder).toHaveAttribute('aria-label', 'Imagem do poster não disponível');
    });

    test('mostra gêneros corretamente', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      expect(screen.getByText('Ação, Aventura')).toBeInTheDocument();
    });

    test('oculta gêneros quando array vazio', () => {
      const detailsWithoutGenres = { ...mockMovieDetails, genres: [] };
      render(<MovieModal open={true} onClose={onClose} details={detailsWithoutGenres} />);

      expect(screen.queryByText('Gêneros:')).not.toBeInTheDocument();
    });

    test('mostra produção corretamente', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      expect(screen.getByText('Studio A, Studio B')).toBeInTheDocument();
    });

    test('oculta produção quando array vazio', () => {
      const detailsWithoutCompanies = { ...mockMovieDetails, production_companies: [] };
      render(<MovieModal open={true} onClose={onClose} details={detailsWithoutCompanies} />);

      expect(screen.queryByText('Produção:')).not.toBeInTheDocument();
    });

    test('mostra avaliação corretamente', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      expect(screen.getByText('8.5 / 10')).toBeInTheDocument();
    });

    test('mostra "Não avaliado" quando vote_average é null', () => {
      const detailsWithoutRating = { ...mockMovieDetails, vote_average: null };
      render(<MovieModal open={true} onClose={onClose} details={detailsWithoutRating} />);

      expect(screen.getByText('Não avaliado')).toBeInTheDocument();
    });
  });

  describe('Interações do usuário', () => {
    test('fecha modal ao clicar no botão fechar', async () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      await user.click(screen.getByRole('button', { name: /fechar modal/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('fecha modal ao clicar no backdrop', async () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      const backdrop = screen.getByRole('presentation');
      await user.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('não fecha modal ao clicar no conteúdo', async () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      const dialog = screen.getByRole('dialog');
      await user.click(dialog);
      expect(onClose).not.toHaveBeenCalled();
    });

    test('fecha modal ao pressionar Escape', async () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Acessibilidade e navegação por teclado', () => {
    test('foca no botão fechar quando modal abre', async () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      const closeButton = screen.getByRole('button', { name: /fechar modal/i });
      await waitFor(() => {
        expect(closeButton).toHaveFocus();
      });
    });

    test('implementa focus trap corretamente', async () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      const closeButton = screen.getByRole('button', { name: /fechar modal/i });
      const lastFocusableElement = closeButton; // Botão fechar é o último elemento focusável

      // Tab do último elemento deve voltar para o primeiro
      await user.tab();
      expect(lastFocusableElement).toHaveFocus();

      // Shift+Tab do primeiro elemento deve ir para o último
      await user.tab({ shift: true });
      expect(closeButton).toHaveFocus();
    });

    test('botão fechar tem atributos de acessibilidade corretos', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      const closeButton = screen.getByRole('button', { name: /fechar modal/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Fechar modal de detalhes do filme');
      expect(closeButton).toHaveAttribute('type', 'button');
    });

    test('conteúdo tem IDs para referência ARIA', () => {
      render(<MovieModal open={true} onClose={onClose} details={mockMovieDetails} />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'movie-modal-title');
      expect(screen.getByTestId('movie-modal-content')).toHaveAttribute(
        'id',
        'movie-modal-content'
      );
    });
  });

  describe('Prevenção de scroll do body', () => {
    test('previne scroll do body quando modal está aberto', () => {
      const originalOverflow = document.body.style.overflow;

      render(<MovieModal open={true} onClose={onClose} />);
      expect(document.body.style.overflow).toBe('hidden');

      // Cleanup
      document.body.style.overflow = originalOverflow;
    });

    test('restaura scroll do body quando modal fecha', () => {
      const originalOverflow = document.body.style.overflow;

      const { rerender } = render(<MovieModal open={true} onClose={onClose} />);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<MovieModal open={false} onClose={onClose} />);
      expect(document.body.style.overflow).toBe(originalOverflow);
    });
  });

  describe('Casos extremos', () => {
    test('lida com dados mínimos do filme', () => {
      const minimalDetails = {
        id: 1,
        title: 'Filme Mínimo',
      };

      render(<MovieModal open={true} onClose={onClose} details={minimalDetails} />);

      expect(screen.getByText('Filme Mínimo')).toBeInTheDocument();
      expect(screen.getByText('Não avaliado')).toBeInTheDocument();
    });

    test('lida com dados vazios', () => {
      const emptyDetails = {};

      render(<MovieModal open={true} onClose={onClose} details={emptyDetails} />);

      expect(screen.getByText('Título não disponível')).toBeInTheDocument();
    });

    test('lida com arrays vazios', () => {
      const detailsWithEmptyArrays = {
        ...mockMovieDetails,
        genres: [],
        production_companies: [],
      };

      render(<MovieModal open={true} onClose={onClose} details={detailsWithEmptyArrays} />);

      expect(screen.queryByText('Gêneros:')).not.toBeInTheDocument();
      expect(screen.queryByText('Produção:')).not.toBeInTheDocument();
    });
  });
});
