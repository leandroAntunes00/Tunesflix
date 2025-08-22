import React from 'react'
import CardFilm from '../CardFilm/CardFilm'
import './CardList.css'

// Props:
// - items: array of film objects
// - onDetails(film)
// - onToggleFavorite(film)
// - favorites: Set or Map of favorite ids
export default function CardList({ items = [], onDetails, onToggleFavorite, favorites = new Set() }) {
  if (!items || items.length === 0) {
    return <div className="tf-empty">Nenhum resultado</div>
  }

  return (
    <section className="tf-list" aria-live="polite">
      {items.map((item) => (
        <CardFilm
          key={item.id}
          film={item}
          onDetails={onDetails}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.has ? favorites.has(item.id) : Boolean(favorites[item.id])}
        />
      ))}
    </section>
  )
}
