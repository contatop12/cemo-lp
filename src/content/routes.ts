// Slugs de primeiro nível ocupados por rotas estáticas (docs/information-architecture.md §1.7). Um post com um
// destes slugs ficaria inacessível: o teste de integridade falha antes do build.
export const RESERVED_ROOT_SLUGS = [
  'sobre',
  'contato',
  'convenios',
  'corpo-clinico',
  'especialidades',
  'exames',
  'tratamentos',
  'condicoes-oculares',
  'consulta-oftalmologica',
  'estrutura-e-tecnologia',
  'blog',
  'obrigado',
  'privacidade',
  'cookies',
  'lp',
  'category',
  'tag',
  'author',
  'api',
] as const;
