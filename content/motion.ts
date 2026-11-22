export const KINETIC_TRANSITIONS = ["cyberpunk", "classic"] as const;

export type KineticTransition = (typeof KINETIC_TRANSITIONS)[number];

export const DEFAULT_KINETIC_TRANSITION: KineticTransition = "cyberpunk";
export const KINETIC_TRANSITION_STORAGE_KEY = "portfolio:kinetic-transition";

export const isKineticTransition = (value: string | null): value is KineticTransition =>
  KINETIC_TRANSITIONS.some((transition) => transition === value);
