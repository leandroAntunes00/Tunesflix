import React from 'react';
import CardFilm from '../CardFilm/CardFilm';
import SkeletonCard from './SkeletonCard';
import './CardList.css';

/**
 * Componente CardList - Lista de cards de filmes/séries
 * Responsável por renderizar uma grade de cards com suporte a loading e estados vazios
 *
 * @param {Array} items - Array de objetos de filmes/séries
 * @param {Function} onDetails - Callback para abrir detalhes de um item
 * @param {Function} onToggleFavorite - Callback para alternar favorito
 * @param {Set|Object} favorites - Conjunto ou objeto com IDs dos favoritos
 * @param {boolean} loading - Se está carregando dados
 * @param {Function} onNavigate - Callback para navegação (opcional)
 */
export default function CardList({
  items = [],
  onDetails,
  onToggleFavorite,
  favorites = new Set(),
  loading = false,
  onNavigate,
}) {
  // Estado de loading - mostra skeletons
  if (loading) {
    return (
      <section className="tf-list" aria-live="polite" aria-label="Carregando filmes">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </section>
    );
  }

  // Estado vazio - nenhum resultado encontrado
  if (!items || items.length === 0) {
    return (
      <div className="tf-empty" role="status" aria-live="polite">
        Nenhum resultado encontrado
      </div>
    );
  }

  // Função helper para verificar se um item é favorito
  const isItemFavorite = (item) => {
    if (!item?.id) return false;

    // Suporte a diferentes tipos de estruturas de favoritos
    if (favorites.has && typeof favorites.has === 'function') {
      return favorites.has(item.id);
    }

    return Boolean(favorites[item.id]);
  };

  return (
    <section className="tf-list" aria-live="polite" aria-label="Lista de filmes">
      {items.map((item) => (
        <CardFilm
          key={item.id}
          film={item}
          onDetails={onDetails}
          onToggleFavorite={onToggleFavorite}
          onNavigate={onNavigate}
          isFavorite={isItemFavorite(item)}
        />
      ))}
    </section>
  );
}
