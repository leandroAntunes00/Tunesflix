import React from 'react';
import './CategorySelector.css';

export default function CategorySelector({ value = 'popular', onChange = () => {} }) {
  return (
    <div className="tf-category-selector">
      <label htmlFor="category-select" className="tf-category-selector__label">
        Categoria
      </label>

      <div className="tf-category-selector__wrap">
        <span className="tf-category-selector__icon" aria-hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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

        <select
          id="category-select"
          className="tf-category-selector__select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Selecionar categoria de filmes"
        >
          <option value="popular">Populares</option>
          <option value="top-rated">Mais Avaliados</option>
          <option value="now-playing">Em Cartaz</option>
        </select>
      </div>
    </div>
  );
}
