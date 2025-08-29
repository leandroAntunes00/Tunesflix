import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getMovieDetails } from '../services/tmdb';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  MovieHero,
  MoviePoster,
  MovieCast,
  MovieInfo,
  Loading,
  Error,
} from '../components/MovieDetail';

function useMovieDetailsState(id, initialFilm) {
  const [details, setDetails] = useState(initialFilm || null);
  const [loading, setLoading] = useState(!initialFilm);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadMovieDetails() {
      if (!id) {
        setError(new Error('ID do filme não fornecido'));
        setLoading(false);
        return;
      }

      // Se já temos dados iniciais, não precisamos carregar
      if (initialFilm) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getMovieDetails(id);
        if (!mounted) return;

        setDetails(data);
      } catch (err) {
        if (!mounted) return;

        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao carregar detalhes do filme';
        setError(new Error(errorMessage));
        console.error('Erro ao carregar detalhes do filme:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMovieDetails();

    return () => {
      mounted = false;
    };
  }, [id, initialFilm]);

  return { details, loading, error };
}

export default function MovieDetailPage({ film: filmProp, onBack }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Determinar dados iniciais e ID do filme
  const initialFilm = filmProp || location.state?.film || null;
  const id = params.id || initialFilm?.id;

  // Hook personalizado para gerenciar estado de carregamento
  const { details, loading, error } = useMovieDetailsState(id, initialFilm);

  // Handler para navegação de volta
  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  }, [onBack, navigate]);

  return (
    <div className="tf-movie-detail-page">
      {/* Botão de voltar */}
      <button
        className="tf-btn tf-btn--ghost tf-movie-detail-page__back-btn"
        onClick={handleBack}
        aria-label="Voltar"
        type="button"
      >
        ← Voltar
      </button>

      {/* Estados de carregamento e erro */}
      {loading && <Loading message="Carregando detalhes do filme..." />}
      {error && <Error error={error} />}

      {/* Conteúdo principal */}
      {details && (
        <article className="tf-movie-detail">
          {/* Seção Hero */}
          <MovieHero movie={details} />

          {/* Corpo do artigo */}
          <div className="tf-movie-detail__body">
            {/* Poster */}
            <MoviePoster movie={details} />

            {/* Informações principais */}
            <div className="tf-movie-detail__content">
              <MovieInfo movie={details} />
              <MovieCast credits={details.credits} />
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

// Validação de props com PropTypes
MovieDetailPage.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    poster_path: PropTypes.string,
    backdrop_path: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }),
  onBack: PropTypes.func,
};

MovieDetailPage.defaultProps = {
  film: null,
  onBack: null,
};
