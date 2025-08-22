import { useContext } from 'react'
import { FavoritesContext } from '../contexts/favoritesCore'

export function useFavorites() {
	const ctx = useContext(FavoritesContext)
	if (!ctx) {
		return {
			favorites: {},
			toggleFavorite: () => {},
			clearFavorites: () => {},
			count: 0,
		}
	}
	return ctx
}

export { FavoritesProvider } from '../contexts/FavoritesContext'
