import type { ContentRepository } from '../index';
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
      return articles.slice(0, limit);
    },
    async getNavigation() {
      return navigation;
    },
  };
}
