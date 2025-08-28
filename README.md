# Tunesflix

Um aplicativo React para descobrir e gerenciar filmes favoritos, construído com Vite.

## Funcionalidades

- 🔍 Busca de filmes por título
- 📋 Listas de filmes por categoria:
  - Populares
  - Mais Avaliados
  - Em Cartaz
- ❤️ Sistema de favoritos
- 📱 Design responsivo
- 🎬 Modal com detalhes completos dos filmes

## Arquitetura

O projeto utiliza uma arquitetura modular com hooks especializados:

### Hooks Principais

- `useMovies` - Hook principal que gerencia todas as categorias e buscas
- `usePopularMovies` - Gerencia filmes populares
- `useTopRatedMovies` - Gerencia filmes mais avaliados
- `useNowPlayingMovies` - Gerencia filmes em cartaz
- `useMovieSearch` - Gerencia buscas por texto
- `useMovieDetails` - Gerencia detalhes de filmes específicos

### API Endpoints

- `GET /api/movies/search?q={query}&page={page}` - Busca de filmes
- `GET /api/movies/popular?page={page}` - Filmes populares
- `GET /api/movies/top-rated?page={page}` - Filmes mais avaliados
- `GET /api/movies/now-playing?page={page}` - Filmes em cartaz
- `GET /api/movies/{id}` - Detalhes completos do filme

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   Edite o `.env` com sua configuração da API:

   ```env
   VITE_API=http://localhost:3000
   ```

4. Execute o projeto:
   ```bash
   npm run dev
   ```

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run test` - Executa os testes
