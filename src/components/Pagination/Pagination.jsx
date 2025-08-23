import React from 'react';
import './Pagination.css';

export default function Pagination({ page, totalPages, onPrev, onNext, label }) {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <div className="tf-pagination">
      <button onClick={onPrev} disabled={page <= 1} aria-label="Página anterior">
        Anterior
      </button>
      <span>
        {label ? `${label} — ` : ''}página {page} / {totalPages}
      </span>
      <button onClick={onNext} disabled={page >= totalPages} aria-label="Próxima página">
        Próxima
      </button>
    </div>
  );
}
