import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import FavoritesView from './components/Favorites/FavoritesView';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useFavorites } from './hooks/useFavorites';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // obtain favorites-related actions from the hook
  const { reset, changeCategory } = useFavorites();

  const handleNavigate = (v) => {
    if (v === 'home') {
      reset();
      changeCategory('popular');
      navigate('/');
    } else if (v === 'favorites') {
      navigate('/favorites');
    }
  };

  // derive active tab from current location
  const active = location.pathname.startsWith('/favorites') ? 'favorites' : 'home';

  return (
    <>
      <Header onNavigate={handleNavigate} active={active} />

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
