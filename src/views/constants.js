// Categorias de filmes
export const MOVIE_CATEGORIES = {
  POPULAR: 'popular',
  TOP_RATED: 'top-rated',
  NOW_PLAYING: 'now-playing',
};

// Labels das categorias
export const CATEGORY_LABELS = {
  [MOVIE_CATEGORIES.POPULAR]: 'Populares',
  [MOVIE_CATEGORIES.TOP_RATED]: 'Mais Avaliados',
  [MOVIE_CATEGORIES.NOW_PLAYING]: 'Em Cartaz',
};

// Estados de carregamento
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Tamanhos de componentes
export const COMPONENT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// Função utilitária para obter rótulo da categoria
export const getCategoryLabel = (category) => {
  return CATEGORY_LABELS[category] || CATEGORY_LABELS[MOVIE_CATEGORIES.POPULAR];
};

// Configurações de acessibilidade
export const ACCESSIBILITY_CONFIG = {
  ARIA_LIVE_POLITE: 'polite',
  ARIA_LIVE_ASSERTIVE: 'assertive',
  ROLE_STATUS: 'status',
  ROLE_ALERT: 'alert',
  ROLE_IMG: 'img',
};

// Configurações de performance
export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  MAX_RETRIES: 3,
};
