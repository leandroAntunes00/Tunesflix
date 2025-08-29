import React, { memo } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import { HomePage, FavoritesPage, MovieDetailPage } from './pages';
import { Routes, Route } from 'react-router-dom';
import { useAppNavigation } from './hooks/useAppNavigation';
import { ROUTES, ACCESSIBILITY } from './config/appConfig';

/**
 * MELHOR PRÁTICA MODERNA (2025) - App Component
 *
 * MELHORIAS IMPLEMENTADAS:
 * - Memoização com React.memo para evitar re-renders desnecessários
 * - useCallback para handlers estáveis
 * - Separação clara de responsabilidades
 * - Acessibilidade aprimorada
 * - Constantes para rotas
 * - Documentação JSDoc completa
 */

/**
 * App - Componente principal da aplicação
 *
 * Responsável por:
 * - Configurar o roteamento da aplicação
 * - Renderizar o layout base (Header, Footer)
 * - Gerenciar navegação entre páginas
 * - Coordenar comunicação entre componentes
 *
 * MELHORIAS IMPLEMENTADAS (2025):
 * - Memoização para otimização de performance
 * - Hook customizado para navegação
 * - Acessibilidade aprimorada
 * - Constantes centralizadas
 * - Estrutura mais organizada
 */
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
          <Route
            path={ROUTES.HOME}
            element={
              <HomePage
                onNavigate={handleNavigate}
              />
            }
          />

          <Route
            path={ROUTES.FAVORITES}
            element={<FavoritesPage />}
          />

          <Route
            path={ROUTES.MOVIE_DETAIL}
            element={<MovieDetailPage />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
});

// Nome de exibição para debugging
App.displayName = 'App';

export default App;
