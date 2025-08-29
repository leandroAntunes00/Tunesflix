import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigation() {
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToMovie = useCallback(
    (movieId, movieData) => {
      if (!movieId) {
        console.warn('useNavigation: Tentativa de navegar para filme sem ID');
        return;
      }

      const state = movieData ? { state: { film: movieData } } : undefined;
      navigate(`/movie/${movieId}`, state);
    },
    [navigate]
  );

  const navigateToFavorites = useCallback(() => {
    navigate('/favorites');
  }, [navigate]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleNavigate = useCallback(
    (type, data, options = {}) => {
      switch (type) {
        case 'detail':
          if (data?.id) {
            navigateToMovie(data.id, data);
          } else {
            console.warn('useNavigation: Dados insuficientes para navegação de detalhes');
          }
          break;

        case 'home':
          navigateToHome();
          break;

        case 'favorites':
          navigateToFavorites();
          break;

        case 'back':
          goBack();
          break;

        case 'modal':
          // Para modais, não faz navegação, apenas log se necessário
          if (options.onModalOpen && data?.id) {
            options.onModalOpen(data);
          }
          break;

        default:
          console.warn('useNavigation: Tipo de navegação não reconhecido:', type);
      }
    },
    [navigateToMovie, navigateToHome, navigateToFavorites, goBack]
  );

  return {
    navigateToHome,
    navigateToMovie,
    navigateToFavorites,
    goBack,
    handleNavigate,
  };
}

export default useNavigation;
