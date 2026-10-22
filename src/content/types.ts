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
  photo: ImageAsset | null;
  photoMobile?: ImageAsset;
  canonicalPath: string;
  published: boolean;
  featured: boolean;
  todos: string[];
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
  youtubeId: string | null;
  poster: ImageAsset | null;
  transcriptUrl: string | null;
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
