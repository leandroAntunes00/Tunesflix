import React from 'react';
import './Footer.css';

/**
 * Componente Footer - Rodapé da aplicação
 * Exibe informações de copyright e ano atual
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tf-footer" role="contentinfo">
      <div className="tf-footer__inner">
        <p className="tf-footer__copyright">
          © Tunesflix —{' '}
          <time dateTime={currentYear.toString()}>
            {currentYear}
          </time>
        </p>
      </div>
    </footer>
  );
}
