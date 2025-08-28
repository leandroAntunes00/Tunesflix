# Tunesflix

Um aplicativo React para descobrir e gerenciar filmes favoritos, construído com Vite.

## Funcionalidades

- 🔍 Busca de filmes por título
- 📋 Lista de filmes populares
- ❤️ Sistema de favoritos
- 📱 Design responsivo
- 🎬 Modal com detalhes dos filmes

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
   Edite o `.env` com sua configuração da API.

4. Execute o projeto:
   ```bash
   npm run dev
   ```

## API

O projeto utiliza uma API customizada compatível com TMDB. Configure `VITE_API` no arquivo `.env` para apontar para sua instância da API.

### Endpoints utilizados:
- `GET /api/movies/search?q={query}&page={page}` - Busca de filmes
- `GET /api/movies/popular?page={page}` - Filmes populares
- `GET /api/movies/{id}` - Detalhes do filme

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm test` - Executa os testes
