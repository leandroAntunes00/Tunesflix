import React, { memo } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import { HomePage, FavoritesPage, MovieDetailPage } from './pages';
import { Routes, Route } from 'react-router-dom';
import { useAppNavigation } from './hooks/useAppNavigation';
import { ROUTES, ACCESSIBILITY } from './config/appConfig';

const App = memo(() => {
  // Hook customizado para navegação
  const { handleNavigate } = useAppNavigation();

  return (
    <>
      <Header />

      <main
        className="tf-main"
        role={ACCESSIBILITY.ROLES.MAIN}
        aria-label={ACCESSIBILITY.LABELS.MAIN_CONTENT}
      >
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage onNavigate={handleNavigate} />} />

          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />

          <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetailPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
});

export default App;
