import CardList from '../CardList/CardList'

// favorites: object map id -> movie (cached summary)
export default function FavoritesView({ favorites = {}, onToggleFavorite }) {
  const movies = Object.values(favorites || {})

  if (!movies || movies.length === 0) return <div>Nenhum favorito ainda</div>

  return <CardList items={movies} onToggleFavorite={onToggleFavorite} favorites={new Set(movies.map(m=>m.id))} />
}
