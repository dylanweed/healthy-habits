import { useState } from "react";
import "./App.css";
import Nav from "./Nav";
import Area from "./Area";
import Home from "./Home";
import type { Habit, HabitPlan } from "../types";
import areas from "../data/areas.json";
import habitDefs from "../data/habit_definitions.json";
import indicatorDefs from "../data/indicator_definitions.json";

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

  const [habits, setHabits] = useState<Habit[]>(() =>
    Object.entries(typedHabitDefs).flatMap(([area, areaHabits]) =>
      Object.entries(areaHabits).map(([name, habit]) => ({
        name,
        area,
        ...habit,
        active: false,
      }))
    )
  );

  function toggleHabitActive(habitName: string) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.name === habitName ? { ...habit, active: !habit.active } : habit,
      ),
    );
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
            image={selectedArea.image}
            area={selected}
            indicators={areaIndicators}
            habits={areaHabits}
            onToggleHabitActive={toggleHabitActive}
          />
        )}
      </div>
    </div>
  );
}
