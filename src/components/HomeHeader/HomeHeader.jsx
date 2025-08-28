import React from 'react';
import './HomeHeader.css';

// Mostra o cabeçalho da página inicial baseado na categoria atual
// ou 'Resultados para "query"' quando existe uma busca.
export default function HomeHeader({ query, category = 'popular' }) {
  const hasQuery = query && query.trim();

  const getCategoryInfo = (cat) => {
    switch (cat) {
      case 'top-rated':
        return {
          title: 'Mais Avaliados',
          subtitle: 'Filmes com as melhores avaliações'
        };
      case 'now-playing':
        return {
          title: 'Em Cartaz',
          subtitle: 'Filmes em exibição nos cinemas'
        };
      case 'popular':
      default:
        return {
          title: 'Populares',
          subtitle: 'Filmes populares no momento'
        };
    }
  };

  return (
    <header className="tf-home-header">
      {hasQuery ? (
        <h2>Resultados para "{query.trim()}"</h2>
      ) : (
        <>
          <h2>{getCategoryInfo(category).title}</h2>
          <p className="tf-popular-subtitle">{getCategoryInfo(category).subtitle}</p>
        </>
      )}
    </header>
  );
}
