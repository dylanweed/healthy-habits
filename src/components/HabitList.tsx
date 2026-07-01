import { useState } from "react";
import "./HabitList.css";
import type { Habit, Indicator } from "../types";
import { levelFromScore } from "../utils";
import HabitPlanView from "./HabitPlanView";
import CustomHabitForm from "./CustomHabitForm";

type Level = "high" | "medium" | "low";
const LEVELS: Level[] = ["high", "medium", "low"];

interface HabitListProps {
  area: string;
  habits: Habit[];
  indicators: Indicator[];
  onToggleHabitActive: (habitName: string) => void;
  onAddCustomHabit: (habit: Omit<Habit, "active" | "userCreated">) => void;
  onDeleteCustomHabit: (habitName: string) => void;
}

export default function HabitList({
  area,
  habits,
  indicators,
  onToggleHabitActive,
  onAddCustomHabit,
  onDeleteCustomHabit,
}: HabitListProps) {
  const [expandedHabit, setExpandedHabit] = useState<string | null>(null);

  const groups: Record<Level, Habit[]> = { high: [], medium: [], low: [] };
  for (const habit of habits) {
    groups[levelFromScore(habit.impact)].push(habit);
  }
  const ordered = LEVELS.flatMap((level) => groups[level].map((habit) => ({ habit, level })));

  function toggleExpand(habitName: string) {
    setExpandedHabit((prev) => (prev === habitName ? null : habitName));
  }

  return (
    <section className="habit-list">
      <div className="habit-list__header">
        <h2>{area} Habits</h2>
      </div>
      <p className="habit-list__hint">
        Check the ones you're doing — tap a habit to see its plan.
      </p>
      <ul>
        {ordered.map(({ habit, level }) => (
          <li key={habit.name} className={`habit-list__item habit-list__item--${level}`}>
            <div className="habit-list__row">
              <input
                type="checkbox"
                className="habit-list__checkbox"
                checked={habit.active}
                aria-label={`Track ${habit.name}`}
                onChange={() => onToggleHabitActive(habit.name)}
              />
              <button
                type="button"
                className="habit-list__expand-btn"
                aria-label={
                  expandedHabit === habit.name
                    ? `Hide plan for ${habit.name}`
                    : `Show plan for ${habit.name}`
                }
                aria-expanded={expandedHabit === habit.name}
                onClick={() => toggleExpand(habit.name)}
              >
                <span className="habit-list__name">
                  {habit.name}
                  {level === "high" && (
                    <span className="habit-list__tag">Highly Impactful</span>
                  )}
                </span>
                <span className="habit-list__chevron" aria-hidden>
                  {expandedHabit === habit.name ? "▾" : "▸"}
                </span>
              </button>
            </div>
            {expandedHabit === habit.name && (
              <div className="habit-list__detail-panel">
                <p className="habit-list__detail">{habit.detail}</p>
                <HabitPlanView plan={habit.plan} />
                {habit.targetsIndicators && habit.targetsIndicators.length > 0 && (
                  <p className="habit-list__targets">
                    Helps with: {habit.targetsIndicators.join(", ")}
                  </p>
                )}
                {habit.userCreated && (
                  <button
                    type="button"
                    className="habit-list__delete"
                    onClick={() => onDeleteCustomHabit(habit.name)}
                  >
                    Delete habit
                  </button>
                )}
              </div>
            )}
          </li>
        ))}

        <CustomHabitForm area={area} indicators={indicators} onAddCustomHabit={onAddCustomHabit} />
      </ul>
    </section>
  );
}
