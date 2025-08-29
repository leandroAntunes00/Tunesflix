import React from 'react';
import PropTypes from 'prop-types';

/**
 * EmptyStateView - Componente para estados vazios
 *
 * Exibe uma mensagem amigável quando não há conteúdo para mostrar,
 * com ícone e ações sugeridas.
 *
 * @param {Object} props
 * @param {string} props.title - Título da mensagem
 * @param {string} props.message - Mensagem descritiva
 * @param {string} [props.icon] - Ícone opcional (emoji ou classe CSS)
 * @param {React.ReactNode} [props.action] - Ação opcional (botão, link)
 */
export function EmptyStateView({ title, message, icon = '📭', action }) {
  return (
    <div className="tf-empty-state" role="status" aria-live="polite">
      <div className="tf-empty-state__content">
        <div className="tf-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
        <h3 className="tf-empty-state__title">{title}</h3>
        <p className="tf-empty-state__message">{message}</p>
        {action && (
          <div className="tf-empty-state__action">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

EmptyStateView.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string,
  action: PropTypes.node,
};

EmptyStateView.defaultProps = {
  icon: '📭',
  action: null,
};

/**
 * ErrorStateView - Componente para estados de erro
 *
 * Exibe mensagens de erro de forma amigável com opção de retry.
 *
 * @param {Object} props
 * @param {Error} props.error - Objeto de erro
 * @param {Function} [props.onRetry] - Função opcional para tentar novamente
 * @param {string} [props.title] - Título personalizado
 */
export function ErrorStateView({ error, onRetry, title = 'Ops! Algo deu errado' }) {
  const errorMessage = error?.message || 'Erro desconhecido';

  return (
    <div className="tf-error-state" role="alert" aria-live="assertive">
      <div className="tf-error-state__content">
        <div className="tf-error-state__icon" aria-hidden="true">
          ⚠️
        </div>
        <h3 className="tf-error-state__title">{title}</h3>
        <p className="tf-error-state__message">{errorMessage}</p>
        {onRetry && (
          <button
            className="tf-btn tf-btn--primary tf-error-state__retry"
            onClick={onRetry}
            type="button"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}

ErrorStateView.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  onRetry: PropTypes.func,
  title: PropTypes.string,
};

ErrorStateView.defaultProps = {
  onRetry: null,
  title: 'Ops! Algo deu errado',
};

/**
 * LoadingStateView - Componente para estados de carregamento
 *
 * Exibe indicadores de carregamento com mensagens personalizáveis.
 *
 * @param {Object} props
 * @param {string} [props.message] - Mensagem de carregamento
 * @param {string} [props.size] - Tamanho do spinner (small, medium, large)
 */
export function LoadingStateView({ message = 'Carregando...', size = 'medium' }) {
  return (
    <div className="tf-loading-state" role="status" aria-live="polite">
      <div className="tf-loading-state__content">
        <div
          className={`tf-loading-state__spinner tf-loading-state__spinner--${size}`}
          aria-hidden="true"
        />
        <p className="tf-loading-state__message">{message}</p>
      </div>
    </div>
  );
}

LoadingStateView.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

LoadingStateView.defaultProps = {
  message: 'Carregando...',
  size: 'medium',
};
