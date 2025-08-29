import React from 'react';
import './Error.css';

/**
 * Componente Error - Exibição de erros
 *
 * Exibe mensagens de erro de forma consistente e acessível.
 * Pode incluir ações de retry quando apropriado.
 *
 * @param {Error|string} error - Erro a ser exibido
 * @param {Function} onRetry - Função opcional para tentar novamente
 * @param {string} title - Título opcional do erro
 */
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
