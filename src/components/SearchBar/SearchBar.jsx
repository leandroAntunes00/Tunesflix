import React, { memo, useState, useRef, useCallback } from 'react';
import './SearchBar.css';
import { ACCESSIBILITY } from '../../config/appConfig';

const SearchBar = memo(
  ({ defaultValue = '', onSearch = () => {}, placeholder = 'Buscar filmes (ex: Batman)' }) => {
    const [value, setValue] = useState(defaultValue);
    const inputRef = useRef(null);

    // Handler memoizado para submissão do formulário
    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();
        const trimmedValue = value.trim();
        if (trimmedValue) {
          onSearch(trimmedValue);
        }
      },
      [value, onSearch]
    );

    // Handler memoizado para limpar o campo
    const handleClear = useCallback(() => {
      setValue('');
      inputRef.current?.focus();
    }, []);

    // Handler memoizado para teclas especiais
    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === 'Escape') {
          handleClear();
        }
      },
      [handleClear]
    );

    // Handler memoizado para mudança no input
    const handleInputChange = useCallback((e) => {
      setValue(e.target.value);
    }, []);

    return (
      <form
        className="tf-search"
        onSubmit={handleSubmit}
        role={ACCESSIBILITY.ROLES.SEARCH}
        aria-label="Formulário de busca de filmes"
      >
        <label htmlFor="tf-search-input" className="visually-hidden">
          Buscar filmes
        </label>

        <div className="tf-search__field">
          {/* Ícone de lupa */}
          <span className="tf-search__icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Ícone de busca"
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

          {/* Campo de entrada */}
          <input
            ref={inputRef}
            id="tf-search-input"
            name="q"
            className="tf-search__input"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            aria-label="Campo de busca de filmes"
            type="search"
            maxLength="100"
          />

          {/* Botão de limpar - só aparece quando há valor */}
          {value && (
            <button
              type="button"
              className="tf-search__clear"
              onClick={handleClear}
              aria-label="Limpar campo de pesquisa"
              title="Limpar pesquisa"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                aria-label="Ícone de limpar"
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

        {/* Botão de buscar */}
        <button
          type="submit"
          className="tf-search__btn"
          aria-label="Executar busca"
          disabled={!value.trim()}
        >
          Buscar
        </button>
      </form>
    );
  }
);

// Nome de exibição para debugging
SearchBar.displayName = 'SearchBar';

export default SearchBar;
