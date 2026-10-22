// NAP central — única fonte de nome, endereço, telefone, WhatsApp e horários (SEO local: consistência absoluta).
import type { SiteSettings } from '../types';

export const siteSettings: SiteSettings = {
  name: 'CEMO – Centro de Microcirurgia Ocular',
  shortName: 'CEMO',
  siteUrl: 'https://oftalmologiacemo.com.br',
  address: {
    streetAddress: 'Rua Levi de Souza e Silva, 81',
    neighborhood: 'Centro',
    city: 'Taboão da Serra',
    region: 'SP',
    postalCode: '06763-170',
    country: 'BR',
  },
  phone: { display: '(11) 4788-3536', e164: '+551147883536' },
  whatsapp: { display: '(11) 94701-6162', e164: '+5511947016162', digits: '5511947016162' },
  email: 'sac@oftalmologiacemo.com.br',
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '18:00' },
    { days: ['Friday'], opens: '08:00', closes: '17:00' },
    { days: ['Saturday'], opens: '08:00', closes: '12:00' },
  ],
  social: {
    instagram: 'https://www.instagram.com/cemooftalmologia/',
    facebook: 'https://www.facebook.com/cemooftalmologia/',
  },
  googleBusiness: { profileUrl: null, reviewsUrl: null },
  externalExamOnlineUrl: 'https://cemo.sivoe.med.br',
  technicalResponsibleSlug: 'david-ribeiro-de-mendonca-filho',
  todos: [
    'TODO_CONTENT_VALIDATION: bairro — site atual diz "Centro", briefing diz "Jardim Bom Tempo"; alinhar com o Google Business Profile',
    'TODO_CONTENT_VALIDATION: URL do perfil e do link de avaliações do Google Business Profile',
    'TODO_CONTENT_VALIDATION: "Exame online" (cemo.sivoe.med.br) continua em uso?',
    'TODO_CONTENT_VALIDATION: confirmar horários e e-mail de atendimento',
  ],
};
