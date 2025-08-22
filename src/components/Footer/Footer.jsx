import './Footer.css'

export default function Footer() {
  return (
    <footer className="tf-footer">
      <div className="tf-footer__inner">
        <small>© {new Date().getFullYear()} Tunesflix — feito com ♥</small>
        <nav className="tf-footer__nav">
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
      </div>
    </footer>
  )
}
