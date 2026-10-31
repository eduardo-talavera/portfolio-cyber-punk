"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import type { Language } from "../content/portfolio";
import {
  asciiBanner,
  asciiBannerLines,
  terminalAliases,
  terminalCopy,
  type TerminalCopy,
} from "../content/terminal";
import styles from "./kinetic-terminal.module.css";

type Phase = "idle" | "typing" | "ready";
type EntryKind = "command" | "output" | "error";

interface TerminalEntry {
  id: number;
  kind: EntryKind;
  lines: string[];
}

interface CommandResult {
  commandName: string;
  lines: string[];
}

const resolveCommand = (rawCommand: string, copy: TerminalCopy): CommandResult => {
  const [rawName = ""] = rawCommand.trim().toLowerCase().split(/\s+/);
  const commandName = terminalAliases[rawName] ?? rawName;

  if (commandName === "clear") return { commandName, lines: [] };
  if (commandName === "banner") {
    return { commandName, lines: asciiBanner.trim().split("\n") };
  }

  return {
    commandName,
    lines: copy.responses[commandName]
      ? [...copy.responses[commandName]]
      : copy.commandNotFound(rawName || rawCommand),
  };
};

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

  const nextId = useCallback(() => {
    entryIdRef.current += 1;
    return entryIdRef.current;
  }, []);

  const executeCommand = useCallback((rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command || phase !== "ready") return;

    const result = resolveCommand(command, copy);
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
  }, [copy, nextId, phase]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
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
      if (cancelled) return;

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
      if (cancelled) return;

      const result = resolveCommand(copy.demoCommand, copy);
      setEntries([
        { id: nextId(), kind: "command", lines: [copy.demoCommand] },
        { id: nextId(), kind: "output", lines: result.lines },
      ]);
      setTypedCommand("");
      await wait(reduceMotion ? 0 : 420);
      if (!cancelled) setPhase("ready");
    };

    void runDemo();
    return () => {
      cancelled = true;
    };
  }, [copy, isVisible, nextId]);

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
      return;
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
    <div className={styles.terminal} ref={rootRef} role="region" aria-label={copy.ariaLabel}>
      <div className={styles.titlebar}>
        <div className={styles.traffic} aria-hidden="true">
          <i className={styles.trafficClose} />
          <i className={styles.trafficMinimize} />
          <i className={styles.trafficZoom} />
        </div>
        <span className={styles.title}>{copy.title}</span>
        <span className={styles.session}>zsh · 96×28</span>
      </div>

      <div className={styles.screen}>
        <div className={styles.scroll} ref={scrollRef}>
          <div className={styles.intro}>
            <pre className={styles.ascii} aria-hidden="true">
              {asciiBannerLines.map((line, lineIndex) => (
                <span className={styles.asciiLine} key={lineIndex}>
                  {line.map((segment, segmentIndex) => (
                    <span
                      className={segment.tone === "code" ? styles.asciiCode : styles.asciiAccent}
                      key={`${lineIndex}-${segmentIndex}`}
                    >
                      {segment.text}
                    </span>
                  ))}
                  {lineIndex < asciiBannerLines.length - 1 ? "\n" : null}
                </span>
              ))}
            </pre>
            <div className={styles.boot}>
              {copy.boot.map((line, index) => (
                <span style={{ "--boot-order": index } as CSSProperties} key={line}>{line}</span>
              ))}
            </div>
            <div className={styles.examples}>
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

          <div className={styles.history} role="log" aria-live="polite">
            {entries.map((entry) => (
              <div
                className={`${styles.entry} ${
                  entry.kind === "output" ? styles.output : entry.kind === "error" ? styles.error : ""
                }`}
                key={entry.id}
              >
                {entry.kind === "command" && (
                  <span className={styles.prompt} aria-hidden="true">edgar@portfolio:~$</span>
                )}
                <div>
                  {entry.lines.map((line, lineIndex) => (
                    <span key={`${entry.id}-${lineIndex}`}>{line}</span>
                  ))}
                </div>
              </div>
            ))}

            {phase === "typing" && (
              <div className={styles.entry} aria-hidden="true">
                <span className={styles.prompt}>edgar@portfolio:~$</span>
                <div><span>{typedCommand}<i className={styles.cursor} /></span></div>
              </div>
            )}
          </div>
        </div>

        <form className={styles.inputRow} onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="profile-terminal-input">{copy.inputLabel}</label>
          <span className={styles.prompt} aria-hidden="true">edgar@portfolio:~$</span>
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
          <button
            type="submit"
            disabled={phase !== "ready" || !input.trim()}
            aria-label={copy.runCommand}
          >
            ↵
          </button>
        </form>
      </div>

      <div className={styles.statusbar}>
        <span><i />{phase === "ready" ? copy.ready : copy.booting}</span>
        <span>LOCAL · UTF-8</span>
      </div>
    </div>
  );
}
