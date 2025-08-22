import React from 'react'
import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

test('Header navegação chama onNavigate', async () => {
  const user = userEvent.setup()
  const onNavigate = vi.fn()
  render(<Header onNavigate={onNavigate} active="home" />)

  await user.click(screen.getByRole('button', { name: /Favoritos/i }))
  expect(onNavigate).toHaveBeenCalledWith('favorites')
})
