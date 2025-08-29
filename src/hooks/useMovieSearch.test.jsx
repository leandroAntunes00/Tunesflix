import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect, describe, beforeEach } from 'vitest';
import useMovieSearch from './useMovieSearch';

// Mock do serviço TMDB
const mockSearchMovies = vi.fn();
vi.mock('../services/tmdb', () => ({
  searchMovies: (query, page) => mockSearchMovies(query, page),
}));

// Componente de teste
function TestComp({ initialQuery = '', autoSearch = false }) {
  const {
    query,
    setQuery,
    search,
    page,
    nextPage,
    prevPage,
    results,
    totalPages,
    totalResults,
    loading,
    error,
    reset,
    hasResults,
    hasError,
    canGoNext,
    canGoPrev,
    isEmptyQuery,
  } = useMovieSearch(initialQuery);

  React.useEffect(() => {
    if (autoSearch && query && !loading) {
      search(query);
    }
  }, [autoSearch, query, search, loading]);

  return (
    <div>
      <input
        data-testid="query-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filmes..."
      />
      <button data-testid="search-empty" onClick={() => search(query)}>
        search
      </button>
      <button data-testid="search-batman" onClick={() => search('batman')}>
        search batman
      </button>
      <button data-testid="next-page" onClick={nextPage} disabled={!canGoNext}>
        next page
      </button>
      <button data-testid="prev-page" onClick={prevPage} disabled={!canGoPrev}>
        prev page
      </button>
      <button data-testid="reset" onClick={reset}>
        reset
      </button>

      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="hasResults">{String(hasResults)}</div>
      <div data-testid="hasError">{String(hasError)}</div>
      <div data-testid="canGoNext">{String(canGoNext)}</div>
      <div data-testid="canGoPrev">{String(canGoPrev)}</div>
      <div data-testid="isEmptyQuery">{String(isEmptyQuery)}</div>
      <div data-testid="page">{page}</div>
      <div data-testid="totalPages">{totalPages}</div>
      <div data-testid="totalResults">{totalResults}</div>

      {error && <div data-testid="error">{error.message}</div>}

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

describe('useMovieSearch hook', () => {
  beforeEach(() => {
    mockSearchMovies.mockClear();
  });

  describe('Estado inicial', () => {
    test('inicia com valores padrão', () => {
      render(<TestComp />);

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasResults').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('false');
      expect(screen.getByTestId('canGoNext').textContent).toBe('false');
      expect(screen.getByTestId('canGoPrev').textContent).toBe('false');
      expect(screen.getByTestId('isEmptyQuery').textContent).toBe('true');
      expect(screen.getByTestId('page').textContent).toBe('1');
      expect(screen.getByTestId('totalPages').textContent).toBe('0');
      expect(screen.getByTestId('totalResults').textContent).toBe('0');
    });

    test('inicia com query inicial', () => {
      render(<TestComp initialQuery="initial search" />);

      expect(screen.getByTestId('query-input').value).toBe('initial search');
      expect(screen.getByTestId('isEmptyQuery').textContent).toBe('false');
    });
  });

  describe('Busca de filmes', () => {
    test('busca e popula resultados com sucesso', async () => {
      const user = userEvent.setup();

      mockSearchMovies.mockResolvedValue({
        results: [
          { id: 1, title: 'Batman Begins' },
          { id: 2, title: 'The Dark Knight' },
        ],
        page: 1,
        total_pages: 3,
        total_results: 57,
      });

      render(<TestComp />);
      await user.click(screen.getByTestId('search-batman'));

      await waitFor(() => {
        expect(screen.getByTestId('result-1')).toHaveTextContent('Batman Begins');
      });

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasResults').textContent).toBe('true');
      expect(screen.getByTestId('page').textContent).toBe('1');
      expect(screen.getByTestId('totalPages').textContent).toBe('3');
      expect(screen.getByTestId('totalResults').textContent).toBe('57');
      expect(screen.getByTestId('canGoNext').textContent).toBe('true');
      expect(screen.getByTestId('canGoPrev').textContent).toBe('false');
    });

    test('lida com busca vazia', async () => {
      const user = userEvent.setup();

      render(<TestComp />);

      // Busca com string vazia
      await user.click(screen.getByTestId('search-empty'));

      expect(screen.getByTestId('hasResults').textContent).toBe('false');
      expect(screen.getByTestId('totalPages').textContent).toBe('0');
      expect(screen.getByTestId('totalResults').textContent).toBe('0');
      expect(mockSearchMovies).not.toHaveBeenCalled();
    });

    test('lida com busca apenas espaços', async () => {
      const user = userEvent.setup();

      render(<TestComp />);
      const input = screen.getByTestId('query-input');

      await user.type(input, '   ');
      await user.click(screen.getByTestId('search-empty'));

      expect(screen.getByTestId('hasResults').textContent).toBe('false');
      expect(mockSearchMovies).not.toHaveBeenCalled();
    });
  });

  describe('Navegação por páginas', () => {
    test('nextPage funciona corretamente', async () => {
      const user = userEvent.setup();

      // Mock para primeira busca (página 1)
      mockSearchMovies.mockResolvedValueOnce({
        results: [{ id: 1, title: 'Movie 1' }],
        page: 1,
        total_pages: 3,
        total_results: 30,
      });

      // Mock para nextPage (página 2)
      mockSearchMovies.mockResolvedValueOnce({
        results: [{ id: 2, title: 'Movie 2' }],
        page: 2,
        total_pages: 3,
        total_results: 30,
      });

      render(<TestComp />);

      // Primeira busca
      await user.click(screen.getByTestId('search-batman'));

      await waitFor(() => {
        expect(screen.getByTestId('page').textContent).toBe('1');
      });

      // Ir para próxima página
      await user.click(screen.getByTestId('next-page'));

      await waitFor(() => {
        expect(screen.getByTestId('page').textContent).toBe('2');
      });

      expect(mockSearchMovies).toHaveBeenCalledWith('batman', 2);
    });

    test('prevPage funciona corretamente', async () => {
      const user = userEvent.setup();

      // Mock para página 2
      mockSearchMovies.mockResolvedValueOnce({
        results: [{ id: 1, title: 'Movie 1' }],
        page: 2,
        total_pages: 3,
        total_results: 30,
      });

      // Mock para página 1
      mockSearchMovies.mockResolvedValueOnce({
        results: [{ id: 2, title: 'Movie 2' }],
        page: 1,
        total_pages: 3,
        total_results: 30,
      });

      render(<TestComp />);

      // Ir para página 2 primeiro
      await user.click(screen.getByTestId('search-batman'));

      await waitFor(() => {
        expect(screen.getByTestId('page').textContent).toBe('2');
      });

      // Voltar para página anterior
      await user.click(screen.getByTestId('prev-page'));

      await waitFor(() => {
        expect(screen.getByTestId('page').textContent).toBe('1');
      });
    });

    test('não permite navegação além dos limites', async () => {
      const user = userEvent.setup();

      mockSearchMovies.mockResolvedValue({
        results: [{ id: 1, title: 'Movie 1' }],
        page: 1,
        total_pages: 1,
        total_results: 10,
      });

      render(<TestComp />);

      await user.click(screen.getByTestId('search-batman'));

      await waitFor(() => {
        expect(screen.getByTestId('page').textContent).toBe('1');
      });

      // Botões devem estar desabilitados
      expect(screen.getByTestId('next-page')).toBeDisabled();
      expect(screen.getByTestId('prev-page')).toBeDisabled();
    });
  });

  describe('Tratamento de erros', () => {
    test('lida com erro na busca', async () => {
      const user = userEvent.setup();

      mockSearchMovies.mockRejectedValue(new Error('Network error'));

      render(<TestComp />);
      await user.click(screen.getByTestId('search-batman'));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error');
      });

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('true');
      expect(screen.getByTestId('hasResults').textContent).toBe('false');
    });

    test('lida com resposta inválida', async () => {
      const user = userEvent.setup();

      mockSearchMovies.mockResolvedValue(null);

      render(<TestComp />);
      await user.click(screen.getByTestId('search-batman'));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Resposta inválida do servidor');
      });
    });
  });

  describe('Condições de corrida', () => {
    test('ignora respostas antigas', async () => {
      const user = userEvent.setup();

      // Primeira chamada resolve lentamente
      let firstResolve;
      const firstPromise = new Promise((resolve) => {
        firstResolve = resolve;
      });

      // Segunda chamada resolve rapidamente
      mockSearchMovies.mockReturnValueOnce(firstPromise).mockResolvedValueOnce({
        results: [{ id: 2, title: 'Second Result' }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      });

      render(<TestComp />);

      // Iniciar primeira busca
      await user.click(screen.getByTestId('search-batman'));

      // Iniciar segunda busca imediatamente
      await user.click(screen.getByTestId('search-batman'));

      // Resolver primeira chamada (deve ser ignorada)
      firstResolve({
        results: [{ id: 1, title: 'First Result' }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      });

      // Deve mostrar resultado da segunda chamada
      await waitFor(() => {
        expect(screen.getByTestId('result-2')).toHaveTextContent('Second Result');
      });

      expect(screen.queryByTestId('result-1')).not.toBeInTheDocument();
    });
  });

  describe('Reset e limpeza', () => {
    test('reset limpa todos os estados', async () => {
      const user = userEvent.setup();

      mockSearchMovies.mockResolvedValue({
        results: [{ id: 1, title: 'Test Movie' }],
        page: 1,
        total_pages: 2,
        total_results: 20,
      });

      render(<TestComp />);

      // Fazer uma busca
      await user.click(screen.getByTestId('search-batman'));

      await waitFor(() => {
        expect(screen.getByTestId('hasResults').textContent).toBe('true');
      });

      // Reset
      await user.click(screen.getByTestId('reset'));

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasResults').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('false');
      expect(screen.getByTestId('page').textContent).toBe('1');
      expect(screen.getByTestId('totalPages').textContent).toBe('0');
      expect(screen.getByTestId('totalResults').textContent).toBe('0');
      expect(screen.getByTestId('query-input').value).toBe('');
    });
  });

  describe('Estados computados', () => {
    test('hasResults reflete corretamente o estado', async () => {
      const user = userEvent.setup();

      mockSearchMovies.mockResolvedValue({
        results: [{ id: 1, title: 'Test Movie' }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      });

      render(<TestComp />);

      expect(screen.getByTestId('hasResults').textContent).toBe('false');

      await user.click(screen.getByRole('button', { name: /search batman/i }));

      await waitFor(() => {
        expect(screen.getByTestId('hasResults').textContent).toBe('true');
      });
    });

    test('isEmptyQuery funciona corretamente', async () => {
      const user = userEvent.setup();

      render(<TestComp />);

      expect(screen.getByTestId('isEmptyQuery').textContent).toBe('true');

      const input = screen.getByTestId('query-input');
      await user.type(input, 'batman');

      expect(screen.getByTestId('isEmptyQuery').textContent).toBe('false');

      await user.clear(input);
      expect(screen.getByTestId('isEmptyQuery').textContent).toBe('true');
    });
  });
});
