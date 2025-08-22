import React from 'react'
import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardList from './CardList'

const films = [
  { id: 1, title: 'Filme A', release_date: '2020-05-01' },
  { id: 2, title: 'Filme B', release_date: '2019-07-12' },
]

test('CardList renderiza itens e repassa handlers', async () => {
  const user = userEvent.setup()
  const onDetails = vi.fn()
  const onToggleFavorite = vi.fn()

  render(
    <CardList items={films} onDetails={onDetails} onToggleFavorite={onToggleFavorite} favorites={new Set([2])} />
  )

  // deve mostrar os títulos
  expect(screen.getByText('Filme A')).toBeInTheDocument()
  expect(screen.getByText('Filme B')).toBeInTheDocument()

  // clicar em detalhes do primeiro item
  await user.click(screen.getAllByRole('button', { name: /detalhes/i })[0])
  expect(onDetails).toHaveBeenCalled()

  // clicar em favoritar do segundo item (já favorito)
  await user.click(screen.getAllByRole('button', { name: /favoritar|favorito/i })[1])
  expect(onToggleFavorite).toHaveBeenCalled()
})
