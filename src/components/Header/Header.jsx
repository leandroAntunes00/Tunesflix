import './Header.css'

export default function Header({ onNavigate = () => {}, active = 'home' }) {
  return (
    <header className="tf-header">
      <div className="tf-header__inner">
        <h1 className="tf-brand">Tunesflix</h1>
        <nav className="tf-nav" aria-label="Main navigation">
          <button type="button" className={`tf-nav__link ${active === 'home' ? 'is-active' : ''}`} onClick={() => onNavigate('home')}>Início</button>
          <button type="button" className={`tf-nav__link ${active === 'favorites' ? 'is-active' : ''}`} onClick={() => onNavigate('favorites')}>Favoritos</button>
        </nav>
      </div>
    </header>
  )
}
