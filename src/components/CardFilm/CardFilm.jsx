import React, { useState, useRef, useEffect } from 'react';
import { tmdbImage } from '../../services/tmdb';
import './CardFilm.css';

/**
 * Componente CardFilm - Exibe informações de um filme/série em formato de cartão
 *
 * @param {Object} film - Objeto com dados do filme/série
 * @param {Function} onDetails - Callback para abrir detalhes
 * @param {Function} onToggleFavorite - Callback para alternar favorito
 * @param {boolean} isFavorite - Se o item está nos favoritos
 * @param {Function} onNavigate - Callback para navegação (opcional)
 */
export default function CardFilm({
  film = {},
  onDetails,
  onToggleFavorite,
  isFavorite = false,
  onNavigate,
}) {
  // Extração e processamento dos dados do filme
  const title = film.title || film.name || 'Sem título';
  const releaseDate = film.release_date || film.first_air_date || '';
  const year = releaseDate ? new Date(releaseDate).getFullYear().toString() : '';

  // Processamento do poster
  const posterPath = film.poster_path || film.poster || film.posterPath || '';
  const posterSrc = posterPath ? tmdbImage(posterPath, 'w342') : null;

  // Estados para controle da imagem
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showPoster = Boolean(posterSrc) && !imgError;

  // Estado e ref para lazy loading
  const [isVisible, setIsVisible] = useState(false);
  const elRef = useRef(null);

  // Lazy loading com IntersectionObserver
  useEffect(() => {
    const node = elRef.current;
    if (!node) return;

    // Suporte para ambientes de teste onde IntersectionObserver pode não existir
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.16 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Processamento da avaliação
  const rating = film.vote_average ? Number(film.vote_average).toFixed(1) : null;

  // Handlers para interações
  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate('detail', film);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (onNavigate) {
        onNavigate('detail', film);
      } else if (onDetails) {
        onDetails(film);
      }
    }
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    onDetails && onDetails(film);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite && onToggleFavorite(film);
  };

  return (
    <article
      ref={elRef}
      className={`tf-card tf-card--vertical ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby={`title-${film.id}`}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
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
            onClick={handleDetailsClick}
            aria-label={`Ver detalhes de ${title}`}
          >
            Detalhes
          </button>

          <button
            className={`tf-btn tf-btn--ghost ${isFavorite ? 'is-fav' : ''}`}
            onClick={handleFavoriteClick}
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
