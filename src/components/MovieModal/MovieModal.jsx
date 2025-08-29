import React, { useEffect, useRef } from 'react';
import './MovieModal.css';
import { posterImage } from '../../services/tmdb';

/**
 * Componente MovieModal - Modal para exibir detalhes completos de um filme
 * Modal acessível com suporte a teclado, focus trap e navegação por leitores de tela
 *
 * @param {boolean} open - Controla se o modal está aberto
 * @param {Function} onClose - Callback chamado quando o modal deve ser fechado
 * @param {boolean} loading - Indica se os dados estão sendo carregados
 * @param {Object} details - Dados detalhados do filme
 * @param {Error} error - Objeto de erro caso ocorra falha no carregamento
 */
export default function MovieModal({ open, onClose, loading, details, error }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Efeitos para controle do modal
  useEffect(() => {
    if (!open) return;

    // Handler para tecla Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Handler para tecla Tab (focus trap)
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    // Previne scroll do body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Adiciona event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleTabKey);

    // Foca no botão de fechar quando o modal abre
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  // Não renderiza se não estiver aberto
  if (!open) return null;

  // Handler para clique no backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handler para clique no modal (prevenir propagação)
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="tf-modal__backdrop"
      onClick={handleBackdropClick}
      role="presentation"
      aria-hidden={!open}
    >
      <div
        ref={modalRef}
        className={`tf-modal ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        aria-describedby="movie-modal-content"
        onClick={handleModalClick}
      >
        <button
          ref={closeButtonRef}
          className="tf-modal__close"
          onClick={onClose}
          aria-label="Fechar modal de detalhes do filme"
          type="button"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Fechar</span>
        </button>

        {loading && (
          <div className="tf-modal__loading" role="status" aria-live="polite">
            <span className="sr-only">Carregando detalhes do filme...</span>
            Carregando...
          </div>
        )}

        {error && (
          <div className="tf-modal__error" role="alert" aria-live="assertive">
            <span className="sr-only">Erro ao carregar detalhes do filme:</span>
            Erro: {error.message}
          </div>
        )}

        {details && (
          <div id="movie-modal-content" className="tf-modal__content" data-testid="movie-modal-content">
            <header className="tf-modal__header">
              <h2 id="movie-modal-title" className="tf-modal__title">
                {details.title || details.name || 'Título não disponível'}
              </h2>
              {details.tagline && (
                <p className="tf-modal__tagline" aria-label={`Tagline: ${details.tagline}`}>
                  "{details.tagline}"
                </p>
              )}
              <div className="tf-modal__meta" aria-label="Informações do filme">
                {details.release_date && (
                  <span>{new Date(details.release_date).getFullYear()}</span>
                )}
                {details.runtime && (
                  <span>{details.runtime} min</span>
                )}
                {details.release_date && details.runtime && <span>•</span>}
              </div>
            </header>

            <div className="tf-modal__body">
              <figure className="tf-modal__poster">
                {details.poster_path ? (
                  <img
                    src={posterImage(details.poster_path)}
                    alt={`Poster do filme ${details.title || details.name || 'sem título'}`}
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="tf-modal__placeholder"
                    role="img"
                    aria-label="Imagem do poster não disponível"
                  >
                    Sem imagem
                  </div>
                )}
              </figure>

              <div className="tf-modal__info">
                {details.overview && (
                  <p className="tf-modal__overview">{details.overview}</p>
                )}

                {details.genres && details.genres.length > 0 && (
                  <p>
                    <strong>Gêneros:</strong>{' '}
                    <span>{details.genres.map((genre) => genre.name).join(', ')}</span>
                  </p>
                )}

                {details.production_companies && details.production_companies.length > 0 && (
                  <p>
                    <strong>Produção:</strong>{' '}
                    <span>{details.production_companies.map((company) => company.name).join(', ')}</span>
                  </p>
                )}

                <p>
                  <strong>Avaliação:</strong>{' '}
                  <span>
                    {details.vote_average ? `${details.vote_average} / 10` : 'Não avaliado'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
