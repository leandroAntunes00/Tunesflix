import React, { useEffect } from 'react';
import './MovieModal.css';

export default function MovieModal({ open, onClose, loading, details, error }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="tf-modal__backdrop" onClick={onClose} role="presentation">
      <div
        className={`tf-modal ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="tf-modal__close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        {loading && <div className="tf-modal__loading">Carregando...</div>}
        {error && <div className="tf-modal__error">Erro: {error.message}</div>}

        {details && (
          <div className="tf-modal__content">
            <div className="tf-modal__header">
              <h2>{details.title || details.name}</h2>
              {details.tagline && <p className="tf-modal__tagline">"{details.tagline}"</p>}
              <div className="tf-modal__meta">
                {details.release_date ? new Date(details.release_date).getFullYear() : ''} •{' '}
                {details.runtime ? details.runtime + ' min' : ''}
              </div>
            </div>

            <div className="tf-modal__body">
              <div className="tf-modal__poster">
                {details.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w342${details.poster_path}`} alt="poster" />
                ) : (
                  <div className="tf-card__placeholder">Sem imagem</div>
                )}
              </div>

              <div className="tf-modal__info">
                <p className="tf-modal__overview">{details.overview}</p>

                {details.genres && details.genres.length > 0 && (
                  <p>
                    <strong>Gêneros:</strong> {details.genres.map((g) => g.name).join(', ')}
                  </p>
                )}

                {details.production_companies && details.production_companies.length > 0 && (
                  <p>
                    <strong>Produção:</strong>{' '}
                    {details.production_companies.map((c) => c.name).join(', ')}
                  </p>
                )}

                <p>
                  <strong>Avaliação:</strong>{' '}
                  {details.vote_average ? `${details.vote_average} / 10` : '—'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
