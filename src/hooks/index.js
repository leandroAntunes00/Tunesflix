/**
 * Índice de hooks customizados da aplicação
 *
 * Centraliza todas as exportações de hooks para facilitar importações
 * e manter consistência na estrutura do projeto.
 */

// Hooks de estado da aplicação
export { useFavorites } from './useFavorites';
export { useMovies } from './useMovies';
export { useMovieDetails } from './useMovieDetails';
export { useMovieSearch } from './useMovieSearch';
export { useNowPlayingMovies } from './useNowPlayingMovies';
export { usePopularMovies } from './usePopularMovies';
export { useTopRatedMovies } from './useTopRatedMovies';

// Hooks de UI e interações
export { useMovieDetailsModal } from './useMovieDetailsModal';
export { useNavigation } from './useNavigation';

// Re-export do provider de favoritos (conveniência)
export { FavoritesProvider } from '../contexts/FavoritesContext';
