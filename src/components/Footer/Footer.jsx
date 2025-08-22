import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="tf-footer">
      <div className="tf-footer__inner">
        <p className="tf-footer__copyright">
          © Tunesflix —{' '}
          <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time>
        </p>
      </div>
    </footer>
  );
}
