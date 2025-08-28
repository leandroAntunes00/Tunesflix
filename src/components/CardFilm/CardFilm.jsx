import React, { useState, useRef, useEffect } from 'react';
import { tmdbImage } from '../../services/tmdb';
import './CardFilm.css';

// Props:
// - film: object with { id, title, name, release_date, first_air_date, poster_path }
// - onDetails(film)
// - onToggleFavorite(film)
// - isFavorite: boolean
// Props:
// - film: object with { id, title, name, release_date, first_air_date, poster_path }
// - onDetails(film)
// - onToggleFavorite(film)
// - isFavorite: boolean
// - onNavigate(type, film)
export default function CardFilm({ film = {}, onDetails, onToggleFavorite, isFavorite = false, onNavigate }) {
  const title = film.title || film.name || 'Sem título';
  const date = film.release_date || film.first_air_date || '';
  let year = '';
  if (date) {
    const m = String(date).match(/^(\d{4})/);
    year = m ? m[1] : String(new Date(date).getFullYear());
  }

  // suporte a caminho do TMDB ou URL completo
  const posterPath = film.poster_path || film.poster || film.posterPath || '';
  const posterSrc = posterPath ? tmdbImage(posterPath, 'w342') : null;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showPoster = Boolean(posterSrc) && !imgError;
  const [isVisible, setIsVisible] = useState(false);
  const elRef = useRef(null);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;
    // Em ambientes de teste (JSDOM) IntersectionObserver pode não existir.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.16 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const rating = film.vote_average ? Number(film.vote_average).toFixed(1) : null;

  return (
    <article
      ref={elRef}
      className={`tf-card tf-card--vertical ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby={`title-${film.id}`}
      tabIndex={0}
      onClick={() => {
        if (onNavigate) onNavigate('detail', film);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (onNavigate) onNavigate('detail', film);
          else onDetails && onDetails(film);
        }
      }}
    >
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
        <p className="tf-card__meta">{film.overview || ''}</p>

        <div className="tf-card__actions">
          <button
            className="tf-btn tf-btn--primary"
            onClick={(e) => {
              e.stopPropagation();
              onDetails && onDetails(film);
            }}
            aria-label={`Ver detalhes de ${title}`}
          >
            Detalhes
          </button>

          <button
            className={`tf-btn tf-btn--ghost ${isFavorite ? 'is-fav' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite && onToggleFavorite(film);
            }}
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
