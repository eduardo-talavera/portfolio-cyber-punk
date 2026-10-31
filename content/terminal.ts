import type { Language } from "./portfolio";

export type AsciiTone = "code" | "accent";
export interface AsciiSegment {
  text: string;
  tone: AsciiTone;
}

export interface TerminalCopy {
  title: string;
  ariaLabel: string;
  boot: string[];
  examplesLabel: string;
  examplesHint: string;
  examples: string[];
  demoCommand: string;
  ready: string;
  booting: string;
  inputLabel: string;
  inputPlaceholder: string;
  runCommand: string;
  commandNotFound: (command: string) => string[];
  responses: Record<string, string[]>;
}

const ASCII_GRAPHIC_ROWS = [
  "                     #######",
  "                  #############",
  "                #################",
  "               ###################",
  "              #####################",
  "   ###        #####################        ###",
  "  #####      #######################      #####",
  " ###  ##     #######################     ##  ###",
  " ##    ##    ####RR###########RR####    ##    ##",
  " ##    ###  #########################  ###    ##",
  " ###    ##  ####RR#############RR####  ##    ###",
  "  ###   ### ######################### ###   ###",
  "   ###   ########RR###########RR########   ###",
  "    ####  #############################  ####",
  "     ###  #####VVVV##### #####VVVV#####  ###",
  "      ########  ######## ########  ########",
  "       ######    ####### #######    ######",
  "       ###################################",
  "   #####     #######################     #####",
  "  #######     ###  ###########  ###     #######",
  "  ###O###    ####  ###########  ####    ###O###",
  "  ### ###   #########################   ### ###",
  "   ##  ##   ###  ###############  ###   ##  ##",
  "       ##  ###     ##### #####     ###  ##",
  "      ###  ##      ###########      ##  ###",
  "   ###### ###     #############     ### ######",
  "  ####   ###      ##### # #####      ###   ####",
  "  VV      VV      VV  ## ##  VV      VV      VV",
];

const createGraphicSegments = (row: string): AsciiSegment[] => {
  const segments: AsciiSegment[] = [];

  for (const character of row.padEnd(40, " ")) {
    const tone: AsciiTone = character === "R" ? "accent" : "code";
    const text = character === "R" ? "#" : character;
    const previous = segments[segments.length - 1];

    if (previous?.tone === tone) previous.text += text;
    else segments.push({ text, tone });
  }

  return segments;
};

export const asciiBannerLines = ASCII_GRAPHIC_ROWS.map(createGraphicSegments);

export const asciiBanner = asciiBannerLines
  .map((line) => line.map((segment) => segment.text).join(""))
  .join("\n");

export const terminalAliases: Record<string, string> = {
  ayuda: "help",
  perfil: "profile",
  quiensoy: "profile",
  whoami: "profile",
  habilidades: "skills",
  stack: "skills",
  enfoque: "focus",
  experiencia: "experience",
  domains: "experience",
  ia: "ai",
  reliability: "sre",
  confiabilidad: "sre",
  proyectos: "projects",
  contacto: "contact",
  estado: "status",
  availability: "status",
  disponibilidad: "status",
  limpiar: "clear",
  cls: "clear",
  "?": "help",
};

export const terminalCopy: Record<Language, TerminalCopy> = {
  es: {
    title: "edgar@portfolio — zsh",
    ariaLabel: "Terminal interactiva del perfil de Edgar Talavera",
    boot: [
      "[boot] iniciando portfolio kernel 2026.10",
      "[ ok ] índice profesional montado",
      "[ ok ] sesión local segura",
    ],
    examplesLabel: "COMANDOS DE EJEMPLO",
    examplesHint: "La entrada se habilita al terminar la demostración.",
    examples: ["profile", "skills", "projects", "sre", "contact", "help"],
    demoCommand: "profile --summary",
    ready: "LISTO · escribe help",
    booting: "INICIANDO DEMO",
    inputLabel: "Escribe un comando de perfil",
    inputPlaceholder: "escribe help y presiona Enter",
    runCommand: "Ejecutar comando",
    commandNotFound: (command) => [
      `comando no encontrado: ${command}`,
      "usa help para ver los comandos disponibles",
    ],
    responses: {
      help: [
        "profile      identidad, enfoque y ubicación",
        "skills       stack técnico por área",
        "focus        disciplinas y enfoque profesional",
        "experience   dominios y criterio de producto",
        "ai           capacidades de ingeniería de IA",
        "sre          plataforma y confiabilidad",
        "projects     trabajo seleccionado",
        "contact      canales de contacto",
        "status       disponibilidad profesional",
        "clear        limpia la sesión",
        "banner       vuelve a mostrar el gráfico ASCII",
      ],
      profile: [
        "name        Edgar Talavera",
        "role        Software Engineer · AI Engineer · SRE",
        "location    México · disponible remoto",
        "languages   Español · English",
        "mission     convertir problemas complejos en productos claros y sistemas confiables",
      ],
      skills: [
        "interfaces  React · Next.js · Vue · TypeScript · Design Systems",
        "services    Node.js · Express · REST · GraphQL",
        "data        PostgreSQL · MongoDB · Prisma · Firebase",
        "platform    AWS · Docker · CI/CD · Linux · GitHub Actions",
        "quality     Jest · Vitest · observabilidad · performance · seguridad",
      ],
      focus: [
        "product     interfaces, servicios y APIs alrededor del dominio",
        "ai          modelos, automatización, evaluación y flujos de datos",
        "sre         entrega continua, infraestructura y observabilidad",
      ],
      experience: [
        "domains     fintech · educación · e-commerce",
        "approach    producto + arquitectura + APIs + datos + seguridad + despliegue",
        "standard    fácil de usar, observable en producción y sostenible para el equipo",
      ],
      ai: [
        "focus       integración de LLMs · automatización · evaluación",
        "workflow    flujos de datos medibles, evaluables y útiles",
        "goal        llevar inteligencia aplicada a experiencias reales de producto",
      ],
      sre: [
        "platform    AWS · Docker · CI/CD · Vercel · Linux",
        "practice    infraestructura reproducible · observabilidad · performance",
        "goal        operar y desplegar con confianza",
      ],
      projects: [
        "01  Tickets App     gestión y seguimiento de soporte",
        "02  Tropix UI      sistema de diseño para React",
        "03  Twitter Clone  producto social en tiempo real",
        "04  IP Tracker     geolocalización y mapas",
      ],
      contact: [
        "email       edgar.developer.talavera77@gmail.com",
        "github      github.com/eduardo-talavera",
        "linkedin    linkedin.com/in/devtaed/",
        "x           twitter.com/ed_talavera",
      ],
      status: [
        "availability  abierto a oportunidades remotas",
        "focus         Software Engineering · Applied AI · SRE",
        "system        online · listo para conversar",
      ],
    },
  },
  en: {
    title: "edgar@portfolio — zsh",
    ariaLabel: "Edgar Talavera profile interactive terminal",
    boot: [
      "[boot] starting portfolio kernel 2026.10",
      "[ ok ] professional index mounted",
      "[ ok ] secure local session",
    ],
    examplesLabel: "EXAMPLE COMMANDS",
    examplesHint: "Input unlocks after the demonstration finishes.",
    examples: ["profile", "skills", "projects", "sre", "contact", "help"],
    demoCommand: "profile --summary",
    ready: "READY · type help",
    booting: "STARTING DEMO",
    inputLabel: "Enter a profile command",
    inputPlaceholder: "type help and press Enter",
    runCommand: "Run command",
    commandNotFound: (command) => [
      `command not found: ${command}`,
      "use help to list the available commands",
    ],
    responses: {
      help: [
        "profile      identity, focus and location",
        "skills       technical stack by area",
        "focus        disciplines and professional focus",
        "experience   domains and product mindset",
        "ai           AI engineering capabilities",
        "sre          platform and reliability",
        "projects     selected work",
        "contact      contact channels",
        "status       professional availability",
        "clear        clear the session",
        "banner       print the ASCII graphic again",
      ],
      profile: [
        "name        Edgar Talavera",
        "role        Software Engineer · AI Engineer · SRE",
        "location    Mexico · remote-ready",
        "languages   Español · English",
        "mission     turn complex problems into clear products and reliable systems",
      ],
      skills: [
        "interfaces  React · Next.js · Vue · TypeScript · Design Systems",
        "services    Node.js · Express · REST · GraphQL",
        "data        PostgreSQL · MongoDB · Prisma · Firebase",
        "platform    AWS · Docker · CI/CD · Linux · GitHub Actions",
        "quality     Jest · Vitest · observability · performance · security",
      ],
      focus: [
        "product     interfaces, services and domain-driven APIs",
        "ai          models, automation, evaluation and data workflows",
        "sre         continuous delivery, infrastructure and observability",
      ],
      experience: [
        "domains     fintech · education · e-commerce",
        "approach    product + architecture + APIs + data + security + delivery",
        "standard    usable, observable in production and sustainable for the team",
      ],
      ai: [
        "focus       LLM integration · automation · evaluation",
        "workflow    measurable, testable and useful data workflows",
        "goal        bring applied intelligence into real product experiences",
      ],
      sre: [
        "platform    AWS · Docker · CI/CD · Vercel · Linux",
        "practice    reproducible infrastructure · observability · performance",
        "goal        operate and ship with confidence",
      ],
      projects: [
        "01  Tickets App     support management and tracking",
        "02  Tropix UI      React design system",
        "03  Twitter Clone  realtime social product",
        "04  IP Tracker     geolocation and maps",
      ],
      contact: [
        "email       edgar.developer.talavera77@gmail.com",
        "github      github.com/eduardo-talavera",
        "linkedin    linkedin.com/in/devtaed/",
        "x           twitter.com/ed_talavera",
      ],
      status: [
        "availability  open to remote opportunities",
        "focus         Software Engineering · Applied AI · SRE",
        "system        online · ready to talk",
      ],
    },
  },
};
