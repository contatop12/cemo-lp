// Modelo de conteúdo. Nomes estáveis: todas as camadas (adapters, páginas, componentes) importam daqui.
// Campo `todos`: pendências de validação com a CEMO, sempre com o prefixo "TODO_CONTENT_VALIDATION:".

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHoursSpec {
  days: DayOfWeek[];
  opens: string; // 'HH:mm'
  closes: string; // 'HH:mm' (exclusivo)
}

export interface SiteSettings {
  name: string;
  shortName: string;
  siteUrl: string;
  address: {
    streetAddress: string;
    neighborhood: string;
    city: string;
    region: string;
    postalCode: string;
    country: 'BR';
  };
  phone: { display: string; e164: string };
  whatsapp: { display: string; e164: string; digits: string };
  email: string;
  hours: OpeningHoursSpec[];
  social: { instagram: string; facebook: string };
  googleBusiness: { profileUrl: string | null; reviewsUrl: string | null };
  externalExamOnlineUrl: string | null;
  technicalResponsibleSlug: string;
  todos: string[];
}

export interface SiteStats {
  googleRating: { score: number; display: string; reviewsLabel: string; validated: boolean };
  yearsOfActivity: { display: string; label: string; validated: boolean };
  patientsServed: { display: string; label: string; validated: boolean };
  todos: string[];
}

export interface Doctor {
  slug: string;
  name: string;
  honorific: 'Dr.' | 'Dra.';
  crm: string;
  rqe: string | null;
  role: string | null;
  areas: string[];
  credentials: string[];
  /** Retrato recortado (fundo removido), 4:5, usado em cards e perfis. */
  photo: ImageAsset | null;
  photoMobile?: ImageAsset;
  /** Parágrafos de apresentação — só fatos já publicados pela CEMO; o resto fica em `todos`. */
  bio: string[];
  /** Ids de especialidades/serviços (Specialty.id) em que atua — alimenta links recíprocos. */
  specialtyIds: string[];
  videoIds: string[];
  canonicalPath: string;
  published: boolean;
  featured: boolean;
  todos: string[];
}

// ---------- Workflow de conteúdo médico (briefing §76) ----------

export type ReviewStatus = 'DRAFT' | 'MEDICAL_REVIEW' | 'APPROVED' | 'PUBLISHED';

export interface SourceRef {
  label: string;
  url: string;
}

export interface MedicalReview {
  status: ReviewStatus;
  /** Quem redigiu (ex.: "Equipe editorial CEMO"). */
  author: string;
  /** Slug do médico revisor; null enquanto não revisado. */
  medicalReviewerSlug: string | null;
  /** ISO (AAAA-MM-DD) da revisão médica; null enquanto não revisado. */
  reviewedAt: string | null;
  /** ISO da última mudança substantiva do texto. */
  updatedAt: string;
  sources: SourceRef[];
}

export interface FaqItem {
  question: string;
  answer: string[];
}

export interface ProseSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface JourneyStep {
  title: string;
  text: string;
}

export interface OptionItem {
  name: string;
  text: string;
}

export interface SeoFields {
  title: string;
  description: string;
}

export interface Related {
  doctors: string[];
  specialties: string[];
  exams: string[];
  conditions: string[];
  /** Slugs de posts do blog. */
  articles: string[];
}

/** Especialidades, serviços (lentes de contato), consulta e tratamentos (crosslinking etc.). */
export interface Specialty {
  id: string;
  kind: 'especialidade' | 'servico' | 'consulta' | 'tratamento';
  name: string;
  /** Rótulo curto para menus e cards. */
  shortName: string;
  canonicalPath: string;
  /** Tratamento: especialidade-mãe (breadcrumb e links). */
  parentId?: string;
  /** Tratamento: cirurgia ou procedimento não cirúrgico (agrupa o hub e o menu). */
  treatmentType?: 'cirurgia' | 'procedimento';
  published: boolean;
  seo: SeoFields;
  h1: string;
  lead: string;
  /** Resumo de 1 frase para hubs, cards e relacionados. */
  summary: string;
  leadInterest: LeadInterestId;
  ctaLabel: string;
  /** Resposta direta (40–100 palavras) à pergunta principal da página (briefing §80). */
  answer: { question: string; text: string };
  signs?: { title: string; intro: string; items: string[] };
  sections: ProseSection[];
  journey?: { title: string; intro?: string; steps: JourneyStep[] };
  options?: { title: string; intro: string; items: OptionItem[]; note?: string };
  faq: FaqItem[];
  related: Related;
  videoIds: string[];
  review: MedicalReview;
  todos: string[];
}

/** Template de exame (briefing §26). */
export interface Exam {
  id: string;
  name: string;
  /** Outros nomes pelos quais o exame é buscado. */
  aka: string[];
  canonicalPath: string;
  published: boolean;
  seo: SeoFields;
  h1: string;
  lead: string;
  summary: string;
  answer: { question: string; text: string };
  purpose: string[];
  whenRequested: string[];
  howDone: string[];
  preparation: string[];
  duration: string[];
  aftercare: string[];
  faq: FaqItem[];
  related: Related;
  videoIds: string[];
  review: MedicalReview;
  todos: string[];
}

/** Condição ocular evergreen (organiza a entidade; artigos respondem perguntas específicas). */
export interface Condition {
  id: string;
  name: string;
  canonicalPath: string;
  published: boolean;
  seo: SeoFields;
  h1: string;
  lead: string;
  summary: string;
  answer: { question: string; text: string };
  signs?: { title: string; intro: string; items: string[] };
  sections: ProseSection[];
  faq: FaqItem[];
  related: Related;
  review: MedicalReview;
  todos: string[];
}

/** Página institucional listada no hub de condições, mas que mora num post (presbiopia etc.). */
export interface ConditionLink {
  id: string;
  name: string;
  summary: string;
  href: string;
}

export interface PostImage extends ImageAsset {
  /** URL original no WordPress (preservada em /wp-content/uploads/...). */
  original: string;
}

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  image: PostImage | null;
  topics: string[];
  /** Entidade comercial para o link contextual e o CTA do fim do post. */
  entity: { kind: 'specialty' | 'exam' | 'condition' | 'home'; id: string } | null;
  readingMinutes: number;
}

export interface Post extends PostSummary {
  /** HTML sanitizado na migração (lista branca de tags), links internos já no destino final. */
  html: string;
}

export type ServiceId =
  | 'consulta'
  | 'catarata'
  | 'refrativa'
  | 'retina'
  | 'glaucoma'
  | 'cornea'
  | 'oftalmopediatria'
  | 'exames';

export interface Service {
  id: ServiceId;
  title: string;
  summary: string;
  href: string;
  ctaLabel: string;
  homeOrder: number;
  /** Tamanho na tabela de leitura da Home: 1 = maior (prioridade comercial). */
  emphasis: 1 | 2 | 3;
}

export const LEAD_INTEREST_IDS = [
  'consulta',
  'catarata',
  'refrativa',
  'retina',
  'glaucoma',
  'cornea',
  'oftalmopediatria',
  'estrabismo',
  'plastica-ocular',
  'lentes-de-contato',
  'exames',
  'convenios',
  'outro',
] as const;

export type LeadInterestId = (typeof LEAD_INTEREST_IDS)[number];

export interface LeadInterest {
  id: LeadInterestId;
  label: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  logo: ImageAsset | null;
  todos: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
  sourceUrl: string;
}

export interface VideoItem {
  id: string;
  title: string;
  /** Resumo editorial (1–2 frases) — também vai para o VideoObject. */
  description: string;
  speakerName: string;
  /** Slug do médico que fala, quando o perfil existe. */
  speakerSlug: string | null;
  /** MP4 H.264 (compatível com tudo, inclusive Safari/iPhone), servido do R2 por /v/. */
  src: string;
  /** WebM AV1 (~40% menor) para navegadores que tocam AV1; o MP4 fica como alternativa. */
  srcAv1: string;
  poster: ImageAsset;
  orientation: 'vertical' | 'horizontal';
  durationSeconds: number;
  /** ISO (AAAA-MM-DD): data em que o arquivo foi entregue pela CEMO (Drive). */
  uploadDate: string;
  /** Legenda WebVTT; null quando o vídeo já tem legenda aberta (queimada na imagem). */
  captionsSrc: string | null;
  /** Transcrição editada (parágrafos), exibida em <details> abaixo do vídeo. */
  transcript: string[];
  todos: string[];
}

export interface ArticleLink {
  slug: string;
  title: string;
  href: string;
  excerpt: string | null;
  publishedAt: string;
  image: ImageAsset | null;
}

export interface EquipmentItem {
  id: string;
  photo: ImageAsset;
  caption: string;
  objectPosition: string;
  todos: string[];
}

export interface EditorialContent {
  id: 'catarata' | 'refrativa';
  heading: string;
  paragraphs: string[];
  bullets: string[];
  ctaLabel: string;
  href: string;
  todos: string[];
}

export interface NavLink {
  label: string;
  href: string;
  published?: boolean;
  external?: boolean;
}

export interface NavGroup {
  id: 'especialidades' | 'cirurgias' | 'exames' | 'corpo-clinico' | 'conteudos' | 'a-cemo';
  label: string;
  kind: 'mega' | 'dropdown' | 'link';
  href?: string;
  links: NavLink[];
  viewAll?: NavLink;
  featured?: NavLink;
}
