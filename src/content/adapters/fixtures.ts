import type { ContentRepository } from '../index';
import { articles } from '../fixtures/articles';
import { doctors } from '../fixtures/doctors';
import { editorial } from '../fixtures/editorial';
import { equipment } from '../fixtures/equipment';
import { insurancePlans } from '../fixtures/insurance-plans';
import { leadInterests } from '../fixtures/lead-interests';
import { services } from '../fixtures/services';
import { siteSettings } from '../fixtures/site-settings';
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
      return [...doctors].sort((a, b) => Number(b.featured) - Number(a.featured));
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
    async getVideo(id) {
      const video = videos.find((v) => v.id === id);
      if (!video) throw new Error(`Vídeo não encontrado: ${id}`);
      return video;
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
