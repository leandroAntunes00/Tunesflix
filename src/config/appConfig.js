/**
 * MELHOR PRÁTICA MODERNA (2025) - Configuração Centralizada
 *
 * Centraliza todas as constantes e configurações da aplicação
 * Evita duplicação e facilita manutenção
 *
 * MELHORIAS IMPLEMENTADAS:
 * - Constantes centralizadas
 * - Configurações organizadas por domínio
 * - Fácil manutenção e atualização
 * - Prevenção de manipulação de prototype
 */

/**
 * Configurações de rotas da aplicação
 */
export const ROUTES = {
  HOME: '/',
  FAVORITES: '/favorites',
  MOVIE_DETAIL: '/movie/:id',
};

/**
 * Configurações de navegação
 */
export const NAVIGATION_TYPES = {
  DETAIL: 'detail',
  HOME: 'home',
  FAVORITES: 'favorites',
};

/**
 * Configurações de acessibilidade
 */
export const ACCESSIBILITY = {
  ROLES: {
    MAIN: 'main',
    BANNER: 'banner',
    CONTENTINFO: 'contentinfo',
  },
  LABELS: {
    MAIN_CONTENT: 'Conteúdo principal da aplicação',
    SEARCH_SECTION: 'Busca e filtros',
    MOVIE_LIST: 'Lista de filmes',
  },
};

/**
 * Configurações de CSS classes
 */
export const CSS_CLASSES = {
  MAIN: 'tf-main',
  SEARCH_SECTION: 'tf-search-section',
  EMPTY_STATE: 'tf-empty-state',
  ERROR_STATE: 'tf-error-state',
  LOADING_STATE: 'tf-loading-state',
};

/**
 * Configurações de performance
 */
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  MAX_RETRIES: 3,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutos
};

/**
 * Configurações de API
 */
export const API_CONFIG = {
  TIMEOUT: 8000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

/**
 * Utilitários para rotas
 */
export const routeUtils = {
  /**
   * Gera URL para detalhes do filme
   * @param {string|number} movieId - ID do filme
   * @returns {string} URL completa
   */
  getMovieDetailUrl: (movieId) => {
    return `/movie/${movieId}`;
  },

  /**
   * Substitui parâmetros na rota
   * @param {string} route - Rota com parâmetros
   * @param {Object} params - Parâmetros para substituir
   * @returns {string} Rota com parâmetros substituídos
   */
  buildRoute: (route, params) => {
    let result = route;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, value);
    });
    return result;
  },
};
