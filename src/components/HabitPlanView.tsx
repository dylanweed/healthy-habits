import "./HabitPlanView.css";
import type { HabitPlan } from "../types";

const STEPS = ["begin", "continue", "expect"] as const;

export default function HabitPlanView({ plan }: { plan: HabitPlan }) {
  return (
    <div className="habit-plan">
      {STEPS.map((key) => (
        <div key={key} className="habit-plan__step">
          <span className="habit-plan__label">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
          <span className="habit-plan__text">{plan[key]}</span>
        </div>
      ))}
    </div>
  );
}
