import { createContext } from 'react';

export const FAVORITES_KEY = 'tunesflix:favorites-v2';

export const FavoritesContext = createContext(null);

/**
 * Carrega os favoritos do localStorage
 *
 * @returns {Object} Objeto com os filmes favoritos ou objeto vazio se erro
 */
export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return {};

    const obj = JSON.parse(raw);

    // Validação básica da estrutura
    if (typeof obj !== 'object' || obj === null) {
      console.warn('Dados de favoritos inválidos, retornando vazio');
      return {};
    }

    return obj;
  } catch (error) {
    console.warn('Erro ao carregar favoritos:', error);
    return {};
  }
}

/**
 * Salva os favoritos no localStorage
 *
 * @param {Object} obj - Objeto com os filmes favoritos
 */
export function saveFavorites(obj) {
  try {
    if (typeof obj !== 'object' || obj === null) {
      console.warn('Tentativa de salvar dados inválidos para favoritos');
      return;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(obj));
  } catch (error) {
    console.warn('Erro ao salvar favoritos:', error);
    // Não lança erro para não quebrar a aplicação
  }
}

/**
 * Valida se um filme tem os campos mínimos necessários
 *
 * @param {Object} film - Objeto do filme
 * @returns {boolean} True se válido
 */
export function validateFilm(film) {
  return (
    film && typeof film === 'object' && typeof film.id !== 'undefined' && (film.title || film.name)
  );
}

/**
 * Normaliza os dados de um filme para o formato de favorito
 *
 * @param {Object} film - Objeto do filme original
 * @returns {Object} Filme normalizado para favorito
 */
export function normalizeFavoriteFilm(film) {
  if (!validateFilm(film)) {
    throw new Error('Filme inválido para adicionar aos favoritos');
  }

  return {
    id: film.id,
    title: film.title || film.name || 'Título não disponível',
    poster_path: film.poster_path || film.poster || null,
    release_date: film.release_date || film.first_air_date || null,
    overview: film.overview || film.description || null,
    vote_average: film.vote_average || null,
    genre_ids: film.genre_ids || [],
  };
}
