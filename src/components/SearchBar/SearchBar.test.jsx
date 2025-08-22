import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, vi, expect } from 'vitest'
import SearchBar from './SearchBar'

test('SearchBar renderiza com valor padrão e chama onSearch ao submeter', async () => {
  const user = userEvent.setup()
  const onSearch = vi.fn()

  render(<SearchBar defaultValue="hello" onSearch={onSearch} />)

  const input = screen.getByPlaceholderText(/buscar filmes/i)
  expect(input).toBeInTheDocument()
  expect(input).toHaveValue('hello')

  await user.clear(input)
  await user.type(input, 'batman')
  await user.keyboard('{Enter}')

  expect(onSearch).toHaveBeenCalledWith('batman')
})

test('SearchBar chama onSearch ao clicar no botão', async () => {
  const user = userEvent.setup()
  const onSearch = vi.fn()

  render(<SearchBar defaultValue="" onSearch={onSearch} />)
  const input = screen.getByPlaceholderText(/buscar filmes/i)
  const btn = screen.getByRole('button', { name: /buscar/i })

  await user.type(input, 'matrix')
  await user.click(btn)

  expect(onSearch).toHaveBeenCalledWith('matrix')
})
