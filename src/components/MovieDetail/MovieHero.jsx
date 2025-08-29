import React from 'react';
import { backdropImage } from '../../services/tmdb';
import './MovieHero.css';

/**
 * Componente MovieHero - Seção hero do filme com backdrop
 *
 * Exibe o título do filme sobre uma imagem de fundo (backdrop).
 * Responsável apenas pela apresentação visual do hero.
 *
 * @param {Object} movie - Dados do filme
 * @param {string} movie.title - Título do filme
 * @param {string} movie.name - Nome alternativo do filme
 * @param {string} movie.backdrop_path - Caminho da imagem de fundo
 */
export default function MovieHero({ movie }) {
  if (!movie) return null;

  const title = movie.title || movie.name || 'Título não disponível';

  return (
    <div
      className="tf-movie-hero"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${backdropImage(movie.backdrop_path)})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="tf-movie-hero__overlay" />
      <div className="tf-movie-hero__content">
        <h1 className="tf-movie-hero__title">{title}</h1>
      </div>
    </div>
  );
}
