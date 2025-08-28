import React from 'react';
import './CardList.css';

export default function SkeletonCard() {
  return (
    <article className="tf-card tf-card--skeleton" aria-hidden>
      <div className="tf-card__media">
        <div className="tf-card__poster tf-skeleton" />
      </div>
      <div className="tf-card__body">
        <h3 className="tf-card__title tf-skeleton short" />
        <p className="tf-card__meta tf-skeleton short" />
        <div className="tf-card__actions">
          <span className="tf-btn tf-skeleton small" />
          <span className="tf-btn tf-skeleton small" />
        </div>
      </div>
    </article>
  );
}
