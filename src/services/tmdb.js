import { createConfig } from '../utils/config';

/**
 * Configuração centralizada do serviço TMDB
 * @type {Object}
 */
const TMDB_CONFIG = createConfig({
  // API Configuration
  api: {
    root: import.meta.env.VITE_API || 'http://localhost:3000',
    timeout: 8000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  // Cache Configuration
  cache: {
    maxSize: 100,
    ttl: 5 * 60 * 1000, // 5 minutes
    prefetchEnabled: true,
  },

  // Image Configuration
  images: {
    baseUrl: 'https://image.tmdb.org/t/p',
    sizes: {
      POSTER: 'w342',
      BACKDROP: 'w780',
      PROFILE: 'w185',
      LOGO: 'w154',
    },
  },
});

/**
 * Cache inteligente com TTL e LRU eviction
 * @class
 */
class SmartCache {
  constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  /**
   * Obtém um valor do cache se ainda for válido
   * @param {string} key - Chave do cache
   * @returns {any|null} Valor cacheado ou null se expirado/inválido
   */
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Define um valor no cache com timestamp
   * @param {string} key - Chave do cache
   * @param {any} value - Valor a ser cacheado
   */
  set(key, value) {
    // LRU eviction se necessário
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  /**
   * Remove um valor do cache
   * @param {string} key - Chave a ser removida
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Obtém estatísticas do cache
   * @returns {Object} Estatísticas do cache
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0, // TODO: implementar tracking de hits/misses
    };
  }
}

// Instâncias de cache
const DETAILS_CACHE = new SmartCache(TMDB_CONFIG.cache.maxSize, TMDB_CONFIG.cache.ttl);

const SEARCH_CACHE = new SmartCache(50, 10 * 60 * 1000); // 10 min para busca
const POPULAR_CACHE = new SmartCache(20, 15 * 60 * 1000); // 15 min para populares

/**
 * Logger estruturado para o serviço TMDB
 * @class
 */
class TMDBLogger {
  /**
   * Log de informação
   * @param {string} message - Mensagem
   * @param {Object} context - Contexto adicional
   */
  info(message, context = {}) {
    console.info(`[TMDB] ${message}`, context);
  }

  /**
   * Log de warning
   * @param {string} message - Mensagem
   * @param {Object} context - Contexto adicional
   */
  warn(message, context = {}) {
    console.warn(`[TMDB] ${message}`, context);
  }

  /**
   * Log de erro
   * @param {string} message - Mensagem
   * @param {Error} error - Erro
   * @param {Object} context - Contexto adicional
   */
  error(message, error, context = {}) {
    console.error(`[TMDB] ${message}`, { error: error.message, stack: error.stack, ...context });
  }

  /**
   * Log de debug
   * @param {string} message - Mensagem
   * @param {Object} context - Contexto adicional
   */
  debug(message, context = {}) {
    if (import.meta.env.DEV) {
      console.debug(`[TMDB] ${message}`, context);
    }
  }
}

const logger = new TMDBLogger();

/**
 * Busca filmes por termo de pesquisa
 *
 * @param {string} query - Termo de pesquisa
 * @param {number} page - Página dos resultados (padrão: 1)
 * @returns {Promise<Object>} Resultados da busca com paginação
 *
 * @throws {Error} Quando query é vazia ou inválida
 *
 * @example
 * ```javascript
 * const results = await searchMovies('batman', 1);
 * console.log(`Encontrados ${results.total_results} filmes`);
 * ```
 */
export async function searchMovies(query, page = 1) {
  // Validação de entrada
  if (!query || typeof query !== 'string') {
    throw new Error('searchMovies: query deve ser uma string não vazia');
  }

  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    logger.debug('Query vazia, retornando resultado vazio');
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }

  if (page < 1) {
    throw new Error('searchMovies: page deve ser maior que 0');
  }

  const cacheKey = `search_${trimmedQuery}_${page}`;

  // Verificar cache
  const cached = SEARCH_CACHE.get(cacheKey);
  if (cached) {
    logger.debug('Cache hit para busca', { query: trimmedQuery, page });
    return cached;
  }

  try {
    logger.info('Buscando filmes', { query: trimmedQuery, page });

    const url = buildUrl('/api/movies/search', { q: trimmedQuery, page });
    const data = await safeFetch(url);

    // Cache dos resultados
    SEARCH_CACHE.set(cacheKey, data);

    logger.info('Busca concluída com sucesso', {
      query: trimmedQuery,
      page,
      results: data.total_results,
    });

    return data;
  } catch (error) {
    logger.error('Erro na busca de filmes', error, { query: trimmedQuery, page });
    throw error;
  }
}

/**
 * Busca filmes populares
 *
 * @param {number} page - Página dos resultados (padrão: 1)
 * @returns {Promise<Object>} Lista de filmes populares com paginação
 *
 * @example
 * ```javascript
 * const popular = await fetchPopularMovies(1);
 * console.log('Filmes populares:', popular.results.length);
 * ```
 */
export async function fetchPopularMovies(page = 1) {
  if (page < 1) {
    throw new Error('fetchPopularMovies: page deve ser maior que 0');
  }

  const cacheKey = `popular_${page}`;

  // Verificar cache
  const cached = POPULAR_CACHE.get(cacheKey);
  if (cached) {
    logger.debug('Cache hit para filmes populares', { page });
    return cached;
  }

  try {
    logger.debug('Buscando filmes populares', { page });

    const url = buildUrl('/api/movies/popular', { page });
    const data = await safeFetch(url);

    // Cache dos resultados
    POPULAR_CACHE.set(cacheKey, data);

    logger.debug('Filmes populares obtidos com sucesso', { page, count: data.results?.length });

    return data;
  } catch (error) {
    logger.error('Erro ao buscar filmes populares', error, { page });
    throw error;
  }
}

/**
 * Busca filmes mais bem avaliados
 *
 * @param {number} page - Página dos resultados (padrão: 1)
 * @returns {Promise<Object>} Lista de filmes top rated com paginação
 *
 * @example
 * ```javascript
 * const topRated = await fetchTopRatedMovies(1);
 * console.log('Melhores filmes:', topRated.results.length);
 * ```
 */
export async function fetchTopRatedMovies(page = 1) {
  if (page < 1) {
    throw new Error('fetchTopRatedMovies: page deve ser maior que 0');
  }

  const cacheKey = `top_rated_${page}`;

  // Verificar cache
  const cached = POPULAR_CACHE.get(cacheKey);
  if (cached) {
    logger.debug('Cache hit para filmes top rated', { page });
    return cached;
  }

  try {
    logger.debug('Buscando filmes top rated', { page });

    const url = buildUrl('/api/movies/top-rated', { page });
    const data = await safeFetch(url);

    // Cache dos resultados
    POPULAR_CACHE.set(cacheKey, data);

    logger.debug('Filmes top rated obtidos com sucesso', { page, count: data.results?.length });

    return data;
  } catch (error) {
    logger.error('Erro ao buscar filmes top rated', error, { page });
    throw error;
  }
}

/**
 * Busca filmes em cartaz
 *
 * @param {number} page - Página dos resultados (padrão: 1)
 * @returns {Promise<Object>} Lista de filmes em cartaz com paginação
 *
 * @example
 * ```javascript
 * const nowPlaying = await fetchNowPlayingMovies(1);
 * console.log('Filmes em cartaz:', nowPlaying.results.length);
 * ```
 */
export async function fetchNowPlayingMovies(page = 1) {
  if (page < 1) {
    throw new Error('fetchNowPlayingMovies: page deve ser maior que 0');
  }

  const cacheKey = `now_playing_${page}`;

  // Verificar cache
  const cached = POPULAR_CACHE.get(cacheKey);
  if (cached) {
    logger.debug('Cache hit para filmes em cartaz', { page });
    return cached;
  }

  try {
    logger.debug('Buscando filmes em cartaz', { page });

    const url = buildUrl('/api/movies/now-playing', { page });
    const data = await safeFetch(url);

    // Cache dos resultados
    POPULAR_CACHE.set(cacheKey, data);

    logger.debug('Filmes em cartaz obtidos com sucesso', { page, count: data.results?.length });

    return data;
  } catch (error) {
    logger.error('Erro ao buscar filmes em cartaz', error, { page });
    throw error;
  }
}

/**
 * Obtém detalhes completos de um filme
 *
 * @param {number|string} id - ID único do filme
 * @returns {Promise<Object>} Detalhes completos do filme
 *
 * @throws {Error} Quando ID não é fornecido ou filme não encontrado
 *
 * @example
 * ```javascript
 * const movie = await getMovieDetails(123);
 * console.log('Filme:', movie.title, 'Duração:', movie.runtime, 'min');
 * ```
 */
export async function getMovieDetails(id) {
  // Validações em ordem de prioridade
  // Checa explicitamente undefined / null / empty string para não confundir com 0
  if (id === undefined || id === null || id === '') {
    throw new Error('getMovieDetails: ID do filme é obrigatório');
  }

  const numericId = Number(id);
  if (isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
    throw new Error('getMovieDetails: ID deve ser um número positivo');
  }

  const cacheKey = `details_${numericId}`;

  // Verificar cache primeiro
  const cached = DETAILS_CACHE.get(cacheKey);
  if (cached) {
    logger.debug('Cache hit para detalhes do filme', { id: numericId });
    return cached;
  }

  try {
    logger.info('Buscando detalhes do filme', { id: numericId });

    const url = buildUrl(`/api/movies/${numericId}`);
    const data = await safeFetch(url);

    // Cache dos detalhes
    DETAILS_CACHE.set(cacheKey, data);

    logger.info('Detalhes do filme obtidos com sucesso', {
      id: numericId,
      title: data.title,
    });

    return data;
  } catch (error) {
    logger.error('Erro ao buscar detalhes do filme', error, { id: numericId });

    if (error.status === 404) {
      throw new Error(`Filme com ID ${numericId} não encontrado`);
    }

    throw error;
  }
}

/**
 * Constrói URL da API com parâmetros de query
 *
 * @param {string} path - Caminho da API
 * @param {Object} params - Parâmetros de query
 * @returns {string} URL completa
 *
 * @example
 * ```javascript
 * const url = buildUrl('/api/movies/search', { q: 'batman', page: 1 });
 * // Resultado: "http://localhost:3000/api/movies/search?q=batman&page=1"
 * ```
 */
function buildUrl(path, params = {}) {
  const url = new URL(TMDB_CONFIG.api.root + path);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Cliente HTTP seguro com retry automático e timeout
 *
 * @param {string} url - URL para fazer requisição
 * @param {Object} options - Opções da requisição
 * @param {number} attempt - Número da tentativa atual
 * @returns {Promise<Object>} Dados da resposta JSON
 *
 * @throws {Error} Erro com status HTTP e mensagem detalhada
 */
async function safeFetch(url, options = {}, attempt = 1) {
  const { timeout = TMDB_CONFIG.api.timeout, retryAttempts = TMDB_CONFIG.api.retryAttempts } =
    options;

  try {
    logger.debug('Fazendo requisição HTTP', { url, attempt, timeout });

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.status_message) {
          errorMessage = `${errorMessage} — ${errorJson.status_message}`;
        }
      } catch {
        // Ignorar erros de parsing
      }

      const error = new Error(errorMessage);
      error.status = response.status;
      error.url = url;
      error.attempt = attempt;

      throw error;
    }

    const data = await response.json();
    logger.debug('Requisição HTTP bem-sucedida', { url, attempt });

    return data;
  } catch (error) {
    logger.warn('Erro na requisição HTTP', {
      url,
      attempt,
      error: error.message,
      isRetryable: isRetryableError(error),
    });

    // Retry para erros retryáveis
    if (isRetryableError(error) && attempt < retryAttempts) {
      const delay = TMDB_CONFIG.api.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
      logger.info(`Tentando novamente em ${delay}ms`, { url, attempt: attempt + 1 });

      await new Promise((resolve) => setTimeout(resolve, delay));
      return safeFetch(url, options, attempt + 1);
    }

    throw error;
  }
}

/**
 * Verifica se um erro é retryável
 *
 * @param {Error} error - Erro a ser verificado
 * @returns {boolean} True se o erro for retryável
 */
function isRetryableError(error) {
  // Erros de rede (fetch falhou)
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return true;
  }

  // Timeout
  if (error.name === 'AbortError') {
    return true;
  }

  // Erros de servidor (5xx)
  if (error.status >= 500 && error.status < 600) {
    return true;
  }

  // Erros específicos que podem ser temporários
  if (error.status === 429) {
    // Too Many Requests
    return true;
  }

  return false;
}

/**
 * Constrói URL de imagem do TMDB
 *
 * @param {string} path - Caminho da imagem
 * @param {string} size - Tamanho da imagem (padrão: TMDB_SIZES.POSTER)
 * @returns {string|null} URL completa da imagem ou null se path inválido
 *
 * @example
 * ```javascript
 * const posterUrl = tmdbImage('/abc123.jpg', 'w500');
 * // Resultado: "https://image.tmdb.org/t/p/w500/abc123.jpg"
 * ```
 */
export function tmdbImage(path, size = TMDB_CONFIG.images.sizes.POSTER) {
  if (!path || typeof path !== 'string') {
    logger.debug('tmdbImage: path inválido ou não fornecido');
    return null;
  }

  // Se já é uma URL completa, retorna como está
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const imageUrl = `${TMDB_CONFIG.images.baseUrl}/${size}${cleanPath}`;

  logger.debug('URL de imagem gerada', { path, size, result: imageUrl });

  return imageUrl;
}

/**
 * Gera URL de poster do filme
 *
 * @param {string} path - Caminho do poster
 * @returns {string|null} URL do poster ou null
 *
 * @example
 * ```javascript
 * const poster = posterImage(movie.poster_path);
 * ```
 */
export function posterImage(path) {
  return tmdbImage(path, TMDB_CONFIG.images.sizes.POSTER);
}

/**
 * Gera URL de backdrop do filme
 *
 * @param {string} path - Caminho do backdrop
 * @returns {string|null} URL do backdrop ou null
 *
 * @example
 * ```javascript
 * const backdrop = backdropImage(movie.backdrop_path);
 * ```
 */
export function backdropImage(path) {
  return tmdbImage(path, TMDB_CONFIG.images.sizes.BACKDROP);
}

/**
 * Gera URL de perfil (para atores/diretores)
 *
 * @param {string} path - Caminho do perfil
 * @returns {string|null} URL do perfil ou null
 */
export function profileImage(path) {
  return tmdbImage(path, TMDB_CONFIG.images.sizes.PROFILE);
}

/**
 * Gera URL de logo
 *
 * @param {string} path - Caminho do logo
 * @returns {string|null} URL do logo ou null
 */
export function logoImage(path) {
  return tmdbImage(path, TMDB_CONFIG.images.sizes.LOGO);
}

/**
 * Prefetch detalhes de um filme com cache inteligente
 *
 * @param {number|string} id - ID do filme
 * @returns {Promise<Object|null>} Promise com detalhes do filme ou null
 *
 * @example
 * ```javascript
 * const details = await prefetchMovieDetails(123);
 * if (details) {
 *   console.log('Filme já em cache:', details.title);
 * }
 * ```
 */
export async function prefetchMovieDetails(id) {
  // Aceitamos 0 como inválido, mas só tratamos como "não fornecido" quando for undefined/null/''
  if (id === undefined || id === null || id === '') {
    logger.warn('prefetchMovieDetails: ID não fornecido');
    return null;
  }

  const numericId = Number(id);
  if (isNaN(numericId) || numericId <= 0) {
    logger.warn('prefetchMovieDetails: ID inválido', { id });
    return null;
  }

  const cacheKey = `details_${numericId}`;

  // Verificar cache primeiro
  const cached = DETAILS_CACHE.get(cacheKey);
  if (cached) {
    logger.debug('Cache hit para detalhes do filme', { id: numericId });
    return cached;
  }

  try {
    logger.debug('Prefetching detalhes do filme', { id: numericId });

    const promise = getMovieDetails(numericId)
      .then((details) => {
        DETAILS_CACHE.set(cacheKey, details);
        logger.debug('Detalhes do filme salvos no cache', { id: numericId });
        return details;
      })
      .catch((err) => {
        // Em caso de erro na fetch, remover do cache e retornar null conforme contrato de prefetch
        logger.error('Erro no prefetch de detalhes do filme (promise)', err, { id: numericId });
        DETAILS_CACHE.delete(cacheKey);
        return null;
      });

    // Cache da promise para evitar múltiplas requisições simultâneas
    DETAILS_CACHE.set(cacheKey, promise);

    return promise;
  } catch (error) {
    logger.error('Erro no prefetch de detalhes do filme', error, { id: numericId });
    // Remove a promise rejeitada do cache
    DETAILS_CACHE.delete(cacheKey);
    return null;
  }
}

/**
 * Limpa todos os caches
 *
 * @example
 * ```javascript
 * clearAllCaches(); // Limpa todos os caches de filmes
 * ```
 */
export function clearAllCaches() {
  DETAILS_CACHE.clear();
  SEARCH_CACHE.clear();
  POPULAR_CACHE.clear();
  logger.info('Todos os caches foram limpos');
}

/**
 * Obtém estatísticas dos caches
 *
 * @returns {Object} Estatísticas de todos os caches
 *
 * @example
 * ```javascript
 * const stats = getCacheStats();
 * console.log('Cache de detalhes:', stats.details.size, '/', stats.details.maxSize);
 * ```
 */
export function getCacheStats() {
  return {
    details: DETAILS_CACHE.getStats(),
    search: SEARCH_CACHE.getStats(),
    popular: POPULAR_CACHE.getStats(),
  };
}

/**
 * Aplica timeout a uma promise
 *
 * @param {Promise} promise - Promise original
 * @param {number} ms - Timeout em milissegundos
 * @param {string} message - Mensagem de erro para timeout
 * @returns {Promise} Promise com timeout
 *
 * @example
 * ```javascript
 * const result = await withTimeout(fetchData(), 5000, 'Timeout na busca');
 * ```
 */
export function withTimeout(promise, ms = TMDB_CONFIG.api.timeout, message = 'Requisição expirou') {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

/**
 * Valida se um ID de filme é válido
 *
 * @param {any} id - ID a ser validado
 * @returns {boolean} True se o ID for válido
 *
 * @example
 * ```javascript
 * if (isValidMovieId(movieId)) {
 *   // ID válido, pode prosseguir
 * }
 * ```
 */
export function isValidMovieId(id) {
  if (!id) return false;

  const numericId = Number(id);
  return !isNaN(numericId) && numericId > 0 && Number.isInteger(numericId);
}

/**
 * Sanitiza e valida parâmetros de paginação
 *
 * @param {number} page - Página
 * @param {number} maxPage - Página máxima permitida (opcional)
 * @returns {number} Página sanitizada
 *
 * @example
 * ```javascript
 * const safePage = sanitizePage(page, 100);
 * ```
 */
export function sanitizePage(page, maxPage = null) {
  const numericPage = Number(page);

  if (isNaN(numericPage) || numericPage < 1) {
    return 1;
  }

  if (maxPage && numericPage > maxPage) {
    return maxPage;
  }

  return Math.floor(numericPage);
}
