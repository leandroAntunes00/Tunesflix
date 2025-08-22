import { createContext } from 'react'

export const FAVORITES_KEY = 'tunesflix:favorites-v2'

export const FavoritesContext = createContext(null)

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return {}
    const obj = JSON.parse(raw)
    return obj || {}
  } catch {
    return {}
  }
}

export function saveFavorites(obj) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(obj))
  } catch {
    // ignore
  }
}
