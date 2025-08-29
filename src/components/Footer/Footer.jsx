import React, { memo, useMemo } from 'react';
import './Footer.css';
import { ACCESSIBILITY } from '../../config/appConfig';

const Footer = memo(() => {
  // Memoização do ano atual para evitar recálculos
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const currentYearString = useMemo(() => currentYear.toString(), [currentYear]);

  return (
    <footer className="tf-footer" role={ACCESSIBILITY.ROLES.CONTENTINFO}>
      <div className="tf-footer__inner">
        <p className="tf-footer__copyright">
          © Tunesflix —{' '}
          <time dateTime={currentYearString} aria-label={`Ano atual: ${currentYear}`}>
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
