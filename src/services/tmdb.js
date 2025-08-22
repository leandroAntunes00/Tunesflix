const API_ROOT = 'https://api.themoviedb.org/3'

function getAuthHeaders() {
  const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

function buildUrl(path, params = {}) {
  const url = new URL(API_ROOT + path)

  // If no bearer token provided, attach API key as query param when available
  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  if (apiKey && !import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN) {
    params.api_key = apiKey
  }

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
  })
  return url.toString()
}

async function safeFetch(url, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...getAuthHeaders(), ...(opts.headers || {}) }
  const res = await fetch(url, { ...opts, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    let message = `TMDB request failed: ${res.status} ${res.statusText}`
    try {
      const json = JSON.parse(text)
      if (json.status_message) message = `${message} — ${json.status_message}`
    } catch {
      // ignore
    }
    const err = new Error(message)
    err.status = res.status
    throw err
  }
  return res.json()
}

export async function searchMovies(query, page = 1, includeAdult = false) {
  if (!query || !query.trim()) return { results: [], page: 1, total_pages: 0, total_results: 0 }
  const url = buildUrl('/search/movie', { query, page, include_adult: includeAdult })
  return safeFetch(url)
}

export async function getMovieDetails(id, appendToResponse = '') {
  if (!id) throw new Error('getMovieDetails: id is required')
  const params = {}
  if (appendToResponse) params.append_to_response = appendToResponse
  const url = buildUrl(`/movie/${id}`, params)
  return safeFetch(url)
}

export default { searchMovies, getMovieDetails }
