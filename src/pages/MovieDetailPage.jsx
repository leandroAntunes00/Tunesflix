import React, { useEffect, useState } from 'react';
import './MovieDetailPage.css';
import { getMovieDetails, posterImage, backdropImage } from '../services/tmdb';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function MovieDetailPage({ film: filmProp, onBack }) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilm = filmProp || location.state?.film || null;
  const id = params.id || initialFilm?.id;

  const [details, setDetails] = useState(initialFilm || null);
  const [loading, setLoading] = useState(!initialFilm);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) {
        setError(new Error('ID do filme não fornecido'));
        setLoading(false);
        return;
      }

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
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [id, initialFilm]);

  return (
    <div className="app-container">
      <button
        className="tf-btn tf-btn--ghost"
        onClick={() => (onBack ? onBack() : navigate(-1))}
        aria-label="Voltar"
      >
        ← Voltar
      </button>

      {loading && <div>Carregando...</div>}
      {error && <div>Erro: {error.message}</div>}

      {details && (
        <article className="tf-detail">
          <div
            className="tf-detail__hero"
            style={{
              backgroundImage: details.backdrop_path ? `url(${backdropImage(details.backdrop_path)})` : 'none',
            }}
          >
            <div className="tf-detail__hero-inner">
              <h1>{details.title || details.name}</h1>
            </div>
          </div>

          <div className="tf-detail__body">
            <aside className="tf-detail__poster">
              {details.poster_path ? (
                <img src={posterImage(details.poster_path)} alt="poster" />
              ) : (
                <div className="tf-card__placeholder">Sem imagem</div>
              )}
            </aside>

            <div className="tf-detail__info">
              <p className="tf-detail__overview">{details.overview}</p>

              {details.credits && details.credits.cast && (
                <section>
                  <h3>Elenco</h3>
                  <ul className="tf-cast">
                    {details.credits.cast.slice(0, 8).map((c) => (
                      <li key={c.cast_id || c.credit_id}>{c.name} — {c.character}</li>
                    ))}
                  </ul>
                </section>
              )}

              <p><strong>Gêneros:</strong> {details.genres?.map(g => g.name).join(', ')}</p>
              <p><strong>Duração:</strong> {details.runtime ? details.runtime + ' min' : '—'}</p>
              <p><strong>Avaliação:</strong> {details.vote_average ? `${details.vote_average} / 10` : '—'}</p>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
