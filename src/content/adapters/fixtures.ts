import type { ContentRepository } from '../index';
import type { ArticleLink, Post, PostSummary } from '../types';
import postIndex from '../posts/index.json';
import { localDate } from '@/lib/dates';
import { articles } from '../fixtures/articles';
import { conditionLinks, conditions } from '../fixtures/conditions';
import { doctors } from '../fixtures/doctors';
import { editorial } from '../fixtures/editorial';
import { equipment } from '../fixtures/equipment';
import { exams } from '../fixtures/exams';
import { insurancePlans } from '../fixtures/insurance-plans';
import { leadInterests } from '../fixtures/lead-interests';
import { services } from '../fixtures/services';
import { siteSettings } from '../fixtures/site-settings';
import { specialties } from '../fixtures/specialties';
import { siteStats } from '../fixtures/stats';
import { testimonials } from '../fixtures/testimonials';
import { videos } from '../fixtures/videos';
import { navigation } from '../navigation';

const posts = postIndex as PostSummary[];

function toArticles(slugs: string[]): ArticleLink[] {
  return slugs.flatMap((slug) => {
    const p = posts.find((post) => post.slug === slug);
    return p
      ? [{ slug, title: p.title, href: `/${slug}/`, excerpt: p.excerpt, publishedAt: localDate(p.publishedAt), image: p.image }]
      : [];
  });
}

export function createFixturesRepository(): ContentRepository {
  return {
    async getSiteSettings() {
      return siteSettings;
    },
    async getSiteStats() {
      return siteStats;
    },
    async listDoctors() {
      return doctors.filter((d) => d.published).sort((a, b) => Number(b.featured) - Number(a.featured));
    },
    async getDoctorBySlug(slug) {
      return doctors.find((d) => d.slug === slug) ?? null;
    },
    async listServices() {
      return [...services].sort((a, b) => a.homeOrder - b.homeOrder);
    },
    async listLeadInterests() {
      return leadInterests;
    },
    async listInsurancePlans() {
      return insurancePlans;
    },
    async listTestimonials() {
      return testimonials;
    },
    async listVideos(ids) {
      if (!ids) return videos;
      return ids.map((id) => {
        const video = videos.find((v) => v.id === id);
        if (!video) throw new Error(`Vídeo não encontrado: ${id}`);
        return video;
      });
    },
    async getVideo(id) {
      const video = videos.find((v) => v.id === id);
      if (!video) throw new Error(`Vídeo não encontrado: ${id}`);
      return video;
    },
    async listSpecialties(options) {
      return options?.includeUnpublished ? specialties : specialties.filter((s) => s.published);
    },
    async getSpecialty(id) {
      return specialties.find((s) => s.id === id) ?? null;
    },
    async listExams() {
      return exams.filter((e) => e.published);
    },
    async getExam(id) {
      return exams.find((e) => e.id === id) ?? null;
    },
    async listConditions() {
      return conditions.filter((c) => c.published);
    },
    async getCondition(id) {
      return conditions.find((c) => c.id === id) ?? null;
    },
    async listConditionLinks() {
      return conditionLinks;
    },
    async listEquipment() {
      return equipment;
    },
    async getEditorial(id) {
      return editorial[id];
    },
    async listFeaturedArticles(limit) {
      // Curadoria da Home (posts de tráfego), com título, data e imagem vindos do post migrado.
      return toArticles(articles.map((a) => a.slug)).slice(0, limit);
    },
    async listPosts() {
      return posts;
    },
    async getPost(slug) {
      if (!posts.some((p) => p.slug === slug)) return null;
      // Lido do disco só durante o build (todas as rotas de post são estáticas): o HTML não entra no Worker.
      const [{ readFile }, { join }] = await Promise.all([import('node:fs/promises'), import('node:path')]);
      const raw = await readFile(join(process.cwd(), 'src/content/posts', `${slug}.json`), 'utf8');
      return JSON.parse(raw) as Post;
    },
    async listArticles(slugs) {
      return toArticles(slugs);
    },
    async getNavigation() {
      return navigation;
    },
  };
}
