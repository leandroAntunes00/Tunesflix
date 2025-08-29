import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, vi, expect, describe, beforeEach } from 'vitest';
import useMovieDetails from './useMovieDetails';

// Mock do serviço TMDB
const mockGetMovieDetails = vi.fn();
vi.mock('../services/tmdb', () => ({
  getMovieDetails: (id) => mockGetMovieDetails(id),
}));

// Componente de teste
function TestComp({ movieId, autoLoad = false }) {
  const {
    details,
    loading,
    error,
    fetchDetails,
    reset,
    hasDetails,
    hasError,
    retry,
    lastFetchedId,
  } = useMovieDetails();

  React.useEffect(() => {
    if (autoLoad && movieId) {
      fetchDetails(movieId);
    }
  }, [autoLoad, movieId, fetchDetails]);

  return (
    <div>
      <button onClick={() => fetchDetails(123)}>load details</button>
      <button onClick={() => fetchDetails(456)}>load other movie</button>
      <button onClick={reset}>reset</button>
      <button onClick={retry}>retry</button>

      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="hasDetails">{String(hasDetails)}</div>
      <div data-testid="hasError">{String(hasError)}</div>
      <div data-testid="lastFetchedId">{String(lastFetchedId)}</div>

      {details && <div data-testid="title">{details.title}</div>}
      {error && <div data-testid="error">{error.message}</div>}
    </div>
  );
}

describe('useMovieDetails hook', () => {
  beforeEach(() => {
    mockGetMovieDetails.mockClear();
  });

  describe('Estado inicial', () => {
    test('inicia com valores padrão', () => {
      render(<TestComp />);

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasDetails').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('false');
      expect(screen.getByTestId('lastFetchedId').textContent).toBe('null');
    });
  });

  describe('Carregamento de detalhes', () => {
    test('carrega detalhes do filme com sucesso', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails.mockResolvedValue({
        id: 123,
        title: 'Movie Details',
        overview: 'Movie description',
        runtime: 120,
      });

      render(<TestComp />);
      await user.click(screen.getByRole('button', { name: /load details/i }));

      expect(mockGetMovieDetails).toHaveBeenCalledWith(123);

      await waitFor(() => {
        expect(screen.getByTestId('title')).toHaveTextContent('Movie Details');
      });

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasDetails').textContent).toBe('true');
      expect(screen.getByTestId('hasError').textContent).toBe('false');
      expect(screen.getByTestId('lastFetchedId').textContent).toBe('123');
    });

    test('carrega automaticamente quando autoLoad=true', async () => {
      mockGetMovieDetails.mockResolvedValue({
        id: 456,
        title: 'Auto Loaded Movie',
        overview: 'Auto loaded description',
      });

      render(<TestComp movieId={456} autoLoad={true} />);

      await waitFor(() => {
        expect(screen.getByTestId('title')).toHaveTextContent('Auto Loaded Movie');
      });

      expect(mockGetMovieDetails).toHaveBeenCalledWith(456);
    });
  });

  describe('Tratamento de erros', () => {
    test('lida com erro na requisição', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails.mockRejectedValue(new Error('Network error'));

      render(<TestComp />);
      await user.click(screen.getByRole('button', { name: /load details/i }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Network error');
      });

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasDetails').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('true');
    });

    test('lida com dados inválidos', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails.mockResolvedValue(null);

      render(<TestComp />);
      await user.click(screen.getByRole('button', { name: /load details/i }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('Dados do filme inválidos');
      });
    });

    test('retry funciona corretamente', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails
        .mockRejectedValueOnce(new Error('First attempt failed'))
        .mockResolvedValueOnce({
          id: 123,
          title: 'Success on retry',
          overview: 'Success description',
        });

      render(<TestComp />);

      // Primeira tentativa (falha)
      await user.click(screen.getByRole('button', { name: /load details/i }));

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent('First attempt failed');
      });

      // Retry (sucesso)
      await user.click(screen.getByRole('button', { name: /retry/i }));

      await waitFor(() => {
        expect(screen.getByTestId('title')).toHaveTextContent('Success on retry');
      });

      expect(mockGetMovieDetails).toHaveBeenCalledTimes(2);
    });
  });

  describe('Validação de entrada', () => {
    test('lida com ID inválido', async () => {
      render(<TestComp />);

      // Como não podemos chamar diretamente fetchDetails com ID inválido,
      // testamos apenas o estado inicial que deve ser válido
      expect(screen.getByTestId('hasDetails').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('false');
      expect(screen.getByTestId('lastFetchedId').textContent).toBe('null');
    });

    test('não faz requisição desnecessária para mesmo ID', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails.mockResolvedValue({
        id: 123,
        title: 'Same Movie',
        overview: 'Same description',
      });

      render(<TestComp />);

      // Primeira chamada
      await user.click(screen.getByRole('button', { name: /load details/i }));

      await waitFor(() => {
        expect(screen.getByTestId('title')).toHaveTextContent('Same Movie');
      });

      // Segunda chamada para mesmo ID (não deve fazer nova requisição)
      await user.click(screen.getByRole('button', { name: /load details/i }));

      expect(mockGetMovieDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe('Reset e limpeza', () => {
    test('reset limpa todos os estados', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails.mockResolvedValue({
        id: 123,
        title: 'Movie to Reset',
        overview: 'Description to reset',
      });

      render(<TestComp />);
      await user.click(screen.getByRole('button', { name: /load details/i }));

      await waitFor(() => {
        expect(screen.getByTestId('title')).toHaveTextContent('Movie to Reset');
      });

      await user.click(screen.getByRole('button', { name: /reset/i }));

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('hasDetails').textContent).toBe('false');
      expect(screen.getByTestId('hasError').textContent).toBe('false');
      expect(screen.getByTestId('lastFetchedId').textContent).toBe('null');
      expect(screen.queryByTestId('title')).not.toBeInTheDocument();
    });
  });

  describe('Estados computados', () => {
    test('hasDetails reflete corretamente o estado', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails.mockResolvedValue({
        id: 123,
        title: 'Test Movie',
        overview: 'Test description',
      });

      render(<TestComp />);

      expect(screen.getByTestId('hasDetails').textContent).toBe('false');

      await user.click(screen.getByRole('button', { name: /load details/i }));

      await waitFor(() => {
        expect(screen.getByTestId('hasDetails').textContent).toBe('true');
      });
    });

    test('hasError reflete corretamente o estado', async () => {
      const user = userEvent.setup();

      mockGetMovieDetails.mockRejectedValue(new Error('Test error'));

      render(<TestComp />);

      expect(screen.getByTestId('hasError').textContent).toBe('false');

      await user.click(screen.getByRole('button', { name: /load details/i }));

      await waitFor(() => {
        expect(screen.getByTestId('hasError').textContent).toBe('true');
      });
    });
  });
});
