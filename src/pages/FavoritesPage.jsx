import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigation } from '../hooks/useNavigation';
import { useMovieDetailsModal } from '../hooks/useMovieDetailsModal';
import FavoritesView from '../components/Favorites/FavoritesView';
import MovieModal from '../components/MovieModal/MovieModal';

export default function FavoritesPage({ onNavigate }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { navigateToMovie } = useNavigation();

  // Hook personalizado para o modal de detalhes
  const {
    open: modalOpen,
    loading: modalLoading,
    details: modalDetails,
    error: modalError,
    openModal: handleDetails,
    closeModal: handleCloseModal,
  } = useMovieDetailsModal();

  /**
   * Handler para navegação baseada no tipo de ação
   * Centraliza a lógica de navegação da página de favoritos
   */
  const handleNavigate = useCallback(
    (type, film) => {
      // Se foi passada uma função externa, usa ela
      if (onNavigate) {
        onNavigate(type, film);
        return;
      }

      switch (type) {
        case 'detail':
          if (film?.id) {
            navigateToMovie(film.id, film);
          }
          break;
        case 'modal':
          if (film?.id) {
            handleDetails(film);
          }
          break;
        default:
          console.warn('FavoritesPage: Tipo de navegação não reconhecido:', type);
      }
    },
    [onNavigate, navigateToMovie, handleDetails]
  );

  /**
   * Handler para alternar favoritos com validação
   */
  const handleToggleFavorite = useCallback(
    (film) => {
      if (!film?.id) {
        console.warn('FavoritesPage: Tentativa de favoritar filme sem ID');
        return;
      }
      toggleFavorite(film);
    },
    [toggleFavorite]
  );

  return (
    <>
      <section className="tf-favorites-page">
        <header className="tf-favorites-page__header">
          <h1 className="tf-favorites-page__title">Meus Favoritos</h1>
          <p className="tf-favorites-page__subtitle">
            Gerencie seus filmes favoritos e descubra novos conteúdos
          </p>
        </header>

        <FavoritesView
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onDetails={handleDetails}
          onNavigate={handleNavigate}
        />
      </section>

      <MovieModal
        open={modalOpen}
        onClose={handleCloseModal}
        loading={modalLoading}
        details={modalDetails}
        error={modalError}
      />
    </>
  );
}

// Validação de props com PropTypes
FavoritesPage.propTypes = {
  onNavigate: PropTypes.func,
};

FavoritesPage.defaultProps = {
  onNavigate: null,
};
