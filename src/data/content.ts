export type Round = {
  number: string;
  year: string;
  title: string;
  emoji: string;
  lines: string[];
  achievement: string;
  winner: "beto" | "yadira" | "both";
  reactions: { beto: string; yadira: string };
};

export type Evidence = {
  id: string;
  name: string;
  desc: string;
  tag: string;
};

export type QuizQuestion = {
  question: string;
  answer: "beto" | "yadira";
  explanation: string;
};

export type Credit = {
  role: string;
  name: string;
};

export const ROUNDS: Round[] = [
  {
    number: "I",
    year: "2021",
    title: "El Aliado Caído",
    emoji: "",
    lines: [
      "Beto había planeado el momento perfecto.",
      "El cine. La oscuridad. El romanticismo.",
      "Lo que no había calculado era la presencia de su mejor amigo,",
      "sentado exactamente a su lado.",
      "Con ojos y todo.",
      "El beso ocurrió de todas formas.",
      "La incomodidad... también.",
    ],
    achievement: "Testigo no deseado — nivel experto",
    winner: "beto",
    reactions: { beto: "😅", yadira: "😏" },
  },
  {
    number: "II",
    year: "2022",
    title: "La Gran Prohibición del Shopping",
    emoji: "",
    lines: [
      "Beto y Yadira se abrazaban.",
      "Era un abrazo normal. Inofensivo. Lleno de amor.",
      "Fue entonces que apareció el empleado.",
      "Con la seriedad de un general.",
      "Con la misión más importante de su vida laboral.",
      '"No se pueden abrazar."',
      "Hasta hoy nadie sabe por qué.",
    ],
    achievement: "Criminales del abrazo — buscados en todo el shopping",
    winner: "both",
    reactions: { beto: "🤷", yadira: "😤" },
  },
  {
    number: "III",
    year: "2023",
    title: "La Gran Inversión de Roles",
    emoji: "",
    lines: [
      "En un acto de valentía sin precedentes,",
      "Beto y Yadira decidieron intercambiar sus ropas para un trend.",
      "Lo que nadie esperaba...",
      "...era lo convincentes que quedarían.",
      "Nadie habla de eso.",
      "Todos lo vieron.",
    ],
    achievement: "Versatilidad extrema — 10/10 en ambos roles",
    winner: "both",
    reactions: { beto: "😎", yadira: "💃" },
  },
  {
    number: "IV",
    year: "2024",
    title: "El Dulce Maldito",
    emoji: "",
    lines: [
      "El hermano de Beto llegó con un dulce.",
      "Con una forma... particular.",
      "Yadira vio el dulce. Yadira sonrió.",
      "Y entonces comenzó el peor o mejor momento de la tarde.",
      '"Muérdelo", dijo ella, con una convicción que no debería haber tenido.',
      "Beto nunca se recuperó.",
    ],
    achievement: "Caos doméstico — iniciado por Yadira, sufrido por Beto",
    winner: "yadira",
    reactions: { beto: "😳", yadira: "😈" },
  },
  {
    number: "V",
    year: "2025",
    title: "La Pierna Legendaria",
    emoji: "",
    lines: [
      "Fue un día normal.",
      "Una conversación normal.",
      "Hasta que Yadira abrió la boca.",
      '"Voy a rifar una pierna de pollo."',
      "Con una seguridad que movió montañas.",
      "...",
      "Nadie preguntó qué quería decir.",
      "Todos lo entendieron. Nadie lo olvidó.",
    ],
    achievement: "La pierna de pollo — frase del año, todos los años",
    winner: "yadira",
    reactions: { beto: "🤔", yadira: "🍗" },
  },
  {
    number: "VI",
    year: "2026",
    title: "El Caso Jennifer Lawrence",
    emoji: "",
    lines: [
      "Yadira llevaba años hablando de Jennifer Lawrence.",
      "Estados subidos. Fotos enviadas. Referencias constantes.",
      "Como acto de amor supremo, hizo ver a Beto todas las películas",
      "de Los Juegos del Hambre. Juntos. En el mismo sillón.",
      "Con los ojos abiertos.",
      "Semanas después, Yadira le mandó un reel de una entrevista.",
      'Beto preguntó: "¿Quién es esa?"',
      "...",
      "Beto. No. Puede. Ganar.",
    ],
    achievement: "Jennifer Lawrence quien — crimen de lesa humanidad",
    winner: "yadira",
    reactions: { beto: "😰", yadira: "😡" },
  },
];

export const EVIDENCE: Evidence[] = [
  {
    id: "001",
    name: "La caca azul",
    desc: "El chiste que inició todo. Origen de la civilización.",
    tag: "⚠️ Fundacional",
  },
  {
    id: "002",
    name: "Que es verde y sabe a pintura",
    desc: "Tú lo sabes, yo lo sé.",
    tag: "🎨 Inclasificable",
  },
  {
    id: "003",
    name: "Jumper",
    desc: "Clasificado. No se dan más detalles.",
    tag: "📁 Clasificado",
  },
  {
    id: "004",
    name: "El Dramas",
    desc: "Autoexplicativo para quien lo conoce.",
    tag: "🎭 Dramático",
  },
  {
    id: "005",
    name: "La pierna de pollo",
    desc: "Ya documentada en Round V. El legado continúa.",
    tag: "🍗 Legendario",
  },
  {
    id: "006",
    name: "Revelar / Relevar",
    desc: "Un error que se convirtió en identidad.",
    tag: "📝 Error canónico",
  },
  {
    id: "007",
    name: "Tostadito",
    desc: "Apodo. Historia clasificada.",
    tag: "🍞 Nivel: apodo",
  },
  {
    id: "008",
    name: "Es zuficiente",
    desc: 'Pablo de Backyardigans — Filosofía de vida.',
    tag: "✅ Sabiduría pura",
  },
  {
    id: "009",
    name: "Todo es una JoJoreferencia",
    desc: "Incluyendo estos 5 años. Irrefutable.",
    tag: "👆 Canónico",
  },
  {
    id: "010",
    name: "A lo Fleur",
    desc: "Sin más comentarios.",
    tag: "💅 Coquette",
  },
  {
    id: "011",
    name: "La friendzone",
    desc: '"Según él." Versión no confirmada por Yadira.',
    tag: "❓ Disputado",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Quién planeó el beso perfecto en el cine?",
    answer: "beto",
    explanation: "Beto... aunque no contaba con el testigo.",
  },
  {
    question: "¿Quién contó el chiste de la caca azul?",
    answer: "yadira",
    explanation: "Yadira, la fundadora de todo esto.",
  },
  {
    question: '¿Quién dijo "Muérdelo" con demasiada convicción?',
    answer: "yadira",
    explanation: "Yadira. Beto nunca se recuperó.",
  },
  {
    question: "¿Quién NO reconoció a Jennifer Lawrence?",
    answer: "beto",
    explanation: "Beto. Crimen de lesa humanidad.",
  },
  {
    question: "¿Quién quiso rifar una pierna de pollo?",
    answer: "yadira",
    explanation: "Yadira. Frase del año, todos los años.",
  },
  {
    question: "¿Quién sufrió más con el dulce maldito?",
    answer: "beto",
    explanation: "Beto. Yadira lo disfrutó.",
  },
  {
    question: '¿Quién convirtió "revelar" en "relevar"?',
    answer: "yadira",
    explanation: "Yadira. Y ahora es canon.",
  },
];

export const CREDITS: Credit[] = [
  { role: "Dirigido por", name: "El destino (y una caca azul)" },
  { role: "Producido por", name: "5 años de paciencia mutua" },
  { role: "Protagonistas", name: "Beto & Yadira" },
  { role: "Testigo no deseado", name: "El mejor amigo de Beto" },
  { role: "Antagonista", name: "El empleado del shopping" },
  { role: "Proveedor de dulces cuestionables", name: "El hermano de Beto" },
  { role: "Inspiración eterna", name: "Jennifer Lawrence" },
  { role: "Frase del año", name: "\"Voy a rifar una pierna de pollo\"" },
  { role: "Filosofía de vida", name: "Pablo de Backyardigans" },
  { role: "Banda sonora", name: "Los audios que acabas de escuchar" },
  { role: "Diseño de producción", name: "Una laptop a las 3am" },
  { role: "Agradecimiento especial", name: "A ti, por aguantarme 5 años ♥" },
];

export const FINAL_NARRATOR = [
  "Después de 5 años de batallas, memes, abrazos prohibidos,",
  "dulces perturbadores...",
  "...y una Jennifer Lawrence que nadie reconoció...",
  "El narrador debe admitir algo.",
  "No hay ganador.",
  "Porque desde el día de la caca azul...",
  "...ya habían ganado los dos.",
];

export const INTRO_LINES = [
  "En el año 2019, en los pasillos de un colegio cualquiera...",
  "Una chica contó un chiste sobre una caca azul.",
  "Y sin saberlo...",
  "...declaró el inicio de la batalla más larga de su vida.",
];
