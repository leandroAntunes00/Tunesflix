import React from 'react';
import './MovieCast.css';

export default function MovieCast({ credits }) {
  if (!credits?.cast || credits.cast.length === 0) {
    return null;
  }

  const cast = credits.cast.slice(0, 8); // Limitar a 8 membros

  return (
    <section className="tf-movie-cast">
      <h3 className="tf-movie-cast__title">Elenco</h3>
      <ul className="tf-movie-cast__list">
        {cast.map((member) => (
          <li
            key={member.cast_id || member.credit_id || member.id}
            className="tf-movie-cast__member"
          >
            <span className="tf-movie-cast__name">{member.name}</span>
            <span className="tf-movie-cast__character">{member.character}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
