export const ROUTES = {
  HOME: '/',
  FAVORITES: '/favorites',
  MOVIE_DETAIL: '/movie/:id',
};

export const NAVIGATION_TYPES = {
  DETAIL: 'detail',
  HOME: 'home',
  FAVORITES: 'favorites',
};

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

export const CSS_CLASSES = {
  MAIN: 'tf-main',
  SEARCH_SECTION: 'tf-search-section',
  EMPTY_STATE: 'tf-empty-state',
  ERROR_STATE: 'tf-error-state',
  LOADING_STATE: 'tf-loading-state',
};

export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  MAX_RETRIES: 3,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutos
};

export const API_CONFIG = {
  TIMEOUT: 8000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const routeUtils = {
  getMovieDetailUrl: (movieId) => {
    return `/movie/${movieId}`;
  },

  buildRoute: (route, params) => {
    let result = route;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, value);
    });
    return result;
  },
};
