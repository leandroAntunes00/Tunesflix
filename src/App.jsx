import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import FavoritesView from './components/Favorites/FavoritesView';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main className="tf-main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onNavigate={(type, film) => {
                  if (type === 'detail') {
                    navigate(`/movie/${film.id}`, { state: { film } });
                  }
                }}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <section>
                <h2>Favoritos</h2>
                <FavoritesView />
              </section>
            }
          />

          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
