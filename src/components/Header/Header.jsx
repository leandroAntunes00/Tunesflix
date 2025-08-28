import React from 'react';
import './Header.css';
import logo from '../../assets/react.svg';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header({ onNavigate = () => {} }) {
  const navigate = useNavigate();

  const goHome = (e) => {
    e.preventDefault();
    // navigate using react-router so it's SPA navigation
    navigate('/');
    // also call the external handler for compatibility
    if (onNavigate) onNavigate('home');
  };

  return (
    <header className="tf-header">
      <div className="tf-header__inner">
        <a className="tf-brand" href="/" aria-label="Ir para início" onClick={goHome}>
          <img src={logo} alt="Tunesflix" className="tf-brand__logo" />
          <span className="tf-brand__name">Tunesflix</span>
        </a>
        <nav className="tf-nav" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `tf-nav__link ${isActive ? 'is-active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Início
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `tf-nav__link ${isActive ? 'is-active' : ''}`}
            onClick={() => onNavigate('favorites')}
          >
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
