import './Footer.css';

export default function Footer() {
  return (
    <footer className="tf-footer">
      <div className="tf-footer__inner">
        <small>© Tunesflix — {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
}
