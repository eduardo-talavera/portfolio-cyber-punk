"use client";

import { useCallback, useEffect, useState } from "react";
import type { Language, Theme } from "../content/portfolio";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const THEME_STORAGE_KEY = "portfolio-theme";

const isLanguage = (value: string | null): value is Language =>
  value === "es" || value === "en";

const isTheme = (value: string | null): value is Theme =>
  value === "dark" || value === "light";

export function usePortfolioPreferences() {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const preferredTheme: Theme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";

    if (isLanguage(savedLanguage)) setLanguage(savedLanguage);
    setTheme(isTheme(savedTheme) ? savedTheme : preferredTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [isInitialized, language]);

  useEffect(() => {
    if (!isInitialized) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [isInitialized, theme]);

  const switchLanguage = useCallback(
    () => setLanguage((current) => (current === "es" ? "en" : "es")),
    [],
  );
  const switchTheme = useCallback(
    () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    [],
  );

  return { language, theme, switchLanguage, switchTheme };
}
