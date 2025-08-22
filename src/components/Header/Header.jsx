import React from 'react';
import './Header.css';

export default function Header({ onNavigate = () => {}, active = 'home' }) {
  return (
    <header className="tf-header">
      <div className="tf-header__inner">
        <h1
          className="tf-brand"
          role="button"
          tabIndex={0}
          aria-label="Ir para início"
          onClick={() => onNavigate('home')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onNavigate('home');
          }}
        >
          Tunesflix
        </h1>
        <nav className="tf-nav" aria-label="Main navigation">
          <button
            type="button"
            className={`tf-nav__link ${active === 'home' ? 'is-active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Início
          </button>
          <button
            type="button"
            className={`tf-nav__link ${active === 'favorites' ? 'is-active' : ''}`}
            onClick={() => onNavigate('favorites')}
          >
            Favoritos
          </button>
        </nav>
      </div>
    </header>
  );
}
