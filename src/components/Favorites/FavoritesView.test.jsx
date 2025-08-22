import React from 'react'
import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import FavoritesView from './FavoritesView'

const favoritesMap = {
  5: { id: 5, title: 'Fav Movie 5', poster_path: null, release_date: '2019-01-01' },
  6: { id: 6, title: 'Fav Movie 6', poster_path: null, release_date: '2020-01-01' },
}

test('FavoritesView mostra favoritos sem buscar', async () => {
  render(<FavoritesView favorites={favoritesMap} onToggleFavorite={() => {}} />)
  expect(screen.getByText('Fav Movie 5')).toBeInTheDocument()
  expect(screen.getByText('Fav Movie 6')).toBeInTheDocument()
})
