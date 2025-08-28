import React, { useState, useRef } from 'react';
import './SearchBar.css';

export default function SearchBar({
  defaultValue = '',
  onSearch = () => {},
  placeholder = 'Buscar filmes (ex: Batman)',
}) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    onSearch(value || '');
  }

  function clear() {
    setValue('');
    inputRef.current && inputRef.current.focus();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      clear();
    }
  }

  return (
    <form className="tf-search" onSubmit={submit} role="search">
      <label htmlFor="tf-search-input" className="visually-hidden">
        Buscar filmes
      </label>

      <div className="tf-search__field">
        <span className="tf-search__icon" aria-hidden>
          {/* magnifier */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <input
          ref={inputRef}
          id="tf-search-input"
          name="q"
          className="tf-search__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Buscar filmes"
        />

        {value && (
          <button
            type="button"
            className="tf-search__clear"
            onClick={clear}
            aria-label="Limpar pesquisa"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <button type="submit" className="tf-search__btn" aria-label="Buscar">
        Buscar
      </button>
    </form>
  );
}
