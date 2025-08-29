import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * EmptyStateView - Componente para estados vazios
 *
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - useCallback para handlers estáveis
 * - Acessibilidade aprimorada com atributos ARIA
 * - Design system consistente
 * - Documentação JSDoc completa
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
const EmptyStateView = memo(({ title, message, icon = '📭', action }) => {
  return (
    <div
      className="tf-empty-state"
      role="status"
      aria-live="polite"
      aria-label={`Estado vazio: ${title}`}
    >
      <div className="tf-empty-state__content">
        <div
          className="tf-empty-state__icon"
          aria-hidden="true"
          role="img"
          aria-label="Ícone ilustrativo"
        >
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
});

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
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - useCallback para handlers estáveis
 * - Acessibilidade aprimorada com atributos ARIA
 * - Design system consistente
 * - Tratamento robusto de erros
 *
 * Exibe mensagens de erro de forma amigável com opção de retry.
 *
 * @param {Object} props
 * @param {Error} props.error - Objeto de erro
 * @param {Function} [props.onRetry] - Função opcional para tentar novamente
 * @param {string} [props.title] - Título personalizado
 */
const ErrorStateView = memo(({ error, onRetry, title = 'Ops! Algo deu errado' }) => {
  const errorMessage = error?.message || 'Erro desconhecido';

  const handleRetry = useCallback(() => {
    if (onRetry) {
      onRetry();
    }
  }, [onRetry]);

  return (
    <div
      className="tf-error-state"
      role="alert"
      aria-live="assertive"
      aria-label={`Erro: ${title}`}
    >
      <div className="tf-error-state__content">
        <div
          className="tf-error-state__icon"
          aria-hidden="true"
          role="img"
          aria-label="Ícone de erro"
        >
          ⚠️
        </div>
        <h3 className="tf-error-state__title">{title}</h3>
        <p className="tf-error-state__message">{errorMessage}</p>
        {onRetry && (
          <button
            className="tf-btn tf-btn--primary tf-error-state__retry"
            onClick={handleRetry}
            type="button"
            aria-label="Tentar novamente"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
});

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
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - Acessibilidade aprimorada com atributos ARIA
 * - Design system consistente
 * - Tamanhos configuráveis para diferentes contextos
 *
 * Exibe indicadores de carregamento com mensagens personalizáveis.
 *
 * @param {Object} props
 * @param {string} [props.message] - Mensagem de carregamento
 * @param {string} [props.size] - Tamanho do spinner (small, medium, large)
 */
const LoadingStateView = memo(({ message = 'Carregando...', size = 'medium' }) => {
  return (
    <div
      className="tf-loading-state"
      role="status"
      aria-live="polite"
      aria-label={`Carregando: ${message}`}
    >
      <div className="tf-loading-state__content">
        <div
          className={`tf-loading-state__spinner tf-loading-state__spinner--${size}`}
          aria-hidden="true"
          role="img"
          aria-label="Spinner de carregamento"
        />
        <p className="tf-loading-state__message">{message}</p>
      </div>
    </div>
  );
});

LoadingStateView.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

LoadingStateView.defaultProps = {
  message: 'Carregando...',
  size: 'medium',
};

// Exports dos componentes memoizados
export { EmptyStateView, ErrorStateView, LoadingStateView };
