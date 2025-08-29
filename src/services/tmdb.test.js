import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as tmdb from './tmdb';

describe('tmdb service', () => {
  const realFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
    // Limpar caches antes de cada teste
    tmdb.clearAllCaches();
  });

  afterEach(() => {
    globalThis.fetch = realFetch;
    vi.resetAllMocks();
  });

  describe('Configuração e Setup', () => {
    it('deve ter configuração válida', () => {
      const stats = tmdb.getCacheStats();
      expect(stats).toHaveProperty('details');
      expect(stats).toHaveProperty('search');
      expect(stats).toHaveProperty('popular');
    });

    it('deve limpar caches corretamente', () => {
      // Adicionar algo ao cache
      tmdb.SEARCH_CACHE?.set?.('test', 'value');

      tmdb.clearAllCaches();
      const stats = tmdb.getCacheStats();

      expect(stats.details.size).toBe(0);
      expect(stats.search.size).toBe(0);
      expect(stats.popular.size).toBe(0);
    });
  });

  describe('HTTP Client (safeFetch)', () => {
    it('constrói URLs corretamente', () => {
      const mockRes = { results: [1, 2, 3] };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      tmdb.fetchPopularMovies(2);

      const [url] = globalThis.fetch.mock.calls[0];
      expect(url).toContain('/api/movies/popular');
      expect(url).toContain('page=2');
    });

    it('inclui Content-Type header', async () => {
      const mockRes = { results: [] };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      await tmdb.fetchPopularMovies();

      const [, opts] = globalThis.fetch.mock.calls[0];
      expect(opts.headers['Content-Type']).toBe('application/json');
      expect(opts.headers['Accept']).toBe('application/json');
    });

    it('faz retry em erros retryáveis', async () => {
      const mockRes = { results: [] };

      // Simula erro de rede (TypeError como fetch faria)
      const networkError = new TypeError('Failed to fetch');
      networkError.name = 'TypeError';
      networkError.message = 'Failed to fetch';

      // Primeiro erro (retryável), segundo sucesso
      globalThis.fetch
        .mockRejectedValueOnce(networkError)
        .mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      const result = await tmdb.fetchPopularMovies();
      expect(result).toEqual(mockRes);
      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });

    it('não faz retry em erros não retryáveis', async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        text: async () => '{"status_message":"Invalid request"}',
      });

      await expect(tmdb.fetchPopularMovies()).rejects.toThrow('Invalid request');
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    it('parseia erro JSON corretamente', async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => '{"status_message":"Movie not found"}',
      });

      await expect(tmdb.fetchPopularMovies()).rejects.toThrow('Movie not found');
    });
  });

  describe('Busca de Filmes (searchMovies)', () => {
    it('retorna resultado vazio para query vazia', async () => {
      const result = await tmdb.searchMovies('   ');
      expect(result).toEqual({
        results: [],
        page: 1,
        total_pages: 0,
        total_results: 0,
      });
    });

    it('valida query obrigatória', async () => {
      await expect(tmdb.searchMovies()).rejects.toThrow('query deve ser uma string não vazia');
      await expect(tmdb.searchMovies(null)).rejects.toThrow('query deve ser uma string não vazia');
      await expect(tmdb.searchMovies(123)).rejects.toThrow('query deve ser uma string não vazia');
    });

    it('valida página positiva', async () => {
      await expect(tmdb.searchMovies('test', 0)).rejects.toThrow('page deve ser maior que 0');
      await expect(tmdb.searchMovies('test', -1)).rejects.toThrow('page deve ser maior que 0');
    });

    it('usa cache para buscas repetidas', async () => {
      const mockRes = { results: [{ id: 1, title: 'Test Movie' }] };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      // Primeira chamada
      await tmdb.searchMovies('test', 1);
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);

      // Segunda chamada (deve usar cache)
      globalThis.fetch.mockClear();
      await tmdb.searchMovies('test', 1);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });
  });

  describe('Filmes Populares (fetchPopularMovies)', () => {
    it('valida página positiva', async () => {
      await expect(tmdb.fetchPopularMovies(0)).rejects.toThrow('page deve ser maior que 0');
    });

    it('busca filmes populares com sucesso', async () => {
      const mockRes = { results: [{ id: 1, title: 'Popular Movie' }], page: 1 };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      const result = await tmdb.fetchPopularMovies(1);
      expect(result).toEqual(mockRes);
    });
  });

  describe('Filmes Top Rated (fetchTopRatedMovies)', () => {
    it('busca filmes top rated com sucesso', async () => {
      const mockRes = { results: [{ id: 1, title: 'Top Movie' }], page: 1 };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      const result = await tmdb.fetchTopRatedMovies(1);
      expect(result).toEqual(mockRes);
    });
  });

  describe('Filmes em Cartaz (fetchNowPlayingMovies)', () => {
    it('busca filmes em cartaz com sucesso', async () => {
      const mockRes = { results: [{ id: 1, title: 'Now Playing Movie' }], page: 1 };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      const result = await tmdb.fetchNowPlayingMovies(1);
      expect(result).toEqual(mockRes);
    });
  });

  describe('Detalhes do Filme (getMovieDetails)', () => {
    it('valida ID obrigatório', async () => {
      await expect(tmdb.getMovieDetails()).rejects.toThrow('ID do filme é obrigatório');
      await expect(tmdb.getMovieDetails(null)).rejects.toThrow('ID do filme é obrigatório');
      await expect(tmdb.getMovieDetails('')).rejects.toThrow('ID do filme é obrigatório');
    });

    it('valida ID numérico positivo', async () => {
      // Restaurar fetch original para este teste
      globalThis.fetch = realFetch;

      // Testa IDs que passam na validação obrigatória mas falham na numérica
      await expect(tmdb.getMovieDetails(0)).rejects.toThrow('ID deve ser um número positivo');
      await expect(tmdb.getMovieDetails(-1)).rejects.toThrow('ID deve ser um número positivo');
      await expect(tmdb.getMovieDetails(1.5)).rejects.toThrow('ID deve ser um número positivo');
      await expect(tmdb.getMovieDetails('abc')).rejects.toThrow('ID deve ser um número positivo');

      // Restaurar mock para os próximos testes
      globalThis.fetch = vi.fn();
    });

    it('retorna erro específico para filme não encontrado', async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Not found',
      });

      await expect(tmdb.getMovieDetails(999)).rejects.toThrow('Filme com ID 999 não encontrado');
    });

    it('usa cache para detalhes repetidos', async () => {
      const mockRes = { id: 123, title: 'Test Movie' };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      // Primeira chamada
      await tmdb.getMovieDetails(123);
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);

      // Segunda chamada (deve usar cache)
      globalThis.fetch.mockClear();
      await tmdb.getMovieDetails(123);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });
  });

  describe('Prefetch de Detalhes (prefetchMovieDetails)', () => {
    it('retorna null para ID inválido', async () => {
      const result = await tmdb.prefetchMovieDetails(null);
      expect(result).toBeNull();
    });

    it('prefetch funciona corretamente', async () => {
      const mockRes = { id: 456, title: 'Prefetch Movie' };
      globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

      const result = await tmdb.prefetchMovieDetails(456);
      expect(result).toEqual(mockRes);
    });

    it('retorna null em caso de erro', async () => {
      // Mock fetch para rejeitar
      const originalFetch = globalThis.fetch;
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const result = await tmdb.prefetchMovieDetails(789);
      expect(result).toBeNull();

      // Restaura fetch original
      globalThis.fetch = originalFetch;
    });
  });

  describe('Utilitários de Imagem', () => {
    it('tmdbImage retorna null para path inválido', () => {
      expect(tmdb.tmdbImage(null)).toBeNull();
      expect(tmdb.tmdbImage('')).toBeNull();
      expect(tmdb.tmdbImage(123)).toBeNull();
    });

    it('tmdbImage retorna URL completa para path válido', () => {
      const result = tmdb.tmdbImage('/abc123.jpg', 'w500');
      expect(result).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
    });

    it('tmdbImage retorna URL como está se já for completa', () => {
      const fullUrl = 'https://example.com/image.jpg';
      expect(tmdb.tmdbImage(fullUrl)).toBe(fullUrl);
    });

    it('posterImage usa tamanho correto', () => {
      const result = tmdb.posterImage('/poster.jpg');
      expect(result).toContain('/w342/');
    });

    it('backdropImage usa tamanho correto', () => {
      const result = tmdb.backdropImage('/backdrop.jpg');
      expect(result).toContain('/w780/');
    });
  });

  describe('Utilitários Gerais', () => {
    it('isValidMovieId valida IDs corretamente', () => {
      expect(tmdb.isValidMovieId(123)).toBe(true);
      expect(tmdb.isValidMovieId('456')).toBe(true);
      expect(tmdb.isValidMovieId(0)).toBe(false);
      expect(tmdb.isValidMovieId(-1)).toBe(false);
      expect(tmdb.isValidMovieId('abc')).toBe(false);
      expect(tmdb.isValidMovieId(null)).toBe(false);
    });

    it('sanitizePage sanitiza páginas corretamente', () => {
      expect(tmdb.sanitizePage(1)).toBe(1);
      expect(tmdb.sanitizePage('2')).toBe(2);
      expect(tmdb.sanitizePage(0)).toBe(1);
      expect(tmdb.sanitizePage(-1)).toBe(1);
      expect(tmdb.sanitizePage('abc')).toBe(1);
      expect(tmdb.sanitizePage(5, 3)).toBe(3); // maxPage = 3
    });

    it('withTimeout aplica timeout corretamente', async () => {
      const slowPromise = new Promise((resolve) => setTimeout(() => resolve('done'), 100));
      const result = await tmdb.withTimeout(slowPromise, 200);
      expect(result).toBe('done');
    });

    it('withTimeout lança erro em timeout', async () => {
      const slowPromise = new Promise((resolve) => setTimeout(() => resolve('done'), 200));
      await expect(tmdb.withTimeout(slowPromise, 100, 'Custom timeout')).rejects.toThrow(
        'Custom timeout'
      );
    });
  });
});
