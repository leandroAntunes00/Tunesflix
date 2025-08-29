import React, { useState, useRef } from 'react';
import './SearchBar.css';

/**
 * Componente SearchBar - Barra de pesquisa para filmes
 * Permite buscar filmes com funcionalidades de limpar e submeter
 *
 * @param {string} defaultValue - Valor inicial do campo de busca
 * @param {Function} onSearch - Callback chamado ao pesquisar
 * @param {string} placeholder - Placeholder do campo de entrada
 */
export default function SearchBar({
  defaultValue = '',
  onSearch = () => {},
  placeholder = 'Buscar filmes (ex: Batman)',
}) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);

  // Handler para submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  // Handler para limpar o campo de busca
  const handleClear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  // Handler para teclas especiais
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  // Handler para mudança no input
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="tf-search" onSubmit={handleSubmit} role="search">
      <label htmlFor="tf-search-input" className="visually-hidden">
        Buscar filmes
      </label>

      <div className="tf-search__field">
        {/* Ícone de lupa */}
        <span className="tf-search__icon" aria-hidden>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
          aria-label="Buscar filmes"
          type="search"
        />

        {/* Botão de limpar - só aparece quando há valor */}
        {value && (
          <button
            type="button"
            className="tf-search__clear"
            onClick={handleClear}
            aria-label="Limpar pesquisa"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
      <button type="submit" className="tf-search__btn" aria-label="Buscar">
        Buscar
      </button>
    </form>
  );
}
