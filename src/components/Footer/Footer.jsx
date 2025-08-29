import React, { memo, useMemo } from 'react';
import './Footer.css';
import { ACCESSIBILITY } from '../../config/appConfig';

/**
 * MELHOR PRÁTICA MODERNA (2025) - Footer Component
 *
 * MELHORIAS IMPLEMENTADAS:
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - useMemo para computação do ano atual
 * - Acessibilidade aprimorada com atributos ARIA
 * - Constantes centralizadas
 * - Documentação JSDoc completa
 */

/**
 * Footer - Componente de rodapé da aplicação
 *
 * Responsável por:
 * - Exibir informações de copyright
 * - Mostrar ano atual dinamicamente
 * - Fornecer estrutura semântica adequada
 *
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização para otimização de performance
 * - useMemo para evitar recálculos desnecessários
 * - Acessibilidade aprimorada
 * - Constantes centralizadas
 */
const Footer = memo(() => {
  // Memoização do ano atual para evitar recálculos
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const currentYearString = useMemo(() => currentYear.toString(), [currentYear]);

  return (
    <footer className="tf-footer" role={ACCESSIBILITY.ROLES.CONTENTINFO}>
      <div className="tf-footer__inner">
        <p className="tf-footer__copyright">
          © Tunesflix —{' '}
          <time
            dateTime={currentYearString}
            aria-label={`Ano atual: ${currentYear}`}
          >
            {currentYear}
          </time>
        </p>
      </div>
    </footer>
  );
});

// Nome de exibição para debugging
Footer.displayName = 'Footer';

export default Footer;
