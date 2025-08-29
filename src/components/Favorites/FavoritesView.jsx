import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../CardList/CardList';
import { useFavorites } from '../../hooks/useFavorites';
import { prefetchMovieDetails } from '../../services/tmdb';
import './FavoritesView.css';

/**
 * Componente FavoritesView - Visualização da lista de filmes favoritos
 * Exibe os filmes favoritados pelo usuário com opção de remover e ver detalhes
 *
 * @param {Object} favorites - Objeto com filmes favoritos (opcional, usa contexto se não fornecido)
 * @param {Function} onToggleFavorite - Callback para alternar favorito (opcional)
 * @param {Function} onDetails - Callback para ver detalhes (opcional)
 */
export default function FavoritesView({ favorites: favProp, onToggleFavorite, onDetails }) {
  const navigate = useNavigate();
  const favoritesContext = useFavorites();

  // Usa props se fornecidas, senão usa contexto
  const toggleFavorite = onToggleFavorite || favoritesContext.toggleFavorite || (() => {});

  // Normaliza os dados dos filmes favoritos para formato consistente
  const normalizedMovies = useMemo(() => {
    // Usa props se fornecidas, senão usa contexto
    const favData =
      favProp && Object.keys(favProp).length ? favProp : favoritesContext.favorites || {};

    return Object.values(favData).map((movie) => ({
      id: movie.id,
      title: movie.title || movie.name || 'Sem título',
      poster_path: movie.poster_path || movie.poster || null,
      release_date: movie.release_date || movie.first_air_date || null,
      overview: movie.overview || movie.description || '',
      vote_average: movie.vote_average,
    }));
  }, [favProp, favoritesContext.favorites]);

  const [movies, setMovies] = useState(normalizedMovies);

  // Handler para navegação para detalhes do filme
  const handleNavigate = (type, film) => {
    if (type === 'detail' && film?.id) {
      navigate(`/movie/${film.id}`, { state: { film } });
    }
  };

  // Atualiza a lista quando os favoritos mudam
  useEffect(() => {
    setMovies(normalizedMovies);
  }, [normalizedMovies]);

  // Pre-fetch de overviews faltantes (não bloqueante)
  useEffect(() => {
    const moviesWithoutOverview = movies.filter((movie) => !movie.overview && movie.id);

    if (moviesWithoutOverview.length === 0) return;

    moviesWithoutOverview.forEach((movie) => {
      prefetchMovieDetails(movie.id)
        .then((data) => {
          if (!data) return;

          setMovies((prevMovies) =>
            prevMovies.map((prevMovie) =>
              prevMovie.id === movie.id
                ? { ...prevMovie, overview: prevMovie.overview || data.overview || '' }
                : prevMovie
            )
          );
        })
        .catch(() => {
          // Ignora erros de prefetch silenciosamente
        });
    });
  }, [movies]);

  // Estado vazio - nenhum favorito
  if (!movies || movies.length === 0) {
    return (
      <div className="tf-favorites-empty" role="status" aria-live="polite">
        <p>Você ainda não tem filmes favoritos.</p>
        <p>Adicione alguns filmes aos seus favoritos para vê-los aqui!</p>
      </div>
    );
  }

  return (
    <CardList
      items={movies}
      onToggleFavorite={toggleFavorite}
      onDetails={onDetails}
      onNavigate={handleNavigate}
      favorites={new Set(movies.map((movie) => movie.id))}
    />
  );
}
