const API_ROOT = import.meta.env.VITE_API || 'http://localhost:3000';

function buildUrl(path, params = {}) {
  const url = new URL(API_ROOT + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  return url.toString();
}

async function safeFetch(url, opts = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let message = `API request failed: ${res.status} ${res.statusText}`;
    try {
      const json = JSON.parse(text);
      if (json.status_message) message = `${message} — ${json.status_message}`;
    } catch {
      // ignore
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) return { results: [], page: 1, total_pages: 0, total_results: 0 };
  const url = buildUrl('/api/movies/search', { q: query, page });
  return safeFetch(url);
}

export async function fetchPopularMovies(page = 1) {
  const url = buildUrl('/api/movies/popular', { page });
  return safeFetch(url);
}

export async function fetchTopRatedMovies(page = 1) {
  const url = buildUrl('/api/movies/top-rated', { page });
  return safeFetch(url);
}

export async function fetchNowPlayingMovies(page = 1) {
  const url = buildUrl('/api/movies/now-playing', { page });
  return safeFetch(url);
}

// Mantém compatibilidade com código existente
export async function getMovieDetails(id) {
  if (!id) throw new Error('getMovieDetails: id is required');
  const url = buildUrl(`/api/movies/${id}`);
  return safeFetch(url);
}

export default { searchMovies, getMovieDetails, fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies };
