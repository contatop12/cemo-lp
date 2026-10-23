import { createFixturesRepository } from './adapters/fixtures';
import type {
  ArticleLink,
  Condition,
  ConditionLink,
  Doctor,
  Exam,
  Post,
  PostSummary,
  EditorialContent,
  EquipmentItem,
  InsurancePlan,
  LeadInterest,
  NavGroup,
  Service,
  SiteSettings,
  SiteStats,
  Specialty,
  Testimonial,
  VideoItem,
} from './types';

// Contrato estável entre páginas/componentes e a fonte de conteúdo. Trocar fixtures por Sanity =
// novo adapter implementando esta interface, selecionado por CONTENT_SOURCE.
export interface ContentRepository {
  getSiteSettings(): Promise<SiteSettings>;
  getSiteStats(): Promise<SiteStats>;
  /** Só perfis publicados, Dr. David (featured) primeiro. */
  listDoctors(): Promise<Doctor[]>;
  /** Qualquer médico (publicado ou não) — a página decide o que fazer com `published`. */
  getDoctorBySlug(slug: string): Promise<Doctor | null>;
  listServices(): Promise<Service[]>;
  listLeadInterests(): Promise<LeadInterest[]>;
  listInsurancePlans(): Promise<InsurancePlan[]>;
  listTestimonials(): Promise<Testimonial[]>;
  listVideos(ids?: string[]): Promise<VideoItem[]>;
  getVideo(id: string): Promise<VideoItem>;
  /** Publicadas, na ordem do menu. `includeUnpublished` só para checagens internas. */
  listSpecialties(options?: { includeUnpublished?: boolean }): Promise<Specialty[]>;
  getSpecialty(id: string): Promise<Specialty | null>;
  listExams(): Promise<Exam[]>;
  getExam(id: string): Promise<Exam | null>;
  listConditions(): Promise<Condition[]>;
  getCondition(id: string): Promise<Condition | null>;
  listConditionLinks(): Promise<ConditionLink[]>;
  listEquipment(): Promise<EquipmentItem[]>;
  getEditorial(id: 'catarata' | 'refrativa'): Promise<EditorialContent>;
  listFeaturedArticles(limit: number): Promise<ArticleLink[]>;
  /** Posts migrados (resumos), mais novos primeiro. */
  listPosts(): Promise<PostSummary[]>;
  /** Post completo (HTML sanitizado) ou null. Só no build: os posts são páginas estáticas. */
  getPost(slug: string): Promise<Post | null>;
  /** Cartões de artigo para os slugs pedidos, na ordem; slugs desconhecidos são ignorados. */
  listArticles(slugs: string[]): Promise<ArticleLink[]>;
  getNavigation(): Promise<NavGroup[]>;
}

function createRepository(): ContentRepository {
  const source = process.env.CONTENT_SOURCE ?? 'fixtures';
  switch (source) {
    case 'fixtures':
      return createFixturesRepository();
    default:
      throw new Error(`CONTENT_SOURCE não suportado: ${source}`);
  }
}

export const content: ContentRepository = createRepository();
