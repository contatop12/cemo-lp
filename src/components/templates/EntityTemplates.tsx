import {
  DirectAnswer,
  JourneyBlock,
  OptionsBlock,
  ProseBlock,
  SignsBlock,
} from "@/components/page/ContentBlocks";
import { content } from "@/content";
import type {
  Condition,
  Exam,
  LeadInterestId,
  Specialty,
} from "@/content/types";
import { resolveRelated } from "@/lib/content/related";
import { buildMedicalWebPageNode, type JsonLdNode } from "@/lib/seo/jsonld";
import { MedicalPage, type MedicalBlock } from "./MedicalPage";

const HOME = { name: "Início", path: "/" };

async function reviewerOf(slug: string | null) {
  return slug ? content.getDoctorBySlug(slug) : null;
}

// O que a página descreve, em schema.org — conservador: só tipos semanticamente corretos (briefing §127).
function aboutSpecialty(s: Specialty): JsonLdNode {
  if (s.id === "catarata")
    return { "@type": "SurgicalProcedure", name: "Cirurgia de catarata" };
  if (s.id === "refrativa")
    return { "@type": "SurgicalProcedure", name: "Cirurgia refrativa" };
  if (s.kind === "tratamento")
    return { "@type": "MedicalProcedure", name: s.name };
  if (s.id === "glaucoma")
    return { "@type": "MedicalCondition", name: "Glaucoma" };
  return { "@type": "MedicalEntity", name: s.name };
}

export async function SpecialtyTemplate({
  specialty: s,
}: {
  specialty: Specialty;
}) {
  const [related, videos, reviewer, parent] = await Promise.all([
    resolveRelated(s.related),
    content.listVideos(s.videoIds),
    reviewerOf(s.review.medicalReviewerSlug),
    s.parentId ? content.getSpecialty(s.parentId) : Promise.resolve(null),
  ]);
  const settings = await content.getSiteSettings();

  const blocks: MedicalBlock[] = [
    {
      id: "resposta",
      label: s.answer.question,
      node: <DirectAnswer question={s.answer.question} text={s.answer.text} />,
    },
  ];
  if (s.signs)
    blocks.push({
      id: "sinais",
      label: s.signs.title,
      node: <SignsBlock {...s.signs} />,
    });
  const [firstHalf, secondHalf] = [
    s.sections.slice(0, Math.ceil(s.sections.length / 2)),
    s.sections.slice(Math.ceil(s.sections.length / 2)),
  ];
  for (const section of firstHalf)
    blocks.push({
      id: section.id,
      label: section.title,
      node: <ProseBlock section={section} />,
    });
  if (s.journey)
    blocks.push({
      id: "jornada",
      label: s.journey.title,
      node: <JourneyBlock {...s.journey} />,
    });
  if (s.options)
    blocks.push({
      id: "opcoes",
      label: s.options.title,
      node: <OptionsBlock {...s.options} />,
    });
  for (const section of secondHalf)
    blocks.push({
      id: section.id,
      label: section.title,
      node: <ProseBlock section={section} />,
    });

  const trail =
    s.kind === "consulta"
      ? [HOME, { name: s.shortName, path: s.canonicalPath }]
      : s.kind === "tratamento" && parent
        ? [
            HOME,
            { name: "Especialidades", path: "/especialidades/" },
            { name: parent.shortName, path: parent.canonicalPath },
            { name: s.shortName, path: s.canonicalPath },
          ]
        : [
            HOME,
            { name: "Especialidades", path: "/especialidades/" },
            { name: s.shortName, path: s.canonicalPath },
          ];

  return MedicalPage({
    path: s.canonicalPath,
    breadcrumbs: trail,
    title: s.h1,
    lead: s.lead,
    ctaLabel: s.ctaLabel,
    ctaTitle: s.ctaLabel,
    interest: s.leadInterest,
    formId: `pagina_${s.id.replace(/-/g, "_")}`,
    blocks: blocks,
    faq: s.faq,
    videos: videos,
    related: related,
    review: s.review,
    sources: s.review.sources,
    proof: s.id === "catarata" || s.id === "refrativa",
    pageNode: buildMedicalWebPageNode({
      path: s.canonicalPath,
      name: s.h1,
      description: s.seo.description,
      about: aboutSpecialty(s),
      review: s.review,
      reviewer,
      s: settings,
    }),
  });
}

export async function ExamTemplate({ exam: e }: { exam: Exam }) {
  const [related, videos, reviewer, settings] = await Promise.all([
    resolveRelated(e.related),
    content.listVideos(e.videoIds),
    reviewerOf(e.review.medicalReviewerSlug),
    content.getSiteSettings(),
  ]);
  const fields: Array<[keyof Exam, string, string]> = [
    ["purpose", "para-que-serve", "Para que serve"],
    ["whenRequested", "quando-e-solicitado", "Quando costuma ser solicitado"],
    ["howDone", "como-e-feito", "Como o exame é feito"],
    ["preparation", "preparo", "Preparo"],
    ["duration", "duracao", "Quanto tempo dura"],
    ["aftercare", "depois-do-exame", "Depois do exame"],
  ];
  const blocks: MedicalBlock[] = [
    {
      id: "resposta",
      label: e.answer.question,
      node: <DirectAnswer question={e.answer.question} text={e.answer.text} />,
    },
  ];
  for (const [key, id, title] of fields) {
    const paragraphs = e[key] as string[];
    if (paragraphs.length > 0)
      blocks.push({
        id,
        label: title,
        node: <ProseBlock section={{ id, title, paragraphs }} />,
      });
  }
  return MedicalPage({
    path: e.canonicalPath,
    breadcrumbs: [
      HOME,
      { name: "Exames", path: "/exames/" },
      { name: e.name, path: e.canonicalPath },
    ],
    title: e.h1,
    lead: e.lead,
    ctaLabel: "Agendar exame",
    ctaTitle: `Agende o exame de ${e.name.split(" (")[0]!.toLowerCase()}`,
    interest: "exames",
    formId: `exame_${e.id.replace(/-/g, "_")}`,
    blocks: blocks,
    faq: e.faq,
    videos: videos,
    related: related,
    review: e.review,
    sources: e.review.sources,
    pageNode: buildMedicalWebPageNode({
      path: e.canonicalPath,
      name: e.h1,
      description: e.seo.description,
      about: {
        "@type": "MedicalTest",
        name: e.name,
        ...(e.aka.length ? { alternateName: e.aka } : {}),
      },
      review: e.review,
      reviewer,
      s: settings,
    }),
  });
}

export async function ConditionTemplate({
  condition: c,
}: {
  condition: Condition;
}) {
  const [related, reviewer, settings, specialties] = await Promise.all([
    resolveRelated(c.related),
    reviewerOf(c.review.medicalReviewerSlug),
    content.getSiteSettings(),
    content.listSpecialties(),
  ]);
  // O formulário já vem com a área que trata a condição (primeira especialidade relacionada).
  const area = specialties.find((s) => c.related.specialties.includes(s.id));
  const interest: LeadInterestId = area?.leadInterest ?? "consulta";
  const blocks: MedicalBlock[] = [
    {
      id: "resposta",
      label: c.answer.question,
      node: <DirectAnswer question={c.answer.question} text={c.answer.text} />,
    },
  ];
  if (c.signs)
    blocks.push({
      id: "sinais",
      label: c.signs.title,
      node: <SignsBlock {...c.signs} />,
    });
  for (const section of c.sections)
    blocks.push({
      id: section.id,
      label: section.title,
      node: <ProseBlock section={section} />,
    });
  return MedicalPage({
    path: c.canonicalPath,
    breadcrumbs: [
      HOME,
      { name: "Condições oculares", path: "/condicoes-oculares/" },
      { name: c.name, path: c.canonicalPath },
    ],
    title: c.h1,
    lead: c.lead,
    ctaLabel: "Agendar avaliação",
    ctaTitle: "Agende uma avaliação com o oftalmologista",
    interest: interest,
    formId: `condicao_${c.id.replace(/-/g, "_")}`,
    blocks: blocks,
    faq: c.faq,
    videos: [],
    related: related,
    review: c.review,
    sources: c.review.sources,
    pageNode: buildMedicalWebPageNode({
      path: c.canonicalPath,
      name: c.h1,
      description: c.seo.description,
      about: { "@type": "MedicalCondition", name: c.name },
      review: c.review,
      reviewer,
      s: settings,
    }),
  });
}
