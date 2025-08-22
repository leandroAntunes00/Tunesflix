import './Header.css'

export default function Header() {
  return (
    <header className="tf-header">
      <div className="tf-header__inner">
        <h1 className="tf-brand">Tunesflix</h1>
        <nav className="tf-nav" aria-label="Main navigation">
          <a href="#" className="tf-nav__link">Início</a>
          <a href="#" className="tf-nav__link">Favoritos</a>
        </nav>
      </div>
    </header>
  )
}
