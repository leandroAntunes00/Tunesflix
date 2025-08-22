import { useState, useRef, useCallback } from 'react'
import { searchMovies } from '../services/tmdb'

// Hook para buscar filmes no TMDB com paginação
export default function useTmdbSearch(initialQuery = '', initialPage = 1) {
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(initialPage)
  const [results, setResults] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // request id para evitar condições de corrida
  const requestRef = useRef(0)

  const fetchPage = useCallback(
    async (q, p = 1, opts = {}) => {
      const trimmed = (q || '').trim()
      // se query vazio, limpa estado e não faz chamada
      if (!trimmed) {
        setResults([])
        setTotalPages(0)
        setTotalResults(0)
        setPage(1)
        setError(null)
        setLoading(false)
        return
      }

      const thisRequest = ++requestRef.current
      setLoading(true)
      setError(null)

      try {
        const res = await searchMovies(trimmed, p, opts.includeAdult)
        // ignorar respostas antigas
        if (thisRequest !== requestRef.current) return

        setResults(res.results || [])
        setTotalPages(res.total_pages || 0)
        setTotalResults(res.total_results || 0)
        setPage(res.page || p)
      } catch (err) {
        if (thisRequest !== requestRef.current) return
        setError(err)
      } finally {
        if (thisRequest === requestRef.current) setLoading(false)
      }
    },
    [],
  )

  const search = useCallback(
    (q, opts = {}) => {
      setQuery(q)
      // iniciar pela página 1
      fetchPage(q, 1, opts)
    },
    [fetchPage],
  )

  const goToPage = useCallback(
    (p, opts = {}) => {
      // evita paginação inválida
      if (!query || !query.trim()) return
      const target = Math.max(1, Math.floor(p))
      fetchPage(query, target, opts)
    },
    [fetchPage, query],
  )

  const nextPage = useCallback((opts = {}) => goToPage(page + 1, opts), [goToPage, page])
  const prevPage = useCallback((opts = {}) => goToPage(page - 1, opts), [goToPage, page])

  const reset = useCallback(() => {
    requestRef.current++
    setQuery('')
    setPage(1)
    setResults([])
    setTotalPages(0)
    setTotalResults(0)
    setError(null)
    setLoading(false)
  }, [])

  return {
    query,
    setQuery,
    search,
    page,
    setPage: goToPage,
    nextPage,
    prevPage,
    results,
    totalPages,
    totalResults,
    loading,
    error,
    reset,
    fetchPage, // exposto para casos avançados
  }
}
