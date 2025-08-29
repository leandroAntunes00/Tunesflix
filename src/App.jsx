import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import { HomePage, FavoritesPage, MovieDetailPage } from './pages';
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

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
