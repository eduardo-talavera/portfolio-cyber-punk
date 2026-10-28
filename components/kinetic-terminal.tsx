"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";

type Language = "es" | "en";
type Phase = "idle" | "typing" | "ready";
type TerminalEntry = {
  id: number;
  kind: "command" | "output" | "error";
  lines: string[];
};

type AsciiTone = "code" | "accent";
type AsciiSegment = { text: string; tone: AsciiTone };

const ninjaRows = [
  "            ########                  #",
  "        #################            #",
  "     ######################         #",
  "    #########################      #",
  "  ############################",
  " ##############################",
  " ###############################",
  "###############################",
  "##############################",
  "                #    ########   #",
  "   RR        RRR        ####   ##",
  "                        ###   ###",
  "                      ####   ###",
  " ####          ##########   ####",
  " #######################   ####",
  "   ####################   ####",
  "    ##################  ####",
  "      ############      ##",
  "        #########        #####",
  "      ############      ######",
  "     ############# ###########",
  "     ########      #########",
  "         ###       #########",
  "        ######    ############",
  "       #######################",
  "       #   #   ###  #   #   ##",
  "       ########################",
  "        ##     ##   ##     ##",
];

const cthulhuRows = [
  "                      #             #",
  "     #                ##           ##",
  "     #                ###         ###",
  "     ##               ####       ####",
  "     ##               #####     #####",
  "     ##                #####   #####",
  "     ##                ###### ######",
  "#   ####               #############",
  "##  ####               #############",
  "##  #####              #############",
  "##########            ###############",
  "###########          #################",
  "###########          ###RR #####RR ###",
  " #### ######         ###RR #####RR ###",
  " #####   ####        #################",
  " ######   ###         ###############",
  " ######   ####         #############",
  " #######   ####        #############",
  " ########   ####       ## ####### ###",
  "  ########  ######    ### ##   ##  ##",
  "   ######### ######  ###  ##   ##  ###",
  "    ######### #########   ##   ##",
  "    ########### ######     ## ##",
  "     ########### ######   ### ##",
  "      ######## ######### ###  ###",
  "       ######   ###########    ###",
  "         ###    ###########################",
  "          #      #########################",
  "    # # #     ###############################",
  "     ####    #################################",
  "       ##   ###################################",
  "        ########     #################     ########",
  "        #######       ###############       #######",
  "            ##     #####################     ##",
  "                 ##########     ##########",
  "               ###########       ###########",
];

const krakenRows = [
  "                                 #########",
  "                              ###############",
  "                            ###################",
  "                           #####################",
  "                          #######################",
  "                         #########################",
  "                        ###########################",
  "       #                ###########################",
  "      ######            ###########################      #",
  "      #######           ###########################     ###",
  "     ###  ###   #        #####RR##########RR######       #    #####",
  "     ##    ##  ###        ####RR##########RR#####        ##  #######",
  "    ###    ### ##          #####################          ## #######",
  "    ###    #####         #########################        #####  ###",
  "     ###    # #        #############################     ######   ###",
  "     ###     ####     ###############################   ### ###   ###",
  "     ###      ####    ###############################  ###   #   ####",
  "      ###       ####  ############################### ###       #####",
  "      ####        ######################################      ######",
  "       #####       #   ############################          #####",
  "         #################  ################ ####################",
  "           #############    #### ##########      ###############",
  "             #########    ####   ##### ####          ##",
  "                        ####    ####### ####        ####",
  "            #        ######    #### ###  ####       ####",
  "          ##################   ####  ##  #####       ####",
  "        #############  #####   ###   ###  #####      ####",
  "       ####      #     ####   ###     ##   ######    ####",
  "       ####            ####   ##      ###    ###########",
  "        ########        ########      ###     ##########",
  "        #########       #######       ###      ########",
  "         #######         ##           ###",
];

const dragonRows = [
  "                                     #",
  "                                     ##                       #",
  "                       #             ###           ##         ##",
  "                       ###           ####          ####       ##",
  "                       #####         #####        ######      ###",
  "           #           #######       ######       ########    ###",
  "           ####         #######      #######     ###########  ####",
  "            ######      ########     ########    ##################",
  "            ########    #########    #########  ###################",
  "            ########### ##########   #########  ###############RR####",
  "             #######################  #####################################",
  "             #######################  ########################################",
  "             ########################  #######################################     *",
  "              ####################### #######################################    **",
  "      ############################### ################################        ***",
  "       ########################################################             **",
  "         ######################################################              ***    **",
  "          ######## ###########################################                  ****",
  "           ######   ####### ##############################   #",
  "             ###     #####   ############################",
  "              #       ###     ############################",
  "         # #           #   ################################",
  "        ## ###          #####################################",
  "      ########################################################",
  "       ######################################################",
  "     #########################   ######################  ####",
  "     #####  ##############        ##################### ####",
  "      ####    #########          ############## ################",
  "      ######     ###             ########        #######  ####",
  "      ###############            ########        ########   #",
  "        ##############           ########        ########",
  "       #############              #######        #######",
  "          ##########              ######          ######",
  "            ##  #                ########         ######",
  "                                #####   #        ########",
  "                                   #            #####   #",
  "                                                   #",
];

const hackerRows = [
  "                 #                 ",
  "               #####               ",
  "             #########             ",
  "           #############           ",
  "         #################         ",
  "        ###################        ",
  "       #######       #######       ",
  "      #######         #######      ",
  "     #######           #######     ",
  "    #######             #######    ",
  "    #####    RRR   RRR    #####    ",
  "    #####    RRR   RRR    #####    ",
  "    #####    ###   ###    #####    ",
  "    #####        #        #####    ",
  "    #####      #####      #####    ",
  "     #####    ##   ##    #####     ",
  "     ######   #######   ######     ",
  "      #######################      ",
  "       #####################       ",
  "        ###################        ",
  "       #####################       ",
  "    ###########################    ",
  "   #############################   ",
  "  ####                       ####  ",
  "  ####     root@kali:~#_     ####  ",
  "  ####   [ACCESS GRANTED]    ####  ",
  "  ###############################  ",
  "    ###########################    ",
  "      #######################      ",
];

const alienRows = [
  "             #########",
  "          ###############",
  "        ###################",
  "      #######################",
  "     ######^^#########^^######",
  "    #####^^#############^^#####",
  "   #####^#################^#####",
  "  #####RRRRR###########RRRRR#####",
  "  ###R*RRRRRR#########RRRRRR*R###",
  "  ####R*RRRRRR#######RRRRRR*R####",
  "   ####RRRRRR#########RRRRRR####",
  "    #####RRR###########RRR#####",
  "     ############.############",
  "       ########.###.########",
  "         ######VVVVV######",
  "           #####===#####",
  "             #########",
  "               #####",
  "               #####",
  "              #######",
  "           #####===#####",
  "       #########OOO#########",
  "     ##O#######=====#######O##",
  "    #O###  ##O###O###O##  ###O#",
  "   #O###    ####===####    ###O#",
  "  #O###      #########      ###O#",
  " V V V       #########       V V V",
  "            ####   ####",
  "           #####   #####",
  "           ####     ####",
  "         #######   #######",
];

const cthulhu2Rows = [
  "         ##                                     ##",
  "        #####                                 #####",
  "       ###  ####                           ####  ###",
  "      ####   ######        #####        ######   ####",
  "     #####   ###  ####   #########   ####  ###   #####",
  "    #####   ####   #####################   ####   #####",
  "   #####    ###     ###################     ###    #####",
  "  #####     ###     ###################     ###     #####",
  " ######     ###    #####################    ###     ######",
  " ######     ###    ####RR#########RR####    ###     ######",
  " ######     ###    ####RR#########RR####    ###     ######",
  " ######    ####    ######RR#######RR######    ####    ######",
  "  ######   ####    ######RR#######RR######    ####   ######",
  "  ######   ####   ########RR#####RR########   ####   ######",
  "   ######  ###  #########RR#####RR#########  ###  ######",
  "   ######  ####### ##################### #######  ######",
  "    ######  ##### ####################### #####  ######",
  "     #####  ###################################  #####",
  "      #############  ####  #####  ####  #############",
  "        #########    ####  #####  ####    #########",
  "          ######     ###   #####   ###     ######",
  "              ###    ###   #####   ###    ###",
  "               ###   ##   ## # ##   ##   ###",
  "               #### ###   ## # ##   ### ####",
  "                ######    ## # ##    ######",
  "               ### ###   ### # ###   ### ###",
  "              ####  ###  ##     ##  ###  ####",
  "              ###    #####       #####    ###",
];

const kraken2Rows = [
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




const selectedGraphicRows = kraken2Rows;

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

const asciiBannerLines: AsciiSegment[][] = selectedGraphicRows.map(createGraphicSegments);

const asciiBanner = asciiBannerLines
  .map((line) => line.map((segment) => segment.text).join(""))
  .join("\n");

const aliases: Record<string, string> = {
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

const terminalCopy = {
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
    commandNotFound: (command: string) => [
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
    commandNotFound: (command: string) => [
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
} as const;

export function KineticTerminal({ language }: { language: Language }) {
  const copy = terminalCopy[language];
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const entryIdRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedCommand, setTypedCommand] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const nextId = () => {
    entryIdRef.current += 1;
    return entryIdRef.current;
  };

  const resolveCommand = (rawCommand: string) => {
    const [rawName = ""] = rawCommand.trim().toLowerCase().split(/\s+/);
    const commandName = aliases[rawName] ?? rawName;
    if (commandName === "clear") return { commandName, lines: [] as string[] };
    if (commandName === "banner") {
      return { commandName, lines: asciiBanner.trim().split("\n") };
    }

    const responses = copy.responses as Record<string, readonly string[]>;
    return {
      commandName,
      lines: responses[commandName]
        ? [...responses[commandName]]
        : copy.commandNotFound(rawName || rawCommand),
    };
  };

  const executeCommand = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command || phase !== "ready") return;

    const result = resolveCommand(command);
    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setInput("");

    if (result.commandName === "clear") {
      setEntries([]);
      return;
    }

    const isError = result.commandName !== "banner" && !(result.commandName in copy.responses);
    const nextEntries: TerminalEntry[] = [
      { id: nextId(), kind: "command", lines: [command] },
      { id: nextId(), kind: isError ? "error" : "output", lines: result.lines },
    ];
    setEntries((current) => [...current, ...nextEntries].slice(-80));
  };

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let cancelled = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = (duration: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, duration));

    const runDemo = async () => {
      setEntries([]);
      setTypedCommand("");
      setInput("");
      setPhase("typing");
      await wait(reduceMotion ? 0 : 720);

      if (reduceMotion) {
        setTypedCommand(copy.demoCommand);
      } else {
        for (let index = 1; index <= copy.demoCommand.length; index += 1) {
          if (cancelled) return;
          setTypedCommand(copy.demoCommand.slice(0, index));
          await wait(42 + (index % 4) * 9);
        }
      }

      if (cancelled) return;
      await wait(reduceMotion ? 0 : 320);
      const result = resolveCommand(copy.demoCommand);
      setEntries([
        { id: nextId(), kind: "command", lines: [copy.demoCommand] },
        { id: nextId(), kind: "output", lines: result.lines },
      ]);
      setTypedCommand("");
      await wait(reduceMotion ? 0 : 420);
      if (!cancelled) setPhase("ready");
    };

    runDemo();
    return () => {
      cancelled = true;
    };
  }, [copy, isVisible]);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [entries, typedCommand]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    executeCommand(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  return (
    <div className="profile-terminal" ref={rootRef} role="region" aria-label={copy.ariaLabel}>
      <div className="terminal-titlebar">
        <div className="terminal-traffic" aria-hidden="true">
          <i className="traffic-close" />
          <i className="traffic-minimize" />
          <i className="traffic-zoom" />
        </div>
        <span className="terminal-title">{copy.title}</span>
        <span className="terminal-session">zsh · 96×28</span>
      </div>

      <div className="terminal-screen">
        <div className="terminal-scroll" ref={scrollRef}>
          <div className="terminal-intro">
            <pre className="terminal-ascii" aria-hidden="true">
              {asciiBannerLines.map((line, lineIndex) => (
                <span className="terminal-ascii-line" key={lineIndex}>
                  {line.map((segment, segmentIndex) => (
                    <span className={`ascii-${segment.tone}`} key={`${lineIndex}-${segmentIndex}`}>
                      {segment.text}
                    </span>
                  ))}
                  {lineIndex < asciiBannerLines.length - 1 ? "\n" : null}
                </span>
              ))}
            </pre>
            <div className="terminal-boot">
              {copy.boot.map((line, index) => (
                <span style={{ "--boot-order": index } as CSSProperties} key={line}>{line}</span>
              ))}
            </div>
            <div className="terminal-examples">
              <span>{copy.examplesLabel}</span>
              <div>
                {copy.examples.map((command) => (
                  <button
                    type="button"
                    disabled={phase !== "ready"}
                    onClick={() => executeCommand(command)}
                    key={command}
                  >
                    <b>$</b> {command}
                  </button>
                ))}
              </div>
              <small>{copy.examplesHint}</small>
            </div>
          </div>

          <div className="terminal-history" role="log" aria-live="polite">
            {entries.map((entry) => (
              <div className={`terminal-entry is-${entry.kind}`} key={entry.id}>
                {entry.kind === "command" && <span className="terminal-prompt" aria-hidden="true">edgar@portfolio:~$</span>}
                <div>
                  {entry.lines.map((line) => <span key={line}>{line}</span>)}
                </div>
              </div>
            ))}

            {phase === "typing" && (
              <div className="terminal-entry is-command terminal-demo-line" aria-hidden="true">
                <span className="terminal-prompt">edgar@portfolio:~$</span>
                <div><span>{typedCommand}<i className="terminal-cursor" /></span></div>
              </div>
            )}
          </div>
        </div>

        <form className="terminal-input-row" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="profile-terminal-input">{copy.inputLabel}</label>
          <span className="terminal-prompt" aria-hidden="true">edgar@portfolio:~$</span>
          <input
            id="profile-terminal-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={phase === "ready" ? copy.inputPlaceholder : ""}
            disabled={phase !== "ready"}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" disabled={phase !== "ready" || !input.trim()} aria-label="Run command">↵</button>
        </form>
      </div>

      <div className="terminal-statusbar">
        <span><i />{phase === "ready" ? copy.ready : copy.booting}</span>
        <span>LOCAL · UTF-8</span>
      </div>
    </div>
  );
}
