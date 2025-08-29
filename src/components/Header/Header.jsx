import React, { memo, useCallback } from 'react';
import './Header.css';
import logo from '../../assets/react.svg';
import { NavLink } from 'react-router-dom';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { ROUTES, ACCESSIBILITY } from '../../config/appConfig';

const Header = memo(() => {
  const { navigateToHome } = useAppNavigation();

  // Handler memoizado para navegação home
  const handleHomeNavigation = useCallback(
    (e) => {
      e.preventDefault();
      navigateToHome();
    },
    [navigateToHome]
  );

  return (
    <header className="tf-header" role={ACCESSIBILITY.ROLES.BANNER}>
      <div className="tf-header__inner">
        {/* Link do brand - leva para a página inicial */}
        <a
          className="tf-brand"
          href={ROUTES.HOME}
          aria-label="Ir para página inicial - Tunesflix"
          onClick={handleHomeNavigation}
        >
          <img src={logo} alt="Tunesflix Logo" className="tf-brand__logo" width="32" height="32" />
          <span className="tf-brand__name">Tunesflix</span>
        </a>

        {/* Navegação principal */}
        <nav className="tf-nav" aria-label={ACCESSIBILITY.LABELS.MAIN_CONTENT}>
          <NavLink
            to={ROUTES.HOME}
            end
            className={({ isActive }) => `tf-nav__link ${isActive ? 'is-active' : ''}`}
            aria-label="Página inicial"
          >
            Início
          </NavLink>
          <NavLink
            to={ROUTES.FAVORITES}
            className={({ isActive }) => `tf-nav__link ${isActive ? 'is-active' : ''}`}
            aria-label="Página de favoritos"
          >
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  );
});

// Nome de exibição para debugging
Header.displayName = 'Header';

export default Header;
