import React from 'react';
import './HomeHeader.css';

// Mostra o cabeçalho da página inicial: 'Populares' quando não há query
// ou 'Resultados para "query"' quando existe uma busca.
export default function HomeHeader({ query }) {
  const hasQuery = query && query.trim();
  return (
    <header className="tf-home-header">
      {hasQuery ? (
        <h2>Resultados para "{query.trim()}"</h2>
      ) : (
        <>
          <h2>Populares</h2>
          <p className="tf-popular-subtitle">Filmes populares no momento</p>
        </>
      )}
    </header>
  );
}
