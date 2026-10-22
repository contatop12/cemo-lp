// Cards "Como podemos cuidar da sua visão?" — URLs canônicas de docs/information-architecture.md.
import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'consulta',
    title: 'Consulta Oftalmológica',
    summary: 'Avaliação completa da saúde dos seus olhos, com orientação clara sobre os próximos passos.',
    href: '/consulta-oftalmologica/',
    ctaLabel: 'Conhecer a consulta',
    homeOrder: 1,
  },
  {
    id: 'catarata',
    title: 'Catarata',
    summary: 'Da avaliação à cirurgia, com acompanhamento em cada etapa do tratamento.',
    href: '/especialidades/catarata/',
    ctaLabel: 'Saber mais sobre catarata',
    homeOrder: 2,
  },
  {
    id: 'refrativa',
    title: 'Cirurgia Refrativa',
    summary: 'Correção de miopia, astigmatismo e hipermetropia quando há indicação médica.',
    href: '/especialidades/refrativa/',
    ctaLabel: 'Saber mais sobre cirurgia refrativa',
    homeOrder: 3,
  },
  {
    id: 'retina',
    title: 'Retina',
    summary: 'Diagnóstico e acompanhamento das condições da retina e da mácula.',
    href: '/especialidades/retina/',
    ctaLabel: 'Saber mais sobre retina',
    homeOrder: 4,
  },
  {
    id: 'glaucoma',
    title: 'Glaucoma',
    summary: 'Exames e acompanhamento contínuo para proteger o nervo óptico.',
    href: '/especialidades/glaucoma/',
    ctaLabel: 'Saber mais sobre glaucoma',
    homeOrder: 5,
  },
  {
    id: 'cornea',
    title: 'Córnea e Ceratocone',
    summary: 'Avaliação e tratamento das doenças da córnea, incluindo o ceratocone.',
    href: '/especialidades/cornea/',
    ctaLabel: 'Saber mais sobre córnea',
    homeOrder: 6,
  },
  {
    id: 'oftalmopediatria',
    title: 'Oftalmologia Infantil',
    summary: 'Cuidado com a visão das crianças, do primeiro exame ao acompanhamento.',
    href: '/especialidades/oftalmopediatria/',
    ctaLabel: 'Saber mais sobre oftalmologia infantil',
    homeOrder: 7,
  },
  {
    id: 'exames',
    title: 'Exames',
    summary: 'Exames oftalmológicos realizados na própria clínica, com orientação sobre o preparo.',
    href: '/exames/',
    ctaLabel: 'Ver exames',
    homeOrder: 8,
  },
];
