import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * MELHOR PRÁTICA MODERNA (2025):
 *
 * Para projetos TypeScript, este hook seria:
 *
 * interface ViewStateParams<T> {
 *   items: T[];
 *   loading: boolean;
 *   error?: Error | null;
 *   query?: string;
 * }
 *
 * interface ViewStateResult {
 *   type: 'loading' | 'error' | 'empty' | 'data';
 *   hasItems: boolean;
 *   isLoading: boolean;
 *   isEmpty: boolean;
 *   shouldShowHeader: boolean;
 *   shouldShowPagination: boolean;
 *   error?: Error;
 *   items?: T[];
 * }
 *
 * VANTAGENS DO TYPESCRIPT:
 * ✅ Type safety para estados
 * ✅ IntelliSense para propriedades
 * ✅ Prevenção de typos em runtime
 * ✅ Refatoração automática
 *
 * Hook personalizado para determinar o estado atual da view
 *
 * Centraliza a lógica de estados da interface, facilitando
 * a tomada de decisões sobre o que renderizar.
 *
 * @param {Object} params
 * @param {Array} params.items - Lista de itens
 * @param {boolean} params.loading - Estado de carregamento
 * @param {Error} [params.error] - Erro ocorrido
 * @param {string} [params.query] - Query de busca (opcional)
 * @returns {Object} Estado da view
 */
export function useViewState({ items, loading, error, query }) {
  return useMemo(() => {
    // Estado de erro
    if (error) {
      return {
        type: 'error',
        hasItems: false,
        isLoading: false,
        isEmpty: false,
        shouldShowHeader: false,
        shouldShowPagination: false,
        error,
      };
    }

    // Estado de carregamento
    if (loading) {
      return {
        type: 'loading',
        hasItems: false,
        isLoading: true,
        isEmpty: false,
        shouldShowHeader: true,
        shouldShowPagination: false,
      };
    }

    // Estado vazio
    if (!items || items.length === 0) {
      return {
        type: 'empty',
        hasItems: false,
        isLoading: false,
        isEmpty: true,
        shouldShowHeader: false,
        shouldShowPagination: false,
        isSearch: Boolean(query && query.trim()),
        query,
      };
    }

    // Estado com itens
    return {
      type: 'success',
      hasItems: true,
      isLoading: false,
      isEmpty: false,
      shouldShowHeader: true,
      shouldShowPagination: true, // Pode ser sobrescrito se totalPages <= 1
      itemCount: items.length,
    };
  }, [items, loading, error, query]);
}

/**
 * Hook para gerenciar ações de retry e navegação
 *
 * Centraliza handlers comuns para estados de erro e retry.
 *
 * @param {Object} params
 * @param {Function} [params.onRetry] - Função de retry
 * @param {Function} [params.onNavigate] - Função de navegação
 * @returns {Object} Handlers de ação
 */
export function useViewActions({ onRetry, onNavigate }) {
  return useMemo(() => ({
    handleRetry: onRetry || (() => {}),
    handleNavigate: onNavigate || (() => {}),
  }), [onRetry, onNavigate]);
}

/**
 * Hook para configuração de acessibilidade
 *
 * Fornece configurações ARIA apropriadas para diferentes estados.
 *
 * @param {string} stateType - Tipo do estado atual
 * @param {string} [context] - Contexto da view (ex: 'search', 'favorites')
 * @returns {Object} Configurações de acessibilidade
 */
export function useViewAccessibility(stateType, context = '') {
  return useMemo(() => {
    const baseConfig = {
      'aria-live': 'polite',
      role: 'status',
    };

    switch (stateType) {
      case 'error':
        return {
          ...baseConfig,
          'aria-live': 'assertive',
          role: 'alert',
        };
      case 'loading':
        return {
          ...baseConfig,
          'aria-label': `Carregando ${context}`,
        };
      case 'empty':
        return {
          ...baseConfig,
          'aria-label': `Nenhum resultado ${context ? `para ${context}` : ''}`,
        };
      case 'success':
        return {
          'aria-label': `Resultados ${context ? `de ${context}` : ''}`,
        };
      default:
        return baseConfig;
    }
  }, [stateType, context]);
}

// PropTypes para validação dos hooks
export const ViewStatePropTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  query: PropTypes.string,
};

export const ViewActionsPropTypes = {
  onRetry: PropTypes.func,
  onNavigate: PropTypes.func,
};
