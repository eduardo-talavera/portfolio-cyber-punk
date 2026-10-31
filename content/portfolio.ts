export type Language = "es" | "en";
export type Theme = "dark" | "light";
export type ProjectTone = "lime" | "cyan" | "magenta" | "violet";

export interface PortfolioCopy {
  nav: {
    profile: string;
    capabilities: string;
    work: string;
    contact: string;
  };
  utility: {
    language: string;
    theme: string;
    menu: string;
  };
  hero: {
    eyebrow: string;
    lineOne: string;
    lineTwo: string;
    lineThree: string;
    intro: string;
    cta: string;
    secondary: string;
    scroll: string;
  };
  status: string[];
  scene: {
    index: string;
    lineOne: string;
    lineTwo: string;
    body: string;
    cta: string;
    cardLabel: string;
    cardStatus: string;
  };
  about: {
    index: string;
    title: string;
    body: string;
    note: string;
  };
  capabilities: {
    index: string;
    title: string;
    intro: string;
    items: Array<{
      number: string;
      title: string;
      body: string;
      tags: string[];
    }>;
  };
  projects: {
    index: string;
    title: string;
    view: string;
    code: string;
    list: Array<{
      number: string;
      title: string;
      type: string;
      description: string;
      stack: string;
      live: string;
      github: string | null;
      tone: ProjectTone;
    }>;
  };
  stack: {
    index: string;
    title: string;
    groups: Array<{ label: string; items: string }>;
  };
  contact: {
    index: string;
    title: string;
    accent: string;
    body: string;
    email: string;
    social: string;
    availability: string;
  };
  footer: string;
}

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  position: string;
}

export const portfolioContent: Record<Language, PortfolioCopy> = {
  es: {
    nav: { profile: "Perfil", capabilities: "Enfoque", work: "Proyectos", contact: "Contacto" },
    utility: { language: "Cambiar a inglés", theme: "Cambiar tema", menu: "Abrir navegación" },
    hero: {
      eyebrow: "Ingeniero de software · IA · SRE",
      lineOne: "Construyo software",
      lineTwo: "que aprende, escala",
      lineThree: "y permanece estable.",
      intro: "Soy Edgar Talavera. Transformo problemas complejos en productos claros, sistemas confiables y experiencias web de alto rendimiento.",
      cta: "Explorar proyectos",
      secondary: "Hablemos",
      scroll: "Scroll para explorar",
    },
    status: ["México · Disponible remoto", "Español + English", "Producto · IA · Cloud"],
    scene: {
      index: "00 / SISTEMA EN MOVIMIENTO",
      lineOne: "Ideas audaces.",
      lineTwo: "Sistemas reales.",
      body: "Conecto producto, inteligencia y operación para convertir complejidad técnica en experiencias que se sienten simples.",
      cta: "Ver mi enfoque",
      cardLabel: "Arquitectura viva",
      cardStatus: "Sistema estable",
    },
    about: {
      index: "01 / PERFIL",
      title: "Ingeniería con contexto de producto.",
      body: "Desarrollo aplicaciones web escalables con React, Vue, TypeScript y Node.js. He trabajado en soluciones para fintech, educación y e-commerce, conectando arquitectura, APIs, datos, seguridad y despliegue para resolver necesidades reales del negocio.",
      note: "Mi criterio: una solución valiosa debe ser fácil de usar, observable en producción y sostenible para el equipo que la mantiene.",
    },
    capabilities: {
      index: "02 / ENFOQUE",
      title: "Tres disciplinas.\nUn mismo sistema.",
      intro: "Combino desarrollo de producto, inteligencia aplicada y confiabilidad para reducir la distancia entre una idea y un sistema que funciona en producción.",
      items: [
        {
          number: "01",
          title: "Product Engineering",
          body: "Interfaces rápidas, accesibles y mantenibles; servicios y APIs diseñados alrededor del dominio.",
          tags: ["React / Next.js", "TypeScript", "Node.js", "REST / GraphQL"],
        },
        {
          number: "02",
          title: "Applied AI",
          body: "Experiencias de producto con modelos, automatización y flujos de datos medibles, evaluables y útiles.",
          tags: ["LLM integration", "Automation", "Evaluation", "Data workflows"],
        },
        {
          number: "03",
          title: "Reliability / SRE",
          body: "Entrega continua, infraestructura reproducible y observabilidad para operar con confianza.",
          tags: ["AWS", "Docker", "CI/CD", "Performance"],
        },
      ],
    },
    projects: {
      index: "03 / TRABAJO SELECCIONADO",
      title: "Proyectos diseñados para funcionar.",
      view: "Ver proyecto",
      code: "Código",
      list: [
        {
          number: "01",
          title: "Tickets App",
          type: "Product Engineering",
          description: "Plataforma de gestión y seguimiento de tickets de soporte con una experiencia clara para organizar incidencias.",
          stack: "React · TypeScript · Node.js",
          live: "https://tickets-app-by-eduardo-talavera.vercel.app/issues",
          github: "https://github.com/eduardo-talavera/issues-app-frontend",
          tone: "lime",
        },
        {
          number: "02",
          title: "Tropix UI",
          type: "Design Systems",
          description: "Sistema de diseño y librería de componentes para construir interfaces consistentes y acelerar equipos React.",
          stack: "React · TypeScript · UI Architecture",
          live: "https://tropix-ui-docs.vercel.app/",
          github: "https://github.com/eduardo-talavera/tropix-ui",
          tone: "cyan",
        },
        {
          number: "03",
          title: "Twitter Clone",
          type: "Realtime Product",
          description: "Experiencia social inspirada en Twitter, con autenticación, publicaciones y persistencia en tiempo real.",
          stack: "React · Firebase · Realtime Data",
          live: "https://twitter-clone-3e2df.web.app/",
          github: null,
          tone: "magenta",
        },
        {
          number: "04",
          title: "IP Tracker",
          type: "Data Visualization",
          description: "Localizador de direcciones IP que convierte datos de geolocalización en una interfaz cartográfica inmediata.",
          stack: "JavaScript · API · Maps",
          live: "https://ip-tracker64.netlify.app/",
          github: null,
          tone: "violet",
        },
      ],
    },
    stack: {
      index: "04 / SISTEMA",
      title: "Herramientas que uso para mover ideas a producción.",
      groups: [
        { label: "Interfaces", items: "React, Next.js, Vue, TypeScript, Tailwind, CSS, Design Systems" },
        { label: "Servicios y datos", items: "Node.js, Express, GraphQL, REST, PostgreSQL, MongoDB, Prisma, Firebase" },
        { label: "Plataforma", items: "AWS, Docker, CI/CD, Vercel, Linux, Bash, GitHub Actions" },
        { label: "Calidad", items: "Jest, Vitest, Testing Library, observabilidad, performance y seguridad" },
      ],
    },
    contact: {
      index: "05 / CONTACTO",
      title: "¿Tienes un reto complejo?",
      accent: "Construyámoslo bien.",
      body: "Estoy abierto a conversar sobre posiciones de Software Engineering, Applied AI y SRE, así como proyectos donde confiabilidad y producto importen por igual.",
      email: "Enviar un correo",
      social: "O encuéntrame en",
      availability: "Disponible para oportunidades remotas y colaboraciones seleccionadas.",
    },
    footer: "Diseñado y desarrollado por Edgar Talavera",
  },
  en: {
    nav: { profile: "Profile", capabilities: "Focus", work: "Work", contact: "Contact" },
    utility: { language: "Switch to Spanish", theme: "Switch theme", menu: "Open navigation" },
    hero: {
      eyebrow: "Software · AI · SRE Engineer",
      lineOne: "I build software",
      lineTwo: "that learns, scales",
      lineThree: "and stays reliable.",
      intro: "I’m Edgar Talavera. I turn complex problems into clear products, reliable systems and high-performance web experiences.",
      cta: "Explore projects",
      secondary: "Let’s talk",
      scroll: "Scroll to explore",
    },
    status: ["Mexico · Remote-ready", "Español + English", "Product · AI · Cloud"],
    scene: {
      index: "00 / SYSTEM IN MOTION",
      lineOne: "Bold ideas.",
      lineTwo: "Real systems.",
      body: "I connect product, intelligence and operations to turn technical complexity into experiences that feel simple.",
      cta: "See my focus",
      cardLabel: "Living architecture",
      cardStatus: "System stable",
    },
    about: {
      index: "01 / PROFILE",
      title: "Engineering with product context.",
      body: "I build scalable web applications with React, Vue, TypeScript and Node.js. I have worked on fintech, education and e-commerce solutions, connecting architecture, APIs, data, security and delivery to solve real business needs.",
      note: "My standard: a valuable solution must be easy to use, observable in production and sustainable for the team maintaining it.",
    },
    capabilities: {
      index: "02 / FOCUS",
      title: "Three disciplines.\nOne connected system.",
      intro: "I combine product development, applied intelligence and reliability to shorten the distance between an idea and a system that works in production.",
      items: [
        {
          number: "01",
          title: "Product Engineering",
          body: "Fast, accessible and maintainable interfaces; services and APIs designed around the domain.",
          tags: ["React / Next.js", "TypeScript", "Node.js", "REST / GraphQL"],
        },
        {
          number: "02",
          title: "Applied AI",
          body: "Product experiences powered by models, automation and measurable, testable and useful data flows.",
          tags: ["LLM integration", "Automation", "Evaluation", "Data workflows"],
        },
        {
          number: "03",
          title: "Reliability / SRE",
          body: "Continuous delivery, reproducible infrastructure and observability to operate with confidence.",
          tags: ["AWS", "Docker", "CI/CD", "Performance"],
        },
      ],
    },
    projects: {
      index: "03 / SELECTED WORK",
      title: "Projects designed to work.",
      view: "View project",
      code: "Code",
      list: [
        {
          number: "01",
          title: "Tickets App",
          type: "Product Engineering",
          description: "A support ticket management and tracking platform with a clear experience for organizing issues.",
          stack: "React · TypeScript · Node.js",
          live: "https://tickets-app-by-eduardo-talavera.vercel.app/issues",
          github: "https://github.com/eduardo-talavera/issues-app-frontend",
          tone: "lime",
        },
        {
          number: "02",
          title: "Tropix UI",
          type: "Design Systems",
          description: "A design system and component library for consistent interfaces and faster React teams.",
          stack: "React · TypeScript · UI Architecture",
          live: "https://tropix-ui-docs.vercel.app/",
          github: "https://github.com/eduardo-talavera/tropix-ui",
          tone: "cyan",
        },
        {
          number: "03",
          title: "Twitter Clone",
          type: "Realtime Product",
          description: "A Twitter-inspired social experience with authentication, publishing and real-time persistence.",
          stack: "React · Firebase · Realtime Data",
          live: "https://twitter-clone-3e2df.web.app/",
          github: null,
          tone: "magenta",
        },
        {
          number: "04",
          title: "IP Tracker",
          type: "Data Visualization",
          description: "An IP address locator that turns geolocation data into an immediate map interface.",
          stack: "JavaScript · API · Maps",
          live: "https://ip-tracker64.netlify.app/",
          github: null,
          tone: "violet",
        },
      ],
    },
    stack: {
      index: "04 / SYSTEM",
      title: "Tools I use to move ideas into production.",
      groups: [
        { label: "Interfaces", items: "React, Next.js, Vue, TypeScript, Tailwind, CSS, Design Systems" },
        { label: "Services & data", items: "Node.js, Express, GraphQL, REST, PostgreSQL, MongoDB, Prisma, Firebase" },
        { label: "Platform", items: "AWS, Docker, CI/CD, Vercel, Linux, Bash, GitHub Actions" },
        { label: "Quality", items: "Jest, Vitest, Testing Library, observability, performance and security" },
      ],
    },
    contact: {
      index: "05 / CONTACT",
      title: "Have a complex challenge?",
      accent: "Let’s build it right.",
      body: "I’m open to Software Engineering, Applied AI and SRE roles, as well as projects where reliability and product matter equally.",
      email: "Send an email",
      social: "Or find me on",
      availability: "Available for remote opportunities and selected collaborations.",
    },
    footer: "Designed and developed by Edgar Talavera",
  },
};

export const projectImages: Partial<Record<string, ProjectImage>> = {
  "01": {
    src: "/images/projects/tickets-app.webp",
    width: 2862,
    height: 1626,
    position: "50% 48%",
  },
  "02": {
    src: "/images/projects/tropix-ui.webp",
    width: 1885,
    height: 887,
    position: "50% 40%",
  },
  "04": {
    src: "/images/projects/ip-tracker.webp",
    width: 1506,
    height: 795,
    position: "50% 22%",
  },
};
