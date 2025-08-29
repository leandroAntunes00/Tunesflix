import React from 'react';
import './MovieInfo.css';

export default function MovieInfo({ movie }) {
  if (!movie) return null;

  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return '—';
    return genres.map((genre) => genre.name).join(', ');
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return '—';
    return `${runtime} min`;
  };

  const formatRating = (rating) => {
    if (!rating) return '—';
    return `${rating} / 10`;
  };

  return (
    <div className="tf-movie-info">
      {movie.overview && <p className="tf-movie-info__overview">{movie.overview}</p>}

      <div className="tf-movie-info__details">
        <div className="tf-movie-info__item">
          <span className="tf-movie-info__label">Gêneros:</span>
          <span className="tf-movie-info__value">{formatGenres(movie.genres)}</span>
        </div>

        <div className="tf-movie-info__item">
          <span className="tf-movie-info__label">Duração:</span>
          <span className="tf-movie-info__value">{formatRuntime(movie.runtime)}</span>
        </div>

        <div className="tf-movie-info__item">
          <span className="tf-movie-info__label">Avaliação:</span>
          <span className="tf-movie-info__value">{formatRating(movie.vote_average)}</span>
        </div>
      </div>
    </div>
  );
}
