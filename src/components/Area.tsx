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
}

export default function Area({ image, area, indicators, habits, onToggleHabitActive }: AreaProps) {
  return (
    <div className="area">
      <div className="area__header">
        <img className="area__avatar" src={image} alt="" />
        <h1 className="area__title">{area}</h1>
      </div>
      <HabitList area={area} habits={habits} onToggleHabitActive={onToggleHabitActive} />
      <KeyIndicators area={area} indicators={indicators} habits={habits} />
    </div>
  );
}
