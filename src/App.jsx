import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import FavoritesView from './components/Favorites/FavoritesView';
import HomePage from './pages/HomePage';

// Removed internal favorites logic
import { useFavorites } from './hooks/useFavorites';

function App() {
  const [view, setView] = useState('home');

  // obtain favorites-related actions from the hook
  const { reset, changeCategory } = useFavorites();

  return (
    <>
      <Header
        onNavigate={(v) => {
          setView(v);
          if (v === 'home') {
            // limpar query e carregar lista padrão (populares)
            reset();
            changeCategory('popular');
          }
        }}
        active={view}
      />


      <main className="tf-main">
        {view === 'home' && <HomePage />}

        {view === 'favorites' && (
          <section>
            <h2>Favoritos</h2>
            <FavoritesView />
          </section>
        )}
      </main>

  <Footer />
    </>
  );
}

export default App;
