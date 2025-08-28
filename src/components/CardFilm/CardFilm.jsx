import React, { useState } from 'react';
import './CardFilm.css';

// Props:
// - film: object with { id, title, name, release_date, first_air_date, poster_path }
// - onDetails(film)
// - onToggleFavorite(film)
// - isFavorite: boolean
export default function CardFilm({ film = {}, onDetails, onToggleFavorite, isFavorite = false }) {
  const title = film.title || film.name || 'Sem título';
  const date = film.release_date || film.first_air_date || '';
  let year = '';
  if (date) {
    const m = String(date).match(/^(\d{4})/);
    year = m ? m[1] : String(new Date(date).getFullYear());
  }

  // suporte a caminho do TMDB ou URL completo
  const posterPath = film.poster_path || film.poster || film.posterPath || '';
  const posterSrc = posterPath
    ? posterPath.startsWith('http')
      ? posterPath
      : `https://image.tmdb.org/t/p/w342${posterPath}`
    : null;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showPoster = Boolean(posterSrc) && !imgError;

  const rating = film.vote_average ? Number(film.vote_average).toFixed(1) : null;

  return (
    <article className="tf-card tf-card--vertical" aria-labelledby={`title-${film.id}`}>
      <figure className="tf-card__figure">
        {showPoster ? (
          <img
            src={posterSrc}
            alt={`${title} poster`}
            className={`tf-card__poster ${!imgLoaded ? 'loading' : 'loaded'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="tf-card__placeholder" aria-hidden>
            Sem imagem
          </div>
        )}

        <div className="tf-card__overlay">
          {rating && <span className="tf-badge">{rating}</span>}
          {year && <span className="tf-year">{year}</span>}
        </div>
      </figure>

      <div className="tf-card__body">
        <h3 id={`title-${film.id}`} className="tf-card__title">
          {title}
        </h3>
        <p className="tf-card__meta">
          {film.overview
            ? `${film.overview.slice(0, 110)}${film.overview.length > 110 ? '…' : ''}`
            : ''}
        </p>

        <div className="tf-card__actions">
          <button
            className="tf-btn tf-btn--primary"
            onClick={() => onDetails && onDetails(film)}
            aria-label={`Ver detalhes de ${title}`}
          >
            Detalhes
          </button>

          <button
            className={`tf-btn tf-btn--ghost ${isFavorite ? 'is-fav' : ''}`}
            onClick={() => onToggleFavorite && onToggleFavorite(film)}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? `Remover ${title} dos favoritos` : `Adicionar ${title} aos favoritos`
            }
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
      </div>
    </article>
  );
}
