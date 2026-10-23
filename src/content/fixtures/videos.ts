// Vídeos entregues pela CEMO (Drive), versões web geradas por scripts/encode-videos.mjs. Transcrições revisadas a
// partir do Whisper (medium) — trechos incompreensíveis ficam marcados como [inaudível], nunca adivinhados.
// uploadDate = data de criação do arquivo no Drive. Duração = ffprobe da versão web.
import type { ImageAsset, VideoItem } from '../types';

const COMPLIANCE_TODO =
  'TODO_CONTENT_VALIDATION: revisão de compliance (Resolução CFM 2.336/2023) das falas antes da produção';

function poster(id: string, alt: string): ImageAsset {
  return { src: `/videos/${id}-poster.jpg`, width: 540, height: 960, alt };
}

export const videos: VideoItem[] = [
  {
    id: 'tudo-em-um-lugar-so',
    title: 'Consulta, especialista e exames no mesmo lugar',
    description:
      'O Dr. David explica como funciona o atendimento no CEMO: a avaliação já é feita com o especialista da área e os exames acontecem no mesmo dia.',
    speakerName: 'Dr. David Ribeiro de Mendonça Filho',
    speakerSlug: 'david-ribeiro-de-mendonca-filho',
    src: '/videos/tudo-em-um-lugar-so.mp4',
    poster: poster('tudo-em-um-lugar-so', 'Dr. David sentado à mesa do consultório, de jaleco'),
    orientation: 'vertical',
    durationSeconds: 65,
    uploadDate: '2026-04-08',
    captionsSrc: '/videos/tudo-em-um-lugar-so.vtt',
    transcript: [
      'Quero falar com você que está precisando de uma avaliação oftalmológica, que não está enxergando tão bem: o braço está ficando curto, a visão de longe, para ver placa de trânsito e legenda de TV, está embaçando.',
      'Eu sou o Dr. David, especialista em cirurgia refrativa aqui do CEMO, Centro de Microcirurgia Ocular, em Taboão da Serra. A gente tem hoje uma clínica completa, com todas as especialidades da oftalmologia, prontas para te atender, tanto com profissionais capacitados para cada especialidade quanto com equipamentos de ponta, ímpares na nossa região, aqui dentro da nossa clínica.',
      'Você já passa na avaliação com o especialista certo para o que você precisa e já faz os exames no mesmo momento. Não precisa ficar voltando dia após dia. Isso agiliza muito o diagnóstico, o tratamento e o procedimento.',
      'Então, se você está precisando de uma avaliação em uma clínica completa, marque aqui conosco. Será um prazer atender você.',
    ],
    todos: [COMPLIANCE_TODO, 'TODO_CONTENT_VALIDATION: "equipamentos de ponta, ímpares na nossa região" é alegação comparativa — avaliar corte'],
  },
  {
    id: 'especialidades',
    title: 'As especialidades do CEMO',
    description:
      'O Dr. David apresenta as áreas atendidas no CEMO: cirurgia refrativa, catarata, retina, plástica ocular, glaucoma, estrabismo e oftalmopediatria.',
    speakerName: 'Dr. David Ribeiro de Mendonça Filho',
    speakerSlug: 'david-ribeiro-de-mendonca-filho',
    src: '/videos/especialidades.mp4',
    poster: poster('especialidades', 'Dr. David falando à câmera no consultório'),
    orientation: 'vertical',
    durationSeconds: 35,
    uploadDate: '2026-04-08',
    captionsSrc: '/videos/especialidades.vtt',
    transcript: [
      'Você que está precisando de uma especialidade dentro da oftalmologia: aqui no CEMO a gente tem a cirurgia refrativa, aquela que tira os óculos com laser; a cirurgia de catarata, que tira o cristalino e implanta a lente dentro do seu olho; a parte de retina, tanto clínica quanto cirúrgica, com injeções, com laser, com cirurgias de retina; a parte de plástica ocular, em que fazemos plástica e botox; a parte de glaucoma, em que a gente faz os lasers modernos para o tratamento de glaucoma; a parte de estrabismo, de oftalmopediatria, de tumores, esse tipo de coisa.',
      'Então marque a sua avaliação com a gente.',
    ],
    todos: [COMPLIANCE_TODO],
  },
  {
    id: 'exames-que-realizamos',
    title: 'Exames que o CEMO realiza',
    description:
      'O Dr. David cita exames feitos na clínica, como topografia de córnea, biometria, microscopia especular, tomografia de coerência óptica e campo visual.',
    speakerName: 'Dr. David Ribeiro de Mendonça Filho',
    speakerSlug: 'david-ribeiro-de-mendonca-filho',
    src: '/videos/exames-que-realizamos.mp4',
    poster: poster('exames-que-realizamos', 'Dr. David explicando os exames, sentado à mesa'),
    orientation: 'vertical',
    durationSeconds: 56,
    uploadDate: '2026-04-08',
    captionsSrc: '/videos/exames-que-realizamos.vtt',
    transcript: [
      'Quero falar com você que acabou de sair da consulta com o seu oftalmologista e ele solicitou alguns exames complementares para melhorar o seu diagnóstico e ajudar no seu tratamento.',
      'Aqui no CEMO a gente tem a maioria dos principais exames, com aparelhos novos e de bastante qualidade, para auxiliar o seu médico na tomada de decisão quanto à sua patologia. Por exemplo: topografia de córnea; a biometria com Lenstar, uma das mais modernas hoje para o cálculo da lente na cirurgia de catarata; a microscopia especular; a tomografia de coerência óptica; o campo visual para glaucoma; o YAG laser, com que a gente faz a limpeza das lentes e o tratamento de glaucoma, e outros mais.',
      'Entre no nosso site e marque a sua avaliação. Será um prazer atender você.',
    ],
    todos: [COMPLIANCE_TODO],
  },
  {
    id: 'dr-adriano-catarata',
    title: 'Catarata: quando procurar avaliação',
    description:
      'O Dr. Adriano fala sobre a visão embaçada depois dos 50 anos, os exames de diagnóstico e como é a cirurgia de catarata no centro cirúrgico.',
    speakerName: 'Dr. Adriano de Morais Ferreira',
    speakerSlug: 'adriano-de-morais-ferreira',
    src: '/videos/dr-adriano-catarata.mp4',
    poster: poster('dr-adriano-catarata', 'Dr. Adriano de roupa cirúrgica, no centro cirúrgico do CEMO'),
    orientation: 'vertical',
    durationSeconds: 48,
    uploadDate: '2026-04-08',
    captionsSrc: '/videos/dr-adriano-catarata.vtt',
    transcript: [
      'Olá, você que tem 50 anos ou mais e está com a visão embaçada, saiba que isso pode ser catarata.',
      'Aqui no CEMO, a gente tem médicos especialistas na cirurgia de catarata e um centro de diagnóstico moderno, com exames complementares para o correto diagnóstico da doença.',
      'A cirurgia de catarata é feita em ambiente de centro cirúrgico. A anestesia é local, com sedação, e o efeito para o paciente é magnífico: o paciente melhora a qualidade de vida, enxerga a vida de uma forma mais nítida, a visão melhora e o paciente melhora inclusive a autoestima.',
      'Então, se você tem 50 anos ou mais, visão embaçada, [inaudível], a gente pode fazer o correto diagnóstico e prosseguir para [inaudível] e melhorar a sua vida.',
    ],
    todos: [
      COMPLIANCE_TODO,
      'TODO_CONTENT_VALIDATION: confirmar com a CEMO os dois trechos [inaudível] da fala do Dr. Adriano',
      'TODO_CONTENT_VALIDATION: confirmar a identidade do Dr. Adriano do vídeo (Adriano de Morais Ferreira?)',
    ],
  },
  {
    id: 'dr-david-oculos',
    title: 'Por que o Dr. David usa óculos?',
    description:
      'O Dr. David conta por que não fez cirurgia refrativa: tem presbiopia e uma contraindicação, e explica que cada olho tem a técnica adequada no momento certo.',
    speakerName: 'Dr. David Ribeiro de Mendonça Filho',
    speakerSlug: 'david-ribeiro-de-mendonca-filho',
    src: '/videos/dr-david-oculos.mp4',
    poster: poster('dr-david-oculos', 'Dr. David sentado em cadeira de consultório, respondendo a perguntas'),
    orientation: 'vertical',
    durationSeconds: 97,
    uploadDate: '2025-11-06',
    captionsSrc: '/videos/dr-david-oculos.vtt',
    transcript: [
      'Oi, pessoal, eu sou o Dr. David, aqui do CEMO, especialista em cirurgia refrativa, e vim responder umas dúvidas e comentários de alguns vídeos. Por que eu uso óculos se eu opero para tirar os óculos?',
      'Eu não uso óculos para longe, eu enxergo ótimo para longe. Mas, por ser um pouco mais maduro, tenho aquela dificuldade que é a presbiopia, a dificuldade de enxergar de perto. Então eu uso um grau para perto e não tenho nada para longe.',
      'No meu caso, a cirurgia refrativa não vai corrigir o que seria necessário para a minha atividade do dia a dia. Meu olho não aceita um laser que seja seguro para mim: eu tenho uma contraindicação para a cirurgia refrativa, então prefiro não operar.',
      'No futuro, quando eu tiver um pouco mais de idade, daqui a uma década, talvez duas, eu consigo fazer a cirurgia de catarata com implante de lente trifocal e ter esse conforto, essa liberdade. Mas é um dia de cada vez, e para cada momento a gente tem a técnica cirúrgica adequada e segura para cada olho.',
      'Por isso vocês vão me ver um dia de óculos, um dia sem óculos. Ainda não tenho indicação de cirurgia. Obrigado a todos.',
    ],
    todos: [COMPLIANCE_TODO],
  },
  {
    id: 'dra-daniele-calazio',
    title: 'Calázio: o carocinho na pálpebra',
    description:
      'A Dra. Danielle Longo explica o que é o calázio, como ele pode atrapalhar a visão e como é avaliada a indicação de cirurgia.',
    speakerName: 'Dra. Danielle Longo',
    speakerSlug: null,
    src: '/videos/dra-daniele-calazio.mp4',
    poster: poster('dra-daniele-calazio', 'Dra. Danielle Longo falando à câmera'),
    orientation: 'vertical',
    durationSeconds: 48,
    uploadDate: '2025-09-30',
    captionsSrc: null,
    transcript: [
      'Você teve alguma bolinha na pálpebra que inflamou, inchou e depois desinchou, e ficou um carocinho residual? Isso pode ser o calázio. Muitas vezes ele aparece na pálpebra superior, mas também pode surgir na inferior, e às vezes atrapalha a visão: a pálpebra pesa e o olhar fica mais caído. Pode também atrapalhar na hora da maquiagem.',
      'Esse calázio a gente consegue resolver aqui com uma cirurgia simples e eficaz. Eu sou a Dra. Danielle, oftalmologista especialista em plástica ocular. Agende sua avaliação aqui no CEMO para identificarmos se é realmente um calázio e darmos prosseguimento ao tratamento.',
    ],
    todos: [COMPLIANCE_TODO, 'TODO_CONTENT_VALIDATION: "cirurgia simples e eficaz" — avaliar corte da fala'],
  },
  {
    id: 'dra-daniele-excesso-de-pele',
    title: 'Excesso de pele nas pálpebras: blefaroplastia',
    description:
      'A Dra. Danielle Longo fala sobre o excesso de pele e as bolsas de gordura da pálpebra superior e quando a blefaroplastia pode ser indicada.',
    speakerName: 'Dra. Danielle Longo',
    speakerSlug: null,
    src: '/videos/dra-daniele-excesso-de-pele.mp4',
    poster: poster('dra-daniele-excesso-de-pele', 'Dra. Danielle Longo falando à câmera em sala de atendimento'),
    orientation: 'vertical',
    durationSeconds: 41,
    uploadDate: '2025-09-30',
    captionsSrc: null,
    transcript: [
      'Você já acordou de manhã, se olhou no espelho e viu o olhar mais pesado, a olheira mais funda, aquele excesso de pele, mesmo depois de uma boa noite de sono? A cirurgia de blefaroplastia pode estar indicada para você.',
      'Nessa cirurgia, removemos o excesso de pele da pálpebra superior, associado às bolsas de gordura, para melhorar um pouco o campo de visão e até mesmo para você voltar a se sentir rejuvenescida, voltar a passar uma maquiagem, uma sombra.',
      'Se você sofre com esse problema, agende uma avaliação comigo aqui no CEMO para vermos qual cirurgia é mais indicada para o seu caso.',
    ],
    todos: [COMPLIANCE_TODO, 'TODO_CONTENT_VALIDATION: "voltar a se sentir rejuvenescida" — benefício estético; avaliar corte'],
  },
  {
    id: 'dra-daniele-palpebra-caida',
    title: 'Entrópio e ectrópio: cílios ou pálpebra virados',
    description:
      'A Dra. Danielle Longo explica o entrópio (cílios voltados para dentro) e o ectrópio (pálpebra virada para fora) e os sintomas que eles causam.',
    speakerName: 'Dra. Danielle Longo',
    speakerSlug: null,
    src: '/videos/dra-daniele-palpebra-caida.mp4',
    poster: poster('dra-daniele-palpebra-caida', 'Dra. Danielle Longo explicando, com as mãos em movimento'),
    orientation: 'vertical',
    durationSeconds: 43,
    uploadDate: '2025-09-30',
    captionsSrc: null,
    transcript: [
      'Você já foi ao oftalmologista e ele viu que os seus cílios estavam virando para dentro do olho ou para fora? Isso se chama entrópio, quando os cílios estão para dentro, tocando o globo ocular, arranhando e gerando irritação. Ou pode ser o ectrópio, quando a pálpebra está virada para fora, gerando vermelhidão, irritação e lacrimejamento.',
      'Se você sofre com esse tipo de problema, conseguimos resolver com uma cirurgia rápida e eficaz aqui na Clínica CEMO. Eu sou a Dra. Danielle, médica oftalmologista especialista em plástica ocular. Agende uma avaliação para que possamos te ajudar.',
    ],
    todos: [COMPLIANCE_TODO, 'TODO_CONTENT_VALIDATION: "cirurgia rápida e eficaz" — avaliar corte da fala'],
  },
  {
    id: 'dra-daniele-vias-lacrimais',
    title: 'Plástica ocular, vias lacrimais e órbita',
    description:
      'A Dra. Danielle Longo se apresenta e conta as áreas em que atende no CEMO: plástica ocular, vias lacrimais e órbita.',
    speakerName: 'Dra. Danielle Longo',
    speakerSlug: null,
    src: '/videos/dra-daniele-vias-lacrimais.mp4',
    poster: poster('dra-daniele-vias-lacrimais', 'Dra. Danielle Longo se apresentando em sala de atendimento'),
    orientation: 'vertical',
    durationSeconds: 31,
    uploadDate: '2025-09-30',
    captionsSrc: null,
    transcript: [
      'Olá, pessoal! Eu sou a Dra. Danielle Longo, médica oftalmologista especialista em plástica ocular aqui da Clínica CEMO. Estou compondo a equipe e vou realizar procedimentos de plástica ocular, vias lacrimais e órbita.',
      'Se você tiver interesse em saber mais ou precisar de algum procedimento, seja funcional ou estético, agende uma avaliação comigo.',
    ],
    todos: [COMPLIANCE_TODO],
  },
];
