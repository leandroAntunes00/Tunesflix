import React from 'react';
import './CardList.css';

/**
 * Componente SkeletonCard - Placeholder animado para loading
 * Simula a estrutura do CardFilm durante o carregamento
 */
export default function SkeletonCard() {
  return (
    <article className="tf-card tf-card--skeleton" aria-hidden>
      <figure className="tf-card__figure">
        <div className="tf-card__poster tf-skeleton" />
      </figure>
      <div className="tf-card__body">
        <h3 className="tf-card__title tf-skeleton" />
        <p className="tf-card__meta tf-skeleton" />
        <div className="tf-card__actions">
          <span className="tf-btn tf-skeleton small" />
          <span className="tf-btn tf-skeleton small" />
        </div>
      </div>
    </article>
  );
}
