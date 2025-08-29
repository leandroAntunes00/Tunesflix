import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToFavorites = useCallback(() => {
    navigate('/favorites');
  }, [navigate]);

  const navigateToMovieDetail = useCallback(
    (movieId, movie) => {
      if (movieId) {
        navigate(`/movie/${movieId}`, {
          state: movie ? { film: movie } : undefined,
        });
      }
    },
    [navigate]
  );

  const handleNavigate = useCallback(
    (type, item) => {
      switch (type) {
        case 'detail':
          if (item?.id) {
            navigateToMovieDetail(item.id, item);
          }
          break;
        case 'home':
          navigateToHome();
          break;
        case 'favorites':
          navigateToFavorites();
          break;
        default:
          console.warn(`Tipo de navegação não reconhecido: ${type}`);
      }
    },
    [navigateToHome, navigateToFavorites, navigateToMovieDetail]
  );

  return {
    navigateToHome,
    navigateToFavorites,
    navigateToMovieDetail,
    handleNavigate,
  };
};
