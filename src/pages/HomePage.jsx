import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import useMovies from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigation } from '../hooks/useNavigation';
import { useMovieDetailsModal } from '../hooks/useMovieDetailsModal';
import HomeView from '../views/HomeView';
import MovieModal from '../components/MovieModal/MovieModal';

/**
 * Página principal da aplicação - HomePage
 *
 * Responsável por:
 * - Coordenar os hooks de filmes e favoritos
 * - Gerenciar o modal de detalhes
 * - Renderizar a view principal
 *
 * Princípios de design:
 * - Separação clara de responsabilidades
 * - Reutilização através de hooks customizados
 * - Tratamento robusto de erros
 * - Performance otimizada com memoização
 *
 * MELHOR PRÁTICA MODERNA:
 * Para projetos React 2025, considere:
 * 1. TypeScript para validação em tempo de compilação
 * 2. Componentes funcionais com hooks
 * 3. Validação de props com interfaces TypeScript
 * 4. Eliminação de PropTypes (runtime overhead)
 *
 * @param {Object} props
 * @param {Function} [props.onNavigate] - Handler opcional para navegação externa
 */
export default function HomePage({ onNavigate }) {
  // Hooks principais da aplicação
  const {
    category,
    searchQuery,
    results,
    loading,
    error,
    page,
    nextPage,
    prevPage,
    totalPages,
    changeCategory,
    search,
  } = useMovies();

  const { favorites, toggleFavorite } = useFavorites();
  const { handleNavigate: navigationHandler } = useNavigation();

  // Hook personalizado para o modal de detalhes
  const {
    open: modalOpen,
    loading: modalLoading,
    details: modalDetails,
    error: modalError,
    openModal: handleDetails,
    closeModal: handleCloseModal,
  } = useMovieDetailsModal();

  // Handler para navegação que combina prop externa com hook interno
  const handleNavigate = useCallback(
    (type, film) => {
      // Se foi passada uma função externa, usa ela
      if (onNavigate) {
        onNavigate(type, film);
      } else {
        // Caso contrário, usa o handler do hook
        navigationHandler(type, film);
      }
    },
    [onNavigate, navigationHandler]
  );

  // Handler para alternar favoritos com validação
  const handleToggleFavorite = useCallback(
    (film) => {
      if (!film?.id) {
        console.warn('Tentativa de favoritar filme sem ID');
        return;
      }
      toggleFavorite(film);
    },
    [toggleFavorite]
  );

  return (
    <>
      <HomeView
        // Props de busca e navegação
        query={searchQuery}
        search={search}
        category={category}
        onCategoryChange={changeCategory}
        // Props de paginação
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        // Props de estado
        results={results}
        loading={loading}
        error={error}
        favorites={favorites}
        // Props de ações
        onToggleFavorite={handleToggleFavorite}
        onDetails={handleDetails}
        onNavigate={handleNavigate}
      />

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
HomePage.propTypes = {
  onNavigate: PropTypes.func,
};

HomePage.defaultProps = {
  onNavigate: null,
};
