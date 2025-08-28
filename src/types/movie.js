/**
 * @typedef {Object} Movie
 * @property {boolean} adult - Indica se o filme é para adultos
 * @property {string|null} backdrop_path - Caminho para a imagem de fundo do filme
 * @property {number[]} genre_ids - IDs dos gêneros do filme
 * @property {number} id - ID único do filme
 * @property {string} original_language - Idioma original do filme
 * @property {string} original_title - Título original do filme
 * @property {string} overview - Sinopse do filme
 * @property {number} popularity - Popularidade do filme
 * @property {string|null} poster_path - Caminho para o poster do filme
 * @property {string} release_date - Data de lançamento do filme
 * @property {string} title - Título do filme
 * @property {boolean} video - Indica se é um vídeo
 * @property {number} vote_average - Média de votos
 * @property {number} vote_count - Número de votos
 */

/**
 * @typedef {Object} TMDBResponse
 * @property {number} page - Página atual
 * @property {Movie[]} results - Lista de filmes
 * @property {number} total_pages - Total de páginas disponíveis
 * @property {number} total_results - Total de resultados
 */

/**
 * @typedef {Object} MovieDetails
 * @property {boolean} adult - Indica se o filme é para adultos
 * @property {string|null} backdrop_path - Caminho para a imagem de fundo do filme
 * @property {Object} belongs_to_collection - Coleção à qual o filme pertence
 * @property {number} budget - Orçamento do filme
 * @property {Genre[]} genres - Gêneros do filme
 * @property {string|null} homepage - Página inicial do filme
 * @property {number} id - ID único do filme
 * @property {string|null} imdb_id - ID do IMDb
 * @property {string} original_language - Idioma original do filme
 * @property {string} original_title - Título original do filme
 * @property {string} overview - Sinopse do filme
 * @property {number} popularity - Popularidade do filme
 * @property {string|null} poster_path - Caminho para o poster do filme
 * @property {ProductionCompany[]} production_companies - Companhias de produção
 * @property {ProductionCountry[]} production_countries - Países de produção
 * @property {string} release_date - Data de lançamento do filme
 * @property {number} revenue - Receita do filme
 * @property {number} runtime - Duração do filme em minutos
 * @property {SpokenLanguage[]} spoken_languages - Idiomas falados
 * @property {string} status - Status do filme
 * @property {string} tagline - Tagline do filme
 * @property {string} title - Título do filme
 * @property {boolean} video - Indica se é um vídeo
 * @property {number} vote_average - Média de votos
 * @property {number} vote_count - Número de votos
 */

/**
 * @typedef {Object} Genre
 * @property {number} id - ID do gênero
 * @property {string} name - Nome do gênero
 */

/**
 * @typedef {Object} ProductionCompany
 * @property {number} id - ID da companhia
 * @property {string|null} logo_path - Caminho para o logo
 * @property {string} name - Nome da companhia
 * @property {string} origin_country - País de origem
 */

/**
 * @typedef {Object} ProductionCountry
 * @property {string} iso_3166_1 - Código ISO do país
 * @property {string} name - Nome do país
 */

/**
 * @typedef {Object} SpokenLanguage
 * @property {string} english_name - Nome em inglês
 * @property {string} iso_639_1 - Código ISO do idioma
 * @property {string} name - Nome do idioma
 */

/**
 * @typedef {Object} Credits
 * @property {CastMember[]} cast - Elenco do filme
 * @property {CrewMember[]} crew - Equipe do filme
 */

/**
 * @typedef {Object} CastMember
 * @property {boolean} adult - Indica se é adulto
 * @property {number} gender - Gênero (1=feminino, 2=masculino)
 * @property {number} id - ID do membro
 * @property {string} known_for_department - Departamento conhecido
 * @property {string} name - Nome do membro
 * @property {string} original_name - Nome original
 * @property {number} popularity - Popularidade
 * @property {string|null} profile_path - Caminho para a foto de perfil
 * @property {number} cast_id - ID no elenco
 * @property {string} character - Personagem interpretado
 * @property {string} credit_id - ID do crédito
 * @property {number} order - Ordem no elenco
 */

/**
 * @typedef {Object} CrewMember
 * @property {boolean} adult - Indica se é adulto
 * @property {number} gender - Gênero
 * @property {number} id - ID do membro
 * @property {string} known_for_department - Departamento conhecido
 * @property {string} job - Função
 * @property {string} name - Nome do membro
 * @property {string} original_name - Nome original
 * @property {number} popularity - Popularidade
 * @property {string|null} profile_path - Caminho para a foto de perfil
 * @property {string} credit_id - ID do crédito
 * @property {string} department - Departamento
 */

/**
 * @typedef {Object} FavoriteMovie
 * @property {number} id - ID do filme
 * @property {string} title - Título do filme
 * @property {string|null} poster_path - Caminho para o poster
 * @property {string} release_date - Data de lançamento
 * @property {number} vote_average - Média de votos
 * @property {string} overview - Sinopse
 * @property {number[]} genre_ids - IDs dos gêneros
 * @property {boolean} adult - Indica se é para adultos
 * @property {string} original_language - Idioma original
 * @property {string} original_title - Título original
 * @property {number} popularity - Popularidade
 * @property {string|null} backdrop_path - Caminho para a imagem de fundo
 * @property {boolean} video - Indica se é vídeo
 * @property {number} vote_count - Número de votos
 */

export default {};
