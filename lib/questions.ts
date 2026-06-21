export interface Answer {
  label: string;
  points: number;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "À quelle fréquence utilisez-vous des outils d'IA dans votre travail quotidien ?",
    answers: [
      { label: "Jamais", points: 0 },
      { label: "Quelques fois par mois", points: 1 },
      { label: "Plusieurs fois par semaine", points: 2 },
      { label: "Tous les jours", points: 3 },
    ],
  },
  {
    id: 2,
    text: "Quels outils d'IA connaissez-vous et utilisez-vous ?",
    answers: [
      { label: "Je n'en connais aucun", points: 0 },
      { label: "ChatGPT uniquement", points: 1 },
      { label: "ChatGPT + 1 ou 2 autres outils", points: 2 },
      { label: "Je maîtrise plusieurs outils (Claude, Midjourney, Perplexity…)", points: 3 },
    ],
  },
  {
    id: 3,
    text: "Comment rédigez-vous vos prompts pour obtenir de meilleurs résultats ?",
    answers: [
      { label: "Je ne sais pas ce qu'est un prompt", points: 0 },
      { label: "Je tape ma question simplement", points: 1 },
      { label: "Je donne du contexte et précise le format", points: 2 },
      { label: "J'utilise des techniques avancées (rôle, chaîne de pensée, few-shot…)", points: 3 },
    ],
  },
  {
    id: 4,
    text: "Avez-vous automatisé des tâches répétitives grâce à l'IA ?",
    answers: [
      { label: "Non, je ne vois pas comment", points: 0 },
      { label: "J'ai essayé mais sans résultat concret", points: 1 },
      { label: "Oui, quelques tâches simples", points: 2 },
      { label: "Oui, j'ai des workflows IA complets en production", points: 3 },
    ],
  },
  {
    id: 5,
    text: "Comment l'IA vous aide-t-elle dans la création de contenu ?",
    answers: [
      { label: "Pas du tout", points: 0 },
      { label: "Parfois pour corriger des textes", points: 1 },
      { label: "Pour rédiger des emails, posts ou articles", points: 2 },
      { label: "Je génère images, vidéos, textes et je fine-tune les résultats", points: 3 },
    ],
  },
  {
    id: 6,
    text: "Quelle est votre connaissance des modèles de langage (LLM) ?",
    answers: [
      { label: "Je ne sais pas ce que c'est", points: 0 },
      { label: "J'en ai entendu parler vaguement", points: 1 },
      { label: "Je comprends la différence entre GPT-4, Claude, Gemini…", points: 2 },
      { label: "Je sais choisir le bon modèle selon l'usage et optimiser les coûts", points: 3 },
    ],
  },
  {
    id: 7,
    text: "Utilisez-vous l'IA pour analyser des données ou prendre des décisions ?",
    answers: [
      { label: "Non", points: 0 },
      { label: "Rarement, pour des recherches simples", points: 1 },
      { label: "Oui, pour analyser des rapports ou synthétiser des infos", points: 2 },
      { label: "Oui, j'intègre l'IA dans mes process de décision stratégique", points: 3 },
    ],
  },
  {
    id: 8,
    text: "Avez-vous intégré des API ou plugins IA dans vos outils métier ?",
    answers: [
      { label: "Non, je ne sais pas le faire", points: 0 },
      { label: "J'utilise des plugins existants sans les configurer", points: 1 },
      { label: "J'ai connecté des outils via Zapier/Make avec de l'IA", points: 2 },
      { label: "J'utilise des API directement ou crée mes propres agents IA", points: 3 },
    ],
  },
  {
    id: 9,
    text: "Comment vous formez-vous sur les évolutions de l'IA ?",
    answers: [
      { label: "Je ne suis pas les actualités IA", points: 0 },
      { label: "J'entends parfois parler de nouveautés par hasard", points: 1 },
      { label: "Je lis des newsletters ou articles spécialisés", points: 2 },
      { label: "Je teste activement les nouveaux modèles et maintiens une veille structurée", points: 3 },
    ],
  },
  {
    id: 10,
    text: "Quel impact l'IA a-t-elle eu sur votre productivité ?",
    answers: [
      { label: "Aucun impact", points: 0 },
      { label: "Un gain de temps occasionnel", points: 1 },
      { label: "Je gagne plusieurs heures par semaine", points: 2 },
      { label: "L'IA a transformé mon activité, je produis 2x à 5x plus", points: 3 },
    ],
  },
];

export const MAX_SCORE = questions.length * 3;

export interface Level {
  emoji: string;
  name: string;
  range: [number, number];
  description: string;
  advice: string;
  cta: string;
}

export const levels: Level[] = [
  {
    emoji: "🌱",
    name: "Observateur",
    range: [0, 19],
    description:
      "Vous êtes au début de votre aventure avec l'IA. Les outils existent mais restent encore flous pour vous. C'est le bon moment pour démarrer !",
    advice:
      "Commencez par ChatGPT pour des tâches simples : rédiger un email, résumer un article ou brainstormer des idées. 15 minutes par jour suffisent pour prendre de l'avance.",
    cta: "Découvrir les bases de l'IA →",
  },
  {
    emoji: "🔍",
    name: "Curieux",
    range: [20, 39],
    description:
      "Vous avez découvert l'IA et commencez à l'explorer. Vous sentez le potentiel mais n'êtes pas encore à l'aise pour l'intégrer pleinement à votre quotidien.",
    advice:
      "Apprenez à structurer vos prompts avec la méthode RACI (Rôle, Action, Contexte, Instruction). Vous multiplierez la qualité de vos résultats par 3 immédiatement.",
    cta: "Améliorer mes prompts →",
  },
  {
    emoji: "🧭",
    name: "Explorateur",
    range: [40, 59],
    description:
      "Vous utilisez l'IA régulièrement et obtenez des résultats concrets. Vous êtes dans la moyenne haute des utilisateurs, mais vous pouvez aller beaucoup plus loin.",
    advice:
      "Il est temps d'automatiser. Connectez Make ou Zapier à ChatGPT pour créer vos premiers workflows IA. Vous récupérerez 5 à 10 heures par semaine.",
    cta: "Automatiser avec l'IA →",
  },
  {
    emoji: "⚡",
    name: "Praticien",
    range: [60, 79],
    description:
      "Bravo ! Vous faites partie des 20% qui utilisent vraiment l'IA comme levier de productivité. Vos bases sont solides et vos résultats parlent d'eux-mêmes.",
    advice:
      "Passez au niveau supérieur avec les agents IA et le fine-tuning. Construisez des systèmes qui travaillent pour vous 24h/24 et créez un avantage compétitif durable.",
    cta: "Passer au niveau expert →",
  },
  {
    emoji: "🚀",
    name: "Expert",
    range: [80, 100],
    description:
      "Vous êtes dans le top 5% des utilisateurs d'IA. Vous maîtrisez les outils, les prompts, les automatisations et comprenez les enjeux stratégiques de l'IA.",
    advice:
      "Vous avez le profil pour enseigner, consulter ou créer des produits IA. Pensez à monétiser votre expertise et à rester à la pointe des modèles de nouvelle génération.",
    cta: "Monétiser mon expertise IA →",
  },
];

export function getLevelByPercentage(percentage: number): Level {
  return levels.find((l) => percentage >= l.range[0] && percentage <= l.range[1]) ?? levels[0];
}
