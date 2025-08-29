import React from 'react';
import './Loading.css';

/**
 * Componente Loading - Indicador de carregamento
 *
 * Exibe um indicador visual de que algo está sendo carregado.
 * Pode ser personalizado com diferentes tamanhos e mensagens.
 *
 * @param {string} message - Mensagem opcional a ser exibida
 * @param {string} size - Tamanho do indicador ('small', 'medium', 'large')
 */
export default function Loading({ message = 'Carregando...', size = 'medium' }) {
  return (
    <div className={`tf-loading tf-loading--${size}`} role="status" aria-live="polite">
      <div className="tf-loading__spinner" aria-hidden="true" />
      <span className="tf-loading__message">{message}</span>
    </div>
  );
}
