import React from 'react';
import { posterImage } from '../../services/tmdb';
import './MoviePoster.css';

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
