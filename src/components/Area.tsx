import "./Area.css";
import HabitList from "./HabitList";
import type { Habit } from "../types";

interface AreaProps {
  image: string;
  area: string;
  habits: Habit[];
  onToggleHabitActive: (habitName: string) => void;
}

export default function Area({ image, area, habits, onToggleHabitActive }: AreaProps) {
  return (
    <div className="area">
      <div className="area__header">
        <img className="area__avatar" src={image} alt="" />
        <h1 className="area__title">{area}</h1>
      </div>
      <HabitList area={area} habits={habits} onToggleHabitActive={onToggleHabitActive} />
    </div>
  );
}
