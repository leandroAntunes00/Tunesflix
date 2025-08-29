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

## Backend API

Este projeto frontend se conecta a uma API backend dedicada que fornece os dados dos filmes.

### 📡 **Servidor Backend**
**Repositório:** [server-tunesflix](https://github.com/leandroAntunes00/server-tunesflix)

O backend é responsável por:
- ✅ Consumir a API oficial do TMDB
- ✅ Processar e otimizar as respostas
- ✅ Implementar cache inteligente
- ✅ Fornecer endpoints REST padronizados
- ✅ Gerenciar rate limiting e autenticação

### 🔗 **Endpoints Utilizados**
- `GET /api/movies/search` - Busca de filmes
- `GET /api/movies/popular` - Filmes populares
- `GET /api/movies/top-rated` - Filmes mais avaliados
- `GET /api/movies/now-playing` - Filmes em cartaz
- `GET /api/movies/{id}` - Detalhes do filme

### 🚀 **Configuração da API**
Configure a URL do backend no arquivo `.env`:
```env
VITE_API=http://localhost:3000
```