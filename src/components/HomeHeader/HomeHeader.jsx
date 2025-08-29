import React from 'react';
import './HomeHeader.css';

/**
 * Componente HomeHeader - Cabeçalho da página inicial
 * Exibe título e subtítulo baseado na categoria atual ou nos resultados de busca
 *
 * @param {string} query - Termo de busca (opcional)
 * @param {string} category - Categoria atual (popular, top-rated, now-playing)
 */
export default function HomeHeader({ query, category = 'popular' }) {
  // Verifica se há uma query de busca
  const hasQuery = query && query.trim();

  // Mapeamento das informações de categoria
  const categoryInfo = {
    popular: {
      title: 'Populares',
      subtitle: 'Filmes populares no momento',
    },
    'top-rated': {
      title: 'Mais Avaliados',
      subtitle: 'Filmes com as melhores avaliações',
    },
    'now-playing': {
      title: 'Em Cartaz',
      subtitle: 'Filmes em exibição nos cinemas',
    },
  };

  // Obtém informações da categoria atual (com fallback para popular)
  const currentCategory = categoryInfo[category] || categoryInfo.popular;

  return (
    <header className="tf-home-header">
      {hasQuery ? (
        // Modo de busca: mostra resultados para a query
        <h2>Resultados para "{query.trim()}"</h2>
      ) : (
        // Modo de categoria: mostra título e subtítulo da categoria
        <>
          <h2>{currentCategory.title}</h2>
          <p className="tf-home-header__subtitle">{currentCategory.subtitle}</p>
        </>
      )}
    </header>
  );
}
