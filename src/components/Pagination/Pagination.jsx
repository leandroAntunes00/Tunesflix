import React, { useCallback, useMemo } from 'react';
import './Pagination.css';

/**
 * Componente Pagination - Navegação por páginas com acessibilidade completa
 * Suporta navegação por botões anterior/próximo e números de página
 *
 * @param {number} page - Página atual (1-indexed)
 * @param {number} totalPages - Total de páginas disponíveis
 * @param {Function} onPrev - Callback para página anterior
 * @param {Function} onNext - Callback para próxima página
 * @param {Function} onPageChange - Callback opcional para mudança direta de página
 * @param {string} label - Rótulo opcional para contexto (ex: "Filmes", "Populares")
 * @param {boolean} showPageNumbers - Se deve mostrar números de página (padrão: false)
 * @param {number} maxVisiblePages - Máximo de números de página visíveis (padrão: 5)
 */
export default function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
  label,
  showPageNumbers = false,
  maxVisiblePages = 5
}) {
  // Callbacks memoizados para performance
  const handlePrev = useCallback(() => {
    if (page > 1 && onPrev) {
      onPrev();
    }
  }, [page, onPrev]);

  const handleNext = useCallback(() => {
    if (page < totalPages && onNext) {
      onNext();
    }
  }, [page, totalPages, onNext]);

  const handlePageClick = useCallback((pageNumber) => {
    if (pageNumber !== page && onPageChange) {
      onPageChange(pageNumber);
    }
  }, [page, onPageChange]);

  // Handler para navegação por teclado
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  }, [handlePrev, handleNext]);

  // Cálculo das páginas visíveis com ellipsis
  const visiblePages = useMemo(() => {
    if (!showPageNumbers || totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Ajusta o início se estamos próximos do fim
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    // Adiciona páginas
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [page, totalPages, showPageNumbers, maxVisiblePages]);

  // Não renderiza se não há páginas suficientes
  if (!totalPages || totalPages <= 1) return null;

  // Verifica se deve mostrar ellipsis
  const showStartEllipsis = showPageNumbers && visiblePages[0] > 2;
  const showEndEllipsis = showPageNumbers && visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <nav
      className="tf-pagination"
      role="navigation"
      aria-label={`Navegação de páginas${label ? ` para ${label}` : ''}`}
      onKeyDown={handleKeyDown}
    >
      {/* Botão Anterior */}
      <button
        onClick={handlePrev}
        disabled={page <= 1}
        aria-label="Página anterior"
        aria-disabled={page <= 1}
        className="tf-pagination__button tf-pagination__button--prev"
        type="button"
      >
        <span className="tf-pagination__button-text">Anterior</span>
        <span className="tf-pagination__button-icon" aria-hidden="true">‹</span>
      </button>

      {/* Informações da página atual */}
      <div className="tf-pagination__info" aria-live="polite" aria-atomic="true">
        <span className="tf-pagination__label">
          {label && <span className="tf-pagination__context">{label} — </span>}
          <span className="tf-pagination__current">
            página <span className="tf-pagination__current-number">{page}</span> de{' '}
            <span className="tf-pagination__total">{totalPages}</span>
          </span>
        </span>
      </div>

      {/* Números de página (opcional) */}
      {showPageNumbers && (
        <div className="tf-pagination__pages" role="group" aria-label="Selecionar página">
          {/* Primeira página + ellipsis */}
          {showStartEllipsis && (
            <>
              <button
                onClick={() => handlePageClick(1)}
                className="tf-pagination__page-button"
                aria-label="Ir para página 1"
                type="button"
              >
                1
              </button>
              <span className="tf-pagination__ellipsis" aria-hidden="true">…</span>
            </>
          )}

          {/* Páginas visíveis */}
          {visiblePages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              disabled={pageNum === page}
              className={`tf-pagination__page-button ${
                pageNum === page ? 'tf-pagination__page-button--current' : ''
              }`}
              aria-label={`Página ${pageNum}${pageNum === page ? ' (atual)' : ''}`}
              aria-current={pageNum === page ? 'page' : undefined}
              type="button"
            >
              {pageNum}
            </button>
          ))}

          {/* Última página + ellipsis */}
          {showEndEllipsis && (
            <>
              <span className="tf-pagination__ellipsis" aria-hidden="true">…</span>
              <button
                onClick={() => handlePageClick(totalPages)}
                className="tf-pagination__page-button"
                aria-label={`Ir para página ${totalPages}`}
                type="button"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}

      {/* Botão Próxima */}
      <button
        onClick={handleNext}
        disabled={page >= totalPages}
        aria-label="Próxima página"
        aria-disabled={page >= totalPages}
        className="tf-pagination__button tf-pagination__button--next"
        type="button"
      >
        <span className="tf-pagination__button-text">Próxima</span>
        <span className="tf-pagination__button-icon" aria-hidden="true">›</span>
      </button>
    </nav>
  );
}
