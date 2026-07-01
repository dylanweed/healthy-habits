import "./Area.css";
import KeyIndicators from "./KeyIndicators";
import HabitList from "./HabitList";
import type { Habit, Indicator } from "../types";

interface AreaProps {
  image: string;
  area: string;
  indicators: Indicator[];
  habits: Habit[];
  onToggleHabitActive: (habitName: string) => void;
  onAddCustomHabit: (habit: Omit<Habit, "active" | "userCreated">) => void;
  onDeleteCustomHabit: (habitName: string) => void;
}

export default function Area({
  image,
  area,
  indicators,
  habits,
  onToggleHabitActive,
  onAddCustomHabit,
  onDeleteCustomHabit,
}: AreaProps) {
  return (
    <div className="area">
      <div className="area__header">
        <img className="area__avatar" src={image} alt="" />
        <h1 className="area__title">{area}</h1>
      </div>
      <HabitList
        area={area}
        habits={habits}
        indicators={indicators}
        onToggleHabitActive={onToggleHabitActive}
        onAddCustomHabit={onAddCustomHabit}
        onDeleteCustomHabit={onDeleteCustomHabit}
      />
      <KeyIndicators area={area} indicators={indicators} habits={habits} />
    </div>
  );
}
