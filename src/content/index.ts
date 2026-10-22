import { createFixturesRepository } from './adapters/fixtures';
import type {
  ArticleLink,
  Doctor,
  EditorialContent,
  EquipmentItem,
  InsurancePlan,
  LeadInterest,
  NavGroup,
  Service,
  SiteSettings,
  SiteStats,
  Testimonial,
  VideoItem,
} from './types';

// Contrato estável entre páginas/componentes e a fonte de conteúdo. Trocar fixtures por Sanity =
// novo adapter implementando esta interface, selecionado por CONTENT_SOURCE.
export interface ContentRepository {
  getSiteSettings(): Promise<SiteSettings>;
  getSiteStats(): Promise<SiteStats>;
  listDoctors(): Promise<Doctor[]>;
  getDoctorBySlug(slug: string): Promise<Doctor | null>;
  listServices(): Promise<Service[]>;
  listLeadInterests(): Promise<LeadInterest[]>;
  listInsurancePlans(): Promise<InsurancePlan[]>;
  listTestimonials(): Promise<Testimonial[]>;
  getVideo(id: 'tudo-em-um-lugar-so'): Promise<VideoItem>;
  listEquipment(): Promise<EquipmentItem[]>;
  getEditorial(id: 'catarata' | 'refrativa'): Promise<EditorialContent>;
  listFeaturedArticles(limit: number): Promise<ArticleLink[]>;
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
