import type { HabitPlan } from "./types";

export interface UserHabit {
  name: string;
  area: string;
  impact: number;
  detail: string;
  plan: HabitPlan;
  targetsIndicators?: string[];
}

export interface PersistedState {
  userId: string; // placeholder — unused until auth is added
  activeHabits: string[];
  userHabits: UserHabit[];
}

const STORAGE_KEY = "habits_state";
export const ANONYMOUS_USER_ID = "local";

export function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage quota exceeded or unavailable
  }
}
