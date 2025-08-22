import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, vi, expect } from 'vitest'
import MovieModal from './MovieModal'

const details = {
  id: 1,
  title: 'My Movie',
  release_date: '2020-01-01',
  overview: 'A movie overview',
  poster_path: null,
  credits: { crew: [{ job: 'Director', name: 'Dir Name' }], cast: [{ name: 'Actor 1' }, { name: 'Actor 2' }] },
}

test('MovieModal mostra detalhes e fecha', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  render(<MovieModal open={true} onClose={onClose} loading={false} details={details} error={null} />)

  expect(screen.getByText('My Movie')).toBeInTheDocument()
  expect(screen.getByText('A movie overview')).toBeInTheDocument()
  expect(screen.getByText(/Dir Name/)).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /fechar/i }))
  expect(onClose).toHaveBeenCalled()
})
