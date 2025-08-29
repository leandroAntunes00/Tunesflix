import React from 'react';
import './Header.css';
import logo from '../../assets/react.svg';
import { NavLink, useNavigate } from 'react-router-dom';

/**
 * Componente Header - Navegação principal da aplicação
 * Responsável por exibir o logo, nome do site e links de navegação
 */
export default function Header() {
  const navigate = useNavigate();

  // Função para navegar para a página inicial
  const handleHomeNavigation = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="tf-header">
      <div className="tf-header__inner">
        {/* Link do brand - leva para a página inicial */}
        <a
          className="tf-brand"
          href="/"
          aria-label="Ir para página inicial"
          onClick={handleHomeNavigation}
        >
          <img src={logo} alt="Tunesflix" className="tf-brand__logo" />
          <span className="tf-brand__name">Tunesflix</span>
        </a>

        {/* Navegação principal */}
        <nav className="tf-nav" aria-label="Navegação principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `tf-nav__link ${isActive ? 'is-active' : ''}`}
          >
            Início
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `tf-nav__link ${isActive ? 'is-active' : ''}`}
          >
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
