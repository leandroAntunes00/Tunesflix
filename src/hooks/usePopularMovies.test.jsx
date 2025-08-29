import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect, describe, beforeEach, afterEach } from 'vitest';
import usePopularMovies from './usePopularMovies';

vi.mock('../services/tmdb', () => ({
  fetchPopularMovies: vi.fn(async (page) => ({
    results: [{ id: 20, title: 'Popular Movie' }],
    page,
    total_pages: 10,
    total_results: 200,
  })),
}));

function TestComp({ initialPage = 1 }) {
  const {
    results,
    loading,
    error,
    page,
    totalPages,
    totalResults,
    hasResults,
    canGoNext,
    canGoPrev,
    hasError,
    isEmpty,
    fetchMovies,
    goToPage,
    nextPage,
    prevPage,
    reset,
  } = usePopularMovies(initialPage);

  return (
    <div>
      <button data-testid="fetch-movies" onClick={() => fetchMovies(page)}>
        load
      </button>
      <button data-testid="go-to-page-5" onClick={() => goToPage(5)}>
        go to page 5
      </button>
      <button data-testid="next-page" onClick={nextPage}>
        next page
      </button>
      <button data-testid="prev-page" onClick={prevPage}>
        prev page
      </button>
      <button data-testid="reset" onClick={reset}>
        reset
      </button>

      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="error">{error?.message || ''}</div>
      <div data-testid="page">{page}</div>
      <div data-testid="totalPages">{totalPages}</div>
      <div data-testid="totalResults">{totalResults}</div>
      <div data-testid="hasResults">{String(hasResults)}</div>
      <div data-testid="canGoNext">{String(canGoNext)}</div>
      <div data-testid="canGoPrev">{String(canGoPrev)}</div>
      <div data-testid="hasError">{String(hasError)}</div>
      <div data-testid="isEmpty">{String(isEmpty)}</div>

      <ul data-testid="results">
        {results.map((r) => (
          <li key={r.id} data-testid={`result-${r.id}`}>
            {r.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe('usePopularMovies hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Estado inicial', () => {
    test('inicia com valores padrão', () => {
      render(<TestComp />);

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('error').textContent).toBe('');
      expect(screen.getByTestId('page').textContent).toBe('1');
      expect(screen.getByTestId('totalPages').textContent).toBe('0');
      expect(screen.getByTestId('totalResults').textContent).toBe('0');
      expect(screen.getByTestId('hasResults').textContent).toBe('false');
      expect(screen.getByTestId('canGoNext').textContent).toBe('false');
      expect(screen.getByTestId('canGoPrev').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('false');
      expect(screen.getByTestId('isEmpty').textContent).toBe('true');
    });

    test('inicia com página personalizada', () => {
      render(<TestComp initialPage={3} />);

      expect(screen.getByTestId('page').textContent).toBe('3');
    });
  });

  describe('Estados computados', () => {
    test('hasResults reflete corretamente o estado', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      expect(screen.getByTestId('hasResults').textContent).toBe('false');

      await user.click(screen.getByTestId('fetch-movies'));

      expect(await screen.findByTestId('result-20')).toHaveTextContent('Popular Movie');
      expect(screen.getByTestId('hasResults').textContent).toBe('true');
    });

    test('canGoNext funciona corretamente', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      expect(screen.getByTestId('canGoNext').textContent).toBe('false');

      await user.click(screen.getByTestId('fetch-movies'));

      await screen.findByTestId('result-20');
      expect(screen.getByTestId('canGoNext').textContent).toBe('true');
    });

    test('canGoPrev funciona corretamente', async () => {
      const user = userEvent.setup();
      render(<TestComp initialPage={2} />);

      // Verificar estado inicial
      expect(screen.getByTestId('page').textContent).toBe('2');
      expect(screen.getByTestId('canGoPrev').textContent).toBe('true');

      // Carregar dados
      await user.click(screen.getByTestId('fetch-movies'));
      await screen.findByTestId('result-20');

      // Após carregar, deve manter canGoPrev como true
      expect(screen.getByTestId('page').textContent).toBe('2');
      expect(screen.getByTestId('canGoPrev').textContent).toBe('true');
    });

    test('isEmpty funciona corretamente', () => {
      render(<TestComp />);

      expect(screen.getByTestId('isEmpty').textContent).toBe('true');
    });
  });

  describe('Busca de filmes', () => {
    test('carrega e popula resultados', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      expect(screen.getByTestId('loading').textContent).toBe('false');
      await user.click(screen.getByTestId('fetch-movies'));

      expect(await screen.findByTestId('result-20')).toHaveTextContent('Popular Movie');
      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('page').textContent).toBe('1');
      expect(screen.getByTestId('totalPages').textContent).toBe('10');
      expect(screen.getByTestId('totalResults').textContent).toBe('200');
    });

    test('fetchMovies com página específica', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      await user.click(screen.getByTestId('go-to-page-5'));

      expect(await screen.findByTestId('result-20')).toHaveTextContent('Popular Movie');
      expect(screen.getByTestId('page').textContent).toBe('5');
    });
  });

  describe('Navegação por páginas', () => {
    test('nextPage funciona corretamente', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      // Carregar página inicial
      await user.click(screen.getByTestId('fetch-movies'));
      await screen.findByTestId('result-20');

      // Ir para próxima página
      await user.click(screen.getByTestId('next-page'));

      expect(screen.getByTestId('page').textContent).toBe('2');
    });

    test('prevPage funciona corretamente', async () => {
      const user = userEvent.setup();
      render(<TestComp initialPage={3} />);

      // Carregar página 3
      await user.click(screen.getByTestId('fetch-movies'));
      await screen.findByTestId('result-20');

      // Voltar para página anterior
      await user.click(screen.getByTestId('prev-page'));

      expect(screen.getByTestId('page').textContent).toBe('2');
    });

    test('não navega quando não pode', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      // Carregar dados primeiro
      await user.click(screen.getByTestId('fetch-movies'));
      await screen.findByTestId('result-20');

      // Tentar ir para página anterior da página 1
      await user.click(screen.getByTestId('prev-page'));

      // Página deve permanecer 1
      expect(screen.getByTestId('page').textContent).toBe('1');
    });
  });

  describe('Validações', () => {
    test('goToPage valida entrada', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      // Tentar ir para página inválida
      await user.click(screen.getByTestId('fetch-movies'));
      await screen.findByTestId('result-20');

      // goToPage com valor inválido deve usar página 1
      await user.click(screen.getByTestId('go-to-page-5'));

      expect(screen.getByTestId('page').textContent).toBe('5');
    });
  });

  describe('Tratamento de erros', () => {
    test('lida com erro na busca', async () => {
      const { fetchPopularMovies } = await import('../services/tmdb');
      fetchPopularMovies.mockRejectedValueOnce(new Error('Network error'));

      const user = userEvent.setup();
      render(<TestComp />);

      await user.click(screen.getByTestId('fetch-movies'));

      expect(await screen.findByTestId('error')).toHaveTextContent('Network error');
      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('true');
    });

    test('lida com resposta inválida', async () => {
      const { fetchPopularMovies } = await import('../services/tmdb');
      fetchPopularMovies.mockResolvedValueOnce(null);

      const user = userEvent.setup();
      render(<TestComp />);

      await user.click(screen.getByTestId('fetch-movies'));

      expect(await screen.findByTestId('error')).toHaveTextContent('Resposta inválida do servidor');
    });
  });

  describe('Condições de corrida', () => {
    test('ignora respostas antigas', async () => {
      const user = userEvent.setup();
      const { fetchPopularMovies } = await import('../services/tmdb');

      // Mock para primeira chamada (resolve lentamente)
      let firstResolve;
      const firstPromise = new Promise((resolve) => {
        firstResolve = resolve;
      });

      // Mock para segunda chamada (resolve rapidamente)
      fetchPopularMovies.mockReturnValueOnce(firstPromise).mockResolvedValueOnce({
        results: [{ id: 30, title: 'Second Movie' }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      });

      render(<TestComp />);

      // Iniciar primeira busca
      await user.click(screen.getByTestId('fetch-movies'));

      // Iniciar segunda busca imediatamente
      await user.click(screen.getByTestId('fetch-movies'));

      // Resolver primeira chamada (deve ser ignorada)
      firstResolve({
        results: [{ id: 20, title: 'First Movie' }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      });

      // Deve mostrar resultado da segunda chamada
      expect(await screen.findByTestId('result-30')).toHaveTextContent('Second Movie');
    });
  });

  describe('Reset e limpeza', () => {
    test('reset limpa todos os estados', async () => {
      const user = userEvent.setup();
      render(<TestComp />);

      // Carregar alguns dados
      await user.click(screen.getByTestId('fetch-movies'));
      await screen.findByTestId('result-20');

      // Reset
      await user.click(screen.getByTestId('reset'));

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('error').textContent).toBe('');
      expect(screen.getByTestId('page').textContent).toBe('1');
      expect(screen.getByTestId('totalPages').textContent).toBe('0');
      expect(screen.getByTestId('totalResults').textContent).toBe('0');
      expect(screen.getByTestId('hasResults').textContent).toBe('false');
      expect(screen.getByTestId('isEmpty').textContent).toBe('true');
    });
  });
});
