import React from 'react';
import { posterImage } from '../../services/tmdb';
import './MoviePoster.css';

/**
 * Componente MoviePoster - Exibe o poster do filme
 *
 * Responsável por renderizar o poster do filme com fallback
 * para quando não há imagem disponível.
 *
 * @param {Object} movie - Dados do filme
 * @param {string} movie.poster_path - Caminho do poster
 * @param {string} movie.title - Título do filme (para alt text)
 * @param {string} movie.name - Nome alternativo do filme
 */
export default function MoviePoster({ movie }) {
  if (!movie) return null;

  const title = movie.title || movie.name || 'Poster do filme';
  const hasPoster = movie.poster_path;

  return (
    <aside className="tf-movie-poster">
      {hasPoster ? (
        <div className="tf-movie-poster__container">
          <div className="tf-movie-poster__glow"></div>
          <img
            src={posterImage(movie.poster_path)}
            alt={`Poster de ${title}`}
            className="tf-movie-poster__image"
          />
        </div>
      ) : (
        <div className="tf-movie-poster__placeholder">
          <span>Sem imagem</span>
        </div>
      )}
    </aside>
  );
}
