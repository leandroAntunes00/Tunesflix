import React from 'react';
import './Loading.css';

export default function Loading({ message = 'Carregando...', size = 'medium' }) {
  return (
    <div className={`tf-loading tf-loading--${size}`} role="status" aria-live="polite">
      <div className="tf-loading__spinner" aria-hidden="true" />
      <span className="tf-loading__message">{message}</span>
    </div>
  );
}
