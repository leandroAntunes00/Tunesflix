# Componentes MovieDetail

Este diretório contém componentes especializados para a exibição de detalhes de filmes, seguindo princípios de separação de responsabilidades e reutilização.

## Estrutura dos Componentes

```
MovieDetail/
├── index.js           # Exportações centralizadas
├── MovieHero.jsx      # Seção hero com backdrop e título
├── MovieHero.css      # Estilos do hero
├── MoviePoster.jsx    # Poster do filme com fallback
├── MoviePoster.css    # Estilos do poster
├── MovieCast.jsx      # Lista de elenco
├── MovieCast.css      # Estilos do elenco
├── MovieInfo.jsx      # Informações do filme
├── MovieInfo.css      # Estilos das informações
├── Loading.jsx        # Componente de carregamento
├── Loading.css        # Estilos do loading
├── Error.jsx          # Componente de erro
└── Error.css          # Estilos do erro
```

## Componentes Principais

### MovieHero

- **Responsabilidade**: Exibir título sobre imagem de fundo
- **Props**: `movie` (com title, name, backdrop_path)
- **Características**: Gradiente para contraste, responsivo

### MoviePoster

- **Responsabilidade**: Exibir poster com fallback
- **Props**: `movie` (com poster_path, title)
- **Características**: Placeholder quando não há imagem

### MovieCast

- **Responsabilidade**: Listar membros do elenco
- **Props**: `credits` (com array cast)
- **Características**: Limita a 8 membros, layout flexível

### MovieInfo

- **Responsabilidade**: Exibir informações detalhadas
- **Props**: `movie` (overview, genres, runtime, vote_average)
- **Características**: Formatação automática de dados

### Loading & Error

- **Responsabilidade**: Estados de carregamento e erro
- **Características**: Reutilizáveis, acessíveis, customizáveis

## Padrões de Design

### 1. Separação de Responsabilidades

Cada componente tem uma responsabilidade única e bem definida.

### 2. Props Interface Consistente

```jsx
// Interface padronizada
{
  movie: { title, overview, poster_path, ... },
  credits: { cast: [...] },
  loading: boolean,
  error: Error
}
```

### 3. Estilos Isolados

- Cada componente tem seu próprio arquivo CSS
- Nomes de classe com prefixo `tf-movie-*`
- Responsividade integrada

### 4. Reutilização

Componentes podem ser usados em outras páginas ou contextos.

### 5. Acessibilidade

- ARIA labels apropriados
- Estrutura semântica
- Estados de loading e error anunciados

## Uso na MovieDetailPage

```jsx
import { MovieHero, MoviePoster, MovieCast, MovieInfo } from '../components/MovieDetail';

export default function MovieDetailPage() {
  // Lógica de carregamento...

  return (
    <article className="tf-movie-detail">
      <MovieHero movie={details} />
      <div className="tf-movie-detail__body">
        <MoviePoster movie={details} />
        <div className="tf-movie-detail__content">
          <MovieInfo movie={details} />
          <MovieCast credits={details.credits} />
        </div>
      </div>
    </article>
  );
}
```

## Benefícios da Refatoração

- **Manutenibilidade**: Cada componente é independente
- **Testabilidade**: Componentes isolados são mais fáceis de testar
- **Reutilização**: Componentes podem ser usados em outras páginas
- **Performance**: Menor bundle, carregamento sob demanda
- **Consistência**: Estilos e comportamento padronizados
