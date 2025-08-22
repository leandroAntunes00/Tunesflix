import React from 'react'
import './CardFilm.css'

// Props:
// - film: object with { id, title, name, release_date, first_air_date, poster_path }
// - onDetails(film)
// - onToggleFavorite(film)
// - isFavorite: boolean
export default function CardFilm({ film = {}, onDetails, onToggleFavorite, isFavorite = false }) {
  const title = film.title || film.name || 'Sem título'
  const date = film.release_date || film.first_air_date || ''
  let year = ''
  if (date) {
    const m = String(date).match(/^(\d{4})/)
    year = m ? m[1] : String(new Date(date).getFullYear())
  }

  // suporte a caminho do TMDB ou URL completo
  const posterPath = film.poster_path || film.poster || film.posterPath || ''
  const posterSrc = posterPath
    ? posterPath.startsWith('http')
      ? posterPath
      : `https://image.tmdb.org/t/p/w342${posterPath}`
    : null

  return (
    <article className="tf-card">
      <div className="tf-card__media">
        {posterSrc ? (
          <img src={posterSrc} alt={`${title} poster`} className="tf-card__poster" />
        ) : (
          <div className="tf-card__placeholder" aria-hidden>
            Sem imagem
          </div>
        )}
      </div>

      <div className="tf-card__body">
        <h3 className="tf-card__title">{title}</h3>
        <p className="tf-card__meta">{year}</p>

        <div className="tf-card__actions">
          <button className="tf-btn tf-btn--primary" onClick={() => onDetails && onDetails(film)} aria-label={`Ver detalhes de ${title}`}>
            Detalhes
          </button>

          <button
            className={`tf-btn tf-btn--ghost ${isFavorite ? 'is-fav' : ''}`}
            onClick={() => onToggleFavorite && onToggleFavorite(film)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Remover ${title} dos favoritos` : `Adicionar ${title} aos favoritos`}
          >
            {isFavorite ? '★ Favorito' : '☆ Favoritar'}
          </button>
        </div>
      </div>
    </article>
  )
}
