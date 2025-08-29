# Views - Documentação das Interfaces

Este diretório contém as views da aplicação, seguindo as melhores práticas de Clean Code e Clean Architecture.

## 📁 Estrutura

## 📁 Estrutura Atualizada (2025)

```
src/views/
├── HomeView.jsx          # View principal da página inicial (memoizada)
├── HomeView.css          # Estilos da HomeView
├── HomeView.test.jsx     # Testes da HomeView
├── HomeView.modern.jsx   # Versão moderna (referência)
├── StateViews.jsx        # Componentes de estado (memoizados)
├── StateViews.css        # Estilos dos componentes de estado
├── constants.js          # Constantes centralizadas
└── README.md            # Esta documentação
```

## 🎯 Melhorias Implementadas (2025)

### 1. **Memoização e Performance**
- ✅ `React.memo` para evitar re-renders desnecessários
- ✅ `useCallback` para handlers estáveis
- ✅ `useMemo` para computações pesadas
- ✅ Otimização de performance em componentes

### 2. **Acessibilidade Aprimorada (a11y)**
- ✅ Atributos ARIA completos (`aria-label`, `aria-live`, `role`)
- ✅ Navegação por teclado aprimorada
- ✅ Screen reader support melhorado
- ✅ Semântica HTML correta

### 3. **Clean Code e Manutenibilidade**
- ✅ Constantes centralizadas em `constants.js`
- ✅ Funções utilitárias puras
- ✅ Separação clara de responsabilidades
- ✅ Documentação JSDoc completa

### 4. **Prevenção de Antipadrões**
- ✅ **Zero manipulação de prototype**
- ✅ Evitação de singletons mutáveis
- ✅ Props drilling minimizado
- ✅ Componentes pequenos e focados

### 5. **TypeScript Ready**
- ✅ Interfaces documentadas nos comentários
- ✅ Estrutura preparada para migração
- ✅ Type safety considerations
- ✅ Contratos explícitos

## 🎯 Princípios Implementados

### 1. Separação de Responsabilidades
- **Views**: Responsáveis apenas pela renderização e organização visual
- **Páginas**: Coordenam hooks e passam dados para as views
- **Hooks**: Gerenciam lógica de estado e efeitos colaterais

### 2. Contratos Explícitos
- Props bem tipadas com PropTypes
- Documentação JSDoc completa
- Interfaces claras entre componentes

### 3. Estados Consistentes
- Componentes especializados para cada estado (loading, error, empty)
- Hook `useViewState` para centralizar lógica de estados
- Mensagens contextuais e acessíveis

### 4. Acessibilidade (a11y)
- Atributos ARIA apropriados
- Navegação por teclado
- Screen reader support
- Semântica HTML correta

## 🧩 Componentes

### HomeView
**Responsabilidades:**
- Renderizar interface principal
- Organizar componentes de busca e filtros
- Gerenciar exibição condicional baseada em estados
- Coordenar paginação

**Props:**
```javascript
{
  query: string,              // Query de busca atual
  search: func,               // Handler para busca
  results: array,             // Resultados da busca/listagem
  loading: bool,              // Estado de carregamento
  error: Error,               // Erro ocorrido (opcional)
  page: number,               // Página atual
  nextPage: func,             // Handler para próxima página
  prevPage: func,             // Handler para página anterior
  totalPages: number,         // Total de páginas
  favorites: object,          // Objeto com filmes favoritos
  onToggleFavorite: func,     // Handler para alternar favorito
  onDetails: func,            // Handler para abrir detalhes
  category: string,           // Categoria selecionada
  onCategoryChange: func,     // Handler para mudança de categoria
  onNavigate: func,           // Handler para navegação
}
```

### StateViews
**Componentes especializados para estados:**

#### EmptyStateView
- Exibe mensagem amigável quando não há conteúdo
- Suporte a ícones e ações sugeridas
- Totalmente acessível

#### ErrorStateView
- Exibe erros de forma amigável
- Botão de retry opcional
- Design consistente com o tema

#### LoadingStateView
- Indicadores de carregamento
- Tamanhos configuráveis (small, medium, large)
- Mensagens personalizáveis

## 🎣 Hooks Utilizados

### useViewState
Centraliza lógica de estados da interface:

```javascript
const viewState = useViewState({
  items: results,
  loading,
  error,
  query,
});

// Retorna:
// {
//   type: 'success' | 'error' | 'loading' | 'empty',
//   hasItems: boolean,
//   isLoading: boolean,
//   isEmpty: boolean,
//   shouldShowHeader: boolean,
//   shouldShowPagination: boolean,
//   // ... outros campos contextuais
// }
```

### useViewActions
Gerencia handlers comuns:

```javascript
const { handleRetry, handleNavigate } = useViewActions({
  onRetry: () => search(query),
  onNavigate: (type, item) => navigate(type, item),
});
```

## 🎨 Padrões de Design

### Composição sobre Herança
```jsx
// ✅ Bom: Composição clara
<EmptyStateView
  title="Nenhum resultado"
  message="Tente outros termos"
  action={<Button onClick={retry}>Tentar novamente</Button>}
/>

// ❌ Ruim: Props booleanas excessivas
<EmptyStateView showAction showIcon hasCustomMessage />
```

### Renderização Condicional Baseada em Estado
```jsx
// ✅ Bom: Lógica centralizada no hook
{viewState.type === 'error' && <ErrorStateView error={viewState.error} />}
{viewState.type === 'empty' && <EmptyStateView title="Vazio" />}
{viewState.hasItems && <CardList items={results} />}

// ❌ Ruim: Lógica espalhada
{error && <div>Erro</div>}
{!error && !loading && results.length === 0 && <div>Vazio</div>}
{!error && results.length > 0 && <CardList />}
```

### Acessibilidade First
```jsx
// ✅ Bom: Semântica e ARIA
<section aria-label="Busca e filtros">
  <ErrorStateView error={error} /> {/* role="alert" automático */}
</section>

// ❌ Ruim: Semântica inadequada
<div>
  <div style={{color: 'red'}}>Erro!</div>
</div>
```

## 🧪 Testes

### Estratégia de Testes
- **Unitários**: Funções utilitárias e hooks
- **Integração**: Componentes com DOM
- **E2E**: Fluxos completos (Playwright/Cypress)

### Exemplos de Testes
```javascript
// Teste de estados
test('exibe estado vazio quando não há resultados', () => {
  render(<HomeView results={[]} loading={false} error={null} />);
  expect(screen.getByText('Nenhum filme encontrado')).toBeInTheDocument();
});

// Teste de acessibilidade
test('estado de erro tem atributos ARIA corretos', () => {
  render(<ErrorStateView error={new Error('Test')} />);
  expect(screen.getByRole('alert')).toBeInTheDocument();
});
```

## 🚀 Melhorias Futuras

### Features Planejadas
- [ ] Skeleton loaders para melhor UX de carregamento
- [ ] Infinite scroll como alternativa à paginação
- [ ] Filtros avançados com múltiplas categorias
- [ ] Modo offline com cache local

### Otimizações de Performance
- [ ] Virtualização para listas grandes
- [ ] Code splitting por rotas
- [ ] Service worker para cache
- [ ] Otimização de imagens (lazy loading)

### Acessibilidade
- [ ] Suporte a high contrast mode
- [ ] Navegação por voz
- [ ] Testes automatizados de a11y

## 📋 Checklist de Qualidade

- [x] PropTypes para todas as props
- [x] JSDoc completo
- [x] Testes automatizados
- [x] Acessibilidade (WCAG 2.1 AA)
- [x] Responsividade mobile-first
- [x] Performance otimizada
- [x] Documentação atualizada

## 🔗 Relacionamentos

- **Páginas**: `HomePage.jsx`, `FavoritesPage.jsx`, `MovieDetailPage.jsx`
- **Hooks**: `useMovies.js`, `useFavorites.js`, `useNavigation.js`
- **Componentes**: `CardList.jsx`, `SearchBar.jsx`, `CategorySelector.jsx`
- **Serviços**: `tmdb.js` (API de filmes)

---

*Esta documentação segue as melhores práticas definidas em `MELHORES_PRATICAS.md`*
