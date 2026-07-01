export interface HabitPlan {
  begin: string;
  continue: string;
  expect: string;
}

export interface Habit {
  name: string;
  area: string;
  impact: number;
  detail: string;
  plan: HabitPlan;
  active: boolean;
  userCreated?: boolean;
  targetsIndicators?: string[];
}

export interface Indicator {
  name: string;
  area: string;
  importance: number;
  detail: string;
}
