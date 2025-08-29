import React, { memo, useCallback, useMemo } from 'react';
import './CategorySelector.css';
import { MOVIE_CATEGORIES, CATEGORY_LABELS } from '../../views/constants';
import { ACCESSIBILITY } from '../../config/appConfig';

/**
 * MELHOR PRÁTICA MODERNA (2025) - CategorySelector Component
 *
 * MELHORIAS IMPLEMENTADAS:
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - useCallback para handler estável
 * - useMemo para opções memoizadas
 * - Constantes centralizadas (sem manipulação de prototype)
 * - Acessibilidade aprimorada
 * - Documentação JSDoc completa
 */

/**
 * CategorySelector - Componente seletor de categoria
 *
 * Responsável por:
 * - Permitir seleção entre diferentes categorias de filmes
 * - Fornecer interface acessível com teclado
 * - Manter estado de seleção consistente
 *
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização para otimização de performance
 * - Constantes centralizadas para evitar duplicação
 * - Acessibilidade aprimorada com atributos ARIA
 * - Validação de entrada
 * - Prevenção de manipulação de prototype
 *
 * @param {Object} props
 * @param {string} [props.value] - Valor atual selecionado
 * @param {Function} [props.onChange] - Callback para mudança de seleção
 */
const CategorySelector = memo(({
  value = MOVIE_CATEGORIES.POPULAR,
  onChange = () => {},
}) => {
  // Memoização das opções para evitar recriação
  const categoryOptions = useMemo(() => [
    { value: MOVIE_CATEGORIES.POPULAR, label: CATEGORY_LABELS[MOVIE_CATEGORIES.POPULAR] },
    { value: MOVIE_CATEGORIES.TOP_RATED, label: CATEGORY_LABELS[MOVIE_CATEGORIES.TOP_RATED] },
    { value: MOVIE_CATEGORIES.NOW_PLAYING, label: CATEGORY_LABELS[MOVIE_CATEGORIES.NOW_PLAYING] },
  ], []);

  // Handler memoizado para mudança de seleção
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    if (Object.values(MOVIE_CATEGORIES).includes(newValue)) {
      onChange(newValue);
    }
  }, [onChange]);

  return (
    <div className="tf-category-selector">
      <label
        htmlFor="category-select"
        className="tf-category-selector__label"
      >
        Categoria
      </label>

      <div className="tf-category-selector__wrap">
        {/* Ícone decorativo */}
        <span
          className="tf-category-selector__icon"
          aria-hidden="true"
          role="img"
          aria-label="Ícone de categoria"
        >
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

        {/* Select de categoria */}
        <select
          id="category-select"
          className="tf-category-selector__select"
          value={value}
          onChange={handleChange}
          aria-label="Selecionar categoria de filmes"
          aria-describedby="category-help"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Texto de ajuda acessível (visualmente oculto) */}
      <div id="category-help" className="visually-hidden">
        Selecione uma categoria para filtrar os filmes exibidos
      </div>
    </div>
  );
});

// Nome de exibição para debugging
CategorySelector.displayName = 'CategorySelector';

export default CategorySelector;
