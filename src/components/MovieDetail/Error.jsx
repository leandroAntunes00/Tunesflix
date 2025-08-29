import React from 'react';
import './Error.css';

export default function Error({ error, onRetry, title = 'Erro' }) {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return (
    <div className="tf-error" role="alert">
      <div className="tf-error__content">
        <h3 className="tf-error__title">{title}</h3>
        <p className="tf-error__message">{errorMessage}</p>
        {onRetry && (
          <button onClick={onRetry} className="tf-error__retry-btn" type="button">
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}
