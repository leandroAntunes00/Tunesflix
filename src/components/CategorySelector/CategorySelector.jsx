import React from 'react';
import './CategorySelector.css';

/**
 * Componente CategorySelector - Seletor de categoria de filmes
 * Permite ao usuário escolher entre diferentes categorias de filmes
 *
 * @param {string} value - Valor atual selecionado
 * @param {Function} onChange - Callback chamado quando a seleção muda
 */
export default function CategorySelector({ value = 'popular', onChange = () => {} }) {
  // Opções disponíveis para seleção
  const categoryOptions = [
    { value: 'popular', label: 'Populares' },
    { value: 'top-rated', label: 'Mais Avaliados' },
    { value: 'now-playing', label: 'Em Cartaz' },
  ];

  // Handler para mudança de seleção
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="tf-category-selector">
      <label htmlFor="category-select" className="tf-category-selector__label">
        Categoria
      </label>

      <div className="tf-category-selector__wrap">
        {/* Ícone decorativo */}
        <span className="tf-category-selector__icon" aria-hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 6h18M3 12h12M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Select de categoria */}
        <select
          id="category-select"
          className="tf-category-selector__select"
          value={value}
          onChange={handleChange}
          aria-label="Selecionar categoria de filmes"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
