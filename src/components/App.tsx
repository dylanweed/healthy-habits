import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import Area from "./Area";
import Home from "./Home";
import type { Habit, HabitPlan } from "../types";
import areas from "../data/areas.json";
import { iconUrl } from "../icons";
import habitDefs from "../data/habit_definitions.json";
import indicatorDefs from "../data/indicator_definitions.json";
import { loadState, saveState, ANONYMOUS_USER_ID } from "../storage";

type IndicatorDef = { importance: number; detail: string };

const defs = indicatorDefs as Record<string, Record<string, IndicatorDef>>;
const typedHabitDefs = habitDefs as Record<string, Record<string, { impact: number; detail: string; plan: HabitPlan; targetsIndicators?: string[] }>>;

const staticIndicators = Object.entries(defs).flatMap(([area, indicators]) =>
  Object.entries(indicators).map(([name, def]) => ({
    name,
    area,
    importance: def.importance,
    detail: def.detail,
  }))
);

const areaNames = areas.map((area) => area.name);

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  const [habits, setHabits] = useState<Habit[]>(() => {
    const persisted = loadState();
    const base = Object.entries(typedHabitDefs).flatMap(([area, areaHabits]) =>
      Object.entries(areaHabits).map(([name, habit]) => ({
        name,
        area,
        ...habit,
        active: persisted?.activeHabits.includes(name) ?? false,
      }))
    );
    const userHabits = (persisted?.userHabits ?? []).map((habit) => ({
      ...habit,
      active: persisted?.activeHabits.includes(habit.name) ?? false,
      userCreated: true as const,
    }));
    return [...base, ...userHabits];
  });

  useEffect(() => {
    saveState({
      userId: ANONYMOUS_USER_ID,
      activeHabits: habits.filter((habit) => habit.active).map((habit) => habit.name),
      userHabits: habits
        .filter((habit) => habit.userCreated)
        .map(({ name, area, impact, detail, plan, targetsIndicators }) => ({
          name,
          area,
          impact,
          detail,
          plan,
          targetsIndicators,
        })),
    });
  }, [habits]);

  function toggleHabitActive(habitName: string) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.name === habitName ? { ...habit, active: !habit.active } : habit,
      ),
    );
  }

  function addCustomHabit(habit: Omit<Habit, "active" | "userCreated">) {
    setHabits((prev) => [...prev, { ...habit, active: true, userCreated: true }]);
  }

  function deleteCustomHabit(habitName: string) {
    setHabits((prev) => prev.filter((habit) => habit.name !== habitName));
  }

  const selectedArea = areas.find((area) => area.name === selected);

  const areaIndicators = staticIndicators.filter((indicator) => indicator.area === selected);

  const areaHabits = habits.filter((habit) => habit.area === selected);

  return (
    <div className="app">
      <Nav areas={areaNames} selected={selected} onSelect={setSelected} onHome={() => setSelected(null)} />
      <div className="app__main">
        {selected === null || !selectedArea ? (
          <Home areas={areas} onSelect={setSelected} />
        ) : (
          <Area
            image={iconUrl(selectedArea.image)}
            area={selected}
            indicators={areaIndicators}
            habits={areaHabits}
            onToggleHabitActive={toggleHabitActive}
            onAddCustomHabit={addCustomHabit}
            onDeleteCustomHabit={deleteCustomHabit}
          />
        )}
      </div>
    </div>
  );
}
