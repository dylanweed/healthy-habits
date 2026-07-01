import "./HabitList.css";
import type { Habit } from "../types";
import { levelFromScore } from "../utils";

type Level = "high" | "medium" | "low";
const LEVELS: Level[] = ["high", "medium", "low"];

interface HabitListProps {
  area: string;
  habits: Habit[];
  onToggleHabitActive: (habitName: string) => void;
}

export default function HabitList({ area, habits, onToggleHabitActive }: HabitListProps) {
  const groups: Record<Level, Habit[]> = { high: [], medium: [], low: [] };
  for (const habit of habits) {
    groups[levelFromScore(habit.impact)].push(habit);
  }
  const ordered = LEVELS.flatMap((level) => groups[level].map((habit) => ({ habit, level })));

  return (
    <section className="habit-list">
      <div className="habit-list__header">
        <h2>{area} Habits</h2>
      </div>
      <p className="habit-list__hint">Check the ones you're doing.</p>
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
              <span className="habit-list__name">
                {habit.name}
                {level === "high" && <span className="habit-list__tag">Highly Impactful</span>}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
