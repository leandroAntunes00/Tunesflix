import React, { useState } from 'react'
import './SearchBar.css'

export default function SearchBar({ defaultValue = '', onSearch = () => {}, placeholder = 'Buscar filmes (ex: Batman)' }) {
  const [value, setValue] = useState(defaultValue)

  return (
    <form
      className="tf-search"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(value || '')
      }}
    >
      <label htmlFor="tf-search-input" className="visually-hidden">Buscar filmes</label>
      <input
        id="tf-search-input"
        name="q"
        className="tf-search__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button type="submit" className="tf-search__btn">Buscar</button>
    </form>
  )
}
