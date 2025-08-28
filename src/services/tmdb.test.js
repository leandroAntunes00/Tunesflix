import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as tmdb from './tmdb';

describe('tmdb service', () => {
  const realFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
    vi.resetAllMocks();
  });

  it('builds urls and parses json on success', async () => {
    const mockRes = { results: [1, 2, 3] };
    globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

    const out = await tmdb.fetchPopularMovies(2);
    expect(out).toEqual(mockRes);
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it('throws when fetch returns non-ok', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Err',
      text: async () => '{}',
    });
    await expect(tmdb.fetchPopularMovies()).rejects.toThrow(/API request failed/);
  });

  it('includes Content-Type header in requests', async () => {
    const mockRes = { results: [] };
    globalThis.fetch.mockResolvedValueOnce({ ok: true, json: async () => mockRes });

    await tmdb.fetchPopularMovies();
    expect(globalThis.fetch).toHaveBeenCalled();
    const [, opts] = globalThis.fetch.mock.calls[0];
    expect(opts).toBeTruthy();
    expect(opts.headers).toBeTruthy();
    expect(opts.headers['Content-Type'] || opts.headers['content-type']).toBeTruthy();
  });

  it('parses JSON error body and includes status_message in error', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad',
      text: async () => '{"status_message":"boom"}',
    });
    await expect(tmdb.fetchPopularMovies()).rejects.toThrow(/boom/);
  });

  it('getMovieDetails throws when id not provided', async () => {
    await expect(tmdb.getMovieDetails()).rejects.toThrow(/id is required/);
  });

  it('searchMovies returns empty result for empty query', async () => {
    const out = await tmdb.searchMovies('  ');
    expect(out).toEqual({ results: [], page: 1, total_pages: 0, total_results: 0 });
  });
});
